import React from 'react';
import BlogNavigation from '../../components/BlogNavigation';
import { createBreadcrumbSchema, getBlogPost } from '../posts';

const breadcrumbSchema = createBreadcrumbSchema(getBlogPost('visa-dtv-soft-power-ecoles'));
import Link from 'next/link';
import type { Metadata } from 'next';

// ─── MÉTADONNÉES SEO & CANONICAL ─────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Visa DTV Soft Power : éviter les fausses écoles",
  description: "Le guide définitif pour obtenir le Visa DTV via la voie Soft Power. Comparatif Cuisine vs Muay Thaï, gestion des présences et pièges à éviter.",
  alternates: {
    canonical: 'https://dtv-thailande.fr/blog/visa-dtv-soft-power-ecoles', // <-- LA VOICI !
  },
  openGraph: {
    title: "Visa DTV Soft Power : éviter les fausses écoles",
    description: "Comparatif Cuisine vs Muay Thaï, gestion des présences et pièges à éviter pour sécuriser votre DTV.",
    url: "https://dtv-thailande.fr/blog/visa-dtv-soft-power-ecoles",
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
    "@id": "https://dtv-thailande.fr/blog/visa-dtv-soft-power-ecoles"
  },
  "headline": "Visa DTV Soft Power : Éviter les arnaques des écoles (Cuisine & Muay Thaï)",
  "description": "Le guide définitif pour obtenir le Visa DTV via la voie Soft Power. Comparatif Cuisine vs Muay Thaï, gestion des présences et pièges à éviter.",
  "image": "https://dtv-thailande.fr/poster-softpower.jpg",  
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
        text: "Il n'y a pas de volume horaire légal strict, mais la norme acceptée par l'immigration est un cursus de 8 à 10 cours répartis sur une période maximale de 6 mois, pour un budget d'environ 20 000 THB.",
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
        <span className="inline-block bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
          Stratégie Soft Power · 2026
        </span>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
          Visa DTV Soft Power : Le choix stratégique entre{' '}
          <span className="text-[#F59E0B]">Cuisine et Muay Thaï</span>
        </h1>

        <p className="text-base text-gray-500 mt-4">
          Lecture : 9 min · Par{' '}
          <strong className="text-gray-400">Matthieu Moretti</strong>
        </p>
      </header>

      {/* ── INTRODUCTION ── */}
      <div className="text-lg text-gray-400 mb-12 space-y-5">
        <p>
          Pour obtenir le très convoité Visa DTV (5 ans d'expatriation), tout le monde n'a pas le profil
          d'un freelance capable de produire des liasses fiscales, des contrats clients et des bilans de
          société irréprochables.
        </p>
        <p>
          C'est là qu'intervient la voie royale : <strong className="text-white">la catégorie Soft Power</strong>.
          En vous inscrivant à une formation culturelle en Thaïlande, vous contournez l'intégralité des
          exigences professionnelles. Votre seule préoccupation devient alors de prouver vos 500 000 THB d'épargne.
        </p>
        <p className="text-white font-medium border-l-4 border-emerald-500 pl-5 py-1">
          Mais attention, le marché a rapidement été inondé d'écoles "fantômes" et d'arnaques. En 2025,
          plus de 10 000 visas ont été annulés par le gouvernement. Voici la vérité du terrain pour choisir
          la bonne activité, sécuriser votre dossier, et éviter l'interdiction de territoire.
        </p>
      </div>

      {/* ── SOMMAIRE CLIQUABLE ── */}
      <nav className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 mb-12 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Sommaire de l'article</h2>
        <ul className="space-y-3">
          <li><a href="#cuisine-vs-muay-thai" className="text-emerald-500 hover:text-emerald-400 hover:underline transition-colors text-sm md:text-base">1. Muay Thaï ou École de Cuisine : la vérité du terrain</a></li>
          <li><a href="#gestion-presences" className="text-emerald-500 hover:text-emerald-400 hover:underline transition-colors text-sm md:text-base">2. Assiduité et contrôles : comment prouver sa présence ?</a></li>
          <li><a href="#arnaques-ecoles" className="text-emerald-500 hover:text-emerald-400 hover:underline transition-colors text-sm md:text-base">3. Le péril des "écoles fantômes" et l'annulation du visa</a></li>
          <li><a href="#passage-douane" className="text-emerald-500 hover:text-emerald-400 hover:underline transition-colors text-sm md:text-base">4. Le passage à la douane : maintenir la validité du visa</a></li>
          <li><a href="#visa-run-asie" className="text-emerald-500 hover:text-emerald-400 hover:underline transition-colors text-sm md:text-base">5. Dépôt du dossier : pourquoi l'Asie (Visa Run) écrase Paris</a></li>
          <li><a href="#transparence-prix" className="text-emerald-500 hover:text-emerald-400 hover:underline transition-colors text-sm md:text-base">6. Transparence : décryptage du tarif à 1 250 €</a></li>
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
        <p className="mb-6">
          <strong className="text-white">C'est pourquoi nous recommandons systématiquement les écoles de cuisine.</strong>{' '}
          La gestion du temps y est infiniment plus souple. La plupart de nos écoles partenaires offrent un cursus d'environ
          8 à 10 cours (pour un budget d'environ 20 000 THB), que vous avez 6 mois pour valider.
        </p>

        {/* TABLEAU COMPARATIF */}
        <div className="overflow-x-auto rounded-2xl border border-gray-800 mb-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#111111] border-b border-gray-800">
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Critère</th>
                <th className="text-left px-4 py-3 text-emerald-400 font-semibold">École de Cuisine</th>
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
        <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-2xl p-5 mb-4">
          <p className="text-emerald-300 font-semibold text-sm">
            🛡️ La feuille de présence (Sign-in sheet)
          </p>
          <p className="text-gray-400 text-sm mt-1">
            À chaque session, l'école vous fera signer un registre officiel. Ce document est la pièce
            maîtresse qui fait foi en cas de contrôle de l'immigration. Ne prenez jamais le risque
            de payer sans assister physiquement au cours.
          </p>
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
          Comme l'a rappelé le <a href="https://www.thaigov.go.th/" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">gouvernement thaïlandais</a>,
          les ambassades croisent désormais les données avec une base officielle. Une lettre d'acceptation
          n'a aucune valeur si l'établissement n'est pas accrédité par le <strong>Ministère de l'Éducation</strong>{' '}
          et le <strong>Department of Business Development (DBD)</strong>.
        </p>
        <p>
          Si vous soumettez une lettre provenant d'une organisation non reconnue, le refus est immédiat.
          Pire, si le pot aux roses est découvert après coup, votre visa est révoqué et vous vous exposez à
          une interdiction de territoire de plusieurs années.
        </p>
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
          Lorsque vous terminerez votre cursus de cuisine (après vos 6 mois), l'école vous délivrera un{' '}
          <strong>diplôme officiel</strong>. Lors de votre première sortie et réentrée en Thaïlande, l'officier
          d'immigration à la douane est en droit de vous demander des comptes. Présenter votre diplôme et
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
          6. Transparence : décryptage du tarif à 1 250 €
        </h2>
        <p className="mb-4">
          La transparence est au cœur de notre méthode. Pour les profils freelances qui ont déjà tous leurs
          documents, notre prestation d'accompagnement est à <strong>850 €</strong>.
        </p>
        <p className="mb-4">
          Mais pour la voie Soft Power, nous proposons un <strong>package global à 1 250 €</strong>. Voici
          exactement ce que comprend cette différence tarifaire :
        </p>
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <ul className="space-y-3">
            <li className="flex justify-between items-center text-sm md:text-base border-b border-white/5 pb-2">
              <span className="text-gray-300">Frais d'inscription à l'école certifiée (env. 20 000 THB)</span>
              <span className="text-white font-bold whitespace-nowrap">Inclus</span>
            </li>
            <li className="flex justify-between items-center text-sm md:text-base border-b border-white/5 pb-2">
              <span className="text-gray-300">Frais consulaires officiels de l'ambassade (10 000 THB)</span>
              <span className="text-white font-bold whitespace-nowrap">Inclus</span>
            </li>
            <li className="flex justify-between items-center text-sm md:text-base border-b border-white/5 pb-2">
              <span className="text-gray-300">Obtention des lettres (Licence, signature PDG, DBD)</span>
              <span className="text-white font-bold whitespace-nowrap">Inclus</span>
            </li>
            <li className="flex justify-between items-center text-sm md:text-base pt-1">
              <span className="text-emerald-400 font-semibold">Montage, audit et intermédiation DTV-Thaïlande</span>
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
        <div className="w-24 h-24 rounded-full bg-gray-800 flex-shrink-0 overflow-hidden border-2 border-emerald-500/50">
          <div className="w-full h-full bg-gradient-to-br from-emerald-500/20 to-amber-500/20 flex items-center justify-center text-3xl">🇹🇭</div>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-1">Matthieu Moretti</h3>
          <p className="text-emerald-500 text-xs font-semibold mb-3 uppercase tracking-wider">Expertise Terrain & Expatriation</p>
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
        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500 opacity-10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F59E0B] opacity-5 rounded-full blur-3xl pointer-events-none" />

        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 relative z-10">
          Sécurisez votre DTV sans fournir de fiches de paie
        </h3>
        <p className="text-gray-400 mb-8 relative z-10 text-sm md:text-base">
          Profitez de notre réseau d'écoles certifiées par le gouvernement. De l'inscription officielle 
          à l'obtention de votre visa au Laos ou en Malaisie, nous gérons votre dossier de A à Z.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-white text-black font-bold text-sm py-4 px-7 rounded-full hover:bg-gray-100 active:scale-95 transition-all duration-300"
          >
            Faire mon test d'éligibilité
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-transparent text-white font-semibold text-sm py-4 px-7 rounded-full border border-gray-700 hover:border-gray-500 hover:bg-white/5 transition-all duration-300"
          >
            Réserver mon accompagnement Soft Power
          </Link>
        </div>
      </div>

      <BlogNavigation variant="article-bottom" />
    </article>
  );
}
