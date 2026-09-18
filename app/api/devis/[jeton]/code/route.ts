import { NextResponse } from 'next/server';
import { lireDevisParJeton, lireCode, enregistrerCode, supprimerCode } from '../../../../lib/devis';
import {
  genererCode,
  empreinteCode,
  devisExpire,
  dateLimite,
  CODE_VALIDITE_MINUTES,
  CODE_DELAI_RENVOI_SECONDES,
} from '../../../../lib/signature';
import { envoyerCourriel, gabarit, echapper, signatureHtml, signatureTexte } from '../../../../lib/courriel';
import { AGENCE } from '../../../../lib/agence';

export const runtime = 'nodejs';

/**
 * Envoi du code à usage unique qui vaut vérification d'identité.
 *
 * Route publique : elle n'est protégée que par le jeton du devis, qui fait
 * 128 bits. Ce qu'elle expose est borné — on ne peut demander un code que
 * pour un devis dont on connaît déjà l'adresse, et le code part vers la boîte
 * enregistrée, jamais vers une adresse fournie par l'appelant. Faire
 * autrement reviendrait à laisser le visiteur désigner lui-même qui il est.
 */

type Contexte = { params: Promise<{ jeton: string }> };

/** Assez pour reconnaître sa propre adresse, pas assez pour la récolter. */
function masquer(email: string): string {
  const [boite, domaine] = email.split('@');
  if (!domaine) return '•••';
  const debut = boite.slice(0, 2);
  return `${debut}${'•'.repeat(Math.max(3, boite.length - 2))}@${domaine}`;
}

export async function POST(_requete: Request, { params }: Contexte) {
  const { jeton } = await params;

  const devis = await lireDevisParJeton(jeton);
  if (!devis) return NextResponse.json({ erreur: 'Devis introuvable.' }, { status: 404 });

  if (devis.signature) {
    return NextResponse.json(
      { erreur: 'Ce devis a déjà été signé. Rechargez la page pour en voir l’accusé.' },
      { status: 409 },
    );
  }

  if (!devis.client.email) {
    return NextResponse.json(
      {
        erreur:
          `Aucune adresse e-mail n’est enregistrée sur ce devis. Écrivez à ${AGENCE.email} ` +
          'pour que je la complète.',
      },
      { status: 409 },
    );
  }

  if (devisExpire(devis)) {
    const limite = dateLimite(devis).toLocaleDateString('fr-FR');
    return NextResponse.json(
      {
        erreur:
          `Ce devis était valable jusqu’au ${limite} et ne peut plus être signé. ` +
          `Écrivez-moi à ${AGENCE.email} : je vous en réémets un aux conditions du jour.`,
      },
      { status: 409 },
    );
  }

  // Un code déjà parti il y a moins d'une minute : on ne relance pas. Sans ce
  // garde-fou, la page devient un robinet à courriels pointé sur le client.
  const existant = await lireCode(jeton);
  if (existant) {
    const ecoule = Date.now() - existant.envoyeLe.getTime();
    if (ecoule < CODE_DELAI_RENVOI_SECONDES * 1000) {
      const reste = Math.ceil((CODE_DELAI_RENVOI_SECONDES * 1000 - ecoule) / 1000);
      return NextResponse.json(
        {
          erreur: `Un code vient de partir. Patientez ${reste} seconde${reste > 1 ? 's' : ''} avant d’en redemander un.`,
        },
        { status: 429 },
      );
    }
  }

  const code = genererCode();
  const expireLe = new Date(Date.now() + CODE_VALIDITE_MINUTES * 60_000);
  await enregistrerCode(jeton, await empreinteCode(jeton, code), devis.client.email, expireLe);

  const prenom = devis.client.nom.split(' ')[0] || '';
  const texte = `${prenom ? `Bonjour ${prenom},` : 'Bonjour,'}

Votre code de signature pour le devis ${devis.numero} :

    ${code}

Il est valable ${CODE_VALIDITE_MINUTES} minutes. Saisissez-le sur la page du devis
pour confirmer votre acceptation.

Si vous n'êtes pas à l'origine de cette demande, ignorez ce message : sans ce
code, rien ne peut être signé.

${signatureTexte()}
`;

  const html = gabarit(`
<p style="margin:0 0 16px 0;">${prenom ? `Bonjour ${echapper(prenom)},` : 'Bonjour,'}</p>
<p style="margin:0 0 20px 0;">Voici votre code de signature pour le devis <strong>${echapper(devis.numero)}</strong>.</p>
<p style="margin:0 0 20px 0;text-align:center;">
  <span style="display:inline-block;background:#fef3c7;border:1px solid #fcd34d;border-radius:10px;padding:16px 28px;font-size:32px;font-weight:bold;letter-spacing:.3em;color:#78350f;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;">${code}</span>
</p>
<p style="margin:0 0 20px 0;font-size:14px;color:#57534e;">Valable ${CODE_VALIDITE_MINUTES} minutes. Saisissez-le sur la page du devis pour confirmer votre acceptation.</p>
<p style="margin:0 0 28px 0;font-size:14px;color:#57534e;">Si vous n’êtes pas à l’origine de cette demande, ignorez ce message : sans ce code, rien ne peut être signé.</p>
${signatureHtml()}`);

  const envoi = await envoyerCourriel({
    a: devis.client.email,
    sujet: `Code de signature ${code} — devis ${devis.numero}`,
    texte,
    html,
  });

  if (!envoi.ok) {
    // Le code n'a atteint personne : le laisser en base ne ferait qu'empêcher
    // une nouvelle tentative pendant un quart d'heure.
    await supprimerCode(jeton);
    return NextResponse.json({ erreur: envoi.erreur }, { status: envoi.statut });
  }

  return NextResponse.json({
    ok: true,
    email: masquer(devis.client.email),
    validiteMinutes: CODE_VALIDITE_MINUTES,
  });
}
