import { NextResponse } from 'next/server';
import { marquerConsulte, totaliser } from '../../../../lib/devis';
import { nomComplet } from '../../../../lib/devis-modele';
import { alerter, euros, heureLocale } from '../../../../lib/alerte';

/**
 * « Votre devis vient d'être ouvert. »
 *
 * C'est le signal le plus utile du parcours : le moment où quelqu'un lit
 * réellement la proposition, entre l'envoi et la signature. Un client qui
 * ouvre et ne signe pas dans la journée est un client qui hésite, et c'est
 * précisément là qu'un message bien placé fait la différence.
 *
 * POURQUOI UN APPEL DEPUIS LE NAVIGATEUR, ET NON UN COMPTAGE CÔTÉ SERVEUR.
 *
 * Marquer la consultation au rendu de la page semblerait plus simple et serait
 * faux. Les passerelles antivirus des messageries — Outlook, les filtres
 * d'entreprise — ouvrent chaque lien d'un courriel avant que le destinataire
 * ne le voie, pour vérifier qu'il ne mène pas à un piège. Le serveur
 * enregistrerait donc une « première lecture » quelques secondes après l'envoi,
 * alors que personne n'a rien lu, et l'alerte perdrait tout son sens.
 *
 * Ces passerelles n'exécutent pas JavaScript. Un appel émis par le navigateur
 * du lecteur les écarte naturellement, sans avoir à tenir une liste
 * d'identifiants de robots qui serait périmée dans trois mois.
 */

export const runtime = 'nodejs';

type Contexte = { params: Promise<{ jeton: string }> };

export async function POST(_requete: Request, { params }: Contexte) {
  const { jeton } = await params;

  try {
    const resultat = await marquerConsulte(jeton);

    // Jeton inconnu, ou devis jamais envoyé : rien à signaler. On répond
    // quand même 200 — cet appel ne doit jamais faire apparaître d'erreur
    // dans la console du client.
    if (!resultat) return NextResponse.json({ ok: true });

    // Seule la PREMIÈRE ouverture alerte. Un client qui relit trois fois son
    // devis avant d'en parler à son conjoint n'apprend rien de plus à
    // Matthieu, et lui ferait vibrer le téléphone trois fois pour un seul
    // dossier. Le compteur reste consultable dans l'administration.
    if (!resultat.premiere) return NextResponse.json({ ok: true });

    const { devis } = resultat;
    const t = totaliser(devis);

    await alerter({
      icone: '👀',
      titre: `Devis ${devis.numero} ouvert pour la première fois`,
      detail: [
        `${nomComplet(devis.client) || 'Client sans nom'} — ${devis.client.email}`,
        `${euros(t.honoraires)} d’honoraires · ${euros(t.total)} au total`,
        `Envoyé le ${devis.envoyeLe ? new Date(devis.envoyeLe).toLocaleDateString('fr-FR') : '—'}`,
        `Ouvert à ${heureLocale()} (Phuket)`,
      ],
      lien: { libelle: 'Voir le devis', url: `https://dtv-thailande.fr/devis/${devis.jeton}` },
      // Important, mais pas au point de réveiller : l'heure de lecture d'un
      // client français tombe en pleine nuit à Phuket.
      urgence: 'normale',
    });
  } catch (erreur) {
    console.error('[devis/vu] échec du marquage :', erreur);
  }

  return NextResponse.json({ ok: true });
}
