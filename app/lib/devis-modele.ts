import {
  HONORAIRES,
  PALIER_MAX,
  FRAIS_CONSULAIRES,
  ECOLE_SOFT_POWER,
  TRADUCTION_THB_PAR_PAGE,
  PAGES,
  SUPPLEMENT_FORMULE,
  FORMULES_VENDUES,
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
  /** Renseignée lorsque le devis proposait plusieurs formules au choix. */
  formuleChoisie?: Dossier['formule'];
  /** Demande expresse d'exécution avant la fin du délai de rétractation. */
  renonciationRetractation: boolean;
  /** Montants au moment de l'acceptation, pour les retrouver sans recalcul. */
  honoraires: number;
  total: number;
};

/**
 * Une variante proposée au client, dans un devis à options.
 *
 * Les montants sont figés à l'établissement du devis et non recalculés à la
 * signature : entre les deux, la grille ou le cours du baht ont pu bouger, et
 * le client doit obtenir exactement le prix qu'il a lu.
 */
export type Option = {
  formule: Dossier['formule'];
  honoraires: number;
  debours: Debours[];
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
  /**
   * Variantes soumises au choix du client.
   *
   * Vide pour un devis classique. Non vide, le document présente les formules
   * côte à côte et le client tranche au moment de signer — un seul numéro, un
   * seul document, au lieu de trois devis concurrents dont personne ne sait
   * plus lequel fait foi. À la signature, l'option retenue est recopiée dans
   * `honoraires`, `debours` et `dossier.formule` : le devis signé redevient un
   * devis ordinaire, et tout ce qui le lit ensuite n'a pas à connaître
   * l'existence des options.
   */
  options: Option[];
  /**
   * Le mot personnel placé en tête du courriel, à la place de la formule
   * d'ouverture type. Conservé avec le devis, et non dans l'éditeur : on le
   * rédige rarement d'un trait, et un brouillon qu'on rouvre doit retrouver ce
   * qu'on y avait écrit.
   */
  message: string;
  /** Date de la relance envoyée, ou null si aucune ne l'a encore été. */
  relanceLe: string | null;
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
  formule: Dossier['formule'] = 'essentielle',
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

  // Le voyage ne figure pas ici, et c'est délibéré. Les frais consulaires et
  // les traductions sont causés par la prestation : sans le dossier de visa,
  // ils n'existent pas. Le vol, lui, est causé par le déménagement — le client
  // le paiera que le prestataire soit là ou non. Les mêler gonflait le budget
  // affiché de 2 000 € par personne pour de l'argent qui n'a rien à voir avec
  // l'opération facturée. L'ordre de grandeur est donné en note (voir
  // `mentionVoyage`), hors de tout total.

  return lignes;
}

/**
 * Honoraires de la grille, pour une composition et une formule données.
 *
 * La formule entrait nulle part avant le 18 septembre 2026 : un dossier VIP
 * ressortait au prix d'un Essentielle, soit 1 550 € d'honoraires oubliés à
 * chaque devis haut de gamme. Le paramètre n'a pas de valeur par défaut, pour
 * qu'aucun appelant ne puisse la négliger de nouveau sans que la compilation
 * le signale.
 */
export function honorairesParDefaut(personnes: number, formule: Dossier['formule']): number {
  return (
    HONORAIRES[Math.min(Math.max(1, personnes || 1), PALIER_MAX)] + SUPPLEMENT_FORMULE[formule]
  );
}

// ─── NORMALISATION ────────────────────────────────────────────────────────────

/**
 * Remet en forme un nom propre saisi tout en minuscules ou tout en capitales.
 *
 * « bangkok » sur un document remis à un client fait négligé, « BANGKOK » fait
 * crier — et les deux se corrigent à la main une fois sur deux seulement. Les
 * formulaires en sont la source : un visiteur qui tape son prénom au clavier
 * d'un téléphone laisse la majuscule verrouillée sans y penser.
 *
 * La retouche ne s'applique qu'aux deux cas sans ambiguïté : tout en bas de
 * casse, ou tout en capitales. Une saisie déjà mixte — « Koh Pha Ngan »,
 * « McDonald », un nom composé — reste intacte, parce qu'elle a été voulue.
 * Corriger ce que l'utilisateur a écrit exprès serait pire que le défaut qu'on
 * répare.
 */
export function capitaliserLieu(valeur: string): string {
  const texte = valeur.trim();
  if (!texte) return texte;

  const toutEnBas = texte === texte.toLowerCase();
  const toutEnHaut = texte === texte.toUpperCase();
  // Un texte sans aucune lettre (« 75011 ») satisfait les deux tests : rien à
  // faire, et surtout rien à casser.
  if (toutEnBas === toutEnHaut) return texte;

  const base = toutEnHaut ? texte.toLowerCase() : texte;
  return base.replace(/(^|[\s'’-])([a-zà-ÿ])/g, (_, avant: string, lettre: string) =>
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
/**
 * Construit les variantes d'un devis à options, aux valeurs de la grille.
 *
 * L'ordre suit celui des formules, du moins cher au plus cher : un client qui
 * compare lit d'abord le prix d'appel, et chaque colonne suivante se justifie
 * par rapport à la précédente.
 */
export function construireOptions(
  dossier: Dossier,
  formules: Dossier['formule'][],
): Option[] {
  const ordre = FORMULES_VENDUES.map((f) => f.id);
  return ordre
    .filter((f) => formules.includes(f))
    .map((formule) => ({
      formule,
      honoraires: honorairesParDefaut(dossier.personnes, formule),
      debours: deboursParDefaut(dossier.personnes, dossier.softPower, formule),
    }));
}

/** Le devis tel qu'il serait si le client retenait cette option. */
export function devisSelonOption(devis: Devis, option: Option): Devis {
  return {
    ...devis,
    dossier: { ...devis.dossier, formule: option.formule },
    honoraires: option.honoraires,
    debours: option.debours,
  };
}

export function normaliserDossier(dossier: Dossier): Dossier {
  return { ...dossier, destination: capitaliserLieu(dossier.destination ?? '') };
}

/**
 * Remet le nom du client au propre avant enregistrement.
 *
 * Il ne sert pas qu'à l'en-tête du devis : c'est lui qui ouvre le courriel
 * (« Bonjour MATTEO, ») et qui pré-remplit le prénom de la signature. Une
 * capitale verrouillée au moment de remplir le formulaire se propageait donc
 * partout d'un coup.
 */
export function normaliserClient(client: Client): Client {
  return { ...client, nom: capitaliserLieu(client.nom ?? '') };
}
