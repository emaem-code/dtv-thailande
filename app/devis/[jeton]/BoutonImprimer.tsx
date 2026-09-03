'use client';

import React from 'react';

/**
 * L'enregistrement en PDF passe par la boîte d'impression du navigateur.
 *
 * Générer le PDF côté serveur imposerait d'embarquer un navigateur complet sur
 * une plateforme sans serveur : lent, lourd, et pour un rendu identique. La
 * feuille de style `print:` du document fait déjà le travail.
 */
export default function BoutonImprimer() {
  return (
    <button
      onClick={() => window.print()}
      className="text-sm border border-white/15 text-gray-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-full transition-colors"
    >
      Imprimer ou enregistrer en PDF
    </button>
  );
}
