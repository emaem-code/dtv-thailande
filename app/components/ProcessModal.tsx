'use client';

import React from 'react';
import { useModalA11y } from './useModalA11y';
import { ETAPES_DTV, REGLE_DEPOT_DTV, SOURCES_PROCEDURE, DATE_VERIFICATION_PROCEDURE } from '../lib/methode-dtv';
import SourcesProcedure from './SourcesProcedure';
import s from '../parcours.module.css';

interface ProcessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEligibility: () => void;
}

export default function ProcessModal({ isOpen, onClose, onEligibility }: ProcessModalProps) {
  const { dialogRef, handleDialogKeyDown } = useModalA11y(isOpen, onClose);

  if (!isOpen) return null;


  return (
    <div className={s.voile}>
      <div className={s.fond} onClick={onClose} />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="process-modal-title"
        tabIndex={-1}
        onKeyDown={handleDialogKeyDown}
        className={`${s.fenetre} ${s.methode}`}
      >
        
        {/* Header */}
        <div className={s.enteteModale}>
          <h2 id="process-modal-title" className="text-xl md:text-2xl font-extrabold text-white tracking-wide">
            La méthode <span className="text-amber-500">Pas à Pas</span>
          </h2>
          <button onClick={onClose} aria-label="Fermer la méthode" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Contenu - Timeline */}
        <div className={`${s.corpsModale} flex-1 overflow-y-auto p-6 md:p-10`}>
          <p className="text-gray-400 mb-10 text-sm md:text-base max-w-2xl">
            Cinq étapes, de la préparation du dossier à votre arrivée après accord du visa.
          </p>

          <p className="text-gray-400 mb-4 text-sm">{REGLE_DEPOT_DTV}</p>
          <SourcesProcedure sources={[SOURCES_PROCEDURE.reglesAout2026]} className="text-xs text-gray-400 mb-8" />
          <div className={`${s.frise} relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent`}>
            
            {ETAPES_DTV.map((step, index) => (
              <div key={step.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                
                {/* Icône centrale */}
                <div className={`${s.pastilleEtape} flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0d0d0d] bg-white/5 group-hover:bg-amber-500 text-gray-500 group-hover:text-black transition-colors duration-300 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_#0d0d0d] z-10 font-bold text-sm`}>
                  {String(index + 1).padStart(2, "0")}
                </div>
                
                {/* Carte de contenu */}
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-amber-500/30 hover:bg-white/10 transition-all duration-300 text-left">
                  <h3 className="font-bold text-white text-lg mb-2">{step.titre}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                  <SourcesProcedure sources={step.sources} className="text-xs text-gray-400 mt-3" />
                </div>

              </div>
            ))}

          </div>

          <p className="text-xs text-gray-400 mt-6">Sources consultées le {DATE_VERIFICATION_PROCEDURE}. Les exigences du poste consulaire compétent font foi.</p>
          <div className="mt-12 text-center pt-8 border-t border-white/10">
            <h4 className="text-2xl font-black text-white mb-4">Prêt à démarrer l'aventure ?</h4>
            <button 
              onClick={onEligibility}
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.2)] active:scale-95"
            >
              Fermer et vérifier mon éligibilité
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
