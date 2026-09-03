/**
 * Identité de l'entreprise, telle qu'elle apparaît sur les devis.
 *
 * Un devis français doit porter l'identité et l'adresse du prestataire, son
 * numéro SIRET, et — pour une micro-entreprise non assujettie — la mention de
 * l'article 293 B du CGI. Tant que la structure n'est pas immatriculée, ces
 * champs restent vides : l'admin affiche alors un avertissement et le document
 * porte un filigrane, plutôt que de laisser partir une pièce non conforme.
 *
 * Le jour de l'immatriculation, il n'y a que ce fichier à modifier.
 */

export const AGENCE = {
  nom: 'Matthieu Moretti',
  enseigne: 'DTV Thaïlande',
  activite: 'Accompagnement administratif — Visa DTV',
  adresse: '',
  codePostal: '',
  ville: 'Kathu, Phuket',
  pays: 'Thaïlande',
  siret: '',
  email: 'contact@dtv-thailande.fr',
  site: 'dtv-thailande.fr',
  /** Micro-entreprise en franchise en base : la TVA n'est ni facturée ni déductible. */
  mentionTva: 'TVA non applicable, article 293 B du CGI',
} as const;

/** Vrai tant qu'il manque une mention obligatoire : le devis n'est pas opposable. */
export function agenceIncomplete(): boolean {
  return !AGENCE.siret || !AGENCE.adresse;
}

/** Ce qui manque, pour l'afficher tel quel dans l'admin. */
export function mentionsManquantes(): string[] {
  const manque: string[] = [];
  if (!AGENCE.siret) manque.push('numéro SIRET');
  if (!AGENCE.adresse) manque.push('adresse de l’entreprise');
  return manque;
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
