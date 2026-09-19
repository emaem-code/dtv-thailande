import { NextResponse } from 'next/server';
import { devisARelancer, marquerRelance, libererRelance } from '../../../lib/devis';
import { envoyerCourriel } from '../../../lib/courriel';
import { courrielRelance } from '../../../lib/relance';
import { construireSauvegarde, nomFichierSauvegarde, sauvegardeEnJson } from '../../../lib/sauvegarde';
import { AGENCE, RELANCE_JOURS, VALIDITE_JOURS } from '../../../lib/agence';

/**
 * La tâche du matin des CLIENTS : relances dues, et sauvegarde le lundi.
 *
 * Elle est calée sur 8 h UTC, soit 10 h à Paris : c'est l'heure à laquelle un
 * prospect français ouvre sa boîte. Le résumé destiné à Matthieu vit dans une
 * route séparée, parce qu'il obéit à un fuseau et à un besoin différents — son
 * matin à Phuket, pas celui de ses clients. Les fondre dans une seule tâche
 * obligeait à sacrifier l'un des deux horaires.
 *
 * Les deux traitements tolèrent l'imprécision de l'ordonnanceur : une relance
 * qui part à 8 h 40 plutôt qu'à 8 h 00 ne change rien, et une sauvegarde non
 * plus.
 *
 * L'exécution est séquentielle et tolérante : un envoi qui échoue n'interrompt
 * pas les suivants, et le devis repasse demain lorsqu'on sait que rien n'est
 * parti.
 */

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Vercel présente `Authorization: Bearer $CRON_SECRET` sur ses appels.
 *
 * Sans ce contrôle, n'importe qui connaissant l'adresse pourrait déclencher
 * l'envoi de courriels à des clients. La comparaison échoue aussi quand le
 * secret n'est pas configuré : une route de ce genre doit refuser par défaut,
 * jamais s'ouvrir par défaut.
 */
function autorise(requete: Request): boolean {
  const attendu = process.env.CRON_SECRET;
  if (!attendu) return false;
  return requete.headers.get('authorization') === `Bearer ${attendu}`;
}

async function envoyerRelances(origine: string) {
  const dus = await devisARelancer(RELANCE_JOURS, VALIDITE_JOURS);
  const envoyes: string[] = [];
  const echecs: string[] = [];

  for (const devis of dus) {
    if (!devis.client.email) continue;

    // On réserve la relance avant de l'envoyer. Dans l'autre ordre, un envoi
    // réussi suivi d'une écriture ratée relancerait le client une seconde fois
    // le lendemain — l'erreur la plus visible du point de vue du client.
    if (!(await marquerRelance(devis.id))) continue;

    const { sujet, texte, html } = courrielRelance(devis, `${origine}/devis/${devis.jeton}`);
    const envoi = await envoyerCourriel({ a: devis.client.email, sujet, texte, html });

    if (envoi.ok) {
      envoyes.push(devis.numero);
      continue;
    }

    echecs.push(`${devis.numero} : ${envoi.erreur}`);

    // 502 signifie que le service n'a pas répondu : le courriel a pu partir
    // quand même. Tout autre code — clé absente, refus explicite — signifie
    // qu'il n'est pas parti, et le devis peut retourner dans la file.
    if (envoi.statut !== 502) await libererRelance(devis.id);
  }

  return { envoyes, echecs };
}

async function envoyerSauvegarde() {
  const sauvegarde = await construireSauvegarde();
  const json = sauvegardeEnJson(sauvegarde);
  const nom = nomFichierSauvegarde(sauvegarde.genereLe);
  const { devis, signes, leads } = sauvegarde.compte;

  const texte = `Sauvegarde du ${sauvegarde.genereLe.slice(0, 10)}.

${devis} devis, dont ${signes} signé${signes > 1 ? 's' : ''}, et ${leads} demande${leads > 1 ? 's' : ''}.

Le fichier joint contient l'intégralité de la base : chaque devis avec son
texte contractuel accepté et son empreinte, et chaque demande reçue. Conservez-
le ailleurs que sur la machine qui reçoit ce courriel.

Pour vérifier qu'une sauvegarde est exploitable, ouvrez le fichier et cherchez
un numéro de devis que vous connaissez. Une sauvegarde qu'on n'a jamais
ouverte n'a jamais été testée.`;

  const envoi = await envoyerCourriel({
    a: AGENCE.email,
    sujet: `Sauvegarde DTV — ${devis} devis, ${signes} signé${signes > 1 ? 's' : ''}`,
    texte,
    html: `<pre style="font-family:ui-monospace,monospace;font-size:14px;line-height:1.6;white-space:pre-wrap;">${texte
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')}</pre>`,
    pieces: [{ nom, contenu: json }],
  });

  return { ok: envoi.ok, erreur: envoi.ok ? null : envoi.erreur, octets: json.length };
}

export async function GET(requete: Request) {
  if (!autorise(requete)) {
    return NextResponse.json({ erreur: 'Non autorisé.' }, { status: 401 });
  }

  const origine = new URL(requete.url).origin;
  const journal: Record<string, unknown> = { le: new Date().toISOString() };

  try {
    journal.relances = await envoyerRelances(origine);
  } catch (erreur) {
    journal.relances = { erreur: erreur instanceof Error ? erreur.message : 'échec' };
  }

  // Le lundi seulement : une sauvegarde quotidienne par courriel finirait dans
  // un dossier qu'on ne regarde plus, ce qui revient à ne pas en avoir.
  if (new Date().getUTCDay() === 1) {
    try {
      journal.sauvegarde = await envoyerSauvegarde();
    } catch (erreur) {
      journal.sauvegarde = { erreur: erreur instanceof Error ? erreur.message : 'échec' };
    }
  }

  return NextResponse.json(journal);
}

