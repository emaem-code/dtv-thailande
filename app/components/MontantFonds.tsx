'use client';

import { useEffect, useState } from 'react';
import { TAUX_SECOURS, eurosFoyer, fondsFoyerThb, formateEuros, formateThb } from '../lib/taux';

/**
 * Contre-valeur en euros du seuil bancaire, actualisée au cours du jour.
 *
 * Le seuil s'applique à chaque personne du foyer : la propriété `personnes`
 * permet donc d'afficher le montant réellement exigé d'une famille, et non
 * celui d'un demandeur isolé.
 *
 * La page d'accueil étant un composant client, on ne peut pas interroger l'API
 * côté serveur. On affiche donc immédiatement la valeur calculée avec le cours
 * de repli — elle est présente dans le HTML, donc visible par Google et sans
 * décalage de mise en page — puis on l'ajuste discrètement au cours réel.
 */
export default function MontantFonds({
  prefixe = '≈ ',
  ajout = 0,
  personnes = 1,
}: {
  prefixe?: string;
  /** Nombre de personnes du foyer, accompagnants compris. */
  personnes?: number;
  /**
   * Somme ajoutée à la contre-valeur affichée, en euros.
   * Sert aux exemples pédagogiques du type « un relevé à 50 € au-dessus du
   * seuil » : les deux montants restent ainsi calés sur le cours du jour, au
   * lieu de vieillir séparément dans le texte.
   */
  ajout?: number;
}) {
  const [euros, setEuros] = useState(() => eurosFoyer(TAUX_SECOURS, personnes));

  useEffect(() => {
    let actif = true;
    fetch('https://api.frankfurter.app/latest?from=EUR&to=THB')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const taux = d?.rates?.THB;
        if (actif && typeof taux === 'number' && taux > 25 && taux < 60) {
          setEuros(eurosFoyer(taux, personnes));
        }
      })
      .catch(() => {
        /* on garde la valeur de repli */
      });
    return () => {
      actif = false;
    };
  }, [personnes]);

  return (
    <span title={`${formateThb(fondsFoyerThb(personnes))} au cours du jour`}>
      {prefixe}
      {formateEuros(euros + ajout)}
    </span>
  );
}
