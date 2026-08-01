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

export const revalidate = 600;

const post = getBlogPost('extension-180-jours-visa-dtv-thailande');
const articleSchema = createArticleSchema(post);
const breadcrumbSchema = createBreadcrumbSchema(post);

export const metadata = createArticleMetadata(post);

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Combien de temps peut-on rester en Thaïlande avec un Visa DTV ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "180 jours par entrée, extensibles une fois de 180 jours supplémentaires, soit 360 jours maximum par entrée. Le visa lui-même est valable 5 ans à entrées multiples : vous pouvez donc entrer autant de fois que vous le souhaitez pendant ces 5 ans, chaque entrée ouvrant droit à une nouvelle période de 180 jours.",
      },
    },
    {
      '@type': 'Question',
      name: "Combien coûte l'extension de 180 jours du Visa DTV ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "1 900 THB, à régler en espèces au bureau d'immigration compétent. Le paiement par carte n'est pas accepté.",
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on faire l'extension plusieurs fois de suite ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non, une seule extension est possible par entrée sur le territoire. Après 360 jours de présence continue, il faut sortir du pays. En revanche, le droit à extension se renouvelle à chaque nouvelle entrée.",
      },
    },
    {
      '@type': 'Question',
      name: 'Que se passe-t-il si je quitte la Thaïlande avant la fin de mes 180 jours ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Votre permission de séjour en cours est annulée et les jours non consommés sont définitivement perdus. À votre retour, vous recevez 180 jours neufs, avec un droit d'extension intact et un compteur de rapport des 90 jours remis à zéro.",
      },
    },
    {
      '@type': 'Question',
      name: "Quels documents faut-il apporter pour l'extension ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Le formulaire TM7, votre passeport, une photo 4 × 6 cm, un justificatif de domicile (le reçu du TM30 de votre logeur), les photocopies de la page d'identité du passeport, du visa et du dernier tampon d'entrée, ainsi que les pièces à jour correspondant à votre catégorie d'éligibilité d'origine. Certains bureaux demandent en outre des relevés bancaires actualisés.",
      },
    },
    {
      '@type': 'Question',
      name: "Vaut-il mieux faire l'extension ou sortir du pays ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Cela dépend de votre situation. Une sortie-rentrée coûte le prix d'un billet mais vous rend 180 jours neufs tout en préservant votre droit d'extension et en réinitialisant votre compteur de 90 jours. L'extension coûte 1 900 THB mais suppose un dossier à jour et expose à des demandes de pièces variables selon le bureau. Si un voyage était de toute façon prévu, la sortie est presque toujours préférable.",
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on prolonger son DTV quand le cursus Soft Power est terminé ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "En pratique non, et ce point est mal connu. L'extension suppose que vous remplissiez encore les conditions de la catégorie par laquelle vous avez obtenu le visa : pour la voie Soft Power, cela signifie une attestation d'école fraîchement datée confirmant que vous suivez toujours le cursus. Une école ne peut pas délivrer une telle attestation à quelqu'un qui a terminé et obtenu son diplôme. En revanche, votre visa DTV n'est pas annulé pour autant — contrairement à l'ancien visa Étudiant (ED) — et une sortie du territoire suivie d'une rentrée vous rend 180 jours neufs sans qu'aucune preuve de continuité d'activité ne soit exigée.",
      },
    },
    {
      '@type': 'Question',
      name: 'Une sortie-rentrée avec un DTV est-elle considérée comme un visa run ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non, et la distinction est importante. Un visa run consiste à enchaîner des exemptions touristiques faute de visa long séjour, et c'est ce comportement que l'immigration thaïlandaise cible. Un détenteur de DTV qui sort et rentre exerce un droit que son visa lui confère explicitement : entrées multiples pendant cinq ans, avec 180 jours de séjour à chaque entrée.",
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on faire l'extension dans n'importe quel bureau d'immigration ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. La demande doit être déposée au bureau dont dépend l'adresse que vous avez déclarée. Il n'est pas possible de choisir un autre bureau réputé plus souple.",
      },
    },
    {
      '@type': 'Question',
      name: "Le rapport des 90 jours est-il lié à l'extension de 180 jours ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non, ce sont deux démarches totalement distinctes. Le TM47 est une simple déclaration d'adresse, sans effet sur la durée de votre séjour autorisé. L'extension modifie votre permission de séjour.",
      },
    },
  ],
};

const sommaire = [
  { id: 'trois-horloges', label: "Les trois horloges qu'on confond en permanence" },
  { id: 'regle-exacte', label: 'La règle exacte : 180 + 180 = 360 jours par entrée' },
  { id: 'sortir-du-pays', label: 'Ce que sortir du pays fait réellement à vos compteurs' },
  { id: 'en-pratique', label: "L'extension en pratique : TM7, 1 900 THB, et le bon bureau" },
  { id: 'phuket', label: "Mon passage à l'immigration de Phuket" },
  { id: 'arbitrage', label: 'Extension ou sortie du pays : le vrai arbitrage' },
  { id: 'vrai-piege', label: 'Le vrai piège : on vérifie que vous remplissez toujours les conditions' },
  { id: 'mon-cas', label: "Pourquoi je n'aurai probablement jamais besoin de l'extension" },
  { id: 'simple-ou-pas', label: "Ce qui est simple, et ce qui ne l'est pas" },
];

export default function ArticleExtension180Jours() {
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
        <span className="inline-block rounded-full border border-sky-500/25 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sky-400 mb-5">
          Formalités · Immigration
        </span>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
          Extension du Visa DTV :{' '}
          <span className="text-sky-400">
            180 + 180 jours, et pourquoi vous n&apos;en aurez peut-être jamais besoin
          </span>
        </h1>

        <p className="text-base text-gray-500 mt-6">
          Lecture : 12 min · Mis à jour : {post.date} · Par{' '}
          <strong className="text-gray-400">Matthieu Moretti</strong>
        </p>
        <PartageArticle slug="extension-180-jours-visa-dtv-thailande" variant="entete" />
      </header>

      {/* ── INTRODUCTION ── */}
      <div className="text-lg text-gray-400 mb-12 space-y-5">
        <p>
          Mon guide sur le rapport des 90 jours mentionne huit fois l&apos;extension de 180 jours.
          Huit renvois vers une démarche que je n&apos;avais jamais expliquée, avec chaque fois la même
          phrase en substance :{' '}
          <em className="text-gray-300">c&apos;est une procédure totalement distincte</em>. Il est
          temps de combler ce trou.
        </p>
        <p>
          Mais je vais le faire dans un ordre qui va peut-être vous surprendre, parce que la conclusion
          à laquelle je suis arrivé est celle-ci :{' '}
          <strong className="text-white">
            pour une bonne partie des détenteurs de DTV, l&apos;extension de 180 jours ne servira
            jamais à rien.
          </strong>
        </p>
        <p className="text-white font-medium border-l-4 border-sky-500 pl-5 py-1">
          Ce n&apos;est pas une provocation. C&apos;est le résultat d&apos;un calcul que presque
          personne ne fait, parce que tout le monde présente l&apos;extension comme l&apos;étape
          logique après les 180 premiers jours. Elle ne l&apos;est pas. C&apos;est une option parmi
          deux — et dans beaucoup de situations, c&apos;est la moins bonne des deux.
        </p>
        <p>
          Je vais donc tout vous donner : la règle exacte, la procédure réelle avec les documents et le
          tarif, mon propre passage au bureau d&apos;immigration de Phuket raconté de bout en bout, le
          piège dans lequel tombent ceux qui ont bien fait les choses, et le raisonnement qui rend
          cette démarche inutile dans mon cas comme dans beaucoup d&apos;autres.
        </p>
      </div>

      {/* ── SOMMAIRE ── */}
      <nav className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 mb-12 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Au programme de ce guide :</h2>
        <ul className="space-y-3">
          {sommaire.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-sky-400 hover:text-sky-300 hover:underline transition-colors text-sm md:text-base"
              >
                {i + 1}. {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── SECTION 1 ── */}
      <section className="mb-12">
        <h2 id="trois-horloges" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          1. Les trois horloges qu&apos;on confond en permanence
        </h2>
        <p className="mb-6">
          L&apos;essentiel des malentendus sur le DTV vient de là. Il n&apos;y a pas une durée, il y en
          a trois, et elles n&apos;ont rien à voir entre elles.
        </p>

        <figure className="my-8">
          <Image
            src="/images/blog/extension-dtv-trois-compteurs.jpg"
            alt="Trois calendriers représentant les trois durées distinctes du Visa DTV : 180 jours, 90 jours et 5 ans"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Trois compteurs, trois logiques, trois dates limites. C&apos;est de leur confusion que
            naissent presque tous les problèmes.
          </figcaption>
        </figure>

        <p className="mb-4">
          <strong className="text-white">La validité du visa : 5 ans.</strong> C&apos;est la durée
          pendant laquelle votre visa vous autorise à vous présenter à la frontière. Elle court à
          partir de la date de délivrance, et elle ne dit rien de la durée de votre séjour.
        </p>
        <p className="mb-4">
          <strong className="text-white">La permission de séjour : 180 jours par entrée.</strong>{' '}
          C&apos;est le tampon que vous recevez à l&apos;arrivée. C&apos;est lui qui fixe la date à
          laquelle vous devez être sorti, ou avoir obtenu une extension.
        </p>
        <p className="mb-6">
          <strong className="text-white">Le rapport d&apos;adresse : tous les 90 jours.</strong>{' '}
          C&apos;est le{' '}
          <LienArticle slug="tm47-rapport-90-jours-thailande" className="text-sky-400 hover:underline font-medium">
            TM47
          </LienArticle>
          , et il n&apos;a strictement aucun effet sur la durée de votre séjour. C&apos;est une
          déclaration de domicile, rien d&apos;autre.
        </p>

        <div className="bg-sky-500/5 border border-sky-500/25 rounded-2xl p-6 mb-6">
          <p className="text-white font-semibold mb-2">L&apos;image qui clarifie tout</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Votre visa est un abonnement de cinq ans à une salle de sport. Chaque visite est limitée à
            180 jours. Et tous les 90 jours passés à l&apos;intérieur, on vous demande de confirmer
            votre adresse. Trois choses différentes, trois compteurs différents.
          </p>
        </div>

        <p>
          Un DTV valide cinq ans ne vous autorise donc pas à rester cinq ans d&apos;affilée. C&apos;est
          la source numéro un de déception chez les gens qui découvrent la règle après avoir payé.
        </p>
      </section>

      {/* ── SECTION 2 ── */}
      <section className="mb-12">
        <h2 id="regle-exacte" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          2. La règle exacte : 180 + 180 = 360 jours maximum par entrée
        </h2>
        <p className="mb-4">Voici la mécanique, sans approximation.</p>
        <p className="mb-4">
          À chaque entrée sur le territoire avec votre DTV, vous recevez{' '}
          <strong className="text-white">180 jours</strong> de permission de séjour. Avant
          l&apos;expiration de ce tampon, vous pouvez demander{' '}
          <strong className="text-white">une extension de 180 jours supplémentaires</strong> dans un
          bureau d&apos;immigration thaïlandais.
        </p>
        <p className="mb-6">
          <strong className="text-white">Une seule extension par entrée.</strong> Ce plafond est
          important : une entrée vous donne donc au maximum{' '}
          <strong className="text-white">360 jours</strong> de présence continue. Passé ce délai, vous
          devez sortir du pays.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">
          Deux précisions que les guides oublient systématiquement
        </h3>
        <p className="mb-4">
          <strong className="text-white">
            L&apos;extension part de la date d&apos;expiration de votre tampon, pas de la date de votre
            demande.
          </strong>{' '}
          Si vous déposez au jour 160 et que votre tampon expire au jour 180, vos 180 jours
          supplémentaires courent à partir du jour 180. Vous ne perdez rien en déposant tôt —
          c&apos;est même recommandé.
        </p>
        <p className="mb-6">
          <strong className="text-white">
            Le compteur d&apos;extension se remet à zéro à chaque nouvelle entrée.
          </strong>{' '}
          Vous sortez, vous rentrez, vous repartez sur 180 jours avec un droit d&apos;extension intact.
          Il n&apos;existe pas de quota annuel d&apos;extensions.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-gray-800 mb-6">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="bg-[#111111] border-b border-gray-800">
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Compteur</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Durée</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Remis à zéro quand ?</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]">
                <td className="px-4 py-3">Validité du visa</td>
                <td className="px-4 py-3 text-white">5 ans</td>
                <td className="px-4 py-3">jamais</td>
              </tr>
              <tr className="border-b border-gray-800/60">
                <td className="px-4 py-3">Permission de séjour</td>
                <td className="px-4 py-3 text-white">180 jours</td>
                <td className="px-4 py-3">à chaque entrée</td>
              </tr>
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]">
                <td className="px-4 py-3">Droit à extension</td>
                <td className="px-4 py-3 text-white">1 par entrée</td>
                <td className="px-4 py-3">à chaque entrée</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Rapport d&apos;adresse (TM47)</td>
                <td className="px-4 py-3 text-white">90 jours</td>
                <td className="px-4 py-3">à chaque sortie du pays</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── SECTION 3 ── */}
      <section className="mb-12">
        <h2 id="sortir-du-pays" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          3. Ce que sortir du pays fait réellement à vos compteurs
        </h2>
        <p className="mb-4">
          C&apos;est le point central de cet article, et celui que je vois le plus mal comprendre.
        </p>
        <p className="mb-4">
          Quand vous quittez la Thaïlande,{' '}
          <strong className="text-white">votre permission de séjour en cours est annulée.</strong> Pas
          suspendue, pas mise en pause : annulée. Les jours que vous n&apos;avez pas consommés sont
          perdus définitivement. Si vous sortez au jour 30 de vos 180, les 150 jours restants
          disparaissent.
        </p>
        <p className="mb-6">
          Et à la rentrée, dans la limite des cinq ans de validité de votre visa,{' '}
          <strong className="text-white">vous recevez 180 jours neufs.</strong> Avec un droit
          d&apos;extension neuf. Et un compteur de 90 jours remis à zéro.
        </p>

        <div className="bg-emerald-500/5 border border-emerald-500/25 rounded-2xl p-6">
          <p className="text-white font-semibold mb-3">Ce que ça implique concrètement</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Une sortie du territoire est <strong className="text-white">plus généreuse</strong>{' '}
            qu&apos;une extension. L&apos;extension vous donne 180 jours de plus à compter de
            l&apos;expiration du tampon. Une sortie-rentrée vous donne 180 jours neufs{' '}
            <strong className="text-white">et</strong> conserve votre droit d&apos;extension pour la
            suite. Autrement dit, celui qui sort et rentre peut encore viser 360 jours, alors que celui
            qui a déjà consommé son extension n&apos;a plus le choix : il doit sortir.
          </p>
        </div>

        <p className="mt-6">
          C&apos;est ce mécanisme qui rend l&apos;extension optionnelle pour beaucoup de monde. Si vous
          quittez la Thaïlande au moins une fois par an — vacances en Europe, mariage d&apos;un proche,
          obligations professionnelles, tour en Asie du Sud-Est —, vous rechargez vos 180 jours sans
          jamais mettre un pied dans un bureau d&apos;immigration.
        </p>
      </section>

      {/* ── SECTION 4 ── */}
      <section className="mb-12">
        <h2 id="en-pratique" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          4. L&apos;extension en pratique : TM7, 1 900 THB, et le bon bureau
        </h2>
        <p className="mb-6">Si vous en avez besoin, voilà ce que la démarche demande.</p>

        <div className="overflow-x-auto rounded-2xl border border-gray-800 mb-6">
          <table className="w-full min-w-[440px] text-sm">
            <thead>
              <tr className="bg-[#111111] border-b border-gray-800">
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Élément</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Détail</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]">
                <td className="px-4 py-3">Formulaire</td>
                <td className="px-4 py-3">TM7, disponible sur place</td>
              </tr>
              <tr className="border-b border-gray-800/60">
                <td className="px-4 py-3">Tarif</td>
                <td className="px-4 py-3 text-white font-semibold">1 900 THB — espèces obligatoires</td>
              </tr>
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]">
                <td className="px-4 py-3">Photo</td>
                <td className="px-4 py-3">une photo d&apos;identité 4 × 6 cm</td>
              </tr>
              <tr className="border-b border-gray-800/60">
                <td className="px-4 py-3">Justificatif de domicile</td>
                <td className="px-4 py-3">en pratique le reçu de votre TM30</td>
              </tr>
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]">
                <td className="px-4 py-3">Photocopies</td>
                <td className="px-4 py-3">page d&apos;identité, visa, dernier tampon d&apos;entrée</td>
              </tr>
              <tr className="border-b border-gray-800/60">
                <td className="px-4 py-3">Délai de dépôt</td>
                <td className="px-4 py-3">2 à 4 semaines avant l&apos;expiration du tampon</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Traitement</td>
                <td className="px-4 py-3">souvent dans la journée, parfois jusqu&apos;à une semaine</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mb-4">
          <strong className="text-white">Le bureau compétent</strong> est celui dont dépend
          l&apos;adresse que vous avez déclarée. Vous ne pouvez pas choisir un bureau réputé plus
          souple à l&apos;autre bout du pays.
        </p>

        <div className="bg-amber-500/5 border border-amber-500/30 rounded-2xl p-6">
          <p className="text-white font-semibold mb-3">
            Et surtout : les pièces liées à votre catégorie d&apos;éligibilité, à jour
          </p>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            C&apos;est là que tout se joue, et la section 7 y est entièrement consacrée. Selon la voie
            par laquelle vous avez obtenu votre DTV, on vous demandera une{' '}
            <Link href="/blog/visa-dtv-soft-power-ecoles" className="text-sky-400 hover:underline font-medium">
              attestation d&apos;école récente
            </Link>
            , une lettre d&apos;employeur, ou des{' '}
            <Link href="/blog/visa-dtv-freelance-auto-entrepreneur" className="text-sky-400 hover:underline font-medium">
              contrats de prestation en cours
            </Link>
            .
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Sur les fonds, les pratiques divergent fortement d&apos;un bureau à l&apos;autre : certains
            exigent les{' '}
            <Link href="/blog/fonds-bancaires-visa-dtv" className="text-sky-400 hover:underline font-medium">
              500 000 THB
            </Link>{' '}
            sur un compte <strong className="text-white">thaïlandais</strong>, d&apos;autres acceptent
            un compte étranger avec une ancienneté de trente jours, d&apos;autres ne demandent rien.
            Comme vous ne choisissez pas votre bureau, vous ne choisissez pas la pratique qui
            s&apos;appliquera.
          </p>
        </div>
      </section>

      {/* ── SECTION 5 ── */}
      <section className="mb-12">
        <h2 id="phuket" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          5. Mon passage à l&apos;immigration de Phuket
        </h2>

        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 mb-8">
          <p className="text-white font-semibold mb-2">Une précision d&apos;honnêteté avant de raconter</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            La démarche que j&apos;ai effectuée était une{' '}
            <strong className="text-white">extension de 30 jours sur une exemption touristique</strong>
            , pas une extension de DTV. Ce qui est identique : le bureau, le formulaire TM7, les
            1 900 THB en espèces, le déroulé sur place, l&apos;ambiance, le personnel. Ce qui change :
            la durée accordée et le dossier justificatif demandé. Je préfère vous le dire plutôt que de
            laisser croire à une expérience que je n&apos;ai pas encore eue.
          </p>
        </div>

        <p className="mb-6">
          Voilà donc à quoi ressemble concrètement ce moment que beaucoup redoutent.
        </p>

        <figure className="my-8">
          <Image
            src="/images/blog/extension-dtv-bureau-immigration-phuket.jpg"
            alt="Salle d'attente d'un bureau d'immigration thaïlandais avec ses guichets et ses chaises alignées"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Ce n&apos;est pas le chaos qu&apos;on m&apos;avait décrit. Un petit bureau, très calme, et
            des agents patients.
          </figcaption>
        </figure>

        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">Où c&apos;est exactement</h3>
        <p className="mb-4">
          Bureau de l&apos;Immigration de Phuket,{' '}
          <strong className="text-white">482 Phuket Road, Talad Yai, Mueang</strong>. Ouvert du lundi
          au vendredi, 8 h 30 – 12 h et 13 h – 16 h 30, fermé le week-end et les jours fériés
          nationaux.
        </p>
        <p className="mb-6">
          Un détail qui vous fera gagner du temps :{' '}
          <strong className="text-white">
            le bâtiment de l&apos;accueil n&apos;est pas celui où se traitent les extensions.
          </strong>{' '}
          Il faut viser le petit bâtiment situé sur la gauche, derrière l&apos;accueil.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">
          Le shop sur place, à connaître avant d&apos;y aller
        </h3>
        <p className="mb-6">
          Immédiatement à droite de l&apos;entrée, il y a une petite boutique de photos et de
          photocopies. C&apos;est franchement l&apos;un des meilleurs services que j&apos;ai vus sur
          l&apos;île : les employées savent exactement ce que l&apos;immigration attend, et les prix
          sont les vrais prix — pas les marges délirantes de certaines boutiques en ville. Conséquence
          pratique :{' '}
          <strong className="text-white">
            vous pouvez arriver avec vos documents dématérialisés sur votre téléphone et votre
            passeport physique, et tout faire sur place.
          </strong>
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">Le déroulé, minute par minute</h3>
        <p className="mb-4">
          L&apos;ambiance d&apos;abord, parce qu&apos;elle m&apos;a surpris. Un petit bureau, très
          calme. Une rangée de six agents face à l&apos;entrée, cinq autres le long du mur de droite.
          Une quinzaine de personnes assises, qui attendent qu&apos;un agent appelle leur numéro.
        </p>
        <p className="mb-6">
          Un homme à l&apos;accueil prend votre dossier. J&apos;ai rempli mon TM7 sur place. Puis on
          s&apos;assied, on attend, une agente appelle le numéro — elle était d&apos;une gentillesse
          remarquable. Je paie. Elle me rend mon document avec l&apos;extension approuvée.{' '}
          <strong className="text-white">Vingt à vingt-cinq minutes en tout.</strong>
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">
          Le moment désagréable, parce qu&apos;il y en a eu un
        </h3>
        <p className="mb-6">
          Le document que j&apos;avais à remplir comportait des mentions que je ne comprenais pas.
          J&apos;ai dû m&apos;en sortir avec Google Translate et l&apos;aide de l&apos;hôtesse
          d&apos;accueil, qui a été très patiente. Malgré ça je n&apos;étais pas certain de mes
          réponses, j&apos;ai dû raturer, et j&apos;ai eu un vrai moment de crainte que ça soit refusé
          pour cette raison. C&apos;est passé sans commentaire. Mais si vous ne lisez pas le thaï,
          installez une application de traduction avant d&apos;y aller, et ne soyez pas trop fier pour
          demander de l&apos;aide à l&apos;accueil.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">La tenue vestimentaire</h3>
        <p className="mb-6">
          C&apos;est réel, et c&apos;est affiché sur un panneau dans l&apos;enceinte. Un agent peut
          vous refuser l&apos;accès en tongs ou en débardeur. J&apos;ai vu beaucoup de gens en tongs et
          en débardeur ce jour-là, donc l&apos;application est visiblement souple — mais c&apos;est le
          genre de pari que je ne prendrais pas pour vingt minutes de démarche et deux heures
          d&apos;aller-retour.
        </p>

        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">
          <p className="text-white font-semibold mb-2">
            Deux points sur lesquels ma mémoire n&apos;est pas fiable
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Je crois qu&apos;on m&apos;a demandé la photocopie de mon justificatif de logement et celle
            de mon passeport, mais je ne peux pas l&apos;affirmer. Idem pour le TM30 : il me semble
            qu&apos;il a été demandé, sans certitude. Cela date de l&apos;an dernier et je n&apos;ai
            fait cette démarche qu&apos;une seule fois. Plutôt que de vous donner une liste inventée,
            je vous dis de les prendre par précaution — le shop sur place vous les tirera en cinq
            minutes de toute façon.
          </p>
        </div>
      </section>

      {/* ── SECTION 6 ── */}
      <section className="mb-12">
        <h2 id="arbitrage" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          6. Extension ou sortie du pays : le vrai arbitrage
        </h2>
        <p className="mb-6">Mettons les deux options côte à côte honnêtement.</p>

        <div className="overflow-x-auto rounded-2xl border border-gray-800 mb-6">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="bg-[#111111] border-b border-gray-800">
                <th className="text-left px-4 py-3 text-gray-400 font-semibold"></th>
                <th className="text-left px-4 py-3 text-sky-300 font-semibold">Extension (180 j)</th>
                <th className="text-left px-4 py-3 text-emerald-300 font-semibold">Sortie et rentrée</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]">
                <td className="px-4 py-3 text-white">Coût direct</td>
                <td className="px-4 py-3">1 900 THB</td>
                <td className="px-4 py-3">prix du billet</td>
              </tr>
              <tr className="border-b border-gray-800/60">
                <td className="px-4 py-3 text-white">Temps</td>
                <td className="px-4 py-3">20 min à 1 journée</td>
                <td className="px-4 py-3">1 à 3 jours</td>
              </tr>
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]">
                <td className="px-4 py-3 text-white">Jours obtenus</td>
                <td className="px-4 py-3">180 après expiration</td>
                <td className="px-4 py-3">180 neufs</td>
              </tr>
              <tr className="border-b border-gray-800/60">
                <td className="px-4 py-3 text-white">Droit d&apos;extension ensuite</td>
                <td className="px-4 py-3 text-amber-400">consommé</td>
                <td className="px-4 py-3 text-emerald-400">intact</td>
              </tr>
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]">
                <td className="px-4 py-3 text-white">Compteur TM47</td>
                <td className="px-4 py-3">continue de courir</td>
                <td className="px-4 py-3 text-emerald-400">remis à zéro</td>
              </tr>
              <tr className="border-b border-gray-800/60">
                <td className="px-4 py-3 text-white">Risque documentaire</td>
                <td className="px-4 py-3 text-amber-400">réel et variable</td>
                <td className="px-4 py-3">faible</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-white">TM30 à jour nécessaire</td>
                <td className="px-4 py-3">oui</td>
                <td className="px-4 py-3">non</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mb-4">
          <strong className="text-white">L&apos;extension gagne</strong> si vous n&apos;avez aucune
          raison de sortir, si votre dossier est carré, si votre TM30 est en règle et si vous voulez
          éviter le coût d&apos;un billet.
        </p>
        <p className="mb-6">
          <strong className="text-white">La sortie gagne</strong> si vous aviez de toute façon un
          voyage prévu, si votre situation a évolué depuis votre demande initiale — changement
          d&apos;employeur, fin de contrat, école terminée —, ou si vous préférez ne pas exposer votre
          dossier à un examen supplémentaire.
        </p>
        <p>
          Et il faut dire une chose qui ne figure dans aucune brochure : de nombreux détenteurs de DTV
          rapportent qu&apos;une sortie-rentrée s&apos;avère{' '}
          <strong className="text-white">plus simple, plus rapide et moins stressante</strong> que
          l&apos;extension, parce que certains bureaux réclament des pièces au-delà de la liste
          standard — relevés bancaires actualisés, preuve d&apos;activité en cours, parfois un nouveau
          bail.
        </p>
      </section>

      {/* ── SECTION 7 ── */}
      <section className="mb-12">
        <h2 id="vrai-piege" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          7. Le vrai piège : on vérifie que vous remplissez <em>toujours</em> les conditions
        </h2>
        <p className="mb-4">
          Voici le point que je n&apos;ai vu écrit correctement nulle part, et le plus important de
          tout l&apos;article.
        </p>
        <p className="mb-6">
          Au guichet, l&apos;agent ne se contente pas de constater que vous détenez un DTV valide.{' '}
          <strong className="text-white">
            Il vérifie que vous remplissez encore les conditions de la catégorie par laquelle vous
            l&apos;avez obtenu.
          </strong>{' '}
          Pas au moment de votre demande initiale : aujourd&apos;hui, à la date du dépôt.
        </p>

        <ul className="space-y-3 mb-8 pl-4 border-l-2 border-sky-500/40 text-gray-400 text-sm">
          <li>
            <strong className="text-white">Voie télétravail ou freelance</strong> — on vous demandera
            des preuves de revenus ou de contrats <strong className="text-white">récents</strong>. Un
            contrat clos depuis huit mois ne démontre rien.
          </li>
          <li>
            <strong className="text-white">Voie Soft Power</strong> — on vous demandera une lettre de
            votre école, <strong className="text-white">fraîchement datée</strong>, confirmant que vous
            êtes <strong className="text-white">toujours</strong> en train de suivre le cursus.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-200 mb-3">Le cas du cursus terminé</h3>
        <p className="mb-4">
          Imaginons quelqu&apos;un qui a obtenu son DTV par la voie Soft Power, qui a suivi son cursus
          jusqu&apos;au bout, et qui en est sorti avec son diplôme. Situation irréprochable, école
          parfaitement légitime, obligations remplies à la lettre.
        </p>
        <p className="mb-4">
          <strong className="text-white">Cette personne ne peut pas obtenir d&apos;extension.</strong>
        </p>
        <p className="mb-4">
          Non pas parce qu&apos;elle a fauté, mais parce que son école ne peut évidemment pas lui
          délivrer une attestation certifiant qu&apos;elle étudie encore.{' '}
          <strong className="text-white">
            Un diplôme prouve le passé ; l&apos;extension exige le présent.
          </strong>{' '}
          L&apos;activité qui justifiait le séjour est achevée, donc le motif d&apos;extension
          n&apos;existe plus.
        </p>
        <p className="mb-6">
          C&apos;est contre-intuitif, et même un peu absurde : l&apos;élève assidu qui va au bout de
          son cursus se retrouve, pour cette démarche précise, dans une position moins favorable que
          celui qui étale son programme dans le temps.
        </p>

        <div className="bg-emerald-500/5 border border-emerald-500/25 rounded-2xl p-6 mb-8">
          <p className="text-white font-semibold mb-2">Une bonne nouvelle qui compense largement</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Votre visa, lui, n&apos;est pas annulé pour autant. C&apos;est une différence majeure avec
            l&apos;ancien visa Étudiant (ED), qui tombait dès la fin des cours. Le DTV est délivré par
            un poste consulaire pour cinq ans à entrées multiples, et la fin de votre activité ne
            l&apos;éteint pas.{' '}
            <strong className="text-white">
              Vous perdez l&apos;accès à l&apos;extension, vous ne perdez pas votre visa.
            </strong>
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-200 mb-3">
          La conséquence pratique : sortir vaut mieux que déposer
        </h3>
        <p className="mb-6">
          Si vous êtes dans ce cas de figure, n&apos;allez pas dépenser 1 900 THB et une demi-journée
          pour vous faire refuser. Sortez du territoire avant l&apos;expiration de votre tampon, et
          rentrez. À la rentrée, le contrôle porte sur{' '}
          <strong className="text-white">la validité de votre visa</strong>, pas sur la continuité de
          votre activité. L&apos;officier scanne le passeport, voit un DTV valide, et apporte un
          nouveau tampon de 180 jours. On ne vous demandera pas de prouver que vous cuisinez encore.
        </p>

        <figure className="my-8">
          <Image
            src="/images/blog/extension-dtv-sortie-pays-nouveau-tampon.jpg"
            alt="Vue depuis un hublot d'avion au décollage, avec un passeport posé sur la tablette"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Un week-end à l&apos;étranger, et 180 jours neufs au retour. Sans dossier à défendre.
          </figcaption>
        </figure>

        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">
          Deux nuances, et elles comptent
        </h3>

        <div className="bg-amber-500/5 border border-amber-500/30 rounded-2xl p-6 mb-6">
          <p className="text-white font-semibold mb-2">
            « Rien à prouver » n&apos;est pas « rien à craindre »
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Un officier peut demander une preuve de motif ou de ressources{' '}
            <strong className="text-white">à l&apos;entrée</strong> aussi, et 2026 n&apos;est pas
            l&apos;année pour parier là-dessus :{' '}
            <LienArticle slug="overstay-thailande-amende-blacklist-visa-dtv" className="text-sky-400 hover:underline font-medium">
              29 490 personnes ont été refoulées entre janvier et mai
            </LienArticle>
            . C&apos;est rare pour un détenteur de DTV, et beaucoup plus rare qu&apos;au guichet
            d&apos;une extension, mais ce n&apos;est pas nul. Gardez sur votre téléphone votre diplôme
            ou attestation d&apos;école, et un relevé montrant vos fonds disponibles. Cela ne coûte
            rien et ça clôt une conversation en dix secondes.
          </p>
        </div>

        <div className="bg-sky-500/5 border border-sky-500/25 rounded-2xl p-6">
          <p className="text-white font-semibold mb-2">
            Une sortie-rentrée sur un DTV valide n&apos;est pas un visa run
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Ce sont deux choses que rien ne rapproche, et il faut l&apos;énoncer clairement. Le visa
            runner enchaîne des exemptions touristiques faute de visa, et c&apos;est ce comportement
            que l&apos;immigration traque. Le détenteur de DTV qui sort et rentre{' '}
            <strong className="text-white">
              exerce un droit que son visa lui confère explicitement
            </strong>{' '}
            : entrées multiples pendant cinq ans, 180 jours par entrée. Vous n&apos;êtes pas dans une
            zone grise, vous êtes dans le mode d&apos;emploi.
          </p>
        </div>
      </section>

      {/* ── SECTION 8 ── */}
      <section className="mb-12">
        <h2 id="mon-cas" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          8. Pourquoi je n&apos;aurai probablement jamais besoin de l&apos;extension
        </h2>
        <p className="mb-4">
          Je vais prendre mon propre cas, parce qu&apos;il est représentatif de beaucoup de lecteurs.
        </p>
        <p className="mb-4">
          Je vis en Thaïlande, et je fais{' '}
          <strong className="text-white">au moins une sortie d&apos;un mois par an</strong> — la
          France, la famille, des obligations à régler. C&apos;est tout. Cela suffit à ce que la
          question de l&apos;extension ne se pose jamais : chaque retour me rend 180 jours neufs, et le
          compteur des 90 jours repart de zéro par la même occasion.
        </p>
        <p className="mb-6">
          Deux formalités court-circuitées sans effort particulier, simplement parce que ma vie
          comporte des allers-retours. Si vous êtes dans ce cas — famille en Europe, clients à voir,
          envie de voyager en Asie, obligations administratives à régler —, faites ce calcul avant de
          vous inquiéter de l&apos;extension. Il y a de bonnes chances qu&apos;elle ne vous concerne
          jamais.
        </p>

        <div className="bg-emerald-500/5 border border-emerald-500/25 rounded-2xl p-6 mb-6">
          <p className="text-white font-semibold mb-2">
            Mais si vous voulez rester toute l&apos;année sans sortir, l&apos;extension est une très
            bonne solution
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            C&apos;est exactement ce pour quoi elle existe, et elle fonctionne. Ce profil est
            parfaitement légitime : une installation avec des animaux difficiles à déplacer, des travaux
            dans un logement, des raisons médicales, un projet professionnel sur place, ou simplement
            l&apos;envie de ne pas reprendre l&apos;avion. Dans ces situations, 1 900 THB et vingt
            minutes de guichet valent largement mieux qu&apos;un aller-retour contraint.
          </p>
        </div>

        <p>
          Notez tout de même ceci : rester plus de 180 jours en Thaïlande sur une année civile a une
          autre conséquence, qui n&apos;a rien à voir avec l&apos;immigration —{' '}
          <LienArticle slug="fiscalite-thailande-expatries-residence-fiscale" className="text-sky-400 hover:underline font-medium">
            la résidence fiscale
          </LienArticle>
          .
        </p>
      </section>

      {/* ── SECTION 9 ── */}
      <section className="mb-12">
        <h2 id="simple-ou-pas" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          9. Ce qui est simple, et ce qui ne l&apos;est pas
        </h2>
        <p className="mb-6">
          Je termine par une distinction que je tiens à faire, parce qu&apos;elle est honnête et
          qu&apos;elle vous évitera de payer pour rien.
        </p>
        <p className="mb-4">
          <strong className="text-white">Le passage au guichet est simple.</strong> Je l&apos;ai fait
          seul, sans préparation particulière, en vingt minutes. Il n&apos;y a pas de piège, pas
          d&apos;entretien, pas de test. Les agents que j&apos;ai rencontrés à Phuket étaient patients
          et bienveillants. N&apos;importe qui peut y aller seul, et n&apos;importe qui doit pouvoir y
          aller seul. Toute personne qui vous facturerait ce déplacement en vous le décrivant comme une
          épreuve vous vend de la peur.
        </p>
        <p className="mb-6">
          <strong className="text-white">
            Ce qui n&apos;est pas simple, c&apos;est le dossier que vous y apportez.
          </strong>{' '}
          L&apos;extension d&apos;une exemption touristique ne demande qu&apos;une adresse. Celle
          d&apos;un DTV demande de prouver que vous remplissez toujours les conditions de la voie par
          laquelle vous l&apos;avez obtenu. Or c&apos;est précisément ce qui bouge dans une vie : le
          contrat qui se termine, l&apos;école dont le cursus a changé de format, l&apos;employeur
          qu&apos;on a quitté, les revenus qui ont fluctué.
        </p>
        <p>
          C&apos;est là que je sers à quelque chose, et pas ailleurs. Pas à faire la queue à votre
          place.
        </p>
      </section>

      {/* ── À RETENIR ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Ce qu&apos;il faut retenir</h2>
        <ul className="space-y-3 mb-6 pl-4 border-l-2 border-sky-500/40 text-gray-400 text-sm">
          <li><strong className="text-white">180 jours par entrée, extensibles une fois de 180 jours.</strong> Soit 360 jours maximum par entrée, puis sortie obligatoire.</li>
          <li><strong className="text-white">Sortir annule votre séjour en cours mais vous rend 180 jours neufs</strong> — et préserve votre droit d&apos;extension. Les jours non consommés sont perdus.</li>
          <li><strong className="text-white">L&apos;extension coûte 1 900 THB en espèces</strong> et se dépose au bureau dont dépend votre adresse déclarée, deux à quatre semaines avant l&apos;expiration.</li>
          <li><strong className="text-white">On vérifie que vous remplissez toujours les conditions de votre catégorie.</strong> Un cursus terminé ou un contrat clos ferme l&apos;accès à l&apos;extension — sans annuler votre visa.</li>
          <li><strong className="text-white">Une sortie-rentrée sur un DTV valide n&apos;est pas un visa run.</strong> C&apos;est le mode d&apos;emploi du visa.</li>
          <li><strong className="text-white">Si vous sortez au moins une fois par an, l&apos;extension ne vous concernera probablement jamais.</strong></li>
        </ul>
      </section>

      {/* ── ENCART AUTEUR ── */}
      <div className="my-14 bg-[#111111] border border-gray-800 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-6 shadow-lg">
        <div className="w-24 h-24 rounded-full bg-gray-800 flex-shrink-0 overflow-hidden border-2 border-sky-500/50">
          <div className="w-full h-full bg-gradient-to-br from-sky-500/20 to-amber-500/20 flex items-center justify-center text-3xl">🗓️</div>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-1">Matthieu Moretti</h3>
          <p className="text-sky-400 text-xs font-semibold mb-3 uppercase tracking-wider">
            Expertise terrain · Phuket
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Installé à Kathu, je monte des dossiers de Visa DTV à plein temps. Le récit du bureau
            d&apos;immigration de Phuket dans cet article est le mien, et je précise explicitement
            qu&apos;il portait sur une extension d&apos;exemption touristique et non sur un DTV. Les
            règles de durée et de procédure proviennent des sources officielles listées ci-dessous ; les
            divergences de pratique entre bureaux proviennent de retours documentés de détenteurs de
            DTV. Je ne suis pas avocat : pour une situation particulière, faites-vous accompagner avant
            de déposer.
          </p>
        </div>
      </div>

      {/* ── SOURCES ── */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 mb-12">
        <p className="text-white font-bold text-sm mb-4">📚 Sources et ressources</p>
        <ul className="space-y-3">
          <li>
            <a
              href="http://www.phuketimmigration.go.th/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 hover:underline text-sm transition-colors"
            >
              → Bureau de l&apos;Immigration de Phuket — adresse, horaires et contacts
            </a>
          </li>
          <li>
            <a
              href="https://www.immigration.go.th"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 hover:underline text-sm transition-colors"
            >
              → Bureau de l&apos;Immigration du Royaume de Thaïlande
            </a>
          </li>
          <li>
            <a
              href="http://www.thaiembassy.fr/fr/visa-rdv/les-types-de-visa-et-les-documents-necessaires/dtv/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 hover:underline text-sm transition-colors"
            >
              → Ambassade Royale de Thaïlande en France — Visa DTV
            </a>
          </li>
        </ul>
      </div>

      {/* ── FAQ ── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white mb-6">
          FAQ — Extension et durée de séjour du Visa DTV
        </h2>
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

      {/* ── CTA ── */}
      <div className="mt-4 bg-[#111111] border border-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500 opacity-10 rounded-full blur-3xl" />
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 relative z-10">
          Le visa d&apos;abord, les formalités ensuite
        </h3>
        <p className="text-gray-400 mb-8 text-sm md:text-base relative z-10">
          Extension, TM30, rapport des 90 jours : ces démarches ne se posent qu&apos;une fois le visa
          obtenu, et elles dépendent de la voie par laquelle vous l&apos;avez obtenu. Nous montons
          votre dossier DTV et vous orientons sur tout ce qui vient après.
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

      <PartageArticle slug="extension-180-jours-visa-dtv-thailande" variant="fin" />

      <BlogNavigation variant="article-bottom" />
    </article>
  );
}
