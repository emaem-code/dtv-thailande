import { NextResponse } from 'next/server';
import { inscrire, CONSENTEMENT } from '../../lib/abonnes';
import { envoyerCourriel, gabarit, echapper, signatureHtml } from '../../lib/courriel';
import { AGENCE } from '../../lib/agence';
import { alerter } from '../../lib/alerte';

/**
 * Inscription aux alertes réglementaires.
 *
 * La réponse est volontairement la même que l'adresse soit nouvelle, déjà
 * inscrite ou inconnue : « regardez votre boîte ». Répondre « cette adresse
 * est déjà abonnée » transformerait ce formulaire en outil pour vérifier si
 * quelqu'un figure dans la liste, ce qui n'est l'affaire de personne.
 */

export const runtime = 'nodejs';

const EMAIL_VALIDE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export async function POST(requete: Request) {
  let email = '';
  let source = '';
  let consenti = false;

  try {
    const corps = (await requete.json()) as {
      email?: unknown;
      source?: unknown;
      consentement?: unknown;
    };
    if (typeof corps.email === 'string') email = corps.email.trim().slice(0, 180);
    if (typeof corps.source === 'string') source = corps.source.slice(0, 120);
    consenti = corps.consentement === true;
  } catch {
    return NextResponse.json({ erreur: 'Requête illisible.' }, { status: 400 });
  }

  if (!EMAIL_VALIDE.test(email)) {
    return NextResponse.json({ erreur: 'Cette adresse ne semble pas valide.' }, { status: 400 });
  }

  // Le consentement est vérifié ici et pas seulement dans le navigateur : une
  // case cochée côté client ne prouve rien, et c'est précisément la preuve que
  // le RGPD demande de pouvoir produire.
  if (!consenti) {
    return NextResponse.json(
      { erreur: 'Merci de cocher la case de consentement.' },
      { status: 400 },
    );
  }

  const origine = new URL(requete.url).origin;

  try {
    const { jeton } = await inscrire(email, source);
    const lienConfirmer = `${origine}/alertes/confirmer/${jeton}`;

    // Le courriel de confirmation part même pour une adresse déjà inscrite :
    // quelqu'un qui recommence n'a en général jamais reçu le premier message.
    await envoyerCourriel({
      a: email,
      sujet: 'Confirmez votre inscription aux alertes DTV',
      texte: `Bonjour,

Vous venez de demander à être prévenu des changements de règles du visa DTV.
Il reste une étape, et une seule : confirmer que cette adresse est bien la vôtre.

${lienConfirmer}

Si vous n'êtes à l'origine de rien, ignorez ce message : sans ce clic, aucune
adresse n'est ajoutée et vous ne recevrez plus rien.

Ce à quoi vous vous inscrivez : ${CONSENTEMENT}

${AGENCE.enseigne} — ${AGENCE.lieu}
${AGENCE.site}
`,
      html: gabarit(`
<p style="margin:0 0 16px 0;">Bonjour,</p>
<p style="margin:0 0 20px 0;">Vous venez de demander à être prévenu des changements de règles du visa DTV. Il reste une étape, et une seule : confirmer que cette adresse est bien la vôtre.</p>
<p style="margin:0 0 24px 0;text-align:center;">
  <a href="${lienConfirmer}" style="display:inline-block;background:#b45309;color:#ffffff;text-decoration:none;font-weight:bold;padding:14px 28px;border-radius:999px;">Confirmer mon inscription</a>
</p>
<p style="margin:0 0 20px 0;font-size:14px;color:#57534e;">Si vous n’êtes à l’origine de rien, ignorez ce message : sans ce clic, aucune adresse n’est ajoutée et vous ne recevrez plus rien.</p>
<p style="margin:0 0 24px 0;padding:12px 14px;background:#f5f5f4;border-radius:8px;font-size:13px;line-height:1.6;color:#57534e;">${echapper(CONSENTEMENT)}</p>
${signatureHtml()}`),
    });

    await alerter({
      icone: '📬',
      titre: 'Inscription aux alertes réglementaires',
      detail: [email, source ? `Depuis ${source}` : '', 'En attente de confirmation'].filter(Boolean),
      urgence: 'normale',
    });
  } catch (erreur) {
    console.error('[abonnes] inscription impossible :', erreur);
    return NextResponse.json(
      { erreur: 'Enregistrement impossible pour le moment. Réessayez dans un instant.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
