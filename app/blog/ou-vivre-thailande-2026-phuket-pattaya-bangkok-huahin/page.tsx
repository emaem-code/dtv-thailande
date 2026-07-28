import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogNavigation from '../../components/BlogNavigation';
import { createBreadcrumbSchema, getBlogPost } from '../posts';

export const revalidate = 600;

const post = getBlogPost('ou-vivre-thailande-2026-phuket-pattaya-bangkok-huahin');
const breadcrumbSchema = createBreadcrumbSchema(post);

// ─── MÉTADONNÉES SEO ─────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Où vivre en Thaïlande en 2026 : le comparatif terrain',
  description:
    "Budgets réels, loyers 2026, ambiance et vécu d'expatriés à Phuket, Pattaya, Bangkok et Hua Hin. Le comparatif honnête pour choisir votre ville.",
  alternates: {
    canonical:
      'https://dtv-thailande.fr/blog/ou-vivre-thailande-2026-phuket-pattaya-bangkok-huahin',
  },
  openGraph: {
    title:
      'Phuket, Pattaya, Bangkok ou Hua Hin : où vivre en Thaïlande en 2026 ?',
    description:
      "Budgets réels, loyers 2026 et vécu d'expatriés. Le comparatif terrain pour choisir votre ville en Thaïlande.",
    url: 'https://dtv-thailande.fr/blog/ou-vivre-thailande-2026-phuket-pattaya-bangkok-huahin',
    siteName: 'DTV Thaïlande',
    locale: 'fr_FR',
    type: 'article',
    images: [{ url: '/images/blog/ou-vivre-thailande-2026-phuket-pattaya-bangkok-huahin.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Phuket, Pattaya, Bangkok ou Hua Hin : où vivre en Thaïlande en 2026 ?',
    description:
      "Budgets réels, loyers 2026 et vécu d'expatriés. Le comparatif terrain pour choisir votre ville.",
    images: ['/images/blog/ou-vivre-thailande-2026-phuket-pattaya-bangkok-huahin.jpg'],
  },
};

// ─── SCHEMA ARTICLE JSON-LD ──────────────────────────────────────────────────
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id':
      'https://dtv-thailande.fr/blog/ou-vivre-thailande-2026-phuket-pattaya-bangkok-huahin',
  },
  headline:
    'Phuket, Pattaya, Bangkok ou Hua Hin : où vivre en Thaïlande en 2026 ? Le comparatif terrain',
  description:
    "Budgets réels, loyers 2026, ambiance et vécu d'expatriés à Phuket, Pattaya, Bangkok et Hua Hin. Le comparatif honnête pour choisir votre ville.",
  image: 'https://dtv-thailande.fr/logo.png',
  author: {
    '@type': 'Person',
    name: 'Matthieu Moretti',
    url: 'https://dtv-thailande.fr/contact',
  },
  publisher: {
    '@type': 'Organization',
    name: 'DTV Thaïlande',
    logo: {
      '@type': 'ImageObject',
      url: 'https://dtv-thailande.fr/logo.png',
    },
  },
  datePublished: '2026-07-28',
  dateModified: '2026-07-28',
};

// ─── SCHEMA FAQ JSON-LD ──────────────────────────────────────────────────────
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Quelle est la ville la moins chère pour vivre en Thaïlande en 2026 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Parmi Phuket, Pattaya, Bangkok et Hua Hin, Pattaya offre le meilleur rapport qualité-prix, avec des studios équipés dès 5 000 à 5 500 THB et un budget mensuel tout compris autour de 800 à 1 000 euros. Hua Hin est également abordable, environ 9 % moins cher que Bangkok.",
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on vivre à Phuket sans voiture ni scooter ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "C'est difficile. Phuket est étendue et les transports en commun limités. Un scooter est fortement recommandé. À Pattaya et Hua Hin, on peut s'en passer plus facilement selon l'emplacement du logement. À Bangkok, le métro rend le véhicule inutile.",
      },
    },
    {
      '@type': 'Question',
      name: 'Les loyers ont-ils augmenté en Thaïlande en 2026 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Pas partout. À Phuket, ils ont même baissé sur un an : un condo qui se louait 12 000 à 13 000 THB à l'été 2025 se trouve désormais autour de 10 000 à 11 000 THB, probablement à cause du filtrage de l'immigration qui a réduit la demande.",
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle ville choisir pour un digital nomad avec un Visa DTV ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Phuket est idéale pour un indépendant de 20 à 50 ans qui travaille sur ordinateur : tranquillité, beauté, vie nocturne à proximité et livraison 24h/24. Pattaya convient si le budget prime. Hua Hin et Bangkok offrent aussi une excellente connectivité fibre et 5G.",
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle ville pour une retraite ou une vie de famille ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Hua Hin est le choix privilégié des retraités et des familles : calme, praticable à pied, soins de qualité et ambiance balnéaire paisible. Un profil qui se sentirait souvent trop à l'étroit dans l'intensité de Phuket ou Bangkok.",
      },
    },
    {
      '@type': 'Question',
      name: "Quel budget minimum prévoir pour s'installer en Thaïlande ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Comptez au minimum 30 000 THB par mois pour une personne seule avec un mode de vie simple, et 45 000 à 60 000 THB pour un vrai confort. À cela s'ajoutent les frais d'installation : caution de logement (souvent 2 mois), achat ou location d'un véhicule, et assurance santé privée.",
      },
    },
  ],
};

// ─── DONNÉES DU TABLEAU COMPARATIF ───────────────────────────────────────────
const villes = [
  {
    ville: 'Phuket',
    loyer: '10 000–11 000 THB',
    budget: '~500 € hors loyer',
    ambiance: 'Île paisible, nightlife proche',
    beaute: 'Exceptionnelle',
    transport: 'Difficile sans véhicule',
    sante: 'Bonne',
    profil: 'Indépendant 20–50 ans',
  },
  {
    ville: 'Pattaya',
    loyer: '5 000–5 500 THB',
    budget: '800–1 000 € tout compris',
    ambiance: 'Concentré de tout, budget',
    beaute: 'Correcte, mer moins propre',
    transport: 'Possible selon quartier',
    sante: 'Bonne',
    profil: 'Tous budgets, tous goûts',
  },
  {
    ville: 'Bangkok',
    loyer: '12 000–40 000 THB',
    budget: '45 000–75 000 THB',
    ambiance: 'Métropole intense',
    beaute: 'Urbaine',
    transport: 'Excellent (métro)',
    sante: 'Excellente',
    profil: 'Amoureux de la ville',
  },
  {
    ville: 'Hua Hin',
    loyer: '10 000–15 000 THB',
    budget: '30 000–40 000 THB',
    ambiance: 'Balnéaire calme',
    beaute: 'Jolie et douce',
    transport: 'Bon (walkable)',
    sante: 'Bonne',
    profil: 'Retraités, familles',
  },
];

// ─── SOMMAIRE ────────────────────────────────────────────────────────────────
const sommaire = [
  { id: 'phuket', label: "Phuket — l'île qui a baissé ses prix" },
  { id: 'pattaya', label: 'Pattaya — le meilleur rapport qualité-prix' },
  { id: 'bangkok', label: "Bangkok — la métropole qu'on aime ou qu'on fuit" },
  { id: 'huahin', label: 'Hua Hin — la douceur de vivre balnéaire' },
  { id: 'comparatif', label: "Le comparatif en un coup d'œil" },
  { id: 'verdict', label: 'Alors, où vivre en Thaïlande ?' },
];

export default function BlogArticleOuVivreThailande() {
  // En production, un article programmé reste invisible jusqu'à sa date.
  // En développement (npm run dev), il s'affiche pour permettre la relecture.
  const estProgramme = new Date(post?.publishedAt) > new Date();
  if (!post || (estProgramme && process.env.NODE_ENV === 'production')) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-5 md:px-6 py-14 md:py-20 font-sans text-gray-300 leading-relaxed bg-[#0a0a0a]">
      <BlogNavigation variant="article-top" />

      {/* ── SCRIPTS SEO JSON-LD ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleSchema, breadcrumbSchema]),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── EN-TÊTE ── */}
      <header className="mb-12 border-b border-gray-800 pb-10">
        <span className="inline-block bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
          Vie pratique · Comparatif
        </span>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
          Phuket, Pattaya, Bangkok ou Hua Hin :{' '}
          <span className="text-sky-400">où vivre en Thaïlande en 2026 ?</span>
        </h1>

        <p className="text-base text-gray-500 mt-4">
          Publié le 28 juillet 2026 · Lecture : 12 min · Par{' '}
          <strong className="text-gray-400">Matthieu Moretti</strong>
        </p>
      </header>

      {/* ── INTRODUCTION ── */}
      <div className="text-lg text-gray-400 mb-10 space-y-5">
        <p>
          Choisir sa ville en Thaïlande, c&apos;est la vraie première décision
          d&apos;une installation réussie — bien avant le visa. Beaucoup
          arrivent avec une image de carte postale en tête et déchantent.
          D&apos;autres passent à côté de l&apos;endroit qui leur aurait
          parfaitement convenu, faute d&apos;informations concrètes.
        </p>
        <p>
          Cet article n&apos;est pas un guide touristique de plus. C&apos;est un
          comparatif terrain, basé sur du vécu réel en 2026.{' '}
          <strong className="text-white">
            J&apos;habite à Phuket, dans le quartier de Kathu.
          </strong>{' '}
          Un ami vit à Pattaya depuis des années et a accepté de partager son
          quotidien sans filtre. Pour Bangkok et Hua Hin, je m&apos;appuie sur
          les données 2026 et mes propres impressions de séjour.
        </p>
        <p className="text-white font-medium border-l-4 border-sky-400 pl-5 py-1">
          On vous dit ce que ça coûte vraiment, quelle est l&apos;ambiance au
          quotidien, et surtout : pour qui chaque ville est faite.
        </p>
      </div>

      {/* ── SOMMAIRE ── */}
      <nav className="mb-14 bg-[#111111] border border-gray-800 rounded-2xl p-6">
        <p className="text-white font-bold text-sm uppercase tracking-widest mb-4">
          Sommaire
        </p>
        <ol className="space-y-2 list-none pl-0">
          {sommaire.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-gray-400 hover:text-sky-400 transition-colors text-sm"
              >
                <span className="text-sky-400 font-semibold mr-2">{i + 1}.</span>
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* ── SECTION 1 : PHUKET ── */}
      <section className="mb-12">
        <h2
          id="phuket"
          className="text-2xl font-bold text-white mb-4 scroll-mt-24"
        >
          1. Phuket — l&apos;île qui a baissé ses prix en 2026
        </h2>
        <p className="mb-4">
          Commençons par là où je vis. Phuket traîne une réputation de
          destination chère et ultra-touristique. La réalité 2026 est plus
          nuancée — et même surprenante.
        </p>

        <figure className="my-8">
          <Image
            src="/images/blog/ou-vivre-phuket-kathu-condo.jpg"
            alt="Vue depuis ma résidence à Kathu, Phuket : le lac, la jungle et les collines vertes, à quinze minutes de Patong"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Kathu, à quinze minutes de Patong. Un immeuble ordinaire — façade
            terracotta, garde-corps noirs — mais une vue sur le lac et les
            collines que beaucoup paient trois fois ce prix en bord de mer.
          </figcaption>
        </figure>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          Mon logement, mon budget réel
        </h3>
        <p className="mb-4">
          J&apos;habite un condo de 30 m² à Kathu, à quinze minutes de Patong et
          vingt de Phuket Town. Cuisine équipée, balcon avec vue sur la montagne
          et le lac, piscine à débordement, petite salle de sport, internet
          inclus. Le tout pour{' '}
          <strong className="text-white">
            11 150 THB par mois, soit environ 300 €
          </strong>
          .
        </p>
        <p className="mb-4">
          Soyons précis sur ce que ce montant recouvre, parce que c&apos;est là
          que les comparaisons deviennent trompeuses. Ce n&apos;est pas une
          résidence de standing avec conciergerie et vue mer : c&apos;est un
          immeuble récent, propre et bien tenu, dans un quartier résidentiel
          thaïlandais. Le mobilier est fourni, l&apos;électroménager fonctionne,
          la piscine est entretenue. Rien de luxueux, rien à redire non plus.
        </p>
        <p className="mb-4">
          C&apos;est exactement le segment que les blogs ignorent. On vous montre
          soit des villas à 2 000 € pour vendre du rêve, soit des chambres à
          150 € pour prouver qu&apos;on peut vivre de rien. La réalité de
          l&apos;expatrié qui travaille, c&apos;est ce milieu de gamme-là — et à
          Phuket, en 2026, il est redevenu accessible.
        </p>

        <figure className="my-8">
          <Image
            src="/images/blog/ou-vivre-phuket-kathu-chambre.jpg"
            alt="Chambre de mon condo de 30 m² à Kathu, Phuket — ce que loue un expatrié sous visa DTV pour 300 € par mois"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Mes 30 m² à Kathu : meublé, climatisé, internet et accès piscine
            compris, pour 11 150 THB par mois. C&apos;est le vrai visage du
            milieu de gamme à Phuket en 2026 — ni villa de rêve, ni chambre
            spartiate.
          </figcaption>
        </figure>
        <p className="mb-4">
          Et voici le détail que personne ne documente :{' '}
          <strong className="text-white">les prix ont baissé sur un an.</strong>
        </p>

        <div className="border-l-4 border-amber-500 bg-amber-500/5 rounded-r-xl p-5 mb-6">
          <p className="text-amber-400 font-semibold text-sm mb-2">
            Encadré terrain — La baisse des loyers à Phuket
          </p>
          <p className="text-gray-300 text-sm">
            Quand j&apos;ai emménagé le 1er août 2025, un logement comme le mien
            se louait entre 12 000 et 13 000 THB. Aujourd&apos;hui, le même type
            de bien est descendu à 10 000–11 000 THB. À mon renouvellement pour
            12 mois, j&apos;ai négocié 1 000 THB de réduction supplémentaire. La
            cause probable : le tri effectué par l&apos;immigration en 2026 a
            réduit la demande, et les loyers ont suivi.
          </p>
        </div>

        <p className="mb-4">
          Côté transport, j&apos;ai acheté un Forza 350 neuf dès mon arrivée —
          4 800 € — avec une assurance tous risques à 5 200 THB par an. Pour la
          vie courante (sorties, livraisons, courses, essence), je compte
          environ <strong className="text-white">500 € par mois</strong>. Pour
          gérer ce budget au quotidien sans compte bancaire local, découvrez{' '}
          <Link
            href="/blog/paiement-thailande-sans-compte-bancaire-visa-dtv"
            className="text-amber-500 hover:underline"
          >
            notre stratégie de paiement complète
          </Link>
          .
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          L&apos;ambiance à Kathu
        </h3>
        <p className="mb-4">
          Ce qui me plaît, c&apos;est que mon quartier est habité par des gens
          qui vivent ici à l&apos;année, pas par des touristes de passage.
          C&apos;est calme, propre, paisible. Je suis assez loin de la route
          pour n&apos;entendre que le murmure lointain des moteurs. Le bâtiment
          n&apos;est pas neuf mais très correct, et il y a tout ce qu&apos;il
          faut.
        </p>
        <p className="mb-4">
          La livraison fonctionne à toute heure du jour et de la nuit —
          d&apos;une praticité redoutable. Nourriture, courses, à peu près tout
          ce que vous voulez.
        </p>
        <p className="mb-4">
          Ce qui m&apos;agace ? Les étrangers qui ne respectent pas les règles
          et se permettent ici ce qu&apos;ils ne feraient jamais chez eux. Bonne
          nouvelle : avec le tri de l&apos;immigration cette année, il y a
          nettement moins de monde de ce genre.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          Pour qui Phuket est le bon choix
        </h3>
        <p className="mb-4">
          Phuket est fait pour quelqu&apos;un d&apos;
          <strong className="text-white">
            indépendant, qui travaille sur son ordinateur, entre 20 et 50 ans
          </strong>
          , qui veut expédier ses tâches rapidement puis profiter à fond.
        </p>
        <p className="mb-4">
          Vous avez la tranquillité de quartiers comme Kathu, Kata, Kalim ou
          Karon, et en même temps la vie nocturne de Patong juste à côté quand
          l&apos;envie vient. Des paysages magnifiques, une île entière à
          explorer, et le confort d&apos;une infrastructure complète.
        </p>
        <p>
          En dessous de 20 ans, c&apos;est trop tôt. Au-dessus de 50, on
          penchera plutôt vers Hua Hin.
        </p>
      </section>

      {/* ── SECTION 2 : PATTAYA ── */}
      <section className="mb-12">
        <h2
          id="pattaya"
          className="text-2xl font-bold text-white mb-4 scroll-mt-24"
        >
          2. Pattaya — le meilleur rapport qualité-prix, sans filtre
        </h2>
        <p className="mb-4">
          Pour Pattaya, je laisse la parole à mon ami, qui y vit et connaît la
          ville de l&apos;intérieur.
        </p>

        <figure className="my-8">
          <Image
            src="/images/blog/ou-vivre-pattaya-front-de-mer.jpg"
            alt="Front de mer de Pattaya au crépuscule, avec les tours de condos le long de la baie"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Pattaya concentre le meilleur rapport surface-prix du pays, à deux
            heures de Bangkok.
          </figcaption>
        </figure>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          Son logement, ses prix
        </h3>
        <p className="mb-4">
          Un studio de 30 m² dans la province de Chonburi : cuisine,
          climatisation, frigo, micro-ondes, bouilloire, TV, wifi, piscine. Le
          tout pour{' '}
          <strong className="text-white">
            5 500 THB sur un bail de 6 mois, ou 5 000 THB sur un an
          </strong>
          .
        </p>
        <p className="mb-4">
          On trouve facilement à se loger, et les prix varient selon les
          saisons.
        </p>
        <p className="mb-4">
          Son budget mensuel tout compris tourne entre{' '}
          <strong className="text-white">800 et 1 000 €</strong>. Son analyse
          est directe : ce qui coûte cher à Pattaya, ce sont les sorties et la
          fête — l&apos;alcool et la vie nocturne font grimper l&apos;addition
          très vite. En revanche, la nourriture, les massages, la plage et les
          excursions sont bon marché.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          Les transports
        </h3>
        <p className="mb-4">
          La location d&apos;un scooter va de{' '}
          <strong className="text-white">3 000 à 10 000 THB par mois</strong>{' '}
          selon le modèle, la période et le loueur. Sinon, Grab et Bolt
          fonctionnent bien.
        </p>
        <p className="mb-4">
          Selon l&apos;emplacement de votre logement, on peut tout à fait vivre
          sans véhicule à Pattaya. Mais attention : si vous prenez un taxi
          toutes les cinq minutes, la note grimpe vite. Le scooter reste la
          liberté totale pour explorer les environs.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          Le quotidien vu de l&apos;intérieur
        </h3>
        <p className="mb-4">
          Au-delà du cliché « ville de la nuit », mon ami décrit une tout autre
          réalité. Il vit vers le quartier musulman, dans un coin très calme,
          loin des bars.
        </p>

        <div className="border-l-4 border-sky-400 bg-sky-500/5 rounded-r-xl p-5 mb-6">
          <p className="text-sky-400 font-semibold text-sm mb-2">
            Témoignage — Une journée type à Pattaya
          </p>
          <p className="text-gray-300 text-sm italic">
            « Un petit jus bien frais, un déjeuner avec une belle vue sur la
            mer, éventuellement une balade pour découvrir les bons spots,
            ensuite un bon massage, puis une petite balade et tu rentres. Le
            quartier où je vis est très calme, loin des bars. Les livraisons
            c&apos;est pareil, encore plus facile — c&apos;est la Thaïlande. »
          </p>
        </div>

        <p className="mb-4">
          Son verdict : le gros avantage de Pattaya, ce sont{' '}
          <strong className="text-white">
            les prix bas, l&apos;ambiance, et le concentré de toutes les régions
            de Thaïlande en un seul endroit.
          </strong>{' '}
          Les alternatives autour sont superbes — toutes les îles voisines
          valent le détour.
        </p>
        <p className="mb-4">
          Autre point qu&apos;il souligne : la police est moins présente
          qu&apos;à Phuket, ce qu&apos;il considère comme un vrai plus, même
          s&apos;il note quelques endroits à éviter pour les contrôles. La
          saison des pluies y est clémente : peu d&apos;inondations, et la pluie
          cesse vite.
        </p>
        <p className="mb-4">
          Les moins ?{' '}
          <strong className="text-white">
            La mer est moins propre, et la vue n&apos;a rien de comparable à
            Phuket.
          </strong>{' '}
          C&apos;est le compromis à accepter.
        </p>
        <p className="mb-4">
          Côté vie sociale, il y a une communauté d&apos;expatriés et il est
          facile de rencontrer du monde — même si lui, personnellement, préfère
          esquiver. On trouve de tout : des gens de passage et d&apos;autres
          installés à l&apos;année.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          Pour qui Pattaya est le bon choix
        </h3>
        <p className="mb-4">
          Pattaya, c&apos;est pour tous les goûts — c&apos;est précisément sa
          force. Le meilleur rapport qualité-prix de ce comparatif, une ambiance
          variée où chacun trouve son bonheur selon les quartiers, et un accès
          facile aux îles comme à Bangkok.
        </p>
        <p className="mb-4">
          Idéal pour qui privilégie le budget et la diversité à la beauté brute
          des paysages.
        </p>
        <p>
          Son mot de la fin : « Pour l&apos;instant je suis bien à Pattaya, je
          reste ici, et si j&apos;ai envie je peux partir ailleurs et revenir
          tranquille. » Mention spéciale pour{' '}
          <strong className="text-white">Jomtien</strong>, sa partie préférée —
          plus résidentielle et apaisée. Un condo équivalent au mien à Phuket
          s&apos;y trouve autour de 9 000 THB.
        </p>
      </section>

      {/* ── SECTION 3 : BANGKOK ── */}
      <section className="mb-12">
        <h2
          id="bangkok"
          className="text-2xl font-bold text-white mb-4 scroll-mt-24"
        >
          3. Bangkok — la métropole qu&apos;on aime ou qu&apos;on fuit
        </h2>
        <p className="mb-4">
          Bangkok, c&apos;est le cœur battant du pays : capitale économique, hub
          international, et la seule ville de Thaïlande dotée d&apos;une
          infrastructure de niveau mondial.
        </p>

        <figure className="my-8">
          <Image
            src="/images/blog/ou-vivre-bangkok-skyline.jpg"
            alt="Vue sur les gratte-ciels de Bangkok depuis un condo, avec le BTS Skytrain — la ville la plus chère du comparatif"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Bangkok est la seule ville du pays avec une infrastructure de niveau
            mondial. Ça se paie.
          </figcaption>
        </figure>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          Le budget réel en 2026
        </h3>
        <p className="mb-4">
          C&apos;est la ville la plus chère de ce comparatif. Comptez{' '}
          <strong className="text-white">45 000 à 75 000 THB par mois</strong>{' '}
          pour une personne seule vivant confortablement, et 55 000 à 75 000 THB
          pour un couple.
        </p>
        <p className="mb-4">
          Les loyers varient énormément selon le quartier : un studio en
          périphérie proche d&apos;une station de métro peut se trouver autour
          de 12 000 THB, tandis qu&apos;un condo moderne dans le centre —
          Sukhumvit, Silom, Sathorn — monte facilement à 25 000–40 000 THB. La
          règle est simple : chaque station de métro qui vous rapproche du
          centre fait grimper le loyer.
        </p>
        <p className="mb-4">
          Pour les familles, le poste le plus lourd reste l&apos;école
          internationale — de{' '}
          <strong className="text-white">300 000 à 900 000 THB par an</strong>{' '}
          selon l&apos;établissement, avec les institutions les plus réputées du
          pays comme NIST ou l&apos;ISB.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          Ce que Bangkok offre et que personne d&apos;autre n&apos;a
        </h3>
        <p className="mb-4">
          Le réseau BTS et MRT est le seul vrai métro de Thaïlande, et il change
          radicalement le quotidien : pas besoin de véhicule, pas de galère de
          stationnement, et vous traversez la ville en évitant totalement les
          embouteillages. C&apos;est un avantage énorme que ni Phuket, ni
          Pattaya, ni Hua Hin ne peuvent offrir.
        </p>
        <p className="mb-4">
          Côté santé, Bangkok concentre les meilleurs hôpitaux du pays —
          Bumrungrad, Samitivej, Bangkok Hospital — qui attirent des patients de
          toute l&apos;Asie. Pour quelqu&apos;un avec un suivi médical
          particulier, c&apos;est un argument décisif.
        </p>
        <p className="mb-4">
          Ajoutez à cela une scène gastronomique inépuisable, du street food à
          50 THB aux tables étoilées, des centres commerciaux gigantesques, une
          vie culturelle riche, et l&apos;aéroport international qui vous met à
          quelques heures de toute l&apos;Asie.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          Mon impression, en toute honnêteté
        </h3>
        <p className="mb-4">
          Je l&apos;assume : je n&apos;ai pas accroché. J&apos;ai détesté le
          trafic — et à Phuket je suis pourtant habitué à circuler en scooter.
          Il y a énormément de routes en travaux, on s&apos;oriente
          difficilement, et la ville est immense au point de devenir écrasante.
          C&apos;est trop « ville-ville » à mon goût, et je n&apos;y retrouve
          pas ce qui me fait aimer la Thaïlande au quotidien.
        </p>
        <p className="mb-4">
          Mais je comprends totalement qu&apos;on puisse en tomber amoureux.
          Bangkok a une énergie permanente, une modernité et une profondeur
          culturelle qu&apos;aucune autre ville thaïlandaise n&apos;approche.
          C&apos;est une question de tempérament, pas de qualité.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          Pour qui Bangkok est le bon choix
        </h3>
        <p className="mb-4">
          Les amoureux de la vie urbaine, ceux qui ont besoin
          d&apos;opportunités professionnelles ou de contacts d&apos;affaires,
          les familles cherchant les meilleures écoles internationales, et toute
          personne pour qui le métro et l&apos;accès aux soins de pointe pèsent
          plus que la mer et le calme.
        </p>
        <p>
          Si vous fuyez le béton, les embouteillages et la densité, passez votre
          chemin — vous serez plus heureux ailleurs.
        </p>
      </section>

      {/* ── SECTION 4 : HUA HIN ── */}
      <section className="mb-12">
        <h2
          id="huahin"
          className="text-2xl font-bold text-white mb-4 scroll-mt-24"
        >
          4. Hua Hin — la douceur de vivre balnéaire
        </h2>
        <p className="mb-4">
          Hua Hin est la ville de ce comparatif dont on parle le moins, et
          c&apos;est peut-être injuste. Station balnéaire historique de la
          famille royale thaïlandaise, à trois heures au sud de Bangkok, elle
          cultive une élégance tranquille qui séduit durablement ceux qui
          s&apos;y installent.
        </p>

        <figure className="my-8">
          <Image
            src="/images/blog/ou-vivre-huahin-plage.jpg"
            alt="Plage et jetée de Hua Hin au lever du soleil — la station balnéaire historique de la famille royale thaïlandaise"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            À trois heures au sud de Bangkok, Hua Hin cultive une élégance
            tranquille qu&apos;on sous-estime.
          </figcaption>
        </figure>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          Mon impression de séjour
        </h3>
        <p className="mb-4">
          J&apos;y ai dormi et j&apos;ai adoré. C&apos;est très tranquille,
          joli, avec une ambiance qui m&apos;a évoqué une petite ville
          d&apos;Italie : des restaurants charmants, une atmosphère apaisée, une
          belle plage bien fréquentée. On y croise beaucoup de retraités
          anglais, et l&apos;ensemble dégage une sensation de sécurité et de
          propreté qu&apos;on ne trouve pas partout.
        </p>
        <p className="mb-4">
          Ce n&apos;est pas ma ville aujourd&apos;hui — je suis bien à Phuket —
          mais c&apos;est clairement un endroit qui ne me laisse pas
          indifférent.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          Le budget 2026
        </h3>
        <p className="mb-4">
          Hua Hin est environ{' '}
          <strong className="text-white">9 % moins chère que Bangkok</strong>.
          Les loyers sont doux : un studio près de Khao Takiab se trouve entre
          10 000 et 15 000 THB, un condo deux chambres avec piscine entre 12 000
          et 25 000 THB. Il est même possible de louer une maison entière pour
          le prix d&apos;un studio bangkokien. Les villas avec piscine en ville
          tournent autour de 20 000–40 000 THB.
        </p>
        <p className="mb-4">
          Pour un jeune actif en télétravail, un budget mensuel de{' '}
          <strong className="text-white">30 000 à 40 000 THB</strong> suffit
          largement. Pour un couple vivant confortablement, comptez 50 000 à
          70 000 THB tout compris.
        </p>
        <p className="mb-4">
          Les charges sont modestes : électricité entre 2 000 et 2 800 THB en
          condo selon l&apos;usage de la climatisation, eau autour de 300–400
          THB, et fibre optique à 600–800 THB par mois. Une consultation chez un
          généraliste privé à Bangkok Hospital Hua Hin coûte 800 à 1 500 THB, un
          repas local 60–120 THB, un dîner occidental 250–500 THB.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          Le vrai atout : la marchabilité
        </h3>
        <p className="mb-4">
          C&apos;est une rareté en Thaïlande, et ça mérite d&apos;être souligné
          : <strong className="text-white">Hua Hin se parcourt à pied.</strong>{' '}
          Le centre regroupe condos, centres commerciaux, marchés de nuit et
          plage à distance de marche.
        </p>
        <p className="mb-4">
          Les songthaews circulent le long de Phet Kasem Road pour 10 à 20 THB,
          Grab et Bolt fonctionnent bien. On peut y vivre sans véhicule —
          impensable à Phuket.
        </p>
        <p className="mb-4">
          Côté santé, Bangkok Hospital Hua Hin est l&apos;établissement de
          référence pour les expatriés, avec une extension majeure achevée début
          2026, et San Paulo Hospital offre une alternative privée plus
          abordable.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          La communauté et le rythme de vie
        </h3>
        <p className="mb-4">
          Pour une ville balnéaire de cette taille, la communauté expatriée est
          étonnamment grande — les groupes Facebook locaux comptent des dizaines
          de milliers de membres, ce qui rend l&apos;intégration sociale plus
          facile qu&apos;ailleurs.
        </p>
        <p className="mb-4">
          Golf, kitesurf, yoga, Muay Thaï, marchés de nuit et observation de la
          faune rythment le quotidien. La météo y est aussi plus clémente que
          sur beaucoup de côtes thaïlandaises.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          Les limites à connaître
        </h3>
        <p className="mb-4">
          La scène nocturne est réduite — c&apos;est un atout pour certains, un
          manque pour d&apos;autres. Les transports publics restent limités hors
          du centre. Les produits occidentaux coûtent plus cher qu&apos;à
          Bangkok.
        </p>
        <p className="mb-4">
          Et surtout, Hua Hin peut sembler{' '}
          <strong className="text-white">trop calme, voire prévisible</strong>,
          si vous cherchez de l&apos;intensité. La ville est aussi assez étendue
          dès qu&apos;on sort du centre, ce qui pousse beaucoup de résidents à
          finir par prendre un scooter ou une voiture.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          Pour qui Hua Hin est le bon choix
        </h3>
        <p className="mb-4">
          Les retraités, les familles, et tous ceux qui cherchent un cadre
          balnéaire paisible avec de vraies infrastructures modernes — hôpitaux,
          écoles internationales, fibre, commerces.
        </p>
        <p>
          C&apos;est précisément le profil qui se sentirait à l&apos;étroit dans
          l&apos;intensité de Phuket ou Bangkok. Si vous avez passé 50 ans et
          que vous cherchez la douceur plutôt que l&apos;adrénaline, Hua Hin est
          probablement votre ville.
        </p>
      </section>

      {/* ── SECTION 5 : TABLEAU COMPARATIF ── */}
      <section className="mb-12">
        <h2
          id="comparatif"
          className="text-2xl font-bold text-white mb-6 scroll-mt-24"
        >
          5. Le comparatif en un coup d&apos;œil
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-gray-800 mb-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#111111] border-b border-gray-800">
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">
                  Ville
                </th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">
                  Loyer
                </th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold hidden md:table-cell">
                  Budget
                </th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold hidden lg:table-cell">
                  Ambiance
                </th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold hidden lg:table-cell">
                  Transport
                </th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold hidden xl:table-cell">
                  Santé
                </th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">
                  Profil idéal
                </th>
              </tr>
            </thead>
            <tbody>
              {villes.map((v, i) => (
                <tr
                  key={v.ville}
                  className={`border-b border-gray-800/60 ${
                    i % 2 === 0 ? 'bg-[#0d0d0d]' : 'bg-[#0a0a0a]'
                  }`}
                >
                  <td className="px-4 py-3 text-white font-semibold">
                    {v.ville}
                  </td>
                  <td className="px-4 py-3 text-gray-300">{v.loyer}</td>
                  <td className="px-4 py-3 text-gray-400 hidden md:table-cell">
                    {v.budget}
                  </td>
                  <td className="px-4 py-3 text-gray-400 hidden lg:table-cell">
                    {v.ambiance}
                  </td>
                  <td className="px-4 py-3 text-gray-400 hidden lg:table-cell">
                    {v.transport}
                  </td>
                  <td className="px-4 py-3 text-gray-400 hidden xl:table-cell">
                    {v.sante}
                  </td>
                  <td className="px-4 py-3 text-gray-300">{v.profil}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-600 italic mt-2 mb-6">
          * Données terrain et sources 2026. Les loyers indiqués correspondent à
          un studio ou condo une chambre.
        </p>
      </section>

      {/* ── SECTION 6 : VERDICT ── */}
      <section className="mb-14">
        <h2
          id="verdict"
          className="text-2xl font-bold text-white mb-4 scroll-mt-24"
        >
          6. Alors, où vivre en Thaïlande en 2026 ?
        </h2>
        <p className="mb-4">
          Il n&apos;y a pas de meilleure ville — il y a la ville qui vous
          correspond.
        </p>

        <figure className="my-8">
          <Image
            src="/images/blog/ou-vivre-choisir-sa-ville.jpg"
            alt="Valise et passeport sur un balcon face à une ville thaïlandaise — choisir où s'installer avec un visa DTV"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Il n&apos;y a pas de meilleure ville. Il y a celle qui correspond à
            votre rythme et à votre budget.
          </figcaption>
        </figure>
        <ul className="space-y-3 mb-6 list-none pl-0">
          <li className="flex items-start gap-3">
            <span className="text-amber-500 mt-1 flex-none">→</span>
            <span>
              <strong className="text-white">Phuket</strong> si vous voulez la
              beauté, la tranquillité résidentielle et la fête à portée de main,
              et que vous avez le budget d&apos;une île. Bonus 2026 : les prix
              ont baissé.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-amber-500 mt-1 flex-none">→</span>
            <span>
              <strong className="text-white">Pattaya</strong> si le budget
              prime, si vous aimez la diversité et l&apos;accès facile à tout,
              et que vous acceptez une mer moins photogénique.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-amber-500 mt-1 flex-none">→</span>
            <span>
              <strong className="text-white">Bangkok</strong> si vous vibrez
              pour l&apos;énergie urbaine, les opportunités et le confort
              métropolitain absolu.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-amber-500 mt-1 flex-none">→</span>
            <span>
              <strong className="text-white">Hua Hin</strong> si vous cherchez
              la douceur, le calme balnéaire et un cadre familial ou paisible
              pour la retraite.
            </span>
          </li>
        </ul>
        <p className="mb-4">
          Le vrai conseil : si vous le pouvez,{' '}
          <strong className="text-white">
            passez quelques semaines dans deux ou trois de ces villes avant de
            vous engager sur un bail annuel.
          </strong>{' '}
          Ce qui se lit sur le papier ne remplace jamais la sensation d&apos;un
          quartier au réveil.
        </p>
        <p>
          Et avec un{' '}
          <Link
            href="/blog/fonds-bancaires-visa-dtv"
            className="text-amber-500 hover:underline"
          >
            Visa DTV
          </Link>{' '}
          qui vous offre 5 ans de liberté et des entrées multiples, vous avez
          tout le temps de trouver votre place. Pour bien préparer votre
          atterrissage, consultez aussi{' '}
          <Link
            href="/blog/arrivee-thailande-aeroport-immigration-taxi-visa-dtv"
            className="text-amber-500 hover:underline"
          >
            notre guide complet de l&apos;arrivée à l&apos;aéroport
          </Link>
          .
        </p>
      </section>

      {/* ── ENCART AUTEUR (E-E-A-T) ── */}
      <div className="my-14 bg-[#111111] border border-gray-800 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-6 shadow-lg">
        <div className="w-24 h-24 rounded-full bg-gray-800 flex-shrink-0 overflow-hidden border-2 border-amber-500/50">
          <div className="w-full h-full bg-gradient-to-br from-amber-500/20 to-emerald-500/20 flex items-center justify-center text-3xl">
            🇹🇭
          </div>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-1">
            Matthieu Moretti
          </h3>
          <p className="text-amber-500 text-xs font-semibold mb-3 uppercase tracking-wider">
            Expertise Visa DTV &amp; Terrain
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Entrepreneur digital installé à Phuket, j&apos;accompagne les
            freelances et porteurs de projet dans leur installation en
            Thaïlande. Mon objectif : vous éviter les pièges administratifs
            grâce à une expertise forgée directement sur le terrain, au contact
            des réalités de l&apos;immigration.
          </p>
        </div>
      </div>

      {/* ── FAQ ── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white mb-6">
          FAQ — Vivre en Thaïlande en 2026
        </h2>

        <div className="space-y-4">
          {faqSchema.mainEntity.map((item) => (
            <details
              key={item.name}
              className="group border border-gray-800 rounded-xl overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none bg-[#111111] hover:bg-[#161616] transition-colors">
                <span className="text-white font-semibold text-sm">
                  {item.name}
                </span>
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
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#F59E0B] opacity-10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500 opacity-5 rounded-full blur-3xl pointer-events-none" />

        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 relative z-10">
          Un projet d&apos;installation en Thaïlande ?
        </h3>
        <p className="text-gray-400 mb-8 relative z-10 text-sm md:text-base">
          Avant de choisir votre ville, assurez-vous d&apos;avoir le bon visa.
          Le DTV vous offre 5 ans de liberté pour explorer et vous installer où
          vous voulez. Vérifions ensemble votre éligibilité.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 relative z-10">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-white text-black font-bold text-sm py-4 px-7 rounded-full hover:bg-gray-100 active:scale-95 transition-all duration-300"
          >
            Vérifier mon éligibilité — 2 min
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center bg-transparent text-white font-semibold text-sm py-4 px-7 rounded-full border border-gray-700 hover:border-gray-500 hover:bg-white/5 transition-all duration-300"
          >
            Voir tous nos guides
          </Link>
        </div>
      </div>

      <BlogNavigation variant="article-bottom" />
    </article>
  );
}