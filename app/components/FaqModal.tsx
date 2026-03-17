'use client';

import React, { useState, useEffect } from 'react';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FaqModal({ isOpen, onClose }: FaqModalProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const faqs = [
    {
      category: "Finances & Épargne",
      q: "Faut-il bloquer 15 000 € sur mon compte pendant les 5 ans du visa ?",
      a: "Non. L'administration exige de prouver la liquidité de 500 000 THB (env. 14 500 €) uniquement lors de la demande initiale (et lors d'éventuelles extensions locales). L'argent n'est pas bloqué, mais votre historique des 3 à 6 derniers mois sera scruté à la loupe par nos experts avant le dépôt pour éviter tout refus lié à des fluctuations."
    },
    {
      category: "Finances & Épargne",
      q: "Mes investissements (Crypto, PEA, Actions) comptent-ils comme garantie ?",
      a: "Malheureusement, non. L'ambassade thaïlandaise est très conservatrice et rejette les actifs volatils. La somme doit être disponible sur un compte courant ou d'épargne classique. Nous vous accompagnons sur la présentation de vos relevés (y compris de néobanques comme Revolut ou Boursorama) pour qu'ils respectent les stricts standards consulaires."
    },
    {
      category: "Statut Freelance & Télétravail",
      q: "Je suis Auto-entrepreneur / Indépendant et n'ai pas d'employeur. Est-ce un problème ?",
      a: "C'est le profil le plus courant, mais aussi celui qui subit le plus de refus si le dossier est mal monté. L'ambassade s'attend à des fiches de paie classiques. Notre agence se charge de 'traduire' la réalité de votre micro-entreprise (Kbis, URSSAF, Sirene, portfolio) en un dossier administratif irréfutable aux yeux des officiers d'immigration thaïlandais."
    },
    {
      category: "Soft Power (Écoles & Immersion)",
      q: "Comment être certain que l'école choisie ne fera pas annuler mon visa ?",
      a: "Le risque d'utiliser une école 'fantôme' ou non agréée est une interdiction de territoire. C'est pourquoi nous ne travaillons qu'avec un réseau fermé d'établissements de Muay Thaï et de Cuisine Thaïlandaise qui possèdent une double homologation officielle (DBD et Ministère de l'Éducation). Votre lettre d'acceptation est garantie conforme à 100%."
    },
    {
      category: "Famille & PACS",
      q: "Mon partenaire et moi sommes pacsés. Le visa s'étend-il à mon conjoint ?",
      a: "Attention, piège majeur : le droit thaïlandais ne reconnaît pas le PACS, uniquement le mariage civil. Si vous n'êtes pas mariés, la demande d'un visa 'accompagnant' sera automatiquement rejetée. Mais rassurez-vous, nous avons des stratégies d'optimisation pour permettre aux couples pacsés de sécuriser leurs départs ensemble via des dossiers individuels synchronisés."
    },
    {
      category: "Fiscalité & Impôts",
      q: "Vais-je payer des impôts en Thaïlande avec le DTV ?",
      a: "Le visa DTV ne fait pas automatiquement de vous un résident fiscal. Vous ne devenez imposable en Thaïlande que si vous y séjournez plus de 180 jours dans l'année ET que vous y rapatriez des revenus. Dans le cadre de nos offres, nous vous fournissons les recommandations de base pour comprendre la convention fiscale franco-thaïlandaise et optimiser votre calendrier de voyage."
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md transition-opacity duration-300" onClick={onClose} />

      <div className="relative bg-[#0d0d0d] w-full max-w-3xl max-h-[90vh] rounded-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex-none flex items-center justify-between p-6 border-b border-white/10 bg-[#0d0d0d]/95 backdrop-blur z-10">
          <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-wide">
            Foire Aux Questions <span className="text-amber-500">(FAQ)</span>
          </h2>
          <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Contenu FAQ */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <p className="text-gray-400 mb-8 text-sm md:text-base">
            L'immigration thaïlandaise est stricte et les rumeurs sur internet sont nombreuses. Voici les réponses claires de nos experts aux questions les plus fréquentes concernant l'obtention du Visa DTV.
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
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 p-6 bg-white/5 border border-white/10 rounded-2xl text-center">
            <h4 className="text-white font-bold mb-2">Une question non abordée ici ?</h4>
            <p className="text-sm text-gray-400 mb-4">Chaque situation est unique. Confiez-nous l'analyse de votre profil.</p>
            <button 
              onClick={onClose} 
              className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all active:scale-95 text-sm"
            >
              Fermer et faire le test d'éligibilité
            </button>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); border-radius: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
      `}} />
    </div>
  );
}