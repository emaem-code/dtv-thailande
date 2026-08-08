'use client';

import React, { useRef } from 'react';
import { useModalA11y } from './useModalA11y';
import FormulaireEligibilite from './FormulaireEligibilite';

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
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="eligibility-modal-title"
        tabIndex={-1}
        onKeyDown={handleDialogKeyDown}
        className="relative bg-[#0d0d0d] w-full max-w-3xl max-h-[90vh] rounded-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300"
      >
        <FormulaireEligibilite variante="modal" onClose={onClose} conteneurScroll={scrollRef} />
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); border-radius: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
      `,
        }}
      />
    </div>
  );
}
