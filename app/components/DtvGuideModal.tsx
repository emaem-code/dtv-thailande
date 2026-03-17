'use client';

import React, { useEffect } from 'react';

interface DtvGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DtvGuideModal({ isOpen, onClose }: DtvGuideModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
      />

      <div className="relative bg-[#0d0d0d] w-full max-w-4xl max-h-[90vh] rounded-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300">
        
        <div className="flex-none flex items-center justify-between p-6 border-b border-white/10 bg-[#0d0d0d]/95 backdrop-blur z-10">
          <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-wide">
            Le Guide DTV <span className="text-amber-500">2025-2026</span>
          </h2>
          <button 
            onClick={onClose}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 text-gray-300 space-y-10 custom-scrollbar">
          
          {/* Bouton Télécharger PDF */}
          <div className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 p-6 rounded-2xl gap-4">
            <div>
              <h3 className="text-white font-bold text-lg">Emportez ce guide avec vous</h3>
              <p className="text-sm text-gray-400 mt-1">Téléchargez la version PDF complète pour la lire hors ligne.</p>
            </div>
            <a 
              href="/guide-dtv-2025.pdf" 
              download
              className="flex-none flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full transition-colors active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Télécharger le PDF
            </a>
          </div>

          {/* Section 1 */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-sm">1</span>
              Ce qu'est vraiment le Visa DTV
            </h3>
            <p className="leading-relaxed text-gray-400 mb-4">Le Visa DTV est une révolution pour les travailleurs à distance et les passionnés de culture thaïlandaise.</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-amber-500 flex-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span><strong className="text-white">Validité :</strong> 5 ans.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-amber-500 flex-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span><strong className="text-white">Durée de séjour :</strong> 180 jours par entrée (extensible une fois pour 180 jours supplémentaires sur place).</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-amber-500 flex-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span><strong className="text-white">Avantage fiscal :</strong> Vous devenez résident fiscal après 180 jours, mais vous n'êtes imposé que sur les revenus transférés physiquement sur un compte thaïlandais.</span>
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-sm">2</span>
              Les Conditions d'Éligibilité
            </h3>
            <p className="leading-relaxed text-gray-400 mb-4">L'administration thaïlandaise est stricte, mais logique. Voici les vrais prérequis :</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                <h4 className="font-bold text-white mb-2">L'Épargne de garantie</h4>
                <p className="text-sm text-gray-400">Un relevé bancaire démontrant un solde de 500 000 THB (env. 14 500 €) maintenu sur les 3 à 6 derniers mois (selon l'ambassade).</p>
              </div>
              <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                <h4 className="font-bold text-white mb-2">Le Revenu Mensuel</h4>
                <p className="text-sm text-gray-400">Contrairement aux rumeurs, <strong className="text-white">aucun revenu mensuel minimum n'est exigé</strong>. C'est l'épargne de garantie qui prime.</p>
              </div>
              <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                <h4 className="font-bold text-white mb-2">La Localisation</h4>
                <p className="text-sm text-gray-400">La demande doit obligatoirement être déposée et traitée depuis l'extérieur de la Thaïlande.</p>
              </div>
              <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                <h4 className="font-bold text-white mb-2">L'Âge minimum</h4>
                <p className="text-sm text-gray-400">Vous devez avoir au moins 20 ans pour être le demandeur principal du Visa DTV.</p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-sm">3</span>
              Quel profil êtes-vous ?
            </h3>
            
            <div className="space-y-6">
              <div className="relative pl-6 border-l-2 border-amber-500/50">
                <h4 className="text-xl font-bold text-white mb-2">Profil A : Le Travailleur à distance</h4>
                <p className="text-gray-400 mb-3">Vous devez prouver que vous travaillez légalement pour des clients ou une entreprise hors de Thaïlande.</p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• <strong className="text-gray-200">Salariés :</strong> Contrat de travail, fiches de paie, autorisation de télétravail.</li>
                  <li>• <strong className="text-gray-200">Freelances :</strong> Preuve d'enregistrement (Kbis), portfolio, factures.</li>
                </ul>
              </div>

              <div className="relative pl-6 border-l-2 border-emerald-500/50">
                <h4 className="text-xl font-bold text-white mb-2">Profil B : Le participant "Soft Power"</h4>
                <p className="text-gray-400 mb-3">Idéal si vous venez pour vous immerger dans la culture (Muay Thai, Cuisine, etc.).</p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• <strong className="text-gray-200">Le prérequis :</strong> Lettre d'acceptation d'une école certifiée.</li>
                  <li>• <strong className="text-gray-200">Le budget école :</strong> Entre 12 000 et 40 000 THB selon la discipline.</li>
                  <li>• <strong className="text-gray-200">La recommandation :</strong> Un programme de plusieurs mois démontre le sérieux de votre démarche.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-sm">4</span>
              Le Vrai Budget à prévoir
            </h3>
            <p className="leading-relaxed text-gray-400 mb-4">Voici les coûts incompressibles (hors accompagnement agence) :</p>
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5 space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="text-gray-300">Frais consulaires (Ambassade)</span>
                <span className="text-white font-bold">250 € à 420 €</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-300">Traductions certifiées</span>
                <span className="text-white font-bold">~20 € / document</span>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-sm">5</span>
              Les 3 points de vigilance
            </h3>
            <p className="leading-relaxed text-gray-400 mb-6">Les autorités examinent les dossiers à la loupe. Un simple détail peut valoir un refus ferme.</p>
            
            <div className="grid gap-4">
              <div className="flex gap-4 p-4 rounded-2xl bg-red-500/5 border border-red-500/10">
                <div className="text-red-400 mt-1">⚠️</div>
                <div>
                  <h4 className="text-white font-bold">Incohérences bancaires</h4>
                  <p className="text-sm text-gray-400 mt-1">Un relevé bancaire généré à la mauvaise date ou ne montrant pas l'historique exigé par l'ambassade locale entraînera un rejet immédiat.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-2xl bg-red-500/5 border border-red-500/10">
                <div className="text-red-400 mt-1">⚠️</div>
                <div>
                  <h4 className="text-white font-bold">Traductions non conformes</h4>
                  <p className="text-sm text-gray-400 mt-1">Une traduction classique ne suffit pas. Elle doit comporter les sceaux légaux reconnus par les autorités consulaires.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-2xl bg-red-500/5 border border-red-500/10">
                <div className="text-red-400 mt-1">⚠️</div>
                <div>
                  <h4 className="text-white font-bold">La fin des "Visa Runs"</h4>
                  <p className="text-sm text-gray-400 mt-1">Enchaîner les exemptions de visa aux frontières terrestres est désormais strictement limité à 2 fois par an. Le DTV est la seule voie sereine.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 👉 NOUVELLE SECTION 6 : NOS OFFRES ET TARIFS */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-black text-sm">6</span>
              Nos Formules d'Accompagnement
            </h3>
            <p className="leading-relaxed text-gray-400 mb-8">
              Nous gérons votre dossier de A à Z. Les tarifs sont transparents et incluent les frais consulaires (≈350 €) et les traductions certifiées.
            </p>

            {/* Grille Digital Nomad */}
            <div className="mb-10">
              <h4 className="text-lg font-bold text-amber-500 mb-4 border-b border-white/10 pb-2">💻 Profil Digital Nomad (Visa Remote)</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-white/20 transition-colors">
                  <h5 className="font-bold text-white text-lg">Basique</h5>
                  <p className="text-2xl font-black text-amber-500 my-2">850 €</p>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li>✓ Préparation & suivi dossier</li>
                    <li>✓ Frais consulaires inclus</li>
                    <li>✓ Traductions certifiées incluses</li>
                  </ul>
                </div>
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-white/20 transition-colors">
                  <h5 className="font-bold text-white text-lg">Premium</h5>
                  <p className="text-2xl font-black text-amber-500 my-2">1 300 €</p>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li>✓ <strong className="text-gray-300">Tout le pack Basique</strong></li>
                    <li>✓ Vol régional (intra-Asie)</li>
                    <li>✓ Taxi A/R aéroport</li>
                    <li>✓ Hôtel milieu de gamme (3-5 nuits)</li>
                  </ul>
                </div>
                <div className="bg-amber-500/10 p-5 rounded-2xl border border-amber-500/30">
                  <h5 className="font-bold text-white text-lg flex items-center gap-2">VIP <span className="bg-amber-500 text-black text-[10px] uppercase px-2 py-0.5 rounded-full">Exclusif</span></h5>
                  <p className="text-2xl font-black text-amber-500 my-2">2 400 €</p>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li>✓ <strong className="text-gray-300">Tout le pack Basique</strong></li>
                    <li>✓ Vol long-courrier (Europe-Asie)</li>
                    <li>✓ Vols régionaux & Taxis</li>
                    <li>✓ Hôtel Haut de gamme (7-10 nuits)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Grille Soft Power */}
            <div>
              <h4 className="text-lg font-bold text-emerald-500 mb-4 border-b border-white/10 pb-2">🥊 Profil Soft Power (Cuisine ou Muay Thaï)</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-white/20 transition-colors">
                  <h5 className="font-bold text-white text-lg">Basique</h5>
                  <p className="text-2xl font-black text-emerald-500 my-2">~1 250 €</p>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li>✓ Inscription école incluse</li>
                    <li>✓ Préparation & suivi dossier</li>
                    <li>✓ Frais consulaires inclus</li>
                    <li>✓ Traductions certifiées incluses</li>
                  </ul>
                </div>
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-white/20 transition-colors">
                  <h5 className="font-bold text-white text-lg">Premium</h5>
                  <p className="text-2xl font-black text-emerald-500 my-2">~1 750 €</p>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li>✓ <strong className="text-gray-300">Tout le pack Basique</strong></li>
                    <li>✓ Vol régional (intra-Asie)</li>
                    <li>✓ Taxi A/R aéroport</li>
                    <li>✓ Hôtel milieu de gamme (3-5 nuits)</li>
                  </ul>
                </div>
                <div className="bg-emerald-500/10 p-5 rounded-2xl border border-emerald-500/30">
                  <h5 className="font-bold text-white text-lg flex items-center gap-2">VIP <span className="bg-emerald-500 text-black text-[10px] uppercase px-2 py-0.5 rounded-full">Exclusif</span></h5>
                  <p className="text-2xl font-black text-emerald-500 my-2">~2 900 €</p>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li>✓ <strong className="text-gray-300">Tout le pack Basique</strong></li>
                    <li>✓ Vol long-courrier (Europe-Asie)</li>
                    <li>✓ Vols régionaux & Taxis</li>
                    <li>✓ Hôtel Haut de gamme (7-10 nuits)</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 italic">* Les tarifs Soft Power sont donnés à titre indicatif et s'ajustent précisément selon l'école choisie (Cuisine ou Muay Thaï).</p>
            </div>
          </section>

          {/* CTA Footer */}
          <section className="pt-8 pb-4 text-center border-t border-white/10">
            <h3 className="text-2xl font-extrabold text-white mb-3">Ne laissez rien au hasard</h3>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              De l'audit de vos relevés à la certification de vos traductions. Vous faites vos valises, nous faisons le reste.
            </p>
            <button 
              onClick={onClose}
              className="px-8 py-4 bg-white hover:bg-gray-200 text-black font-bold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95"
            >
              Fermer et vérifier mon éligibilité
            </button>
          </section>

        </div>
      </div>
      
      {/* Styles CSS personnalisés pour la barre de défilement du modal */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
    </div>
  );
}