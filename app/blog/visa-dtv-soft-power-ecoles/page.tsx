import React from 'react';
import BoutonEligibilite from '../../components/BoutonEligibilite';
import LienArticle from '../../components/LienArticle';
import BlogNavigation from '../../components/BlogNavigation';
import PartageArticle from '../../components/PartageArticle';
import { createBreadcrumbSchema, getBlogPost } from '../posts';

const breadcrumbSchema = createBreadcrumbSchema(getBlogPost('visa-dtv-soft-power-ecoles'));
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PhotoAuteur from '../../components/PhotoAuteur';
import { prix, tarif } from '../../lib/tarifs';

// ─── MÉTADONNÉES SEO & CANONICAL ─────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Visa DTV Soft Power : écoles, tarifs réels et pièges 2026",
  description: "Comment obtenir le Visa DTV par la voie Soft Power : cuisine ou Muay Thaï, prix publics constatés, durée des cursus, et les deux documents à exiger pour repérer une fausse école.",
  alternates: {
    canonical: 'https://dtv-thailande.fr/blog/visa-dtv-soft-power-ecoles', // <-- LA VOICI !
  },
  openGraph: {
    title: "Visa DTV Soft Power : écoles, tarifs réels et pièges 2026",
    description: "Cuisine ou Muay Thaï, prix publics constatés, gestion des présences et les deux documents à exiger avant de payer.",
    url: "https://dtv-thailande.fr/blog/visa-dtv-soft-power-ecoles",
    siteName: "DTV Thaïlande",
    locale: "fr_FR",
    type: "article",
    // TODO: Générer un opengraph-image.tsx ou lier une image spécifique à cet article quand les vraies miniatures seront disponibles.
    images: [{ url: '/images/blog/visa-dtv-soft-power-ecoles.jpg' }],
  },
};

// ─── SCHEMA ARTICLE JSON-LD ───────────────────────────────────────────────────
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://dtv-thailande.fr/blog/visa-dtv-soft-power-ecoles"
  },
  "headline": "Visa DTV Soft Power : écoles, tarifs réels et pièges 2026",
  "description": "Comment obtenir le Visa DTV par la voie Soft Power : cuisine ou Muay Thaï, prix publics constatés, durée des cursus, et les deux documents à exiger pour repérer une fausse école.",
  "image": "https://dtv-thailande.fr/images/blog/visa-dtv-soft-power-ecoles.jpg", 
  "author": {
    "@type": "Person",
    "name": "Matthieu Moretti",
    "url": "https://dtv-thailande.fr/contact",
    "image": "https://dtv-thailande.fr/images/matthieu-moretti.jpg"
  },  
  "publisher": {
    "@type": "Organization",
    "name": "DTV Thaïlande",
    "logo": {
      "@type": "ImageObject",
      "url": "https://dtv-thailande.fr/logo.png"
    }
  },
  "datePublished": "2026-06-10",
  "dateModified": "2026-06-10"
};

// ─── SCHEMA FAQ JSON-LD ───────────────────────────────────────────────────────
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Combien d'heures de cours sont obligatoires pour le DTV ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Il n'y a pas de volume horaire légal strict, mais le format aujourd'hui attendu par les ambassades est un cursus de 9 mois, soit une trentaine de séances à répartir librement sur la période. Comptez environ 37 500 THB pour un programme de cuisine certifié incluant les documents consulaires.",
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on changer d'école ou d'activité en cours de Visa ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui. Votre visa DTV est valide 5 ans, mais si vous souhaitez le maintenir actif via le Soft Power lors de vos réentrées sur le territoire, vous devrez justifier de la continuité de votre apprentissage (nouveaux modules, nouvelle école certifiée).",
      },
    },
    {
      '@type': 'Question',
      name: "L'école de cuisine est-elle réservée aux professionnels ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Absolument pas. Les cursus certifiés pour le Visa DTV s'adressent aussi bien aux débutants absolus qu'aux passionnés souhaitant découvrir la gastronomie thaïlandaise de manière récréative.",
      },
    },
    {
      '@type': 'Question',
      name: "Mon conjoint peut-il être rattaché à mon DTV Soft Power ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui. Si vous êtes légalement mariés, votre conjoint et vos enfants de moins de 20 ans peuvent obtenir un visa DTV Accompagnant, sans avoir besoin de s'inscrire eux-mêmes à une école.",
      },
    }
  ],
};

// ─── TABLEAU COMPARATIF ───────────────────────────────────────
const comparatif = [
  {
    critere: 'Flexibilité des horaires',
    cuisine: '⭐⭐⭐⭐⭐',
    muaythai: '⭐⭐',
    note: 'Les écoles de cuisine permettent de grouper les cours.',
  },
  {
    critere: 'Exigence physique',
    cuisine: 'Faible (Accessible à tous)',
    muaythai: 'Très Élevée',
    note: 'Le Muay Thaï impose un rythme athlétique difficile sur le long terme.',
  },
  {
    critere: 'Preuve de présence',
    cuisine: 'Simple (Feuille d\'émargement)',
    muaythai: 'Stricte (Contrôles fréquents)',
    note: 'L\'immigration surveille de près les camps de sport.',
  },
  {
    critere: 'Adaptation Digital Nomad',
    cuisine: 'Idéale',
    muaythai: 'Contraignante',
    note: 'Difficile de concilier travail sur écran et entraînement intensif.',
  },
];

export default function BlogArticleSoftPower() {
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
        <span className="inline-block bg-orange-500/10 border border-orange-500/25 text-orange-400 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
          Stratégie Soft Power · 2026
        </span>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
          Visa DTV Soft Power : Le choix stratégique entre{' '}
          <span className="text-orange-400">Cuisine et Muay Thaï</span>
        </h1>

        <p className="text-base text-gray-500 mt-4">
          Lecture : 9 min · Par{' '}
          <strong className="text-gray-400">Matthieu Moretti</strong>
        </p>
        <PartageArticle slug="visa-dtv-soft-power-ecoles" variant="entete" />
      </header>

     {/* ── INTRODUCTION ── */}
      <div className="text-lg text-gray-400 mb-12 space-y-5">
        <p>
          Pour obtenir le très convoité Visa DTV (5 ans d'expatriation), tout le monde n'a pas le profil
          d'un{' '}
          <Link href="/blog/visa-dtv-freelance-auto-entrepreneur" className="text-orange-500 hover:underline font-medium">
            freelance capable de produire des liasses fiscales
          </Link>
          , des contrats clients et des bilans de société irréprochables.
        </p>
        <p>
          C'est là qu'intervient la voie royale : <strong className="text-white">la catégorie Soft Power</strong>.
          En vous inscrivant à une formation culturelle en Thaïlande, vous contournez l'intégralité des
          exigences professionnelles. Votre seule préoccupation devient alors de{' '}
          <Link href="/blog/fonds-bancaires-visa-dtv" className="text-orange-500 hover:underline font-medium">
            prouver vos 500 000 THB d'épargne
          </Link>
          .
        </p>
        <p>
          Si vous hésitez encore entre les différents statuts,{' '}
          <Link href="/blog/comparatif-visas-thailande" className="text-orange-500 hover:underline font-medium">
            notre comparatif des visas longue durée
          </Link>{' '}
          situe le DTV face au LTR, au Non-ED et au METV. Et pour voir ce que donne cette voie sur un
          cas réel, lisez{' '}
          <LienArticle slug="cas-client-visa-dtv-soft-power-vientiane" className="text-orange-500 hover:underline font-medium">
            le parcours d&apos;un client sans revenus réguliers
          </LienArticle>{' '}
          qui a obtenu son visa en trois jours à Vientiane.
        </p>
        <p className="text-white font-medium border-l-4 border-orange-500 pl-5 py-1">
          Mais attention, le marché a rapidement été inondé d'écoles "fantômes" et d'arnaques. Le grand
          ménage mené par l'immigration en 2025 a d'abord visé les fausses écoles de langues sous statut
          étudiant (visa ED) — pas le DTV lui-même — mais il a durci les contrôles sur toute la catégorie
          Soft Power. Voici la vérité du terrain pour choisir la bonne activité, sécuriser votre dossier,
          et éviter l'interdiction de territoire.
        </p>
      </div>

      {/* ── SOMMAIRE CLIQUABLE ── */}
      <nav className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 mb-12 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Sommaire de l'article</h2>
        <ul className="space-y-3">
          <li><a href="#cuisine-vs-muay-thai" className="text-orange-500 hover:text-orange-400 hover:underline transition-colors text-sm md:text-base">1. Muay Thaï ou École de Cuisine : la vérité du terrain</a></li>
          <li><a href="#gestion-presences" className="text-orange-500 hover:text-orange-400 hover:underline transition-colors text-sm md:text-base">2. Assiduité et contrôles : comment prouver sa présence ?</a></li>
          <li><a href="#arnaques-ecoles" className="text-orange-500 hover:text-orange-400 hover:underline transition-colors text-sm md:text-base">3. Le péril des "écoles fantômes" et l'annulation du visa</a></li>
          <li><a href="#passage-douane" className="text-orange-500 hover:text-orange-400 hover:underline transition-colors text-sm md:text-base">4. Le passage à la douane : maintenir la validité du visa</a></li>
          <li><a href="#visa-run-asie" className="text-orange-500 hover:text-orange-400 hover:underline transition-colors text-sm md:text-base">5. Dépôt du dossier : pourquoi l'Asie (Visa Run) écrase Paris</a></li>
          <li><a href="#transparence-prix" className="text-orange-500 hover:text-orange-400 hover:underline transition-colors text-sm md:text-base">6. Transparence : le décryptage de notre tarif Soft Power</a></li>
        </ul>
      </nav>

      {/* ── SECTION 1 ── */}
      <section className="mb-12">
        <h2 id="cuisine-vs-muay-thai" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          1. Muay Thaï ou École de Cuisine : la vérité du terrain
        </h2>
        <p className="mb-4">
          Sur le papier, s'inscrire dans un camp de Muay Thaï semble être l'aventure exotique parfaite.
          Cependant, la réalité d'un Digital Nomad n'est pas celle d'un athlète de haut niveau.
        </p>
        <p className="mb-4">
          Les camps de boxe imposent un rythme physique épuisant, souvent incompatible avec des journées de
          travail sur ordinateur. S'engager sur plusieurs mois demande une résilience que la majorité des
          expatriés finissent par abandonner au bout de quelques semaines.
        </p>

        <figure className="my-8">
          <Image
            src="/images/blog/visa-dtv-soft-power-cours-cuisine.jpg"
            alt="Poste de travail dans une école de cuisine thaïlandaise certifiée — pâte de curry, wok et ingrédients frais"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Les séances se groupent ou s&apos;espacent comme vous voulez sur la
            durée du cursus. C&apos;est ce qui rend la cuisine bien plus
            compatible avec le télétravail que le Muay Thaï.
          </figcaption>
        </figure>
        <p className="mb-6">
          <strong className="text-white">C'est pourquoi nous recommandons systématiquement les écoles de cuisine.</strong>{' '}
          La gestion du temps y est infiniment plus souple : vous groupez vos séances, vous les
          espacez, vous les calez entre deux missions. Les cursus vont aujourd'hui de six à douze
          mois selon l'école et le volume de cours retenu.
        </p>

        {/* TABLEAU COMPARATIF */}
        <div className="overflow-x-auto rounded-2xl border border-gray-800 mb-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#111111] border-b border-gray-800">
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Critère</th>
                <th className="text-left px-4 py-3 text-orange-400 font-semibold">École de Cuisine</th>
                <th className="text-left px-4 py-3 text-amber-400 font-semibold">Camp Muay Thaï</th>
              </tr>
            </thead>
            <tbody>
              {comparatif.map((c, i) => (
                <tr
                  key={c.critere}
                  className={`border-b border-gray-800/60 ${i % 2 === 0 ? 'bg-[#0d0d0d]' : 'bg-[#0a0a0a]'}`}
                >
                  <td className="px-4 py-4 font-semibold text-white">{c.critere}<br/><span className="text-xs text-gray-500 font-normal">{c.note}</span></td>
                  <td className="px-4 py-4">{c.cuisine}</td>
                  <td className="px-4 py-4">{c.muaythai}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-bold text-white mt-10 mb-3">Ce que coûte réellement chaque voie</h3>
        <p className="mb-4">
          Les tarifs circulent peu, et beaucoup de candidats découvrent le budget réel une fois engagés.
          Voici les grilles publiées par les écoles elles-mêmes, relevées en juillet 2026.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-gray-800 mb-4">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="bg-[#111111] border-b border-gray-800">
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Formule</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Volume</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Tarif public</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d] opacity-60">
                <td className="px-4 py-4 font-semibold text-gray-400">Cuisine — 6 mois <span className="text-xs font-normal text-red-400">· retiré de l&apos;offre</span></td>
                <td className="px-4 py-4">10 cours</td>
                <td className="px-4 py-4">20 000 THB <span className="text-xs font-normal text-gray-500">(tarif de février 2026)</span></td>
              </tr>
              <tr className="border-b border-gray-800/60">
                <td className="px-4 py-4 font-semibold text-orange-400">Cuisine — 9 mois</td>
                <td className="px-4 py-4">30 demi-journées</td>
                <td className="px-4 py-4">37 500 THB</td>
              </tr>
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]">
                <td className="px-4 py-4 font-semibold text-orange-400">Cuisine — 12 mois</td>
                <td className="px-4 py-4">40 demi-journées</td>
                <td className="px-4 py-4">52 000 THB</td>
              </tr>
              <tr className="border-b border-gray-800/60">
                <td className="px-4 py-4 font-semibold text-amber-400">Muay Thaï — 6 mois</td>
                <td className="px-4 py-4">240 heures</td>
                <td className="px-4 py-4">28 000 THB</td>
              </tr>
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]">
                <td className="px-4 py-4 font-semibold text-amber-400">Muay Thaï — 9 mois</td>
                <td className="px-4 py-4">360 heures</td>
                <td className="px-4 py-4">38 000 THB</td>
              </tr>
              <tr>
                <td className="px-4 py-4 font-semibold text-amber-400">Muay Thaï — 12 mois</td>
                <td className="px-4 py-4">480 heures</td>
                <td className="px-4 py-4">50 000 THB</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Tarifs relevés sur les grilles publiques d'écoles thaïlandaises accréditées en juillet 2026.
          Les 20 000 THB de la première ligne correspondent au tarif que j'ai personnellement réglé en
          février 2026, à raison de 2 000 THB par cours — les formats courts se raréfient depuis, j'y
          reviens plus bas. Côté Muay Thaï, certains camps affichent des packages « DTV » à partir de
          26 900 THB, d'autres montent à 38 990 THB lorsqu'ils incluent l'assistance au dossier.
        </p>

        <div className="bg-orange-500/5 border border-orange-500/25 rounded-2xl p-6">
          <p className="text-white font-semibold mb-2">💡 L'écart de budget est le vrai arbitre</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            À volume d'engagement comparable, la cuisine revient à environ 20 000 THB là où le Muay
            Thaï démarre à 28 000 THB et grimpe à 50 000 THB sur douze mois. Pour un digital nomad
            qui cherche un statut légal et non une carrière sportive, la différence de 8 000 à
            30 000 THB s'ajoute à une contrainte physique quotidienne que la plupart abandonnent en
            quelques semaines. C'est la raison, très prosaïque, pour laquelle nous orientons
            systématiquement vers la cuisine.
          </p>
        </div>
      </section>

      {/* ── SECTION 2 ── */}
      <section className="mb-12">
        <h2 id="gestion-presences" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          2. Assiduité et contrôles : comment prouver sa présence ?
        </h2>
        <p className="mb-4">
          Il ne suffit pas d'acheter une lettre d'acceptation pour que l'affaire soit classée.
          L'administration thaïlandaise a pris conscience des abus et exige des preuves d'assiduité.
        </p>
        <p className="mb-4">
          Certaines de nos écoles de cuisine partenaires permettent de réaliser plusieurs cours dans une
          même journée, en utilisant tous les créneaux proposés (matin, après-midi, soir), tandis que
          d'autres exigent un rythme plus espacé.
        </p>

        <figure className="my-8">
          <Image
            src="/images/blog/visa-dtv-soft-power-registre-presence.jpg"
            alt="Signature du registre de présence dans une école de cuisine thaïlandaise — la preuve d'assiduité exigée pour le visa DTV"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            À chaque séance, vous inscrivez la date et vous signez. C&apos;est ce
            registre, et non la lettre d&apos;acceptation, qui fait foi si
            l&apos;immigration vous interroge.
          </figcaption>
        </figure>
        <div className="bg-orange-500/8 border border-orange-500/20 rounded-2xl p-5 mb-4">
          <p className="text-orange-300 font-semibold text-sm">
            🛡️ La feuille de présence (Sign-in sheet)
          </p>
          <p className="text-gray-400 text-sm mt-1">
            À chaque session, l'école vous fera signer un registre officiel. Ce document est la pièce
            maîtresse qui fait foi en cas de contrôle de l'immigration. Ne prenez jamais le risque
            de payer sans assister physiquement au cours.
          </p>
        </div>

        <div className="bg-[#111111] border-l-4 border-orange-500 rounded-r-2xl p-6 md:p-7">
          <p className="text-white font-bold mb-3">Ce que j'ai vécu en suivant le cursus moi-même</p>
          <div className="text-gray-300 text-sm leading-relaxed space-y-3">
            <p>
              Je n'écris pas cette section depuis un bureau. J'ai suivi le cursus de cuisine
              moi-même, pour mon propre Visa DTV, dans une école de Phuket où je me suis rendu
              physiquement à chaque séance.
            </p>
            <p>
              Le déroulé est simple et rassurant. À la fin de chaque cours, on vous présente le
              registre : vous inscrivez la date, votre nom, et vous signez. Ce n'est pas une
              formalité décorative — c'est la trace administrative qui prouvera votre assiduité si
              l'immigration vous interroge. Les professeurs connaissent les recettes sur le bout des
              doigts et savent encadrer des débutants complets ; il n'y a aucun prérequis, aucun
              niveau à avoir.
            </p>
            <p>
              À l'issue du cursus, l'école délivre un <strong className="text-white">diplôme
              officiel</strong>. Prenez-en une photo dès la remise et gardez-la sur votre téléphone :
              c'est ce que vous présenterez au guichet en cas de question, sans avoir à transporter
              le document original à chaque passage de frontière.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 ── */}
      <section className="mb-12">
        <h2 id="arnaques-ecoles" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          3. Le péril des &quot;écoles fantômes&quot; et l'annulation du visa
        </h2>
        <p className="mb-4">
          Une simple recherche Google suffit pour trouver des agents proposant des lettres d'inscription
          à des prix dérisoires, avec la promesse du &quot;Visa garanti sans jamais venir aux cours&quot;.
          C'est le <strong className="text-white">Red Flag absolu</strong>.
        </p>
        <p className="mb-4">
          Comme l'a rappelé le <a href="https://www.thaigov.go.th/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">gouvernement thaïlandais</a>,
          les ambassades croisent désormais les données avec une base officielle. Une lettre d'acceptation
          n'a aucune valeur si l'établissement n'est pas accrédité par le <strong>Ministère de l'Éducation</strong>{' '}
          et le <strong>Department of Business Development (DBD)</strong>.
        </p>
        <p className="mb-6">
          Si vous soumettez une lettre provenant d'une organisation non reconnue, le refus est immédiat.
          Pire, si le pot aux roses est découvert après coup, votre visa est révoqué et vous vous exposez à
          une interdiction de territoire de plusieurs années.
        </p>

        <h3 className="text-xl font-bold text-white mt-8 mb-3">Les deux documents à réclamer avant de payer</h3>
        <p className="mb-4">
          La vérification ne se fait pas sur l'apparence du site, mais sur deux pièces que toute
          école légitime vous transmettra sans discuter :
        </p>
        <ul className="space-y-3 mb-5 pl-4 border-l-2 border-gray-800 text-gray-400 text-sm">
          <li>
            <strong className="text-white">La licence DBD</strong> — l'enregistrement au Department
            of Business Development, qui prouve l'existence légale de la structure en Thaïlande.
          </li>
          <li>
            <strong className="text-white">L'accréditation du Ministère de l'Éducation</strong> —
            celle qui donne valeur consulaire à la lettre d'acceptation.
          </li>
        </ul>
        <p className="mb-6">
          Une précision utile, car la confusion circule : l'extension{' '}
          <code className="text-orange-400">.ac.th</code> est bien réservée aux établissements
          d'enseignement accrédités en Thaïlande, et sa présence est un signal positif. Mais son
          absence ne prouve strictement rien. Beaucoup d'écoles parfaitement en règle — y compris
          celles de notre réseau — opèrent sous un domaine en{' '}
          <code className="text-amber-400">.com</code>, tout simplement parce qu'elles s'adressent à
          une clientèle internationale. Ne rejetez jamais une école sur ce seul critère, et ne lui
          faites jamais confiance sur ce seul critère non plus.
        </p>

        <div className="bg-amber-500/5 border border-amber-500/25 rounded-2xl p-6 mb-6">
          <p className="text-white font-semibold mb-2">Le seul critère vraiment binaire</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Vous n'avez pas besoin d'être expert pour repérer une usine à visas. Posez une seule
            question : <strong className="text-white">« Dois-je assister aux cours ? »</strong> Si
            la réponse est non, ou si on vous laisse entendre que la présence est facultative, vous
            êtes en face d'un intermédiaire qui vend du papier. Une école légitime vous répondra que
            oui, et vous parlera du registre de présence.
          </p>
        </div>

        <h3 className="text-xl font-bold text-white mt-8 mb-3">« Un cursus à 20 000 THB fait refuser le dossier » : ce que disent nos dépôts</h3>
        <p className="mb-4">
          Certaines agences affirment qu'un programme à moins de 30 000 THB éveille les soupçons du
          consulat, au motif qu'un tel montant ne justifierait pas un visa de cinq ans. L'argument
          mérite d'être entendu — mais notez que ceux qui le portent commercialisent en général des
          packages à 38 000 THB et plus.
        </p>
        <p className="mb-4">
          Notre expérience de terrain raconte autre chose. <strong className="text-white">En février,
          en mai et en juin 2026</strong>, des dossiers déposés avec des écoles de cuisine certifiées
          facturant environ 20 000 THB pour 8 à 10 cours ont été acceptés sans difficulté.
        </p>
        <p className="mb-4">
          Ce qui déclenche un refus n'est pas le prix en soi, c'est l'accréditation manquante ou la
          lettre d'acceptation fabriquée. Une école certifiée passe ; une école fantôme fait révoquer
          le visa, quel que soit le montant facturé.
        </p>
        <div className="bg-red-500/5 border border-red-500/30 rounded-2xl p-6">
          <p className="text-white font-semibold mb-3">
            ⚠️ Mise à jour : le format 6 mois n&apos;existe plus
          </p>
          <div className="text-sm text-gray-300 leading-relaxed space-y-3">
            <p>
              Cette question est désormais tranchée. Interrogée directement, l&apos;école où j&apos;ai
              suivi mon propre cursus nous a confirmé par écrit avoir{' '}
              <strong className="text-white">retiré le programme de 6 mois de son offre</strong> :
              <em className="text-white"> « nous ne proposons actuellement que le programme de
              9 mois »</em>. Les inscriptions déjà réglées sous l&apos;ancien format restent honorées,
              mais il n&apos;est plus commercialisé.
            </p>
            <p>
              Le motif est le même que celui qu&apos;elle affichait déjà publiquement : certaines
              ambassades privilégient ou réclament désormais des programmes plus longs. Ce n&apos;est
              pas un argument commercial — une école n&apos;a aucun intérêt à compliquer la vie de ses
              élèves.
            </p>
            <p>
              <strong className="text-white">Concrètement : si vous déposez aujourd&apos;hui, le
              format de référence est le cursus de 9 mois.</strong> Les dépôts à 20 000 THB évoqués
              plus haut restent des faits — ils datent du premier semestre 2026, quand ce format
              existait encore. Ils ne constituent plus une option disponible.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 4 ── */}
      <section className="mb-12">
        <h2 id="passage-douane" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          4. Le passage à la douane : maintenir la validité du visa
        </h2>
        <p className="mb-4">
          Beaucoup pensent qu'une fois le tampon dans le passeport, les 5 années sont définitivement
          acquises, peu importe ce qu'ils font ensuite. C'est une erreur stratégique majeure.
        </p>
        <p className="mb-4">
          Le visa DTV reste intrinsèquement lié à son motif d'obtention. <strong className="text-white">Le visa
          devient invalide si les cours ne sont pas réalisés dans le temps imparti.</strong>
        </p>
        <p>
          Lorsque vous terminerez votre cursus de cuisine (après vos 9 mois), l'école vous délivrera un{' '}
          <strong>diplôme officiel</strong>. Lors de votre première sortie et réentrée en Thaïlande, l'officier
          d'immigration{' '}
          <Link href="/blog/arrivee-thailande-aeroport-immigration-taxi-visa-dtv" className="text-orange-500 hover:underline font-medium">
            à la douane est en droit de vous demander des comptes
          </Link>
          . Présenter votre diplôme et
          vos registres de présence validés est votre meilleur bouclier pour justifier de la légitimité de
          votre statut Soft Power.
        </p>
      </section>

      {/* ── SECTION 5 ── */}
      <section className="mb-12">
        <h2 id="visa-run-asie" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          5. Dépôt du dossier : pourquoi l'Asie écrase Paris
        </h2>
        <p className="mb-4">
          Si vous passez par la voie Soft Power, déposer votre dossier à l'Ambassade de Paris est une perte
          de temps et d'argent. Paris est pointilleuse, exige de multiples traductions assermentées et
          applique des délais parfois très longs.
        </p>
        <p className="mb-4">
          La réalité du terrain nous pousse à organiser des <strong>Visa Runs</strong> dans les pays
          limitrophes (Vientiane au Laos, Kuala Lumpur en Malaisie). Pourquoi ?
        </p>

        <figure className="my-8">
          <Image
            src="/images/blog/visa-dtv-soft-power-ambassade-vientiane.jpg"
            alt="File d'attente devant une ambassade de Thaïlande en Asie du Sud-Est lors d'un visa run pour le DTV"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            À Vientiane, les documents de l&apos;école sont déjà en thaï : aucune
            traduction assermentée, et une décision en trois à quatre jours
            ouvrables.
          </figcaption>
        </figure>
        <ul className="list-disc pl-5 space-y-2 text-gray-400">
          <li>Les documents administratifs de l'école (certificats DBD, licences) sont <strong>déjà en thaï</strong>.
          Les ambassades de la région les lisent et les valident instantanément.</li>
          <li>Aucune traduction assermentée coûteuse n'est nécessaire.</li>
          <li>Le délai de traitement sur place est souvent réduit à <strong>3 jours ouvrables</strong>.</li>
        </ul>
      </section>

      {/* ── SECTION 6 ── */}
      <section className="mb-12">
        <h2 id="transparence-prix" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          6. Transparence : le décryptage de notre tarif Soft Power
        </h2>
        <p className="mb-4">
          La transparence est au cœur de notre méthode. Pour les profils freelances qui ont déjà tous leurs
          documents, notre prestation d&apos;accompagnement est à{' '}
          <strong>{prix(tarif('essentielle', false))}</strong>.
        </p>
        <p className="mb-4">
          Pour la voie Soft Power, nous proposons un{' '}
          <strong>package global à {prix(tarif('essentielle', true))}</strong> sur la base d&apos;un
          cursus de 9 mois — le format aujourd&apos;hui recommandé. Voici exactement ce que comprend
          cette différence tarifaire :
        </p>
        <div className="bg-amber-500/5 border border-amber-500/30 rounded-xl p-5 mb-5">
          <p className="text-white font-semibold text-sm mb-2">
            Grille révisée le 2 septembre 2026
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Depuis le 31 août, un demandeur français dépose obligatoirement à Paris, où les frais
            consulaires sont plus élevés qu&apos;en Asie et où la traduction assermentée est exigée.
            La hausse est plus contenue sur la voie Soft Power que sur la voie freelance :{' '}
            <strong className="text-white">
              un dossier école ne comporte aucune preuve de revenus à faire traduire
            </strong>
            , et la lettre de l&apos;établissement arrive déjà en anglais.
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <ul className="space-y-3">
            <li className="flex justify-between items-center text-sm md:text-base border-b border-white/5 pb-2">
              <span className="text-gray-300">Frais d'inscription à l'école certifiée (cursus 9 mois)</span>
              <span className="text-white font-bold whitespace-nowrap">Inclus</span>
            </li>
            <li className="flex justify-between items-center text-sm md:text-base border-b border-white/5 pb-2">
              <span className="text-gray-300">Frais consulaires officiels de l&apos;ambassade de Paris (environ 350 €)</span>
              <span className="text-white font-bold whitespace-nowrap">Inclus</span>
            </li>
            <li className="flex justify-between items-center text-sm md:text-base border-b border-white/5 pb-2">
              <span className="text-gray-300">Obtention des lettres (Licence, signature PDG, DBD)</span>
              <span className="text-white font-bold whitespace-nowrap">Inclus</span>
            </li>
            <li className="flex justify-between items-center text-sm md:text-base pt-1">
              <span className="text-orange-400 font-semibold">Montage, audit et intermédiation DTV-Thaïlande</span>
              <span className="text-white font-bold whitespace-nowrap">Inclus</span>
            </li>
          </ul>
        </div>
        <p className="text-xs text-gray-500 mt-3 italic">
          * Zéro surprise, zéro frais cachés. Nous payons directement l'école et l'ambassade pour vous.
        </p>
      </section>

      {/* ── ENCART AUTEUR (E-E-A-T) ── */}
      <div className="my-14 bg-[#111111] border border-gray-800 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-6 shadow-lg">
        <PhotoAuteur accent="orange" />
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-1">Matthieu Moretti</h3>
          <p className="text-orange-500 text-xs font-semibold mb-3 uppercase tracking-wider">Expertise Terrain & Expatriation</p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Installé à Phuket, mon quotidien consiste à confronter les règles théoriques de l'immigration à
            la réalité du terrain asiatique. Avec DTV-Thaïlande, je sélectionne personnellement les écoles
            partenaires pour garantir à nos clients des dossiers irréfutables et une expatriation sans stress.
          </p>
        </div>
      </div>

      {/* ── FAQ ── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white mb-3">
          FAQ — DTV Soft Power
        </h2>
        <p className="text-gray-400 mb-6 text-sm">
          Découvrez les réponses rapides concernant la voie culturelle.
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
        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500 opacity-10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F59E0B] opacity-5 rounded-full blur-3xl pointer-events-none" />

        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 relative z-10">
          Sécurisez votre DTV sans fournir de fiches de paie
        </h3>
        <p className="text-gray-400 mb-8 relative z-10 text-sm md:text-base">
          Profitez de notre réseau d'écoles certifiées par le gouvernement. De l'inscription officielle 
          à l'obtention de votre visa au Laos ou en Malaisie, nous gérons votre dossier de A à Z.
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

      <PartageArticle slug="visa-dtv-soft-power-ecoles" variant="fin" />

      <BlogNavigation variant="article-bottom" />
    </article>
  );
}
