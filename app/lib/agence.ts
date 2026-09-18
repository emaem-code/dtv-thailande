/**
 * Identité de l'entreprise, telle qu'elle apparaît sur les devis.
 *
 * Un devis français doit porter l'identité et l'adresse du prestataire, son
 * numéro SIRET, et — pour une micro-entreprise non assujettie — la mention de
 * l'article 293 B du CGI.
 *
 * Entre le dépôt de la formalité et le retour du numéro par l'INSEE, la
 * mention « SIRET en cours d'attribution » est admise sur les devis et les
 * factures. C'est ce que couvre `immatriculationEnCours` : le document reste
 * opposable, il indique simplement que le numéro n'est pas encore revenu.
 * L'adresse, elle, n'a pas d'équivalent transitoire — sans elle, rien ne part.
 *
 * Le jour où le numéro arrive, il n'y a que ce fichier à modifier : renseigner
 * `siret` et repasser `immatriculationEnCours` à false.
 */

export const AGENCE = {
  nom: 'Matthieu Moretti',
  enseigne: 'DTV Thaïlande',
  activite: 'Accompagnement administratif — Visa DTV',

  // ── Siège social : l'adresse de domiciliation déclarée au guichet unique.
  // C'est celle-ci qui figure sur le devis, et non le lieu depuis lequel
  // l'activité est exercée au quotidien.
  adresse: '31 U Strado di Calvi',
  codePostal: '20226',
  ville: 'Speloncato',
  pays: 'France',

  siret: '',
  /** Passer à false dès que l'INSEE a renvoyé le numéro. */
  immatriculationEnCours: true,

  /**
   * Lieu depuis lequel l'activité est exercée, pour la signature des courriels.
   * Distinct du siège : le premier dit d'où l'on répond, le second est la
   * mention légale. Les confondre sur un devis serait une erreur.
   */
  lieu: 'Kathu, Phuket',

  email: 'contact@dtv-thailande.fr',
  site: 'dtv-thailande.fr',
  /** Micro-entreprise en franchise en base : la TVA n'est ni facturée ni déductible. */
  mentionTva: 'TVA non applicable, article 293 B du CGI',
} as const;

/**
 * Ce qui s'affiche à la place du numéro tant qu'il n'est pas revenu.
 * Mention admise pendant l'instruction de la formalité.
 */
export function mentionSiret(): string {
  if (AGENCE.siret) return `SIRET ${AGENCE.siret}`;
  return AGENCE.immatriculationEnCours ? 'SIRET en cours d’attribution' : '';
}

/** Vrai tant qu'il manque une mention obligatoire : le devis n'est pas opposable. */
export function agenceIncomplete(): boolean {
  const adresseManquante = !AGENCE.adresse || !AGENCE.codePostal || !AGENCE.ville;
  const siretManquant = !AGENCE.siret && !AGENCE.immatriculationEnCours;
  return adresseManquante || siretManquant;
}

/** Ce qui manque, pour l'afficher tel quel dans l'admin. */
export function mentionsManquantes(): string[] {
  const manque: string[] = [];
  if (!AGENCE.adresse || !AGENCE.codePostal || !AGENCE.ville) {
    manque.push('adresse du siège');
  }
  if (!AGENCE.siret && !AGENCE.immatriculationEnCours) manque.push('numéro SIRET');
  return manque;
}

/** Vrai quand le devis part avec la mention transitoire plutôt qu'un numéro. */
export function siretEnAttente(): boolean {
  return !AGENCE.siret && AGENCE.immatriculationEnCours;
}

/** L'adresse du siège sur une seule ligne, pour les pieds de courriel. */
export function adresseUneLigne(): string {
  return `${AGENCE.adresse}, ${AGENCE.codePostal} ${AGENCE.ville}, ${AGENCE.pays}`;
}

/**
 * Médiateur de la consommation.
 *
 * L'article L612-1 du code de la consommation impose à tout professionnel qui
 * vend à des particuliers d'adhérer à un dispositif de médiation et d'en
 * publier les coordonnées : sur le site, dans les conditions de vente et sur
 * les devis. L'adhésion se souscrit auprès d'un médiateur référencé par la
 * CECMC, pour quelques dizaines d'euros par an.
 *
 * Tant que ce champ vaut null, les mentions légales annoncent que la
 * désignation est en cours plutôt que de taire une mention obligatoire — même
 * logique que « SIRET en cours d'attribution ». Le jour de l'adhésion, il n'y
 * a que ces trois lignes à renseigner.
 */
export const MEDIATEUR: { nom: string; adresse: string; site: string } | null = null;

// ─── CONDITIONS COMMERCIALES ─────────────────────────────────────────────────

/** Part des honoraires exigible à la signature. Le solde est dû au dépôt. */
export const ACOMPTE_POURCENT = 40;

/** Durée de validité du devis, en jours. */
export const VALIDITE_JOURS = 30;

/**
 * Délai avant la relance unique, en jours.
 *
 * Sept jours : assez pour ne pas presser quelqu'un qui réfléchit, assez tôt
 * pour qu'il reste trois semaines de validité au devis quand le courriel
 * arrive. Une seule relance, jamais deux : au-delà, ce n'est plus un rappel,
 * c'est du harcèlement commercial, et ça se retourne contre l'expéditeur.
 */
export const RELANCE_JOURS = 7;

/**
 * Premier numéro de devis attribué.
 *
 * La numérotation ne démarre pas à 1. Un premier client qui reçoit le devis
 * n° 1 sait qu'il est le premier, et cela pèse sur une décision qui engage
 * plusieurs milliers d'euros. Rien n'oblige une séquence à commencer à l'unité :
 * la loi exige qu'elle soit continue et sans trou, pas qu'elle parte de zéro.
 */
export const PREMIER_NUMERO = 380;

/**
 * Délai de rétractation d'un contrat conclu à distance avec un particulier,
 * en jours. Article L221-18 du code de la consommation.
 */
export const RETRACTATION_JOURS = 14;

export const CLAUSE_RETRACTATION =
  `Ce devis étant conclu à distance, vous disposez d'un délai de ` +
  `${RETRACTATION_JOURS} jours à compter de son acceptation pour vous rétracter, ` +
  'sans avoir à vous justifier ni à supporter de pénalité. Si vous souhaitez que ' +
  "je commence le travail avant la fin de ce délai, demandez-le moi expressément : " +
  'vous renoncez alors à ce droit pour la part déjà exécutée, et me réglez ' +
  'celle-ci au prorata en cas de rétractation ultérieure.';

export const CLAUSE_REFUS =
  "En cas de refus consulaire, je reprends le dossier et le redépose une fois, " +
  "sans honoraires supplémentaires. Les frais consulaires, non remboursables par " +
  "l'ambassade, restent à votre charge.";

export const CLAUSE_DEBOURS =
  "Les frais externes ci-dessus ne sont pas des honoraires : ils sont réglés " +
  "directement par vos soins à l'ambassade, à l'école et au traducteur. Ils vous " +
  "sont indiqués à titre d'estimation et vous n'en réglez jamais davantage que le " +
  "coût réel, sur justificatif. Aucune commission n'est prise dessus.";

export const CLAUSE_PAIEMENT =
  `${ACOMPTE_POURCENT} % des honoraires à la signature du présent devis, le solde ` +
  'au dépôt du dossier sur le portail e-Visa. Le devis est valable ' +
  `${VALIDITE_JOURS} jours à compter de sa date d'établissement.`;
