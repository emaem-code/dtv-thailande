'use client';

import React, { useEffect } from 'react';

interface ProcessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProcessModal({ isOpen, onClose }: ProcessModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const steps = [
    {
      num: "01",
      title: "L'Engagement & Le Dossier Béton",
      desc: "Une fois votre devis validé, vous réglez nos honoraires de conciergerie (incluant traductions et école si applicable). Sous 3 à 5 jours ouvrés, nous analysons et certifions vos pièces pour vous livrer un dossier PDF « zéro défaut », formaté pour les exigences consulaires."
    },
    {
      num: "02",
      title: "Géolocalisation & Arrivée sur place",
      desc: "Vous voyagez vers le pays convenu pour le dépôt. Note : Si vous passez par un pays tiers en Asie (ex: Laos, Cambodge), prévoyez jusqu'à 50 € pour régler le visa d'entrée local à la frontière. Le tampon de cette immigration est indispensable pour prouver votre géolocalisation."
    },
    {
      num: "03",
      title: "Soumission & Règlement Consulaire",
      desc: "Vous vous connectez au portail officiel e-Visa et uploadez notre dossier. Selon l'ambassade choisie, le règlement du Visa DTV se fait soit 100% en ligne, soit sur place en espèces (en Bahts). Au moindre doute, notre équipe intervient en urgence absolue pour vous assister."
    },
    {
      num: "04",
      title: "Approbation & Logistique VIP",
      desc: "Sous 3 à 5 jours, le précieux e-mail « Visa Approved » tombe. Si vous avez opté pour une formule Premium ou VIP, prévenez-nous : nous déclenchons immédiatement la réservation de votre vol vers la Thaïlande et de votre chauffeur privé."
    },
    {
      num: "05",
      title: "Enregistrement & Préparation au départ",
      desc: "Avant votre vol, effectuez votre check-in en ligne. Il est indispensable d'imprimer le e-Visa que vous avez reçu par e-mail. Préparez également votre DTAC (accessible sur votre mobile ou imprimé sur papier). Ces documents vous seront demandés pour l'embarquement."
    },
    {
      num: "06",
      title: "Bienvenue en Thaïlande",
      desc: "À votre atterrissage, présentez à l'officier de l'immigration votre passeport, votre e-Visa imprimé et votre DTAC. Il apposera instantanément votre tampon de 180 jours. Notez que pour profiter des 5 ans du visa, il suffit de sortir du territoire (le temps d'un week-end) ou de faire une extension sur place tous les 180 jours. Votre nouvelle vie de liberté commence ici !"
    }
  ];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md transition-opacity duration-300" onClick={onClose} />

      <div className="relative bg-[#0d0d0d] w-full max-w-4xl max-h-[90vh] rounded-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex-none flex items-center justify-between p-6 border-b border-white/10 bg-[#0d0d0d]/95 backdrop-blur z-10">
          <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-wide">
            Notre Méthode <span className="text-amber-500">Pas à Pas</span>
          </h2>
          <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Contenu - Timeline */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          <p className="text-gray-400 mb-10 text-sm md:text-base max-w-2xl">
            De la validation de votre devis jusqu'à votre premier pas sur le sol thaïlandais, voici exactement comment nous transformons une procédure administrative complexe en une expérience fluide et maîtrisée.
          </p>

          <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            
            {steps.map((step, index) => (
              <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                
                {/* Icône centrale */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0d0d0d] bg-white/5 group-hover:bg-amber-500 text-gray-500 group-hover:text-black transition-colors duration-300 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_#0d0d0d] z-10 font-bold text-sm">
                  {step.num}
                </div>
                
                {/* Carte de contenu */}
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-amber-500/30 hover:bg-white/10 transition-all duration-300 text-left">
                  <h3 className="font-bold text-white text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                </div>

              </div>
            ))}

          </div>

          <div className="mt-12 text-center pt-8 border-t border-white/10">
            <h4 className="text-2xl font-black text-white mb-4">Prêt à démarrer l'aventure ?</h4>
            <button 
              onClick={() => { onClose(); }} 
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.2)] active:scale-95"
            >
              Fermer et vérifier mon éligibilité
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