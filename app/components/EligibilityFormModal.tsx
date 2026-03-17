'use client';

import React, { useState, useEffect } from 'react';

interface EligibilityFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EligibilityFormModal({ isOpen, onClose }: EligibilityFormModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // État pour stocker toutes les réponses
  const [formData, setFormData] = useState({
    funds: '',
    passport: '',
    job: '',
    email: '',
    date: '',
    location: '',
    locationDetails: '',
    family: '',
    childrenCount: '',
    softPower: '',
    translations: '',
    city: '',
    cityDetails: '',
    serviceLevel: '',
    remarks: ''
  });

  // Empêcher le scroll du fond
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    // Petite validation basique pour l'étape 1
    if (step === 1 && (!formData.funds || !formData.passport || !formData.job || !formData.email)) {
      alert("Veuillez remplir tous les champs obligatoires pour continuer.");
      return;
    }
    setStep(2);
  };

  const prevStep = () => setStep(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 👉 TON LIEN FORMSPREE EST ICI :
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
          "Date de départ": formData.date,
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
        setIsSuccess(true);
      } else {
        alert("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
      }
    } catch (error) {
      alert("Erreur de connexion. Vérifiez votre réseau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Composant réutilisable pour les choix (Cartes cliquables)
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

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />

      <div className="relative bg-[#0d0d0d] w-full max-w-3xl max-h-[90vh] rounded-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header avec Barre de progression */}
        <div className="flex-none p-6 border-b border-white/10 relative overflow-hidden">
          {!isSuccess && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
              <div 
                className="h-full bg-amber-500 transition-all duration-500"
                style={{ width: step === 1 ? '50%' : '100%' }}
              />
            </div>
          )}
          <div className="flex justify-between items-center">
            <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-wide">
              {isSuccess ? 'Demande envoyée !' : step === 1 ? '1. Vérification d\'Éligibilité' : '2. Votre Devis Sur-Mesure'}
            </h2>
            <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        {/* Formulaire Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          
          {/* 🟢 ÉTAPE 1 : Éligibilité */}
          {step === 1 && !isSuccess && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              
              <div className="space-y-3">
                <label className="text-white font-bold text-lg">1. Disposez-vous de l'équivalent de 500 000 THB (≈ 14 500 €) d'épargne ? <span className="text-amber-500">*</span></label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <RadioCard label="Oui, sur un compte accessible" field="funds" value="yes" />
                  <RadioCard label="Non, pas encore" field="funds" value="no" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-white font-bold text-lg">2. Votre passeport est-il valable encore au moins 12 mois ? <span className="text-amber-500">*</span></label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <RadioCard label="Oui" field="passport" value="yes" />
                  <RadioCard label="Non / À refaire" field="passport" value="no" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-white font-bold text-lg">3. Quelle est votre situation professionnelle actuelle ? <span className="text-amber-500">*</span></label>
                <div className="grid grid-cols-1 gap-3">
                  <RadioCard label="Freelance / Indépendant (Clients hors Thaïlande)" field="job" value="freelance" />
                  <RadioCard label="Salarié en télétravail (Avec autorisation de l'employeur)" field="job" value="remote" />
                  <RadioCard label="Je n'ai pas de travail à distance / Autre (Programme Soft Power)" field="job" value="softpower" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-white font-bold text-lg">4. À quelle adresse e-mail souhaitez-vous recevoir votre devis ? <span className="text-amber-500">*</span></label>
                <input 
                  type="email" 
                  required
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                />
              </div>

              <div className="pt-4">
                <button 
                  onClick={nextStep}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-lg py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] active:scale-95"
                >
                  Continuer vers l'étape 2 →
                </button>
              </div>
            </div>
          )}

          {/* 🟢 ÉTAPE 2 : Détails du devis */}
          {step === 2 && !isSuccess && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              
              <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-xl mb-6">
                <p className="text-amber-400 font-bold mb-1">🎉 Félicitations, votre profil semble éligible !</p>
                <p className="text-sm text-gray-300">Afin de calculer vos frais consulaires et de vous préparer une proposition sur-mesure, veuillez nous préciser votre projet.</p>
              </div>

              <div className="space-y-3">
                <label className="text-white font-bold text-lg">Date de départ approximative :</label>
                <input 
                  type="month" 
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-3">
                <label className="text-white font-bold text-lg">Où serez-vous pour déposer la demande ?</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <RadioCard label="Europe (France, Suisse, etc.)" field="location" value="europe" />
                  <RadioCard label="Asie (Thaïlande ou pays frontalier)" field="location" value="asia" />
                  <RadioCard label="Amérique du Nord" field="location" value="america" />
                  <RadioCard label="Autre" field="location" value="other" />
                </div>
                <input 
                  type="text" 
                  placeholder="Précisez le pays et la ville..."
                  value={formData.locationDetails}
                  onChange={(e) => handleChange('locationDetails', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 mt-2 text-white focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>

              {/* ⚠️ Question Conditionnelle : Soft Power */}
              {formData.job === 'softpower' && (
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
                  <input 
                    type="number" 
                    placeholder="Combien d'enfants à charge vous accompagnent ?"
                    value={formData.childrenCount}
                    onChange={(e) => handleChange('childrenCount', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 mt-2 text-white focus:outline-none focus:border-amber-500 text-sm"
                  />
                )}
              </div>

              <div className="space-y-3">
                <label className="text-white font-bold text-lg">Vos documents français (Kbis, banque) nécessitent-ils des traductions certifiées ?</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <RadioCard label="Oui, j'aurai besoin de traductions" field="translations" value="yes" />
                  <RadioCard label="Non, tout est déjà en anglais" field="translations" value="no" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-white font-bold text-lg">🔥 Quel niveau de service recherchez-vous ?</label>
                <div className="grid grid-cols-1 gap-3">
                  <RadioCard label="Formule Essentielle (Gestion du Visa et de l'administratif uniquement)" field="serviceLevel" value="basic" />
                  <RadioCard label="Formules Premium / VIP (Visa + Réservation de mes vols, hôtels et chauffeurs)" field="serviceLevel" value="premium" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-white font-bold text-lg">Des remarques ou besoins spécifiques ? (Optionnel)</label>
                <textarea 
                  rows={3}
                  value={formData.remarks}
                  onChange={(e) => handleChange('remarks', e.target.value)}
                  placeholder="Dites-nous en plus sur votre projet..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  onClick={prevStep}
                  className="px-6 py-4 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  ← Retour
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-black font-bold text-lg py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] active:scale-95 disabled:opacity-70 flex justify-center items-center gap-2"
                >
                  {isSubmitting ? (
                    <><span className="animate-spin text-xl">↻</span> Envoi en cours...</>
                  ) : (
                    'Recevoir mon devis gratuit'
                  )}
                </button>
              </div>
            </div>
          )}

          {/* 🟢 ÉTAPE 3 : Succès */}
          {isSuccess && (
            <div className="py-12 flex flex-col items-center text-center animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-4xl mb-6 border border-emerald-500/30">
                ✓
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Demande bien reçue !</h3>
              <p className="text-gray-400 text-lg max-w-md mx-auto mb-8">
                Merci pour votre confiance. Notre équipe analyse votre profil et vous enverra vos 3 propositions tarifaires par e-mail d'ici 24 heures.
              </p>
              <button 
                onClick={onClose}
                className="bg-white hover:bg-gray-200 text-black px-8 py-3 rounded-full font-bold transition-all active:scale-95"
              >
                Retour à l'accueil
              </button>
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