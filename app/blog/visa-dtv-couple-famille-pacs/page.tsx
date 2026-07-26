import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import BlogNavigation from '../../components/BlogNavigation';
import { createBreadcrumbSchema, getBlogPost } from '../posts';

const breadcrumbSchema = createBreadcrumbSchema(getBlogPost('visa-dtv-couple-famille-pacs'));

// ─── MÉTADONNÉES SEO ──────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Visa DTV Famille : PACS, mariage et enfants",
  description:
    "Le guide légal pour s'expatrier en Thaïlande en famille (Visa DTV). Reconnaissance du PACS, concubinage, mariage civil ou homosexuel, et preuve financière des 500 000 THB par personne.",
  alternates: {
    canonical: 'https://dtv-thailande.fr/blog/visa-dtv-couple-famille-pacs',
  },
  openGraph: {
    title: "Visa DTV Famille : PACS, mariage et enfants",
    description:
      "Le cadre légal de l'immigration thaïlandaise pour les familles et couples non mariés. PACS, concubinage, mariages de même sexe et montage de dossier.",
    url: "https://dtv-thailande.fr/blog/visa-dtv-couple-famille-pacs",
    siteName: "DTV Thaïlande",
    locale: "fr_FR",
    type: "article",
    images: [{ url: '/logo.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visa DTV Famille : PACS, mariage et enfants',
    description: 'Le cadre légal de l\'immigration thaïlandaise pour les familles et couples non mariés.',
    images: ['/logo.png'],
  },
};

// ─── SCHEMA ARTICLE JSON-LD ───────────────────────────────────────────────────
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://dtv-thailande.fr/blog/visa-dtv-couple-famille-pacs",
  },
  "headline": "Obtenir le Visa DTV en Famille ou en Couple : PACS, Mariage et Enfants",
  "description":
    "Le guide légal pour s'expatrier en Thaïlande en famille avec le Visa DTV. Reconnaissance du PACS, concubinage, mariage, enfants et procédure de légalisation.",
  "image": "https://dtv-thailande.fr/images/blog/visa-dtv-couple-famille-pacs.jpg",
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
  "datePublished": "2026-06-17",
  "dateModified": "2026-06-17",
};

// ─── SCHEMA FAQ JSON-LD ───────────────────────────────────────────────────────
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Existe-t-il un Visa DTV 'Conjoint Accompagnant' ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non. Bien que la loi autorise les conjoints et les enfants, il n'y a pas de sous-catégorie 'dépendant' automatique. Chaque membre de la famille doit formuler sa propre demande de visa DTV, payer ses frais et justifier de l'exigence financière."
      }
    },
    {
      "@type": "Question",
      "name": "Le PACS ou le concubinage sont-ils reconnus pour obtenir le Visa DTV ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non, le PACS et le concubinage (union de fait) ne sont pas reconnus par l'immigration thaïlandaise. Sans acte de mariage civil formel, les partenaires d'un couple non marié sont considérés comme des individus séparés et doivent monter deux dossiers DTV distincts."
      }
    },
    {
      "@type": "Question",
      "name": "Un couple homosexuel peut-il faire une demande liée de Visa DTV ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, depuis l'entrée en vigueur de la Marriage Equality Act en janvier 2025, la Thaïlande reconnaît pleinement les mariages de même sexe. Ils bénéficient des mêmes droits consulaires que les couples hétérosexuels, à condition de fournir un acte de mariage traduit et légalisé."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est l'exigence financière pour une famille avec le DTV ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L'exigence des 500 000 THB s'applique par demandeur, et non par foyer. Pour une famille de 4 personnes (2 adultes, 2 enfants), il faut donc prouver l'équivalent de 2 millions de THB sur un compte familial ou des comptes séparés."
      }
    },
    {
      "@type": "Question",
      "name": "Faut-il apostiller les livrets de famille français ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La Thaïlande n'est pas signataire de la Convention de La Haye, l'apostille seule ne suffit donc pas. Les documents français doivent faire l'objet d'une double légalisation : d'abord par le Ministère des Affaires Étrangères en France, puis, après traduction certifiée, par l'Ambassade de Thaïlande."
      }
    }
  ]
};

export default function ArticleDtvFamille() {
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
        <span className="inline-block bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
          Stratégie Légale · Expatriation
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
          Obtenir le Visa DTV en Famille ou en Couple : <span className="text-amber-500">PACS, Mariage et Enfants</span>
        </h1>
        <p className="text-base text-gray-500 mt-6">
          Lecture : 15 min · Mis à jour : 17 juin 2026 · Par{" "}
          <strong className="text-gray-400">Matthieu Moretti</strong>
        </p>
      </header>

      {/* ── INTRODUCTION ── */}
      <div className="text-lg text-gray-400 mb-12 space-y-5">
        <p>
          S’expatrier en Thaïlande avec le nouveau <strong>Destination Thailand Visa (DTV)</strong> représente une opportunité exceptionnelle pour les freelances, les télétravailleurs et les passionnés de culture. Cependant, lorsqu'il s'agit de partir à deux ou avec des enfants, les informations disponibles en ligne deviennent floues, voire contradictoires.
        </p>
        <p>
          Existe-t-il vraiment un visa DTV spécifiquement conçu pour un conjoint accompagnant ? Le <strong>PACS français</strong> ou le concubinage sont-ils reconnus par l'immigration thaïlandaise ? Comment s'assurer de la conformité de son dossier familial avant le grand départ ? 
        </p>
        <p>
          Dans ce guide exhaustif, nous décryptons le cadre légal thaïlandais et vous livrons les réalités du terrain pour vous aider à préparer sereinement votre projet d'expatriation familiale en totale conformité avec la loi.
        </p>
      </div>

      {/* ── SOMMAIRE EN DUR ── */}
      <nav className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 mb-12 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Au programme de ce guide :</h2>
        <ul className="space-y-3">
          <li><a href="#mythe-visa-conjoint" className="text-amber-400 hover:text-amber-300 hover:underline transition-colors text-sm md:text-base">1. Le mythe du Visa DTV "Conjoint Accompagnant"</a></li>
          <li><a href="#reconnaissance-unions" className="text-amber-400 hover:text-amber-300 hover:underline transition-colors text-sm md:text-base">2. Reconnaissance des unions : Votre couple est-il éligible ?</a></li>
          <li><a href="#options-non-maries" className="text-amber-400 hover:text-amber-300 hover:underline transition-colors text-sm md:text-base">3. Options et stratégies pour les couples non mariés</a></li>
          <li><a href="#dtv-vs-ltr-nono" className="text-amber-400 hover:text-amber-300 hover:underline transition-colors text-sm md:text-base">4. DTV, LTR, Non-O : Quel visa choisir en famille ?</a></li>
          <li><a href="#parcours-administratif" className="text-amber-400 hover:text-amber-300 hover:underline transition-colors text-sm md:text-base">5. Le parcours administratif : Traduction et double légalisation</a></li>
          <li><a href="#accompagnement-specialise" className="text-amber-400 hover:text-amber-300 hover:underline transition-colors text-sm md:text-base">6. L'importance d'un accompagnement spécialisé</a></li>
        </ul>
      </nav>

      {/* ── SECTION 1 ── */}
      <section className="mb-12" id="mythe-visa-conjoint">
        <h2 className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          1. Le mythe du Visa DTV "Conjoint Accompagnant"
        </h2>
        <p className="mb-4">
          La majorité des plateformes d'information font une erreur d'interprétation majeure concernant les dépendants. Bien que les textes officiels du gouvernement thaïlandais mentionnent l'éligibilité pour les « conjoints et enfants de moins de 20 ans », <strong>il n'existe pas de sous-catégorie de visa de dépendance automatique liée au DTV.</strong>
        </p>
        <p className="mb-4">
          Qu'est-ce que cela implique concrètement pour l'organisation de votre dossier ?
        </p>
        <ul className="space-y-4 mb-6">
          <li className="flex gap-3">
            <span className="text-amber-500 flex-shrink-0">📌</span>
            <span><strong className="text-white">Des procédures individuelles :</strong> Chaque membre de la famille (conjoint et enfants inclus) doit formuler sa propre demande de visa sur la plateforme officielle de l'e-Visa thaïlandais, s'acquitter des frais consulaires distincts et présenter un dossier complet et indépendant.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-amber-500 flex-shrink-0">📌</span>
            <span><strong className="text-white">L'application stricte du seuil financier :</strong> C'est la règle d'or qui surprend de nombreux candidats. Le titulaire principal ne peut pas couvrir l'ensemble de son foyer avec un seul compte bancaire affichant 500 000 THB. Les exigences financières s'appliquent par demandeur.</span>
          </li>
        </ul>
        <div className="border border-sky-500/30 bg-sky-500/5 rounded-xl p-5 mt-4">
          <p className="text-sky-400 font-semibold mb-2">💡 Exemple de calcul familial :</p>
          <p className="text-gray-400 text-sm">
            Une famille de quatre personnes (deux parents et deux enfants de moins de 20 ans) devra justifier d'une surface financière globale d'au moins <strong>2 000 000 THB (soit environ 52 000 €)</strong>, que les fonds soient répartis sur des comptes individuels ou centralisés sur un compte joint, sous réserve de prouver légalement les liens de filiation.
          </p>
        </div>
      </section>

      {/* ── SECTION 2 ── */}
      <section className="mb-12" id="reconnaissance-unions">
        <h2 className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          2. Reconnaissance des unions : Votre couple est-il éligible ?
        </h2>
        <p className="mb-4">
          Pour pouvoir lier administrativement deux dossiers de visa sur la base d'une union, celle-ci doit être formellement reconnue par la législation de l'Immigration thaïlandaise.
        </p>

        <h3 className="text-xl font-bold text-white mb-3 mt-6">Le Mariage Civil : La norme de référence</h3>
        <p className="mb-4">
          Le Code civil et commercial thaïlandais reconnaît la validité des mariages célébrés à l'étranger, à la condition stricte qu'ils aient fait l'objet d'un enregistrement civil officiel dans le pays d'origine.
        </p>
        <p className="mb-4">
          <strong>Égalité matrimoniale :</strong> Il est important de noter une avancée historique majeure. Depuis l'entrée en vigueur de la <a href="https://www.ratchakitcha.soc.go.th/" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">Marriage Equality Act</a> le 23 janvier 2025, la Thaïlande reconnaît pleinement le mariage sans distinction de genre. Les couples de même sexe légalement mariés bénéficient donc exactement des mêmes droits migratoires et consulaires que les couples hétérosexuels.
        </p>
        <p className="mb-4">
          <strong>Les justificatifs requis :</strong> Un simple livret de famille ne suffit pas lors de l'examen consulaire. L'administration exige la présentation d'un extrait d'acte de mariage officiel, traduit et ayant fait l'objet d'une procédure de double légalisation.
        </p>

        <h3 className="text-xl font-bold text-white mb-3 mt-8">Le PACS et le Concubinage : Le point de blocage</h3>
        <p className="mb-4">
          C'est le cas de figure le plus fréquent pour les ressortissants français, et le plus problématique : <strong>le droit thaïlandais ne reconnaît ni le PACS (Pacte Civil de Solidarité) ni le concubinage (union de fait).</strong>
        </p>
        <p>
          Présenter une attestation de PACS auprès des services consulaires ne confère aucun droit à l'obtention d'un visa lié au dossier de votre partenaire. Sans certificat de mariage civil, vous êtes considérés, sur le plan migratoire, comme deux individus célibataires distincts. Chacun doit alors répondre de manière autonome aux critères d'une des catégories du DTV.
        </p>
      </section>

      {/* ── SECTION 3 ── */}
      <section className="mb-12" id="options-non-maries">
        <h2 className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          3. Options et stratégies pour un couple non marié
        </h2>
        <p className="mb-4">
          Si vous êtes pacsés ou en union libre, l'expatriation n'est pas impossible. Plusieurs options légales et adaptées à différents profils peuvent être envisagées :
        </p>

        <div className="space-y-6 mt-6">
          <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl">
            <h4 className="text-amber-500 font-bold mb-2">Option A : La double demande de DTV</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              De nombreux couples choisissent de demander deux visas DTV distincts. Le premier partenaire postule au titre de la catégorie <em>Workcation / Freelance</em>. Le second, s'il ne dispose pas d'une activité éligible au télétravail, explore la <Link href="/blog/visa-dtv-soft-power-ecoles" className="text-amber-500 hover:underline font-medium">voie du Soft Power</Link> en s'inscrivant dans un programme culturel vérifié (cours de Muay Thaï intensifs, académie de cuisine agréée par le Ministère de l'Éducation).
            </p>
          </div>
          <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl">
            <h4 className="text-amber-500 font-bold mb-2">Option B : Le mix de visas long séjour</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Si un seul des deux partenaires est éligible au DTV et dispose des fonds requis, le couple peut envisager une combinaison de statuts : le partenaire éligible obtient son Visa DTV (5 ans), tandis que le second opte pour un Visa Éducation (Non-ED) en s'inscrivant dans un établissement d'apprentissage linguistique, permettant ainsi de résider légalement.
            </p>
          </div>
          <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl">
            <h4 className="text-amber-500 font-bold mb-2">Option C : L'enregistrement d'un mariage civil</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Pour les couples qui envisageaient une union à moyen terme, anticiper l'enregistrement d'un mariage civil en France (ou via les services consulaires) avant le dépôt de la demande de visa simplifie grandement la constitution du dossier et la reconnaissance de la cellule familiale par les autorités.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 4 (TABLEAU COMPARATIF + CONTEXTE) ── */}
      <section className="mb-12" id="dtv-vs-ltr-nono">
        <h2 className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          4. DTV, LTR, Non-O : Quel visa choisir en famille ?
        </h2>
        <p className="mb-4">
          Avant de valider définitivement votre choix, il est crucial de comparer le DTV avec les autres grandes options de visas de long séjour disponibles pour s'installer en Thaïlande. 
        </p>
        <p className="mb-6">
          Pour un couple non marié ou une famille, la dynamique de choix change complètement. Par exemple, bien que le visa LTR (Long-Term Resident) semble idéal sur le papier car il inclut d'office jusqu'à quatre dépendants (conjoint et enfants) sur un seul dossier, ses seuils d'accessibilité financière le rendent hors de portée pour la grande majorité des freelances et digital nomads. À l'inverse, le visa Non-O permet de lier les conjoints mariés, mais interdit formellement de travailler. C'est dans ce contexte très restrictif que le DTV, malgré l'obligation de multiplier les demandes individuelles, s'impose souvent comme l'option la plus viable et rentable pour les familles.
        </p>

        <div className="overflow-x-auto border border-white/10 rounded-2xl bg-[#111111]">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/50">
                <th className="text-left py-4 px-5 text-gray-400 font-semibold uppercase tracking-wider text-xs">Type de Visa</th>
                <th className="text-left py-4 px-5 text-gray-400 font-semibold uppercase tracking-wider text-xs">Avantages Principaux</th>
                <th className="text-left py-4 px-5 text-gray-400 font-semibold uppercase tracking-wider text-xs">Limites à Prendre en Compte</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="py-4 px-5 text-white font-medium">DTV (Destination Thailand Visa)</td>
                <td className="py-4 px-5 text-gray-400">Valable 5 ans, entrées multiples, accessible aux indépendants et profils culturels.</td>
                <td className="py-4 px-5 text-gray-400">Demande individuelle obligatoire, justification de 500 000 THB par personne.</td>
              </tr>
              <tr>
                <td className="py-4 px-5 text-white font-medium">Non-O (Conjoint de résident)</td>
                <td className="py-4 px-5 text-gray-400">Permet de lier les statuts si l'un des deux possède un visa de travail (Non-B).</td>
                <td className="py-4 px-5 text-gray-400">Interdiction stricte de travailler par défaut (sauf démarche complexe d'adjonction de permis).</td>
              </tr>
              <tr>
                <td className="py-4 px-5 text-white font-medium">LTR (Long-Term Resident)</td>
                <td className="py-4 px-5 text-gray-400">Valable 10 ans, permet d'inclure directement jusqu'à 4 dépendants (conjoint/enfants).</td>
                <td className="py-4 px-5 text-gray-400">Accessible uniquement aux profils à très hauts revenus ou investisseurs majeurs.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── SECTION 5 ── */}
      <section className="mb-12" id="parcours-administratif">
        <h2 className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          5. Le parcours administratif : Traduction et double légalisation
        </h2>
        <p className="mb-4">
          Le principal motif de ralentissement ou de refus des dossiers familiaux réside dans la non-conformité des actes d'état civil (actes de mariage ou actes de naissance des enfants).
        </p>
        
        <div className="border border-red-500/30 bg-red-500/5 rounded-xl p-5 mb-6">
          <p className="text-red-400 font-semibold mb-2">⚠️ Note juridique importante :</p>
          <p className="text-gray-400 text-sm">
            La Thaïlande n'étant pas signataire de la Convention de La Haye, la simple apposition d'une apostille sur vos documents français est insuffisante. 
          </p>
        </div>

        <p className="mb-4">
          Pour qu'un document public français soit opposable auprès des autorités thaïlandaises, il doit obligatoirement suivre la procédure de <strong>double légalisation</strong> :
        </p>
        <ol className="list-decimal pl-5 space-y-2 mb-6 text-gray-400 marker:text-white marker:font-bold">
          <li><strong>En France :</strong> Obtention de l'acte original certifié, suivi d'une première légalisation par le Ministère de l'Europe et des Affaires Étrangères (MEAE).</li>
          <li><strong>Traduction :</strong> Traduction intégrale du document vers l'anglais ou le thaï par un traducteur assermenté.</li>
          <li><strong>Au Consulat :</strong> Seconde légalisation du document et de sa traduction par <a href="https://paris.thaiembassy.org/" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">l'Ambassade Royale de Thaïlande à Paris</a>.</li>
        </ol>

        <p>
          Concernant la question géographique du dépôt, il est fortement recommandé de soumettre votre demande auprès de l'ambassade de votre pays de résidence officielle (via la plateforme e-Visa à Paris pour les résidents français). Tenter de régulariser des documents d'état civil européens auprès d'ambassades thaïlandaises situées dans des pays limitrophes en Asie s'avère souvent complexe et source de blocages administratifs.
        </p>
      </section>

      {/* ── SECTION 6 ── */}
      <section className="mb-14" id="accompagnement-specialise">
        <h2 className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          6. L'importance d'un accompagnement spécialisé
        </h2>
        <p className="mb-4">
          Aligner des relevés bancaires, prouver des liens de filiation et coordonner les demandes simultanées de toute une famille exige une rigueur absolue. Une simple erreur de traduction ou l'omission d'un justificatif peut entraîner le rejet de l'ensemble des dossiers du foyer.
        </p>
        <p className="mb-4">
          En tant qu'<strong>agence spécialisée</strong> dans l'accompagnement des expatriés et des professionnels indépendants, notre rôle est de sécuriser chaque étape de votre transition vers la Thaïlande :
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="border border-white/5 bg-[#111111] rounded-2xl p-6">
            <h3 className="text-amber-500 font-bold mb-3 uppercase tracking-wider text-xs">Notre Expertise</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>🛡️ <strong className="text-white">Audit de conformité :</strong> Analyse de votre situation familiale et validation des pièces justificatives.</li>
              <li>🛡️ <strong className="text-white">Précision technique :</strong> Respect strict des exigences financières et des déclarations (TDAC).</li>
              <li>🛡️ <strong className="text-white">Garantie de réévaluation :</strong> Restructuration sans frais si l'ambassade réclame des documents additionnels.</li>
            </ul>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              L'expatriation familiale est un projet de vie majeur. Ne laissez pas un flou administratif en compromettre la réussite. Confiez-nous l'ingénierie de vos visas.
            </p>
            <Link href="/contact" className="text-amber-400 hover:underline text-sm font-semibold">
              → Discuter de mon dossier familial avec un expert
            </Link>
          </div>
        </div>
      </section>

      {/* ── ENCART AUTEUR ── */}
      <div className="my-14 bg-[#111111] border border-gray-800 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-6 shadow-lg">
        <div className="w-24 h-24 rounded-full bg-gray-800 flex-shrink-0 overflow-hidden border-2 border-amber-500/50">
          <div className="w-full h-full bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center text-3xl">👨‍💻</div>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-1">Matthieu Moretti</h3>
          <p className="text-amber-500 text-xs font-semibold mb-3 uppercase tracking-wider">Expertise Visas & Mobilité</p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Entrepreneur et consultant basé à Phuket, j'accompagne les familles et les professionnels indépendants dans la structuration légale de leur départ. En contact direct avec la réalité administrative, notre équipe garantit un montage de dossier irréprochable pour sécuriser votre arrivée sur le territoire thaïlandais.
          </p>
        </div>
      </div>

      {/* ── MAILLAGE INTERNE ── */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 mb-12">
        <p className="text-white font-bold text-sm mb-4">📚 À lire pour compléter votre dossier :</p>
        <ul className="space-y-3">
          <li>
            <Link href="/blog/fonds-bancaires-visa-dtv" className="text-amber-400 hover:text-amber-300 hover:underline text-sm transition-colors">
              → Fonds bancaires Visa DTV : Faut-il bloquer les 500 000 THB pendant 6 mois ?
            </Link>
          </li>
          <li>
            <Link href="/blog/visa-dtv-freelance-auto-entrepreneur" className="text-amber-400 hover:text-amber-300 hover:underline text-sm transition-colors">
              → Indépendants & Télétravail : Comment valider son activité pour le DTV
            </Link>
          </li>
          <li>
            <Link href="/blog/tdac-thailande-carte-arrivee" className="text-amber-400 hover:text-amber-300 hover:underline text-sm transition-colors">
              → TDAC Thaïlande 2026 : Le formulaire d'arrivée numérique obligatoire
            </Link>
          </li>
        </ul>
      </div>

      {/* ── FAQ INTERNE ── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white mb-6">FAQ : DTV en Famille</h2>
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
          Sécurisez votre expatriation familiale
        </h3>
        <p className="text-gray-400 mb-8 text-sm md:text-base relative z-10">
          Ne laissez pas une erreur de traduction ou une mauvaise interprétation de la loi briser votre projet. Nous prenons en charge la vérification et le montage de votre dossier consulaire de A à Z.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 relative z-10">
          <Link href="/" className="inline-flex items-center justify-center bg-white text-black font-bold text-sm py-4 px-7 rounded-full hover:bg-gray-100 transition-all duration-300">
            Tester l'éligibilité de ma famille
          </Link>
          <Link href="/contact" className="inline-flex items-center justify-center border border-white/20 text-white font-bold text-sm py-4 px-7 rounded-full hover:bg-white/5 transition-all duration-300">
            Auditer mon dossier
          </Link>
        </div>
      </div>
      <BlogNavigation variant="article-bottom" />
    </article>
  );
}
