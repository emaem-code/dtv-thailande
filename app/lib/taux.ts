/**
 * Conversion du seuil bancaire du Visa DTV, exprimé en bahts.
 *
 * Le montant qui fait foi pour l'ambassade est celui en THB. Sa contre-valeur
 * en euros n'est qu'indicative et bouge tous les jours : on la calcule donc à
 * partir du cours réel, et on l'arrondit toujours à la centaine SUPÉRIEURE
 * pour ne jamais afficher un montant qui laisserait le lecteur sous le seuil.
 */

/** Seuil exigé par l'ambassade, en bahts. */
export const FONDS_THB = 500_000;

/**
 * Cours de repli si l'API est injoignable (1 EUR = X THB).
 * À réactualiser une ou deux fois par an — il ne sert qu'en cas de panne.
 */
export const TAUX_SECOURS = 38.4;

/** Marge conseillée, en euros, pour absorber les variations de change. */
export const MARGE_CONSEILLEE = '15 000 à 16 000 €';

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
