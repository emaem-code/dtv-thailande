import { NextResponse } from 'next/server';
import { enregistrerLead } from '../../lib/leads';

/**
 * Accusé de réception au prospect, et enregistrement de la demande.
 *
 * Deux effets, volontairement indépendants l'un de l'autre : l'e-mail de
 * confirmation, et l'écriture en base qui alimente l'espace d'administration.
 * Chacun est encadré par son propre try/catch, et aucun n'est bloquant.
 *
 * La notification qui prévient Matthieu continue de passer par Formspree, et
 * c'est délibéré : si la base est indisponible ou la clé Resend absente, le
 * lead arrive quand même par courriel. L'admin est un confort de travail, pas
 * un point de défaillance sur le chemin d'un prospect.
 */

export const runtime = 'nodejs';

const EMAIL_VALIDE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/**
 * Expéditeur : l'alias professionnel, déjà authentifié sur le domaine.
 * Le nom affiché est celui de la marque, pas une personne : ce message part
 * d'une adresse de contact générique, et le site s'adresse au « nous ».
 */
const EXPEDITEUR = 'DTV Thaïlande <contact@dtv-thailande.fr>';

type Corps = {
  prenom?: unknown;
  email?: unknown;
  softPower?: unknown;
  /** Demande complète, telle qu'envoyée à Formspree. Sert à alimenter l'admin. */
  demande?: unknown;
  personnes?: unknown;
};

/** Neutralise le HTML : le prénom vient d'un champ libre, il ne doit rien injecter. */
function echapper(texte: string): string {
  return texte
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function corpsTexte(prenom: string, softPower: boolean): string {
  const salutation = prenom ? `Bonjour ${prenom},` : 'Bonjour,';
  const secondLien = softPower
    ? '— La voie Soft Power, école par école : https://dtv-thailande.fr/blog/visa-dtv-soft-power-ecoles'
    : '— Quel visa choisir pour vivre en Thaïlande : https://dtv-thailande.fr/blog/comparatif-visas-thailande';

  return `${salutation}

Votre demande nous est bien parvenue. Nous l'étudions et revenons vers vous sous 24 heures ouvrées avec une estimation chiffrée pour votre situation.

Si un élément vous est revenu depuis — une date qui bouge, un doute sur un document, une question que le formulaire ne posait pas — répondez simplement à ce message. Ce que vous nous direz maintenant nous fera gagner du temps ensuite.

En attendant, deux lectures qui répondront peut-être déjà à une partie de vos questions :
— Les questions fréquentes sur le Visa DTV : https://dtv-thailande.fr/faq
${secondLien}

À très bientôt,

L'équipe DTV Thaïlande
Kathu, Phuket
contact@dtv-thailande.fr
https://dtv-thailande.fr

---
Vous recevez ce message parce que vous avez rempli le test d'éligibilité sur dtv-thailande.fr.
`;
}

function corpsHtml(prenom: string, softPower: boolean): string {
  const salutation = prenom ? `Bonjour ${echapper(prenom)},` : 'Bonjour,';
  const secondLien = softPower
    ? '<a href="https://dtv-thailande.fr/blog/visa-dtv-soft-power-ecoles" style="color:#b45309;">La voie Soft Power, école par école</a>'
    : '<a href="https://dtv-thailande.fr/blog/comparatif-visas-thailande" style="color:#b45309;">Quel visa choisir pour vivre en Thaïlande</a>';

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f4;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f4;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;border:1px solid #e7e5e4;">
        <tr><td style="padding:32px 32px 8px 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.65;color:#1c1917;">

          <p style="margin:0 0 20px 0;">${salutation}</p>

          <p style="margin:0 0 20px 0;">
            Votre demande nous est bien parvenue. Nous l'étudions et revenons vers vous
            <strong>sous 24 heures ouvrées</strong> avec une estimation chiffrée pour votre
            situation.
          </p>

          <p style="margin:0 0 20px 0;">
            Si un élément vous est revenu depuis — une date qui bouge, un doute sur un document,
            une question que le formulaire ne posait pas — répondez simplement à ce message.
            Ce que vous nous direz maintenant nous fera gagner du temps ensuite.
          </p>

          <p style="margin:0 0 12px 0;">
            En attendant, deux lectures qui répondront peut-être déjà à une partie de vos questions :
          </p>

          <ul style="margin:0 0 24px 0;padding-left:20px;">
            <li style="margin-bottom:6px;">
              <a href="https://dtv-thailande.fr/faq" style="color:#b45309;">Les questions fréquentes sur le Visa DTV</a>
            </li>
            <li>${secondLien}</li>
          </ul>

          <p style="margin:0 0 24px 0;">À très bientôt,</p>

        </td></tr>
        <tr><td style="padding:0 32px 32px 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;color:#57534e;border-top:1px solid #e7e5e4;padding-top:20px;">
          <p style="margin:0;"><strong style="color:#1c1917;">L'équipe DTV Thaïlande</strong><br>
          Kathu, Phuket<br>
          <a href="mailto:contact@dtv-thailande.fr" style="color:#b45309;">contact@dtv-thailande.fr</a> ·
          <a href="https://dtv-thailande.fr" style="color:#b45309;">dtv-thailande.fr</a></p>
        </td></tr>
      </table>

      <p style="max-width:560px;margin:16px auto 0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;line-height:1.5;color:#a8a29e;text-align:center;">
        Vous recevez ce message parce que vous avez rempli le test d'éligibilité sur dtv-thailande.fr.
      </p>
    </td></tr>
  </table>
</body></html>`;
}

export async function POST(requete: Request) {
  const cle = process.env.RESEND_API_KEY;

  let corps: Corps;
  try {
    corps = (await requete.json()) as Corps;
  } catch {
    return NextResponse.json({ envoye: false, raison: 'corps illisible' }, { status: 400 });
  }

  const email = typeof corps.email === 'string' ? corps.email.trim() : '';
  const prenom = typeof corps.prenom === 'string' ? corps.prenom.trim().slice(0, 60) : '';
  const softPower = corps.softPower === true;

  if (!EMAIL_VALIDE.test(email)) {
    return NextResponse.json({ envoye: false, raison: 'adresse invalide' }, { status: 400 });
  }

  // Enregistrement pour l'espace d'administration. Toute erreur est absorbée :
  // le prospect ne doit jamais pâtir d'une base indisponible.
  try {
    const demande =
      corps.demande && typeof corps.demande === 'object'
        ? (corps.demande as Record<string, string>)
        : {};
    const personnes = Number(corps.personnes);

    await enregistrerLead({
      prenom,
      email,
      telephone: demande['Téléphone'] ?? '',
      nationalite: demande['Nationalité'] ?? '',
      statutPro: demande['Statut Pro'] ?? '',
      foyer: demande['Expatriation'] ?? '',
      personnes: Number.isFinite(personnes) ? personnes : 1,
      softPower,
      formule: demande['Formule choisie'] ?? '',
      donnees: demande,
    });
  } catch (erreur) {
    console.error('[lead] Enregistrement en base impossible :', erreur);
  }

  // L'accusé de réception vient APRÈS l'enregistrement, et jamais avant : une
  // clé Resend absente ne doit pas faire perdre la demande. Rien n'est bloqué
  // pour autant, le lead est déjà parti chez Formspree.
  if (!cle) {
    console.warn('[lead] RESEND_API_KEY absente — accusé de réception non envoyé.');
    return NextResponse.json({ envoye: false, raison: 'non configuré' }, { status: 200 });
  }

  try {
    const reponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cle}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: EXPEDITEUR,
        to: [email],
        reply_to: 'contact@dtv-thailande.fr',
        subject: prenom
          ? `${prenom}, votre demande est bien reçue`
          : 'Votre demande est bien reçue',
        text: corpsTexte(prenom, softPower),
        html: corpsHtml(prenom, softPower),
      }),
    });

    if (!reponse.ok) {
      const detail = await reponse.text();
      console.error('[lead] Resend a refusé l’envoi :', reponse.status, detail);
      return NextResponse.json({ envoye: false, raison: 'refus du prestataire' }, { status: 200 });
    }

    return NextResponse.json({ envoye: true }, { status: 200 });
  } catch (erreur) {
    console.error('[lead] Envoi impossible :', erreur);
    return NextResponse.json({ envoye: false, raison: 'réseau' }, { status: 200 });
  }
}
