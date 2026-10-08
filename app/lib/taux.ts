import { lirePoste, type PosteId } from './residence-consulaire';
import { regleNationaleDtv, type Information, type Montant } from './postes-consulaires';

/** Compatibilité des pages éditoriales Paris ; leur maillage est le second chantier. */
export const FONDS_THB = regleNationaleDtv.fonds.valeur!.montant;
export const FONDS_EUR_PARIS = lirePoste('paris').fonds.minimumEnDeviseLocale.valeur!.montant;

/**
 * Montant conseillé au client, en euros et PAR PERSONNE.
 *
 * Au-dessus du seuil de Paris, jamais à son niveau exact : présenter
 * 15 000,00 € pile à un guichet qui en exige 15 000 ne laisse aucune place à
 * un arrondi, à un agio prélevé la veille ou à une lecture tatillonne.
 */
export const MARGE_CONSEILLEE = '16 000 €';

/**
 * Le seuil s'applique à CHAQUE personne du foyer, accompagnants compris.
 *
 * C'est le point sur lequel le site s'est longtemps trompé, et l'erreur était
 * coûteuse : une famille de quatre lisait 500 000 THB quand l'ambassade en
 * exige deux millions. Chaque demandeur, y compris le conjoint et les enfants
 * rattachés, doit justifier individuellement du seuil.
 *
 * Une seule simplification est admise : lorsque le compte est joint, le
 * titulaire et son conjoint produisent le même justificatif. Le montant reste
 * cumulé — c'est la pièce qui est unique, pas la somme exigée.
 */
export function fondsFoyerThb(nbPersonnes: number): number {
  return FONDS_THB * Math.max(1, Math.floor(nbPersonnes) || 1);
}

/**
 * Montant exigé par l'ambassade de Paris pour un foyer, en euros.
 *
 * Réservée aux contenus explicitement consacrés à Paris. Les dossiers
 * personnalisés utilisent fondsPourPoste, jamais ce raccourci.
 */
export function eurosFoyerParis(nbPersonnes: number): number {
  return FONDS_EUR_PARIS * Math.max(1, Math.floor(nbPersonnes) || 1);
}

/** Format thaï : 2 000 000 THB */
export function formateThb(montant: number): string {
  return `${montant.toLocaleString('fr-FR').replace(/ | | /g, ' ')} THB`;
}

/** Format français : 13 100 € */
export function formateEuros(montant: number): string {
  return `${montant.toLocaleString('fr-FR').replace(/ | /g, ' ')} €`;
}

export type CoursDevis = {
  date: string;
  source: string;
  parEuro: { EUR: number; THB: number; CHF: number; CAD: number; MAD: number };
};

const SOURCE_COURS = 'https://api.frankfurter.dev/v2/rates?base=EUR&quotes=THB,CHF,CAD,MAD';

/** Aucun cours de secours non daté pour les repères consulaires. */
export async function getCoursDevis(): Promise<CoursDevis | null> {
  try {
    const reponse = await fetch(SOURCE_COURS, {
      signal: AbortSignal.timeout(2500), next: { revalidate: 21600 },
    });
    if (!reponse.ok) return null;
    const donnees: unknown = await reponse.json();
    if (!Array.isArray(donnees) || donnees.length !== 4) return null;
    const devises = ['THB', 'CHF', 'CAD', 'MAD'] as const;
    if (!donnees.every((r) => r && r.base === 'EUR' && r.date === donnees[0].date && typeof r.rate === 'number')) return null;
    if (!devises.every((devise) => donnees.filter((r) => r.quote === devise).length === 1)) return null;
    const taux = (devise: string) => donnees.find((r) => r.quote === devise)!.rate;
    const cours: CoursDevis = {
      date: donnees[0].date, source: SOURCE_COURS,
      parEuro: { EUR: 1, THB: taux('THB'), CHF: taux('CHF'), CAD: taux('CAD'), MAD: taux('MAD') },
    };
    return coursValide(cours) && Date.now() - Date.parse(cours.date) < 7 * 86400000 ? cours : null;
  } catch {
    return null;
  }
}

export function coursValide(cours?: CoursDevis | null): cours is CoursDevis {
  if (!cours || cours.source !== SOURCE_COURS || !/^\d{4}-\d{2}-\d{2}$/.test(cours.date)) return false;
  const date = Date.parse(`${cours.date}T00:00:00Z`);
  if (!Number.isFinite(date) || date > Date.now()) return false;
  const r = cours.parEuro;
  return !!r && r.EUR === 1 && r.THB > 25 && r.THB < 60 && r.CHF > 0.5 && r.CHF < 2 && r.CAD > 0.8 && r.CAD < 2.5 && r.MAD > 5 && r.MAD < 20;
}

export const formatMontant = ({ montant, devise }: Montant) =>
  `${montant.toLocaleString('fr-FR').replace(/ | /g, ' ')} ${devise === 'EUR' ? '€' : devise}`;

export const dateCoursFr = (date: string) => date.split('-').reverse().join('/');

export type RepereFonds = {
  /** La donnée officielle reste intacte, avec sa provenance et ses réserves. */
  information: Information<Montant>;
  texte: string;
  marge: string | null;
  conversion: { montant: Montant; cours: CoursDevis } | null;
};

export function fondsPourPoste(id: PosteId, personnes = 1, cours?: CoursDevis | null, ajout = 0): RepereFonds {
  const poste = lirePoste(id);
  const information = poste.fonds.minimumEnDeviseLocale.valeur !== null
    ? poste.fonds.minimumEnDeviseLocale : poste.fonds.minimumPublie;
  const minimum = information.valeur;
  if (!minimum) return { information, texte: 'Montant à confirmer auprès du poste', marge: null, conversion: null };
  const n = Math.max(1, Math.floor(personnes) || 1);
  const montant = { ...minimum, montant: minimum.montant * n + ajout };
  const marge = (m: Montant) => formatMontant({ ...m, montant: Math.ceil(m.montant * (16 / 15) / 100) * 100 });
  // Un montant local publié prime toujours ; il ne passe jamais par une conversion.
  if (poste.fonds.minimumEnDeviseLocale.valeur !== null) {
    return { information, texte: formatMontant(montant), marge: marge(montant), conversion: null };
  }
  if ((id === 'berne' || id === 'ottawa') && minimum.devise === 'THB' && coursValide(cours)) {
    const devise = id === 'berne' ? 'CHF' : 'CAD';
    const estimation = {
      montant: Math.ceil(montant.montant / cours.parEuro.THB * cours.parEuro[devise] / 100) * 100,
      devise,
    } as const;
    return {
      information,
      texte: `${formatMontant(montant)}, soit environ ${formatMontant(estimation)} au cours du ${dateCoursFr(cours.date)}`,
      marge: marge(estimation), conversion: { montant: estimation, cours },
    };
  }
  return { information, texte: formatMontant(montant), marge: null, conversion: null };
}
