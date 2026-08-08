import React from 'react';
import BoutonEligibilite from '../../components/BoutonEligibilite';
import BlogNavigation from '../../components/BlogNavigation';
import PartageArticle from '../../components/PartageArticle';
import MontantFonds from '../../components/MontantFonds';
import { MARGE_CONSEILLEE } from '../../lib/taux';
import { createBreadcrumbSchema, getBlogPost } from '../posts';

const breadcrumbSchema = createBreadcrumbSchema(getBlogPost('fonds-bancaires-visa-dtv'));
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

// ─── MÉTADONNÉES SEO DE L’ARTICLE ───
export const metadata: Metadata = {
  title: 'Preuve bancaire visa DTV : 500 000 THB, 3 ou 6 mois ?',
  description: "Faut-il bloquer 15 000 € pour le Visa DTV Thaïlande ? La vérité sur l'historique bancaire de 3 mois, les comptes acceptés et l'erreur qui fait refuser les dossiers.",
  alternates: {
    canonical: 'https://dtv-thailande.fr/blog/fonds-bancaires-visa-dtv', // <-- AJOUT DU CANONICAL ICI
  },
  openGraph: {
    title: 'Preuve bancaire visa DTV : 500 000 THB, 3 ou 6 mois ?',
    description: "Découvrez les exigences officielles des ambassades sur l'historique bancaire stable pour le Visa DTV.",
    url: 'https://dtv-thailande.fr/blog/fonds-bancaires-visa-dtv',
    siteName: 'DTV Thaïlande',
    locale: 'fr_FR',
    type: 'article',
    // TODO: Générer un opengraph-image.tsx ou lier une image spécifique à cet article quand les vraies miniatures seront disponibles.
    images: [{ url: '/images/blog/fonds-bancaires-visa-dtv.jpg' }],
  },
};

// ─── SCHEMA ARTICLE JSON-LD ───────────────────────────────────────────────────
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://dtv-thailande.fr/blog/fonds-bancaires-visa-dtv"
  },
  "headline": "Visa DTV : Faut-il bloquer les 500 000 THB pendant 3 ou 6 mois ?",
  "description": "Exigences officielles des ambassades sur la preuve financière de 500 000 THB pour le Visa DTV.",
  "image": "https://dtv-thailande.fr/images/blog/fonds-bancaires-visa-dtv.jpg",  
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
  "datePublished": "2026-06-01",
  "dateModified": "2026-08-08"
};

// ─── SCHEMA FAQ JSON-LD ───────────────────────────────────────────────────────
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "L'argent doit-il être en Bahts sur un compte thaïlandais ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. Les fonds peuvent être en euros ou dans n'importe quelle devise convertible sur votre compte bancaire européen (Crédit Agricole, BoursoBank, Revolut…). L'ambassade effectuera elle-même la conversion le jour du traitement du dossier.",
      },
    },
    {
      '@type': 'Question',
      name: 'Dois-je faire traduire mes relevés de compte bancaire ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Pour un dépôt en Asie via la méthode Soft Power, nos retours de terrain montrent que les relevés en français sont généralement acceptés sans traduction. Pour un dépôt à Paris avec un profil Freelance, une traduction assermentée est souvent exigée.",
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on utiliser l'argent une fois le visa obtenu ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui. L'exigence des 500 000 THB ne vaut que pour l'obtention du visa. Une fois le DTV tamponné dans votre passeport, vous êtes libre d'utiliser ces fonds pour vos billets d'avion, votre logement ou votre école en Thaïlande.",
      },
    },
    {
      '@type': 'Question',
      name: 'Un compte Revolut ou N26 est-il accepté pour le visa DTV ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, les néobanques comme Revolut ou N26 sont acceptées à condition de pouvoir fournir des relevés officiels avec IBAN et historique complet. Vérifiez que votre banque permet d'exporter des relevés au format PDF officiel avec en-tête.",
      },
    },
    {
      '@type': 'Question',
      name: 'Faut-il 3 ou 6 mois d\'historique bancaire pour le visa DTV ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "L'exigence officielle est de 3 mois d'historique, y compris à l'ambassade de Paris qui le publie explicitement. La rumeur des 6 mois vient de dossiers où l'officier a demandé des relevés complémentaires face à des mouvements suspects. Ce qui change réellement d'une ambassade à l'autre, ce n'est pas la durée mais l'exigence de traduction assermentée.",
      },
    },
    {
      '@type': 'Question',
      name: 'Que se passe-t-il si le solde descend en dessous de 500 000 THB pendant la période ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "C'est un motif de refus quasi-automatique. L'officier consulaire vérifie que le solde n'est jamais descendu sous le seuil requis sur toute la période demandée. Une seule irrégularité suffit à invalider le dossier.",
      },
    },
  ],
};

// ─── TABLEAU COMPARATIF DES AMBASSADES ───────────────────────────────────────
const ambassades = [
  {
    ville: 'Paris',
    pays: '🇫🇷 France',
    delai: '3 mois',
    traduction: 'Assermentée obligatoire',
    traitement: '3–4 semaines',
    difficulte: 'Élevée',
    difficulteColor: 'text-red-400',
  },
  {
    ville: 'Vientiane',
    pays: '🇱🇦 Laos',
    delai: '3 mois',
    traduction: 'Souvent acceptée en français',
    traitement: '3–4 jours ouvrables',
    difficulte: 'Faible',
    difficulteColor: 'text-emerald-400',
  },
  {
    ville: 'Kuala Lumpur',
    pays: '🇲🇾 Malaisie',
    delai: '3 mois',
    traduction: 'Souvent acceptée',
    traitement: '3–4 jours ouvrables',
    difficulte: 'Faible',
    difficulteColor: 'text-emerald-400',
  },
  {
    ville: 'Phnom Penh',
    pays: '🇰🇭 Cambodge',
    delai: '3 mois',
    traduction: 'Variable',
    traitement: '3–5 jours',
    difficulte: 'Modérée',
    difficulteColor: 'text-teal-400',
  },
  {
    ville: 'Genève',
    pays: '🇨🇭 Suisse',
    delai: '3 mois',
    traduction: 'Assermentée souvent exigée',
    traitement: '3–4 semaines',
    difficulte: 'Élevée',
    difficulteColor: 'text-red-400',
  },
];

// ─── TYPES DE COMPTES BANCAIRES ───────────────────────────────────────────────
const comptes = [
  { type: 'Compte courant classique', verdict: '✅ Accepté', note: 'Méthode la plus sûre et transparente.', color: 'border-emerald-500/30 bg-emerald-500/5' },
  { type: 'Livret A / LDD / Épargne', verdict: '✅ Accepté', note: 'Liquide par définition. Relevés exigés.', color: 'border-emerald-500/30 bg-emerald-500/5' },
  { type: 'Compte joint (mariés)', verdict: '✅ Accepté', note: 'Acte de mariage requis. PACS : zone grise.', color: 'border-emerald-500/30 bg-emerald-500/5' },
  { type: 'Néobanque (Revolut, N26)', verdict: '✅ Accepté', note: 'Relevés PDF officiels avec IBAN obligatoires.', color: 'border-emerald-500/30 bg-emerald-500/5' },
  { type: 'PEA / Compte-titres / Assurance Vie', verdict: '⚠️ Risqué', note: 'Fonds non liquides. Souvent refusé.', color: 'border-teal-500/30 bg-teal-500/5' },
  { type: 'Compte professionnel (SASU, SARL)', verdict: '❌ Refusé', note: "L'argent appartient à la personne morale, pas à vous.", color: 'border-red-500/30 bg-red-500/5' },
  { type: 'Crypto-monnaies (BTC, ETH…)', verdict: '❌ Refusé', note: 'Aucun portefeuille crypto accepté. Convertir en fiat.', color: 'border-red-500/30 bg-red-500/5' },
];

export default function BlogArticleDTV() {
  return (
    <article className="max-w-3xl mx-auto px-5 md:px-6 py-14 md:py-20 font-sans text-gray-300 leading-relaxed bg-[#0a0a0a]">
      <BlogNavigation variant="article-top" />
      
      {/* ── INJECTION DES SCRIPTS SEO JSON-LD ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, breadcrumbSchema]) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── EN-TÊTE ── */}
      <header className="mb-12 border-b border-gray-800 pb-10">
        <span className="inline-block bg-teal-500/10 border border-teal-500/25 text-teal-400 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
          Guide Visa · 2026
        </span>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
          Visa DTV : 500 000 THB —{' '}
          <span className="text-teal-400">3 ou 6 mois ?</span>{' '}
          La réponse définitive (2026)
        </h1>

        <p className="text-base text-gray-500 mt-4">
          Mis à jour en 2026 · Lecture : 8 min · Par{' '}
          <strong className="text-gray-400">Matthieu Moretti</strong>
        </p>
        <PartageArticle slug="fonds-bancaires-visa-dtv" variant="entete" />
      </header>

      {/* ── INTRODUCTION ── */}
      <div className="text-lg text-gray-400 mb-12 space-y-5">
        <p>
          L&apos;annonce du Visa DTV (Destination Thailand Visa) a fait l&apos;effet d&apos;une bombe dans la
          communauté des expatriés, freelances et digital nomads. Avec sa validité de{' '}
          <strong className="text-white">5 ans et ses entrées multiples</strong>, c&apos;est aujourd&apos;hui
          le sésame ultime pour s&apos;installer au Pays du Sourire.
        </p>
        <p>
          Cependant, un critère précis cristallise toutes les angoisses et sature les groupes
          d&apos;entraide : la fameuse preuve financière des{' '}
          <strong className="text-white">
            500 000 Bahts (<MontantFonds prefixe="environ " />)
          </strong>
          . Pourquoi tant
          de candidats sont-ils convaincus qu&apos;il faut six mois d&apos;historique ? Un virement
          de dernière minute passe-t-il ? L&apos;ambassade de Paris est-elle vraiment plus stricte
          que celle de Vientiane ?
        </p>
        <p className="text-white font-medium border-l-4 border-[#F59E0B] pl-5 py-1">
          Face à l&apos;avalanche de rumeurs et de témoignages contradictoires, voici la réponse
          claire, officielle et basée sur notre expertise de terrain pour réussir votre
          expatriation sans essuyer un refus.
        </p>
      </div>

      {/* ── SOMMAIRE CLIQUABLE ── */}
      <nav className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 mb-12 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Sommaire de l'article</h2>
        <ul className="space-y-3">
          <li><a href="#logique-financiere" className="text-teal-500 hover:text-teal-400 hover:underline transition-colors text-sm md:text-base">1. Pourquoi la Thaïlande exige-t-elle 500 000 THB ?</a></li>
          <li><a href="#delais-ambassades" className="text-teal-500 hover:text-teal-400 hover:underline transition-colors text-sm md:text-base">2. Trois mois partout : d'où vient la rumeur des six mois ?</a></li>
          <li><a href="#erreur-virement" className="text-teal-500 hover:text-teal-400 hover:underline transition-colors text-sm md:text-base">3. L'erreur fatale : le virement de dernière minute</a></li>
          <li><a href="#types-comptes" className="text-teal-500 hover:text-teal-400 hover:underline transition-colors text-sm md:text-base">4. Quels types de comptes bancaires sont acceptés ?</a></li>
          <li><a href="#taux-change" className="text-teal-500 hover:text-teal-400 hover:underline transition-colors text-sm md:text-base">5. La règle d'or du taux de change (EUR / THB)</a></li>
          <li><a href="#soft-power" className="text-teal-500 hover:text-teal-400 hover:underline transition-colors text-sm md:text-base">6. Le cas spécifique du DTV &quot;Soft Power&quot;</a></li>
          <li><a href="#visa-run" className="text-teal-500 hover:text-teal-400 hover:underline transition-colors text-sm md:text-base">7. Organiser son Visa Run : le timing parfait</a></li>
        </ul>
      </nav>

      {/* ── SECTION 1 ── */}
      <section className="mb-12">
        <h2 id="logique-financiere" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          1. Pourquoi la Thaïlande exige-t-elle 500 000 THB ?
        </h2>
        <p className="mb-4">
          Avant de parler des délais, il est crucial de comprendre la logique derrière cette
          exigence. Le gouvernement thaïlandais a créé le Visa DTV pour attirer des profils
          qualifiés et des passionnés de culture (via la catégorie Soft Power), mais il souhaite
          s&apos;assurer que ces résidents ne se retrouveront pas en difficulté financière sur son
          territoire.
        </p>
        <p>
          La somme de 500 000 Bahts n&apos;est{' '}
          <strong className="text-white">ni une taxe, ni un droit d&apos;entrée, ni un dépôt conservé
          par l&apos;État</strong>. Il s&apos;agit uniquement d&apos;une preuve de solvabilité correspondant
          approximativement à une année de salaire moyen confortable en Thaïlande. L&apos;officier
          consulaire veut simplement la certitude que vous disposez d&apos;un matelas de sécurité en
          cas de coup dur (frais médicaux imprévus, perte de revenus temporaire, retour d&apos;urgence
          en Europe).
        </p>
      </section>

      {/* ── SECTION 2 + TABLEAU ── */}
      <section className="mb-12">
        <h2 id="delais-ambassades" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          2. Trois mois partout : d'où vient la rumeur des six mois ?
        </h2>
        <p className="mb-4">
          C&apos;est ici que la confusion règne en maître, et la réponse va sans doute vous
          surprendre : <strong className="text-white">c&apos;est 3 mois partout, Paris comprise.</strong>{' '}
          L&apos;ambassade de Thaïlande en France le publie noir sur blanc sur son propre site.
        </p>
        <p className="mb-4">
          Alors d&apos;où vient la rumeur des six mois ? De la marge de manœuvre des officiers
          consulaires. Face à un compte au solde irrégulier, ou fraîchement alimenté par un
          virement inexpliqué, l&apos;agent réclame des relevés complémentaires pour remonter plus
          loin. Ce n&apos;est pas une règle : c&apos;est une réaction. Et elle se déclenche sur la
          qualité de votre dossier, pas sur le choix de votre ambassade.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">
          Paris : même durée, mais deux frictions coûteuses
        </h3>
        <p className="mb-5">
          Si vous faites vos démarches depuis la France, comme l&apos;indique{' '}
          <a 
            href="http://www.thaiembassy.fr/fr/visa-rdv/les-types-de-visa-et-les-documents-necessaires/dtv/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-teal-500 hover:underline font-medium inline-flex items-center gap-1"
          >
            le site officiel de l'ambassade de Paris
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          , il vous faudra un historique bancaire irréprochable sur les{' '}
          <strong className="text-white">3 derniers mois</strong>, et le solde ne doit à aucun
          moment passer sous le seuil pendant ce trimestre. Attention : ce seuil reste exprimé en
          bahts, jamais en euros. Un compte calibré au plus juste peut donc repasser sous la barre
          sans que vous ayez touché à votre épargne, simplement parce que le cours a bougé — c&apos;est
          la raison pour laquelle nous recommandons une marge, détaillée en fin d&apos;article.
        </p>
        <p className="mb-5">
          La difficulté parisienne est donc ailleurs, et elle se chiffre. D&apos;abord la{' '}
          <strong className="text-white">traduction assermentée</strong>, obligatoire pour vos
          documents français : comptez 150 à 300 € et plusieurs jours d&apos;attente. Ensuite le{' '}
          <strong className="text-white">délai d&apos;instruction</strong> : l&apos;ambassade
          annonce elle-même environ quatre semaines, quand Vientiane rend une décision en trois à
          quatre jours ouvrables. C&apos;est là, et nulle part ailleurs, que se joue vraiment le
          choix de votre ambassade.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          L&apos;Asie : la même exigence, sans les frictions
        </h3>
        <p className="mb-6">
          C&apos;est la stratégie que nous recommandons massivement à nos clients — mais pas pour
          la raison qu&apos;on lit partout. En déposant dans les pays limitrophes (Laos, Cambodge,
          Malaisie), l&apos;exigence bancaire reste identique :{' '}
          <strong className="text-white">3 mois d&apos;historique</strong>. Ce que vous gagnez, ce
          sont les relevés acceptés en français sans traduction certifiée, et un dossier instruit
          en quelques jours au lieu d&apos;un mois. Sur un projet d&apos;expatriation, trois
          semaines de délai en moins valent souvent plus que quelques centaines d&apos;euros.
        </p>

        {/* TABLEAU COMPARATIF */}
        <div className="overflow-x-auto rounded-2xl border border-gray-800 mb-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#111111] border-b border-gray-800">
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Ambassade</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Délai exigé</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold hidden md:table-cell">Traduction FR</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold hidden md:table-cell">Traitement</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Difficulté</th>
              </tr>
            </thead>
            <tbody>
              {ambassades.map((a, i) => (
                <tr
                  key={a.ville}
                  className={`border-b border-gray-800/60 ${i % 2 === 0 ? 'bg-[#0d0d0d]' : 'bg-[#0a0a0a]'}`}
                >
                  <td className="px-4 py-3">
                    <span className="text-white font-semibold">{a.ville}</span>
                    <br />
                    <span className="text-gray-500 text-xs">{a.pays}</span>
                  </td>
                  <td className="px-4 py-3 font-bold text-white">{a.delai}</td>
                  <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{a.traduction}</td>
                  <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{a.traitement}</td>
                  <td className={`px-4 py-3 font-semibold ${a.difficulteColor}`}>{a.difficulte}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-600 italic mt-2">
          * Données issues de notre expérience terrain 2025–2026. Les pratiques consulaires peuvent évoluer.
        </p>
      </section>

      {/* ── SECTION 3 ── */}
      <section className="mb-12">
        <h2 id="erreur-virement" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          3. L&apos;erreur fatale : le virement de dernière minute
        </h2>
        <p className="mb-4">
          C&apos;est le <strong className="text-white">motif de refus numéro un</strong>. Vous vous
          apprêtez à déposer votre dossier et vous demandez à un proche de vous virer la somme
          manquante la veille de l&apos;impression de vos relevés. C&apos;est une très mauvaise idée.
        </p>
        <figure className="my-8">
          <Image
            src="/images/blog/fonds-bancaires-money-parking.jpg"
            alt="Relevé bancaire analysé ligne par ligne — le virement de dernière minute est le premier motif de refus du visa DTV"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Les officiers consulaires sont formés à détecter le « money parking ». Un solde qui bondit le mois précédant le dépôt fait tomber le dossier.
          </figcaption>
        </figure>
        <p className="mb-4">
          Les officiers consulaires sont formés pour détecter le{' '}
          <strong className="text-white">&quot;money parking&quot;</strong> — le fait de stationner
          temporairement de l&apos;argent pour obtenir un visa. Si vos relevés des mois 1 et 2
          affichent 1 500 € et que le mois 3 affiche soudainement 15 000 € sans justification
          claire (vente immobilière, dividendes d&apos;entreprise), votre demande sera rejetée.
        </p>
        <p>
          L&apos;argent doit avoir eu le temps de{' '}
          <strong className="text-white">&quot;vieillir&quot; sur votre compte</strong> pour prouver
          qu&apos;il vous appartient. L&apos;ambassade y verra sinon un prêt artificiel d&apos;un proche ou une
          tentative de manipulation.
        </p>
      </section>

      {/* ── SECTION 4 + TABLEAU COMPTES ── */}
      <section className="mb-12">
        <h2 id="types-comptes" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          4. Quels types de comptes bancaires sont acceptés ?
        </h2>
        <p className="mb-6">
          Réunir la somme est une chose, mais la manière dont elle est stockée en est une autre.
          Tous les supports ne sont pas égaux aux yeux de l&apos;immigration thaïlandaise :
        </p>
        <figure className="my-8">
          <Image
            src="/images/blog/fonds-bancaires-types-comptes.jpg"
            alt="Comptes courants, livrets et néobanques acceptés pour justifier les 500 000 THB du visa DTV"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Compte courant, livret, néobanque : acceptés. PEA, assurance-vie, compte professionnel, crypto : refusés ou risqués.
          </figcaption>
        </figure>

        <div className="space-y-3">
          {comptes.map((c) => (
            <div
              key={c.type}
              className={`flex items-start gap-4 p-4 rounded-xl border ${c.color}`}
            >
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">{c.type}</p>
                <p className="text-gray-400 text-sm mt-0.5">{c.note}</p>
              </div>
              <span className="text-sm font-bold whitespace-nowrap">{c.verdict}</span>
            </div>
          ))}
        </div>
        <p className="mt-6">
          Deux cas méritent une attention particulière. Le{' '}
          <Link href="/blog/visa-dtv-couple-famille-pacs" className="text-teal-500 hover:underline font-medium">
            compte joint des couples mariés
          </Link>{' '}
          est accepté mais impose de fournir l&apos;acte de mariage légalisé. Et si vos fonds
          dorment sur un compte de société,{' '}
          <Link href="/blog/visa-dtv-freelance-auto-entrepreneur" className="text-teal-500 hover:underline font-medium">
            notre guide pour les indépendants
          </Link>{' '}
          explique comment restructurer vos virements avant de déposer.
        </p>
      </section>

      {/* ── SECTION 5 ── */}
      <section className="mb-12">
        <h2 id="taux-change" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          5. La règle d&apos;or du taux de change (EUR / THB)
        </h2>
        <p className="mb-4">
          Une erreur fréquente consiste à viser le strict minimum. Si le taux du jour indique
          que 500 000 THB équivalent à 12 800 €, et que vous présentez un relevé à 12 850 €,
          vous jouez avec le feu.
        </p>
        <p className="mb-4">
          Le taux fluctue constamment. Entre le moment où vous imprimez votre relevé et le jour
          où l&apos;officier traite votre dossier, l&apos;euro peut baisser par rapport au baht. Si
          l&apos;ambassade calcule ce jour-là que vos 12 850 € ne valent plus que 495 000 THB, le
          visa est refusé pour manque de fonds.
        </p>
        <div className="bg-teal-500/8 border border-teal-500/20 rounded-2xl p-5">
          <p className="text-teal-300 font-semibold text-sm">
            💡 Notre conseil : prévoyez toujours une marge de 10 à 15 %.
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Nous conseillons à nos clients de présenter un solde de{' '}
            <strong className="text-white">{MARGE_CONSEILLEE}</strong> plutôt que la stricte
            contre-valeur des 500 000 THB, aujourd&apos;hui de <MontantFonds prefixe="" />. Le seuil
            qui fait foi est celui en bahts, et le taux de change bouge en permanence : si le baht
            se renforce, un compte à <MontantFonds prefixe="" /> repasse sous la barre sans que vous
            ayez rien dépensé. Une marge vous met à l&apos;abri de ce basculement, et un solde
            confortable est toujours mieux perçu qu&apos;un montant calculé au plus juste.
          </p>
        </div>
      </section>

      {/* ── SECTION 6 ── */}
      <section className="mb-12">
        <h2 id="soft-power" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          6. Le cas spécifique du DTV &quot;Soft Power&quot;
        </h2>
        <p className="mb-4">
          Si l&apos;exigence des 500 000 THB reste immuable pour tous les profils, le <Link href="/blog/visa-dtv-soft-power-ecoles" className="text-teal-500 hover:underline font-medium">DTV Soft Power</Link>
          offre un{' '}
          <strong className="text-white">avantage colossal sur le reste de la documentation</strong>.
        </p>
        <p className="mb-4">
          En passant par une inscription en école de cuisine thaïlandaise certifiée, vous n&apos;avez
          plus besoin de justifier de fiches de paie, de contrats de travail ou de portfolio
          professionnel. L&apos;ambassade se concentre uniquement sur l&apos;inscription à l&apos;école et
          sur la validité de votre relevé bancaire.
        </p>
        <p>
          De plus, lors d&apos;un dépôt au Laos pour cette catégorie, les relevés bancaires en
          français passent généralement sans problème — vous économisant ainsi des centaines
          d&apos;euros en frais de traduction certifiée.
        </p>
      </section>

      {/* ── SECTION 7 ── */}
      <section className="mb-12">
        <h2 id="visa-run" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          7. Organiser son Visa Run : le timing parfait
        </h2>

        <div className="space-y-4">
          {[
            {
              icon: '✈️',
              title: 'La soumission du dossier',
              text: <>Vous devez impérativement déposer votre demande via une ambassade située à l'étranger, soit physiquement, soit sur <a href="https://www.thaievisa.go.th/" target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:underline">le portail gouvernemental Thai e-Visa</a> (selon l'ambassade dont vous dépendez).</>,
            },
            {
              icon: '🗓️',
              title: 'La durée du séjour',
              text: "Prévoyez un voyage de 5 nuits (ex : lundi au samedi). Dépôt en début de semaine, traitement sous 3 jours ouvrables à Vientiane, récupération le vendredi.",
            },
            {
              icon: '⚠️',
              title: 'Les pièges du calendrier',
              text: "Attention aux jours fériés — l'ambassade de Vientiane ferme lors des jours fériés laotiens ET thaïlandais. Un mauvais calcul peut vous bloquer une semaine de plus.",
            },
            {
              icon: '💵',
              title: 'Le règlement',
              text: <>Les frais consulaires (10 000 à 13 000 THB selon le poste) se règlent exclusivement en espèces au guichet de l'ambassade. Aucune carte bancaire n'est acceptée — anticipez votre <Link href="/blog/paiement-thailande-sans-compte-bancaire-visa-dtv" className="text-teal-500 hover:underline">réserve de liquide</Link>.</>,
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 p-4 bg-white/3 border border-gray-800 rounded-xl">
              <span className="text-2xl leading-none mt-0.5">{item.icon}</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">{item.title}</p>
        <figure className="my-8">
          <Image
            src="/images/blog/fonds-bancaires-visa-run-vientiane.jpg"
            alt="Départ pour un visa run à Vientiane afin de déposer son dossier DTV"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Cinq nuits sur place, dépôt en début de semaine, retrait le vendredi. Attention aux jours fériés laotiens et thaïlandais, qui ferment l&apos;ambassade.
          </figcaption>
        </figure>
                <p className="text-gray-400 text-sm">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10 bg-[#111111]">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="border-b border-white/10 text-xs uppercase tracking-widest text-teal-500">
              <tr>
                <th className="px-5 py-4">Ambassade</th>
                <th className="px-5 py-4">Frais consulaires</th>
                <th className="px-5 py-4">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-gray-400">
              <tr>
                <td className="px-5 py-4 font-semibold text-white">Paris 🇫🇷</td>
                <td className="px-5 py-4">350 €</td>
                <td className="px-5 py-4">Tarif publié par l&apos;ambassade</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-white">Vientiane 🇱🇦</td>
                <td className="px-5 py-4">10 000 THB (~265 €)</td>
                <td className="px-5 py-4">Réglé en espèces au guichet</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-white">Kuala Lumpur 🇲🇾</td>
                <td className="px-5 py-4">1 600 MYR — <strong className="text-white">347,20 €</strong></td>
                <td className="px-5 py-4">Relevé bancaire personnel, 15 février 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-gray-400">
          Le montant de Kuala Lumpur est celui débité sur mon propre compte le 15 février 2026.
          Il révèle un fait contre-intuitif : à 347 €, la Malaisie coûte quasiment aussi cher que
          Paris. L&apos;économie réelle d&apos;un dépôt en Asie ne se joue pas sur les frais
          consulaires, mais sur la traduction assermentée évitée et sur trois semaines de délai
          gagnées.
        </p>
      </section>

      {/* ── SECTION 8 ── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white mb-4">
          8. L&apos;angoisse du dossier refusé : ne laissez pas de place au hasard
        </h2>
        <p className="mb-4">
          Préparer un dossier consulaire est stressant. Entre les calculs de taux de change,
          la sélection des bonnes lignes comptables, l&apos;inscription officielle à une école locale
          et la planification des vols vers le Laos, la moindre erreur entraîne la perte des
          frais d&apos;ambassade <strong className="text-white">(non remboursables)</strong> et retarde
          votre projet de vie.
        </p>
        <ul className="space-y-2 mb-4">
          {[
            'Analyse millimétrée de vos relevés bancaires pour s\'assurer de leur conformité.',
            'Inscription officielle à l\'école de cuisine (pour la voie Soft Power).',
            'Montage du dossier consulaire parfait pour l\'ambassade de Vientiane.',
            'Organisation intégrale de votre logistique (vols régionaux, hôtels, transferts) pour un Visa Run sans stress.',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-gray-400">
              <span className="text-teal-400 mt-0.5 flex-none">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ── ENCART AUTEUR (E-E-A-T) ── */}
      <div className="my-14 bg-[#111111] border border-gray-800 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-6 shadow-lg">
        <div className="w-24 h-24 rounded-full bg-gray-800 flex-shrink-0 overflow-hidden border-2 border-teal-500/50">
          <div className="w-full h-full bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center text-3xl">🇹🇭</div>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-1">Matthieu Moretti</h3>
          <p className="text-teal-500 text-xs font-semibold mb-3 uppercase tracking-wider">Entrepreneur & Expert Expatriation</p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Entrepreneur digital installé à Phuket, j'accompagne les freelances et porteurs de projet dans leur installation en Thaïlande. Mon objectif : vous éviter les pièges administratifs grâce à une expertise forgée directement sur le terrain, au contact des réalités de l'immigration.
          </p>
        </div>
      </div>

      {/* ── FAQ ── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white mb-3">
          FAQ — Vos questions les plus fréquentes
        </h2>
        <p className="text-gray-400 mb-6 text-sm">
          Pour toute autre interrogation concernant les statuts (Freelance, Famille, Soft Power), consultez notre <Link href="/faq" className="text-teal-500 hover:underline font-medium">Foire Aux Questions complète</Link>.
        </p>

        <div className="space-y-4">
          {faqSchema.mainEntity.map((item) => (
            <details
              key={item.name}
              className="group border border-gray-800 rounded-xl overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none bg-[#111111] hover:bg-[#161616] transition-colors">
                <span className="text-white font-semibold text-sm">{item.name}</span>
                <span className="text-gray-500 text-lg flex-none transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-5 py-4 bg-[#0d0d0d] border-t border-gray-800">
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.acceptedAnswer.text}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <div className="mt-4 bg-[#111111] border border-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#F59E0B] opacity-8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500 opacity-5 rounded-full blur-3xl pointer-events-none" />

        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 relative z-10">
          Sécurisez votre expatriation avec DTV-Thaïlande
        </h3>
        <p className="text-gray-400 mb-8 relative z-10 text-sm md:text-base">
          Un relevé mal traduit, un historique trop court ou une mauvaise planification peuvent
          entraîner un refus immédiat. Nous prenons en charge l&apos;analyse de vos critères
          financiers, votre inscription en école certifiée et l&apos;organisation logistique de votre
          Visa Run.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 relative z-10">
          <BoutonEligibilite className="inline-flex items-center justify-center bg-white text-black font-bold text-sm py-4 px-7 rounded-full hover:bg-gray-100 active:scale-95 transition-all duration-300">
            Vérifier mon éligibilité — 2 min
          </BoutonEligibilite>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border border-white/20 text-white font-bold text-sm py-4 px-7 rounded-full hover:bg-white/5 transition-all duration-300"
          >
            Nous contacter
          </Link>
        </div>
      </div>

      <PartageArticle slug="fonds-bancaires-visa-dtv" variant="fin" />

      <BlogNavigation variant="article-bottom" />
    </article>
  );
}
