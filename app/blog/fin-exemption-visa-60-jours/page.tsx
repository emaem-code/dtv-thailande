import type { Metadata } from 'next';
import BoutonEligibilite from '../../components/BoutonEligibilite';
import LienArticle from '../../components/LienArticle';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import BlogNavigation from '../../components/BlogNavigation';
import PartageArticle from '../../components/PartageArticle';
import { createBreadcrumbSchema, getBlogPost } from '../posts';
import PhotoAuteur from '../../components/PhotoAuteur';

const breadcrumbSchema = createBreadcrumbSchema(getBlogPost('fin-exemption-visa-60-jours'));

// ─── MÉTADONNÉES SEO ──────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Exemption Thaïlande : 60 → 30 jours au 15 septembre 2026",
  description:
    "Publiée au Journal Royal le 31 août 2026, la réduction de l'exemption touristique de 60 à 30 jours s'applique aux entrées à partir du 15 septembre 2026. Ce qui change pour les Français, Belges et Suisses.",
  alternates: {
    canonical: 'https://dtv-thailande.fr/blog/fin-exemption-visa-60-jours', // <-- LE CANONICAL EST ICI
  },
  openGraph: {
    title: "Exemption Thaïlande : 60 → 30 jours au 15 septembre 2026",
    description:
      "La liste des pays exemptés passe de 93 à 60, la durée tombe à 30 jours et les entrées terrestres restent plafonnées à deux par an. Ce qui change, et à partir de quand.",
    url: "https://dtv-thailande.fr/blog/fin-exemption-visa-60-jours",
    siteName: "DTV Thaïlande",
    locale: "fr_FR",
    type: "article",
    // TODO: Générer un opengraph-image.tsx ou lier une image spécifique à cet article quand les vraies miniatures seront disponibles.
    images: [{ url: '/images/blog/fin-exemption-visa-60-jours.jpg' }],
  },
};

// ─── SCHEMA ARTICLE JSON-LD ───────────────────────────────────────────────────
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://dtv-thailande.fr/blog/fin-exemption-visa-60-jours",
  },
  "headline": "Thaïlande : fin de l'exemption de 60 jours, 30 jours à partir du 15 septembre 2026",
  "description":
    "Le texte publié au Journal Royal le 31 août 2026 ramène l'exemption touristique à 30 jours pour les entrées à partir du 15 septembre. Portée, régime transitoire, frontières terrestres et alternatives longue durée.",
  "image": "https://dtv-thailande.fr/images/blog/fin-exemption-visa-60-jours.jpg",
  "author": {
    "@type": "Person",
    "name": "Matthieu Moretti",
    "url": "https://dtv-thailande.fr/contact",
    "image": "https://dtv-thailande.fr/images/matthieu-moretti.jpg",
  },
  "publisher": {
    "@type": "Organization",
    "name": "DTV Thaïlande",
    "logo": {
      "@type": "ImageObject",
      "url": "https://dtv-thailande.fr/logo.png",
    },
  },
  "datePublished": "2026-06-11",
  "dateModified": "2026-09-02",
};

// ─── SCHEMA FAQ JSON-LD ───────────────────────────────────────────────────────
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "L'exemption de 60 jours en Thaïlande est-elle officiellement annulée ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. La révision a été publiée au Journal Royal le 31 août 2026 et s'applique aux entrées à partir du 15 septembre 2026. À cette date, l'exemption tombe à 30 jours pour la France, la Belgique, la Suisse et l'essentiel des pays concernés, et la liste des pays exemptés se réduit de 93 à 60."
      }
    },
    {
      "@type": "Question",
      "name": "Que se passe-t-il si j'entre en Thaïlande avant le 15 septembre 2026 ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vous conservez la durée portée sur votre tampon d'entrée. Une arrivée jusqu'au 14 septembre 2026 inclus ouvre encore droit à 60 jours, et ces 60 jours courent jusqu'à leur terme même s'il tombe après le 15 septembre. Le nouveau régime ne s'applique qu'aux entrées postérieures à sa date d'effet : il n'y a ni raccourcissement rétroactif, ni obligation de sortir plus tôt."
      }
    },
    {
      "@type": "Question",
      "name": "Peut-on encore prolonger son exemption sur place après le 15 septembre 2026 ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. L'extension de 30 jours auprès de l'immigration, au tarif de 1 900 THB, reste disponible sous le nouveau régime, de même que la prorogation courte de 7 jours introduite fin 2025. Ces extensions sont toutefois limitées à deux par année civile : le séjour maximal sous exemption devient donc nettement plus court qu'auparavant, et ne permet plus d'organiser une présence continue à l'année."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi l'immigration m'a-t-elle donné un tampon de 30 jours au Laos ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les agents de l'immigration ont reçu pour consigne de sévir contre les 'Visa Runs' répétés. Si votre passeport montre des séjours prolongés continus sans véritable statut de résident, l'officier use de son pouvoir discrétionnaire pour réduire l'exemption (30 ou 15 jours) en guise d'avertissement."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la limite légale des entrées par voie terrestre ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La loi autorise un maximum de deux (2) entrées par voie terrestre par année civile sous le régime de l'exemption de visa. Au-delà, un refus d'entrée est systématique sans présentation d'un visa consulaire."
      }
    },
    {
      "@type": "Question",
      "name": "Combien coûte un Visa Run au Laos en 2026 ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un aller-retour depuis Bangkok ou Phuket vers Vientiane coûte en moyenne entre 150 € et 250 € selon le mode de transport (avion ou bus de nuit), en incluant le visa laotien, une nuit d'hôtel obligatoire et les frais annexes. Répété sur l'année, le coût dépasse largement les 1 100 €."
      }
    },
    {
      "@type": "Question",
      "name": "Peut-on encore vivre en Thaïlande sans visa long séjour ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "C'est devenu extrêmement risqué. Le gouvernement thaïlandais ferme progressivement toutes les failles. Enchaîner les exemptions touristiques conduit inévitablement à un blocage informatique du passeport et à un refus d'embarquement ou d'entrée sur le territoire."
      }
    }
  ]
};

export default function ArticleFinExemption() {
  return (
    <article className="max-w-3xl mx-auto px-5 md:px-6 py-14 md:py-20 font-sans text-gray-300 leading-relaxed bg-[#0a0a0a]">
      <BlogNavigation variant="article-top" />
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
        <span className="inline-block bg-red-500/10 border border-red-500/25 text-red-400 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
          Analyse Terrain · Immigration
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
          Fin de l&apos;exemption à <span className="text-red-400">60 jours</span> en Thaïlande : 30 jours à partir du 15 septembre 2026
        </h1>
        <p className="text-base text-gray-500 mt-6">
          Lecture : 12 min · Mis à jour : 2 septembre 2026 · Par{" "}
          <strong className="text-gray-400">Matthieu Moretti</strong>
        </p>
        <PartageArticle slug="fin-exemption-visa-60-jours" variant="entete" />
      </header>

      {/* ── INTRODUCTION (MOTS-CLÉS OPTIMISÉS DANS LES 100 PREMIERS MOTS) ── */}
      <div className="text-lg text-gray-400 mb-12 space-y-5">
        <p>
          Ce n&apos;est plus une rumeur : la réduction de l&apos;<strong>exemption touristique thaïlandaise de 60 à 30 jours</strong> a été
          publiée au Journal Royal le <strong className="text-white">31 août 2026</strong> et s&apos;applique à toutes les entrées
          effectuées à partir du <strong className="text-white">15 septembre 2026</strong>. La France, la Belgique et la Suisse
          sont concernées.
        </p>
        <p>
          Pendant des mois, la mesure a été annoncée sans jamais paraître, et les voyageurs qui ne recevaient que 30 jours au poste
          frontière en concluaient que la loi avait déjà changé. Ce n&apos;était pas le cas : ils se heurtaient au durcissement
          discrétionnaire de l&apos;immigration contre les profils de <em>visa runners</em>. Les deux phénomènes se rejoignent
          désormais. Voici ce qui change exactement, pour qui, à partir de quand — et ce qui reste inchangé.
        </p>
      </div>

      {/* ── SOMMAIRE EN DUR (ACCESSIBLE AUX CRAWLERS) ── */}
      <nav className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 mb-12 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Au programme de cette enquête :</h2>
        <ul className="space-y-3">
          <li><a href="#loi-vs-realite" className="text-red-400 hover:text-red-300 hover:underline transition-colors text-sm md:text-base">1. Ce qui change au 15 septembre 2026 (texte publié)</a></li>
          <li><a href="#profil-visa-runner" className="text-red-400 hover:text-red-300 hover:underline transition-colors text-sm md:text-base">2. Pourquoi l'immigration réduit-elle les tampons à 30 jours ?</a></li>
          <li><a href="#piege-frontieres-terrestres" className="text-red-400 hover:text-red-300 hover:underline transition-colors text-sm md:text-base">3. Le piège des frontières terrestres : Classement de sévérité</a></li>
          <li><a href="#aerien-vs-terrestre" className="text-red-400 hover:text-red-300 hover:underline transition-colors text-sm md:text-base">4. Aérien vs terrestre : quelle durée obtient-on depuis Paris ?</a></li>
          <li><a href="#cout-cache-visa-run" className="text-red-400 hover:text-red-300 hover:underline transition-colors text-sm md:text-base">5. Le véritable coût financier d'une vie en Visa Run</a></li>
          <li><a href="#transition-dtv" className="text-red-400 hover:text-red-300 hover:underline transition-colors text-sm md:text-base">6. Pourquoi le Visa DTV est l'unique solution rentable</a></li>
        </ul>
      </nav>

      {/* ── SECTION 1 ── */}
      <section className="mb-12" id="loi-vs-realite">
        <h2 className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          1. Ce qui change au 15 septembre 2026 (texte publié)
        </h2>
        <p className="mb-4">
          Le point légal est désormais tranché. Après une approbation en conseil des ministres au printemps 2026, la révision du
          régime d&apos;exemption de visa a été <strong className="text-white">publiée au Journal Royal le 31 août 2026</strong>.
          Conformément au délai de quinze jours prévu par le texte, elle{' '}
          <strong className="text-white">s&apos;applique aux entrées effectuées à partir du 15 septembre 2026</strong>.
        </p>
        <p className="mb-4">
          Le dispositif ne se résume pas à un passage uniforme de 60 à 30 jours. Il resserre d&apos;abord le périmètre :
          la liste des pays admis à l&apos;exemption, ouverte à 93 nationalités depuis juillet 2024, est ramenée à{' '}
          <strong className="text-white">60 pays et territoires</strong>. Ceux qui y figurent encore — dont la France, la
          Belgique, la Suisse, le Royaume-Uni, les États-Unis, le Canada et l&apos;Australie — passent à 30 jours. Deux
          pays, Maurice et les Seychelles, sont ramenés à 15 jours, et trois autres basculent vers le visa à l&apos;arrivée
          (<em className="not-italic text-gray-300">visa on arrival</em>), payant et délivré au guichet.
        </p>

        <div className="overflow-x-auto my-6 border border-white/10 rounded-2xl bg-[#111111]">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/50">
                <th className="text-left py-4 px-5 text-gray-400 font-semibold uppercase tracking-wider text-xs">Régime</th>
                <th className="text-left py-4 px-5 text-gray-400 font-semibold uppercase tracking-wider text-xs">Jusqu&apos;au 14 sept. 2026</th>
                <th className="text-left py-4 px-5 text-gray-400 font-semibold uppercase tracking-wider text-xs">À partir du 15 sept. 2026</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="py-4 px-5 text-white font-medium">Durée accordée (France, Belgique, Suisse)</td>
                <td className="py-4 px-5 text-gray-400">60 jours</td>
                <td className="py-4 px-5 text-red-400 font-semibold">30 jours</td>
              </tr>
              <tr>
                <td className="py-4 px-5 text-white font-medium">Pays admis à l&apos;exemption</td>
                <td className="py-4 px-5 text-gray-400">93</td>
                <td className="py-4 px-5 text-red-400 font-semibold">60</td>
              </tr>
              <tr>
                <td className="py-4 px-5 text-white font-medium">Extension sur place à l&apos;immigration</td>
                <td className="py-4 px-5 text-gray-400">+ 30 jours (1 900 THB)</td>
                <td className="py-4 px-5 text-gray-300">+ 30 jours (1 900 THB) — maintenue</td>
              </tr>
              <tr>
                <td className="py-4 px-5 text-white font-medium">Entrées terrestres sous exemption</td>
                <td className="py-4 px-5 text-gray-400">2 par année civile</td>
                <td className="py-4 px-5 text-gray-300">2 par année civile — inchangé</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="border border-emerald-500/30 bg-emerald-500/5 rounded-xl p-5 my-6">
          <p className="text-white font-semibold mb-2">✅ Régime transitoire : ce que vous gardez</p>
          <p className="text-sm text-gray-300">
            Le texte n&apos;a <strong className="text-white">aucun effet rétroactif</strong>. Si vous entrez en Thaïlande
            jusqu&apos;au <strong className="text-white">14 septembre 2026 inclus</strong>, vous recevez encore 60 jours et
            vous les conservez jusqu&apos;à leur terme, même s&apos;il tombe en octobre ou en novembre. Personne ne sera
            invité à écourter un séjour déjà commencé. Seules les entrées à partir du 15 septembre relèvent du nouveau
            barème.
          </p>
        </div>

        <p className="mb-4">
          Ce qui subsiste compte autant que ce qui disparaît. L&apos;<strong>extension de 30 jours</strong> demandée sur
          place à l&apos;immigration reste ouverte au tarif habituel de 1 900 THB, tout comme la prorogation courte de sept
          jours introduite fin 2025. Mais ces extensions sont{' '}
          <strong className="text-white">plafonnées à deux par année civile</strong>. Concrètement, le montage qui
          permettait à un résident de fait d&apos;empiler exemption, extension et sortie de frontière pour tenir douze mois
          n&apos;existe plus arithmétiquement : le plafond annuel se referme avant l&apos;été.
        </p>

        <div className="border border-red-500/30 bg-red-500/5 rounded-xl p-5 mt-4">
          <p className="text-red-400 font-semibold mb-2">💡 Le vrai message derrière la mesure</p>
          <p className="text-gray-400 text-sm">
            Les chiffres du ministère du Tourisme expliquent le calcul : près de{' '}
            <strong className="text-white">90 % des visiteurs restent 30 jours ou moins</strong>, et la durée moyenne de
            séjour dépasse à peine neuf jours — une moyenne tirée vers le bas par les 4,5 millions d&apos;excursionnistes
            malaisiens à la journée. Les 60 jours ne servaient donc quasiment qu&apos;à une population : celle qui vit sur
            place sans titre de séjour. La Thaïlande reste plus stricte que la Malaisie (90 jours) et que le Vietnam
            (45 jours) : le pari assumé est que le vrai touriste ne verra pas la différence, et que le résident de fait
            devra prendre un visa.
          </p>
        </div>
      </section>

      {/* ── SECTION 2 ── */}
      <section className="mb-12" id="profil-visa-runner">
        <h2 className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          2. Pourquoi l'immigration réduit-elle les tampons à 30 jours ?
        </h2>
        <p className="mb-4">
          Depuis fin 2025, l'immigration thaïlandaise a drastiquement renforcé la lutte contre les "visa runs". L'objectif est clair : cibler les étrangers (nomades numériques, indépendants non déclarés) qui vivent à l'année en Thaïlande en enchaînant les exemptions touristiques sans demander de visa long séjour.
        </p>
        <p className="mb-4">
          Les autorités examinent désormais attentivement les schémas de séjour. Les voyages "aller-retour" le jour même sont identifiés comme à haut risque. Les officiers d'immigration ont un <strong>pouvoir discrétionnaire absolu</strong> à la douane. 
        </p>
        <ul className="space-y-4 mb-6">
          <li className="flex gap-3">
            <span className="text-red-400 flex-shrink-0">⚠️</span>
            <span><strong className="text-white">La sanction d'avertissement :</strong> S'ils estiment que vous abusez du système (passeport rempli d'exemptions successives), les fonctionnaires peuvent sciemment réduire la durée accordée à 30 jours (voire 15 jours) en guise d'avertissement.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-red-400 flex-shrink-0">⚠️</span>
            <span><strong className="text-white">Le refus d'entrée :</strong> Dans les cas de séjours continus sans retour au pays d'origine, l'agent peut vous refuser l'entrée sur le territoire.</span>
          </li>
        </ul>
        <p className="text-sm text-gray-400">
          Pour suivre les annonces officielles, il est prudent de consulter régulièrement les mises à jour de <a href="http://www.thaiembassy.fr" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">l'Ambassade Royale de Thaïlande à Paris</a>.
        </p>
      </section>

      {/* ── SECTION 3 (TABLEAU COMPARATIF EXCLUSIF) ── */}
      <section className="mb-12" id="piege-frontieres-terrestres">
        <h2 className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          3. Le piège des frontières terrestres : Classement de sévérité
        </h2>
        <p className="mb-4">
          Le durcissement le plus brutal se joue aux frontières terrestres. La règle est explicite, et le texte publié le
          31 août 2026 la reconduit sans l&apos;assouplir : <strong>les entrées par voie terrestre sont limitées à deux par
          année civile</strong> sous le régime de l&apos;exemption de visa. Passé ce quota, le refus d&apos;entrée est la
          règle sans visa consulaire en poche.
        </p>
        <figure className="my-8">
          <Image
            src="/images/blog/fin-exemption-poste-frontiere.jpg"
            alt="Poste frontière terrestre entre la Thaïlande et le Laos, où les tampons réduits à 30 jours se multiplient"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Nong Khai, Sadao, Aranyaprathet : la sévérité varie fortement d&apos;un poste à l&apos;autre.
          </figcaption>
        </figure>
        <p className="mb-4">
          Cependant, tous les postes frontières ne font pas preuve du même niveau de tolérance. Voici notre cartographie
          terrain de la sévérité constatée, relevée avant l&apos;entrée en vigueur du nouveau barème :
        </p>

        <div className="overflow-x-auto mt-4 mb-6 border border-white/10 rounded-2xl bg-[#111111]">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/50">
                <th className="text-left py-4 px-5 text-gray-400 font-semibold uppercase tracking-wider text-xs">Poste Frontière</th>
                <th className="text-left py-4 px-5 text-gray-400 font-semibold uppercase tracking-wider text-xs">Pays</th>
                <th className="text-left py-4 px-5 text-gray-400 font-semibold uppercase tracking-wider text-xs">Niveau de Sévérité</th>
                <th className="text-left py-4 px-5 text-gray-400 font-semibold uppercase tracking-wider text-xs">Risque de tampon réduit (30j)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="py-4 px-5 text-white font-medium">Nong Khai (Pont de l'Amitié)</td>
                <td className="py-4 px-5 text-gray-400">Laos</td>
                <td className="py-4 px-5 text-amber-500 font-bold">Élevé</td>
                <td className="py-4 px-5 text-gray-400">Très fréquent pour les profils ayant déjà 1 ou 2 tampons récents. Interrogatoire probable.</td>
              </tr>
              <tr>
                <td className="py-4 px-5 text-white font-medium">Sadao / Padang Besar</td>
                <td className="py-4 px-5 text-gray-400">Malaisie</td>
                <td className="py-4 px-5 text-red-500 font-bold">Critique</td>
                <td className="py-4 px-5 text-gray-400">Les "same-day visa runs" sont activement chassés. Refus d'entrée récurrents.</td>
              </tr>
              <tr>
                <td className="py-4 px-5 text-white font-medium">Aranyaprathet / Poipet</td>
                <td className="py-4 px-5 text-gray-400">Cambodge</td>
                <td className="py-4 px-5 text-red-500 font-bold">Critique</td>
                <td className="py-4 px-5 text-gray-400">Zone historiquement complexe. Exige systématiquement de voir 20 000 THB en cash.</td>
              </tr>
              <tr>
                <td className="py-4 px-5 text-white font-medium">Chiang Khong</td>
                <td className="py-4 px-5 text-gray-400">Laos (Nord)</td>
                <td className="py-4 px-5 text-red-500 font-bold">Modéré</td>
                <td className="py-4 px-5 text-gray-400">Tolérance légèrement supérieure si vous pouvez prouver un voyage touristique au Laos de plusieurs jours.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-400">
          * Avant le 15 septembre 2026, les tampons réduits à 30 jours relevaient de cette fermeté envers les profils de
          « visa runners », et non de la loi. Depuis cette date, 30 jours est simplement la durée normale : la marge
          discrétionnaire de l&apos;officier joue désormais <em>en dessous</em> — 15 jours, ou refus d&apos;entrée pur et
          simple.
        </p>
      </section>

      {/* ── SECTION 4 (AERIEN VS TERRESTRE) ── */}
      <section className="mb-12" id="aerien-vs-terrestre">
        <h2 className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          4. Aérien vs terrestre : quelle durée obtient-on depuis Paris ?
        </h2>
        <p className="mb-4">
          L&apos;inquiétude monte chez les vacanciers « classiques » qui lisent les retours angoissés des visa runners.
          Rassurez-vous : <strong>la différence de traitement entre une arrivée aérienne internationale et un passage de
          frontière terrestre local reste entière</strong>, même après le 15 septembre.
        </p>
        <p className="mb-4">
          Si vous arrivez à l'aéroport de Bangkok (Suvarnabhumi) ou de Phuket par un vol long-courrier depuis la France, la Belgique ou la Suisse, et que votre passeport ne contient pas de multiples tampons thaïlandais récents, vous êtes considéré comme un "véritable touriste".
        </p>
        <p className="mb-4">
          Pour une arrivée jusqu&apos;au <strong>14 septembre 2026 inclus</strong>, l&apos;officier vous délivre encore
          automatiquement <strong>60 jours complets</strong>, que vous conservez jusqu&apos;à leur terme. Pour une arrivée à
          compter du <strong>15 septembre</strong>, ce sera <strong className="text-white">30 jours</strong>, extensibles
          une fois de 30 jours à l&apos;immigration contre 1 900 THB.
        </p>
        <p>
          La réduction <em>punitive</em> — celle qui descend en dessous de la durée normale, à 15 jours, ou qui débouche sur
          un refus d&apos;entrée — reste une arme douanière déployée presque exclusivement aux frontières terrestres et
          contre les vols courts intra-asiatiques (Penang – Phuket, par exemple) utilisés comme visa runs. Un vol
          long-courrier depuis Paris, Bruxelles ou Genève, avec un passeport sans accumulation de tampons thaïlandais
          récents, n&apos;est pas concerné par ce profilage.
        </p>
      </section>

      {/* ── SECTION 5 ── */}
      <section className="mb-12" id="cout-cache-visa-run">
        <h2 className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          5. Le véritable coût financier d'une vie en Visa Run
        </h2>
        <p className="mb-4">
          Le constat est amer : les coûts engendrés par toutes ces barrières douanières sont devenus conséquents. Beaucoup
          d&apos;expatriés non déclarés pensent faire des économies en évitant de payer un vrai visa. Le calcul ci-dessous
          était hier le scénario pessimiste, réservé aux passeports « repérés » ; depuis le passage officiel à 30 jours au
          15 septembre 2026, <strong className="text-white">c&apos;est devenu la situation par défaut de tout le
          monde</strong> — et le nombre d&apos;allers-retours annuels double mécaniquement.
        </p>
        <figure className="my-8">
          <Image
            src="/images/blog/fin-exemption-cout-visa-run.jpg"
            alt="Le coût réel d&apos;une année de visa runs en Thaïlande : vols, extensions et nuits d&apos;hôtel"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            1 155 € par an en moyenne — sans compter le risque de voir son passeport « grillé » à la frontière.
          </figcaption>
        </figure>
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 mt-6">
          <p className="text-white font-bold mb-4">💸 Calcul du coût d'une année en Visa Runs (Base 30 Jours) :</p>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex justify-between border-b border-gray-800 pb-2">
              <span>Extension à l'immigration (1900 THB × 6)</span>
              <span className="text-white">~ 315 €</span>
            </li>
            <li className="flex justify-between border-b border-gray-800 pb-2">
              <span>Vols/Transports frontaliers (Environ 100€ × 6)</span>
              <span className="text-white">~ 600 €</span>
            </li>
            <li className="flex justify-between border-b border-gray-800 pb-2">
              <span>Nuits d'hôtels forcées aux frontières (40€ × 6)</span>
              <span className="text-white">~ 240 €</span>
            </li>
            <li className="flex justify-between border-b border-gray-800 pb-2">
              <span>Jours de travail perdus (Stress, trajets)</span>
              <span className="text-red-400">Inestimable</span>
            </li>
            <li className="flex justify-between font-bold pt-2 text-lg">
              <span className="text-white">Coût total annuel estimé</span>
              <span className="text-amber-500">~ 1 155 € / An</span>
            </li>
          </ul>
        </div>
        <p className="mt-4 text-sm text-gray-400">
          Et encore ce chiffre suppose-t-il que la manœuvre reste possible toute l&apos;année. Avec deux entrées terrestres
          et deux extensions par année civile, elle ne l&apos;est plus : le plafond est atteint avant l&apos;été, et la
          seule issue restante est un vol international à chaque cycle. Sans compter le risque majeur de voir votre
          passeport « grillé » (refus d&apos;entrée). Il est fortement conseillé de prendre le visa adéquat en fonction de
          votre profil et des fonds disponibles.
        </p>
      </section>

      {/* ── SECTION 6 ── */}
      <section className="mb-14" id="transition-dtv">
        <h2 className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          6. Pourquoi le Visa DTV est l'unique solution rentable
        </h2>
        <p className="mb-4">
          Le gouvernement thaïlandais ne durcit pas les règles par méchanceté : il ferme une porte de service pour en
          ouvrir une officielle. Le message du 31 août 2026 est cohérent avec la création du DTV deux ans plus tôt — pour
          un séjour long ou répété, il faut un visa, et il en existe désormais un taillé pour les profils qui abusaient de
          l&apos;exemption. 
        </p>
        <p className="mb-4">
          La solution ultime pour régulariser le profil des "Visa Runners" (freelances, nomades, rentiers) est le <strong className="text-white">Destination Thailand Visa (DTV)</strong> de 5 ans.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="border border-white/5 bg-[#111111] rounded-2xl p-6">
            <h3 className="text-amber-500 font-bold mb-3 uppercase tracking-wider text-xs">Les Avantages du DTV</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>✅ <strong className="text-white">Validité :</strong> 5 ans (Entrées multiples).</li>
              <li>✅ <strong className="text-white">Séjour :</strong> 180 jours consécutifs par entrée.</li>
              <li>✅ <strong className="text-white">Légalité :</strong> Autorisation de télétravailler légalement.</li>
              <li>✅ <strong className="text-white">Rentabilité :</strong> Finie l'angoisse des frontières et des extensions mensuelles.</li>
            </ul>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Pour éviter d'être considéré comme un "visa runner", limitez vos entrées terrestres. Si vous comptez revenir fréquemment, envisagez cette solution de long séjour.
            </p>
            <Link href="/blog/visa-dtv-freelance-auto-entrepreneur" className="text-amber-400 hover:underline text-sm font-semibold">
              → Lire le guide : Monter son dossier DTV en tant qu'indépendant
            </Link>
          </div>
        </div>
        <p className="mt-4">
          Le DTV n&apos;est pas la seule option longue durée —{' '}
          <Link href="/blog/comparatif-visas-thailande" className="text-amber-400 hover:underline font-medium">
            comparez-le au LTR, au Non-ED et au Non-O
          </Link>{' '}
          avant de vous décider.
        </p>
        <p className="mt-4">
          Et si la tentation de « laisser filer » quelques jours au-delà du tampon vous a déjà
          traversé l&apos;esprit, sachez que la sanction ne dépend pas de la durée du dépassement mais
          de la manière dont il se termine :{' '}
          <LienArticle slug="overstay-thailande-amende-blacklist-visa-dtv" className="text-amber-400 hover:underline font-medium">
            le barème officiel de l&apos;overstay, amendes et interdictions
          </LienArticle>
          .
        </p>
        <p className="mt-4">
          Et si vous doutez encore de la rentabilité de l&apos;opération, lisez{' '}
          <LienArticle slug="cas-client-visa-dtv-soft-power-vientiane" className="text-amber-400 hover:underline font-medium">
            le cas de ce client qui a dépensé 5 000 € en 21 mois de visa runs
          </LienArticle>{' '}
          avant d&apos;obtenir son DTV en trois jours.
        </p>
      </section>

      {/* ── ENCART AUTEUR ── */}
      <div className="my-14 bg-[#111111] border border-gray-800 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-6 shadow-lg">
        <PhotoAuteur accent="red" />
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-1">Matthieu Moretti</h3>
          <p className="text-red-400 text-xs font-semibold mb-3 uppercase tracking-wider">Expertise Terrain & Formalités</p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Basé à Phuket, j'accompagne la communauté francophone dans la sécurisation légale de leur expatriation. Face au durcissement continu de l'immigration, notre agence s'occupe de transformer vos profils atypiques en dossiers DTV irréfutables pour mettre fin à l'angoisse des frontières et aux coûts prohibitifs des Visa Runs.
          </p>
        </div>
      </div>

      {/* ── MAILLAGE INTERNE ── */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 mb-12">
        <p className="text-white font-bold text-sm mb-4">📚 Ressources utiles :</p>
        <ul className="space-y-3">
          <li>
            <Link href="/blog/fonds-bancaires-visa-dtv" className="text-amber-400 hover:text-amber-300 hover:underline text-sm transition-colors">
              → Preuve financière : Comment valider les 500 000 THB du DTV ?
            </Link>
          </li>
          <li>
            <Link href="/blog/tdac-thailande-carte-arrivee" className="text-amber-400 hover:text-amber-300 hover:underline text-sm transition-colors">
              → TDAC Thaïlande : Ne ratez pas le nouveau formulaire d'arrivée
            </Link>
          </li>
          <li>
            <Link href="/faq" className="text-amber-400 hover:text-amber-300 hover:underline text-sm transition-colors">
              → FAQ Visa DTV : Toutes vos questions sur les exigences légales
            </Link>
          </li>
        </ul>
      </div>

      {/* ── FAQ INTERNE ── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white mb-6">FAQ : Visa Runs et Immigration</h2>
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

      {/* ── ZONE DE CONVERSION PRINCIPALE ── */}
      <div className="mt-4 bg-[#111111] border border-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500 opacity-5 rounded-full blur-3xl" />
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 relative z-10">
          Arrêtez de jouer avec votre passeport
        </h3>
        <p className="text-gray-400 mb-8 text-sm md:text-base relative z-10">
          L'immigration thaïlandaise ferme progressivement toutes les failles. Passez au Visa DTV de 5 ans en nous déléguant la constitution de votre dossier consulaire. Moins de stress, 100% de légalité.
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
      <PartageArticle slug="fin-exemption-visa-60-jours" variant="fin" />

      <BlogNavigation variant="article-bottom" />
    </article>
  );
}
