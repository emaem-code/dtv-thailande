import React from 'react';
import BoutonEligibilite from '../../components/BoutonEligibilite';
import LienArticle from '../../components/LienArticle';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import BlogNavigation from '../../components/BlogNavigation';
import PartageArticle from '../../components/PartageArticle';
import {
  createArticleMetadata,
  createArticleSchema,
  createBreadcrumbSchema,
  getBlogPost,
} from '../posts';
import PhotoAuteur from '../../components/PhotoAuteur';

export const revalidate = 600;

const post = getBlogPost('dtv-nouvelles-regles-31-aout-2026');
const articleSchema = createArticleSchema(post);
const breadcrumbSchema = createBreadcrumbSchema(post);

export const metadata = createArticleMetadata(post);

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "J'ai déposé mon dossier à Vientiane et payé les frais. Dois-je recommencer ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. Les demandes soumises sur le portail e-Visa et dont les frais consulaires ont été acquittés avant le 31 août 2026 sont traitées selon les anciennes règles. Vous n'avez ni casier judiciaire à fournir, ni dossier à redéposer depuis votre pays d'origine.",
      },
    },
    {
      '@type': 'Question',
      name: 'Un DTV déjà délivré est-il remis en cause par ces nouvelles règles ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. Ces règles portent sur la délivrance de nouveaux visas, pas sur les visas en circulation. Aucune annulation, aucune régularisation, aucun casier judiciaire rétroactif. Vous ne serez soumis aux nouvelles conditions que le jour où vous déposerez une nouvelle demande, au terme de vos cinq ans.",
      },
    },
    {
      '@type': 'Question',
      name: 'Je suis français et je vis en Thaïlande sous exemption. Puis-je encore déposer au Laos ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non, à compter du 31 août 2026. L'ambassade de Vientiane et le consulat général de Savannakhet exigent désormais la nationalité laotienne ou une résidence permanente au Laos. Un séjour touristique ne constitue pas une résidence légale. Vous relevez de l'ambassade de Thaïlande à Paris.",
      },
    },
    {
      '@type': 'Question',
      name: 'Un bail de location suffit-il à prouver une résidence légale ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. Les postes consulaires interprètent la résidence légale de manière restrictive : il faut un titre de séjour, un permis de travail ou un visa étudiant délivré par l'État concerné. Un bail, une réservation d'hôtel ou un tampon d'entrée touristique ne suffisent pas.",
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la validité exigée du casier judiciaire ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Il doit avoir été émis dans les six mois précédant la soumission de la demande. Un document plus ancien entraîne le rejet du dossier. Demandez-le donc après avoir confirmé votre poste de dépôt, et non des mois à l'avance.",
      },
    },
    {
      '@type': 'Question',
      name: 'Mes enfants doivent-ils aussi fournir un casier judiciaire ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "L'ambassade de Thaïlande à Londres indique que les dépendants de moins de 16 ans en sont dispensés et peuvent s'appuyer sur le certificat du titulaire principal. Faites confirmer ce point par le poste dont vous relevez, les pratiques pouvant varier d'une mission à l'autre.",
      },
    },
    {
      '@type': 'Question',
      name: "Comment un Français obtient-il son casier judiciaire pour le DTV ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Il s'agit du bulletin n° 3 du casier judiciaire national, demandé gratuitement en ligne sur le site du ministère de la Justice, avec une réponse par courriel ou par courrier en quelques jours. Prévoyez du temps supplémentaire si le poste consulaire exige une traduction certifiée en anglais ou une légalisation.",
      },
    },
    {
      '@type': 'Question',
      name: "L'extension de 180 jours effectuée en Thaïlande est-elle concernée ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. L'extension relève des bureaux d'immigration thaïlandais, donc du ministère de l'Intérieur, tandis que les règles de dépôt consulaire relèvent du ministère des Affaires étrangères. Aucun casier judiciaire n'est demandé au guichet pour une extension.",
      },
    },
    {
      '@type': 'Question',
      name: 'Le montant des fonds à justifier change-t-il au 31 août 2026 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non, il reste de 500 000 THB. Ce qui s'est durci ces derniers mois, indépendamment de cette réforme, c'est la vérification de l'ancienneté du solde : les postes examinent les relevés sur plusieurs mois afin d'écarter les dépôts de complaisance effectués la veille de la demande.",
      },
    },
    {
      '@type': 'Question',
      name: "L'exemption de visa de 60 jours est-elle déjà passée à 30 jours ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, le texte est paru. La révision a été publiée au Journal Royal le 31 août 2026 et s'applique aux entrées effectuées à partir du 15 septembre 2026. La liste des pays exemptés passe de 93 à 60, avec 30 jours pour l'essentiel d'entre eux dont l'ensemble des États membres de l'Union européenne, 15 jours pour Maurice et les Seychelles, et un basculement vers le visa à l'arrivée pour trois autres. Les voyageurs entrés avant le 15 septembre conservent les 60 jours portés sur leur tampon.",
      },
    },
  ],
};

const sommaire = [
  { id: 'ce-qui-change', label: 'Ce qui change exactement, et rien de plus' },
  { id: 'clause-sauvegarde', label: 'La clause de sauvegarde : qui passe entre les gouttes' },
  { id: 'detenteurs-actuels', label: 'Les détenteurs actuels de DTV ne sont pas concernés' },
  { id: 'vrai-perdant', label: 'Le vrai perdant : celui qui est déjà sur place' },
  { id: 'casier-judiciaire', label: 'Le casier judiciaire en pratique, pays par pays' },
  { id: 'cas-francais', label: 'Le cas français, concrètement' },
  { id: 'contexte', label: 'Pourquoi maintenant : le contexte' },
  { id: 'fausses-infos', label: 'Trois affirmations qui circulent, et qui sont fausses' },
  { id: 'que-faire', label: 'Que faire, selon votre situation' },
];

export default function ArticleNouvellesReglesDTV() {
  // En production, un article programmé reste invisible jusqu'à sa date.
  // En développement (npm run dev), il s'affiche pour permettre la relecture.
  const estProgramme = new Date(post?.publishedAt) > new Date();
  if (!post || (estProgramme && process.env.NODE_ENV === 'production')) {
    notFound();
  }

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
        <span className="inline-block rounded-full border border-red-500/25 bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-red-400 mb-5">
          Actualité · Immigration
        </span>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
          Visa DTV :{' '}
          <span className="text-red-400">
            les nouvelles règles du 31 août 2026, et qui passe entre les gouttes
          </span>
        </h1>

        <p className="text-base text-gray-500 mt-6">
          Lecture : 13 min · Mis à jour : {post.date} · Par{' '}
          <strong className="text-gray-400">Matthieu Moretti</strong>
        </p>
        <PartageArticle slug="dtv-nouvelles-regles-31-aout-2026" variant="entete" />
      </header>

      {/* ── INTRODUCTION ── */}
      <div className="text-lg text-gray-400 mb-12 space-y-5">
        <p>
          Il y a des articles qu&apos;on écrit tranquillement, et d&apos;autres qu&apos;on écrit la
          veille. Celui-ci est de la seconde catégorie.
        </p>
        <p>
          À partir du 31 août 2026, obtenir un Visa DTV suppose deux conditions qui n&apos;existaient
          pas hier :{' '}
          <strong className="text-white">
            déposer sa demande auprès du poste consulaire dont on relève par sa nationalité ou par sa
            résidence légale
          </strong>
          , et{' '}
          <strong className="text-white">joindre un extrait de casier judiciaire</strong>. Deux
          phrases, qui suffisent à rendre caduque la méthode par laquelle une bonne partie des
          expatriés que je connais ont obtenu leur visa.
        </p>
        <p className="text-white font-medium border-l-4 border-red-500 pl-5 py-1">
          Avant tout le reste, trois réponses directes. Si votre dossier est déjà déposé et payé,
          vous n&apos;êtes pas concerné. Si vous détenez déjà un DTV, vous n&apos;êtes pas concerné
          non plus. Et si vous comptiez déposer depuis Vientiane, Savannakhet ou Kuala Lumpur sans y
          résider : ce n&apos;est pas devenu plus difficile, c&apos;est devenu impossible.
        </p>
        <p>
          Je vais aussi corriger trois affirmations qui circulent en ce moment sur les réseaux et
          jusque dans des articles d&apos;apparence sérieuse. Elles sont fausses, et elles font
          paniquer des gens pour rien. La section 8 leur est consacrée.
        </p>
      </div>

      {/* ── SOMMAIRE ── */}
      <nav className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 mb-12 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Au programme de ce dossier :</h2>
        <ul className="space-y-3">
          {sommaire.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-red-400 hover:text-red-300 hover:underline transition-colors text-sm md:text-base"
              >
                {i + 1}. {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── SECTION 1 ── */}
      <section className="mb-12">
        <h2 id="ce-qui-change" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          1. Ce qui change exactement, et rien de plus
        </h2>
        <p className="mb-6">
          Deux choses. Il faut le dire d&apos;emblée, parce que la rumeur a tendance à en ajouter.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">
          La juridiction consulaire devient contraignante
        </h3>
        <p className="mb-4">
          Jusqu&apos;ici, le portail e-Visa laissait choisir son poste de dépôt avec une liberté
          remarquable. Un Français installé à Chiang Mai pouvait prendre un vol pour Vientiane,
          déposer sa demande auprès de l&apos;ambassade de Thaïlande au Laos, et rentrer avec son DTV
          trois jours plus tard. C&apos;est exactement le{' '}
          <LienArticle
            slug="cas-client-visa-dtv-soft-power-vientiane"
            className="text-red-400 hover:underline font-medium"
          >
            cas client que j&apos;ai raconté ici il y a deux semaines
          </LienArticle>
          .
        </p>
        <p className="mb-4">
          À partir du 31 août, le demandeur doit relever du poste où il dépose :{' '}
          <strong className="text-white">
            soit par sa nationalité, soit par un statut de résidence légale dans le pays de ce poste.
          </strong>{' '}
          L&apos;ambassade de Vientiane et le consulat général de Savannakhet exigent désormais
          d&apos;être ressortissant laotien ou résident permanent au Laos. L&apos;ambassade de Londres
          demande une preuve de résidence permanente au Royaume-Uni ou en Irlande. Celle de Singapour
          n&apos;accepte que les citoyens singapouriens et les titulaires d&apos;un pass de résidence
          en cours de validité.
        </p>

        <div className="bg-red-500/5 border border-red-500/25 rounded-2xl p-6 mb-6">
          <p className="text-white font-semibold mb-2">
            La présence ne vaut pas la résidence
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            C&apos;est le point sur lequel se joueront la plupart des refus. Un tampon d&apos;entrée
            touristique, une réservation d&apos;hôtel, un bail de trois mois signé sur place :
            aucun de ces éléments n&apos;établit une résidence légale. Il faut un titre de séjour, un
            permis de travail ou un visa étudiant — un document délivré par l&apos;État où vous vous
            trouvez, et qui vous y rattache officiellement.
          </p>
        </div>

        <figure className="my-8">
          <Image
            src="/images/blog/dtv-31-aout-guichet-consulaire.jpg"
            alt="Rangée de guichets consulaires vides, stores baissés, en fin de journée"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            La question n&apos;est plus « quel poste va le plus vite », mais « de quel poste je
            relève ».
          </figcaption>
        </figure>

        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">
          Le casier judiciaire devient obligatoire
        </h3>
        <p className="mb-4">
          Second volet :{' '}
          <strong className="text-white">
            tout demandeur principal doit joindre un extrait de casier judiciaire
          </strong>
          , délivré par les autorités de son pays de nationalité ou du pays de résidence légale depuis
          lequel il dépose.
        </p>
        <p className="mb-6">
          La contrainte technique la plus importante est sa fraîcheur : le document doit avoir été{' '}
          <strong className="text-white">émis dans les six mois précédant le dépôt</strong>.
          Confortable si vous anticipez, fatal si vous découvrez la règle le jour du dépôt.
          L&apos;ambassade de Londres précise par ailleurs que{' '}
          <strong className="text-white">les enfants de moins de 16 ans en sont dispensés</strong> :
          ils s&apos;appuient sur le casier du titulaire principal.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">Et c&apos;est tout</h3>
        <p className="mb-6">
          Aucun autre paramètre du DTV ne bouge. Ni la durée, ni le prix, ni les fonds, ni les
          catégories d&apos;éligibilité. Je le répète parce que j&apos;ai lu le contraire trois fois
          cette semaine.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-gray-800 mb-6">
          <table className="w-full min-w-[440px] text-sm">
            <thead>
              <tr className="bg-[#111111] border-b border-gray-800">
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Paramètre</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">
                  Valeur — inchangée au 31 août 2026
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]">
                <td className="px-4 py-3">Validité du visa</td>
                <td className="px-4 py-3 text-white">5 ans</td>
              </tr>
              <tr className="border-b border-gray-800/60">
                <td className="px-4 py-3">Entrées</td>
                <td className="px-4 py-3 text-white">multiples, illimitées</td>
              </tr>
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]">
                <td className="px-4 py-3">Séjour par entrée</td>
                <td className="px-4 py-3 text-white">180 jours</td>
              </tr>
              <tr className="border-b border-gray-800/60">
                <td className="px-4 py-3">Extension sur place</td>
                <td className="px-4 py-3 text-white">1 par entrée, 180 jours, 1 900 THB</td>
              </tr>
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]">
                <td className="px-4 py-3">Fonds à justifier</td>
                <td className="px-4 py-3 text-white">500 000 THB</td>
              </tr>
              <tr className="border-b border-gray-800/60">
                <td className="px-4 py-3">Frais consulaires</td>
                <td className="px-4 py-3 text-white">≈ 10 000 THB (≈ 350 € en France)</td>
              </tr>
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]">
                <td className="px-4 py-3">Âge minimum</td>
                <td className="px-4 py-3 text-white">20 ans</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Dépendants</td>
                <td className="px-4 py-3 text-white">conjoint marié, enfants de moins de 20 ans</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Le gouvernement thaïlandais ne cherche pas à fermer le DTV. Il cherche à savoir qui le
          demande, et depuis où.
        </p>
      </section>

      {/* ── SECTION 2 ── */}
      <section className="mb-12">
        <h2 id="clause-sauvegarde" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          2. La clause de sauvegarde : qui passe entre les gouttes
        </h2>
        <p className="mb-4">
          L&apos;administration a prévu un mécanisme de droits acquis, et il est clair :{' '}
          <strong className="text-white">
            les demandes soumises sur le portail officiel et dont les frais consulaires ont été
            acquittés avant le 31 août 2026 sont traitées selon les anciennes règles.
          </strong>{' '}
          L&apos;ambassade de Vientiane l&apos;a formulé explicitement.
        </p>
        <p className="mb-4">
          <strong className="text-white">Si vous avez déjà déposé et payé</strong> — y compris auprès
          d&apos;un poste dont vous ne relevez pas —, votre dossier suit son cours. Rien à annuler,
          rien à recommencer, aucun casier judiciaire à produire après coup. Laissez faire.
        </p>
        <p className="mb-6">
          <strong className="text-white">Si vous n&apos;avez pas encore payé</strong>, la fenêtre se
          referme. Et je vais être franc : je ne parierais pas sur les dernières heures. La
          formulation officielle est « avant le 31 août », et les postes consulaires ne sont pas tous
          dans le même fuseau horaire que vous ni que Bangkok. Un dépôt dans la nuit du 30 au 31 est
          un pari, pas une stratégie.
        </p>

        <div className="bg-amber-500/5 border border-amber-500/30 rounded-2xl p-6">
          <p className="text-white font-semibold mb-2">Un point d&apos;honnêteté</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Je ne vous dis pas de déposer un dossier bâclé pour gagner la course. Un dossier refusé
            coûte{' '}
            <strong className="text-white">10 000 THB non remboursables</strong> et ne vous rend pas
            éligible à l&apos;ancien régime pour autant. Si votre dossier n&apos;est pas prêt, il
            n&apos;est pas prêt — on passera par la nouvelle procédure, et ce n&apos;est pas la fin du
            monde.
          </p>
        </div>
      </section>

      {/* ── SECTION 3 ── */}
      <section className="mb-12">
        <h2 id="detenteurs-actuels" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          3. Les détenteurs actuels de DTV ne sont pas concernés. Vraiment.
        </h2>
        <p className="mb-4">
          C&apos;est la question que j&apos;ai reçue le plus souvent ces trois derniers jours, alors
          répondons-y sans détour.
        </p>
        <p className="mb-6">
          <strong className="text-white">Un DTV valablement délivré reste valable.</strong> Ces
          nouvelles règles portent sur la délivrance, pas sur les visas en circulation. Il
          n&apos;existe aucune annonce d&apos;annulation, aucune obligation de régularisation, aucun
          casier judiciaire à fournir rétroactivement. Vous continuez à entrer et sortir comme avant,
          avec vos 180 jours par entrée. Les nouvelles conditions ne vous rattraperont qu&apos;au
          terme des cinq ans, le jour où vous déposerez une <em>nouvelle</em> demande.
        </p>

        <ul className="space-y-3 mb-6 pl-4 border-l-2 border-emerald-500/40 text-gray-400 text-sm">
          <li>
            <strong className="text-white">
              L&apos;
              <LienArticle
                slug="extension-180-jours-visa-dtv-thailande"
                className="text-red-400 hover:underline font-medium"
              >
                extension de 180 jours
              </LienArticle>{' '}
              n&apos;est pas touchée.
            </strong>{' '}
            Elle relève des bureaux d&apos;immigration, donc du ministère de l&apos;Intérieur ; les
            règles de dépôt consulaire relèvent des Affaires étrangères. Deux administrations, deux
            compétences. On ne vous demandera pas de casier judiciaire au guichet de Phuket.
          </li>
          <li>
            <strong className="text-white">Une sortie-rentrée n&apos;est pas un nouveau dépôt.</strong>{' '}
            Vous n&apos;êtes pas en train de redemander un visa, vous utilisez celui que vous avez.
          </li>
        </ul>
      </section>

      {/* ── SECTION 4 ── */}
      <section className="mb-12">
        <h2 id="vrai-perdant" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          4. Le vrai perdant : celui qui est déjà sur place
        </h2>
        <p className="mb-4">
          Voilà le profil sur lequel cette réforme tombe le plus durement, et ce n&apos;est pas celui
          auquel on pense. Ce n&apos;est pas le fraudeur.{' '}
          <strong className="text-white">
            C&apos;est la personne déjà installée en Thaïlande, sous exemption touristique, qui allait
            faire son DTV « le mois prochain ».
          </strong>
        </p>
        <p className="mb-4">
          Le scénario était devenu un standard. On arrive avec une exemption. On teste la vie sur
          place. On s&apos;inscrit dans{' '}
          <LienArticle
            slug="visa-dtv-soft-power-ecoles"
            className="text-red-400 hover:underline font-medium"
          >
            une école de Muay Thaï
          </LienArticle>{' '}
          à Chiang Mai, on signe un bail à Koh Samui, on trouve son rythme de télétravail. Puis, deux
          mois plus tard, on prend un vol à 80 € pour Vientiane, on{' '}
          <LienArticle
            slug="guide-depot-dossier-evisa-dtv"
            className="text-red-400 hover:underline font-medium"
          >
            dépose son dossier sur le portail e-Visa
          </LienArticle>{' '}
          avec la lettre de l&apos;école, et on rentre légalement pour 180 jours.
        </p>
        <p className="mb-6">
          À partir de demain, cette personne ne peut plus déposer au Laos. Elle doit{' '}
          <strong className="text-white">
            rentrer physiquement en France, en Belgique, en Suisse ou au Canada
          </strong>
          , y obtenir son casier judiciaire, et y déposer sa demande. Coût : un billet long-courrier
          aller-retour, plusieurs semaines d&apos;organisation, et l&apos;interruption complète du
          projet en cours. La probabilité qu&apos;un élève interrompe son cursus de Muay Thaï pour
          aller chercher un papier à Paris et revenir est, disons-le franchement, faible.
        </p>

        <figure className="my-8">
          <Image
            src="/images/blog/dtv-31-aout-camp-muay-thai.jpg"
            alt="Camp de Muay Thaï au petit matin, ring vide et sacs de frappe immobiles"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Le modèle « j&apos;arrive, j&apos;essaie, je régularise ensuite au Laos » s&apos;arrête
            ici.
          </figcaption>
        </figure>

        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">
          Ce que ça change pour les écoles et les commerces locaux
        </h3>
        <p className="mb-4">
          Il y a une conséquence économique dont personne ne parle et qui est pourtant massive. Tout
          un écosystème — camps de Muay Thaï, écoles de cuisine, centres de plongée à Koh Tao, espaces
          de coliving à Chiang Mai — a bâti son modèle commercial sur{' '}
          <strong className="text-white">l&apos;achat d&apos;impulsion</strong>. On vient en touriste,
          on essaie, on s&apos;engage sur trois mois, et on régularise ensuite au Laos.
        </p>
        <p className="mb-6">
          Ce discours commercial meurt demain matin. Ces établissements vont devoir demander à leurs
          futurs élèves de s&apos;inscrire, de payer un acompte et d&apos;obtenir leur visa{' '}
          <strong className="text-white">
            depuis leur pays d&apos;origine, avant même d&apos;acheter leur billet
          </strong>
          . Un séjour d&apos;impulsion devient un projet d&apos;expatriation prémédité de plusieurs
          mois. Si vous dirigez ou conseillez l&apos;un de ces établissements : votre argumentaire de
          vente doit changer aujourd&apos;hui, pas dans six mois.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">
          Et le nomade sans attache
        </h3>
        <p>
          Autre profil pris en tenaille : celui qui n&apos;a plus de point d&apos;ancrage nulle part.
          Plus de résidence dans son pays d&apos;origine, pas de titre de séjour ailleurs. Un Français
          qui travaille à distance depuis Bali avec un visa touristique indonésien ne relève ni de
          l&apos;ambassade de Jakarta — il n&apos;y réside pas légalement — ni d&apos;aucune autre,
          sauf celle de Paris. Pour ces profils, le DTV redevient ce qu&apos;il n&apos;avait jamais
          été : une démarche qui suppose une attache administrative quelque part dans le monde.
        </p>
      </section>

      {/* ── SECTION 5 ── */}
      <section className="mb-12">
        <h2 id="casier-judiciaire" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          5. Le casier judiciaire en pratique, pays par pays
        </h2>
        <p className="mb-4">
          C&apos;est le point sur lequel je suis en désaccord avec ce que je lis ailleurs. Plusieurs
          analyses annoncent « quatre à douze semaines » de délai pour obtenir ce document. C&apos;est
          vrai dans certains pays. <strong className="text-white">Ce n&apos;est pas vrai en France.</strong>
        </p>

        <div className="bg-emerald-500/5 border border-emerald-500/25 rounded-2xl p-6 mb-6">
          <p className="text-white font-semibold mb-2">
            Pour un Français, c&apos;est gratuit et ça prend quelques jours
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Le document pertinent est le{' '}
            <strong className="text-white">bulletin n° 3 du casier judiciaire national</strong>. Il se
            demande en ligne, gratuitement, sur le site du ministère de la Justice, avec FranceConnect
            pour aller plus vite. La réponse arrive par courriel — un lien pour récupérer le document
            — ou par voie postale en quelques jours. C&apos;est probablement l&apos;étape la moins
            pénible de tout votre dossier DTV.{' '}
            <strong className="text-white">
              Ne laissez personne vous facturer une prestation pour ça.
            </strong>
          </p>
        </div>

        <p className="mb-4">Deux réserves honnêtes, parce qu&apos;elles peuvent coûter des semaines :</p>
        <ul className="space-y-3 mb-8 pl-4 border-l-2 border-amber-500/40 text-gray-400 text-sm">
          <li>
            <strong className="text-white">Si vous êtes né hors de France</strong> et que vous
            n&apos;utilisez pas FranceConnect, il faut joindre une pièce d&apos;identité, ce qui
            rallonge le traitement. Anticipez.
          </li>
          <li>
            <strong className="text-white">
              La traduction et la légalisation restent à vérifier auprès de votre poste.
            </strong>{' '}
            Beaucoup de missions exigent une traduction certifiée en anglais, et certaines une
            apostille. C&apos;est cette étape-là, et non l&apos;obtention du bulletin, qui allonge les
            délais. Écrivez à l&apos;ambassade avant de lancer quoi que ce soit.
          </li>
        </ul>

        <figure className="my-8">
          <Image
            src="/images/blog/dtv-31-aout-preparation-dossier.jpg"
            alt="Table de travail avec un passeport, des documents administratifs et un ordinateur portable"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Le bon ordre : je confirme mon poste, je demande mon casier, je constitue le reste.
          </figcaption>
        </figure>

        <div className="overflow-x-auto rounded-2xl border border-gray-800 mb-6">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="bg-[#111111] border-b border-gray-800">
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Pays</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Document</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Remarque</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]">
                <td className="px-4 py-3 text-white">France</td>
                <td className="px-4 py-3">Bulletin n° 3 du casier judiciaire national</td>
                <td className="px-4 py-3">En ligne, gratuit, réponse en quelques jours</td>
              </tr>
              <tr className="border-b border-gray-800/60">
                <td className="px-4 py-3 text-white">Belgique</td>
                <td className="px-4 py-3">Extrait de casier judiciaire</td>
                <td className="px-4 py-3">
                  Commune de résidence ; via le poste diplomatique pour les Belges de l&apos;étranger
                </td>
              </tr>
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]">
                <td className="px-4 py-3 text-white">Suisse</td>
                <td className="px-4 py-3">Extrait du casier judiciaire suisse</td>
                <td className="px-4 py-3">Demande en ligne ou en poste, document payant</td>
              </tr>
              <tr className="border-b border-gray-800/60">
                <td className="px-4 py-3 text-white">Canada</td>
                <td className="px-4 py-3">Vérification de casier judiciaire (GRC ou police locale)</td>
                <td className="px-4 py-3">Souvent avec empreintes, délais plus longs</td>
              </tr>
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]">
                <td className="px-4 py-3 text-white">Royaume-Uni</td>
                <td className="px-4 py-3">ACRO Police Certificate</td>
                <td className="px-4 py-3">Cité explicitement par l&apos;ambassade de Londres</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-white">États-Unis</td>
                <td className="px-4 py-3">FBI Identity History Summary, ou certificat d&apos;État</td>
                <td className="px-4 py-3">Délais très variables selon la voie choisie</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          <strong className="text-white">La règle des six mois s&apos;applique dans tous les cas.</strong>{' '}
          Un casier obtenu « au cas où » il y a huit mois est inutilisable. Le bon ordre est donc :
          je confirme mon poste de dépôt, je demande mon casier, je constitue le reste du dossier, je
          dépose.
        </p>
      </section>

      {/* ── SECTION 6 ── */}
      <section className="mb-12">
        <h2 id="cas-francais" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          6. Le cas français, concrètement
        </h2>
        <p className="mb-6">
          Pour un Français, la nouvelle règle est en réalité moins brutale que pour beaucoup
          d&apos;autres nationalités. Voici la lecture simple.
        </p>

        <ul className="space-y-4 mb-8 pl-4 border-l-2 border-red-500/40 text-gray-400 text-sm">
          <li>
            <strong className="text-white">Vous vivez en France.</strong> Vous relevez de
            l&apos;ambassade de Thaïlande à Paris, comme avant. Vous ajoutez votre bulletin n° 3 au
            dossier. C&apos;est tout ce qui change pour vous — le passage par le Laos était une
            commodité, pas une nécessité.
          </li>
          <li>
            <strong className="text-white">Vous vivez légalement dans un pays tiers</strong> — carte
            de résident à Dubaï, permis de travail à Singapour, titre de séjour au Portugal. Vous
            relevez du poste thaïlandais compétent pour ce pays, à condition de produire votre titre{' '}
            <strong className="text-white">en cours de validité</strong>. Un titre expiré vous renvoie
            à Paris.
          </li>
          <li>
            <strong className="text-white">
              Vous êtes actuellement en Thaïlande sous exemption, sans titre de séjour ailleurs.
            </strong>{' '}
            Vous devez rentrer en France. Il n&apos;y a pas de contournement, et je préfère vous le
            dire clairement plutôt que de vous laisser espérer.
          </li>
        </ul>

        <div className="bg-red-500/5 border border-red-500/25 rounded-2xl p-6">
          <p className="text-white font-semibold mb-2">
            Sur la tentation de mentir sur sa localisation : ne le faites pas
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Le portail e-Visa, les bases de l&apos;immigration aux frontières et{' '}
            <LienArticle
              slug="tdac-thailande-carte-arrivee"
              className="text-red-400 hover:underline font-medium"
            >
              la carte d&apos;arrivée numérique
            </LienArticle>{' '}
            sont désormais interconnectés. Déclarer être en France alors qu&apos;aucune sortie du
            territoire thaïlandais n&apos;est enregistrée à votre nom est détectable de manière
            triviale. Le risque n&apos;est pas un refus à 10 000 THB : c&apos;est{' '}
            <LienArticle
              slug="overstay-thailande-amende-blacklist-visa-dtv"
              className="text-red-400 hover:underline font-medium"
            >
              une inscription sur liste noire
            </LienArticle>{' '}
            qui vous ferme le Royaume pour de bon. Aucun dossier ne vaut ça.
          </p>
        </div>
      </section>

      {/* ── SECTION 7 ── */}
      <section className="mb-12">
        <h2 id="contexte" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          7. Pourquoi maintenant : le contexte
        </h2>
        <p className="mb-4">
          Cette réforme n&apos;arrive pas seule, et la comprendre dans son ensemble aide à anticiper
          la suite.
        </p>
        <p className="mb-4">
          Depuis 2024, la Thaïlande avait poussé très loin la logique d&apos;ouverture : exemption de
          visa de 60 jours pour 93 pays, DTV créé sur mesure pour les nomades, dépôt consulaire
          entièrement dématérialisé. Le résultat a été une croissance forte des arrivées — et, de
          l&apos;aveu des autorités, une exploitation systématique de ces facilités par des activités
          qui n&apos;avaient rien de touristique.
        </p>
        <p className="mb-6">
          La dématérialisation complète du dépôt, début 2025, a eu un effet secondaire que personne
          n&apos;avait anticipé :{' '}
          <strong className="text-white">
            les agents consulaires ont perdu la capacité de vérifier qu&apos;un demandeur se trouvait
            bien dans leur juridiction.
          </strong>{' '}
          La règle du 31 août rétablit ce contrôle par le droit, faute de pouvoir le faire au guichet.
        </p>
        <p>
          Il faut aussi replacer cela dans un mouvement plus large : le conseil des ministres
          thaïlandais a approuvé, en mai puis en juillet 2026,{' '}
          <LienArticle
            slug="fin-exemption-visa-60-jours"
            className="text-red-400 hover:underline font-medium"
          >
            la fin de l&apos;exemption de 60 jours
          </LienArticle>{' '}
          au profit d&apos;un système à trois paliers. J&apos;y viens tout de suite — parce que
          c&apos;est exactement le genre de sujet sur lequel il faut être précis.
        </p>
      </section>

      {/* ── SECTION 8 ── */}
      <section className="mb-12">
        <h2 id="fausses-infos" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          8. Trois affirmations qui circulent, et qui sont fausses
        </h2>
        <p className="mb-8">
          J&apos;ai lu ces trois choses cette semaine, dans des articles sérieux en apparence. Elles
          sont inexactes, et elles créent une inquiétude injustifiée.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mb-3">
          « L&apos;exemption de visa est passée de 60 à 30 jours »
        </h3>
        <p className="mb-4">
          <strong className="text-white">
            Mise à jour du 2 septembre 2026 : c&apos;est désormais exact, mais pas encore applicable.
          </strong>{' '}
          Au moment où j&apos;ai publié cet article, les arrêtés du ministère de l&apos;Intérieur
          n&apos;étaient pas parus. Ils ont été{' '}
          <strong className="text-white">publiés au Journal Royal le 31 août 2026</strong> et prennent
          effet, conformément au délai de quinze jours, pour les entrées effectuées{' '}
          <strong className="text-white">à partir du 15 septembre 2026</strong>.
        </p>
        <p className="mb-6">
          Ce n&apos;est pas pour autant un simple passage de 60 à 30 jours pour tout le monde. Le
          dispositif resserre d&apos;abord la liste des pays exemptés, qui passe de 93 à{' '}
          <strong className="text-white">60 pays et territoires</strong>. Ceux qui y restent — dont
          l&apos;ensemble des 27 États membres de l&apos;Union européenne — basculent à 30 jours ;
          Maurice et les Seychelles tombent à 15 jours ; trois autres passent au visa à
          l&apos;arrivée. Point capital : le texte n&apos;est pas rétroactif. Si vous entrez
          jusqu&apos;au 14 septembre inclus, vous gardez les 60 jours portés sur votre tampon,
          jusqu&apos;à leur terme.{' '}
          <LienArticle
            slug="fin-exemption-visa-60-jours"
            className="text-red-400 hover:underline font-medium"
          >
            Le détail du nouveau barème, entrée par entrée
          </LienArticle>
          .
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mb-3">
          « L&apos;application THIM remplace la carte d&apos;arrivée TDAC »
        </h3>
        <p className="mb-6">
          <strong className="text-white">Non.</strong> THIM est une <em>interface</em> qui remplit et
          transmet une TDAC pour vous, en scannant votre passeport. Elle ne remplace pas
          l&apos;obligation, elle la simplifie. La carte d&apos;arrivée numérique, obligatoire depuis
          mai 2025, reste l&apos;obligation de fond, et le portail web classique demeure disponible.
          Ce qui est exact, c&apos;est que le Bureau de l&apos;Immigration vise une généralisation de
          THIM aux points de passage à partir d&apos;août 2026. Ce qui est faux, c&apos;est
          d&apos;en conclure que vous risquez un refoulement faute d&apos;avoir installé une
          application. Vous devez soumettre une TDAC — par l&apos;application ou par le web — dans la
          fenêtre de 24 à 72 heures avant votre arrivée. Comme avant.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mb-3">
          « Les nouvelles règles vont annuler les DTV existants »
        </h3>
        <p>
          <strong className="text-white">Non.</strong> Je l&apos;ai déjà écrit en section 3, mais cette
          rumeur circule assez pour mériter d&apos;être démentie deux fois. Aucune annonce ne remet en
          cause les visas déjà délivrés.
        </p>
      </section>

      {/* ── SECTION 9 ── */}
      <section className="mb-12">
        <h2 id="que-faire" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          9. Que faire, selon votre situation
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-gray-800 mb-6">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="bg-[#111111] border-b border-gray-800">
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Votre situation</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Ce que vous devez faire</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]">
                <td className="px-4 py-3 text-white">Dossier déposé et payé avant le 31 août</td>
                <td className="px-4 py-3">Rien. Votre dossier suit les anciennes règles.</td>
              </tr>
              <tr className="border-b border-gray-800/60">
                <td className="px-4 py-3 text-white">DTV déjà en poche</td>
                <td className="px-4 py-3">Rien. Aucune démarche rétroactive.</td>
              </tr>
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]">
                <td className="px-4 py-3 text-white">Vous vivez en France, projet en cours</td>
                <td className="px-4 py-3">
                  Demandez votre bulletin n° 3 dès maintenant, et vérifiez auprès de Paris les
                  exigences de traduction.
                </td>
              </tr>
              <tr className="border-b border-gray-800/60">
                <td className="px-4 py-3 text-white">Vous vivez légalement dans un pays tiers</td>
                <td className="px-4 py-3">
                  Rassemblez la preuve de votre titre de séjour en cours de validité, et écrivez au
                  poste compétent avant de payer.
                </td>
              </tr>
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]">
                <td className="px-4 py-3 text-white">Vous êtes en Thaïlande sous exemption</td>
                <td className="px-4 py-3">
                  Planifiez un retour en Europe. Ne tentez pas un dépôt depuis un pays voisin, et ne
                  mentez pas sur votre localisation.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-white">Vous dirigez une école ou un centre</td>
                <td className="px-4 py-3">
                  Changez votre argumentaire aujourd&apos;hui : le visa se prépare avant le départ,
                  plus après l&apos;arrivée.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mb-4">
          Un conseil qui vaut pour tout le monde et qui coûte cinq minutes :{' '}
          <strong className="text-white">
            demandez au poste consulaire une confirmation écrite, par courriel, que vos justificatifs
            de résidence sont acceptés — avant de payer les 10 000 THB.
          </strong>{' '}
          Ces frais ne sont pas remboursables en cas de refus.
        </p>
        <p>
          Et tant que votre visa n&apos;est pas délivré, achetez vos billets et vos réservations
          d&apos;hôtel en tarif annulable. C&apos;est le genre de précaution qu&apos;on trouve
          excessive jusqu&apos;au jour où elle sert.
        </p>
      </section>

      {/* ── À RETENIR ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Ce qu&apos;il faut retenir</h2>
        <ul className="space-y-3 mb-6 pl-4 border-l-2 border-red-500/40 text-gray-400 text-sm">
          <li>
            <strong className="text-white">Deux changements, pas plus :</strong> dépôt depuis son pays
            de nationalité ou de résidence légale, et casier judiciaire de moins de six mois.
          </li>
          <li>
            <strong className="text-white">
              Les dossiers déposés et payés avant le 31 août échappent aux deux.
            </strong>
          </li>
          <li>
            <strong className="text-white">Les DTV déjà délivrés ne sont pas touchés.</strong> Ni
            annulation, ni régularisation, ni casier rétroactif.
          </li>
          <li>
            <strong className="text-white">
              Le visa run consulaire vers Vientiane, Savannakhet ou Kuala Lumpur est terminé
            </strong>{' '}
            pour ceux qui n&apos;y résident pas.
          </li>
          <li>
            <strong className="text-white">Aucun paramètre du visa ne change :</strong> 5 ans, entrées
            multiples, 180 jours,{' '}
            <LienArticle
              slug="fonds-bancaires-visa-dtv"
              className="text-red-400 hover:underline font-medium"
            >
              500 000 THB
            </LienArticle>
            , ≈ 10 000 THB de frais.
          </li>
          <li>
            <strong className="text-white">
              Pour un Français, le casier judiciaire est gratuit et s&apos;obtient en ligne en quelques
              jours.
            </strong>{' '}
            Ce sont la traduction et la légalisation éventuelles qu&apos;il faut anticiper, pas le
            document lui-même.
          </li>
          <li>
            <strong className="text-white">
              L&apos;exemption tombe à 30 jours pour les entrées à partir du 15 septembre 2026.
            </strong>{' '}
            Texte publié au Journal Royal le 31 août 2026, sans effet rétroactif : une entrée
            jusqu&apos;au 14 septembre conserve ses 60 jours.
          </li>
        </ul>
      </section>

      {/* ── ENCART AUTEUR ── */}
      <div className="my-14 bg-[#111111] border border-gray-800 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-6 shadow-lg">
        <PhotoAuteur accent="red" />
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-1">Matthieu Moretti</h3>
          <p className="text-red-400 text-xs font-semibold mb-3 uppercase tracking-wider">
            Expertise terrain · Phuket
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Installé à Kathu, je monte des dossiers de Visa DTV à plein temps. Cet article a été écrit
            le 30 août 2026, à la veille de l&apos;entrée en vigueur des nouvelles règles, à partir des
            communications des postes consulaires thaïlandais et des sources officielles listées
            ci-dessous. Sur un sujet qui bouge aussi vite, deux réflexes valent mieux que ma parole :
            vérifiez auprès du poste dont vous relevez, et faites-le par écrit avant de payer. Je ne
            suis pas avocat.
          </p>
        </div>
      </div>

      {/* ── SOURCES ── */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 mb-12">
        <p className="text-white font-bold text-sm mb-4">📚 Sources et ressources</p>
        <ul className="space-y-3">
          <li>
            <a
              href="http://www.thaiembassy.fr/fr/visa-rdv/les-types-de-visa-et-les-documents-necessaires/dtv/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 hover:underline text-sm transition-colors"
            >
              → Ambassade Royale de Thaïlande en France — Visa DTV
            </a>
          </li>
          <li>
            <a
              href="https://www.thaievisa.go.th"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 hover:underline text-sm transition-colors"
            >
              → Portail officiel Thai e-Visa
            </a>
          </li>
          <li>
            <a
              href="https://casier-judiciaire.justice.gouv.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 hover:underline text-sm transition-colors"
            >
              → Casier judiciaire national — demande de bulletin n° 3 (ministère de la Justice)
            </a>
          </li>
          <li>
            <a
              href="https://www.tatnews.org/2026/07/thai-cabinet-approves-updated-visa-measures-pending-royal-gazette-publication/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 hover:underline text-sm transition-colors"
            >
              → TAT Newsroom — révision de l&apos;exemption de visa approuvée en conseil des
              ministres
            </a>
          </li>
          <li>
            <a
              href="https://kpmg.com/xx/en/our-insights/gms-flash-alert/2026/flash-alert-2026-209.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 hover:underline text-sm transition-colors"
            >
              → KPMG Global Mobility Services — Thailand: Cabinet Approves Revised Visa Exemption and
              Visa on Arrival Rules
            </a>
          </li>
          <li>
            <a
              href="https://www.immigration.go.th"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 hover:underline text-sm transition-colors"
            >
              → Bureau de l&apos;Immigration du Royaume de Thaïlande
            </a>
          </li>
          <li>
            <a
              href="https://tdac.immigration.go.th"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 hover:underline text-sm transition-colors"
            >
              → Carte d&apos;arrivée numérique (TDAC)
            </a>
          </li>
        </ul>
      </div>

      {/* ── FAQ ── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white mb-6">
          FAQ — Les nouvelles règles du DTV au 31 août 2026
        </h2>
        <div className="space-y-4">
          {faqSchema.mainEntity.map((item) => (
            <details key={item.name} className="group border border-gray-800 rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none bg-[#111111] hover:bg-[#161616] transition-colors">
                <span className="text-white font-semibold text-sm">{item.name}</span>
                <span className="text-gray-500 text-lg flex-none transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-5 py-4 bg-[#0d0d0d] border-t border-gray-800">
                <p className="text-gray-400 text-sm leading-relaxed">{item.acceptedAnswer.text}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="mt-4 bg-[#111111] border border-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-red-500 opacity-10 rounded-full blur-3xl" />
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 relative z-10">
          Savoir depuis quel poste vous pouvez déposer
        </h3>
        <p className="text-gray-400 mb-8 text-sm md:text-base relative z-10">
          C&apos;est devenu la première question à trancher, avant même de réunir la moindre pièce.
          Nous déterminons le poste dont vous relevez, la liste exacte des documents qu&apos;il exige,
          et nous montons le dossier avec vous.
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

      <PartageArticle slug="dtv-nouvelles-regles-31-aout-2026" variant="fin" />

      <BlogNavigation variant="article-bottom" />
    </article>
  );
}
