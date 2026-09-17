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
  adresse: '',
  codePostal: '',
  ville: '',
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

// ─── CONDITIONS COMMERCIALES ─────────────────────────────────────────────────

/** Part des honoraires exigible à la signature. Le solde est dû au dépôt. */
export const ACOMPTE_POURCENT = 40;

/** Durée de validité du devis, en jours. */
export const VALIDITE_JOURS = 30;

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
