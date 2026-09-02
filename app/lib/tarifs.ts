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
  /** Voie Soft Power : inclut les frais de scolarité de l'école certifiée. */
  softPower: number;
  vedette: boolean;
};

export const FORMULES: Formule[] = [
  {
    id: 'essentielle',
    nom: 'Essentielle',
    description:
      "L'administratif complet : frais consulaires, traductions, école si applicable, et suivi du dossier.",
    standard: 1250,
    softPower: 1950,
    vedette: false,
  },
  {
    id: 'premium',
    nom: 'Premium',
    description: "Essentielle, plus le vol régional, l'hôtel et les transferts aéroport.",
    standard: 1700,
    softPower: 2650,
    vedette: false,
  },
  {
    id: 'vip',
    nom: 'VIP',
    description: "Tout inclus : vol depuis l'Europe, hôtels haut de gamme et chauffeurs privés.",
    standard: 2800,
    softPower: 4250,
    vedette: true,
  },
];

/**
 * Nombre de pages de traduction assermentée comprises dans le forfait.
 *
 * Ce plafond n'est pas une restriction commerciale, c'est une protection.
 * Trois mois de relevés d'un compte actif représentent quinze à vingt pages,
 * soit 500 à 700 € au tarif du marché — sur un seul dossier. Sans plafond, un
 * forfait « traductions incluses » devient un chèque en blanc, et il le
 * devient d'autant plus que les fonds exigés se multiplient par le nombre de
 * personnes rattachées.
 */
export const PAGES_TRADUCTION_INCLUSES = 10;

/** Mention affichée sous les tarifs, partout où ils apparaissent. */
export const MENTION_TRADUCTIONS =
  `Traductions assermentées comprises jusqu'à ${PAGES_TRADUCTION_INCLUSES} pages ; ` +
  'au-delà, facturées au coût réel sur justificatif.';

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
