import React from 'react';
import BlogNavigation from '../../components/BlogNavigation';
import { createBreadcrumbSchema, getBlogPost } from '../posts';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 600; // Revalidation ISR toutes les 10 minutes

const post = getBlogPost('20000-thb-immigration-thailande-regle-especes');
const breadcrumbSchema = createBreadcrumbSchema(post);

// ─── MÉTADONNÉES SEO DE L’ARTICLE ───
export const metadata: Metadata = {
  title: "20 000 bahts à l'immigration thaïlandaise : la loi oubliée (2026)",
  description: "Des voyageurs refoulés faute de 20 000 THB en espèces à l'immigration thaïlandaise. La loi, les profils ciblés, le tampon de refus : le guide terrain complet 2026.",
  alternates: {
    canonical: 'https://dtv-thailande.fr/blog/20000-thb-immigration-thailande-regle-especes',
  },
  openGraph: {
    title: "20 000 bahts à l'immigration thaïlandaise : la loi oubliée qui refoule des voyageurs en 2026",
    description: "Des voyageurs refoulés faute de 20 000 THB en espèces à l'immigration thaïlandaise. La loi, les profils ciblés, le tampon de refus : le guide terrain complet 2026.",
    url: 'https://dtv-thailande.fr/blog/20000-thb-immigration-thailande-regle-especes',
    siteName: 'DTV Thaïlande',
    locale: 'fr_FR',
    type: 'article',
    images: [{ url: '/images/blog/20000-thb-immigration.jpg' }], 
  },
};

// ─── SCHEMA ARTICLE JSON-LD ───────────────────────────────────────────────────
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://dtv-thailande.fr/blog/20000-thb-immigration-thailande-regle-especes"
  },
  "headline": "20 000 bahts à l'immigration thaïlandaise : la loi oubliée qui refoule des voyageurs en 2026",
  "description": "Des voyageurs refoulés faute de 20 000 THB en espèces à l'immigration thaïlandaise. La loi, les profils ciblés, le tampon de refus : le guide terrain complet 2026.",
  "image": "https://dtv-thailande.fr/images/blog/20000-thb-immigration.jpg",  
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
  "datePublished": "2026-07-24T07:00:00Z",
  "dateModified": "2026-07-24T12:00:00Z"
};

// ─── SCHEMA FAQ JSON-LD ───────────────────────────────────────────────────────
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Combien faut-il avoir sur soi en entrant en Thaïlande ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "La référence appliquée par l'immigration est de 20 000 THB par personne (environ 520 €) et 40 000 THB par famille, en espèces ou devises équivalentes. Des euros en billets sont acceptés — l'agent évalue la contre-valeur.",
      },
    },
    {
      '@type': 'Question',
      name: "Le contrôle est-il systématique ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. Il est aléatoire et discrétionnaire. La majorité des voyageurs ne sera jamais contrôlée — je suis entré une vingtaine de fois par Phuket sans un seul contrôle. Mais les refus documentés se multiplient en 2026, particulièrement pour les profils visa run.",
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on montrer son application bancaire à la place des espèces ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. L'agent exige des espèces physiques. Votre solde Wise ou Revolut sur écran ne compte pas, et les ATM sont situés après le contrôle d'immigration.",
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on négocier avec l'agent en cas de contrôle raté ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Parfois, oui. Des voyageurs rapportent avoir pu retirer de l'argent ou finalement entrer en discutant calmement avec l'agent. Le point décisif : ne pas signer le document en thaï présenté avant le tampon de refus. Une fois signé, le refus devient automatique et irréversible. Demandez la traduction, proposez des solutions, restez courtois — tant que rien n'est signé, rien n'est joué.",
      },
    },
    {
      '@type': 'Question',
      name: "La règle s'applique-t-elle au Visa DTV ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Légalement oui : la section 12(2) de l'Immigration Act vise tout étranger à la frontière. En pratique, le profil DTV est nettement moins ciblé qu'un touriste en exemption de visa — mais le risque n'est pas nul. Gardez les espèces sur vous.",
      },
    },
    {
      '@type': 'Question',
      name: "Que se passe-t-il en cas de refus d'entrée ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "L'agent appose un tampon citant la section 12(2) avec la mention « entrée non autorisée », et vous êtes renvoyé vers votre point de départ — souvent le pays voisin pour un vol régional. Le tampon reste dans le passeport et augmente le risque de contrôle aux entrées suivantes. Un refus n'est pas une interdiction définitive : vous pouvez retenter.",
      },
    },
    {
      '@type': 'Question',
      name: "Un billet aller simple augmente-t-il le risque ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, nettement. L'absence de preuve de sortie est l'un des principaux déclencheurs de contrôle approfondi, ressources comprises. Prenez toujours un billet de continuation, même modifiable ou remboursable.",
      },
    }
  ],
};

export default function BlogArticleImmigration20000THB() {
  // Vérification de la date uniquement côté rendu (évite de bloquer le build global)
  if (typeof window === 'undefined') {
    if (!post || new Date(post.publishedAt) > new Date()) {
      notFound();
    }
  }

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
        <span className="inline-block bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
          Formalités · Immigration
        </span>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
          20 000 bahts à l&apos;immigration thaïlandaise :{' '}
          <span className="text-[#F59E0B]">la loi oubliée</span>{' '}
          qui refoule des voyageurs en 2026
        </h1>

        <p className="text-base text-gray-500 mt-4">
          Mis à jour en 2026 · Lecture : 8 min · Par{' '}
          <strong className="text-gray-400">Matthieu Moretti</strong>
        </p>
      </header>

      {/* ── INTRODUCTION ── */}
      <div className="text-lg text-gray-400 mb-12 space-y-5">
        <p>
          Refoulé à la frontière. Bloqué au Laos. Un tampon de refus dans le passeport. Voilà ce qui est arrivé cette semaine à un membre d&apos;un groupe Facebook d&apos;expatriés en Thaïlande — pas pour un problème de visa, pas pour un passeport expiré, mais faute d&apos;avoir pu présenter <strong className="text-white">20 000 bahts en espèces</strong> à l&apos;agent d&apos;immigration de Don Mueang.
        </p>
        <p>
          Ce n&apos;est pas un cas isolé. Dans les groupes de voyageurs francophones, la question revient tous les jours, et les témoignages de refus s&apos;accumulent depuis le début de l&apos;année. Le plus troublant : la plupart des voyageurs n&apos;ont jamais entendu parler de cette règle, car elle a été ignorée pendant des décennies.
        </p>
        <p className="text-white font-medium border-l-4 border-[#F59E0B] pl-5 py-1">
          Voici ce que dit vraiment la loi, qui se fait contrôler, ce qui se passe au guichet, et comment vous protéger — avec le contraste de mon expérience personnelle : une vingtaine d&apos;entrées en Thaïlande, et jamais un seul contrôle.
        </p>
      </div>

      {/* ── SOMMAIRE CLIQUABLE ── */}
      <nav className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 mb-12 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Sommaire de l&apos;article</h2>
        <ul className="space-y-3">
          <li><a href="#loi-1979" className="text-amber-500 hover:text-amber-400 hover:underline transition-colors text-sm md:text-base">1. Une loi de 1979 que personne n&apos;appliquait</a></li>
          <li><a href="#au-guichet" className="text-amber-500 hover:text-amber-400 hover:underline transition-colors text-sm md:text-base">2. Ce qui se passe vraiment au guichet</a></li>
          <li><a href="#tampon-refus" className="text-amber-500 hover:text-amber-400 hover:underline transition-colors text-sm md:text-base">3. Le tampon de refus : ce qu&apos;il signifie vraiment</a></li>
          <li><a href="#especes-obligatoires" className="text-amber-500 hover:text-amber-400 hover:underline transition-colors text-sm md:text-base">4. Espèces obligatoires — la carte bancaire ne compte pas</a></li>
          <li><a href="#piege-atm" className="text-amber-500 hover:text-amber-400 hover:underline transition-colors text-sm md:text-base">5. Le piège des ATM : ils sont après la douane</a></li>
          <li><a href="#visa-dtv" className="text-amber-500 hover:text-amber-400 hover:underline transition-colors text-sm md:text-base">6. Le Visa DTV est-il concerné ?</a></li>
          <li><a href="#profils-cibles" className="text-amber-500 hover:text-amber-400 hover:underline transition-colors text-sm md:text-base">7. Les profils que l&apos;immigration cible en priorité</a></li>
          <li><a href="#checklist" className="text-amber-500 hover:text-amber-400 hover:underline transition-colors text-sm md:text-base">8. La checklist avant de prendre l&apos;avion</a></li>
        </ul>
      </nav>

      {/* ── SECTION 1 ── */}
      <section className="mb-12">
        <h2 id="loi-1979" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          1. Une loi de 1979 que personne n&apos;appliquait
        </h2>
        <p className="mb-4">
          La règle des 20 000 bahts n&apos;a rien de nouveau. Elle repose sur l&apos;Immigration Act B.E. 2522, la grande loi thaïlandaise sur l&apos;immigration promulguée en 1979 — il y a 47 ans. Sa section 12(2) autorise les agents à refuser l&apos;entrée à tout étranger qui ne dispose pas de « moyens de subsistance appropriés » pour son séjour.
        </p>
        <p className="mb-4">
          Les montants de référence appliqués par l&apos;immigration : <strong className="text-white">20 000 THB par personne (environ 520 €)</strong> et 40 000 THB par famille, en espèces ou équivalent.
        </p>
        <p className="mb-4">
          Pendant des années, cette règle a dormi dans les textes. Les agents ne la vérifiaient quasiment jamais. Des millions de voyageurs sont entrés en Thaïlande sans que personne ne leur demande de montrer le moindre billet.
        </p>
        <div className="p-5 bg-white/3 border border-gray-800 rounded-xl my-6">
          <p className="text-white font-semibold mb-2">Ce qui a changé en 2026 :</p>
          <p className="text-gray-400 text-sm">
            La Thaïlande resserre le filtrage des profils jugés indésirables — les « mauvais touristes » qui enchaînent les entrées sans ressources, travaillent illégalement ou vivent d&apos;expédients. Plutôt que de créer une nouvelle loi, l&apos;immigration a réactivé celle qui existait déjà. C&apos;est légal, c&apos;est ancien, et c&apos;est appliqué de manière totalement discrétionnaire.
          </p>
        </div>
      </section>

      {/* ── SECTION 2 ── */}
      <section className="mb-12">
        <h2 id="au-guichet" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          2. Ce qui se passe vraiment au guichet
        </h2>
        <p className="mb-4">
          Soyons précis, car c&apos;est là que les fantasmes circulent. Le contrôle des 20 000 bahts n&apos;est pas systématique. Il est aléatoire, à la discrétion de l&apos;agent, et déclenché par le profil du voyageur.
        </p>
        <p className="mb-4">
          <strong className="text-white">Concrètement, quand un agent décide de vérifier :</strong> il vous demande de présenter vos moyens de subsistance. Vous sortez les billets, il les compte — ou vous demande de les compter devant lui. Si la somme y est, vous passez. Si elle n&apos;y est pas, il peut vous laisser passer quand même... ou appliquer la section 12(2) et refuser l&apos;entrée. C&apos;est son pouvoir discrétionnaire, et il n&apos;a pas à se justifier.
        </p>
        <p className="mb-4">
          Le témoignage de cette semaine est parlant : un voyageur francophone, membre de longue date d&apos;un groupe d&apos;entraide, refoulé à Don Mueang faute de pouvoir présenter la somme. Renvoyé au Laos, où il attend plusieurs jours avant de retenter l&apos;entrée. Il précise un détail que peu de gens connaissent : en zone de rétention, le téléphone reste autorisé — mais l&apos;expérience, écrit-il, reste « très désagréable ».
        </p>
        <p>
          Trois autres refus ont été documentés ces dernières semaines sur le même groupe. Deux questions par jour en moyenne sur le sujet. La règle dormante est bien réveillée.
        </p>
      </section>

      {/* ── SECTION 3 ── */}
      <section className="mb-12">
        <h2 id="tampon-refus" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          3. Le tampon de refus : ce qu&apos;il signifie vraiment
        </h2>
        <p className="mb-4">
          Quand l&apos;entrée est refusée, l&apos;agent appose un tampon dans le passeport. Le voyageur refoulé cette semaine a publié le sien en demandant sa signification — le tampon est entièrement en thaï. Voici la traduction.
        </p>
        
        <div className="bg-[#111111] border border-gray-800 p-6 rounded-xl my-6 font-mono text-sm">
          <p className="text-amber-400 mb-2">Le tampon indique :</p>
          <p className="text-white mb-2 text-lg">« ไม่มีปัจจัยยังชีพตามควรแก่กรณี »</p>
          <p className="text-gray-400 mb-4">— « ne dispose pas de moyens de subsistance appropriés » — et cite la section 12(2) de l&apos;Immigration Act B.E. 2522.</p>
          <p className="text-gray-400">Suivi de la mention : « entrée dans le Royaume non autorisée », avec la signature de l&apos;agent et la date.</p>
        </div>

        <p className="mb-4">
          <strong className="text-white">Pourquoi c&apos;est important :</strong> ce tampon reste dans votre passeport. À chaque entrée future, l&apos;agent qui feuillette vos pages le verra. Un refus antérieur pour insuffisance de ressources augmente mécaniquement la probabilité d&apos;être recontrôlé — et scruté de plus près. C&apos;est une trace permanente qu&apos;il faut éviter à tout prix.
        </p>

        <h3 className="text-xl font-bold text-red-400 mt-8 mb-4">Le détail crucial que les refoulés découvrent trop tard : le papier à signer.</h3>
        <div className="border-l-4 border-red-500 pl-5 py-2 mb-6">
          <p className="mb-3 text-gray-300">
            Avant d&apos;apposer le tampon de refus, l&apos;agent présente un document — entièrement rédigé en thaï — qu&apos;il vous demande de cocher et signer. Ce document est une reconnaissance formelle du motif de refus. Une fois signé, l&apos;agent est tenu de procéder : le tampon devient inévitable.
          </p>
          <p className="text-gray-300">
            Or plusieurs témoignages de voyageurs racontent la même chose : ceux qui ont refusé de signer immédiatement et ont engagé la discussion avec l&apos;agent ont parfois pu débloquer la situation. Certains ont été autorisés à aller retirer de l&apos;argent, d&apos;autres ont finalement pu entrer après avoir présenté des garanties (réservation d&apos;hôtel, billet de sortie, contact sur place).
          </p>
        </div>

        <p className="mb-4">
          <strong className="text-amber-400">La leçon terrain :</strong> ne cochez rien, ne signez rien dans la précipitation. Vous avez le droit de demander ce que contient le document, de demander un interprète, et de proposer des solutions à l&apos;agent — aller retirer de l&apos;argent, faire venir quelqu&apos;un, montrer d&apos;autres garanties. Tant que rien n&apos;est signé, la discussion reste ouverte. Une fois le papier signé, elle est close et le tampon tombe.
        </p>
        <p className="mb-4">
          Restez calme et courtois — l&apos;agent a le pouvoir discrétionnaire, et l&apos;agressivité ferme toutes les portes. Mais ne confondez pas courtoisie et précipitation à signer un document que vous ne comprenez pas.
        </p>
        <p>
          Un refus d&apos;entrée n&apos;est pas une interdiction de territoire : vous pouvez retenter, comme le fait ce voyageur depuis le Laos. Mais chaque tentative avec ce tampon devient plus délicate.
        </p>
      </section>

      {/* ── SECTION 4 ── */}
      <section className="mb-12">
        <h2 id="especes-obligatoires" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          4. Espèces obligatoires — la carte bancaire ne compte pas
        </h2>
        <p className="mb-4">
          C&apos;est le point que beaucoup découvrent trop tard : au guichet d&apos;immigration, seuls les billets comptent. Votre solde Wise, votre carte Revolut, votre application bancaire affichant 15 000 € — l&apos;agent n&apos;en tient pas compte. La règle vise des espèces (bahts ou devises équivalentes) que vous pouvez présenter physiquement.
        </p>
        <p>
          Des euros font l&apos;affaire : 520 € en billets couvrent l&apos;équivalent des 20 000 THB. Pas besoin d&apos;avoir des bahts spécifiquement — l&apos;agent évalue la contre-valeur.
        </p>
      </section>

      {/* ── SECTION 5 ── */}
      <section className="mb-12">
        <h2 id="piege-atm" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          5. Le piège des ATM : ils sont après la douane
        </h2>
        <p className="mb-4">
          Voici l&apos;ironie cruelle de la situation : dans les aéroports thaïlandais, les distributeurs automatiques sont situés après le contrôle d&apos;immigration, dans la zone des arrivées. Impossible donc de retirer sur place les espèces qu&apos;on vous demande de présenter avant de passer.
        </p>
        <p className="mb-4">
          Et depuis 2026, le problème s&apos;aggrave pour les utilisateurs de Wise : les comptes enregistrés avec une adresse thaïlandaise ne peuvent plus retirer aux ATM en Thaïlande du tout — une restriction réglementaire de la Banque de Thaïlande que nous détaillons dans notre{' '}
          <Link href="/blog/paiement-thailande-sans-compte-bancaire-visa-dtv" className="text-amber-500 hover:underline">
            guide des paiements en Thaïlande avec un visa DTV
          </Link>.
        </p>
        <div className="bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-xl my-6">
          <p className="text-emerald-400 font-bold mb-2">La seule stratégie fiable :</p>
          <p className="text-gray-300 text-sm">
            Partir de France avec les espèces sur soi. Vous pouvez transporter légalement jusqu&apos;à l&apos;équivalent de 20 000 USD sans déclaration douanière. Ma recommandation terrain : 1 000 à 2 000 € en billets, dans le bagage cabine, jamais en soute.
          </p>
        </div>
      </section>

      {/* ── SECTION 6 ── */}
      <section className="mb-12">
        <h2 id="visa-dtv" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          6. Le Visa DTV est-il concerné ?
        </h2>
        <p className="mb-4">
          Question légitime : le dossier DTV exige déjà une preuve de 500 000 THB d&apos;épargne. L&apos;immigration peut-elle encore vous demander 20 000 THB en espèces à l&apos;entrée ?
        </p>
        <p className="mb-4">
          <strong className="text-white">Réponse : oui, légalement.</strong> La section 12(2) s&apos;applique à tout étranger qui se présente à la frontière, quel que soit son visa. Le fait d&apos;avoir prouvé votre solvabilité à l&apos;ambassade il y a six mois ne dispense pas de présenter des moyens de subsistance le jour de l&apos;entrée si l&apos;agent le demande.
        </p>
        <p className="mb-4">
          En pratique, le titulaire d&apos;un DTV présente un profil rassurant : visa de 5 ans, dossier financier validé, statut vérifiable dans le système. Le risque de contrôle est objectivement plus faible que pour un touriste en exemption de visa qui enchaîne les allers-retours. Mon expérience le confirme : une vingtaine d&apos;entrées par l&apos;aéroport de Phuket avec mon DTV, et jamais un seul contrôle de ressources.
        </p>
        <p>
          Mais « risque plus faible » ne veut pas dire « risque nul ». Un agent tatillon, un jour de campagne de contrôle, et la règle s&apos;applique à vous comme à n&apos;importe qui. Avec 520 € en poche, le sujet est clos en trente secondes. Sans, vous jouez votre entrée sur la bienveillance d&apos;un fonctionnaire.
        </p>
      </section>

      {/* ── SECTION 7 ── */}
      <section className="mb-12">
        <h2 id="profils-cibles" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          7. Les profils que l&apos;immigration cible en priorité
        </h2>
        <p className="mb-6">
          Les témoignages de refus qui s&apos;accumulent dessinent un portrait-robot assez net des voyageurs contrôlés :
        </p>
        <ul className="space-y-4 mb-6 list-none pl-0">
          <li className="flex items-start gap-3 text-gray-300">
            <span className="text-amber-500 mt-1 flex-none">⚠️</span>
            <div><strong className="text-white">Les enchaîneurs de visa runs.</strong> Sorties et retours rapprochés, historique d&apos;entrées multiples dans l&apos;année — c&apos;est le profil numéro un. Le voyageur refoulé cette semaine revenait précisément d&apos;un passage au Laos.</div>
          </li>
          <li className="flex items-start gap-3 text-gray-300">
            <span className="text-amber-500 mt-1 flex-none">⚠️</span>
            <div><strong className="text-white">Les billets aller simple.</strong> Pas de preuve de sortie du territoire = suspicion de séjour illégal prolongé.</div>
          </li>
          <li className="flex items-start gap-3 text-gray-300">
            <span className="text-amber-500 mt-1 flex-none">⚠️</span>
            <div><strong className="text-white">Les passeports chargés.</strong> Multiples tampons thaïlandais récents, exemptions de visa répétées.</div>
          </li>
          <li className="flex items-start gap-3 text-gray-300">
            <span className="text-amber-500 mt-1 flex-none">⚠️</span>
            <div><strong className="text-white">Les profils « backpacker fauché ».</strong> C&apos;est injuste et subjectif, mais l&apos;apparence compte dans une décision discrétionnaire : jeune, sac léger, pas de réservation d&apos;hôtel présentable.</div>
          </li>
          <li className="flex items-start gap-3 text-gray-300">
            <span className="text-amber-500 mt-1 flex-none">⚠️</span>
            <div><strong className="text-white">Les postes frontières terrestres et Don Mueang.</strong> Les témoignages de contrôles y sont plus fréquents qu&apos;à Suvarnabhumi ou dans les aéroports du sud — Don Mueang concentre les vols low-cost régionaux, donc les profils visa run.</div>
          </li>
        </ul>
        <p>
          À l&apos;inverse, un DTV avec un billet de retour ou de continuation, une adresse en Thaïlande déclarée (TM30 en règle) et quelques centaines d&apos;euros en poche coche toutes les cases du voyageur sans histoire.
        </p>
      </section>

      {/* ── SECTION 8 ── */}
      <section className="mb-12">
        <h2 id="checklist" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          8. La checklist avant de prendre l&apos;avion
        </h2>
        <p className="mb-6">
          Pour ne jamais vivre ce que ce voyageur vit en ce moment au Laos :
        </p>
        
        <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 mb-6">
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-emerald-500 mt-0.5">✅</span>
              <span><strong>520 € minimum en espèces par personne</strong> (l&apos;équivalent de 20 000 THB), dans le bagage cabine — 1 000 à 2 000 € si vous vous installez, comme détaillé dans notre stratégie de paiement.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-500 mt-0.5">✅</span>
              <span>Billets en bon état, faciles à compter devant un agent.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-500 mt-0.5">✅</span>
              <span>Preuve de sortie du territoire : billet retour ou de continuation, même modifiable.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-500 mt-0.5">✅</span>
              <span>Adresse de séjour présentable : réservation d&apos;hôtel ou contrat de location.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-500 mt-0.5">✅</span>
              <span>TDAC rempli dans les 72 heures avant l&apos;arrivée (voir notre <Link href="/blog/arrivee-thailande-aeroport-immigration-taxi-visa-dtv" className="text-amber-500 hover:underline">guide complet de l&apos;arrivée à l&apos;aéroport</Link>).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-500 mt-0.5">✅</span>
              <span><strong>Titulaires du Visa DTV :</strong> e-visa accessible sur le téléphone et une copie papier.</span>
            </li>
          </ul>
        </div>

        <p className="mb-4">
          <strong className="text-white">Voyageurs en vacances (sans visa) :</strong> les Français bénéficient de l&apos;exemption de visa automatique de 30 jours — aucune démarche préalable, le tampon est apposé gratuitement à l&apos;arrivée. Mais attention : c&apos;est précisément ce profil que la règle des 20 000 THB cible en priorité, surtout en cas d&apos;entrées répétées dans l&apos;année. L&apos;exemption de visa n&apos;exempte pas des moyens de subsistance.
        </p>
        <p className="mb-4">
          <strong>Ne jamais compter sur les ATM de l&apos;aéroport :</strong> ils sont après la douane, et Wise ne fonctionne plus aux distributeurs thaïlandais.
        </p>
        <p className="text-amber-400 font-semibold text-lg mt-8">
          Trente secondes de préparation contre plusieurs jours bloqué dans un pays voisin avec un tampon indélébile dans le passeport. Le calcul est vite fait.
        </p>
      </section>

      {/* ── ENCART AUTEUR (E-E-A-T) ── */}
      <div className="my-14 bg-[#111111] border border-gray-800 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-6 shadow-lg">
        <div className="w-24 h-24 rounded-full bg-gray-800 flex-shrink-0 overflow-hidden border-2 border-amber-500/50">
          <div className="w-full h-full bg-gradient-to-br from-amber-500/20 to-emerald-500/20 flex items-center justify-center text-3xl">🇹🇭</div>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-1">Matthieu Moretti</h3>
          <p className="text-amber-500 text-xs font-semibold mb-3 uppercase tracking-wider">Expertise Visa DTV & Terrain</p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Entrepreneur digital installé à Phuket, j&apos;accompagne les freelances et porteurs de projet dans leur installation en Thaïlande. Mon objectif : vous éviter les pièges administratifs grâce à une expertise forgée directement sur le terrain, au contact des réalités de l&apos;immigration.
          </p>
        </div>
      </div>

      {/* ── FAQ ── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white mb-6">
          FAQ — La règle des 20 000 bahts en questions
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
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-white text-black font-bold text-sm py-4 px-7 rounded-full hover:bg-gray-100 active:scale-95 transition-all duration-300"
          >
            Contactez-moi
          </Link>
        </div>
      </div>

      <BlogNavigation variant="article-bottom" />
    </article>
  );
}