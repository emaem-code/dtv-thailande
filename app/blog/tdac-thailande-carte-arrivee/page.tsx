import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

// ─── 1. MÉTADONNÉES SEO OPTIMISÉES (NEXT.JS) ─────────────────────────────────
export const metadata: Metadata = {
  title: 'TDAC Thaïlande 2026 : Guide Complet de la Carte d\'Arrivée Numérique',
  description: 'Le guide étape par étape pour remplir le formulaire TDAC obligatoire avant d\'entrer en Thaïlande. Évitez le refus d\'embarquement.',
  openGraph: {
    title: 'TDAC Thaïlande 2026 : Guide Complet de la Carte d\'Arrivée Numérique',
    description: 'Formulaire TDAC obligatoire : tutoriel pas-à-pas pour les détenteurs de visa DTV et touristes.',
    url: 'https://dtv-thailande.fr/blog/tdac-thailande-carte-arrivee',
    siteName: 'DTV Thaïlande',
    locale: 'fr_FR',
    type: 'article',
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
  "dateModified": "2026-06-09"
};

// ─── 3. SCHEMA FAQ JSON-LD ───────────────────────────────────────────────────
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

      {/* ── EN-TÊTE ── */}
      <header className="mb-12 border-b border-gray-800 pb-10">
        <span className="inline-block bg-sky-500/10 border border-sky-500/25 text-sky-400 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
          Urgent · Formalités Obligatoires 2026
        </span>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
          Formulaire <span className="text-sky-400">TDAC Thaïlande</span> : Guide Complet de la Nouvelle Carte d'Arrivée Numérique
        </h1>

        <p className="text-base text-gray-500 mt-4">
          Lecture : 9 min · Par <strong className="text-gray-400">Matthieu Moretti</strong>
        </p>
      </header>

      {/* ── INTRODUCTION ── */}
      <div className="text-lg text-gray-400 mb-12 space-y-5">
        <p>
          Si vous vous apprêtez à vous envoler pour Bangkok ou Phuket, les règles viennent de changer radicalement. 
          L'ancien système d'immigration papier cède définitivement sa place à une obligation entièrement dématérialisée : 
          le <strong className="text-white">TDAC (Thailand Digital Arrival Card)</strong>.
        </p>
        <p>
          Désormais, aucun voyageur ne peut franchir les portes de l'immigration sans présenter le précieux QR Code généré par cette plateforme. 
          Pour les détenteurs du <Link href="/faq" className="text-amber-500 hover:underline">Visa DTV</Link> ou les touristes en exemption, voici le tutoriel pas-à-pas pour éviter le refus d'embarquement à l'aéroport.
        </p>
      </div>

      {/* ── SOMMAIRE ── */}
      <nav className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 mb-12 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Au programme de ce guide :</h2>
        <ul className="space-y-3">
          <li><a href="#qu-est-ce-que-le-tdac" className="text-sky-400 hover:text-sky-300 hover:underline transition-colors text-sm md:text-base">1. Qu'est-ce que le TDAC et qui est concerné ?</a></li>
          <li><a href="#tutoriel-etape-par-etape" className="text-sky-400 hover:text-sky-300 hover:underline transition-colors text-sm md:text-base">2. Tutoriel pas-à-pas : Remplir le formulaire sans erreur</a></li>
          <li><a href="#liaison-visa-dtv" className="text-sky-400 hover:text-sky-300 hover:underline transition-colors text-sm md:text-base">3. Titulaires de Visa DTV : La manipulation obligatoire</a></li>
          <li><a href="#focus-app-thim" className="text-sky-400 hover:text-sky-300 hover:underline transition-colors text-sm md:text-base">4. Focus sur l'application THIM : Remplace-t-elle le TDAC ?</a></li>
          <li><a href="#entrees-terrestres-laos" className="text-sky-400 hover:text-sky-300 hover:underline transition-colors text-sm md:text-base">5. Visa Run et frontières terrestres : Le cas du Laos</a></li>
          <li><a href="#pieges-eviter" className="text-sky-400 hover:text-sky-300 hover:underline transition-colors text-sm md:text-base">6. Attention aux faux sites payants (Red Flags)</a></li>
        </ul>
      </nav>

      {/* ── SECTIONS ── */}
      <section className="mb-12">
        <h2 id="qu-est-ce-que-le-tdac" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          1. Qu'est-ce que le TDAC et qui est concerné ?
        </h2>
        <p className="mb-4">
          Le <strong>Thailand Digital Arrival Card (TDAC)</strong> est un système d'enregistrement préalable en ligne obligatoire mis en place par les autorités de l'immigration thaïlandaise. 
          Il permet de fluidifier les contrôles aux frontières et de renforcer la sécurité du territoire.
        </p>
        <p className="mb-4 text-white font-semibold">
          ⚠️ Qui doit le remplir ?
        </p>
        <p className="mb-4">
          Tous les voyageurs internationaux arrivant par voie aérienne, maritime ou terrestre. Que vous veniez pour des vacances ou que vous soyez un résident longue durée sous pavillon <strong>Visa DTV</strong>, vous êtes soumis à cette formalité à chaque nouvelle entrée sur le territoire.
        </p>
      </section>

      <section className="mb-12">
        <h2 id="tutoriel-etape-par-etape" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          2. Tutoriel pas-à-pas : Remplir le formulaire sans erreur
        </h2>
        <p className="mb-4">
          Le formulaire doit idéalement être complété entre <strong>72 heures et 24 heures avant votre départ</strong>. L'accès se fait via le portail officiel de l'immigration.
        </p>
        <div className="space-y-4 bg-[#111111] p-6 rounded-2xl border border-white/5">
          <p className="text-white font-bold text-sm">📋 Les 4 étapes clés du formulaire :</p>
          <ol className="list-decimal pl-5 space-y-3 text-sm text-gray-400">
            <li><strong className="text-white">Identité et Passeport :</strong> Téléchargez la photo de votre page de passeport (valide de plus de 6 mois). Veillez à ce qu'il n'y ait aucun reflet.</li>
            <li><strong className="text-white">Informations du Vol :</strong> Renseignez le numéro de votre vol (ex: TG931) et votre date d'arrivée exacte à destination.</li>
            <li><strong className="text-white">Hébergement en Thaïlande :</strong> Indiquez l'adresse de votre premier hôtel, de votre condo ou de votre villa (ex: à Phuket ou Bangkok).</li>
            <li><strong className="text-white">Génération du QR Code :</strong> Une fois validé, téléchargez le document PDF contenant le QR Code officiel. Enregistrez-le impérativement sur votre téléphone.</li>
          </ol>
        </div>
      </section>

      <section className="mb-12">
        <h2 id="liaison-visa-dtv" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          3. Titulaires de Visa DTV : La manipulation obligatoire
        </h2>
        <p className="mb-4">
          C'est le point critique qui cause le plus de sueurs froides aux douanes de Phuket et de Suvarnabhumi. 
          Si vous possédez un <Link href="/blog/fonds-bancaires-visa-dtv" className="text-emerald-400 hover:underline font-medium">Visa DTV (Destination Thailand Visa)</Link>, vous devez impérativement le spécifier dans la section <em>&quot;Visa Type&quot;</em> du TDAC.
        </p>
        <p className="mb-4">
          Si vous oubliez de lier votre numéro de e-Visa DTV dans le formulaire numérique, le système vous enregistrera par défaut comme un simple touriste en exemption de visa. À l'arrivée, le douanier risque de vous tamponner pour 60 jours seulement au lieu des 180 jours légaux dus à votre précieux statut.
        </p>
      </section>

      {/* ── NOUVELLE SECTION APP THIM ── */}
      <section className="mb-12">
        <h2 id="focus-app-thim" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          4. Focus sur l'application THIM : Remplace-t-elle le TDAC ?
        </h2>
        <p className="mb-4">
          Une rumeur persistante sur les forums d'expatriés sème la confusion : l'application <strong className="text-white">THIM (Thailand Health and Immigration Monitor)</strong> serait en train de remplacer le TDAC. 
          <strong className="text-amber-400"> C'est une interprétation erronée.</strong>
        </p>
        <p className="mb-4">
          L'application THIM est un outil complémentaire de suivi local. Elle sert principalement à l'enregistrement des adresses résidentielles prolongées et à la vérification des protocoles de santé publique à l'arrivée. Elle ne se substitue en aucun cas au TDAC, qui reste la seule et unique carte d'arrivée officielle reconnue pour franchir la frontière. Vous devez présenter les deux si les autorités locales de votre province de destination l'exigent.
        </p>
      </section>

      {/* ── NOUVELLE SECTION FRONTIÈRES TERRESTRES ── */}
      <section className="mb-12">
        <h2 id="entrees-terrestres-laos" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          5. Visa Run et frontières terrestres : Le cas du Laos
        </h2>
        <p className="mb-4">
          Si vous êtes basé à Phuket ou Bangkok et que vous effectuez un <strong>Visa Run à Vientiane (Laos)</strong> pour récupérer ou valider un module de votre Visa, la question du retour par voie terrestre se pose. Le TDAC s'applique-t-il au fameux Pont de l'Amitié à Nong Khai ?
        </p>
        <p className="mb-4">
          La réponse est <strong className="text-white">oui</strong>. Les principaux postes frontières terrestres thaïlandais sont désormais équipés de terminaux numériques. Lors de votre remplissage en ligne, vous devez simplement sélectionner l'option <em>&quot;Land Border Checking Point&quot;</em> et indiquer le nom exact du poste frontière (ex: Nong Khai Border Post). Imprimez une copie papier du QR Code, les infrastructures réseau aux frontières terrestres étant parfois capricieuses pour afficher un PDF sur votre smartphone.
        </p>
      </section>

      {/* ── SECTION 6 AVEC LIEN OFFICIEL ── */}
      <section className="mb-12">
        <h2 id="pieges-eviter" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          6. Attention aux faux sites payants (Red Flags)
        </h2>
        <p className="mb-4">
          Le déploiement du TDAC a vu naître une multitude de sites frauduleux imitant à la perfection l'identité visuelle du gouvernement thaïlandais.
        </p>
        <p className="mb-6 font-medium text-amber-400">
          Rappel absolu : Le formulaire TDAC officiel est 100 % GRATUIT. 
        </p>
        <p className="mb-4">
          Si un site vous demande de sortir votre carte bancaire pour payer des &quot;frais administratifs&quot; ou de &quot;traitement rapide&quot; s'élevant à 30, 50 ou 80 €, <strong>quittez immédiatement la page</strong>. Vous êtes sur une plateforme d'arnaque qui se contente de voler vos données personnelles pour remplir le vrai site gratuit à votre place.
        </p>
        <div className="mt-6 p-5 bg-sky-500/5 border border-sky-500/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold text-sm">Portail Officiel de l'Immigration</p>
            <p className="text-gray-400 text-xs mt-0.5">Ne remplissez vos informations sur aucun autre site internet.</p>
          </div>
          <a 
            href="https://www.immigration.go.th" 
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
            Installé à Phuket, j'accompagne au quotidien les expatriés et les digital nomads francophones dans la sécurisation de leurs statuts légaux. En contact permanent avec les bureaux de l'immigration et les écoles certifiées, je décrypte les infrastructures numériques pour vous garantir une installation en Thaïlande fluide et sans stress.
          </p>
        </div>
      </div>

      {/* ── FAQ ── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white mb-3">Questions Fréquentes</h2>
        <div className="space-y-4">
          {faqSchema.mainEntity.map((item) => (
            <details key={item.name} className="group border border-gray-800 rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none bg-[#111111] hover:bg-[#161616] transition-colors">
                <span className="text-white font-semibold text-sm">{item.name}</span>
                <span className="text-gray-500 text-lg flex-none transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="px-5 py-4 bg-[#0d0d0d] border-t border-gray-800">
                <p className="text-gray-400 text-sm leading-relaxed">{item.acceptedAnswer.text}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="mt-4 bg-[#111111] border border-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Un dossier DTV sécurisé de A à Z</h3>
        <p className="text-gray-400 mb-8 text-sm md:text-base">
          Ne laissez pas un formulaire mal rempli gâcher votre projet d'expatriation. Nos équipes gèrent la conformité globale de votre dossier pour le Visa DTV et vous guident à travers toutes les formalités d'arrivée obligatoires.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/" className="inline-flex items-center justify-center bg-white text-black font-bold text-sm py-4 px-7 rounded-full hover:bg-gray-100 transition-all duration-300">
            Vérifier mon éligibilité
          </Link>
        </div>
      </div>

    </article>
  );
}