import type { Metadata } from 'next';
import BoutonEligibilite from '../../components/BoutonEligibilite';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import BlogNavigation from '../../components/BlogNavigation';
import PartageArticle from '../../components/PartageArticle';
import LienArticle from '../../components/LienArticle';
import MontantFonds from '../../components/MontantFonds';
import { createBreadcrumbSchema, getBlogPost } from '../posts';
import PhotoAuteur from '../../components/PhotoAuteur';

const breadcrumbSchema = createBreadcrumbSchema(getBlogPost('visa-dtv-freelance-auto-entrepreneur'));

export const metadata: Metadata = {
  title: "Visa DTV Freelance : dossier sans fiche de paie",
  description:
    "Comment obtenir le Visa DTV Thaïlande quand on est auto-entrepreneur ou freelance ? Kbis, URSSAF, portfolio : le guide complet pour monter un dossier consulaire béton sans fiche de paie classique.",
  alternates: {
    canonical: 'https://dtv-thailande.fr/blog/visa-dtv-freelance-auto-entrepreneur', // <-- AJOUT DU CANONICAL ICI
  },
  openGraph: {
    title: "Visa DTV Freelance : dossier sans fiche de paie",
    description:
      "Le guide complet pour les indépendants français : transformer votre Kbis et attestations URSSAF en dossier DTV irréfutable.",
    url: "https://dtv-thailande.fr/blog/visa-dtv-freelance-auto-entrepreneur",
    siteName: "DTV Thaïlande",
    locale: "fr_FR",
    type: "article",
    // TODO: Générer un opengraph-image.tsx ou lier une image spécifique à cet article quand les vraies miniatures seront disponibles.
    images: [{ url: '/images/blog/visa-dtv-freelance-auto-entrepreneur.jpg' }],
  },
};

// ─── SCHEMA ARTICLE ───────────────────────────────────────────────────────────
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://dtv-thailande.fr/blog/visa-dtv-freelance-auto-entrepreneur",
  },
  "headline": "Visa DTV Freelance & Auto-Entrepreneur : Dossier Sans Fiche de Paie (2026)",
  "description":
    "Comment obtenir le Visa DTV Thaïlande quand on est auto-entrepreneur ou freelance ? Kbis, URSSAF, portfolio : le guide complet.",
  "image": "https://dtv-thailande.fr/images/blog/visa-dtv-freelance-auto-entrepreneur.jpg",
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
  "datePublished": "2026-06-10",
  "dateModified": "2026-09-02",
};

// ─── SCHEMA FAQ ───────────────────────────────────────────────────────────────
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Un auto-entrepreneur peut-il obtenir le Visa DTV sans fiche de paie ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. L'ambassade thaïlandaise accepte les documents alternatifs aux fiches de paie classiques : extrait Kbis ou avis de situation SIRENE, attestations de chiffre d'affaires URSSAF sur 6 mois, relevés bancaires personnels et portfolio de missions. Le tout doit former un dossier cohérent et chronologiquement irréfutable."
      }
    },
    {
      "@type": "Question",
      "name": "Le portage salarial est-il reconnu par l'ambassade de Thaïlande ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, c'est même l'un des profils les plus simples à défendre. Votre société de portage émet des bulletins de salaire officiels et peut fournir une attestation employeur. Ces documents sont directement assimilables à ceux d'un salarié classique aux yeux des officiers consulaires."
      }
    },
    {
      "@type": "Question",
      "name": "Faut-il faire traduire ses documents URSSAF et Kbis pour l'ambassade ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, pour un dépôt à Paris — et depuis le 31 août 2026, un freelance français n'a plus d'autre poste possible s'il ne réside pas légalement à l'étranger. La traduction assermentée y est exigée : comptez 150 à 300 € et plusieurs jours. Les postes asiatiques, où les documents en français passaient souvent, sont désormais réservés aux résidents de ces pays. Notre agence gère ces traductions dans le cadre de son accompagnement."
      }
    },
    {
      "@type": "Question",
      "name": "Mon chiffre d'affaires est irrégulier d'un mois à l'autre. Est-ce rédhibitoire ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non, à condition que la moyenne sur 6 mois soit cohérente et que votre solde bancaire ne soit jamais descendu sous l'équivalent de 500 000 THB sur la période. L'irrégularité des revenus freelance est connue des consulats. Ce qui compte, c'est la tendance globale et la solidité du solde bancaire personnel."
      }
    },
    {
      "@type": "Question",
      "name": "Une SASU ou une EURL peut-elle servir pour le dossier DTV ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Avec prudence. L'argent dans un compte professionnel de société (SASU, EURL) appartient légalement à la personne morale, pas à vous. L'ambassade peut refuser ces relevés. La stratégie correcte est de vous verser une rémunération régulière et de présenter vos relevés personnels ainsi que les bulletins de salaire de dirigeant."
      }
    }
  ]
};

export default function ArticleFreelanceDTV() {
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
        <span className="inline-block bg-purple-500/10 border border-purple-500/25 text-purple-400 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
          Guide Freelance · Dossier Consulaire
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
          Visa DTV Freelance &{" "}
          <span className="text-purple-400">Auto-Entrepreneur</span> : Obtenir
          le Visa Sans Fiche de Paie en 2026
        </h1>
        <p className="text-gray-400 text-lg mt-4 leading-relaxed">
          <strong>Obtenir le Visa DTV quand on est freelance ou auto-entrepreneur</strong> nécessite une préparation minutieuse. Vous êtes indépendant, micro-entrepreneur ou en portage salarial et vous rêvez de vous installer en Thaïlande ? L’absence de fiche de paie classique n’est pas une fatalité — c’est un dossier consulaire à construire différemment.
        </p>
        <p className="text-base text-gray-500 mt-6">
          Lecture : 11 min · Mis à jour : 8 août 2026 · Par{" "}
          <strong className="text-gray-400">Matthieu Moretti</strong>
        </p>
        <PartageArticle slug="visa-dtv-freelance-auto-entrepreneur" variant="entete" />
      </header>

      {/* ── MISE À JOUR RÉGLEMENTAIRE ──
          Les recommandations de dépôt à Vientiane ou Kuala Lumpur de cet article ne sont
          plus praticables pour un non-résident depuis le 31 août 2026. */}
      <div className="bg-red-500/5 border border-red-500/30 rounded-2xl p-6 mb-10">
        <p className="text-white font-semibold mb-2">
          Mise à jour du 30 août 2026 — Vientiane et Kuala Lumpur ne sont plus des options
        </p>
        <p className="text-sm text-gray-300 leading-relaxed">
          Cet article recommande par endroits un dépôt à Vientiane ou Kuala Lumpur. Depuis le{' '}
          <strong className="text-white">31 août 2026</strong>, ces postes n&apos;acceptent plus que
          leurs ressortissants et leurs résidents légaux, et un extrait de casier judiciaire de moins
          de six mois est désormais exigé partout. Un auto-entrepreneur français sans titre de séjour
          à l&apos;étranger dépose donc à Paris.{' '}
          <strong className="text-white">
            Les exigences de fond sur le dossier freelance — factures, contrats, régularité des
            revenus — sont inchangées.
          </strong>{' '}
          <LienArticle
            slug="dtv-nouvelles-regles-31-aout-2026"
            className="text-red-400 hover:underline font-medium"
          >
            Lire les nouvelles règles du 31 août 2026
          </LienArticle>
          .
        </p>
      </div>

      {/* ── ALERTE INTRO ── */}
      <div className="bg-red-500/10 border border-red-500/25 rounded-2xl p-6 mb-12">
        <p className="text-red-400 font-semibold text-sm mb-2">
          ⚠️ Le profil le plus refusé à l’ambassade de Paris
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          D’après notre expérience terrain, les auto-entrepreneurs et freelances
          français représentent la majorité des dossiers DTV refusés. Non pas
          parce que leur profil est inéligible, mais parce que leur dossier est
          mal construit. Ce guide existe pour corriger ça.
        </p>
      </div>

      {/* ── SOMMAIRE CORRIGÉ ── */}
      <nav className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 mb-12 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">
          Ce que vous allez apprendre :
        </h2>
        <ul className="space-y-3">
          {[
            ["#pourquoi-freelance-refuse", "1. Pourquoi les freelances sont refusés (et comment l'éviter)"],
            ["#documents-alternatifs", "2. Les 6 documents qui remplacent la fiche de paie"],
            ["#cas-micro-entreprise", "3. Cas concret : dossier micro-entreprise étape par étape"],
            ["#cas-portage-salarial", "4. Cas concret : dossier portage salarial et SASU"],
            ["#traductions-assermentees", "5. Traductions assermentées : quand et pourquoi"],
            ["#strategie-ambassade", "6. Quelle ambassade choisir selon votre profil"],
            ["#delais-preparation", "7. Quel délai pour préparer son dossier freelance avant de partir ?"],
          ].map(([href, label]) => (
            <li key={href}>
              <a
                href={href}
                className="text-purple-400 hover:text-purple-300 hover:underline transition-colors text-sm md:text-base"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── SECTION 1 ── */}
      <section className="mb-14" id="pourquoi-freelance-refuse">
        <h2 className="text-2xl font-bold text-white mb-5 scroll-mt-24">
          1. Pourquoi les freelances français sont refusés — et comment l’éviter
        </h2>
        <p className="mb-4">
          L’officier consulaire thaïlandais a été formé sur un modèle de
          dossier type : un salarié en CDI avec des fiches de paie mensuelles
          régulières, une attestation d’employeur et un contrat de travail. Ce
          modèle représente environ 60% des candidats dans le monde. Le
          problème, c’est que la France compte plus de{" "}
          <strong className="text-white">4,2 millions de travailleurs indépendants</strong>{" "}
          — et la plupart d’entre eux ne rentrent pas dans cette case.
        </p>
        <figure className="my-8">
          <Image
            src="/images/blog/visa-dtv-freelance-dossier-refuse.jpg"
            alt="Bureau d&apos;un freelance français couvert de documents administratifs pour une demande de visa DTV"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Le motif de refus n°1 des freelances n&apos;est pas le manque de revenus, c&apos;est un dossier qui ne raconte pas d&apos;histoire cohérente.
          </figcaption>
        </figure>
        <p className="mb-4">
          Quand un auto-entrepreneur dépose un Kbis et des relevés URSSAF sans
          explication structurée, l’officier ne sait pas quoi en faire. Il
          hésite. Et l’hésitation consulaire se traduit presque toujours par un
          refus.
        </p>
        <p className="mb-4">
          La solution n’est pas de falsifier des documents — c’est de{" "}
          <strong className="text-white">
            construire une narration administrative cohérente
          </strong>{" "}
          qui traduit votre réalité d’indépendant dans le langage que
          l’ambassade comprend.
        </p>

        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 mt-6">
          <p className="text-white font-bold text-sm mb-3">
            Les 3 erreurs classiques du dossier freelance mal monté :
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              ❌ Présenter uniquement le Kbis sans justificatif de revenus
              associé
            </li>
            <li>
              ❌ Confondre compte professionnel (SASU/EURL) et compte personnel
              pour la preuve des 500 000 THB
            </li>
            <li>
              ❌ Fournir des relevés de CA sans explication du statut
              micro-entreprise (l’officier ne connaît pas le régime français)
            </li>
          </ul>
        </div>
      </section>

      {/* ── SECTION 2 ── */}
      <section className="mb-14" id="documents-alternatifs">
        <h2 className="text-2xl font-bold text-white mb-5 scroll-mt-24">
          2. Les 6 documents qui remplacent la fiche de paie
        </h2>
        <p className="mb-6">
          Voici la liste des pièces que nous constituons systématiquement pour
          nos clients freelances. Chaque document joue un rôle précis dans la
          narration administrative.
        </p>
        <figure className="my-8">
          <Image
            src="/images/blog/visa-dtv-freelance-six-documents.jpg"
            alt="Les documents d&apos;un dossier freelance pour le visa DTV : justificatifs d&apos;activité, relevés bancaires et attestations"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Six pièces remplacent la fiche de paie. Prises isolément elles ne prouvent rien — c&apos;est leur cohérence d&apos;ensemble que l&apos;officier consulaire évalue.
          </figcaption>
        </figure>

        <div className="space-y-4">
            <div className="border rounded-2xl p-6 border-purple-500/30 bg-purple-500/5">
              <div className="flex items-start gap-4">
                <span className="text-2xl font-black text-purple-400 flex-shrink-0">01</span>
                <div>
                  <p className="text-white font-bold mb-1">Avis de situation SIRENE ou extrait Kbis</p>
                  <p className="text-xs font-semibold mb-2 text-purple-400">→ Preuve d'existence légale de votre activité</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    L’équivalent de votre ’acte de naissance’ professionnel. Il prouve que vous exercez une activité déclarée, enregistrée et légale en France. Pour une micro-entreprise, l’avis de situation SIRENE (gratuit sur insee.fr) suffit. Pour une société, fournissez un Kbis de moins de 3 mois.
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-2xl p-6 border-purple-500/30 bg-purple-500/5">
              <div className="flex items-start gap-4">
                <span className="text-2xl font-black text-purple-400 flex-shrink-0">02</span>
                <div>
                  <p className="text-white font-bold mb-1">Attestations de chiffre d'affaires URSSAF</p>
                  <p className="text-xs font-semibold mb-2 text-purple-400">→ Preuve de revenus réguliers sur 6 mois</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Téléchargeables directement depuis le <a href="https://www.autoentrepreneur.urssaf.fr" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:underline font-medium">portail officiel de l'URSSAF</a>. Ces attestations trimestrielles sont officielles, tamponnées et montrent l’évolution de votre CA. Fournissez les deux derniers trimestres pour couvrir 6 mois d’activité.
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-2xl p-6 border-emerald-500/30 bg-emerald-500/5">
              <div className="flex items-start gap-4">
                <span className="text-2xl font-black text-emerald-400 flex-shrink-0">03</span>
                <div>
                  <p className="text-white font-bold mb-1">Relevés bancaires personnels (3 à 6 mois)</p>
                  <p className="text-xs font-semibold mb-2 text-emerald-400">→ Preuve de la solvabilité des 500 000 THB</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    C’est la pièce maîtresse. Le solde de votre compte personnel doit maintenir l’équivalent de 500 000 THB (<MontantFonds />) sur la période demandée. Revolut et Boursorama sont acceptés à condition de fournir des relevés PDF officiels avec IBAN.
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-2xl p-6 border-purple-500/30 bg-purple-500/5">
              <div className="flex items-start gap-4">
                <span className="text-2xl font-black text-purple-400 flex-shrink-0">04</span>
                <div>
                  <p className="text-white font-bold mb-1">Portfolio de missions ou contrats clients</p>
                  <p className="text-xs font-semibold mb-2 text-purple-400">→ Preuve de la nature 'remote' de votre activité</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    L’ambassade doit comprendre que vous travaillez pour des clients non-thaïlandais depuis n’importe où dans le monde. Un PDF propre listant vos 3 à 5 derniers projets (nom du client, pays, nature de la mission, montant) suffit. Les contrats ou bons de commande sont un plus.
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-2xl p-6 border-purple-500/30 bg-purple-500/5">
              <div className="flex items-start gap-4">
                <span className="text-2xl font-black text-purple-400 flex-shrink-0">05</span>
                <div>
                  <p className="text-white font-bold mb-1">Lettre de motivation consulaire personnalisée</p>
                  <p className="text-xs font-semibold mb-2 text-purple-400">→ La pièce qui donne du sens à tout le reste</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Un document d’une page, rédigé en anglais, qui explique votre statut, votre mode de travail, vos revenus moyens et votre projet en Thaïlande. C’est vous qui parlez à l’officier avant même qu’il ouvre votre dossier. Cette lettre structure son interprétation de toutes les autres pièces.
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-2xl p-6 border-gray-500/30 bg-gray-500/5">
              <div className="flex items-start gap-4">
                <span className="text-2xl font-black text-gray-400 flex-shrink-0">06</span>
                <div>
                  <p className="text-white font-bold mb-1">Justificatif de domicile fiscal français</p>
                  <p className="text-xs font-semibold mb-2 text-gray-400">→ Preuve de votre centre de vie actuel</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Votre dernier avis d’imposition ou une quittance de loyer récente. L’ambassade doit savoir d’où vous venez. Ce document complète la cohérence géographique de votre dossier.
                  </p>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* ── SECTION 3 ── */}
      <section className="mb-14" id="cas-micro-entreprise">
        <h2 className="text-2xl font-bold text-white mb-5 scroll-mt-24">
          3. Cas concret : dossier micro-entreprise étape par étape
        </h2>
        <p className="mb-4">
          Prenons le cas de{" "}
          <strong className="text-white">
            Lucas, développeur web freelance sous micro-entreprise
          </strong>
          , basé à Lyon, avec un CA mensuel moyen de 4 500 € et un solde
          bancaire personnel de 15 000 €. Profil typique, potentiellement
          refusé si le dossier est mal monté.
        </p>

        <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden mt-6 mb-6">
          <div className="px-6 py-4 border-b border-white/5">
            <p className="text-white font-bold text-sm">
              📁 Composition du dossier Lucas — Micro-entreprise
            </p>
          </div>
          <div className="divide-y divide-white/5">
            {[
              ["Avis de situation SIRENE", "Téléchargé sur insee.fr le mois du dépôt", "✅"],
              ["Attestations URSSAF T1 + T2 2026", "CA déclaré : 4 200 € / 4 800 € / 4 500 € / 4 700 €", "✅"],
              ["Relevés Boursorama 6 mois", "Solde jamais < 14 500 €. Aucun virement suspect.", "✅"],
              ["Portfolio PDF 5 missions", "Clients FR + BE + CH. Missions 100% remote.", "✅"],
              ["Lettre consulaire EN", "1 page. Explique le statut micro, le mode remote, le projet Thaïlande.", "✅"],
              ["Avis d'imposition 2025", "Revenus déclarés cohérents avec les relevés URSSAF.", "✅"],
            ].map(([doc, detail, status]) => (
              <div key={doc} className="px-6 py-4 flex items-start gap-4">
                <span className="text-lg flex-shrink-0">{status}</span>
                <div>
                  <p className="text-white text-sm font-semibold">{doc}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h3 className="text-lg font-bold text-white mb-3">
          Que se passe-t-il si l'officier pose des questions supplémentaires ?
        </h3>
        <p className="mb-4 text-gray-400 text-sm leading-relaxed">
          Lors du dépôt, l'officier consulaire peut parfois demander à Lucas : <em>"Pourquoi n'avez-vous pas de fiches de paie ?"</em> ou <em>"Comment pouvez-vous garantir la pérennité de ces contrats de freelance ?"</em>. La règle d'or est de ne jamais paraître sur la défensive. Lucas doit simplement renvoyer l'officier à sa <strong>Lettre Consulaire (Document 05)</strong> et expliquer calmement que sous le régime français de la micro-entreprise, les revenus sont certifiés par l'État (via l'URSSAF) et non par un employeur, et que son portfolio démontre une activité stable avec des clients internationaux récurrents. La transparence et la courtoisie, appuyées par un dossier classé dans l'ordre, font disparaître les doutes en quelques secondes.
        </p>

        <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-2xl p-5 mt-5">
          <p className="text-emerald-400 font-semibold text-sm">
            Résultat : dossier accepté à l’ambassade de Vientiane en 3 jours ouvrables — un dépôt effectué avant la fermeture de cette voie aux non-résidents.
          </p>
          <p className="text-gray-400 text-sm mt-1">
            La clé : la lettre consulaire a explicitement traduit le statut
            micro-entreprise en termes compréhensibles pour un officier
            thaïlandais, et les relevés URSSAF ont servi de substitut aux
            fiches de paie manquantes.
          </p>
        </div>
      </section>

      {/* ── SECTION 4 ── */}
      <section className="mb-14" id="cas-portage-salarial">
        <h2 className="text-2xl font-bold text-white mb-5 scroll-mt-24">
          4. Cas concret : portage salarial et SASU
        </h2>

        <h3 className="text-lg font-bold text-white mb-3">
          Le portage salarial : le profil le plus simple
        </h3>
        <p className="mb-4">
          <strong className="text-white">
            Camille, graphiste en portage salarial
          </strong>
          , a le profil idéal sans le savoir. Sa société de portage lui émet
          chaque mois un vrai bulletin de salaire et une attestation employeur.
          Ces documents sont directement lisibles par un officier consulaire
          thaïlandais. Son dossier ressemble à celui d’un salarié, sans en être
          un.
        </p>
        <p className="mb-6">
          Point de vigilance : vérifier que l’attestation employeur mentionne
          explicitement la nature{" "}
          <em className="text-gray-300">"télétravail international autorisé"</em>{" "}
          ou <em className="text-gray-300">"activité exercée à distance"</em>.
          Sans cette mention, l’officier peut douter de la légalité du travail
          en dehors de France.
        </p>

        <h3 className="text-lg font-bold text-white mb-3">
          La SASU et l’EURL : le piège du compte pro
        </h3>
        <p className="mb-4">
          C’est l’erreur la plus fréquente chez les freelances en société.
          Beaucoup présentent les relevés de leur compte professionnel SASU pour
          prouver les 500 000 THB. L’ambassade rejette systématiquement ces
          relevés : l’argent appartient à la société, pas à vous en tant que
          personne physique.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5">
            <p className="text-red-400 font-bold text-sm mb-2">
              ❌ Ce que font la plupart
            </p>
            <p className="text-gray-400 text-sm">
              Présenter les relevés du compte SASU avec 25 000 € → Refus.
              L’argent appartient à la personne morale.
            </p>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5">
            <p className="text-emerald-400 font-bold text-sm mb-2">
              ✅ La bonne stratégie
            </p>
            <p className="text-gray-400 text-sm">
              Se verser une rémunération régulière depuis 6 mois + présenter
              les relevés du compte personnel + bulletins de salaire de
              dirigeant.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 5 ── */}
      <section className="mb-14" id="traductions-assermentees">
        <h2 className="text-2xl font-bold text-white mb-5 scroll-mt-24">
          5. Traductions assermentées : quand et pourquoi
        </h2>
        <p className="mb-4">
          Tous vos documents administratifs français (URSSAF, Kbis, avis
          d’imposition) sont en français. La traduction dépendait autrefois de
          l’ambassade choisie — depuis le 31 août 2026, ce choix n’existe plus
          pour un freelance français : c’est Paris, et Paris exige la traduction
          assermentée. Le tableau ci-dessous n’a donc plus valeur d’arbitrage,
          seulement de repère pour les résidents des pays concernés.
        </p>
        <figure className="my-8">
          <Image
            src="/images/blog/visa-dtv-freelance-traduction-assermentee.jpg"
            alt="Traduction assermentée d&apos;un dossier freelance pour l&apos;ambassade de Thaïlande"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Paris exige la traduction assermentée : 150 à 300 € et plusieurs jours. Ce coût, autrefois évitable en déposant en Asie, est devenu incontournable.
          </figcaption>
        </figure>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-gray-500 font-semibold">
                  Ambassade
                </th>
                <th className="text-left py-3 px-4 text-gray-500 font-semibold">
                  Traduction exigée
                </th>
                <th className="text-left py-3 px-4 text-gray-500 font-semibold">
                  Coût estimé
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                ["Paris 🇫🇷", "Assermentée obligatoire", "150–300 €"],
                ["Vientiane 🇱🇦 — résidents du Laos", "Souvent accepté en FR", "0 €"],
                ["Kuala Lumpur 🇲🇾 — résidents de Malaisie", "Recommandée EN", "80–150 €"],
                ["Phnom Penh 🇰🇭 — résidents du Cambodge", "Recommandée EN", "80–150 €"],
              ].map(([amb, trad, cout]) => (
                <tr key={amb}>
                  <td className="py-3 px-4 text-white">{amb}</td>
                  <td className="py-3 px-4 text-gray-400">{trad}</td>
                  <td className="py-3 px-4 text-purple-400 font-semibold">
                    {cout}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-500 text-xs mt-3">
          * Données terrain 2025–2026. Les pratiques consulaires évoluent.
        </p>
      </section>

      {/* ── SECTION 6 ── */}
      <section className="mb-14" id="strategie-ambassade">
        <h2 className="text-2xl font-bold text-white mb-5 scroll-mt-24">
          6. Quelle ambassade choisir selon votre profil freelance
        </h2>
        <p className="mb-6">
          Le poste de dépôt n’est plus un choix depuis le 31 août 2026 : il découle de votre nationalité ou de votre résidence légale.
          Si vous souhaitez vérifier les directives officielles françaises, vous pouvez consulter <a href="http://www.thaiembassy.fr/fr/visa-rdv/les-types-de-visa-et-les-documents-necessaires/dtv/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">le site de l'Ambassade de Thaïlande à Paris</a>.
          Pour un freelance français, voici notre recommandation selon votre
          situation :
        </p>

        <div className="space-y-4">
          {[
            {
              profil: "Micro-entrepreneur avec CA régulier + 15 000 € en banque par personne",
              reco: "Paris — le profil le plus simple à défendre",
              pourquoi:
                "3 mois d'historique suffisent et votre régularité de chiffre d'affaires parle d'elle-même. Prévoyez la traduction assermentée et quatre semaines d'instruction, et déposez sans inquiétude.",
              color: "border-emerald-500/30",
              badge: "bg-emerald-500/10 text-emerald-400",
            },
            {
              profil: "Portage salarial avec bulletins de salaire réguliers",
              reco: "Paris — le dossier le plus lisible pour un officier",
              pourquoi:
                "Vos bulletins de salaire ressemblent exactement à ce que l'ambassade attend d'un salarié. C'est le profil qui souffre le moins du passage obligatoire par Paris.",
              color: "border-purple-500/30",
              badge: "bg-purple-500/10 text-purple-400",
            },
            {
              profil: "SASU / EURL avec rémunération irrégulière",
              reco: "Paris, mais seulement après restructuration du dossier",
              pourquoi:
                "Il faut d’abord régulariser vos virements personnels sur 3 mois minimum. C'est le profil qui perd le plus au passage obligatoire par Paris : la souplesse des postes asiatiques ne rattrape plus rien, et déposer sans préparation = refus quasi-certain.",
              color: "border-red-500/30",
              badge: "bg-red-500/10 text-red-400",
            },
          ].map((item) => (
            <div
              key={item.profil}
              className={`border rounded-2xl p-6 bg-[#111111] ${item.color}`}
            >
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">
                Votre profil
              </p>
              <p className="text-white font-semibold mb-3">{item.profil}</p>
              <span
                className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${item.badge}`}
              >
                → {item.reco}
              </span>
              <p className="text-gray-400 text-sm">{item.pourquoi}</p>
            </div>
          ))}
        </div>
        <p className="mt-6">
          Vous remarquerez que la voie Soft Power revient dans deux profils sur trois. C’est
          logique : en passant par une école certifiée, vous n’avez plus à défendre votre statut
          professionnel devant l’officier consulaire, qui se concentre alors uniquement sur votre
          relevé bancaire. Encore faut-il choisir un établissement réellement homologué —{' '}
          <Link
            href="/blog/visa-dtv-soft-power-ecoles"
            className="text-purple-400 hover:underline font-medium"
          >
            notre guide des écoles Soft Power
          </Link>{' '}
          détaille comment repérer les écoles fantômes qui font annuler les visas.
        </p>
      </section>

      {/* ── NOUVELLE SECTION 7 : DÉLAIS DE PRÉPARATION ── */}
      <section className="mb-14" id="delais-preparation">
        <h2 className="text-2xl font-bold text-white mb-5 scroll-mt-24">
          7. Quel délai pour préparer son dossier freelance avant de partir ?
        </h2>
        <p className="mb-4">
          L'erreur majeure des freelances est de s'y prendre trop tard, en pensant qu'un simple téléchargement de Kbis la veille du départ suffit. La construction d'une narration financière cohérente exige du temps pour asseoir la légitimité de vos documents. Voici les délais incompressibles selon votre statut :
        </p>
        <ul className="space-y-4 mb-4">
          <li className="flex gap-4 p-4 border border-white/5 rounded-xl bg-[#111111]">
            <span className="text-xl">⏱️</span>
            <div>
              <strong className="text-white block mb-1">Portage Salarial : 1 à 2 mois</strong>
              <span className="text-sm text-gray-400">C'est le profil le plus rapide. Le temps d'obtenir les derniers bulletins de salaire consolidés et la lettre de votre entreprise de portage confirmant le travail à distance.</span>
            </div>
          </li>
          <li className="flex gap-4 p-4 border border-purple-500/20 rounded-xl bg-purple-500/5">
            <span className="text-xl">📅</span>
            <div>
              <strong className="text-white block mb-1">Micro-entrepreneur (Auto-entrepreneur) : 3 à 4 mois minimum</strong>
              <span className="text-sm text-gray-400">L'ambassade exige de voir la stabilité de vos revenus. Il faut générer au moins deux déclarations trimestrielles URSSAF ou 3 à 6 mois de déclarations mensuelles pour prouver que l'activité est pérenne et non artificielle.</span>
            </div>
          </li>
          <li className="flex gap-4 p-4 border border-red-500/20 rounded-xl bg-red-500/5">
            <span className="text-xl">🗓️</span>
            <div>
              <strong className="text-white block mb-1">Dirigeant de SASU / EURL : 6 mois (Phase critique)</strong>
              <span className="text-sm text-gray-400">Si vous ne vous versiez pas de rémunération régulière (ou si tout était laissé sur le compte pro), il faut initier des virements constants vers votre compte personnel pendant un semestre entier pour bâtir l'historique exigé par les consulats avant de soumettre la demande.</span>
            </div>
          </li>
        </ul>
        <p className="text-gray-400 text-sm">
          Planifiez votre projet en avance. Les exigences des ambassades ne se plient jamais à l'urgence d'un billet d'avion déjà réservé.
        </p>
      </section>

      {/* ── ENCART AUTEUR ── */}
      <div className="my-14 bg-[#111111] border border-gray-800 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-6 shadow-lg">
        <PhotoAuteur accent="purple" />
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-1">
            Matthieu Moretti
          </h3>
          <p className="text-purple-400 text-xs font-semibold mb-3 uppercase tracking-wider">
            Expert Dossiers Consulaires · Installé à Phuket
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Entrepreneur digital basé à Phuket depuis plusieurs années,
            j’accompagne les freelances et indépendants français dans la
            constitution de leur dossier DTV. J’ai aidé des dizaines de
            micro-entrepreneurs, consultants et créatifs à obtenir leur visa
            sans fiche de paie, en transformant leurs documents URSSAF et Kbis
            en dossiers consulaires irréfutables.
          </p>
        </div>
      </div>

      {/* ── MAILLAGE INTERNE ── */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 mb-12">
        <p className="text-white font-bold text-sm mb-4">
          📚 Pour aller plus loin :
        </p>
        <ul className="space-y-3">
          <li>
            <Link
              href="/blog/fonds-bancaires-visa-dtv"
              className="text-purple-400 hover:text-purple-300 hover:underline text-sm transition-colors"
            >
              → Visa DTV : Faut-il bloquer les 500 000 THB pendant 3 ou 6 mois ?
            </Link>
          </li>
          <li>
            <Link
              href="/blog/tdac-thailande-carte-arrivee"
              className="text-purple-400 hover:text-purple-300 hover:underline text-sm transition-colors"
            >
              → TDAC Thaïlande 2026 : Guide de la Carte d'Arrivée Numérique
            </Link>
          </li>
          <li>
            <Link
              href="/faq"
              className="text-purple-400 hover:text-purple-300 hover:underline text-sm transition-colors"
            >
              → FAQ complète : Toutes vos questions sur le Visa DTV
            </Link>
          </li>
        </ul>
      </div>

      {/* ── FAQ ── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white mb-6">
          Questions fréquentes — Freelance & Visa DTV
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

      {/* ── CTA ── */}
      <div className="mt-4 bg-[#111111] border border-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500 opacity-5 rounded-full blur-3xl" />
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 relative z-10">
          Votre dossier freelance, géré par des experts terrain
        </h3>
        <p className="text-gray-400 mb-8 text-sm md:text-base relative z-10">
          Kbis, URSSAF, portfolio, lettre consulaire : nous montons votre
          dossier complet et le soumettons à l’ambassade de votre choix. Taux
          d’acceptation de nos dossiers freelance : supérieur à 95%.
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
      <PartageArticle slug="visa-dtv-freelance-auto-entrepreneur" variant="fin" />

      <BlogNavigation variant="article-bottom" />
    </article>
  );
}
