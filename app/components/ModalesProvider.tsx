'use client';

import React, { createContext, useContext, useState } from 'react';
import DtvGuideModal from './DtvGuideModal';
import EligibilityFormModal from './EligibilityFormModal';
import ProcessModal from './ProcessModal';

/**
 * Les trois fenêtres du site — guide, test d'éligibilité, méthode — sont
 * désormais montées une seule fois, à la racine. N'importe quelle page peut
 * donc les ouvrir, y compris le blog, la FAQ ou les mentions légales, alors
 * qu'elles étaient auparavant enfermées dans la page d'accueil.
 */
type Modales = {
  ouvrirGuide: () => void;
  ouvrirEligibilite: () => void;
  ouvrirMethode: () => void;
};

const Contexte = createContext<Modales | null>(null);

export function useModales(): Modales {
  const ctx = useContext(Contexte);
  if (!ctx) {
    throw new Error('useModales doit être utilisé à l’intérieur de ModalesProvider');
  }
  return ctx;
}

export default function ModalesProvider({ children }: { children: React.ReactNode }) {
  const [guide, setGuide] = useState(false);
  const [eligibilite, setEligibilite] = useState(false);
  const [methode, setMethode] = useState(false);

  return (
    <Contexte.Provider
      value={{
        ouvrirGuide: () => setGuide(true),
        ouvrirEligibilite: () => setEligibilite(true),
        ouvrirMethode: () => setMethode(true),
      }}
    >
      {children}

      <DtvGuideModal isOpen={guide} onClose={() => setGuide(false)} />
      <EligibilityFormModal isOpen={eligibilite} onClose={() => setEligibilite(false)} />
      <ProcessModal isOpen={methode} onClose={() => setMethode(false)} />
    </Contexte.Provider>
  );
}
