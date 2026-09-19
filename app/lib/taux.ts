/**
 * Seuil bancaire du Visa DTV.
 *
 * ATTENTION — deux montants coexistent, et les confondre coûte un refus :
 *
 *   • 500 000 THB est la règle NATIONALE thaïlandaise. C'est elle qui
 *     s'applique dans les postes qui raisonnent en bahts.
 *
 *   • 15 000 € est le montant que l'AMBASSADE DE PARIS affiche sur sa propre
 *     page de documents requis, en euros et non en bahts :
 *       « Relevé bancaire officiel d'un solde créditeur (non bloqué) minimum
 *         de 15 000 euros/par mois, au cours des 3 derniers mois »
 *
 * Ce n'est donc PAS une conversion : Paris a figé sa propre équivalence, et
 * elle est supérieure à la contre-valeur du jour des 500 000 THB (de l'ordre
 * de 13 100 € à 38,4 THB/€). Un dossier calibré sur la conversion passe donc
 * sous l'exigence du poste d'environ deux mille euros.
 *
 * Depuis la règle du 31 août 2026, un ressortissant français dépose à Paris —
 * le montant à afficher au client est donc celui de Paris, en euros. La
 * mécanique de change ci-dessous ne sert plus qu'aux montants réellement
 * libellés en bahts (les traductions assermentées, facturées à la page).
 */

/** Règle nationale thaïlandaise, en bahts. Conservée pour mémoire et contexte. */
export const FONDS_THB = 500_000;

/**
 * Seuil affiché par l'ambassade de Thaïlande à Paris, en euros et PAR PERSONNE.
 * Source : thaiembassy.fr, page « DTV », rubrique documents requis.
 * Vérifié le 19 septembre 2026. À recontrôler à chaque changement de règles.
 */
export const FONDS_EUR_PARIS = 15_000;

/**
 * Cours de repli si l'API est injoignable (1 EUR = X THB).
 * À réactualiser une ou deux fois par an — il ne sert qu'en cas de panne.
 */
export const TAUX_SECOURS = 38.4;

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

/** Contre-valeur en euros du seuil applicable à un foyer, arrondie à la centaine supérieure. */
export function eurosFoyer(tauxThbParEuro: number, nbPersonnes: number): number {
  return Math.ceil(fondsFoyerThb(nbPersonnes) / tauxThbParEuro / 100) * 100;
}

/**
 * Montant exigé par l'ambassade de Paris pour un foyer, en euros.
 *
 * C'est la fonction à utiliser partout où l'on annonce au client ce qu'il doit
 * justifier : elle ne dépend d'aucun cours de change, parce que l'exigence du
 * poste n'en dépend pas non plus.
 */
export function eurosFoyerParis(nbPersonnes: number): number {
  return FONDS_EUR_PARIS * Math.max(1, Math.floor(nbPersonnes) || 1);
}

/** Format thaï : 2 000 000 THB */
export function formateThb(montant: number): string {
  return `${montant.toLocaleString('fr-FR').replace(/ | | /g, ' ')} THB`;
}

/** Contre-valeur en euros, arrondie à la centaine supérieure. */
export function eurosArrondis(tauxThbParEuro: number): number {
  return Math.ceil(FONDS_THB / tauxThbParEuro / 100) * 100;
}

/** Format français : 13 100 € */
export function formateEuros(montant: number): string {
  return `${montant.toLocaleString('fr-FR').replace(/ | /g, ' ')} €`;
}

/**
 * Cours du jour, mis en cache six heures par Next.
 * Retourne le cours de repli si l'API échoue : la page ne casse jamais.
 */
export async function getTauxThb(): Promise<number> {
  // Délai maximal : sans cela, une API lente ou injoignable bloquerait
  // le rendu de la page indéfiniment côté serveur.
  const controleur = new AbortController();
  const minuteur = setTimeout(() => controleur.abort(), 2500);

  try {
    const reponse = await fetch('https://api.frankfurter.app/latest?from=EUR&to=THB', {
      signal: controleur.signal,
      next: { revalidate: 21600 },
    });
    if (!reponse.ok) return TAUX_SECOURS;

    const donnees = await reponse.json();
    const taux = donnees?.rates?.THB;

    // Garde-fou : un cours EUR/THB plausible se situe entre 25 et 60.
    // Au-delà, on considère la réponse comme corrompue.
    return typeof taux === 'number' && taux > 25 && taux < 60 ? taux : TAUX_SECOURS;
  } catch {
    return TAUX_SECOURS;
  } finally {
    clearTimeout(minuteur);
  }
}
