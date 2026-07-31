'use client';

import React, { useState, useRef } from 'react';
import { useModalA11y } from './useModalA11y';
import MontantFonds from './MontantFonds';

interface EligibilityFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EligibilityFormModal({ isOpen, onClose }: EligibilityFormModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { dialogRef, handleDialogKeyDown } = useModalA11y(isOpen, onClose);
  
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
    softPowerInteret: '', // un freelance peut aussi vouloir passer par une école
    translations: '',
    serviceLevel: '',
    remarks: '',
    consentement: '',
  });

  // Messages d'erreur affichés sous les champs concernés, plutôt qu'en alerte système
  const [erreurs, setErreurs] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const AUJOURDHUI = new Date().toISOString().slice(0, 10);
  const emailValide = (v: string) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim());

  // 👉 NOUVEAU : Fonction pour remonter en haut de page en douceur
  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // L'erreur s'efface dès que le visiteur corrige le champ concerné
    setErreurs(prev => (prev[field] ? { ...prev, [field]: '' } : prev));
  };

  /**
   * Transmet le contact dès l'étape 1, sans attendre la fin du parcours.
   * Sans cela, toute personne qui abandonne à l'étape 2 disparaît alors même
   * qu'elle a déjà fourni son e-mail, ses fonds, son passeport et son statut.
   */
  const envoyerLeadPartiel = async (typeDeLead: string) => {
    try {
      await fetch('https://formspree.io/f/mreyokzj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          'Type de demande': typeDeLead,
          'Email du prospect': formData.email,
          'Statut Pro': formData.job,
          'Épargne 500k THB': formData.funds,
          'Passeport OK': formData.passport,
        }),
      });
    } catch {
      /* silencieux : ne doit jamais bloquer le parcours du visiteur */
    }
  };

  const nextStep = () => {
    const e: Record<string, string> = {};
    if (!formData.funds) e.funds = 'Merci de répondre à cette question.';
    if (!formData.passport) e.passport = 'Merci de répondre à cette question.';
    if (!formData.job) e.job = 'Merci de sélectionner votre situation.';
    if (!formData.email.trim()) e.email = 'Merci d’indiquer votre adresse e-mail.';
    else if (!emailValide(formData.email)) e.email = 'Cette adresse ne semble pas valide.';

    setErreurs(e);
    if (Object.keys(e).length > 0) return;

    // Seule l'absence définitive de fonds est disqualifiante. Ne pas avoir
    // encore de passeport n'en est pas une : c'est quelques semaines de délai.
    if (formData.funds === 'no') {
      envoyerLeadPartiel('Profil non éligible (fonds insuffisants) — à recontacter');
      setStep(0);
      scrollToTop();
      return;
    }

    envoyerLeadPartiel('Lead qualifié — étape 1 franchie');
    setStep(2);
    scrollToTop();
  };

  const prevStep = () => {
    setStep(1);
    scrollToTop();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const err: Record<string, string> = {};
    if (!formData.dateStart || !formData.dateEnd) {
      err.dates = 'Merci d’indiquer une fourchette de départ.';
    } else if (formData.dateEnd < formData.dateStart) {
      err.dates = 'La date de fin doit être postérieure à la date de début.';
    }
    if (!formData.location) err.location = 'Merci d’indiquer où vous déposerez la demande.';
    if (formData.job !== 'softpower' && !formData.softPowerInteret) {
      err.softPowerInteret = 'Merci de répondre à cette question.';
    }
    if (!formData.family) err.family = 'Merci de préciser votre situation.';
    if (formData.consentement !== 'yes') {
      err.consentement = 'Merci d’accepter l’utilisation de vos données pour établir le devis.';
    }

    setErreurs(err);
    if (Object.keys(err).length > 0) {
      scrollToTop();
      return;
    }

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
          "Voie Soft Power souhaitée": formData.job === 'softpower' ? 'oui (sans revenus)' : formData.softPowerInteret,
          "Soft Power": formData.softPower,
          "Traductions requises": formData.translations,
          "Niveau de service": formData.serviceLevel,
          "Remarques": formData.remarks,
          "Consentement RGPD": formData.consentement === 'yes' ? 'accordé' : 'refusé',
          "Type de demande": 'Demande de devis complète'

        }),
      });

      if (response.ok) {
        setStep(3);
        scrollToTop(); // Remonte au clic
      } else {
        setErreurs({ envoi: "L'envoi a échoué. Merci de réessayer dans un instant." });
      }
    } catch {
      setErreurs({ envoi: 'Connexion impossible. Vérifiez votre réseau et réessayez.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const Erreur = ({ champ }: { champ: string }) =>
    erreurs[champ] ? (
      <p className="text-red-400 text-xs font-medium mt-1 ml-1">{erreurs[champ]}</p>
    ) : null;

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

  // La voie Soft Power ne dépend plus du seul statut professionnel : un
  // freelance peut parfaitement choisir de passer par une école certifiée.
  const isSoftPower = formData.job === 'softpower' || formData.softPowerInteret === 'yes';
  const priceBasic = isSoftPower ? "1 750 €" : "850 €";
  const pricePremium = isSoftPower ? "2 450 €" : "1 300 €";
  const priceVIP = isSoftPower ? "4 060 €" : "2 400 €";

  // Condition pour afficher l'alerte famille à l'étape 3
  const isGroupTravel = formData.family === 'married' || formData.family === 'concubinage' || formData.family === 'family';

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
        className="relative bg-[#0d0d0d] w-full max-w-3xl max-h-[90vh] rounded-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col animate-in fade-in zoom-in-95 duration-300"
      >
        
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
            <h2 id="eligibility-modal-title" className="text-xl md:text-2xl font-extrabold text-white tracking-wide">
              {step === 0 ? 'Critères non remplis' : step === 3 ? 'Demande envoyée !' : step === 1 ? '1. Vérification d\'Éligibilité' : '2. Votre Devis Sur-Mesure'}
            </h2>
            <button onClick={onClose} aria-label="Fermer le formulaire d'éligibilité" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
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
              <h3 className="text-2xl font-black text-white mb-4">
                Le critère financier n&apos;est pas encore rempli
              </h3>
              <p className="text-gray-400 text-base max-w-lg mx-auto mb-4">
                L&apos;ambassade exige de prouver une épargne disponible de 500 000 THB, soit
                environ <MontantFonds prefixe="" />. C&apos;est une condition légale sur laquelle
                aucune agence ne peut passer outre — et se le faire dire franchement vaut mieux que
                de payer des frais consulaires non remboursables pour un refus.
              </p>
              <p className="text-gray-400 text-base max-w-lg mx-auto mb-8">
                Mais rien n&apos;est définitif. Beaucoup de nos clients ont constitué cette épargne
                en quelques mois avant de déposer. Gardez votre projet au chaud : téléchargez le
                guide gratuit, et revenez nous voir le moment venu.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
                <a
                  href="/guide-dtv-2025.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black px-6 py-3.5 rounded-full font-bold transition-all active:scale-95"
                >
                  ↓ Recevoir le guide gratuit
                </a>
                <a
                  href="/blog/fonds-bancaires-visa-dtv"
                  className="inline-flex items-center justify-center border border-white/20 text-white px-6 py-3.5 rounded-full font-bold transition-all hover:bg-white/5"
                >
                  Comprendre la règle des fonds
                </a>
              </div>

              <button
                onClick={onClose}
                className="mt-6 text-sm text-gray-500 hover:text-gray-300 transition-colors underline"
              >
                Fermer la fenêtre
              </button>
            </div>
          )}

          {/* ÉTAPE 1 */}
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="space-y-3">
                <label className="text-white font-bold text-lg">1. Disposez-vous de l&apos;équivalent de 500 000 THB (<MontantFonds prefixe="" />) d&apos;épargne ? <span className="text-amber-500">*</span></label>
                <div className="grid grid-cols-1 gap-3">
                  <RadioCard label="Oui, sur un compte accessible" field="funds" value="yes" />
                  <RadioCard label="Pas encore, mais je m'organise pour les avoir bientôt" field="funds" value="soon" />
                  <RadioCard label="Non, et je ne pourrai pas les réunir" field="funds" value="no" />
                </div>
                <Erreur champ="funds" />
              </div>

              <div className="space-y-3">
                <label className="text-white font-bold text-lg">2. Votre passeport est-il valable encore au moins 12 mois ? <span className="text-amber-500">*</span></label>
                <div className="grid grid-cols-1 gap-3">
                  <RadioCard label="Oui, il est à jour" field="passport" value="yes" />
                  <RadioCard label="Pas encore, mais je vais le refaire rapidement" field="passport" value="soon" />
                  <RadioCard label="Non, je n'ai pas de passeport" field="passport" value="no" />
                </div>
                <Erreur champ="passport" />
              </div>

              <div className="space-y-3">
                <label className="text-white font-bold text-lg">3. Quelle est votre situation professionnelle actuelle ? <span className="text-amber-500">*</span></label>
                <div className="grid grid-cols-1 gap-3">
                  <RadioCard label="Freelance / Indépendant (Clients hors Thaïlande)" field="job" value="freelance" />
                  <RadioCard label="Salarié en télétravail (Avec autorisation de l'employeur)" field="job" value="remote" />
                  <RadioCard label="Je n'ai pas de travail à distance / Je veux passer par une école" field="job" value="softpower" />
                </div>
                <Erreur champ="job" />
              </div>

              <div className="space-y-3">
                <label className="text-white font-bold text-lg">4. À quelle adresse e-mail souhaitez-vous recevoir votre devis ? <span className="text-amber-500">*</span></label>
                <input type="email" required placeholder="votre@email.com" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} className={`w-full bg-white/5 border rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-colors ${erreurs.email ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-amber-500 focus:ring-amber-500'}`}/>
                <Erreur champ="email" />
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
                      min={AUJOURDHUI}
                      value={formData.dateStart}
                      onChange={(e) => handleChange('dateStart', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-amber-500 text-sm [color-scheme:dark]"
                    />
                  </div>
                  <div className="w-full flex-1">
                    <label className="text-xs text-gray-400 mb-1.5 block ml-1">Départ au plus tard</label>
                    <input 
                      type="date" 
                      min={formData.dateStart || AUJOURDHUI}
                      value={formData.dateEnd}
                      onChange={(e) => handleChange('dateEnd', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-amber-500 text-sm [color-scheme:dark]"
                    />
                  </div>
                </div>
                <Erreur champ="dates" />
              </div>

              <div className="space-y-3">
                <label className="text-white font-bold text-lg">Où serez-vous pour déposer la demande ?</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <RadioCard label="Europe (France, Suisse, etc.)" field="location" value="europe" />
                  <RadioCard label="Asie (Thaïlande ou frontalier)" field="location" value="asia" />
                  <RadioCard label="Amérique du Nord" field="location" value="america" />
                  <RadioCard label="Autre" field="location" value="other" />
                </div>
                <Erreur champ="location" />
                <input type="text" placeholder="Précisez le pays et la ville..." value={formData.locationDetails} onChange={(e) => handleChange('locationDetails', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 mt-2 text-white focus:outline-none focus:border-amber-500 text-sm"/>
              </div>

              {formData.job !== 'softpower' && (
                <div className="space-y-3">
                  <label className="text-white font-bold text-lg">
                    Souhaitez-vous passer par la voie Soft Power (école certifiée) ?
                  </label>
                  <p className="text-xs text-gray-500 -mt-1 ml-1">
                    Cette voie n&apos;exige aucun justificatif de revenus, mais suppose
                    l&apos;inscription à un cursus de cuisine ou de Muay Thaï.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <RadioCard label="Oui, cela m'intéresse" field="softPowerInteret" value="yes" />
                    <RadioCard label="Non, je passe par mon activité" field="softPowerInteret" value="no" />
                  </div>
                  <Erreur champ="softPowerInteret" />
                </div>
              )}

              {isSoftPower && (
                <div className="space-y-3 p-5 bg-white/5 rounded-2xl border border-white/10">
                  <label className="text-white font-bold text-lg text-emerald-400">Programme Soft Power souhaité :</label>
                  <div className="grid grid-cols-1 gap-3">
                    <RadioCard label="Cuisine Thaïlandaise traditionnelle (9 mois)" field="softPower" value="cuisine" />
                    <RadioCard label="Entraînement Muay Thaï certifié (9 mois)" field="softPower" value="muaythai" />
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
                <Erreur champ="family" />
                {formData.family === 'family' && (
                  <input type="number" min={1} max={12} placeholder="Combien d'enfants à charge vous accompagnent ?" value={formData.childrenCount} onChange={(e) => handleChange('childrenCount', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 mt-2 text-white focus:outline-none focus:border-amber-500 text-sm"/>
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

              {/* ── CONSENTEMENT RGPD ── */}
              <label className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consentement === 'yes'}
                  onChange={(e) => handleChange('consentement', e.target.checked ? 'yes' : '')}
                  className="mt-0.5 w-4 h-4 flex-none accent-amber-500"
                />
                <span className="text-xs text-gray-400 leading-relaxed">
                  J&apos;accepte que ces informations soient utilisées uniquement pour établir mon
                  devis et me recontacter à ce sujet. Elles ne sont ni revendues ni transmises à des
                  tiers, et sont conservées trois ans maximum. Je peux demander leur suppression à
                  tout moment par simple e-mail.{' '}
                  <a href="/mentions-legales" target="_blank" className="text-amber-500 hover:underline">
                    Mentions légales
                  </a>
                </span>
              </label>
              <Erreur champ="consentement" />

              <Erreur champ="envoi" />

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
