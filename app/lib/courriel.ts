import { AGENCE } from './agence';

/**
 * Envoi de courriels via Resend.
 *
 * Trois routes envoient désormais du courrier — le devis, le code de
 * signature, l'accusé de signature — et toutes trois ont besoin de la même
 * enveloppe : même expéditeur, même gabarit, même traitement des échecs.
 * Recopier la requête à chaque fois, c'est se garantir qu'une correction
 * n'atteindra jamais que deux endroits sur trois.
 */

const EXPEDITEUR = `${AGENCE.enseigne} <${AGENCE.email}>`;

export type Resultat = { ok: true } | { ok: false; erreur: string; statut: number };

export type Courriel = {
  a: string | string[];
  sujet: string;
  texte: string;
  html: string;
  repondreA?: string;
};

export async function envoyerCourriel(c: Courriel): Promise<Resultat> {
  const cle = process.env.RESEND_API_KEY;
  if (!cle) {
    return {
      ok: false,
      statut: 503,
      erreur: 'RESEND_API_KEY absente : impossible d’envoyer le courriel.',
    };
  }

  let reponse: Response;
  try {
    reponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${cle}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: EXPEDITEUR,
        to: Array.isArray(c.a) ? c.a : [c.a],
        reply_to: c.repondreA ?? AGENCE.email,
        subject: c.sujet,
        text: c.texte,
        html: c.html,
      }),
    });
  } catch {
    return { ok: false, statut: 502, erreur: 'Le service d’envoi n’a pas répondu.' };
  }

  if (!reponse.ok) {
    const detail = await reponse.text().catch(() => '');
    return {
      ok: false,
      statut: 502,
      erreur: `Resend a refusé l’envoi (${reponse.status}). ${detail.slice(0, 300)}`,
    };
  }
  return { ok: true };
}

/** Neutralise ce qui viendrait d'une saisie avant de l'insérer dans du HTML. */
export function echapper(texte: string): string {
  return texte
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * L'enveloppe HTML commune.
 *
 * Tableaux et styles en ligne : les clients de messagerie ignorent les
 * feuilles de style externes et une bonne partie de la mise en page moderne.
 */
export function gabarit(corps: string): string {
  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f4;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f4;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;border:1px solid #e7e5e4;">
        <tr><td style="padding:32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.65;color:#1c1917;">
${corps}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

/** Le pied de signature, identique dans tous les messages. */
export function signatureHtml(): string {
  return `<p style="margin:0 0 4px 0;">Bien à vous,</p>
<p style="margin:0;font-size:14px;color:#57534e;">
  ${echapper(AGENCE.nom)}<br>${echapper(AGENCE.enseigne)} — ${echapper(AGENCE.lieu)}<br>
  <a href="mailto:${AGENCE.email}" style="color:#b45309;">${AGENCE.email}</a>
</p>`;
}

export function signatureTexte(): string {
  return `Bien à vous,

${AGENCE.nom}
${AGENCE.enseigne} — ${AGENCE.lieu}
${AGENCE.email}
https://${AGENCE.site}`;
}
