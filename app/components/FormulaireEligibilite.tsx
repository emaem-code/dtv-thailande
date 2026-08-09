'use client';

import React, { useState, useRef } from 'react';
import MontantFonds from './MontantFonds';
import { lireAttribution } from '../lib/attribution';

/**
 * Corps du test d'éligibilité, partagé par deux contenants :
 *  — la fenêtre modale ouverte depuis les boutons du site (variante « modal ») ;
 *  — la page /eligibilite, indexable et partageable (variante « page »).
 *
 * Le formulaire lui-même est strictement identique dans les deux cas : seuls
 * l'habillage, le défilement et la présence du bouton de fermeture changent.
 */

export type VarianteFormulaire = 'modal' | 'page';

interface Props {
  variante?: VarianteFormulaire;
  /** Fourni uniquement en modale : affiche la croix et les boutons « fermer ». */
  onClose?: () => void;
  /** Conteneur défilant de la modale, pour remonter en haut à chaque étape. */
  conteneurScroll?: React.RefObject<HTMLDivElement | null>;
}

/**
 * Traduction des valeurs techniques en français lisible.
 *
 * Les e-mails de leads arrivent sinon en codes bruts (« yes », « asia »,
 * « refus »), qu'il faut décoder à chaque lecture. Un lead par jour, c'est un
 * décodage par jour — et un risque de mal lire un signal important.
 */
const LIBELLES: Record<string, Record<string, string>> = {
  funds: {
    yes: 'Oui, sur un compte accessible',
    soon: 'Pas encore, en cours de constitution',
    no: 'Non, fonds hors de portée',
  },
  passport: {
    yes: 'Oui, valable plus de 12 mois',
    soon: 'À refaire prochainement',
    no: '⚠️ Pas de passeport',
  },
  job: {
    freelance: 'Freelance / Indépendant',
    remote: 'Salarié en télétravail',
    softpower: 'Sans activité à distance → voie école',
  },
  location: {
    europe: 'Europe',
    asia: 'Asie (Thaïlande ou pays frontalier)',
    america: 'Amérique du Nord',
    other: 'Autre',
  },
  dejaDepose: {
    premiere: 'Non, première demande',
    'en-cours': 'Oui, une demande est en cours',
    refus: '⚠️ Oui, demande précédemment refusée',
  },
  family: {
    solo: 'Seul(e)',
    married: 'En couple (mariés)',
    concubinage: 'En couple (non mariés)',
    family: 'En famille, avec enfants',
  },
  translations: {
    yes: 'Oui, traductions à prévoir',
    no: 'Non, documents déjà en anglais',
  },
  softPowerInteret: {
    yes: 'Oui, intéressé par la voie école',
    no: 'Non, dossier via son activité',
  },
  softPower: {
    cuisine: 'Cuisine thaïlandaise (9 mois)',
    muaythai: 'Muay Thaï (9 mois)',
    unsure: 'À déterminer ensemble',
  },
  enfantsMoins20: {
    oui: 'Oui, tous mineurs de 20 ans',
    non: '⚠️ Non, au moins un enfant de 20 ans ou plus',
  },
  formule: {
    essentielle: 'Essentielle',
    premium: 'Premium',
    vip: 'VIP',
    conseil: '❓ Ne sait pas encore — envoyer les trois formules',
  },
  source: {
    google: 'Recherche Google',
    reseaux: 'Réseaux sociaux',
    forum: "Forum ou groupe d'expatriés",
    recommandation: 'Bouche-à-oreille',
  },
};

const lisible = (champ: string, valeur: string): string =>
  valeur ? LIBELLES[champ]?.[valeur] ?? valeur : '';

const dateFr = (iso: string): string =>
  iso
    ? new Date(`${iso}T00:00:00`).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

export default function FormulaireEligibilite({
  variante = 'modal',
  onClose,
  conteneurScroll,
}: Props) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Choix de formule : recueilli APRÈS l'affichage des tarifs, quand le visiteur
  // a converti et vient de découvrir les montants. C'est l'information la plus
  // utile au chiffrage, et le moment où elle coûte le moins d'abandons.
  const [envoiFormule, setEnvoiFormule] = useState(false);
  const [formuleEnvoyee, setFormuleEnvoyee] = useState(false);
  const racineRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    prenom: '',
    nationalite: '',
    nationaliteAutre: '',
    funds: '',
    passport: '',
    job: '',
    email: '',
    telephone: '',
    whatsapp: '',
    dateStart: '',
    dateEnd: '',
    location: '',
    locationDetails: '',
    villeThailande: '',
    dejaDepose: '',
    family: '',
    adultesCount: '',
    childrenCount: '',
    enfantsMoins20: '',
    formule: '',
    villeDepart: '',
    softPower: '',
    softPowerInteret: '', // un freelance peut aussi vouloir passer par une école
    translations: '',
    source: '',
    remarks: '',
    consentement: '',
  });

  // Messages d'erreur affichés sous les champs concernés, plutôt qu'en alerte système
  const [erreurs, setErreurs] = useState<Record<string, string>>({});

  const AUJOURDHUI = new Date().toISOString().slice(0, 10);
  const emailValide = (v: string) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim());

  /**
   * La nationalité et le pays de résidence déterminent ensemble les postes
   * consulaires accessibles. On transmet donc le pays saisi à la main lorsque
   * le visiteur a coché « Autre », faute de quoi l'information serait perdue.
   */
  const nationaliteLisible = () =>
    formData.nationalite === 'autre'
      ? formData.nationaliteAutre.trim() || 'Autre (non précisée)'
      : formData.nationalite;

  /** Le pays exact compte surtout hors d'Europe : Bangkok ou Kuala Lumpur ne donnent pas le même dossier. */
  const residenceDetailleeRequise =
    formData.location === 'asia' || formData.location === 'other';

  const remonter = () => {
    if (conteneurScroll?.current) {
      conteneurScroll.current.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      racineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // L'erreur s'efface dès que le visiteur corrige le champ concerné
    setErreurs((prev) => (prev[field] ? { ...prev, [field]: '' } : prev));
  };

  /** Retire les lignes vides : un e-mail de lead ne doit contenir que du signal. */
  const nettoyer = (donnees: Record<string, string>) =>
    Object.fromEntries(Object.entries(donnees).filter(([, v]) => v && v.trim() !== ''));

  /**
   * Transmet le contact dès l'étape 1, sans attendre la fin du parcours.
   * Sans cela, toute personne qui abandonne à l'étape 2 disparaît alors même
   * qu'elle a déjà fourni son prénom, son e-mail et son profil.
   */
  const envoyerLeadPartiel = async (typeDeLead: string) => {
    const attribution = lireAttribution();
    try {
      await fetch('https://formspree.io/f/mreyokzj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(
          nettoyer({
            'Type de demande': typeDeLead,
            Prénom: formData.prenom,
            // La clé doit s'appeler exactement « email » : c'est ainsi que
            // Formspree identifie l'adresse du prospect et renseigne l'en-tête
            // Reply-To. Un libellé plus élégant casserait cette détection.
            email: formData.email,
            Nationalité: nationaliteLisible(),
            'Statut Pro': lisible('job', formData.job),
            'Épargne 500 000 THB': lisible('funds', formData.funds),
            'Canal détecté': attribution.canal,
            "Page d'entrée": attribution.pageEntree,
          }),
        ),
      });
    } catch {
      /* silencieux : ne doit jamais bloquer le parcours du visiteur */
    }
  };

  const nextStep = () => {
    const e: Record<string, string> = {};
    if (!formData.funds) e.funds = 'Merci de répondre à cette question.';
    if (!formData.job) e.job = 'Merci de sélectionner votre situation.';
    if (!formData.nationalite) e.nationalite = 'Merci d’indiquer votre nationalité.';
    if (!formData.prenom.trim()) e.prenom = 'Merci d’indiquer votre prénom.';
    if (!formData.email.trim()) e.email = 'Merci d’indiquer votre adresse e-mail.';
    else if (!emailValide(formData.email)) e.email = 'Cette adresse ne semble pas valide.';

    setErreurs(e);
    if (Object.keys(e).length > 0) return;

    // Seule l'absence définitive de fonds est disqualifiante. Ne pas avoir
    // encore de passeport n'en est pas une : c'est quelques semaines de délai.
    if (formData.funds === 'no') {
      envoyerLeadPartiel('Profil non éligible (fonds insuffisants) — à recontacter');
      setStep(0);
      remonter();
      return;
    }

    envoyerLeadPartiel('Lead qualifié — étape 1 franchie');
    setStep(2);
    remonter();
  };

  const prevStep = () => {
    setStep(1);
    remonter();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const err: Record<string, string> = {};
    if (!formData.passport) err.passport = 'Merci de répondre à cette question.';
    if (!formData.dateStart || !formData.dateEnd) {
      err.dates = 'Merci d’indiquer une fourchette de départ.';
    } else if (formData.dateEnd < formData.dateStart) {
      err.dates = 'La date de fin doit être postérieure à la date de début.';
    }
    if (!formData.location) err.location = 'Merci d’indiquer où vous résidez actuellement.';
    else if (residenceDetailleeRequise && !formData.locationDetails.trim()) {
      err.locationDetails = 'Merci de préciser le pays : il détermine votre poste de dépôt.';
    }
    if (formData.job !== 'softpower' && !formData.softPowerInteret) {
      err.softPowerInteret = 'Merci de répondre à cette question.';
    }
    if (!formData.family) err.family = 'Merci de préciser votre situation.';
    else if (formData.family !== 'solo' && !formData.adultesCount) {
      err.adultesCount = 'Merci d’indiquer le nombre d’adultes.';
    }
    if (formData.family === 'family') {
      if (!formData.childrenCount) err.childrenCount = 'Merci d’indiquer le nombre d’enfants.';
      if (!formData.enfantsMoins20) err.enfantsMoins20 = 'Merci de répondre à cette question.';
    }
    if (formData.consentement !== 'yes') {
      err.consentement = 'Merci d’accepter l’utilisation de vos données pour établir le devis.';
    }

    setErreurs(err);
    if (Object.keys(err).length > 0) {
      remonter();
      return;
    }

    setIsSubmitting(true);
    const attribution = lireAttribution();

    try {
      const response = await fetch('https://formspree.io/f/mreyokzj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(
          nettoyer({
            'Type de demande': 'Demande de devis complète',
            Prénom: formData.prenom,
            // La clé doit s'appeler exactement « email » : c'est ainsi que
            // Formspree identifie l'adresse du prospect et renseigne l'en-tête
            // Reply-To. Un libellé plus élégant casserait cette détection.
            email: formData.email,
            Téléphone: formData.telephone
              ? `${formData.telephone}${formData.whatsapp === 'yes' ? ' — joignable sur WhatsApp' : ''}`
              : '',
            Nationalité: nationaliteLisible(),
            'Statut Pro': lisible('job', formData.job),
            'Épargne 500 000 THB': lisible('funds', formData.funds),
            Passeport: lisible('passport', formData.passport),
            'Période de départ': `Entre le ${dateFr(formData.dateStart)} et le ${dateFr(formData.dateEnd)}`,
            'Pays de résidence': lisible('location', formData.location),
            'Précision résidence': formData.locationDetails,
            'Destination en Thaïlande': formData.villeThailande,
            'Antécédent de demande': lisible('dejaDepose', formData.dejaDepose),
            Expatriation: lisible('family', formData.family),
            "Nombre d'adultes": formData.family === 'solo' ? '1' : formData.adultesCount,
            "Nombre d'enfants": formData.childrenCount,
            'Enfants de moins de 20 ans': lisible('enfantsMoins20', formData.enfantsMoins20),
            'Voie Soft Power': formData.job === 'softpower'
              ? 'Oui (aucun revenu à distance)'
              : lisible('softPowerInteret', formData.softPowerInteret),
            'Programme souhaité': lisible('softPower', formData.softPower),
            Traductions: lisible('translations', formData.translations),
            'Canal détecté': attribution.canal,
            "Page d'entrée": attribution.pageEntree,
            Campagne: attribution.campagne !== '—' ? attribution.campagne : '',
            'Canal déclaré': lisible('source', formData.source),
            Remarques: formData.remarks,
            'Consentement RGPD': formData.consentement === 'yes' ? 'Accordé' : 'Refusé',
          }),
        ),
      });

      if (response.ok) {
        // Accusé de réception au prospect. Volontairement détaché du parcours :
        // s'il échoue, le lead est déjà chez Formspree et l'écran de tarifs
        // s'affiche quand même.
        fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prenom: formData.prenom,
            email: formData.email,
            softPower: isSoftPower,
          }),
        }).catch(() => {
          /* silencieux : ne doit jamais gêner le visiteur */
        });

        setStep(3);
        remonter();
      } else {
        setErreurs({ envoi: "L'envoi a échoué. Merci de réessayer dans un instant." });
      }
    } catch {
      setErreurs({ envoi: 'Connexion impossible. Vérifiez votre réseau et réessayez.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Second envoi, indépendant du premier. Si le visiteur ferme la fenêtre avant
   * d'avoir choisi, la demande de devis reste intacte : on ne perd rien.
   */
  const envoyerFormule = async () => {
    const err: Record<string, string> = {};
    if (!formData.formule) {
      err.formule = 'Merci de sélectionner une formule.';
    } else if (
      (formData.formule === 'premium' || formData.formule === 'vip') &&
      !formData.villeDepart.trim()
    ) {
      err.villeDepart = 'Merci d’indiquer votre ville de départ.';
    }

    setErreurs(err);
    if (Object.keys(err).length > 0) return;

    setEnvoiFormule(true);
    try {
      const reponse = await fetch('https://formspree.io/f/mreyokzj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(
          nettoyer({
            'Type de demande': '➕ Formule retenue — complément au dossier',
            Prénom: formData.prenom,
            email: formData.email,
            'Formule retenue': lisible('formule', formData.formule),
            'Ville de départ': formData.villeDepart,
            'Rappel du profil': `${lisible('job', formData.job)} · ${lisible('family', formData.family)}`,
          }),
        ),
      });
      if (!reponse.ok) throw new Error('envoi refusé');
      setFormuleEnvoyee(true);
    } catch {
      setErreurs({ formule: 'L’envoi a échoué. Merci de réessayer dans un instant.' });
    } finally {
      setEnvoiFormule(false);
    }
  };

  const Erreur = ({ champ }: { champ: string }) =>
    erreurs[champ] ? (
      <p className="text-red-400 text-xs font-medium mt-1 ml-1">{erreurs[champ]}</p>
    ) : null;

  const RadioCard = ({ label, field, value }: { label: string; field: string; value: string }) => {
    const isSelected = formData[field as keyof typeof formData] === value;
    return (
      <div
        onClick={() => handleChange(field, value)}
        className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-center gap-3
          ${isSelected ? 'bg-amber-500/10 border-amber-500 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20'}`}
      >
        <div
          className={`w-5 h-5 rounded-full border flex items-center justify-center flex-none
          ${isSelected ? 'border-amber-500' : 'border-gray-500'}`}
        >
          {isSelected && <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />}
        </div>
        <span className="text-sm md:text-base font-medium leading-tight">{label}</span>
      </div>
    );
  };

  // La voie Soft Power ne dépend plus du seul statut professionnel : un
  // freelance peut parfaitement choisir de passer par une école certifiée.
  const isSoftPower = formData.job === 'softpower' || formData.softPowerInteret === 'yes';
  const priceBasic = isSoftPower ? '1 750 €' : '850 €';
  const pricePremium = isSoftPower ? '2 450 €' : '1 300 €';
  const priceVIP = isSoftPower ? '4 060 €' : '2 400 €';

  const isGroupTravel =
    formData.family === 'married' ||
    formData.family === 'concubinage' ||
    formData.family === 'family';

  const enModale = variante === 'modal';

  return (
    <div ref={racineRef} className={enModale ? 'flex flex-col min-h-0 flex-1' : ''}>
      {/* ── EN-TÊTE ET BARRE DE PROGRESSION ── */}
      <div
        className={`p-6 border-b border-white/10 relative overflow-hidden ${
          enModale ? 'flex-none' : 'rounded-t-3xl bg-[#0d0d0d]'
        }`}
      >
        {step === 1 || step === 2 ? (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
            <div
              className="h-full bg-amber-500 transition-all duration-500"
              style={{ width: step === 1 ? '50%' : '100%' }}
            />
          </div>
        ) : null}
        <div className="flex justify-between items-center">
          <h2
            id="eligibility-modal-title"
            className="text-xl md:text-2xl font-extrabold text-white tracking-wide"
          >
            {step === 0
              ? 'Critères non remplis'
              : step === 3
                ? 'Demande envoyée !'
                : step === 1
                  ? "1. Vérification d'éligibilité"
                  : '2. Votre devis sur-mesure'}
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              aria-label="Fermer le formulaire d'éligibilité"
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* ── CORPS ── */}
      <div
        ref={conteneurScroll}
        className={
          enModale
            ? 'flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar scroll-smooth'
            : 'p-6 md:p-8 bg-[#0d0d0d] rounded-b-3xl'
        }
      >
        {/* ÉTAPE 0 */}
        {step === 0 && (
          <div className="py-10 flex flex-col items-center text-center animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center text-4xl mb-6 border border-red-500/20">
              ✕
            </div>
            <h3 className="text-2xl font-black text-white mb-4">
              Le critère financier n&apos;est pas encore rempli
            </h3>
            <p className="text-gray-400 text-base max-w-lg mx-auto mb-4">
              L&apos;ambassade exige de prouver une épargne disponible de 500 000 THB, soit environ{' '}
              <MontantFonds prefixe="" />. C&apos;est une condition légale sur laquelle aucune agence
              ne peut passer outre — et se le faire dire franchement vaut mieux que de payer des
              frais consulaires non remboursables pour un refus.
            </p>
            <p className="text-gray-400 text-base max-w-lg mx-auto mb-8">
              Mais rien n&apos;est définitif. Beaucoup de nos clients ont constitué cette épargne en
              quelques mois avant de déposer. Gardez votre projet au chaud : téléchargez le guide
              gratuit, et revenez nous voir le moment venu.
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

            {onClose && (
              <button
                onClick={onClose}
                className="mt-6 text-sm text-gray-500 hover:text-gray-300 transition-colors underline"
              >
                Fermer la fenêtre
              </button>
            )}
          </div>
        )}

        {/* ÉTAPE 1 */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="space-y-3">
              <label className="text-white font-bold text-lg">
                1. Disposez-vous de l&apos;équivalent de 500 000 THB (
                <MontantFonds prefixe="" />) d&apos;épargne ?{' '}
                <span className="text-amber-500">*</span>
              </label>
              <div className="grid grid-cols-1 gap-3">
                <RadioCard label="Oui, sur un compte accessible" field="funds" value="yes" />
                <RadioCard
                  label="Pas encore, mais je m'organise pour les avoir bientôt"
                  field="funds"
                  value="soon"
                />
                <RadioCard label="Non, et je ne pourrai pas les réunir" field="funds" value="no" />
              </div>
              <Erreur champ="funds" />
            </div>

            <div className="space-y-3">
              <label className="text-white font-bold text-lg">
                2. Quelle est votre situation professionnelle actuelle ?{' '}
                <span className="text-amber-500">*</span>
              </label>
              <div className="grid grid-cols-1 gap-3">
                <RadioCard
                  label="Freelance / Indépendant (Clients hors Thaïlande)"
                  field="job"
                  value="freelance"
                />
                <RadioCard
                  label="Salarié en télétravail (Avec autorisation de l'employeur)"
                  field="job"
                  value="remote"
                />
                <RadioCard
                  label="Je n'ai pas de travail à distance / Je veux passer par une école"
                  field="job"
                  value="softpower"
                />
              </div>
              <Erreur champ="job" />
            </div>

            <div className="space-y-3">
              <label className="text-white font-bold text-lg">
                3. Quelle est votre nationalité ? <span className="text-amber-500">*</span>
              </label>
              <p className="text-xs text-gray-500 -mt-1 ml-1">
                Croisée avec votre pays de résidence, elle détermine les postes consulaires auxquels
                vous pouvez déposer votre demande.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <RadioCard label="Française" field="nationalite" value="France" />
                <RadioCard label="Belge" field="nationalite" value="Belgique" />
                <RadioCard label="Suisse" field="nationalite" value="Suisse" />
                <RadioCard label="Canadienne" field="nationalite" value="Canada" />
                <RadioCard label="Autre" field="nationalite" value="autre" />
              </div>
              <Erreur champ="nationalite" />
              {formData.nationalite === 'autre' && (
                <input
                  type="text"
                  placeholder="Précisez votre nationalité..."
                  value={formData.nationaliteAutre}
                  onChange={(e) => handleChange('nationaliteAutre', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 mt-2 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 text-sm"
                />
              )}
            </div>

            <div className="space-y-3">
              <label className="text-white font-bold text-lg">
                4. Comment vous joindre ? <span className="text-amber-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    placeholder="Votre prénom"
                    value={formData.prenom}
                    onChange={(e) => handleChange('prenom', e.target.value)}
                    className={`w-full bg-white/5 border rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-colors ${erreurs.prenom ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-amber-500 focus:ring-amber-500'}`}
                  />
                  <Erreur champ="prenom" />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`w-full bg-white/5 border rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-colors ${erreurs.email ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-amber-500 focus:ring-amber-500'}`}
                  />
                  <Erreur champ="email" />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={nextStep}
                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-lg py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] active:scale-95"
              >
                Vérifier mon profil →
              </button>
            </div>
          </div>
        )}

        {/* ÉTAPE 2 */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-xl mb-6">
              <p className="text-amber-400 font-bold mb-1">
                🎉 Félicitations, votre profil semble éligible !
              </p>
              <p className="text-sm text-gray-300">
                Afin de vous présenter immédiatement nos tarifs personnalisés, veuillez préciser
                votre projet.
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-white font-bold text-lg">
                Votre passeport est-il valable encore au moins 12 mois ?
              </label>
              <div className="grid grid-cols-1 gap-3">
                <RadioCard label="Oui, il est à jour" field="passport" value="yes" />
                <RadioCard
                  label="Pas encore, mais je vais le refaire rapidement"
                  field="passport"
                  value="soon"
                />
                <RadioCard label="Non, je n'ai pas de passeport" field="passport" value="no" />
              </div>
              <Erreur champ="passport" />
            </div>

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
              <label className="text-white font-bold text-lg">Où résidez-vous actuellement ?</label>
              <p className="text-xs text-gray-500 -mt-1 ml-1">
                C&apos;est à nous de vous conseiller le meilleur poste de dépôt : nous avons
                seulement besoin de savoir d&apos;où vous partez.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <RadioCard label="Europe (France, Suisse, etc.)" field="location" value="europe" />
                <RadioCard label="Asie (Thaïlande ou frontalier)" field="location" value="asia" />
                <RadioCard label="Amérique du Nord" field="location" value="america" />
                <RadioCard label="Autre" field="location" value="other" />
              </div>
              <Erreur champ="location" />
              <input
                type="text"
                placeholder={
                  residenceDetailleeRequise
                    ? 'Pays et ville — obligatoire pour cette zone'
                    : 'Précisez le pays et la ville...'
                }
                value={formData.locationDetails}
                onChange={(e) => handleChange('locationDetails', e.target.value)}
                className={`w-full bg-white/5 border rounded-xl px-5 py-3 mt-2 text-white placeholder-gray-500 focus:outline-none text-sm ${erreurs.locationDetails ? 'border-red-500/60 focus:border-red-500' : 'border-white/10 focus:border-amber-500'}`}
              />
              <Erreur champ="locationDetails" />
            </div>

            <div className="space-y-3">
              <label className="text-white font-bold text-lg">
                Où comptez-vous vous installer en Thaïlande ?
              </label>
              <p className="text-xs text-gray-500 -mt-1 ml-1">
                Même une simple intention nous aide : la région oriente les solutions que nous
                pouvons vous proposer sur place.
              </p>
              <input
                type="text"
                placeholder="Bangkok, Chiang Mai, Pattaya, Phuket, je ne sais pas encore..."
                value={formData.villeThailande}
                onChange={(e) => handleChange('villeThailande', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 text-sm"
              />
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
                  <RadioCard
                    label="Non, je passe par mon activité"
                    field="softPowerInteret"
                    value="no"
                  />
                </div>
                <Erreur champ="softPowerInteret" />
              </div>
            )}

            {isSoftPower && (
              <div className="space-y-3 p-5 bg-white/5 rounded-2xl border border-white/10">
                <label className="font-bold text-lg text-emerald-400">
                  Programme Soft Power souhaité :
                </label>
                <div className="grid grid-cols-1 gap-3">
                  <RadioCard
                    label="Cuisine Thaïlandaise traditionnelle (9 mois)"
                    field="softPower"
                    value="cuisine"
                  />
                  <RadioCard
                    label="Entraînement Muay Thaï certifié (9 mois)"
                    field="softPower"
                    value="muaythai"
                  />
                  <RadioCard
                    label="Je ne sais pas encore, j'ai besoin de conseils"
                    field="softPower"
                    value="unsure"
                  />
                </div>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-white font-bold text-lg">
                Comment envisagez-vous cette expatriation ?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <RadioCard label="Seul(e)" field="family" value="solo" />
                <RadioCard label="En couple (Mariés)" field="family" value="married" />
                <RadioCard label="En couple (Non mariés)" field="family" value="concubinage" />
                <RadioCard label="En famille (Avec enfants)" field="family" value="family" />
              </div>
              <Erreur champ="family" />

              {formData.family !== '' && formData.family !== 'solo' && (
                <div className="space-y-3 pt-2">
                  <p className="text-xs text-gray-500 ml-1">
                    Chaque personne dépose son propre dossier et règle ses propres frais
                    consulaires : ces nombres nous permettent de chiffrer précisément.
                  </p>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    placeholder="Nombre d'adultes concernés, vous compris"
                    value={formData.adultesCount}
                    onChange={(e) => handleChange('adultesCount', e.target.value)}
                    className={`w-full bg-white/5 border rounded-xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none text-sm ${erreurs.adultesCount ? 'border-red-500/60 focus:border-red-500' : 'border-white/10 focus:border-amber-500'}`}
                  />
                  <Erreur champ="adultesCount" />
                </div>
              )}

              {formData.family === 'family' && (
                <div className="space-y-3 pt-1">
                  <input
                    type="number"
                    min={1}
                    max={12}
                    placeholder="Combien d'enfants vous accompagnent ?"
                    value={formData.childrenCount}
                    onChange={(e) => handleChange('childrenCount', e.target.value)}
                    className={`w-full bg-white/5 border rounded-xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none text-sm ${erreurs.childrenCount ? 'border-red-500/60 focus:border-red-500' : 'border-white/10 focus:border-amber-500'}`}
                  />
                  <Erreur champ="childrenCount" />

                  <p className="text-sm text-gray-400 ml-1">
                    Ont-ils tous moins de 20 ans ?
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <RadioCard label="Oui, tous" field="enfantsMoins20" value="oui" />
                    <RadioCard label="Non, l'un d'eux a 20 ans ou plus" field="enfantsMoins20" value="non" />
                  </div>
                  {formData.enfantsMoins20 === 'non' && (
                    <p className="text-xs text-amber-400/90 ml-1">
                      Au-delà de 20 ans, un enfant ne relève plus de la catégorie
                      « accompagnant » : son dossier devient autonome, avec ses propres
                      conditions. Nous vous expliquerons ce que cela implique.
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-white font-bold text-lg">
                Vos documents nécessitent-ils des traductions certifiées ?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <RadioCard label="Oui, j'aurai besoin de traductions" field="translations" value="yes" />
                <RadioCard label="Non, tout est déjà en anglais" field="translations" value="no" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-white font-bold text-lg">
                Avez-vous déjà déposé une demande de visa pour la Thaïlande ?
              </label>
              <div className="grid grid-cols-1 gap-3">
                <RadioCard label="Non, c'est ma première demande" field="dejaDepose" value="premiere" />
                <RadioCard label="Oui, une demande est en cours" field="dejaDepose" value="en-cours" />
                <RadioCard label="Oui, et elle a été refusée" field="dejaDepose" value="refus" />
              </div>
              {formData.dejaDepose === 'refus' && (
                <p className="text-xs text-amber-400/90 ml-1">
                  Un refus antérieur ne ferme aucune porte, mais il change la manière de construire
                  le dossier. Précisez-nous le motif dans les remarques si vous le connaissez.
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-white font-bold text-lg">
                Un numéro pour vous joindre ? (Optionnel)
              </label>
              <p className="text-xs text-gray-500 -mt-1 ml-1">
                Utile pour les questions rapides. Nous répondons par e-mail par défaut.
              </p>
              <input
                type="tel"
                placeholder="+33 6 12 34 56 78"
                value={formData.telephone}
                onChange={(e) => handleChange('telephone', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 text-sm"
              />
              {formData.telephone.trim() !== '' && (
                <label className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.whatsapp === 'yes'}
                    onChange={(e) => handleChange('whatsapp', e.target.checked ? 'yes' : '')}
                    className="w-4 h-4 flex-none accent-amber-500"
                  />
                  <span className="text-sm text-gray-300">Je suis joignable sur WhatsApp</span>
                </label>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-white font-bold text-lg">
                Comment nous avez-vous connus ? (Optionnel)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <RadioCard label="Recherche Google" field="source" value="google" />
                <RadioCard label="Réseaux sociaux" field="source" value="reseaux" />
                <RadioCard label="Forum ou groupe d'expatriés" field="source" value="forum" />
                <RadioCard label="Bouche-à-oreille" field="source" value="recommandation" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-white font-bold text-lg">
                Des remarques ou besoins spécifiques ? (Optionnel)
              </label>
              <textarea
                rows={3}
                value={formData.remarks}
                onChange={(e) => handleChange('remarks', e.target.value)}
                placeholder="Dites-nous en plus sur votre projet..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
              />
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
                tiers, et sont conservées trois ans maximum. Je peux demander leur suppression à tout
                moment par simple e-mail.{' '}
                <a href="/mentions-legales" target="_blank" className="text-amber-500 hover:underline">
                  Mentions légales
                </a>
              </span>
            </label>
            <Erreur champ="consentement" />
            <Erreur champ="envoi" />

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
                  <>
                    <span className="animate-spin text-xl">↻</span> Calcul...
                  </>
                ) : (
                  'Découvrir mes tarifs'
                )}
              </button>
            </div>
          </div>
        )}

        {/* ÉTAPE 3 : Succès & Tarifs */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-3xl mb-4 border border-emerald-500/30 mx-auto">
                ✓
              </div>
              <h3 className="text-2xl font-black text-white mb-2">
                {formData.prenom.trim()
                  ? `Merci ${formData.prenom.trim()}, votre demande est transmise !`
                  : 'Demande transmise avec succès !'}
              </h3>
              <p className="text-gray-400 text-sm">
                Notre équipe va analyser votre projet et vous envoyer un devis exact par e-mail. En
                attendant, voici la base tarifaire pour le profil{' '}
                <strong className="text-amber-500">
                  {isSoftPower ? 'Soft Power' : 'Digital Nomad'}
                </strong>{' '}
                :
              </p>

              {isGroupTravel && (
                <div className="mt-5 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-left">
                  <p className="text-sm text-amber-500 font-bold mb-1">
                    Accompagnants supplémentaires
                  </p>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Puisque vous voyagez à plusieurs, notez qu&apos;une demande de visa distincte
                    devra être soumise pour vos accompagnants. Des frais supplémentaires seront
                    calculés en toute transparence dans votre devis.
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-white/20 transition-colors">
                <div>
                  <h4 className="font-bold text-white text-lg">Formule Essentielle</h4>
                  <p className="text-xs text-gray-400 mt-1">
                    L&apos;administratif. Frais consulaires, {isSoftPower && 'école, '}traductions et
                    suivi inclus.
                  </p>
                </div>
                <div className="text-left md:text-right flex-none">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                    À partir de
                  </p>
                  <p className="text-2xl font-black text-white">{priceBasic}</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-white/20 transition-colors">
                <div>
                  <h4 className="font-bold text-white text-lg">Formule Premium</h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Essentielle + Vol régional + Hôtel + Transferts aéroport.
                  </p>
                </div>
                <div className="text-left md:text-right flex-none">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                    À partir de
                  </p>
                  <p className="text-2xl font-black text-amber-500">{pricePremium}</p>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h4 className="font-bold text-white text-lg flex items-center gap-2">
                    Formule VIP{' '}
                    <span className="bg-amber-500 text-black text-[10px] uppercase px-2 py-0.5 rounded-full">
                      Exclusif
                    </span>
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Tout inclus : Vol Europe, Hôtels haut de gamme, Chauffeurs privés.
                  </p>
                </div>
                <div className="text-left md:text-right flex-none">
                  <p className="text-[10px] text-amber-500/70 uppercase tracking-widest font-bold">
                    À partir de
                  </p>
                  <p className="text-2xl font-black text-amber-500">{priceVIP}</p>
                </div>
              </div>
            </div>

            {/* ── CHOIX DE LA FORMULE ── */}
            {!formuleEnvoyee ? (
              <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                <div>
                  <label className="text-white font-bold text-lg">
                    Laquelle correspond le mieux à votre projet ?
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Cette réponse nous permet de vous adresser une estimation chiffrée dès notre
                    premier message, au lieu d&apos;une simple prise de contact.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <RadioCard label={`Formule Essentielle — à partir de ${priceBasic}`} field="formule" value="essentielle" />
                  <RadioCard label={`Formule Premium — à partir de ${pricePremium}`} field="formule" value="premium" />
                  <RadioCard label={`Formule VIP — à partir de ${priceVIP}`} field="formule" value="vip" />
                  <RadioCard label="Je ne sais pas encore, conseillez-moi" field="formule" value="conseil" />
                </div>
                <Erreur champ="formule" />

                {(formData.formule === 'premium' || formData.formule === 'vip') && (
                  <div className="space-y-2 pt-1">
                    <label className="text-sm text-gray-300 ml-1">
                      Ces formules incluent les vols : d&apos;où partiriez-vous ?
                    </label>
                    <input
                      type="text"
                      placeholder="Paris, Lyon, Genève, Bangkok..."
                      value={formData.villeDepart}
                      onChange={(e) => handleChange('villeDepart', e.target.value)}
                      className={`w-full bg-white/5 border rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none text-sm ${erreurs.villeDepart ? 'border-red-500/60 focus:border-red-500' : 'border-white/10 focus:border-amber-500'}`}
                    />
                    <Erreur champ="villeDepart" />
                  </div>
                )}

                <button
                  onClick={envoyerFormule}
                  disabled={envoiFormule}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-xl transition-all active:scale-95 disabled:opacity-70 flex justify-center items-center gap-2"
                >
                  {envoiFormule ? (
                    <>
                      <span className="animate-spin text-xl">↻</span> Envoi...
                    </>
                  ) : (
                    'Transmettre mon choix'
                  )}
                </button>
              </div>
            ) : (
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-2xl p-5 text-center">
                  <p className="text-emerald-400 font-bold text-sm mb-1">✓ C&apos;est noté</p>
                  <p className="text-sm text-gray-300">
                    {formData.formule === 'conseil'
                      ? 'Nous vous adresserons les trois formules chiffrées pour votre situation, avec nos recommandations.'
                      : 'Votre estimation chiffrée arrivera avec notre premier message.'}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-8 text-center">
              {onClose ? (
                <button
                  onClick={onClose}
                  className="bg-white hover:bg-gray-200 text-black px-8 py-3 rounded-full font-bold transition-all active:scale-95"
                >
                  Fermer
                </button>
              ) : (
                <a
                  href="/blog"
                  className="inline-block bg-white hover:bg-gray-200 text-black px-8 py-3 rounded-full font-bold transition-all active:scale-95"
                >
                  Lire nos guides en attendant
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
