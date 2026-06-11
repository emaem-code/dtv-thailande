import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

// ─── 1. MÉTADONNÉES SEO OPTIMISÉES (NEXT.JS) ─────────────────────────────────
export const metadata: Metadata = {
  title: "TDAC Thaïlande 2026 : Guide Complet de la Carte d'Arrivée Numérique",
  description: "Le guide étape par étape pour remplir le formulaire TDAC obligatoire avant d'entrer en Thaïlande. Évitez le refus d'embarquement aux douanes.",
  alternates: {
    canonical: 'https://dtv-thailande.fr/blog/tdac-thailande-carte-arrivee', // <-- AJOUT DU CANONICAL ICI
  },
  openGraph: {
    title: "TDAC Thaïlande 2026 : Guide Complet de la Carte d'Arrivée Numérique",
    description: "Formulaire TDAC obligatoire : tutoriel pas-à-pas pour les détenteurs de visa DTV et touristes.",
    url: "https://dtv-thailande.fr/blog/tdac-thailande-carte-arrivee",
    siteName: "DTV Thaïlande",
    locale: "fr_FR",
    type: "article",
  },
};

// ─── 2. SCHEMA ARTICLE JSON-LD ───────────────────────────────────────────────
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://dtv-thailande.fr/blog/tdac-thailande-carte-arrivee"
  },
  "headline": "TDAC Thaïlande 2026 : Guide Complet de la Carte d'Arrivée Numérique",
  "description": "Le guide étape par étape pour remplir le nouveau formulaire TDAC obligatoire pour entrer en Thaïlande. Évitez les blocages à l'embarquement.",
  "image": "https://dtv-thailande.fr/poster-tdac.jpg",  
  "author": {
    "@type": "Person",
    "name": "Matthieu Moretti",
    "url": "https://dtv-thailande.fr/contact"
  },  
  "publisher": {
    "@type": "Organization",
    "name": "DTV Thaïlande",
    "logo": {
      "@type": "ImageObject",
      "url": "https://dtv-thailande.fr/logo.png"
    }
  },
  "datePublished": "2026-06-09",
  "dateModified": "2026-06-11"
};

// ─── 3. SCHEMA FAQ JSON-LD (BOOSTÉ À 5 QUESTIONS) ───────────────────────────
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Le TDAC est-il payant ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Absolument pas. Le formulaire TDAC officiel est totalement gratuit. Méfiez-vous des sites tiers qui vous facturent des frais d'intermédiation injustifiés.",
      },
    },
    {
      '@type': 'Question',
      name: "Combien de temps à l'avance doit-on remplir le TDAC ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Il est fortement recommandé de soumettre votre demande TDAC entre 72 heures et 24 heures avant l'heure prévue de votre vol pour éviter tout stress à l'aéroport.",
      },
    },
    {
      '@type': 'Question',
      name: "L'application THIM remplace-t-elle le TDAC ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non, l'application THIM ne remplace pas le TDAC. THIM est un outil complémentaire de suivi sanitaire et d'enregistrement local, tandis que le TDAC est la déclaration officielle d'immigration nécessaire pour franchir la frontière.",
      },
    },
    {
      '@type': 'Question',
      name: "Faut-il remplir un nouveau TDAC à chaque entrée en Thaïlande ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui. Le TDAC est une carte d'arrivée numérique unique liée à un voyage spécifique. Vous devez générer un nouveau QR Code à chaque fois que vous passez la frontière, que ce soit par voie aérienne ou par un poste frontalier terrestre.",
      },
    },
    {
      '@type': 'Question',
      name: "Que faire si mon QR Code TDAC ne scanne pas à l'aéroport ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Pas de panique. Si le scanner automatique rencontre un problème technique, présentez l'email de confirmation officiel reçu lors de votre inscription ou la version PDF enregistrée hors-ligne sur votre smartphone. Les agents de l'immigration peuvent effectuer une recherche manuelle avec votre numéro de passeport.",
      },
    }
  ],
};

export default function BlogArticleTdac() {
  return (
    <article className="max-w-3xl mx-auto px-5 md:px-6 py-14 md:py-20 font-sans text-gray-300 leading-relaxed bg-[#0a0a0a]">
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── EN-TÊTE ALIGNÉ AVEC LE TITLE SEO ── */}
      <header className="mb-12 border-b border-gray-800 pb-10">
        <span className="inline-block bg-sky-500/10 border border-sky-500/25 text-sky-400 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
          Urgent · Formalités Obligatoires 2026
        </span>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
          TDAC Thaïlande 2026 : Guide Complet de la Carte d’Arrivée Numérique
        </h1>

        <p className="text-base text-gray-500 mt-4">
          Lecture : 9 min · Mis à jour : 11 Juin 2026 · Par <strong className="text-gray-400">Matthieu Moretti</strong>
        </p>
      </header>

      {/* ── INTRODUCTION CONFORME (MOTS-CLÉS DANS LES 100 PREMIERS MOTS) ── */}
      <div className="text-lg text-gray-400 mb-12 space-y-5">
        <p>
          Si vous vous apprêtez à vous envoler pour Bangkok ou Phuket, l’accès au Royaume implique de maîtriser les dernières infrastructures dématérialisées. Que votre projet s’appuie sur un <strong>Visa DTV, l’exemption touristique, ou les Visa Runs en Thaïlande</strong>, les règles viennent de changer radicalement. L’ancien système d’immigration papier cède définitivement sa place à une obligation entièrement numérique : le <strong className="text-white">TDAC (Thailand Digital Arrival Card)</strong>.
        </p>
        <p>
          Désormais, aucun voyageur international ne peut franchir les portes de l’immigration sans présenter le précieux QR Code généré par cette plateforme. Pour les détenteurs de visas longue durée comme pour les vacanciers, voici le tutoriel pas-à-pas pour éliminer tout risque de refus d’embarquement à l’aéroport.
        </p>
      </div>

      {/* ── SOMMAIRE ── */}
      <nav className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 mb-12 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Au programme de ce guide :</h2>
        <ul className="space-y-3">
          <li><a href="#qu-est-ce-que-le-tdac" className="text-sky-400 hover:text-sky-300 hover:underline transition-colors text-sm md:text-base">1. Qu’est-ce que le TDAC et qui est concerné ?</a></li>
          <li><a href="#tutoriel-etape-par-etape" className="text-sky-400 hover:text-sky-300 hover:underline transition-colors text-sm md:text-base">2. Tutoriel pas-à-pas : Les champs exacts du formulaire</a></li>
          <li><a href="#liaison-visa-dtv" className="text-sky-400 hover:text-sky-300 hover:underline transition-colors text-sm md:text-base">3. Titulaires de Visa DTV : La manipulation obligatoire</a></li>
          <li><a href="#focus-app-thim" className="text-sky-400 hover:text-sky-300 hover:underline transition-colors text-sm md:text-base">4. Focus sur l’application THIM : Remplace-t-elle le TDAC ?</a></li>
          <li><a href="#entrees-terrestres-laos" className="text-sky-400 hover:text-sky-300 hover:underline transition-colors text-sm md:text-base">5. Visa Run et frontières terrestres : Le cas du Laos</a></li>
          <li><a href="#pieges-eviter" className="text-sky-400 hover:text-sky-300 hover:underline transition-colors text-sm md:text-base">6. Attention aux faux sites payants (Red Flags)</a></li>
        </ul>
      </nav>

      {/* ── SECTION 1 ── */}
      <section className="mb-12">
        <h2 id="qu-est-ce-que-le-tdac" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          1. Qu’est-ce que le TDAC et qui est concerné ?
        </h2>
        <p className="mb-4">
          Le <strong>Thailand Digital Arrival Card (TDAC)</strong> est un système d’enregistrement préalable en ligne obligatoire mis en place par les autorités de l’immigration thaïlandaise. Il permet de fluidifier les contrôles aux frontières, de numériser les flux de voyageurs et de renforcer la sécurité du territoire.
        </p>
        <p className="mb-4 text-white font-semibold">
          ⚠️ Qui doit impérativement le remplir ?
        </p>
        <p className="mb-4">
          Tous les voyageurs internationaux arrivant par voie aérienne, maritime ou terrestre sont soumis à cette règle. Que vous veniez pour des vacances de courte durée ou que vous soyez un résident permanent sous pavillon <strong>Visa DTV</strong>, vous devez vous plier à cette formalité à chaque nouvelle entrée physique sur le territoire thaïlandais.
        </p>
      </section>

      {/* ── SECTION 2 ENRICHIE (CHAMPS EXACTS EN ANGLAIS & DÉLAIS) ── */}
      <section className="mb-12">
        <h2 id="tutoriel-etape-par-etape" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          2. Tutoriel pas-à-pas : Les champs exacts du formulaire
        </h2>
        <p className="mb-4">
          Le formulaire doit idéalement être complété entre <strong>72 heures et 24 heures avant votre départ</strong>. L’accès se fait via le portail officiel de l’immigration. Pour vous éviter toute confusion lors de la saisie, voici la description textuelle exhaustive, champ par champ, des intitulés officiels en anglais :
        </p>
        
        <div className="space-y-6 bg-[#111111] p-6 rounded-2xl border border-white/5 text-sm">
          <div>
            <p className="text-amber-400 font-bold uppercase tracking-wider text-xs mb-2">Étape 1 : Personal Information (Informations Personnelles)</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400">
              <li><strong className="text-white">Passport Number :</strong> Renseignez votre numéro de passeport sans espace. Le document doit avoir plus de 6 mois de validité.</li>
              <li><strong className="text-white">Nationality :</strong> Sélectionnez votre pays émetteur (ex: French).</li>
              <li><strong className="text-white">Full Name :</strong> Renseignez votre nom de famille (Surname) et vos prénoms (Given Names) exactement comme ils apparaissent sur la bande MRZ en bas de votre passeport.</li>
              <li><strong className="text-white">Date of Birth :</strong> Indiquez votre date de naissance au format imposé (JJ/MM/AAAA).</li>
            </ul>
          </div>

          <div>
            <p className="text-amber-400 font-bold uppercase tracking-wider text-xs mb-2">Étape 2 : Travel Details (Détails du Voyage)</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400">
              <li><strong className="text-white">Flight Number / Vehicle Code :</strong> Saisissez le numéro exact de votre vol (ex: TG931) ou le code du transport terrestre si vous passez une frontière.</li>
              <li><strong className="text-white">Date of Arrival :</strong> Votre date d’atterrissage ou d’entrée physique prévue en Thaïlande.</li>
              <li><strong className="text-white">Port of Entry :</strong> Le nom de votre aéroport ou poste frontalier de destination (ex: Suvarnabhumi Airport, Phuket International Airport).</li>
            </ul>
          </div>

          <div>
            <p className="text-amber-400 font-bold uppercase tracking-wider text-xs mb-2">Étape 3 : Visa & Purpose of Visit (Motif du Séjour - Point Critique DTV)</p>
            <p className="text-gray-400 mb-3 leading-relaxed">
              C’est le cœur du formulaire qui pose le plus de problèmes aux utilisateurs sur les forums de discussion.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400">
              <li><strong className="text-white">Visa Type :</strong> Si vous entrez sous le régime général de l’exemption, sélectionnez <em>« Exemption »</em>. Si vous êtes titulaire d’un visa longue durée, sélectionnez obligatoirement <em>« Visa »</em>.</li>
              <li><strong className="text-white">Visa Number / e-Visa Reference :</strong> Pour les détenteurs du Visa DTV, vous devez reporter ici le numéro de certificat à 10 ou 12 chiffres présent sur votre document PDF officiel reçu par email.</li>
              <li><strong className="text-white">Purpose of Visit :</strong> C’est ici qu’il faut être précis. Pour un touriste classique, choisissez <em>« Tourism »</em>. Pour un détenteur de Visa DTV entrant dans le cadre du volet professionnel, vous devez sélectionner l’intitulé exact <strong>« Workcation / Digital Nomad »</strong> pour aligner votre déclaration avec les bases consulaires.</li>
            </ul>
          </div>

          <div>
            <p className="text-amber-400 font-bold uppercase tracking-wider text-xs mb-2">Étape 4 : Address in Thailand (Votre adresse locale)</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400">
              <li><strong className="text-white">Accommodation Type :</strong> Sélectionnez le type de logement (Hotel, Condo, Private Residence).</li>
              <li><strong className="text-white">Full Address & Province :</strong> Indiquez l’adresse complète de votre premier lieu de résidence. Le système utilise un menu déroulant pour la Province et le District : veillez à orthographier correctement le nom de votre hôtel ou résidence pour le retrouver facilement.</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-gray-800">
            <p className="text-white font-bold mb-1">⏱️ Quel est le délai de traitement pour recevoir le QR Code ?</p>
            <p className="text-gray-400 leading-relaxed">
              La plateforme gouvernementale s’appuie sur un système d’automatisation complet. Si vos données concordent avec votre document d’identité, <strong>la génération du QR Code TDAC est quasi-instantanée</strong>. Le document PDF officiel s’affiche directement à l’écran et une copie de sauvegarde vous est envoyée par email dans la foulée. Dans de rares cas de vérification manuelle (reflets sur la photo du passeport, adresse mal reconnue), le délai peut s’étendre jusqu’à <strong>24 heures maximum</strong>. Ne tentez pas de remplir le document à la hâte dans la file d’attente de l’enregistrement à l’aéroport.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 ── */}
      <section className="mb-12">
        <h2 id="liaison-visa-dtv" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          3. Titulaires de Visa DTV : La manipulation obligatoire
        </h2>
        <p className="mb-4">
          C’est le point critique qui cause le plus de sueurs froides aux douanes de Phuket et de Suvarnabhumi. Si vous possédez un <Link href="/blog/fonds-bancaires-visa-dtv" className="text-emerald-400 hover:underline font-medium">Visa DTV (Destination Thailand Visa)</Link>, vous devez impérativement lier vos documents dans la section dédiée.
        </p>
        <p className="mb-4">
          Si vous omettez de renseigner votre numéro de e-Visa DTV dans le formulaire numérique, le système de l’immigration vous enregistrera par défaut comme un simple touriste en exemption de visa. À l’arrivée, le douanier se basera sur la fiche informatique générée par le TDAC et risquera de vous tamponner pour une durée réduite au lieu des 180 jours légaux dus à votre précieux statut de résident longue durée.
        </p>
      </section>

      {/* ── SECTION 4 ── */}
      <section className="mb-12">
        <h2 id="focus-app-thim" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          4. Focus sur l’application THIM : Remplace-t-elle le TDAC ?
        </h2>
        <p className="mb-4">
          Une rumeur persistante sur les forums d’expatriés sème la confusion : l’application <strong className="text-white">THIM (Thailand Health and Immigration Monitor)</strong> serait en train de remplacer le TDAC. <strong className="text-amber-400"> C’est une interprétation erronée de la réglementation.</strong>
        </p>
        <p className="mb-4">
          L’application THIM est un outil complémentaire de suivi local. Elle sert principalement à l’enregistrement des adresses résidentielles prolongées et à la vérification des protocoles de santé publique à l’arrivée dans certaines provinces spécifiques. Elle ne se substitue en aucun cas au TDAC, qui reste la seule et unique carte d’arrivée officielle reconnue au niveau national pour franchir la frontière. Vous devez présenter les deux si les autorités locales de votre province de destination finale l’exigent.
        </p>
      </section>

      {/* ── SECTION 5 ENRICHIE + LIEN VERS L'ARTICLE VISA RUN ── */}
      <section className="mb-12">
        <h2 id="entrees-terrestres-laos" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          5. Visa Run et frontières terrestres : Le cas du Laos
        </h2>
        <p className="mb-4">
          Si vous êtes basé à Phuket ou Bangkok et que vous effectuez un <strong>Visa Run à Vientiane (Laos)</strong> pour récupérer ou valider un module de votre dossier, la question du retour par voie terrestre se pose de manière concrète. Le TDAC s’applique-t-il au fameux Pont de l’Amitié à Nong Khai ?
        </p>
        <p className="mb-4">
          La réponse est <strong className="text-white">oui</strong>. Les principaux postes frontières terrestres thaïlandais sont désormais équipés de terminaux de contrôle numériques. Lors de votre remplissage en ligne, vous devez simplement sélectionner l’option <em>« Land Border Checking Point »</em> et indiquer le nom exact du poste frontière (ex: Nong Khai Border Post). 
        </p>
        <p className="mb-4">
          Imprimez toujours une copie papier de votre QR Code de confirmation. Les infrastructures réseau aux frontières terrestres étant parfois capricieuses, afficher un PDF sur votre smartphone peut s’avérer complexe en zone blanche. De plus, gardez à l’esprit que les contrôles s’y durcissent de manière drastique.
        </p>
        <p className="mt-4">
          👉 Pour comprendre l’évolution des pratiques douanières à ces frontières, lisez notre enquête exclusive : <Link href="/blog/fin-exemption-visa-60-jours" className="text-red-400 hover:underline font-medium">Durcissement des frontières : pourquoi l’immigration ne donne plus que 30 jours aux visa runners</Link>.
        </p>
      </section>

      {/* ── SECTION 6 ── */}
      <section className="mb-12">
        <h2 id="pieges-eviter" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          6. Attention aux faux sites payants (Red Flags)
        </h2>
        <p className="mb-4">
          Le déploiement global du TDAC a vu naître une multitude de plateformes frauduleuses imitant à la perfection l’identité visuelle et les logos du gouvernement thaïlandais.
        </p>
        <p className="mb-6 font-medium text-amber-400">
          Rappel absolu : Le formulaire TDAC officiel est 100 % GRATUIT. 
        </p>
        <p className="mb-4">
          Si un site tiers vous demande de sortir votre carte bancaire pour payer des « frais administratifs », de « maintenance technique » ou de « traitement rapide » s’élevant à 30, 50 ou 80 €, <strong>quittez immédiatement la page</strong>. Vous êtes sur une interface d’arnaque qui se contente de collecter vos données personnelles sensibles pour remplir le vrai site gratuit à votre place.
        </p>
        <div className="mt-6 p-5 bg-sky-500/5 border border-sky-500/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold text-sm">Portail Officiel de l’Immigration</p>
            <p className="text-gray-400 text-xs mt-0.5">Ne remplissez vos informations sur aucun autre site internet.</p>
          </div>
          <a 
            href="https://tdac.immigration.go.th/arrival-card/#/home" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 font-bold text-xs px-4 py-2.5 rounded-xl border border-sky-500/25 transition-all whitespace-nowrap"
          >
            Remplir mon TDAC Gratuitement
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </section>

      {/* ── ENCART AUTEUR CORRIGÉ (E-E-A-T MAX) ── */}
      <div className="my-14 bg-[#111111] border border-gray-800 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-6 shadow-lg">
        <div className="w-24 h-24 rounded-full bg-gray-800 flex-shrink-0 overflow-hidden border-2 border-sky-500/50">
          <div className="w-full h-full bg-gradient-to-br from-sky-500/20 to-emerald-500/20 flex items-center justify-center text-3xl">✈️</div>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-1">Matthieu Moretti</h3>
          <p className="text-sky-400 text-xs font-semibold mb-3 uppercase tracking-wider">Veille Légale & Formalités</p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Installé à Phuket, j’accompagne au quotidien les expatriés et les digital nomads francophones dans la sécurisation de leurs statuts légaux. En contact permanent avec les bureaux de l’immigration et les écoles certifiées, je décrypte les infrastructures numériques pour vous garantir une installation en Thaïlande fluide, légale et sans stress.
          </p>
        </div>
      </div>

      {/* ── MAILLAGE INTERNE CONSOLIDÉ AVEC LES 3 ARTICLES ── */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 mb-12">
        <p className="text-white font-bold text-sm mb-4">📚 Liens et ressources complémentaires :</p>
        <ul className="space-y-3">
          <li>
            <Link href="/blog/fin-exemption-visa-60-jours" className="text-sky-400 hover:text-sky-300 hover:underline text-sm transition-colors">
              → Durcissement des frontières : pourquoi l’immigration ne donne plus que 30 jours aux touristes
            </Link>
          </li>
          <li>
            <Link href="/blog/fonds-bancaires-visa-dtv" className="text-sky-400 hover:text-sky-300 hover:underline text-sm transition-colors">
              → Preuve financière DTV : Faut-il bloquer les 500 000 THB pendant 3 ou 6 mois ?
            </Link>
          </li>
          <li>
            <Link href="/faq" className="text-sky-400 hover:text-sky-300 hover:underline text-sm transition-colors">
              → FAQ Officielle : Toutes les réponses techniques sur le Visa DTV de 5 ans
            </Link>
          </li>
        </ul>
      </div>

      {/* ── FAQ VISUELLE COMPLÈTE (5 QUESTIONS COMPLÈTES) ── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white mb-3">Questions Fréquentes — TDAC & Formalités d’Arrivée</h2>
        <div className="space-y-4">
          <details className="group border border-gray-800 rounded-xl overflow-hidden">
            <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none bg-[#111111] hover:bg-[#161616] transition-colors">
              <span className="text-white font-semibold text-sm">Le TDAC est-il payant ?</span>
              <span className="text-gray-500 text-lg flex-none transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="px-5 py-4 bg-[#0d0d0d] border-t border-gray-800">
              <p className="text-gray-400 text-sm leading-relaxed">Absolument pas. Le formulaire TDAC officiel est totalement gratuit. Méfiez-vous des sites tiers qui vous facturent des frais d’intermédiation injustifiés.</p>
            </div>
          </details>

          <details className="group border border-gray-800 rounded-xl overflow-hidden">
            <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none bg-[#111111] hover:bg-[#161616] transition-colors">
              <span className="text-white font-semibold text-sm">Combien de temps à l’avance doit-on remplir le TDAC ?</span>
              <span className="text-gray-500 text-lg flex-none transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="px-5 py-4 bg-[#0d0d0d] border-t border-gray-800">
              <p className="text-gray-400 text-sm leading-relaxed">Il est fortement recommandé de soumettre votre demande TDAC entre 72 heures et 24 heures avant l’heure prévue de votre vol pour éviter tout stress inutile à l’aéroport d’embarquement.</p>
            </div>
          </details>

          <details className="group border border-gray-800 rounded-xl overflow-hidden">
            <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none bg-[#111111] hover:bg-[#161616] transition-colors">
              <span className="text-white font-semibold text-sm">L’application THIM remplace-t-elle le TDAC ?</span>
              <span className="text-gray-500 text-lg flex-none transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="px-5 py-4 bg-[#0d0d0d] border-t border-gray-800">
              <p className="text-gray-400 text-sm leading-relaxed">Non, l’application THIM ne remplace pas le TDAC. THIM est un outil complémentaire de suivi sanitaire et d’enregistrement local provincial, tandis que le TDAC est la déclaration officielle d’immigration nécessaire pour franchir la frontière nationale.</p>
            </div>
          </details>

          <details className="group border border-gray-800 rounded-xl overflow-hidden">
            <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none bg-[#111111] hover:bg-[#161616] transition-colors">
              <span className="text-white font-semibold text-sm">Faut-il remplir un nouveau TDAC à chaque entrée en Thaïlande ?</span>
              <span className="text-gray-500 text-lg flex-none transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="px-5 py-4 bg-[#0d0d0d] border-t border-gray-800">
              <p className="text-gray-400 text-sm leading-relaxed">Oui. Le TDAC est une carte d’arrivée numérique unique liée à un voyage spécifique (numéro de vol et date d’arrivée définis). Vous devez générer un nouveau QR Code à chaque fois que vous passez la frontière, quel que soit votre statut ou votre visa.</p>
            </div>
          </details>

          <details className="group border border-gray-800 rounded-xl overflow-hidden">
            <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none bg-[#111111] hover:bg-[#161616] transition-colors">
              <span className="text-white font-semibold text-sm">Que faire si mon QR Code TDAC ne scanne pas à l’aéroport ?</span>
              <span className="text-gray-500 text-lg flex-none transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="px-5 py-4 bg-[#0d0d0d] border-t border-gray-800">
              <p className="text-gray-400 text-sm leading-relaxed">Pas de panique. Si le scanner automatique rencontre un problème technique lors du contrôle au guichet, présentez l’email de confirmation officiel reçu lors de votre inscription ou la version PDF enregistrée hors-ligne sur votre smartphone. Les agents de l’immigration procéderont à une validation manuelle immédiate via votre numéro de passeport.</p>
            </div>
          </details>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="mt-4 bg-[#111111] border border-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Un dossier DTV sécurisé de A à Z</h3>
        <p className="text-gray-400 mb-8 text-sm md:text-base">
          Ne laissez pas un formulaire mal rempli ou une mauvaise synchronisation douanière gâcher votre projet d’expatriation. Nos équipes gèrent la conformité globale de votre dossier pour le Visa DTV et vous guident pas-à-pas à travers toutes les formalités d’arrivée obligatoires.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/" className="inline-flex items-center justify-center bg-white text-black font-bold text-sm py-4 px-7 rounded-full hover:bg-gray-100 transition-all duration-300">
            Vérifier mon éligibilité au DTV
          </Link>
        </div>
      </div>

    </article>
  );
}