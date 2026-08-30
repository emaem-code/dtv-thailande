import type { Metadata } from 'next';
import BoutonEligibilite from '../../components/BoutonEligibilite';
import LienArticle from '../../components/LienArticle';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import BlogNavigation from '../../components/BlogNavigation';
import PartageArticle from '../../components/PartageArticle';
import MontantFonds from '../../components/MontantFonds';
import { createBreadcrumbSchema, getBlogPost } from '../posts';
import PhotoAuteur from '../../components/PhotoAuteur';

const breadcrumbSchema = createBreadcrumbSchema(getBlogPost('comparatif-visas-thailande'));

// ─── MÉTADONNÉES SEO ──────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Quel visa choisir pour vivre en Thaïlande ?",
  description:
    "Comparatif complet des visas longue durée en Thaïlande. Coûts, exigences financières et contraintes pour les freelances, retraités et expatriés.",
  alternates: {
    canonical: 'https://dtv-thailande.fr/blog/comparatif-visas-thailande',
  },
  openGraph: {
    title: "Quel visa choisir pour vivre en Thaïlande ?",
    description:
      "DTV, LTR, Non-ED, METV... Découvrez quel visa est le plus adapté à votre profil et votre budget pour vivre légalement en Thaïlande.",
    url: "https://dtv-thailande.fr/blog/comparatif-visas-thailande",
    siteName: "DTV Thaïlande",
    locale: "fr_FR",
    type: "article",
    images: [{ url: '/images/blog/comparatif-visas-thailande.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quel visa choisir pour vivre en Thaïlande ?',
    description: 'DTV, LTR, Non-ED, METV... Découvrez quel visa est le plus adapté à votre profil.',
    images: ['/images/blog/comparatif-visas-thailande.jpg'],
  },
};

// ─── SCHEMA ARTICLE JSON-LD ───────────────────────────────────────────────────
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://dtv-thailande.fr/blog/comparatif-visas-thailande",
  },
  "headline": "Quel Visa Choisir pour Vivre en Thaïlande ? Le Comparatif Complet",
  "description":
    "Comparatif complet des visas longue durée en Thaïlande. Coûts, exigences financières et contraintes pour les freelances, retraités et expatriés.",
  "image": "https://dtv-thailande.fr/images/blog/comparatif-visas-thailande.jpg",
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
  "datePublished": "2026-06-19",
  "dateModified": "2026-08-08",
};

// ─── SCHEMA FAQ JSON-LD ───────────────────────────────────────────────────────
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quel est le visa le moins cher pour tester la vie en Thaïlande ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le Visa Touriste à Entrées Multiples (METV) coûte 5 000 THB (environ 135 €). C'est l'option la plus économique pour un court séjour, mais il oblige à quitter le territoire tous les 60 à 90 jours et interdit strictement le travail."
      }
    },
    {
      "@type": "Question",
      "name": "Peut-on travailler légalement avec un visa étudiant (Non-ED) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non. Le visa étudiant (Non-ED) interdit formellement d'exercer une activité professionnelle rémunérée. En cas de contrôle, les sanctions incluent l'expulsion et l'inscription sur liste noire."
      }
    },
    {
      "@type": "Question",
      "name": "Quelles sont les conditions financières du visa LTR ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le visa LTR est réservé aux très hauts revenus. Selon votre profil, vous devez justifier de revenus annuels d'au moins 80 000 USD, détenir 1 million USD de patrimoine ou investir au moins 250 000 USD en Thaïlande."
      }
    },
    {
      "@type": "Question",
      "name": "Faut-il un permis de travail avec le Visa DTV ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Si vous travaillez pour des clients ou une entreprise basés hors de Thaïlande (freelance, télétravail), le DTV vous autorise à travailler légalement sans permis de travail thaïlandais."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le meilleur visa pour un digital nomad en 2026 ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le Visa DTV est incontestablement la meilleure option. Pour 10 000 à 13 000 THB de frais consulaires selon le poste (350 € à Paris) et une preuve de fonds de 500 000 THB, il offre 5 ans de validité, autorise le télétravail et permet des séjours jusqu'à 360 jours consécutifs."
      }
    }
  ]
};

export default function ArticleComparatifVisas() {
  return (
    <article className="max-w-3xl mx-auto px-5 md:px-6 py-14 md:py-20 font-sans text-gray-300 leading-relaxed bg-[#0a0a0a]">
      <BlogNavigation variant="article-top" />
      {/* ── INJECTION JSON-LD ── */}
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
        <span className="inline-block bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
          Guide Stratégique · Comparatif
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
          Quel Visa Choisir pour Vivre en Thaïlande ? <span className="text-indigo-400">Le Comparatif Complet</span>
        </h1>
        <p className="text-base text-gray-500 mt-6">
          Lecture : 12 min · Mis à jour : 8 août 2026 · Par{" "}
          <strong className="text-gray-400">Matthieu Moretti</strong>
        </p>
        <PartageArticle slug="comparatif-visas-thailande" variant="entete" />
      </header>

      {/* ── INTRODUCTION ── */}
      <div className="text-lg text-gray-400 mb-12 space-y-5">
        <p>
          S’installer au Royaume de Siam est le rêve de nombreux entrepreneurs, freelances et digital nomads. Pourtant, dès que l'on se penche sur les formalités administratives, le rêve peut rapidement se transformer en un casse-tête réglementaire. Entre les annonces officielles, les rumeurs des réseaux sociaux et les spécificités consulaires, trouver le bon statut est un défi majeur.
        </p>
        <p>
          Quel est le visa le plus économique sur le long terme ? Peut-on légalement travailler à distance depuis Bangkok ou Phuket ? Quels sont les pièges financiers cachés de chaque option ?
        </p>
        <p>
          Pour vous aider à y voir clair, notre agence spécialisée décrypte et compare objectivement les 5 grands visas de long séjour disponibles en Thaïlande. Critères financiers, flexibilité, coûts réels et contraintes : voici la vérité du terrain pour sécuriser votre expatriation.
        </p>
      </div>

      {/* ── SOMMAIRE EN DUR ── */}
      <nav className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 mb-12 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Les options au crible :</h2>
        <ul className="space-y-3">
          <li><a href="#visa-metv" className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors text-sm md:text-base">1. Le Visa Touriste (METV) : L'option "Test" temporaire</a></li>
          <li><a href="#visa-ed" className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors text-sm md:text-base">2. Le Visa Éducation (Non-ED) : Le statut étudiant</a></li>
          <li><a href="#visa-ltr" className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors text-sm md:text-base">3. Le Visa LTR : La cage dorée des hauts revenus</a></li>
          <li><a href="#visa-non-b-o" className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors text-sm md:text-base">4. Visas Non-B et Non-O : La voie corporate ou familiale</a></li>
          <li><a href="#visa-dtv" className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors text-sm md:text-base">5. Le Visa DTV : La révolution pour les indépendants</a></li>
          <li><a href="#synthese" className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors text-sm md:text-base">Synthèse : Quel choix selon votre profil ?</a></li>
        </ul>
      </nav>

      {/* ── SECTION 1 ── */}
      <section className="mb-12" id="visa-metv">
        <h2 className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          1. Le Visa Touriste Entrées Multiples (METV)
        </h2>
        <p className="mb-4">
          Le <em>Multiple Entry Tourist Visa</em> (METV) est souvent la première option envisagée par ceux qui souhaitent tester la vie en Thaïlande. L'ancien programme STV a officiellement pris fin, faisant du METV la seule option touristique à entrées multiples.
        </p>
        <ul className="space-y-3 mb-6 pl-4 border-l-2 border-gray-800 text-gray-400 text-sm">
          <li><strong className="text-white">Coût :</strong> 5 000 THB (environ 135 €). Prévoyez 1 900 THB par <LienArticle slug="extension-180-jours-visa-dtv-thailande" className="text-indigo-400 hover:underline font-medium">extension</LienArticle>, plus le coût des billets d&apos;avion pour les sorties obligatoires.</li>
          <li><strong className="text-white">Durée :</strong> Valable 6 mois. Séjour de 60 jours par entrée (extensible à 90 jours).</li>
          <li><strong className="text-white">Finances :</strong> Preuve d'un solde global d'environ 700 € sur les 3 derniers mois (varie selon les ambassades).</li>
          <li><strong className="text-white">Contraintes :</strong> <strong>L'interdiction de travailler est absolue.</strong> Les "Visa Runs" réguliers sont obligatoires, chronophages, et <Link href="/blog/fin-exemption-visa-60-jours" className="text-indigo-400 hover:underline font-medium">de plus en plus mal vus à la frontière</Link>.</li>
        </ul>
        <div className="border border-red-500/30 bg-red-500/5 rounded-xl p-5 mb-4">
          <p className="text-red-400 font-semibold mb-2">⚠️ Mise à jour août 2026 :</p>
          <p className="text-gray-400 text-sm">
            Le Cabinet thaïlandais a approuvé en mai 2026 la réduction de l&apos;exemption touristique standard de 60 à 30 jours pour les Français. <strong className="text-white">À ce jour, la mesure n&apos;a pas encore été publiée au Journal officiel thaïlandais : elle n&apos;est donc pas applicable, et l&apos;exemption de 60 jours reste en vigueur.</strong> Elle entrera en application 15 jours après cette publication (<Link href="/blog/fin-exemption-visa-60-jours" className="text-indigo-400 hover:underline font-medium">suivi à jour</Link>). Le METV gagne en attractivité pour les visiteurs fréquents, mais reste inadapté à une expatriation stable.
          </p>
        </div>
        <p className="text-amber-400 font-medium">💡 Verdict de l'expert : Parfait pour un séjour sabbatique, inadapté pour un professionnel.</p>
      </section>

      {/* ── SECTION 2 ── */}
      <section className="mb-12" id="visa-ed">
        <h2 className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          2. Le Visa Éducation (Non-ED)
        </h2>
        <p className="mb-4">
          Populaire pour apprendre le thaï ou le Muay Thaï, ce statut nécessite un engagement réel.
        </p>
        <ul className="space-y-3 mb-6 pl-4 border-l-2 border-gray-800 text-gray-400 text-sm">
          <li><strong className="text-white">Coût réel :</strong> Entre 45 000 et 60 000 THB par an (scolarité, extensions trimestrielles à 1 900 THB, Re-entry Permits).</li>
          <li><strong className="text-white">Durée :</strong> 90 jours initiaux, prolongeables jusqu'à 1 an. Annulé automatiquement en cas de sortie sans permis de réentrée.</li>
          <li><strong className="text-white">Contraintes :</strong> <strong>Le travail est strictement illégal.</strong> L'immigration contrôle la présence physique en classe.</li>
        </ul>
        <p className="text-amber-400 font-medium">💡 Verdict de l'expert : Valable uniquement si vous souhaitez vraiment étudier. Très risqué si utilisé comme couverture pour télétravailler.</p>
      </section>

      {/* ── SECTION 3 ── */}
      <section className="mb-12" id="visa-ltr">
        <h2 className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          3. Le Visa LTR (Long-Term Resident)
        </h2>
        <p className="mb-4">
          C'est le programme d'élite réservé aux profils à (très) haute valeur ajoutée.
        </p>
        <figure className="my-8">
          <Image
            src="/images/blog/comparatif-visas-ltr.jpg"
            alt="Le visa LTR thaïlandais, réservé aux très hauts revenus et aux investisseurs"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Magnifique cage dorée : 80 000 USD de revenus annuels ou un million de patrimoine. Elle élimine 95 % des freelances.
          </figcaption>
        </figure>
        <ul className="space-y-3 mb-6 pl-4 border-l-2 border-gray-800 text-gray-400 text-sm">
          <li><strong className="text-white">Avantages :</strong> 10 ans de validité (5+5), rapport annuel (fini le rapport de 90 jours), possibilité d'inclure la famille.</li>
          <li><strong className="text-white">Barrière financière :</strong> Revenus &gt; 80 000 USD/an, ou patrimoine &gt; 1 million USD, ou investissement de 250k à 500k USD en Thaïlande.</li>
        </ul>
        <p className="text-amber-400 font-medium">💡 Verdict de l'expert : Magnifique cage dorée, mais les critères financiers éliminent 95% des freelances et digital nomads.</p>
      </section>

      {/* ── SECTION 4 ── */}
      <section className="mb-12" id="visa-non-b-o">
        <h2 className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          4. Visas Non-B et Non-O : Corporate et Famille
        </h2>
        <div className="space-y-6">
          <div className="bg-[#111111] p-6 rounded-2xl border border-white/5">
            <h3 className="text-white font-bold mb-2">Le Visa Non-B (Travail)</h3>
            <p className="text-gray-400 text-sm mb-2">Pour les salariés d'entreprises locales. L'entreprise doit bloquer 2 millions de THB de capital et embaucher 4 Thaïlandais pour 1 étranger.</p>
            <p className="text-red-400 text-sm">Dépendance totale : si vous démissionnez, votre visa expire dans les 24h.</p>
          </div>
          <div className="bg-[#111111] p-6 rounded-2xl border border-white/5">
            <h3 className="text-white font-bold mb-2">Le Visa Non-O (Conjoint)</h3>
            <p className="text-gray-400 text-sm mb-2">Pour les conjoints de Thaïlandais(es), mais aussi pour les personnes à charge
d'un titulaire de Non-B. Exige 400 000 THB bloqués en banque ou 40 000 THB de
revenus mensuels.</p>
            <p className="text-red-400 text-sm">Attention : ce visa n'autorise pas à travailler de base.</p>
          </div>
        </div>
      </section>

      {/* ── SECTION 5 ── */}
      <section className="mb-12" id="visa-dtv">
        <h2 className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          5. Le Visa DTV : La révolution des Indépendants
        </h2>
        <p className="mb-4">
          Conçu pour les <em>digital nomads</em>, freelances et <Link href="/blog/visa-dtv-soft-power-ecoles" className="text-amber-500 hover:underline font-medium">profils culturels via la voie Soft Power</Link>, il élimine les frictions des anciens statuts.
        </p>
        <figure className="my-8">
          <Image
            src="/images/blog/comparatif-visas-dtv.jpg"
            alt="Le visa DTV de 5 ans, conçu pour les freelances et les travailleurs à distance"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            5 ans, entrées multiples, 180 jours par séjour, télétravail autorisé. Le seul statut vraiment pensé pour les indépendants.
          </figcaption>
        </figure>
        <ul className="space-y-3 mb-6 pl-4 border-l-2 border-indigo-500/50 text-gray-300 text-sm bg-indigo-500/5 p-4 rounded-r-xl">
          <li>✅ <strong className="text-white">Coût :</strong> 10 000 à 13 000 THB de frais consulaires en Asie, 350 € à l'ambassade de Paris.</li>
          <li>✅ <strong className="text-white">Durée :</strong> 5 ans (entrées multiples). Séjours de 180 jours, prolongeables à 360 jours sans quitter le pays.</li>
          <li>✅ <strong className="text-white">Finances :</strong> Preuve de 500 000 THB (<MontantFonds />) sur un compte (qui peut rester en France). Pas d'investissement requis.</li>
          <li>✅ <strong className="text-white">Légalité :</strong> Autorise expressément le télétravail pour des clients hors Thaïlande sans permis de travail.</li>
        </ul>
        <p className="text-amber-400 font-medium">💡 Verdict de l'expert : La solution absolue pour les entrepreneurs du web, offrant la liberté du LTR pour le coût d'un visa classique.</p>
      </section>

      {/* ── SYNTHÈSE ── */}
      <section className="mb-14" id="synthese">
        <h2 className="text-2xl font-bold text-white mb-6">Synthèse : Quel choix selon votre profil ?</h2>
        <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <ul className="space-y-5">
            <li className="flex items-start gap-4">
              <span className="text-2xl">🏖️</span>
              <div>
                <strong className="text-white block">Tester moins de 3 mois ?</strong>
                <span className="text-gray-400 text-sm">Optez pour le METV (prévoyez 4 semaines de traitement).</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-2xl">📚</span>
              <div>
                <strong className="text-white block">Apprendre la langue à temps plein ?</strong>
                <span className="text-gray-400 text-sm">Le Visa ED est fait pour vous.</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-2xl">💎</span>
              <div>
                <strong className="text-white block">Cadre supérieur ou millionnaire ?</strong>
                <span className="text-gray-400 text-sm">Le LTR offre un confort maximal sur 10 ans.</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-2xl">🏢</span>
              <div>
                <strong className="text-white block">Recruté par une entreprise locale ?</strong>
                <span className="text-gray-400 text-sm">Le Visa Non-B est obligatoire.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl mt-2">
              <span className="text-2xl">💻</span>
              <div>
                <strong className="text-indigo-400 block">Freelance, nomade ou télétravailleur ?</strong>
                <span className="text-white text-sm font-medium">Le Visa DTV est l'option la plus libre et sécurisée du marché.</span>
              </div>
            </li>
          </ul>
          <p className="mt-6 text-sm text-gray-400">
            Une fois le visa choisi, reste la vraie question : où poser ses valises ?{' '}
            <Link href="/blog/ou-vivre-thailande-2026-phuket-pattaya-bangkok-huahin" className="text-indigo-400 hover:underline font-medium">
              Notre comparatif terrain de Phuket, Pattaya, Bangkok et Hua Hin
            </Link>{' '}
            détaille les budgets réels et les loyers 2026 ville par ville.
          </p>
        </div>
      </section>

      {/* ── ENCART AUTEUR ── */}
      <div className="my-14 bg-[#111111] border border-gray-800 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-6 shadow-lg">
        <PhotoAuteur accent="indigo" />
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-1">Matthieu Moretti</h3>
          <p className="text-indigo-400 text-xs font-semibold mb-3 uppercase tracking-wider">Expertise Visas & Stratégie</p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Basé en Thaïlande, j'accompagne les professionnels indépendants dans le choix et la structuration de leur visa. Face à la complexité des exigences consulaires, notre agence audite votre profil et monte votre dossier DTV de A à Z pour une expatriation en toute sérénité.
          </p>
        </div>
      </div>

      {/* ── MAILLAGE INTERNE ── */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 mb-12">
        <p className="text-white font-bold text-sm mb-4">📚 Approfondissez votre projet :</p>
        <ul className="space-y-3">
          <li>
            <Link href="/blog/visa-dtv-freelance-auto-entrepreneur" className="text-amber-400 hover:text-amber-300 hover:underline text-sm transition-colors">
              → Focus DTV : Le guide pour les freelances et auto-entrepreneurs
            </Link>
          </li>
          <li>
            <Link href="/blog/fonds-bancaires-visa-dtv" className="text-amber-400 hover:text-amber-300 hover:underline text-sm transition-colors">
              → Exigences DTV : Comment justifier les 500 000 THB ?
            </Link>
          </li>
          <li>
            <Link href="/blog/visa-dtv-couple-famille-pacs" className="text-amber-400 hover:text-amber-300 hover:underline text-sm transition-colors">
              → S'expatrier à deux : Les règles pour les couples (PACS, mariage)
            </Link>
          </li>
        </ul>
      </div>

      {/* ── FAQ INTERNE ── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white mb-6">FAQ : Choisir son Visa</h2>
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
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500 opacity-10 rounded-full blur-3xl" />
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 relative z-10">
          Sécurisez votre visa DTV
        </h3>
        <p className="text-gray-400 mb-8 text-sm md:text-base relative z-10">
          Si le DTV est le grand gagnant de ce comparatif, son obtention nécessite un dossier irréprochable. Confiez-nous l'analyse et le montage de vos documents consulaires.
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
      <PartageArticle slug="comparatif-visas-thailande" variant="fin" />

      <BlogNavigation variant="article-bottom" />
    </article>
  );
}
