import React from 'react';
import BoutonEligibilite from '../../components/BoutonEligibilite';
import LienArticle from '../../components/LienArticle';
import BlogNavigation from '../../components/BlogNavigation';
import { createBreadcrumbSchema, getBlogPost } from '../posts';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

const breadcrumbSchema = createBreadcrumbSchema(getBlogPost('paiement-thailande-sans-compte-bancaire-visa-dtv'));

// ─── MÉTADONNÉES SEO DE L’ARTICLE ───
export const metadata: Metadata = {
  title: 'Paiements en Thaïlande avec un Visa DTV : la vraie stratégie (2026)',
  description: "Wise, PromptPay, QR codes, cash : le guide terrain complet pour gérer ses paiements en Thaïlande avec un Visa DTV sans compte bancaire local en 2026.",
  alternates: {
    canonical: 'https://dtv-thailande.fr/blog/paiement-thailande-sans-compte-bancaire-visa-dtv',
  },
  openGraph: {
    title: 'Paiements en Thaïlande avec un Visa DTV : la vraie stratégie sans compte bancaire (2026)',
    description: "Découvrez comment vivre et payer en Thaïlande sans compte bancaire local avec Wise, les QR codes et les astuces terrain.",
    url: 'https://dtv-thailande.fr/blog/paiement-thailande-sans-compte-bancaire-visa-dtv',
    siteName: 'DTV Thaïlande',
    locale: 'fr_FR',
    type: 'article',
    // Miniature SEO optimisée (1200x630) pour le partage Facebook/Twitter
    images: [{ url: '/images/blog/paiement-thailande-sans-compte-bancaire-visa-dtv.jpg' }],
  },
};

// ─── SCHEMA ARTICLE JSON-LD ───────────────────────────────────────────────────
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://dtv-thailande.fr/blog/paiement-thailande-sans-compte-bancaire-visa-dtv"
  },
  "headline": "Paiements en Thaïlande avec un Visa DTV : la vraie stratégie sans compte bancaire (2026)",
  "description": "Guide complet pour gérer ses paiements en Thaïlande avec un Visa DTV, utiliser Wise, et éviter les frais de change.",
  "image": "https://dtv-thailande.fr/images/blog/paiement-thailande-sans-compte-bancaire-visa-dtv.jpg",  
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
  "datePublished": "2026-07-21",
  "dateModified": "2026-07-21"
};

// ─── SCHEMA FAQ JSON-LD ───────────────────────────────────────────────────────
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Peut-on vraiment vivre sans cash en Thaïlande avec Wise en 2026 ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "À 90-95%, oui. Wise via QR PromptPay et la carte dématérialisée couvre l'essentiel du quotidien. Le cash reste nécessaire pour l'immigration (20 000 THB), les achats de moins de 200 THB au 7-Eleven, et certaines factures locales.",
      },
    },
    {
      '@type': 'Question',
      name: "Pourquoi ma carte Revolut est-elle facturée 3 à 5% en Thaïlande ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Ce sont des frais d'interchange que le commerçant répercute sur les cartes internationales. Wise QR PromptPay évite ce problème car le paiement transite par le réseau bancaire local thaïlandais sans frais d'interchange.",
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on retirer des espèces avec Wise aux ATM thaïlandais ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. Avec un compte Wise enregistré à une adresse thaïlandaise, les retraits ATM en Thaïlande sont bloqués depuis 2026. La solution : arriver avec des euros en espèces et les changer sur place (au comptoir Superrich de l'aéroport).",
      },
    },
    {
      '@type': 'Question',
      name: "Comment payer au 7-Eleven avec Wise ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "La carte Wise physique ou dématérialisée fonctionne sur les terminaux 7-Eleven, mais uniquement à partir de 200 THB d'achat. En dessous de ce seuil, le paiement en espèces est obligatoire.",
      },
    },
    {
      '@type': 'Question',
      name: "Pourquoi ma facture d'eau est-elle refusée au 7-Eleven ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Si vous vivez en condo, votre facture d'eau est émise par le bureau de gestion avec un code-barres interne non reconnu par le 7-Eleven. Réglez au bureau de gestion en espèces ou via une app locale.",
      },
    },
    {
      '@type': 'Question',
      name: "Y a-t-il une limite au montant des paiements Wise PromptPay ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui : 10 000 THB maximum par transaction. Pour les gros paiements (caution, loyer élevé, achat important), il faudra fractionner ou prévoir une alternative.",
      },
    },
    {
      '@type': 'Question',
      name: "Wise remplace-t-il un compte bancaire thaïlandais ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Pour 90-95% du quotidien, oui. Pour les prélèvements automatiques, les paiements supérieurs à 10 000 THB par transaction et les services gouvernementaux, non.",
      },
    },
    {
      '@type': 'Question',
      name: "TAGTHAi peut-il servir pour les dépenses quotidiennes ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. TAGTHAi est réservé aux pass touristiques et au VAT Refund. Son rechargement exige un déplacement physique à un guichet KBank et son scanner ne lit pas les QR codes personnels des petits commerçants.",
      },
    }
  ],
};

export default function BlogArticlePaiements() {
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
          Finances · Vie Pratique
        </span>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
          Paiements en Thaïlande avec un Visa DTV :{' '}
          <span className="text-teal-400">la vraie stratégie</span>{' '}
          sans compte bancaire (2026)
        </h1>

        <p className="text-base text-gray-500 mt-4">
          Mis à jour en 2026 · Lecture : 10 min · Par{' '}
          <strong className="text-gray-400">Matthieu Moretti</strong>
        </p>
      </header>

      {/* ── INTRODUCTION ── */}
      <div className="text-lg text-gray-400 mb-12 space-y-5">
        <p>
          L&apos;atterrissage à Bangkok ou Phuket marque le début d&apos;une nouvelle vie. Mais dès les premiers jours, une réalité s&apos;impose : <strong className="text-white">les banques thaïlandaises ne veulent pas de vous</strong>. Kasikorn, Bangkok Bank, SCB, Krungsri — toutes refusent d&apos;ouvrir un compte avec le Visa DTV.
        </p>
        <p>
          Pas de compte local, cela signifie pas de prélèvement automatique et pas d&apos;accès au système bancaire thaïlandais classique.
        </p>
        <p className="text-white font-medium border-l-4 border-[#F59E0B] pl-5 py-1">
          Bonne nouvelle : en 2026, cette contrainte est largement contournable. Entre Wise qui intègre officiellement le réseau PromptPay, les QR codes omniprésents et quelques astuces testées sur le terrain, voici comment gérer vos paiements du quotidien sans jamais manquer d&apos;argent — et sans payer de frais inutiles.
        </p>
      </div>

      {/* ── SOMMAIRE CLIQUABLE ── */}
      <nav className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 mb-12 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Sommaire de l&apos;article</h2>
        <ul className="space-y-3">
          <li><a href="#banques-thailandaises" className="text-teal-500 hover:text-teal-400 hover:underline transition-colors text-sm md:text-base">1. Pourquoi les banques thaïlandaises refusent le Visa DTV</a></li>
          <li><a href="#revolution-wise" className="text-teal-500 hover:text-teal-400 hover:underline transition-colors text-sm md:text-base">2. La révolution Wise de mai 2026</a></li>
          <li><a href="#piege-atm" className="text-teal-500 hover:text-teal-400 hover:underline transition-colors text-sm md:text-base">3. Le piège critique : les retraits ATM Wise bloqués</a></li>
          <li><a href="#taux-de-change" className="text-teal-500 hover:text-teal-400 hover:underline transition-colors text-sm md:text-base">4. La vérité sur les taux de change</a></li>
          <li><a href="#3-niveaux-paiement" className="text-teal-500 hover:text-teal-400 hover:underline transition-colors text-sm md:text-base">5. Les 3 niveaux de paiement en Thaïlande</a></li>
          <li><a href="#frais-revolut" className="text-teal-500 hover:text-teal-400 hover:underline transition-colors text-sm md:text-base">6. Pourquoi votre carte Revolut vous coûte 3 à 5% de plus</a></li>
          <li><a href="#astuce-alipay" className="text-teal-500 hover:text-teal-400 hover:underline transition-colors text-sm md:text-base">7. L&apos;astuce Alipay pour le 7-Eleven</a></li>
          <li><a href="#verite-tagthai" className="text-teal-500 hover:text-teal-400 hover:underline transition-colors text-sm md:text-base">8. TAGTHAi — ce que c&apos;est vraiment</a></li>
          <li><a href="#fiscalite" className="text-teal-500 hover:text-teal-400 hover:underline transition-colors text-sm md:text-base">9. Un mot sur la fiscalité</a></li>
          <li><a href="#strategie-recap" className="text-teal-500 hover:text-teal-400 hover:underline transition-colors text-sm md:text-base">10. La stratégie complète (Récapitulatif)</a></li>
        </ul>
      </nav>

      {/* ── SECTION 1 ── */}
      <section className="mb-12">
        <h2 id="banques-thailandaises" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          1. Pourquoi les banques thaïlandaises refusent le Visa DTV
        </h2>
        <p className="mb-4">
          Le DTV est techniquement classé comme un visa touristique de longue durée. Depuis le durcissement des règles de conformité bancaire en 2025, les banques thaïlandaises exigent un visa de type Non-Immigrant (travail, retraite, mariage, études) ou un visa LTR pour ouvrir un compte. Le DTV, malgré ses 5 ans de validité, ne confère pas de statut de résident.
        </p>
        <div className="bg-teal-500/8 border border-teal-500/20 rounded-2xl p-5 my-6">
          <p className="text-teal-300 font-semibold text-sm">
            💡 Testé personnellement sur le terrain :
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Kasikorn, Bangkok Bank et SCB refusent systématiquement. Ce n&apos;est pas une question de dossier ou de négociation avec le conseiller — c&apos;est une politique de conformité générale appliquée à la lettre.
          </p>
        </div>
        <p>
          Conséquence directe : vous devez construire une stratégie de paiement 100% autonome dès votre arrivée. Ce guide est cette stratégie.
        </p>
      </section>

      {/* ── SECTION 2 ── */}
      <section className="mb-12">
        <h2 id="revolution-wise" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          2. La révolution Wise de mai 2026 — ce qui a vraiment changé
        </h2>
        <p className="mb-4">
          Depuis le 19 mai 2026, Wise opère en Thaïlande sous une licence officielle de la Banque de Thaïlande. Ce n&apos;est pas un détail technique : c&apos;est un changement fondamental pour tous les expatriés sous Visa DTV.
        </p>
        
        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">Ce que Wise permet désormais :</h3>
        <ul className="space-y-2 mb-6">
          <li className="flex items-start gap-3 text-sm text-gray-400">
            <span className="text-teal-400 mt-0.5 flex-none">→</span>
            Scanner et payer n&apos;importe quel QR code PromptPay ou ThaiQR directement depuis l&apos;application.
          </li>
          <li className="flex items-start gap-3 text-sm text-gray-400">
            <span className="text-teal-400 mt-0.5 flex-none">→</span>
            Payer au taux interbancaire réel, sans marge de change cachée.
          </li>
          <li className="flex items-start gap-3 text-sm text-gray-400">
            <span className="text-teal-400 mt-0.5 flex-none">→</span>
            Utiliser la carte physique ou dématérialisée (Apple/Google Wallet) sur tous les terminaux.
          </li>
        </ul>

        <div className="p-5 bg-white/3 border border-gray-800 rounded-xl my-6">
          <h3 className="text-white font-bold mb-3">Les limites et le calendrier à connaître :</h3>
          <ul className="space-y-3 text-sm text-gray-400 list-disc pl-5">
            <li><strong>Maximum 10 000 THB par transaction</strong> pour les paiements PromptPay depuis le solde Wise — c'est suffisant pour le quotidien, mais bloquant pour une caution d'appartement ou un gros achat.</li>
            <li>Si vous aviez un compte Wise avant le 21 janvier 2026, les nouvelles règles s'appliquent à partir du <strong>3 août 2026</strong>.</li>
            <li>Les cartes Wise existantes liées à une adresse thaïlandaise seront <strong>remplacées gratuitement d'ici septembre 2026</strong>.</li>
          </ul>
        </div>
      </section>

      {/* ── SECTION 3 ── */}
      <section className="mb-12">
        <h2 id="piege-atm" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          3. Le piège critique — les retraits ATM Wise bloqués
        </h2>
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 my-6">
          <p className="text-red-400 font-bold text-sm">⚠️ Attention : Restriction ATM</p>
        <figure className="my-8">
          <Image
            src="/images/blog/paiement-atm-bloque.jpg"
            alt="Distributeur automatique en Thaïlande — les retraits Wise y sont bloqués depuis 2026"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Compte Wise enregistré à une adresse thaïlandaise : retraits ATM impossibles. C&apos;est la raison pour laquelle il faut arriver avec du liquide.
          </figcaption>
        </figure>
          <p className="text-gray-300 text-sm mt-2">
            Avec le passage sous licence thaïlandaise, si votre compte Wise est enregistré avec une adresse en Thaïlande, <strong>les retraits aux distributeurs automatiques thaïlandais sont bloqués</strong>. La loi réserve la distribution d&apos;espèces aux banques traditionnelles locales.
          </p>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">Ce que ça implique concrètement :</h3>
        <ul className="space-y-2 mb-6">
          <li className="flex items-start gap-3 text-sm text-gray-400">
            <span className="text-teal-400 mt-0.5 flex-none">→</span>
            <strong>Arrivez avec 1 000 à 2 000 € en espèces</strong> depuis la France.
          </li>
          <li className="flex items-start gap-3 text-sm text-gray-400">
            <span className="text-teal-400 mt-0.5 flex-none">→</span>
            <strong>Cadre légal :</strong> Vous pouvez transporter légalement jusqu'à l'équivalent de 20 000 USD (environ 18 000€) sans déclaration douanière. Au-delà, la déclaration est obligatoire. À l'inverse, l'immigration peut exiger un <Link href="/blog/20000-thb-immigration-thailande-regle-especes" className="text-teal-400 hover:underline font-medium">minimum de 20 000 THB en espèces à l'entrée</Link>.
          </li>
          <li className="flex items-start gap-3 text-sm text-gray-400">
            <span className="text-teal-400 mt-0.5 flex-none">→</span>
            Changez votre cash au comptoir Superrich (Niveau B de l&apos;aéroport) — voir notre{' '}
            <Link href="/blog/arrivee-thailande-aeroport-immigration-taxi-visa-dtv" className="text-teal-400 hover:underline font-medium">
              guide de l&apos;arrivée à l&apos;aéroport
            </Link>
            .
          </li>
          <li className="flex items-start gap-3 text-sm text-gray-400">
            <span className="text-teal-400 mt-0.5 flex-none">→</span>
            Au quotidien, payez un maximum par carte Wise et QR code pour préserver votre réserve d&apos;espèces.
          </li>
        </ul>
      </section>

      {/* ── SECTION 4 ── */}
      <section className="mb-12">
        <h2 id="taux-de-change" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          4. La vérité sur les taux de change
        </h2>
        <p className="mb-4">
          Quand vous cherchez &quot;EUR/THB&quot; sur Google, vous voyez le taux interbancaire (le vrai taux). Mais dans les bureaux de change physiques, vous obtiendrez toujours un taux inférieur. Sur 1 000 € échangés, vous pouvez perdre jusqu&apos;à 40 € juste à cause de la marge du bureau.
        </p>
        <figure className="my-8">
          <Image
            src="/images/blog/paiement-bureau-change.jpg"
            alt="Comptoir de change Superrich au niveau B de l&apos;aéroport de Suvarnabhumi"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Évitez les kiosques du hall d&apos;arrivée. Sur 1 000 € changés, l&apos;écart de taux atteint facilement 40 €.
          </figcaption>
        </figure>
        <p className="mb-4">
          <strong className="text-white">Comment minimiser cette perte :</strong> Évitez absolument les kiosques du hall d&apos;arrivée à Suvarnabhumi. Descendez au niveau B (près du train) au comptoir Superrich. Pour vos dépenses courantes, privilégiez Wise QR PromptPay : il utilise le vrai taux interbancaire avec zéro marge.
        </p>
      </section>

      {/* ── SECTION 5 ── */}
      <section className="mb-12">
        <h2 id="3-niveaux-paiement" className="text-2xl font-bold text-white mb-6 scroll-mt-24">
          5. Les 3 niveaux de paiement en Thaïlande
        </h2>
        
        <div className="space-y-6">
          <div className="p-5 bg-white/3 border border-gray-800 rounded-xl">
            <h3 className="text-emerald-400 font-bold mb-3 flex items-center gap-2">
              <span className="text-xl">✅</span> Niveau 1 : Ce que Wise couvre (90% du temps)
            </h3>
            <ul className="space-y-2 text-sm text-gray-400 list-disc pl-5">
              <li><strong>Restaurants & Marchés :</strong> scan QR PromptPay depuis l&apos;app Wise.</li>
              <li><strong>Grab :</strong> paiement carte Wise dans l&apos;application.</li>
              <li><strong>Supermarchés & Pharmacies :</strong> carte physique ou dématérialisée.</li>
              <li><strong>7-Eleven :</strong> carte acceptée uniquement <strong>au-dessus de 200 THB</strong>.</li>
            </ul>
          </div>

          <div className="p-5 bg-white/3 border border-gray-800 rounded-xl">
            <h3 className="text-teal-500 font-bold mb-3 flex items-center gap-2">
              <span className="text-xl">⚠️</span> Niveau 2 : Ce que Wise ne couvre pas (Cash requis)
            </h3>
            <ul className="space-y-2 text-sm text-gray-400 list-disc pl-5">
              <li><strong>Facture d&apos;électricité :</strong> à régler au 7-Eleven avec le code-barres (en espèces).</li>
              <li><strong>Facture d&apos;eau (Condo) :</strong> souvent émise par le bureau de gestion de l&apos;immeuble (Juristic Office). Le 7-Eleven ne la prend pas. Règlement en espèces au bureau.</li>
            </ul>
          </div>

          <div className="p-5 bg-white/3 border border-gray-800 rounded-xl">
            <h3 className="text-red-400 font-bold mb-3 flex items-center gap-2">
              <span className="text-xl">❌</span> Niveau 3 : Réservé aux banques thaïlandaises
            </h3>
            <ul className="space-y-2 text-sm text-gray-400 list-disc pl-5">
              <li>Prélèvements automatiques récurrents.</li>
              <li>Virements exigeant un compte bancaire local par le bénéficiaire.</li>
              <li>Services gouvernementaux nécessitant une identité bancaire thaïlandaise.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── SECTION 6 ── */}
      <section className="mb-12">
        <h2 id="frais-revolut" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          6. Pourquoi votre carte Revolut vous coûte 3 à 5% de plus
        </h2>
        <p className="mb-4">
          C&apos;est une question fréquente. Des voyageurs constatent que leur carte étrangère est surtaxée de 3 à 5% par les commerçants. Ce n&apos;est pas un bug : c&apos;est le commerçant qui répercute les frais d&apos;interchange des réseaux Visa ou Mastercard sur le client.
        </p>
        <figure className="my-8">
          <Image
            src="/images/blog/paiement-qr-promptpay.jpg"
            alt="Paiement par QR code PromptPay dans une échoppe de rue en Thaïlande avec une carte Wise"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            90 % du quotidien passe par le QR code. C&apos;est le vrai substitut au compte bancaire local.
          </figcaption>
        </figure>
        <p className="mb-4">
          <strong className="text-white">Pourquoi Wise QR évite ce problème :</strong> En scannant un QR PromptPay avec Wise, le paiement transite par le commutateur national thaïlandais. Le commerçant reçoit ses bahts instantanément, sans frais de réseau international. Il n&apos;a donc aucune raison de vous surtaxer.
        </p>
      </section>

      {/* ── SECTION 7 ── */}
      <section className="mb-12">
        <h2 id="astuce-alipay" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          7. L&apos;astuce Alipay pour le 7-Eleven et les grandes surfaces
        </h2>
        <p className="mb-4">
          Le 7-Eleven et certaines grandes surfaces (comme Makro) compliquent parfois le paiement par QR code classique et imposent leurs propres réseaux fermés. L&apos;astuce terrain infaillible pour contourner cela :
        </p>
        <ol className="list-decimal pl-5 text-gray-400 space-y-2 text-sm mb-4">
          <li>Créez un compte <strong>Alipay</strong>.</li>
          <li>Liez votre carte bancaire <strong>Wise</strong> directement à ce compte Alipay (sans avoir à le recharger).</li>
          <li>À la caisse du 7-Eleven, ouvrez Alipay et <strong>laissez le caissier scanner votre écran</strong> avec sa douchette.</li>
        </ol>
        <p className="text-sm text-gray-400">
          Le paiement est instantanément débité de votre carte Wise, sans frais cachés. Et pour le vendeur de rue qui n&apos;a qu&apos;un bout de carton ? Si le scan Wise ne passe pas, c&apos;est là que votre réserve de cash entre en jeu.
        </p>
      </section>

      {/* ── SECTION 8 ── */}
      <section className="mb-12">
        <h2 id="verite-tagthai" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          8. TAGTHAi — ce que c&apos;est vraiment
        </h2>
        <p className="mb-4">
          Beaucoup pensent que TAGTHAi est un wallet (portefeuille électronique) pour le quotidien. C&apos;est une erreur fréquente.
        </p>
        <ul className="space-y-2 mb-6">
          <li className="flex items-start gap-3 text-sm text-gray-400">
            <span className="text-teal-400 mt-0.5 flex-none">→</span>
            <strong className="text-white">Ce que c&apos;est :</strong> Une application pour les pass touristiques (musées) et le remboursement de TVA (VAT Refund).
          </li>
          <li className="flex items-start gap-3 text-sm text-gray-400">
            <span className="text-teal-400 mt-0.5 flex-none">→</span>
            <strong className="text-white">Ce que ça n&apos;est pas :</strong> Un substitut de compte bancaire. Son scanner ne lit pas les QR codes personnels des petits commerçants.
          </li>
        </ul>
      </section>

      {/* ── SECTION 9 ── */}
      <section className="mb-12">
        <h2 id="fiscalite" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          9. Un mot sur la fiscalité — la contrepartie de la traçabilité
        </h2>
        <p className="mb-4">
          Le passage de Wise sous licence thaïlandaise a une conséquence de second ordre importante : chaque conversion vers le baht et chaque paiement PromptPay transite désormais par l'infrastructure financière régulée thaïlandaise.
        </p>
        <p className="mb-4">
          Pour rappel : après 180 jours passés en Thaïlande sur une année civile, vous devenez résident fiscal thaïlandais. Et depuis janvier 2024, les revenus étrangers rapatriés en Thaïlande par un résident fiscal sont imposables. Avec Wise local, vos flux sont documentés et traçables — ce qui est une bonne chose pour votre conformité, à condition d'anticiper votre situation fiscale.
        </p>
        <p>
          Retenez simplement : la simplicité de paiement s'accompagne d'une transparence totale vis-à-vis de l'administration thaïlandaise. Le seuil des 180 jours est d'ailleurs le même que celui qui conditionne{' '}
          <LienArticle slug="tm47-rapport-90-jours-thailande" className="text-teal-400 hover:underline font-medium">
            vos obligations déclaratives sur place
          </LienArticle>
          . Nous détaillons l&apos;ensemble du sujet dans notre{' '}
          <LienArticle slug="fiscalite-thailande-expatries-residence-fiscale" className="text-teal-400 hover:underline font-medium">
            guide de la fiscalité en Thaïlande après 180 jours
          </LienArticle>
          .
        </p>
      </section>

      {/* ── SECTION 10 ── */}
      <section className="mb-12">
        <h2 id="strategie-recap" className="text-2xl font-bold text-white mb-6 scroll-mt-24">
          10. La stratégie complète (Récapitulatif)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-[#111111] border border-gray-800 rounded-xl shadow-lg">
            <h3 className="text-white font-bold mb-4">🛂 Avant de partir</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Commandez votre carte physique Wise.</li>
              <li>• Prévoyez 1 000 à 2 000 € en espèces.</li>
              <li>• Installez Wise, Grab et Alipay.</li>
            </ul>
          </div>
          
          <div className="p-6 bg-[#111111] border border-gray-800 rounded-xl shadow-lg">
            <h3 className="text-white font-bold mb-4">🛬 À l&apos;aéroport</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Ignorez les kiosques d&apos;arrivée.</li>
              <li>• Descendez au niveau B.</li>
              <li>• Changez au comptoir Superrich.</li>
            </ul>
          </div>
          
          <div className="p-6 bg-[#111111] border border-gray-800 rounded-xl shadow-lg md:col-span-2">
            <h3 className="text-white font-bold mb-4">🛍️ Au quotidien</h3>
            <ul className="space-y-3 text-sm text-gray-400 grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <li><strong>Paiements courants :</strong> Wise QR PromptPay ou carte dématérialisée</li>
              <li><strong>Grab :</strong> carte Wise dans l'app</li>
              <li><strong>7-Eleven :</strong> carte Wise si achat ≥ 200 THB, cash en dessous</li>
              <li><strong>Facture électricité :</strong> cash au 7-Eleven avec code-barres</li>
              <li><strong>Facture eau en condo :</strong> espèces au bureau de gestion, ou TrueMoney/mPAY</li>
              <li><strong>QR non reconnus :</strong> Alipay lié à Wise</li>
              <li><strong>Gros paiements (&gt;10 000 THB) :</strong> anticiper, la limite PromptPay Wise s'applique par transaction</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── ENCART AUTEUR (E-E-A-T) ── */}
      <div className="my-14 bg-[#111111] border border-gray-800 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-6 shadow-lg">
        <div className="w-24 h-24 rounded-full bg-gray-800 flex-shrink-0 overflow-hidden border-2 border-teal-500/50">
          <div className="w-full h-full bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center text-3xl">🇹🇭</div>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-1">Matthieu Moretti</h3>
          <p className="text-teal-500 text-xs font-semibold mb-3 uppercase tracking-wider">Expertise Visa DTV & Terrain</p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Basé à Phuket, je teste et documente personnellement toutes les procédures pour les expatriés en Thaïlande. L&apos;objectif de ce guide : vous éviter de vous retrouver bloqué à la caisse d&apos;un supermarché grâce à des retours d&apos;expérience 100% terrain.
          </p>
        </div>
      </div>

      {/* ── FAQ ── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white mb-6">
          FAQ — Vos questions sur les paiements
        </h2>

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
          Besoin d&apos;un audit pour votre dossier Visa DTV ?
        </h3>
        <p className="text-gray-400 mb-8 relative z-10 text-sm md:text-base">
          Ne laissez pas un détail gâcher votre projet d&apos;expatriation en Thaïlande. Vérifions ensemble votre dossier et prévoyons votre arrivée sereinement.
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

      <BlogNavigation variant="article-bottom" />
    </article>
  );
}