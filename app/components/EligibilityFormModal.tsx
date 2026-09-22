'use client';

import React, { useRef } from 'react';
import { useModalA11y } from './useModalA11y';
import FormulaireEligibilite from './FormulaireEligibilite';
import s from '../parcours.module.css';

interface EligibilityFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Habillage « fenêtre » du test d'éligibilité.
 *
 * Tout le formulaire vit désormais dans FormulaireEligibilite, partagé avec la
 * page /eligibilite. Ce composant ne conserve que ce qui est propre à la
 * modale : le voile, le piégeage du focus et le conteneur défilant.
 */
export default function EligibilityFormModal({ isOpen, onClose }: EligibilityFormModalProps) {
  const { dialogRef, handleDialogKeyDown } = useModalA11y(isOpen, onClose);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  return (
    <div className={s.voile}>
      <div className={s.fond} onClick={onClose} />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="eligibility-modal-title"
        tabIndex={-1}
        onKeyDown={handleDialogKeyDown}
        className={s.fenetre}
      >
        <FormulaireEligibilite variante="modal" onClose={onClose} conteneurScroll={scrollRef} />
      </div>
    </div>
  );
}
