'use client';

import { useEffect, useState } from 'react';

/**
 * Renvoie vrai une fois que le visiteur a dépassé un certain défilement.
 *
 * Sert à n'afficher les appels à l'action flottants qu'à partir du moment où
 * ils deviennent utiles. En haut de page, ils font doublon avec les boutons de
 * l'en-tête et du hero ; plus bas, ils redeviennent le seul moyen d'agir.
 */
export function useApparitionAuScroll(seuil = 400): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const verifier = () => setVisible(window.scrollY > seuil);
    verifier();

    // passive: le navigateur sait qu'on ne bloquera pas le défilement
    window.addEventListener('scroll', verifier, { passive: true });
    return () => window.removeEventListener('scroll', verifier);
  }, [seuil]);

  return visible;
}
