'use client';

import React, { useState } from 'react';
import { useModalA11y } from './useModalA11y';
import { VERIFICATION_ECOLE, SOURCES_PROCEDURE } from '../lib/methode-dtv';
import SourcesProcedure from './SourcesProcedure';
import s from '../parcours.module.css';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FaqModal({ isOpen, onClose }: FaqModalProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { dialogRef, handleDialogKeyDown } = useModalA11y(isOpen, onClose);

  if (!isOpen) return null;

  const faqs = [
    {
      category: "Finances & Épargne",
      q: "Faut-il bloquer cette somme sur mon compte pendant les 5 ans du visa ?",
      a: "Non. La preuve n'est exigée qu'au dépôt de la demande initiale (et lors d'éventuelles extensions locales), et l'argent n'est jamais bloqué. L'ambassade de Paris demande en revanche un solde créditeur non bloqué d'au moins 15 000 € par personne sur chacun des trois derniers relevés mensuels — un solde tenu, pas un solde atteint une fois. Votre historique est relu avant le dépôt pour écarter tout refus lié à une fluctuation."
    },
    {
      category: "Finances & Épargne",
      q: "Mes investissements (Crypto, PEA, Actions) comptent-ils comme garantie ?",
      a: "Malheureusement, non. L'ambassade thaïlandaise est très conservatrice et rejette les actifs volatils. La somme doit être disponible sur un compte courant ou d'épargne classique. Je vous accompagne dans la présentation de vos relevés (y compris de néobanques comme Revolut ou Boursorama) pour qu'ils respectent les stricts standards consulaires."
    },
    {
      category: "Statut Freelance & Télétravail",
      q: "Je suis Auto-entrepreneur / Indépendant et n'ai pas d'employeur. Est-ce un problème ?",
      a: "C'est le profil le plus courant, mais aussi celui qui subit le plus de refus si le dossier est mal monté. L'ambassade s'attend à des fiches de paie classiques. Je me charge de 'traduire' la réalité de votre micro-entreprise (Kbis, URSSAF, Sirene, portfolio) en un dossier administratif irréfutable aux yeux des officiers d'immigration thaïlandais."
    },
    {
      category: "Soft Power (Écoles & Immersion)",
      q: VERIFICATION_ECOLE.question,
      a: VERIFICATION_ECOLE.reponse,
      sources: [SOURCES_PROCEDURE.parisDtv],
    },
    {
      category: "Famille & PACS",
      q: "Mon partenaire et moi sommes pacsés. Le visa s'étend-il à mon conjoint ?",
      a: "Attention, piège majeur : le droit thaïlandais ne reconnaît pas le PACS, uniquement le mariage civil. Si vous n'êtes pas mariés, la demande d'un visa 'accompagnant' sera automatiquement rejetée. Mais rassurez-vous, je vous aide à préparer des dossiers individuels synchronisés pour organiser votre départ ensemble."
    },
    {
      category: "Fiscalité & Impôts",
      q: "Vais-je payer des impôts en Thaïlande avec le DTV ?",
      a: "Le visa DTV ne fait pas automatiquement de vous un résident fiscal. Vous ne devenez imposable en Thaïlande que si vous y séjournez plus de 180 jours dans l'année ET que vous y rapatriez des revenus. Dans le cadre de l’accompagnement, je vous donne les recommandations de base pour comprendre la convention fiscale franco-thaïlandaise et optimiser votre calendrier de voyage."
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={s.voile}>
      <div className={s.fond} onClick={onClose} />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="faq-modal-title"
        tabIndex={-1}
        onKeyDown={handleDialogKeyDown}
        className={`${s.fenetre} ${s.faq}`}
      >
        
        {/* Header */}
        <div className={s.enteteModale}>
          <h2 id="faq-modal-title" className="text-xl md:text-2xl font-extrabold text-white tracking-wide">
            Foire Aux Questions <span className="text-amber-500">(FAQ)</span>
          </h2>
          <button onClick={onClose} aria-label="Fermer la FAQ" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Contenu FAQ */}
        <div className={`${s.corpsModale} flex-1 overflow-y-auto p-6 md:p-8`}>
          <p className="text-gray-400 mb-8 text-sm md:text-base">
            L'immigration thaïlandaise est stricte et les rumeurs sur internet sont nombreuses. Voici des réponses claires et vérifiées aux questions les plus fréquentes concernant l'obtention du Visa DTV.
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index} 
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-amber-500/30 bg-amber-500/5' : 'border-white/10 bg-white/5 hover:border-white/20'}`}
                >
                  <button 
                    onClick={() => toggleQuestion(index)}
                    className="w-full text-left p-5 flex items-start justify-between gap-4 focus:outline-none"
                  >
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-amber-500 font-bold block mb-1">{faq.category}</span>
                      <h3 className="text-white font-bold text-base md:text-lg pr-4">{faq.q}</h3>
                    </div>
                    <div className={`mt-1 flex-none transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-5 pt-0 text-gray-400 text-sm md:text-base leading-relaxed border-t border-white/5 mt-2">
                      <p>{faq.a}</p>
                      {faq.sources && <SourcesProcedure sources={faq.sources} className="text-xs text-gray-400 mt-3" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 p-6 bg-white/5 border border-white/10 rounded-2xl text-center">
            <h4 className="text-white font-bold mb-2">Une question non abordée ici ?</h4>
            <p className="text-sm text-gray-400 mb-4">Chaque situation est unique. Confiez-moi l'analyse de votre profil.</p>
            <button 
              onClick={onClose} 
              className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all active:scale-95 text-sm"
            >
              Fermer et faire le test d'éligibilité
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
