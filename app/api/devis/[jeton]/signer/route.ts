import { NextResponse } from 'next/server';
import {
  lireDevisParJeton,
  lireCode,
  compterTentative,
  supprimerCode,
  enregistrerSignature,
  totaliser,
} from '../../../../lib/devis';
import { devisSelonOption, type Option, type Signature } from '../../../../lib/devis-modele';
import {
  texteContrat,
  empreinte,
  empreinteLisible,
  empreinteCode,
  devisExpire,
  dateLimite,
  finRetractation,
  CODE_TENTATIVES_MAX,
} from '../../../../lib/signature';
import { egalConstant } from '../../../../lib/session';
import { envoyerCourriel, gabarit, echapper, signatureHtml, signatureTexte } from '../../../../lib/courriel';
import { alerter, euros as eurosAlerte, heureLocale } from '../../../../lib/alerte';
import { AGENCE, ACOMPTE_POURCENT, RETRACTATION_JOURS } from '../../../../lib/agence';

export const runtime = 'nodejs';

/**
 * Acceptation du devis.
 *
 * Au moment où cette route réussit, un contrat est formé. Tout ce qu'elle
 * fait sert à pouvoir le prouver plus tard : elle fige le texte accepté, en
 * calcule l'empreinte, et conserve autour l'identité déclarée, la boîte mail
 * qui a reçu le code, l'horodatage, l'adresse IP et le navigateur.
 *
 * L'ordre des opérations n'est pas indifférent. L'enregistrement précède les
 * courriels : un service d'envoi indisponible ne doit pas effacer une
 * signature valablement donnée. Le client verra sa page se mettre à jour même
 * si l'accusé met une heure à partir.
 */

type Contexte = { params: Promise<{ jeton: string }> };

type Corps = {
  nom?: unknown;
  prenom?: unknown;
  adresse?: unknown;
  code?: unknown;
  bonPourAccord?: unknown;
  renonciationRetractation?: unknown;
  /** Formule retenue, sur un devis qui en proposait plusieurs. */
  option?: unknown;
};

function texteNettoye(valeur: unknown, longueurMax: number): string {
  return typeof valeur === 'string' ? valeur.trim().slice(0, longueurMax) : '';
}

function euros(montant: number): string {
  return `${montant.toLocaleString('fr-FR').replace(/ | /g, ' ')} €`;
}

function dateHeureFr(iso: string): string {
  return new Date(iso).toLocaleString('fr-FR', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Paris',
  });
}

/**
 * L'adresse du client, telle que l'hébergeur la rapporte.
 *
 * `x-forwarded-for` peut contenir une chaîne de relais ; la première valeur
 * est celle du demandeur. Elle est déclarative et un adversaire peut la
 * travestir, mais ce n'est pas ce qu'on lui demande : elle corrobore le reste
 * du faisceau, elle ne le fonde pas.
 */
function adresseIp(requete: Request): string {
  const chaine = requete.headers.get('x-forwarded-for');
  if (chaine) return chaine.split(',')[0].trim().slice(0, 64);
  return (requete.headers.get('x-real-ip') ?? 'inconnue').slice(0, 64);
}

export async function POST(requete: Request, { params }: Contexte) {
  const { jeton } = await params;

  let corps: Corps = {};
  try {
    corps = (await requete.json()) as Corps;
  } catch {
    return NextResponse.json({ erreur: 'Requête illisible.' }, { status: 400 });
  }

  const nom = texteNettoye(corps.nom, 100);
  const prenom = texteNettoye(corps.prenom, 100);
  const adresse = texteNettoye(corps.adresse, 300);
  const code = texteNettoye(corps.code, 12);

  const manques: string[] = [];
  if (nom.length < 2) manques.push('votre nom');
  if (prenom.length < 2) manques.push('votre prénom');
  if (adresse.length < 10) manques.push('votre adresse postale complète');
  if (manques.length > 0) {
    return NextResponse.json(
      { erreur: `Il manque ${manques.join(', ')}. Ces mentions sont ce qui identifie le signataire.` },
      { status: 400 },
    );
  }
  if (corps.bonPourAccord !== true) {
    return NextResponse.json(
      { erreur: 'Cochez la mention « Bon pour accord » : c’est elle qui fait l’acceptation.' },
      { status: 400 },
    );
  }
  if (!/^\d{6}$/.test(code)) {
    return NextResponse.json({ erreur: 'Le code comporte six chiffres.' }, { status: 400 });
  }

  const devis = await lireDevisParJeton(jeton);
  if (!devis) return NextResponse.json({ erreur: 'Devis introuvable.' }, { status: 404 });
  if (devis.signature) {
    return NextResponse.json({ erreur: 'Ce devis a déjà été signé.' }, { status: 409 });
  }
  if (devisExpire(devis)) {
    return NextResponse.json(
      {
        erreur:
          `Ce devis était valable jusqu’au ${dateLimite(devis).toLocaleDateString('fr-FR')} ` +
          `et ne peut plus être signé. Écrivez-moi à ${AGENCE.email}.`,
      },
      { status: 409 },
    );
  }

  // ── Vérification du code ───────────────────────────────────────────────────
  const enAttente = await lireCode(jeton);
  if (!enAttente) {
    return NextResponse.json(
      { erreur: 'Aucun code en attente. Demandez-en un nouveau.' },
      { status: 409 },
    );
  }
  if (Date.now() > enAttente.expireLe.getTime()) {
    await supprimerCode(jeton);
    return NextResponse.json(
      { erreur: 'Ce code a expiré. Demandez-en un nouveau.' },
      { status: 409 },
    );
  }
  if (enAttente.tentatives >= CODE_TENTATIVES_MAX) {
    await supprimerCode(jeton);
    return NextResponse.json(
      { erreur: 'Trop de saisies erronées : ce code est annulé. Demandez-en un nouveau.' },
      { status: 429 },
    );
  }

  const fourni = await empreinteCode(jeton, code);
  if (!egalConstant(fourni, enAttente.empreinte)) {
    const total = await compterTentative(jeton);
    const reste = Math.max(0, CODE_TENTATIVES_MAX - total);
    return NextResponse.json(
      {
        erreur: reste
          ? `Code incorrect. Il vous reste ${reste} essai${reste > 1 ? 's' : ''}.`
          : 'Code incorrect. Ce code est annulé, demandez-en un nouveau.',
      },
      { status: 401 },
    );
  }

  // ── Choix de la formule, sur un devis à options ────────────────────────────
  // L'option est validée contre celles réellement proposées : un appelant ne
  // doit pas pouvoir se composer un prix en soumettant une formule absente du
  // document qu'il a lu.
  let option: Option | undefined;
  if (devis.options.length > 0) {
    const demandee = typeof corps.option === 'string' ? corps.option : '';
    option = devis.options.find((o) => o.formule === demandee);
    if (!option) {
      return NextResponse.json(
        { erreur: 'Choisissez l’une des formules proposées avant de signer.' },
        { status: 400 },
      );
    }
  }

  // ── Scellement ─────────────────────────────────────────────────────────────
  // Le contrat est établi sur le devis tel qu'il sera après application du
  // choix : c'est ce texte-là, et lui seul, que le client accepte.
  const devisRetenu = option ? devisSelonOption(devis, option) : devis;
  const t = totaliser(devisRetenu);
  const contrat = texteContrat(devisRetenu);
  const signeLe = new Date().toISOString();

  const signature: Signature = {
    nom,
    prenom,
    adresse,
    email: enAttente.email,
    signeLe,
    ip: adresseIp(requete),
    navigateur: (requete.headers.get('user-agent') ?? 'inconnu').slice(0, 300),
    empreinte: await empreinte(contrat),
    contrat,
    renonciationRetractation: corps.renonciationRetractation === true,
    honoraires: t.honoraires,
    total: t.total,
    ...(option ? { formuleChoisie: option.formule } : {}),
  };

  const signe = await enregistrerSignature(jeton, signature, option);
  if (!signe) {
    // La condition « pas encore signé » a échoué : un autre envoi est passé
    // entre-temps. Le premier fait foi, celui-ci n'écrase rien.
    return NextResponse.json({ erreur: 'Ce devis a déjà été signé.' }, { status: 409 });
  }
  await supprimerCode(jeton);

  // ── Accusés ────────────────────────────────────────────────────────────────
  // Hors du chemin critique : la signature est acquise, quoi qu'il advienne
  // du service d'envoi.
  const origine = new URL(requete.url).origin;
  const lien = `${origine}/devis/${jeton}`;
  await Promise.allSettled([
    accuserReceptionClient(signe.numero, signature, lien),
    prevenirPrestataire(signe.numero, signature, devis.client.email, lien),
    // La seule alerte qui mérite de sonner à n'importe quelle heure : un
    // contrat vient d'être accepté, et un acompte est dû.
    alerter({
      icone: '✅',
      titre: `DEVIS SIGNÉ — ${signe.numero}`,
      detail: [
        `${signature.prenom} ${signature.nom}`,
        signature.email,
        `${eurosAlerte(signature.honoraires)} d’honoraires · ${eurosAlerte(signature.total)} au total`,
        signature.formuleChoisie ? `Formule retenue : ${signature.formuleChoisie}` : '',
        signature.renonciationRetractation
          ? '⚡ Exécution immédiate demandée — renonciation au délai de rétractation'
          : `Rétractation possible pendant ${RETRACTATION_JOURS} jours`,
        `Signé à ${heureLocale()} (Phuket)`,
      ].filter(Boolean),
      lien: { libelle: 'Ouvrir le dossier', url: lien },
      urgence: 'critique',
    }),
  ]);

  return NextResponse.json({ ok: true, signeLe, empreinte: signature.empreinte });
}

async function accuserReceptionClient(numero: string, s: Signature, lien: string) {
  const finDelai = finRetractation(s.signeLe, RETRACTATION_JOURS).toLocaleDateString('fr-FR');
  const acompte = Math.round((s.honoraires * ACOMPTE_POURCENT) / 100);

  const texte = `Bonjour ${s.prenom},

Votre acceptation du devis ${numero} est enregistrée.

Signé le : ${dateHeureFr(s.signeLe)}
Par : ${s.prenom} ${s.nom}
Empreinte du document : ${empreinteLisible(s.empreinte)}

Cette empreinte est l'identité numérique du document que vous venez d'accepter.
Toute modification ultérieure, fût-elle d'un seul caractère, la changerait.
Conservez ce message : il fait preuve du contenu exact de notre accord.

Ce qui suit :
— Acompte de ${euros(acompte)} (${ACOMPTE_POURCENT} % des honoraires) à régler pour
  démarrer. Je vous adresse les coordonnées dans un message séparé.
— Le solde de ${euros(s.honoraires - acompte)} au dépôt du dossier.

${
  s.renonciationRetractation
    ? `Vous avez demandé que le travail commence immédiatement, sans attendre la fin
du délai de rétractation. Ce délai court malgré tout jusqu'au ${finDelai} : si
vous vous rétractez d'ici là, vous ne me réglez que la part déjà exécutée.`
    : `Vous disposez d'un délai de rétractation de ${RETRACTATION_JOURS} jours, soit
jusqu'au ${finDelai}. Je commence le travail à l'issue de ce délai, sauf si vous
me demandez expressément de démarrer avant.`
}

Votre espace reste accessible ici, avec la liste des pièces à réunir et
l'avancement du dossier :
${lien}

${signatureTexte()}
`;

  const html = gabarit(`
<p style="margin:0 0 16px 0;">Bonjour ${echapper(s.prenom)},</p>
<p style="margin:0 0 24px 0;">Votre acceptation du devis <strong>${echapper(numero)}</strong> est enregistrée.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e7e5e4;border-radius:10px;margin:0 0 24px 0;">
  <tr><td style="padding:16px 18px;font-size:14px;line-height:1.7;color:#1c1917;">
    <div><span style="color:#78716c;">Signé le</span> ${echapper(dateHeureFr(s.signeLe))}</div>
    <div><span style="color:#78716c;">Par</span> ${echapper(`${s.prenom} ${s.nom}`)}</div>
    <div style="margin-top:8px;"><span style="color:#78716c;">Empreinte du document</span></div>
    <div style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;word-break:break-all;color:#44403c;">${empreinteLisible(s.empreinte)}</div>
  </td></tr>
</table>
<p style="margin:0 0 24px 0;font-size:14px;color:#57534e;">Cette empreinte est l’identité numérique du document accepté : toute modification ultérieure, fût-elle d’un seul caractère, la changerait. Conservez ce message, il fait preuve du contenu exact de notre accord.</p>
<p style="margin:0 0 8px 0;font-size:15px;"><strong>Ce qui suit</strong></p>
<p style="margin:0 0 24px 0;font-size:15px;">Acompte de <strong>${euros(acompte)}</strong> (${ACOMPTE_POURCENT} % des honoraires) pour démarrer — je vous adresse les coordonnées dans un message séparé. Le solde de ${euros(s.honoraires - acompte)} au dépôt du dossier.</p>
<p style="margin:0 0 24px 0;padding:14px 16px;background:#fef3c7;border-radius:8px;font-size:14px;line-height:1.6;">${
    s.renonciationRetractation
      ? `Vous avez demandé que le travail commence immédiatement. Le délai de rétractation court malgré tout jusqu’au <strong>${finDelai}</strong> : si vous vous rétractez d’ici là, vous ne réglez que la part déjà exécutée.`
      : `Vous disposez d’un délai de rétractation de ${RETRACTATION_JOURS} jours, soit jusqu’au <strong>${finDelai}</strong>.`
  }</p>
<p style="margin:0 0 28px 0;text-align:center;">
  <a href="${lien}" style="display:inline-block;background:#b45309;color:#ffffff;text-decoration:none;font-weight:bold;padding:14px 28px;border-radius:999px;">Ouvrir mon espace</a>
</p>
${signatureHtml()}`);

  return envoyerCourriel({
    a: s.email,
    sujet: `Devis ${numero} accepté — accusé de signature`,
    texte,
    html,
  });
}

async function prevenirPrestataire(
  numero: string,
  s: Signature,
  emailClient: string,
  lien: string,
) {
  const texte = `Devis ${numero} signé.

${s.prenom} ${s.nom}
${s.adresse}
${emailClient}

Signé le : ${dateHeureFr(s.signeLe)}
IP : ${s.ip}
Navigateur : ${s.navigateur}
Empreinte : ${s.empreinte}
Renonciation au délai de rétractation : ${s.renonciationRetractation ? 'OUI — le travail peut démarrer' : 'non'}

Honoraires : ${euros(s.honoraires)} — acompte ${euros(Math.round((s.honoraires * ACOMPTE_POURCENT) / 100))}
Budget total : ${euros(s.total)}

Espace client : ${lien}
`;

  return envoyerCourriel({
    a: AGENCE.email,
    sujet: `✓ Devis ${numero} signé par ${s.prenom} ${s.nom}`,
    texte,
    html: gabarit(`<pre style="margin:0;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:13px;line-height:1.6;white-space:pre-wrap;">${echapper(texte)}</pre>`),
  });
}
