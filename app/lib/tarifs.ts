/**
 * Source unique des tarifs d'accompagnement.
 *
 * Ces montants étaient auparavant recopiés dans six fichiers — page d'accueil,
 * formulaire d'éligibilité, fenêtre guide, carrousel mobile, article Soft Power.
 * Une révision en oubliait forcément un. Ils sont désormais définis ici et
 * importés partout ailleurs.
 *
 * ── Révision du 2 septembre 2026 ──────────────────────────────────────────
 * La grille précédente (850 € / 1 750 €) avait été calibrée sur un dépôt en
 * Asie : frais consulaires à 10 000 THB, soit environ 260 €, et documents en
 * français le plus souvent acceptés à Vientiane ou Kuala Lumpur.
 *
 * Depuis le 31 août 2026, un demandeur français relève obligatoirement de
 * l'ambassade de Paris. Deux coûts apparaissent :
 *   — les frais consulaires y sont d'environ 350 €, soit 90 € de plus ;
 *   — la traduction assermentée y est exigée, alors qu'elle était rarement
 *     demandée en Asie.
 *
 * L'écart n'est pas le même sur les deux voies, et c'est ce qui justifie deux
 * hausses différentes plutôt qu'une augmentation uniforme : le bloc coûteux à
 * traduire est celui des revenus (SIRENE, URSSAF, avis d'imposition, lettre
 * d'activité), soit environ 280 €. Un dossier Soft Power ne le contient pas —
 * il n'exige aucune preuve de revenus, et la lettre d'école arrive déjà en
 * anglais. Il ne lui reste que le casier judiciaire et un acte d'état civil.
 *
 *   Digital Nomad : +90 € consulaire +280 € traductions = +370 €
 *   Soft Power    : +90 € consulaire  +90 € traductions = +180 €
 */

export type Formule = {
  /** Identifiant stable, utilisé comme valeur dans le formulaire. */
  id: 'essentielle' | 'premium' | 'vip';
  nom: string;
  description: string;
  /** Voie télétravail, freelance ou salarié à distance. */
  standard: number;
  /** Voie Soft Power : le budget intègre la scolarité de l'école certifiée. */
  softPower: number;
  vedette: boolean;
};

/**
 * Budget complet affiché au public, pour UNE personne.
 *
 * Ce ne sont pas des honoraires : c'est le coût total de l'opération, débours
 * compris. Le choix est délibéré. Un prospect ne compare pas des honoraires,
 * il compare des budgets — afficher 600 € d'honoraires puis envoyer un devis
 * à 1 250 € le ferait passer pour une mauvaise surprise, alors que c'est le
 * même prix. Le devis, lui, détaille toujours ce qui revient à l'agence et ce
 * qui part chez des tiers (voir `budgetDossier`).
 *
 * ── Contenu des formules, révision du 2 septembre 2026 ────────────────────
 * Premium et VIP vendaient le voyage régional nécessaire à un dépôt à
 * Vientiane. Ce dépôt est fermé aux non-résidents du Laos depuis le
 * 31 août 2026 : il n'y a plus de voyage à coordonner, le dépôt parisien
 * étant entièrement dématérialisé. Le service haut de gamme se déplace donc
 * vers le seul voyage qui subsiste — celui du client qui s'installe.
 */
export const FORMULES: Formule[] = [
  {
    id: 'essentielle',
    nom: 'Essentielle',
    description:
      "L'administratif complet : montage du dossier, traductions, dépôt et suivi jusqu'à la délivrance.",
    standard: 1250,
    softPower: 1950,
    vedette: false,
  },
  {
    id: 'premium',
    nom: 'Premium',
    description:
      "Essentielle, plus le pilotage des traductions, l'attestation bancaire en anglais et la préparation de l'arrivée (TDAC, TM30, 90 jours).",
    standard: 1700,
    softPower: 2650,
    vedette: false,
  },
  {
    id: 'vip',
    nom: 'VIP',
    description:
      "Premium, plus l'installation sur place : accueil à l'arrivée, recherche de logement, banque, école et assurance santé.",
    standard: 2800,
    softPower: 4250,
    vedette: true,
  },
];

// ─── HONORAIRES ───────────────────────────────────────────────────────────────

/**
 * Honoraires d'accompagnement, par nombre de personnes au dossier.
 *
 * Dégressifs, et c'est justifié : le dossier d'un rattaché ne comporte ni
 * preuve d'activité ni lettre de mission. Il reste l'état civil, les
 * traductions et la preuve de fonds — du vrai travail, mais moins.
 *
 * Ces montants sont la SEULE part qui entre dans le chiffre d'affaires. Tout
 * le reste transite vers l'ambassade, l'école ou le traducteur.
 */
export const HONORAIRES: Record<number, number> = {
  1: 600,
  2: 1050,
  3: 1400,
  4: 1650,
};

/** Au-delà, le dossier sort du cadre standard et se chiffre au cas par cas. */
export const PALIER_MAX = 4;

// ─── DÉBOURS ──────────────────────────────────────────────────────────────────

/**
 * Frais consulaires de l'ambassade de Paris, PAR PERSONNE.
 * Les enfants rattachés paient le même montant que le demandeur principal.
 */
export const FRAIS_CONSULAIRES = 350;

/** Inscription à l'école certifiée — voie Soft Power, demandeur principal seul. */
export const ECOLE_SOFT_POWER = 910;

/**
 * Traduction, en bahts par page (Alliance française de Phuket).
 *
 * Stocké en THB et converti au cours du jour, comme le seuil bancaire : c'est
 * un prix thaïlandais, sa contre-valeur en euros n'est qu'indicative. Environ
 * trois fois moins qu'un traducteur assermenté français, qui facture 40 à
 * 60 € la page.
 */
export const TRADUCTION_THB_PAR_PAGE = 900;

/**
 * Volume de traduction retenu dans l'estimation, en pages.
 *
 * Un dossier Soft Power est court : la lettre de l'école arrive en anglais, il
 * ne reste que le casier judiciaire et un acte d'état civil. Un dossier
 * télétravail doit traduire tout le bloc revenus — SIRENE, URSSAF, avis
 * d'imposition, lettre d'activité — d'où l'écart.
 */
export const PAGES = { standard: 12, softPower: 4, rattache: 3 };

/**
 * Volume de référence servant à formuler la mention publique.
 *
 * Les traductions sont un débours : elles transitent vers le traducteur et
 * sont refacturées à l'euro près. Le budget annoncé en retient une estimation
 * — il ne les forfaitise pas. La nuance compte : trois mois de relevés d'un
 * compte actif peuvent représenter quinze à vingt pages, et un forfait
 * « traductions comprises » deviendrait un chèque en blanc dès que le seuil
 * bancaire se multiplie par le nombre de personnes rattachées.
 */
export const PAGES_TRADUCTION_INCLUSES = 10;

/** Mention affichée sous les tarifs, partout où ils apparaissent. */
export const MENTION_TRADUCTIONS =
  'Le budget intègre une estimation des traductions ; elles sont refacturées ' +
  'au coût réel sur justificatif du traducteur.';

// ─── CALCUL DU BUDGET ─────────────────────────────────────────────────────────

export type Budget = {
  /** Nombre de personnes retenues. */
  personnes: number;
  /** Part agence — la seule qui entre dans le chiffre d'affaires. */
  honoraires: number;
  /** Frais consulaires cumulés. */
  consulaires: number;
  /** Scolarité, nulle hors voie Soft Power. */
  ecole: number;
  /** Traductions, converties au cours fourni. */
  traductions: number;
  /** Pages retenues avant plafonnement. */
  pages: number;
  /** Somme des trois postes ci-dessus : ce qui part chez des tiers. */
  debours: number;
  /** Coût total de l'opération pour le client. */
  total: number;
  /** Coût moyen par personne, utile pour montrer la dégressivité. */
  parPersonne: number;
  /** Vrai au-delà du dernier palier : le devis se fait au cas par cas. */
  surDevis: boolean;
};

/**
 * Décompose le coût complet d'un dossier.
 *
 * Le cours est passé en paramètre plutôt que lu ici : ce module reste pur et
 * synchrone, et l'appelant décide s'il utilise le cours du jour ou celui de
 * repli.
 */
export function budgetDossier(
  personnes: number,
  estSoftPower: boolean,
  tauxThbParEuro: number,
): Budget {
  const n = Math.max(1, Math.floor(personnes) || 1);
  const surDevis = n > PALIER_MAX;
  const honoraires = HONORAIRES[Math.min(n, PALIER_MAX)];

  // Volume réel estimé, sans plafond : le budget annoncé doit refléter ce que
  // le client va effectivement payer, pas une borne qui l'arrangerait.
  const pages = (estSoftPower ? PAGES.softPower : PAGES.standard) + (n - 1) * PAGES.rattache;

  const consulaires = FRAIS_CONSULAIRES * n;
  const ecole = estSoftPower ? ECOLE_SOFT_POWER : 0;
  const traductions = Math.round((pages * TRADUCTION_THB_PAR_PAGE) / tauxThbParEuro);
  const debours = consulaires + ecole + traductions;
  const total = honoraires + debours;

  return {
    personnes: n,
    honoraires,
    consulaires,
    ecole,
    traductions,
    pages,
    debours,
    total,
    parPersonne: Math.round(total / n),
    surDevis,
  };
}

/**
 * Économie réalisée par rapport à autant de dossiers individuels.
 * Rend le pourcentage entier, pour l'encart « tarif dégressif ».
 */
export function remiseFoyer(
  personnes: number,
  estSoftPower: boolean,
  tauxThbParEuro: number,
): number {
  const n = Math.max(1, Math.floor(personnes) || 1);
  if (n < 2) return 0;
  const groupe = budgetDossier(n, estSoftPower, tauxThbParEuro).total;
  const isole = budgetDossier(1, estSoftPower, tauxThbParEuro).total * n;
  return Math.round((1 - groupe / isole) * 100);
}

/** Formatage français : 1 250 €, avec espace insécable avant le symbole. */
export function prix(montant: number): string {
  return `${montant.toLocaleString('fr-FR').replace(/ | | /g, ' ')} €`;
}

/** Tarif d'une formule selon la voie empruntée. */
export function tarif(id: Formule['id'], estSoftPower: boolean): number {
  const f = FORMULES.find((item) => item.id === id);
  if (!f) throw new Error(`Formule inconnue : ${id}`);
  return estSoftPower ? f.softPower : f.standard;
}

/** Le tarif d'appel affiché sur l'accueil et dans les CTA. */
export const PRIX_APPEL = FORMULES[0].standard;
