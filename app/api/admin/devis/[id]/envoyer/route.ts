import { NextResponse } from 'next/server';
import { lireDevis, marquerEnvoye, totaliser } from '../../../../../lib/devis';
import { AGENCE, agenceIncomplete, mentionsManquantes, ACOMPTE_POURCENT, VALIDITE_JOURS } from '../../../../../lib/agence';

export const runtime = 'nodejs';

const EXPEDITEUR = 'DTV Thaïlande <contact@dtv-thailande.fr>';

function euros(montant: number): string {
  return `${montant.toLocaleString('fr-FR').replace(/ | /g, ' ')} €`;
}

function echapper(texte: string): string {
  return texte
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

type Contexte = { params: Promise<{ id: string }> };

export async function POST(requete: Request, { params }: Contexte) {
  const { id } = await params;

  // Un devis dépourvu de SIRET n'est pas opposable : on refuse l'envoi plutôt
  // que de laisser partir une pièce non conforme.
  if (agenceIncomplete()) {
    return NextResponse.json(
      {
        erreur:
          `Envoi bloqué : il manque ${mentionsManquantes().join(' et ')}. ` +
          'Complétez app/lib/agence.ts avant d’envoyer un devis à un client.',
      },
      { status: 409 },
    );
  }

  const cle = process.env.RESEND_API_KEY;
  if (!cle) {
    return NextResponse.json(
      { erreur: 'RESEND_API_KEY absente : impossible d’envoyer le courriel.' },
      { status: 503 },
    );
  }

  const devis = await lireDevis(Number(id));
  if (!devis) return NextResponse.json({ erreur: 'Devis introuvable.' }, { status: 404 });
  if (!devis.client.email) {
    return NextResponse.json({ erreur: 'Ce devis n’a pas d’adresse e-mail client.' }, { status: 400 });
  }

  const t = totaliser(devis);
  const origine = new URL(requete.url).origin;
  const lien = `${origine}/devis/${devis.jeton}`;
  const prenom = devis.client.nom.split(' ')[0] || '';

  const texte = `${prenom ? `Bonjour ${prenom},` : 'Bonjour,'}

Voici le devis correspondant à votre projet, réf. ${devis.numero}.

Il se consulte et s'imprime ici :
${lien}

Le document distingue deux choses, et c'est important :

— Mes honoraires d'accompagnement : ${euros(t.honoraires)}, ferme et définitif.
  ${ACOMPTE_POURCENT} % à la signature, soit ${euros(t.acompte)}, le solde au dépôt du dossier.

— Les frais externes : ${euros(t.debours)} estimés, que vous réglez directement
  à l'ambassade, à l'école et au traducteur. Je ne prends aucune commission
  dessus et vous n'en payez jamais plus que le coût réel, sur justificatif.

Soit un budget d'ensemble de ${euros(t.total)} pour ${devis.dossier.personnes} personne${devis.dossier.personnes > 1 ? 's' : ''}.

Point à vérifier avant toute chose : l'ambassade demande de justifier
${t.fondsThb}, soit environ ${euros(t.fondsEuros)} au cours actuel, pour l'ensemble
du foyer. C'est le seul critère réellement bloquant.

Ce devis est valable ${VALIDITE_JOURS} jours. Si un point mérite d'être ajusté,
répondez simplement à ce message.

Bien à vous,

${AGENCE.nom}
${AGENCE.enseigne} — ${AGENCE.ville}
${AGENCE.email}
https://${AGENCE.site}
`;

  const html = `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f4;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f4;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;border:1px solid #e7e5e4;">
        <tr><td style="padding:32px 32px 8px 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.65;color:#1c1917;">
          <p style="margin:0 0 16px 0;">${prenom ? `Bonjour ${echapper(prenom)},` : 'Bonjour,'}</p>
          <p style="margin:0 0 24px 0;">Voici le devis correspondant à votre projet, réf. <strong>${echapper(devis.numero)}</strong>.</p>
          <p style="margin:0 0 28px 0;text-align:center;">
            <a href="${lien}" style="display:inline-block;background:#b45309;color:#ffffff;text-decoration:none;font-weight:bold;padding:14px 28px;border-radius:999px;">Consulter le devis</a>
          </p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e7e5e4;border-radius:10px;margin:0 0 24px 0;">
            <tr><td style="padding:16px 18px;border-bottom:1px solid #f5f5f4;">
              <div style="font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#78716c;font-weight:bold;">Mes honoraires — ferme et définitif</div>
              <div style="font-size:20px;font-weight:bold;margin-top:4px;">${euros(t.honoraires)}</div>
              <div style="font-size:13px;color:#57534e;margin-top:4px;">${ACOMPTE_POURCENT} % à la signature (${euros(t.acompte)}), solde au dépôt.</div>
            </td></tr>
            <tr><td style="padding:16px 18px;">
              <div style="font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#78716c;font-weight:bold;">Frais externes — estimation</div>
              <div style="font-size:20px;font-weight:bold;margin-top:4px;">${euros(t.debours)}</div>
              <div style="font-size:13px;color:#57534e;margin-top:4px;">Réglés directement par vos soins à l’ambassade, à l’école et au traducteur. Aucune commission.</div>
            </td></tr>
          </table>
          <p style="margin:0 0 24px 0;font-size:15px;">Budget d’ensemble : <strong>${euros(t.total)}</strong> pour ${devis.dossier.personnes} personne${devis.dossier.personnes > 1 ? 's' : ''}.</p>
          <p style="margin:0 0 24px 0;padding:14px 16px;background:#fef3c7;border-radius:8px;font-size:14px;line-height:1.6;">
            <strong>À vérifier avant tout :</strong> l’ambassade demande de justifier ${echapper(t.fondsThb)}, soit environ ${euros(t.fondsEuros)}, pour l’ensemble du foyer. C’est le seul critère réellement bloquant.
          </p>
          <p style="margin:0 0 24px 0;font-size:14px;color:#57534e;">Ce devis est valable ${VALIDITE_JOURS} jours. Si un point mérite d’être ajusté, répondez simplement à ce message.</p>
          <p style="margin:0 0 4px 0;">Bien à vous,</p>
          <p style="margin:0 0 32px 0;font-size:14px;color:#57534e;">
            ${echapper(AGENCE.nom)}<br>${echapper(AGENCE.enseigne)} — ${echapper(AGENCE.ville)}<br>
            <a href="mailto:${AGENCE.email}" style="color:#b45309;">${AGENCE.email}</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const reponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${cle}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: EXPEDITEUR,
      to: [devis.client.email],
      reply_to: AGENCE.email,
      subject: `Votre devis ${devis.numero} — Visa DTV Thaïlande`,
      text: texte,
      html,
    }),
  });

  if (!reponse.ok) {
    const detail = await reponse.text().catch(() => '');
    return NextResponse.json(
      { erreur: `Resend a refusé l’envoi (${reponse.status}). ${detail.slice(0, 300)}` },
      { status: 502 },
    );
  }

  await marquerEnvoye(devis.id);
  return NextResponse.json({ ok: true, lien });
}
