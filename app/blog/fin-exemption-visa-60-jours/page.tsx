import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import BlogNavigation from '../../components/BlogNavigation';
import { createBreadcrumbSchema, getBlogPost } from '../posts';

const breadcrumbSchema = createBreadcrumbSchema(getBlogPost('fin-exemption-visa-60-jours'));

// ─── MÉTADONNÉES SEO ──────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Visa Run Thaïlande : fin de l'exemption 60 jours",
  description:
    "Analyse terrain Juin 2026 : Pourquoi de plus en plus de voyageurs n'obtiennent que 30 jours d'exemption en Thaïlande. Coûts des Visa Runs et alternatives légales (DTV).",
  alternates: {
    canonical: 'https://dtv-thailande.fr/blog/fin-exemption-visa-60-jours', // <-- LE CANONICAL EST ICI
  },
  openGraph: {
    title: "Visa Run Thaïlande : fin de l'exemption 60 jours",
    description:
      "La répression contre les Visa Runs s'intensifie. Décryptage des contrôles aux frontières, des coûts cachés et de la transition vers le Visa DTV.",
    url: "https://dtv-thailande.fr/blog/fin-exemption-visa-60-jours",
    siteName: "DTV Thaïlande",
    locale: "fr_FR",
    type: "article",
    // TODO: Générer un opengraph-image.tsx ou lier une image spécifique à cet article quand les vraies miniatures seront disponibles.
    images: [{ url: '/logo.png' }],
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
  "headline": "Visa Run Thaïlande (2026) : Fin de l'exemption à 60 jours aux frontières terrestres ?",
  "description":
    "La réalité des frontières terrestres en Thaïlande. Durcissement des contrôles, coûts réels des Visa Runs et transition vers les visas longs séjours.",
  "image": "https://dtv-thailande.fr/images/blog/fin-exemption-visa-60-jours.jpg",
  "author": {
    "@type": "Person",
    "name": "Matthieu Moretti",
    "url": "https://dtv-thailande.fr/contact",
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
  "dateModified": "2026-07-26",
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
        "text": "L'abrogation des 60 jours a été approuvée par le gouvernement en mai 2026 pour un retour aux 30 jours, mais elle n'entrera en vigueur que 15 jours après sa publication au Journal Officiel (Royal Gazette). À la date du 26 juillet 2026, la loi des 60 jours court encore techniquement pour les vrais touristes."
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
          Visa Run Thaïlande (2026) : Fin de l'exemption à <span className="text-red-400">60 jours</span> aux frontières terrestres ?
        </h1>
        <p className="text-base text-gray-500 mt-6">
          Lecture : 12 min · Mis à jour : 26 juillet 2026 · Par{" "}
          <strong className="text-gray-400">Matthieu Moretti</strong>
        </p>
      </header>

      {/* ── INTRODUCTION (MOTS-CLÉS OPTIMISÉS DANS LES 100 PREMIERS MOTS) ── */}
      <div className="text-lg text-gray-400 mb-12 space-y-5">
        <p>
          Si vous cherchez des informations fiables sur le <strong>Visa DTV, l'exemption touristique, ou les Visa Runs en Thaïlande</strong>, vous avez probablement vu la rumeur circuler sur les réseaux sociaux. De nombreux voyageurs francophones signalent s'être vu octroyer seulement 30 jours à la frontière terrestre au lieu des 60 jours habituels.
        </p>
        <p>
          Qu'en est-il vraiment ? La loi a-t-elle déjà changé, ou s'agit-il d'un durcissement ciblé de l'immigration ? Notre agence, en contact direct avec les réalités du terrain et les postes frontières, décrypte pour vous la vérité derrière ce changement de paradigme. L'ère du "bricolage" administratif touche à sa fin et l'obtention d'un visa adéquat devient vitale.
        </p>
      </div>

      {/* ── SOMMAIRE EN DUR (ACCESSIBLE AUX CRAWLERS) ── */}
      <nav className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 mb-12 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Au programme de cette enquête :</h2>
        <ul className="space-y-3">
          <li><a href="#loi-vs-realite" className="text-red-400 hover:text-red-300 hover:underline transition-colors text-sm md:text-base">1. La loi des 60 jours vs La réalité du terrain (Juillet 2026)</a></li>
          <li><a href="#profil-visa-runner" className="text-red-400 hover:text-red-300 hover:underline transition-colors text-sm md:text-base">2. Pourquoi l'immigration réduit-elle les tampons à 30 jours ?</a></li>
          <li><a href="#piege-frontieres-terrestres" className="text-red-400 hover:text-red-300 hover:underline transition-colors text-sm md:text-base">3. Le piège des frontières terrestres : Classement de sévérité</a></li>
          <li><a href="#aerien-vs-terrestre" className="text-red-400 hover:text-red-300 hover:underline transition-colors text-sm md:text-base">4. Aérien vs Terrestre : Un vol depuis Paris donne-t-il toujours 60 jours ?</a></li>
          <li><a href="#cout-cache-visa-run" className="text-red-400 hover:text-red-300 hover:underline transition-colors text-sm md:text-base">5. Le véritable coût financier d'une vie en Visa Run</a></li>
          <li><a href="#transition-dtv" className="text-red-400 hover:text-red-300 hover:underline transition-colors text-sm md:text-base">6. Pourquoi le Visa DTV est l'unique solution rentable</a></li>
        </ul>
      </nav>

      {/* ── SECTION 1 ── */}
      <section className="mb-12" id="loi-vs-realite">
        <h2 className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          1. La loi des 60 jours vs La réalité du terrain (Juillet 2026)
        </h2>
        <p className="mb-4">
          Clarifions immédiatement le point légal. Le 19 mai 2026, le cabinet thaïlandais a effectivement approuvé l'abrogation de l'exemption touristique de 60 jours (instaurée en 2024) pour acter le retour strict à une exemption de 30 jours pour 54 pays (dont la France, la Belgique, la Suisse). <strong>Cependant, cette mesure n'est pas encore entrée en vigueur.</strong>
        </p>
        <p className="mb-4">
          Les nouvelles règles n'entreront en application que 15 jours après leur publication au Journal officiel (<em className="...">Royal Gazette</em>). Tant que cette notification n'est pas publique, le régime des 60 jours reste techniquement applicable.
        </p>
        <div className="border border-emerald-500/30 bg-emerald-500/5 rounded-xl p-5 my-6">
          <p className="text-white font-semibold mb-2">🔎 Veille active — vérifié le 26 juillet 2026</p>
          <p className="text-sm text-gray-300">
            À ce jour, <strong className="text-white">aucune publication à la Royal Gazette n'a été annoncée</strong>. L'exemption de 60 jours reste donc en vigueur pour les ressortissants français, belges et suisses. Nous vérifions cette page chaque semaine et la datons à chaque contrôle.
          </p>
        </div>
        
        <div className="border border-sky-500/30 bg-sky-500/5 rounded-xl p-5 mt-4">
          <p className="text-sky-400 font-semibold mb-2">💡 Le paradoxe actuel :</p>
          <p className="text-gray-400 text-sm">
            La <a href="https://www.tatnews.org/" target="_blank" rel="noopener noreferrer" className="text-sky-300 hover:underline font-medium">Tourism Authority of Thailand (TAT)</a> souligne que les vrais visiteurs entrant avant la publication officielle pourront rester jusqu'à la fin de leur période autorisée. Alors, pourquoi des voyageurs revenant d'un "Visa Run" au Laos n'obtiennent-ils que 30 jours ? La réponse tient au <strong>profilage douanier</strong>.
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
          Le cas de la réduction à 30 jours se produit majoritairement lors d'un passage de frontière terrestre. La loi thaïlandaise est très stricte : <strong>les entrées par voie terrestre sont limitées à deux par année civile</strong> sous le régime de l'exemption de visa, et elles ne sont généralement plus extensibles sur place.
        </p>
        <p className="mb-4">
          Cependant, tous les postes frontières ne font pas preuve du même niveau de tolérance. Voici notre cartographie terrain exclusive de la sévérité actuelle (Juin 2026) :
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
                <td className="py-4 px-5 text-yellow-500 font-bold">Modéré</td>
                <td className="py-4 px-5 text-gray-400">Tolérance légèrement supérieure si vous pouvez prouver un voyage touristique au Laos de plusieurs jours.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-400">
          * Le cas de votre contact qui n'a reçu que 30 jours s'explique par cette fermeté accrue envers les profils de "visa runners", et non par l'entrée en vigueur de la nouvelle loi.
        </p>
      </section>

      {/* ── SECTION 4 (AERIEN VS TERRESTRE) ── */}
      <section className="mb-12" id="aerien-vs-terrestre">
        <h2 className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          4. Aérien vs Terrestre : Un vol depuis Paris donne-t-il toujours 60 jours ?
        </h2>
        <p className="mb-4">
          L'inquiétude monte pour les vacanciers "classiques" qui lisent les retours angoissés des visa runners. Rassurez-vous : <strong>il y a une différence majeure de traitement entre une arrivée aérienne internationale et un passage de frontière terrestre local.</strong>
        </p>
        <p className="mb-4">
          Si vous arrivez à l'aéroport de Bangkok (Suvarnabhumi) ou de Phuket par un vol long-courrier depuis la France, la Belgique ou la Suisse, et que votre passeport ne contient pas de multiples tampons thaïlandais récents, vous êtes considéré comme un "véritable touriste".
        </p>
        <p>
          Dans ce cas, tant que l'abrogation officielle n'est pas parue dans la Royal Gazette, l'officier de l'immigration aérienne vous délivrera automatiquement votre exemption de <strong>60 jours complets</strong>. La réduction punitive à 30 jours est une arme douanière presque exclusivement déployée aux frontières terrestres et contre les vols courts intra-asiatiques (ex: Penang-Phuket) utilisés pour des Visa Runs.
        </p>
      </section>

      {/* ── SECTION 5 ── */}
      <section className="mb-12" id="cout-cache-visa-run">
        <h2 className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          5. Le véritable coût financier d'une vie en Visa Run
        </h2>
        <p className="mb-4">
          Le constat est amer : les coûts engendrés par toutes ces barrières douanières sont devenus conséquents. Beaucoup d'expatriés non déclarés pensent faire des économies en évitant de payer un vrai visa, mais avec la restriction officieuse à 30 jours et le durcissement imminent au Journal Officiel, la facture réelle est astronomique.
        </p>
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
          Sans compter le risque majeur de voir votre passeport "grillé" (refus d'entrée). Il est fortement conseillé de faire les visas adéquats en fonction de votre profil et des fonds disponibles.
        </p>
      </section>

      {/* ── SECTION 6 ── */}
      <section className="mb-14" id="transition-dtv">
        <h2 className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          6. Pourquoi le Visa DTV est l'unique solution rentable
        </h2>
        <p className="mb-4">
          Le gouvernement thaïlandais ne durcit pas les règles par méchanceté, il le fait pour forcer la transition vers la légalité. La TAT et les services consulaires rappellent constamment que pour des séjours longs ou répétés, il faut demander un visa approprié. 
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
      </section>

      {/* ── ENCART AUTEUR ── */}
      <div className="my-14 bg-[#111111] border border-gray-800 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-6 shadow-lg">
        <div className="w-24 h-24 rounded-full bg-gray-800 flex-shrink-0 overflow-hidden border-2 border-red-500/50">
          <div className="w-full h-full bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center text-3xl">🛂</div>
        </div>
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
          <Link href="/" className="inline-flex items-center justify-center bg-white text-black font-bold text-sm py-4 px-7 rounded-full hover:bg-gray-100 transition-all duration-300">
            Tester mon éligibilité au DTV
          </Link>
          <Link href="/contact" className="inline-flex items-center justify-center border border-white/20 text-white font-bold text-sm py-4 px-7 rounded-full hover:bg-white/5 transition-all duration-300">
            Prendre rendez-vous avec l'agence
          </Link>
        </div>
      </div>
      <BlogNavigation variant="article-bottom" />
    </article>
  );
}
