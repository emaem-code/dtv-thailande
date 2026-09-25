import { NextResponse } from 'next/server';
import { requete } from '../../../lib/db';
import { alerter } from '../../../lib/alerte';
import { compterAbonnes } from '../../../lib/abonnes';
import { AGENCE } from '../../../lib/agence';
import { lireAudience } from '../../../lib/audience';

/**
 * Le point du matin, à 9 h heure de Phuket.
 *
 * C'est le pendant indispensable des alertes immédiates. Ce qui n'a pas mérité
 * d'interrompre la veille — un devis consulté une deuxième fois, un lead dont
 * l'épargne n'est pas constituée, une sauvegarde effectuée — se retrouve ici,
 * en un seul message qui se lit en trois secondes. Sans ce filet, la tentation
 * serait de faire sonner davantage d'événements, et le canal d'alerte perdrait
 * exactement ce qui fait sa valeur.
 *
 * POURQUOI UNE ROUTE SÉPARÉE DES RELANCES.
 *
 * Les deux tâches quotidiennes servent deux matins différents. Les relances
 * partent à 8 h UTC pour arriver à 10 h dans la boîte d'un prospect français ;
 * ce résumé part à 2 h UTC pour être lu à 9 h à Phuket. Tant qu'elles
 * partageaient une seule tâche, choisir une heure revenait à dégrader l'autre :
 * un résumé à 15 h, ou des relances expédiées à 4 h du matin heure de Paris.
 *
 * Le décompte est fait en base plutôt que transmis par la tâche des relances,
 * ce qui rend cette route autonome : elle dit la vérité sur les dernières
 * vingt-quatre heures même si l'autre tâche a échoué, et surtout parce qu'elles
 * ne s'exécutent plus au même moment.
 */

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

function autorise(requeteHttp: Request): boolean {
  const attendu = process.env.CRON_SECRET;
  if (!attendu) return false;
  return requeteHttp.headers.get('authorization') === `Bearer ${attendu}`;
}

/** « 3 leads », « 1 lead », « 0 lead ». */
function compte(n: number, singulier: string, pluriel = `${singulier}s`): string {
  return `${n} ${n > 1 ? pluriel : singulier}`;
}

export async function GET(requeteHttp: Request) {
  if (!autorise(requeteHttp)) {
    return NextResponse.json({ erreur: 'Non autorisé.' }, { status: 401 });
  }

  const [c] = await requete<{
    fin_periode: Date;
    leads: string;
    leads_traites: string;
    envoyes: string;
    consultes: string;
    signes: string;
    relances: string;
    en_attente: string;
    jamais_ouverts: string;
  }>(
    `SELECT now() AS fin_periode,
       (SELECT count(*) FROM leads WHERE cree_le    > now() - interval '24 hours') AS leads,
       (SELECT count(*) FROM leads WHERE cree_le    > now() - interval '24 hours'
                                     AND traite)                                   AS leads_traites,
       (SELECT count(*) FROM devis WHERE envoye_le  > now() - interval '24 hours') AS envoyes,
       (SELECT count(*) FROM devis WHERE consulte_le > now() - interval '24 hours') AS consultes,
       (SELECT count(*) FROM devis WHERE relance_le  > now() - interval '24 hours') AS relances,
       (SELECT count(*) FROM devis
         WHERE signature IS NOT NULL
           AND (signature->>'signeLe')::timestamptz > now() - interval '24 hours') AS signes,
       (SELECT count(*) FROM devis
         WHERE envoye_le IS NOT NULL AND signature IS NULL)                        AS en_attente,
       (SELECT count(*) FROM devis
         WHERE envoye_le IS NOT NULL AND signature IS NULL
           AND consulte_le IS NULL
           AND envoye_le < now() - interval '48 hours')                            AS jamais_ouverts`,
  );

  if (!c) return NextResponse.json({ erreur: 'Décompte impossible.' }, { status: 500 });

  // now() est identique dans tout le SELECT : l'audience reprend exactement
  // l'instant de référence des décomptes, même si la requête a pris du temps.
  const { fin_periode, ...compteurs } = c;
  const audience = await lireAudience(fin_periode);
  const n = (v: string) => Number(v) || 0;

  const detail = [
    ...(audience ? [audience.page, audience.provenance, audience.total] : []),
    `${compte(n(c.leads), 'nouveau lead', 'nouveaux leads')}${
      n(c.leads) > 0 ? ` · ${n(c.leads_traites)} traité${n(c.leads_traites) > 1 ? 's' : ''}` : ''
    }`,
    `${compte(n(c.envoyes), 'devis envoyé', 'devis envoyés')}`,
    `${compte(n(c.consultes), 'devis ouvert', 'devis ouverts')}`,
    `${compte(n(c.signes), 'devis signé', 'devis signés')}`,
  ];

  if (n(c.relances) > 0) {
    detail.push(`${compte(n(c.relances), 'relance partie', 'relances parties')}`);
  }

  detail.push('');
  detail.push(`${compte(n(c.en_attente), 'devis en attente', 'devis en attente')} de signature`);

  /**
   * La liste d'alertes, en une ligne.
   *
   * Elle ne sert à rien tant qu'elle est vide, et c'est justement pour ça
   * qu'elle figure ici : voir le chiffre stagner est le seul rappel utile que
   * le bloc d'inscription mérite d'être mieux placé, ou mieux formulé.
   */
  try {
    const abonnes = await compterAbonnes();
    if (abonnes.confirmes > 0 || abonnes.enAttente > 0) {
      detail.push(
        `${compte(abonnes.confirmes, 'abonné', 'abonnés')} aux alertes` +
          (abonnes.enAttente > 0 ? ` · ${abonnes.enAttente} en attente de confirmation` : ''),
      );
    }
  } catch {
    /* la liste n'existe pas encore : ce n'est pas une panne */
  }

  /**
   * Le seul chiffre de ce message qui appelle une action.
   *
   * Un devis envoyé il y a plus de deux jours et jamais ouvert, ce n'est pas
   * un client qui hésite : c'est un courriel qui n'est pas arrivé, ou qui est
   * en indésirables. La relance automatique à J+7 ne réglera rien puisqu'elle
   * emprunte le même chemin. Un appel, si.
   */
  if (n(c.jamais_ouverts) > 0) {
    detail.push('');
    detail.push(
      `⚠️ ${compte(n(c.jamais_ouverts), 'devis jamais ouvert', 'devis jamais ouverts')} ` +
        `depuis plus de 48 h — vérifier qu’il est bien arrivé`,
    );
  }

  const envoye = await alerter({
    icone: '📊',
    titre: 'Les dernières 24 heures',
    detail,
    lien: { libelle: 'Ouvrir l’administration', url: `https://${AGENCE.site}/admin` },
    urgence: 'normale',
  });

  return NextResponse.json({ ok: true, envoye, compte: compteurs });
}
