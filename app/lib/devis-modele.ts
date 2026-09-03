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
