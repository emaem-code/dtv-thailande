'use client';

import React, { useState, useEffect, useRef } from 'react';

interface EligibilityFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EligibilityFormModal({ isOpen, onClose }: EligibilityFormModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 👉 NOUVEAU : Référence pour le scroll du conteneur
  const scrollRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    funds: '',
    passport: '',
    job: '',
    email: '',
    dateStart: '', // Remplacé "date" par un intervalle
    dateEnd: '',
    location: '',
    locationDetails: '',
    family: '',
    childrenCount: '',
    softPower: '',
    translations: '',
    serviceLevel: '',
    remarks: ''
  });

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  // 👉 NOUVEAU : Fonction pour remonter en haut de page en douceur
  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step === 1 && (!formData.funds || !formData.passport || !formData.job || !formData.email)) {
      alert("Veuillez remplir tous les champs obligatoires pour continuer.");
      return;
    }

    if (formData.funds === 'no' || formData.passport === 'no') {
      setStep(0);
      scrollToTop(); // Remonte au clic
      return;
    }

    setStep(2);
    scrollToTop(); // Remonte au clic
  };

  const prevStep = () => {
    setStep(1);
    scrollToTop();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formspree.io/f/mreyokzj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          "Email du prospect": formData.email,
          "Statut Pro": formData.job,
          "Épargne 500k THB": formData.funds,
          "Passeport OK": formData.passport,
          "Période de départ": `Entre le ${formData.dateStart} et le ${formData.dateEnd}`,
          "Lieu de dépôt": formData.location,
          "Détails localisation": formData.locationDetails,
          "Expatriation": formData.family,
          "Nombre d'enfants": formData.childrenCount,
          "Soft Power": formData.softPower,
          "Traductions requises": formData.translations,
          "Niveau de service": formData.serviceLevel,
          "Remarques": formData.remarks
        }),
      });

      if (response.ok) {
        setStep(3);
        scrollToTop(); // Remonte au clic
      } else {
        alert("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
      }
    } catch (error) {
      alert("Erreur de connexion. Vérifiez votre réseau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const RadioCard = ({ label, field, value }: { label: string, field: string, value: string }) => {
    const isSelected = formData[field as keyof typeof formData] === value;
    return (
      <div 
        onClick={() => handleChange(field, value)}
        className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-center gap-3
          ${isSelected ? 'bg-amber-500/10 border-amber-500 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20'}`}
      >
        <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-none
          ${isSelected ? 'border-amber-500' : 'border-gray-500'}`}>
          {isSelected && <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />}
        </div>
        <span className="text-sm md:text-base font-medium leading-tight">{label}</span>
      </div>
    );
  };

  const isSoftPower = formData.job === 'softpower';
  const priceBasic = isSoftPower ? "1 250 €" : "850 €";
  const pricePremium = isSoftPower ? "1 750 €" : "1 300 €";
  const priceVIP = isSoftPower ? "2 900 €" : "2 400 €";

  // Condition pour afficher l'alerte famille à l'étape 3
  const isGroupTravel = formData.family === 'married' || formData.family === 'concubinage' || formData.family === 'family';

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />

      <div className="relative bg-[#0d0d0d] w-full max-w-3xl max-h-[90vh] rounded-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header avec Barre de progression */}
        <div className="flex-none p-6 border-b border-white/10 relative overflow-hidden">
          {step === 1 || step === 2 ? (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
              <div 
                className="h-full bg-amber-500 transition-all duration-500"
                style={{ width: step === 1 ? '50%' : '100%' }}
              />
            </div>
          ) : null}
          <div className="flex justify-between items-center">
            <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-wide">
              {step === 0 ? 'Critères non remplis' : step === 3 ? 'Demande envoyée !' : step === 1 ? '1. Vérification d\'Éligibilité' : '2. Votre Devis Sur-Mesure'}
            </h2>
            <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        {/* Formulaire Scrollable avec Référence (Ref) */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar scroll-smooth">
          
          {/* ÉTAPE 0 */}
          {step === 0 && (
            <div className="py-10 flex flex-col items-center text-center animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center text-4xl mb-6 border border-red-500/20">✕</div>
              <h3 className="text-2xl font-black text-white mb-4">Profil Inéligible au Visa DTV</h3>
              <p className="text-gray-400 text-base max-w-lg mx-auto mb-8">
                L'administration thaïlandaise est stricte : disposer d'une garantie financière de 500 000 THB et d'un passeport valide sont des obligations légales incompressibles.
              </p>
              <button onClick={onClose} className="bg-white hover:bg-gray-200 text-black px-8 py-3 rounded-full font-bold transition-all active:scale-95">
                Fermer
              </button>
            </div>
          )}

          {/* ÉTAPE 1 */}
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="space-y-3">
                <label className="text-white font-bold text-lg">1. Disposez-vous de l'équivalent de 500 000 THB (≈ 14 500 €) d'épargne ? <span className="text-amber-500">*</span></label>
                <div className="grid grid-cols-1 gap-3">
                  <RadioCard label="Oui, sur un compte accessible" field="funds" value="yes" />
                  <RadioCard label="Pas encore, mais je m'organise pour les avoir bientôt" field="funds" value="soon" />
                  <RadioCard label="Non, et je ne pourrai pas les réunir" field="funds" value="no" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-white font-bold text-lg">2. Votre passeport est-il valable encore au moins 12 mois ? <span className="text-amber-500">*</span></label>
                <div className="grid grid-cols-1 gap-3">
                  <RadioCard label="Oui, il est à jour" field="passport" value="yes" />
                  <RadioCard label="Pas encore, mais je vais le refaire rapidement" field="passport" value="soon" />
                  <RadioCard label="Non, je n'ai pas de passeport" field="passport" value="no" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-white font-bold text-lg">3. Quelle est votre situation professionnelle actuelle ? <span className="text-amber-500">*</span></label>
                <div className="grid grid-cols-1 gap-3">
                  <RadioCard label="Freelance / Indépendant (Clients hors Thaïlande)" field="job" value="freelance" />
                  <RadioCard label="Salarié en télétravail (Avec autorisation de l'employeur)" field="job" value="remote" />
                  <RadioCard label="Je n'ai pas de travail à distance / Je veux passer par une école" field="job" value="softpower" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-white font-bold text-lg">4. À quelle adresse e-mail souhaitez-vous recevoir votre devis ? <span className="text-amber-500">*</span></label>
                <input type="email" required placeholder="votre@email.com" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"/>
              </div>

              <div className="pt-4">
                <button onClick={nextStep} className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-lg py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] active:scale-95">
                  Vérifier mon profil →
                </button>
              </div>
            </div>
          )}

          {/* ÉTAPE 2 */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              
              <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-xl mb-6">
                <p className="text-amber-400 font-bold mb-1">🎉 Félicitations, votre profil semble éligible !</p>
                <p className="text-sm text-gray-300">Afin de vous présenter immédiatement nos tarifs personnalisés, veuillez préciser votre projet.</p>
              </div>

              {/* 👉 FIX DATE : Fourchette au lieu d'un seul mois */}
              <div className="space-y-3">
                <label className="text-white font-bold text-lg">Fourchette de dates de départ :</label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="w-full flex-1">
                    <label className="text-xs text-gray-400 mb-1.5 block ml-1">Départ au plus tôt</label>
                    <input 
                      type="date" 
                      value={formData.dateStart}
                      onChange={(e) => handleChange('dateStart', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-amber-500 text-sm [color-scheme:dark]"
                    />
                  </div>
                  <div className="w-full flex-1">
                    <label className="text-xs text-gray-400 mb-1.5 block ml-1">Départ au plus tard</label>
                    <input 
                      type="date" 
                      value={formData.dateEnd}
                      onChange={(e) => handleChange('dateEnd', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-amber-500 text-sm [color-scheme:dark]"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-white font-bold text-lg">Où serez-vous pour déposer la demande ?</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <RadioCard label="Europe (France, Suisse, etc.)" field="location" value="europe" />
                  <RadioCard label="Asie (Thaïlande ou frontalier)" field="location" value="asia" />
                  <RadioCard label="Amérique du Nord" field="location" value="america" />
                  <RadioCard label="Autre" field="location" value="other" />
                </div>
                <input type="text" placeholder="Précisez le pays et la ville..." value={formData.locationDetails} onChange={(e) => handleChange('locationDetails', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 mt-2 text-white focus:outline-none focus:border-amber-500 text-sm"/>
              </div>

              {isSoftPower && (
                <div className="space-y-3 p-5 bg-white/5 rounded-2xl border border-white/10">
                  <label className="text-white font-bold text-lg text-emerald-400">Programme Soft Power souhaité :</label>
                  <div className="grid grid-cols-1 gap-3">
                    <RadioCard label="Cuisine Thaïlandaise traditionnelle (6 mois)" field="softPower" value="cuisine" />
                    <RadioCard label="Entraînement Muay Thaï certifié (6 mois)" field="softPower" value="muaythai" />
                    <RadioCard label="Je ne sais pas encore, j'ai besoin de conseils" field="softPower" value="unsure" />
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <label className="text-white font-bold text-lg">Comment envisagez-vous cette expatriation ?</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <RadioCard label="Seul(e)" field="family" value="solo" />
                  <RadioCard label="En couple (Mariés)" field="family" value="married" />
                  <RadioCard label="En couple (Non mariés)" field="family" value="concubinage" />
                  <RadioCard label="En famille (Avec enfants)" field="family" value="family" />
                </div>
                {formData.family === 'family' && (
                  <input type="number" placeholder="Combien d'enfants à charge vous accompagnent ?" value={formData.childrenCount} onChange={(e) => handleChange('childrenCount', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 mt-2 text-white focus:outline-none focus:border-amber-500 text-sm"/>
                )}
              </div>

              <div className="space-y-3">
                <label className="text-white font-bold text-lg">Vos documents nécessitent-ils des traductions certifiées ?</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <RadioCard label="Oui, j'aurai besoin de traductions" field="translations" value="yes" />
                  <RadioCard label="Non, tout est déjà en anglais" field="translations" value="no" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-white font-bold text-lg">Des remarques ou besoins spécifiques ? (Optionnel)</label>
                <textarea rows={3} value={formData.remarks} onChange={(e) => handleChange('remarks', e.target.value)} placeholder="Dites-nous en plus sur votre projet..." className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-amber-500"/>
              </div>

              <div className="pt-4 flex gap-4">
                <button onClick={prevStep} className="px-6 py-4 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white transition-colors">← Retour</button>
                <button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 bg-amber-500 hover:bg-amber-400 text-black font-bold text-lg py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] active:scale-95 disabled:opacity-70 flex justify-center items-center gap-2">
                  {isSubmitting ? <><span className="animate-spin text-xl">↻</span> Calcul...</> : 'Découvrir mes tarifs'}
                </button>
              </div>
            </div>
          )}

          {/* ÉTAPE 3 : Succès & Tarifs */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
              
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-3xl mb-4 border border-emerald-500/30 mx-auto">✓</div>
                <h3 className="text-2xl font-black text-white mb-2">Demande transmise avec succès !</h3>
                <p className="text-gray-400 text-sm">
                  Notre équipe va analyser votre projet et vous envoyer un devis exact par e-mail. En attendant, voici la base tarifaire pour le profil <strong className="text-amber-500">{isSoftPower ? 'Soft Power' : 'Digital Nomad'}</strong> :
                </p>

                {/* 👉 FIX ACCOMPAGNANTS : Message dynamique si le client ne part pas seul */}
                {isGroupTravel && (
                  <div className="mt-5 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-left">
                    <p className="text-sm text-amber-500 font-bold mb-1 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      Accompagnants supplémentaires
                    </p>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Puisque vous voyagez à plusieurs, notez qu'une demande de visa distincte devra être soumise pour vos accompagnants. Des frais supplémentaires seront calculés en toute transparence dans votre devis.
                    </p>
                  </div>
                )}
              </div>

              {/* GRILLES DE PRIX */}
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-white/20 transition-colors">
                  <div>
                    <h4 className="font-bold text-white text-lg">Formule Essentielle</h4>
                    <p className="text-xs text-gray-400 mt-1">L'administratif. Frais consulaires, {isSoftPower && "école, "} traductions et suivi inclus.</p>
                  </div>
                  <div className="text-left md:text-right flex-none">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">À partir de</p>
                    <p className="text-2xl font-black text-white">{priceBasic}</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-white/20 transition-colors">
                  <div>
                    <h4 className="font-bold text-white text-lg">Formule Premium</h4>
                    <p className="text-xs text-gray-400 mt-1">Essentielle + Vol régional + Hôtel + Transferts aéroport.</p>
                  </div>
                  <div className="text-left md:text-right flex-none">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">À partir de</p>
                    <p className="text-2xl font-black text-amber-500">{pricePremium}</p>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h4 className="font-bold text-white text-lg flex items-center gap-2">Formule VIP <span className="bg-amber-500 text-black text-[10px] uppercase px-2 py-0.5 rounded-full">Exclusif</span></h4>
                    <p className="text-xs text-gray-400 mt-1">Tout inclus : Vol Europe, Hôtels Haut de gamme, Chauffeurs privés.</p>
                  </div>
                  <div className="text-left md:text-right flex-none">
                    <p className="text-[10px] text-amber-500/70 uppercase tracking-widest font-bold">À partir de</p>
                    <p className="text-2xl font-black text-amber-500">{priceVIP}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button onClick={onClose} className="bg-white hover:bg-gray-200 text-black px-8 py-3 rounded-full font-bold transition-all active:scale-95">
                  Fermer
                </button>
              </div>

            </div>
          )}

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