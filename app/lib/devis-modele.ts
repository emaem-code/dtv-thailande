import {
  HONORAIRES,
  PALIER_MAX,
  FRAIS_CONSULAIRES,
  ECOLE_SOFT_POWER,
  TRADUCTION_THB_PAR_PAGE,
  PAGES,
} from './tarifs';
import { fondsFoyerThb, eurosFoyer, formateThb, TAUX_SECOURS } from './taux';
import { ACOMPTE_POURCENT } from './agence';

/**
 * Modèle du devis : types et calculs, sans aucun accès à la base.
 *
 * Ce fichier est importé par des composants client (l'éditeur, le document).
 * Le séparer de la persistance n'est pas une coquetterie : sans cette coupure,
 * le pilote Postgres se retrouve embarqué dans le paquet envoyé au navigateur,
 * et la compilation échoue sur `fs`, `net` et `dns`.
 *
 * Modèle du devis.
 *
 * La distinction structurante est entre `honoraires` — un entier, la seule
 * somme qui entre dans le chiffre d'affaires — et `debours`, une liste de
 * lignes qui transitent vers des tiers. Elles ne sont jamais additionnées dans
 * un même total : le document affiche deux montants distincts, et l'acompte ne
 * porte que sur le premier. Fondre les deux ferait entrer dans l'assiette
 * imposable de l'ordre de deux mille euros par dossier familial.
 */

export type Debours = {
  libelle: string;
  /** Nombre d'unités : personnes, pages, documents. */
  quantite: number;
  /** Prix unitaire en euros. */
  unitaire: number;
  /** Précision affichée en petit sous le libellé. */
  detail?: string;
};

export type Client = {
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
};

export type Dossier = {
  personnes: number;
  adultes: number;
  enfants: number;
  softPower: boolean;
  formule: 'essentielle' | 'premium' | 'vip';
  destination: string;
  remarques: string;
};

/**
 * Le faisceau de preuves attaché à une acceptation.
 *
 * `contrat` conserve le texte exact accepté et `empreinte` son condensat. Les
 * deux sont redondants à dessein : l'un se relit, l'autre se vérifie. Sans le
 * texte, une empreinte ne prouve rien de lisible ; sans l'empreinte, un texte
 * conservé par le prestataire ne prouve rien d'opposable.
 */
export type Signature = {
  nom: string;
  prenom: string;
  adresse: string;
  /** Boîte où le code à usage unique a été reçu — la preuve d'identité. */
  email: string;
  signeLe: string;
  ip: string;
  navigateur: string;
  empreinte: string;
  contrat: string;
  /** Demande expresse d'exécution avant la fin du délai de rétractation. */
  renonciationRetractation: boolean;
  /** Montants au moment de l'acceptation, pour les retrouver sans recalcul. */
  honoraires: number;
  total: number;
};

/** Étapes franchies et pièces réunies, tenus à jour après la signature. */
export type Suivi = {
  /** Index dans ETAPES : -1 tant que rien n'est franchi. */
  etape: number;
  note: string;
  majLe: string | null;
  /** Pièces cochées par le client, par identifiant. */
  pieces: Record<string, boolean>;
};

export function suiviVide(): Suivi {
  return { etape: -1, note: '', majLe: null, pieces: {} };
}

export type Devis = {
  id: number;
  numero: string;
  jeton: string;
  creeLe: string;
  majLe: string;
  envoyeLe: string | null;
  statut: 'brouillon' | 'envoye' | 'accepte' | 'refuse';
  leadId: number | null;
  client: Client;
  dossier: Dossier;
  honoraires: number;
  debours: Debours[];
  signature: Signature | null;
  suivi: Suivi;
};

export type Totaux = {
  honoraires: number;
  acompte: number;
  solde: number;
  debours: number;
  total: number;
  parPersonne: number;
  fondsThb: string;
  fondsEuros: number;
  surDevis: boolean;
};

// ─── CALCULS ──────────────────────────────────────────────────────────────────

export function totaliser(d: Pick<Devis, 'honoraires' | 'debours' | 'dossier'>): Totaux {
  const debours = d.debours.reduce((s, l) => s + Math.round(l.quantite * l.unitaire), 0);
  const total = d.honoraires + debours;
  const n = Math.max(1, d.dossier.personnes || 1);
  const acompte = Math.round((d.honoraires * ACOMPTE_POURCENT) / 100);

  return {
    honoraires: d.honoraires,
    acompte,
    solde: d.honoraires - acompte,
    debours,
    total,
    parPersonne: Math.round(total / n),
    fondsThb: formateThb(fondsFoyerThb(n)),
    fondsEuros: eurosFoyer(TAUX_SECOURS, n),
    surDevis: n > PALIER_MAX,
  };
}

/** Lignes de débours pré-remplies pour un dossier donné. Toutes restent modifiables. */
export function deboursParDefaut(
  personnes: number,
  softPower: boolean,
  tauxThbParEuro = TAUX_SECOURS,
): Debours[] {
  const n = Math.max(1, personnes || 1);
  const pageEuros = Math.round((TRADUCTION_THB_PAR_PAGE / tauxThbParEuro) * 100) / 100;
  const pages = (softPower ? PAGES.softPower : PAGES.standard) + (n - 1) * PAGES.rattache;

  const lignes: Debours[] = [
    {
      libelle: 'Frais consulaires — ambassade de Thaïlande à Paris',
      quantite: n,
      unitaire: FRAIS_CONSULAIRES,
      detail: `${FRAIS_CONSULAIRES} € par personne, enfants rattachés compris`,
    },
  ];

  if (softPower) {
    lignes.push({
      libelle: 'Inscription à l’école certifiée (voie Soft Power)',
      quantite: 1,
      unitaire: ECOLE_SOFT_POWER,
      detail: 'Demandeur principal — réglée directement à l’école',
    });
  }

  lignes.push({
    libelle: 'Traductions certifiées',
    quantite: pages,
    unitaire: pageEuros,
    detail: `${TRADUCTION_THB_PAR_PAGE} THB la page — estimation, refacturée au coût réel`,
  });

  return lignes;
}

export function honorairesParDefaut(personnes: number): number {
  return HONORAIRES[Math.min(Math.max(1, personnes || 1), PALIER_MAX)];
}

// ─── NORMALISATION ────────────────────────────────────────────────────────────

/**
 * Met une majuscule à un nom de lieu saisi entièrement en minuscules.
 *
 * « bangkok » sur un document remis à un client fait négligé, et se corriger à
 * la main s'oublie une fois sur deux. La retouche ne s'applique que si rien
 * n'est déjà capitalisé : une saisie volontaire — « Koh Pha Ngan », un sigle,
 * un nom composé — reste intacte. Corriger ce que l'utilisateur a écrit
 * exprès serait pire que le défaut qu'on répare.
 */
export function capitaliserLieu(valeur: string): string {
  const texte = valeur.trim();
  if (!texte || texte !== texte.toLowerCase()) return texte;
  return texte.replace(/(^|[\s'’-])([a-zà-ÿ])/g, (_, avant: string, lettre: string) =>
    avant + lettre.toUpperCase(),
  );
}

/**
 * Remet un dossier au propre avant enregistrement.
 *
 * La normalisation se fait à l'écriture et non à l'affichage : le document
 * montré au client et le texte canonique signé lisent la même valeur stockée,
 * sans risque de divergence entre les deux.
 */
export function normaliserDossier(dossier: Dossier): Dossier {
  return { ...dossier, destination: capitaliserLieu(dossier.destination ?? '') };
}
