'use client';

import { useEffect, useState } from 'react';
import { FONDS_THB, TAUX_SECOURS, eurosArrondis, formateEuros } from '../lib/taux';

/**
 * Contre-valeur en euros des 500 000 THB, actualisée au cours du jour.
 *
 * La page d'accueil étant un composant client, on ne peut pas interroger l'API
 * côté serveur. On affiche donc immédiatement la valeur calculée avec le cours
 * de repli — elle est présente dans le HTML, donc visible par Google et sans
 * décalage de mise en page — puis on l'ajuste discrètement au cours réel.
 */
export default function MontantFonds({
  prefixe = '≈ ',
  ajout = 0,
}: {
  prefixe?: string;
  /**
   * Somme ajoutée à la contre-valeur affichée, en euros.
   * Sert aux exemples pédagogiques du type « un relevé à 50 € au-dessus du
   * seuil » : les deux montants restent ainsi calés sur le cours du jour, au
   * lieu de vieillir séparément dans le texte.
   */
  ajout?: number;
}) {
  const [euros, setEuros] = useState(() => eurosArrondis(TAUX_SECOURS));

  useEffect(() => {
    let actif = true;
    fetch('https://api.frankfurter.app/latest?from=EUR&to=THB')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const taux = d?.rates?.THB;
        if (actif && typeof taux === 'number' && taux > 25 && taux < 60) {
          setEuros(eurosArrondis(taux));
        }
      })
      .catch(() => {
        /* on garde la valeur de repli */
      });
    return () => {
      actif = false;
    };
  }, []);

  return (
    <span title={`${FONDS_THB.toLocaleString('fr-FR')} THB au cours du jour`}>
      {prefixe}
      {formateEuros(euros + ajout)}
    </span>
  );
}
