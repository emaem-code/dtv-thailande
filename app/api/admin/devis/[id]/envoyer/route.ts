import { NextResponse } from 'next/server';
import { lireDevis, marquerEnvoye, totaliser } from '../../../../../lib/devis';
import {
  AGENCE,
  agenceIncomplete,
  mentionsManquantes,
  ACOMPTE_POURCENT,
  VALIDITE_JOURS,
} from '../../../../../lib/agence';
import {
  envoyerCourriel,
  gabarit,
  echapper,
  signatureHtml,
  signatureTexte,
} from '../../../../../lib/courriel';

export const runtime = 'nodejs';

function euros(montant: number): string {
  return `${montant.toLocaleString('fr-FR').replace(/ | /g, ' ')} €`;
}

type Contexte = { params: Promise<{ id: string }> };

export async function POST(requete: Request, { params }: Contexte) {
  const { id } = await params;

  // Un devis dépourvu d'adresse de siège n'est pas opposable : on refuse
  // l'envoi plutôt que de laisser partir une pièce non conforme.
  if (agenceIncomplete()) {
    return NextResponse.json(
      {
        erreur:
          `Envoi bloqué : il manque ${mentionsManquantes().join(' et ')}. ` +
          'Complétez app/lib/agence.ts avant d’envoyer un devis à un client. ' +
          'Un SIRET non encore attribué ne bloque pas l’envoi ; une adresse de siège manquante, si.',
      },
      { status: 409 },
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

Il se consulte, s'imprime et se signe ici :
${lien}

La signature se fait directement en ligne : vous renseignez votre nom et votre
adresse, un code à usage unique vous est envoyé par courriel, et c'est réglé.
Ni impression, ni scanner. Une fois signé, cette même adresse devient votre
espace de suivi : la liste des pièces à réunir et l'avancement du dossier.

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
répondez simplement à ce message — mieux vaut corriger avant signature.

${signatureTexte()}
`;

  const html = gabarit(`
<p style="margin:0 0 16px 0;">${prenom ? `Bonjour ${echapper(prenom)},` : 'Bonjour,'}</p>
<p style="margin:0 0 24px 0;">Voici le devis correspondant à votre projet, réf. <strong>${echapper(devis.numero)}</strong>.</p>
<p style="margin:0 0 20px 0;text-align:center;">
  <a href="${lien}" style="display:inline-block;background:#b45309;color:#ffffff;text-decoration:none;font-weight:bold;padding:14px 28px;border-radius:999px;">Consulter et signer le devis</a>
</p>
<p style="margin:0 0 28px 0;font-size:14px;color:#57534e;text-align:center;">La signature se fait en ligne, avec un code reçu par courriel. Ni impression, ni scanner.</p>
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
<p style="margin:0 0 28px 0;font-size:14px;color:#57534e;">Ce devis est valable ${VALIDITE_JOURS} jours. Si un point mérite d’être ajusté, répondez simplement à ce message — mieux vaut corriger avant signature.</p>
${signatureHtml()}`);

  const envoi = await envoyerCourriel({
    a: devis.client.email,
    sujet: `Votre devis ${devis.numero} — Visa DTV Thaïlande`,
    texte,
    html,
  });

  if (!envoi.ok) return NextResponse.json({ erreur: envoi.erreur }, { status: envoi.statut });

  await marquerEnvoye(devis.id);
  return NextResponse.json({ ok: true, lien });
}
