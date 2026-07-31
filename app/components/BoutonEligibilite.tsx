'use client';

import React from 'react';
import { useModales } from './ModalesProvider';

/**
 * Bouton qui ouvre le test d'éligibilité sur place.
 *
 * Remplace les anciens liens vers l'accueil : le visiteur reste sur l'article
 * qu'il est en train de lire, et la fenêtre s'ouvre par-dessus. On évite ainsi
 * de lui faire perdre sa lecture — et de perdre la conversion au passage.
 */
export default function BoutonEligibilite({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { ouvrirEligibilite } = useModales();
  return (
    <button type="button" onClick={ouvrirEligibilite} className={className}>
      {children}
    </button>
  );
}
