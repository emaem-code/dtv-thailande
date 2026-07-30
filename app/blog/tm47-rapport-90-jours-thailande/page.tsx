import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogNavigation from '../../components/BlogNavigation';
import { createBreadcrumbSchema, getBlogPost } from '../posts';

export const revalidate = 600;

const post = getBlogPost('tm47-rapport-90-jours-thailande');
const breadcrumbSchema = createBreadcrumbSchema(post);

// ─── MÉTADONNÉES SEO ─────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'TM47 : le rapport des 90 jours en Thaïlande (2026)',
  description:
    "Le rapport des 90 jours (TM47) est obligatoire et méconnu. Qui doit le faire, quand, comment, et les amendes encourues. Le guide complet 2026.",
  alternates: {
    canonical: 'https://dtv-thailande.fr/blog/tm47-rapport-90-jours-thailande',
  },
  openGraph: {
    title: 'TM47 : le rapport des 90 jours en Thaïlande (2026)',
    description:
      "L'obligation légale que personne ne vous annonce. Qui est concerné, comment le faire, et les amendes en cas d'oubli.",
    url: 'https://dtv-thailande.fr/blog/tm47-rapport-90-jours-thailande',
    siteName: 'DTV Thaïlande',
    locale: 'fr_FR',
    type: 'article',
    images: [{ url: '/images/blog/tm47-rapport-90-jours-thailande.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TM47 : le rapport des 90 jours en Thaïlande (2026)',
    description:
      "L'obligation légale que personne ne vous annonce. Le guide complet pour détenteurs de visa long séjour.",
    images: ['/images/blog/tm47-rapport-90-jours-thailande.jpg'],
  },
};

// ─── SCHEMA ARTICLE JSON-LD ──────────────────────────────────────────────────
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://dtv-thailande.fr/blog/tm47-rapport-90-jours-thailande',
  },
  headline:
    "TM47 : le rapport des 90 jours en Thaïlande, l'obligation que personne ne vous annonce (2026)",
  description:
    "Le rapport des 90 jours (TM47) est obligatoire et méconnu. Qui doit le faire, quand, comment, et les amendes encourues. Le guide complet 2026.",
  image: 'https://dtv-thailande.fr/images/blog/tm47-rapport-90-jours-thailande.jpg',
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
  datePublished: '2026-08-04',
  dateModified: '2026-08-04',
};

// ─── SCHEMA FAQ JSON-LD ──────────────────────────────────────────────────────
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Le TM47 est-il obligatoire avec un Visa DTV ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, comme pour tous les visas long séjour. Mais uniquement si vous restez 90 jours consécutifs sans sortir du territoire. Si vous voyagez régulièrement, le compteur se remet à zéro à chaque réentrée et vous ne serez peut-être jamais concerné.",
      },
    },
    {
      '@type': 'Question',
      name: 'Faut-il faire un TM47 après chaque voyage à l’étranger ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. Chaque sortie du territoire remet le compteur à zéro. Vous ne devez faire un rapport que si vous atteignez 90 jours de présence continue depuis votre dernière entrée en Thaïlande.",
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on faire son premier TM47 en ligne ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. Le premier rapport doit obligatoirement être effectué en personne au bureau d'immigration de votre zone de résidence. Le portail en ligne n'est accessible qu'à partir du deuxième rapport.",
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est l’amende en cas de retard sur le TM47 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "2 000 THB si vous vous présentez de vous-même après le délai de grâce de 7 jours. Jusqu'à 5 000 THB plus 200 THB par jour si un contrôle de police ou un audit d'immigration constate le manquement.",
      },
    },
    {
      '@type': 'Question',
      name: 'Le TM47 prolonge-t-il mon visa ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. C'est uniquement une déclaration d'adresse. Elle n'a aucun effet sur la durée de votre séjour autorisé ni sur la validité de votre visa. L'extension de 180 jours est une démarche totalement distincte.",
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on faire faire son TM47 par quelqu’un d’autre ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui. Un tiers peut déposer pour vous avec votre passeport original, le formulaire TM47 signé de votre main et une procuration simple. Les agences de visa proposent également ce service.",
      },
    },
  ],
};

// ─── SOMMAIRE ────────────────────────────────────────────────────────────────
const sommaire = [
  { id: 'definition', label: 'Le TM47, c’est quoi exactement ?' },
  { id: 'qui-est-concerne', label: 'Qui doit le faire — et qui ne le fera jamais' },
  { id: 'calendrier', label: 'Le calendrier : quand exactement ?' },
  { id: 'tm30-prerequis', label: 'Le prérequis absolu : votre TM30' },
  { id: 'methodes', label: 'Les quatre façons de faire son TM47' },
  { id: 'amendes', label: 'Les amendes : ce que ça coûte vraiment' },
  { id: 'pieges', label: 'Les six pièges à connaître' },
  { id: 'oubli', label: 'Vous avez oublié : que faire ?' },
];

export default function BlogArticleTm47() {
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
        <span className="inline-block bg-sky-500/10 border border-sky-500/25 text-sky-400 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
          Formalités · Immigration
        </span>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
          TM47 : le rapport des 90 jours,{' '}
          <span className="text-sky-400">
            l&apos;obligation que personne ne vous annonce
          </span>
        </h1>

        <p className="text-base text-gray-500 mt-4">
          Publié le 4 août 2026 · Lecture : 10 min · Par{' '}
          <strong className="text-gray-400">Matthieu Moretti</strong>
        </p>
      </header>

      {/* ── INTRODUCTION ── */}
      <div className="text-lg text-gray-400 mb-10 space-y-5">
        <p>
          Un ami prépare son installation en Thaïlande. Il a passé des semaines
          à se renseigner : forums, groupes Facebook, guides en ligne,
          comparatifs de visas. Il connaît les montants exigés, les délais des
          ambassades, la liste des documents.
        </p>
        <p>
          Quand je lui ai parlé du rapport des 90 jours, il est tombé des nues.
          Malgré toutes ses recherches,{' '}
          <strong className="text-white">
            il n&apos;en avait jamais entendu parler une seule fois.
          </strong>
        </p>
        <p>
          Et son cas n&apos;a rien d&apos;isolé. Dans mon activité
          d&apos;accompagnement, je constate que le TM47 est le grand angle mort
          des candidats au DTV : il n&apos;apparaît ni dans les guides, ni dans
          les groupes francophones, ni dans les brochures des agences. On le
          découvre en général quand il est déjà trop tard — sous forme
          d&apos;amende.
        </p>
        <p className="text-white font-medium border-l-4 border-sky-400 pl-5 py-1">
          Voici tout ce qu&apos;il faut savoir — y compris le détail qui fait
          que beaucoup de détenteurs de DTV ne seront jamais concernés.
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
        <h2
          id="definition"
          className="text-2xl font-bold text-white mb-4 scroll-mt-24"
        >
          1. Le TM47, c&apos;est quoi exactement ?
        </h2>
        <p className="mb-4">
          Le TM47 est une{' '}
          <strong className="text-white">notification d&apos;adresse</strong>,
          rien de plus. Ce n&apos;est ni une extension de visa, ni un
          renouvellement, ni une autorisation de séjour. C&apos;est simplement
          l&apos;obligation de dire à l&apos;immigration thaïlandaise : « je vis
          toujours ici, à cette adresse ».
        </p>
        <figure className="my-8">
          <Image
            src="/images/blog/tm47-bureau-immigration.jpg"
            alt="Salle d&apos;attente d&apos;un bureau d&apos;immigration thaïlandais pour le dépôt du rapport de 90 jours TM47"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Le TM47 n&apos;est pas un renouvellement de visa. C&apos;est une simple déclaration de présence, mais l&apos;oublier coûte cher.
          </figcaption>
        </figure>
        <p className="mb-4">
          L&apos;obligation repose sur la{' '}
          <strong className="text-white">
            section 37(5) de l&apos;Immigration Act B.E. 2522
          </strong>
          , la loi sur l&apos;immigration de 1979 — la même que celle qui permet
          à un agent de vous refuser l&apos;entrée faute de moyens de
          subsistance, sujet que nous avons traité dans notre{' '}
          <Link
            href="/blog/20000-thb-immigration-thailande-regle-especes"
            className="text-sky-400 hover:underline"
          >
            article sur la règle des 20 000 bahts
          </Link>
          . Cette loi de 47 ans encadre encore aujourd&apos;hui l&apos;essentiel
          de la vie administrative des étrangers en Thaïlande.
        </p>
        <div className="border-l-4 border-emerald-500 bg-emerald-500/5 rounded-r-xl p-5">
          <p className="text-emerald-400 font-semibold text-sm mb-2">
            Point rassurant
          </p>
          <p className="text-gray-300 text-sm">
            Le TM47 n&apos;affecte pas la validité de votre visa. Même en
            retard, votre DTV reste valide et votre séjour reste légal. Mais
            l&apos;oubli entraîne une amende et laisse une trace dans votre
            dossier — trace qui peut compliquer vos futures demandes
            d&apos;extension.
          </p>
        </div>
        <p className="mt-6">
          Et ne le confondez pas non plus avec{' '}
          <Link href="/blog/extension-180-jours-visa-dtv-thailande" className="text-sky-400 hover:underline font-medium">
            l&apos;extension de 180 jours
          </Link>
          , qui est la seule des trois démarches à modifier réellement la durée de votre séjour
          autorisé.
        </p>
        <p className="mt-4">
          C&apos;est d&apos;ailleurs la confusion la plus fréquente sur ce sujet : un TM47 en retard
          n&apos;est <strong className="text-white">pas</strong> un dépassement de séjour. Le premier
          est un rapport de présence oublié, le second un séjour devenu irrégulier — et les deux
          n&apos;ont ni la même amende ni les mêmes conséquences.{' '}
          <Link href="/blog/overstay-thailande-amende-blacklist-visa-dtv" className="text-sky-400 hover:underline font-medium">
            Le barème de l&apos;overstay, lui, va jusqu&apos;à dix ans d&apos;interdiction du
            territoire
          </Link>
          .
        </p>
      </section>

      {/* ── SECTION 2 ── */}
      <section className="mb-12">
        <h2
          id="qui-est-concerne"
          className="text-2xl font-bold text-white mb-4 scroll-mt-24"
        >
          2. Qui doit le faire — et qui ne le fera jamais
        </h2>
        <p className="mb-4">
          C&apos;est ici que se joue tout, et c&apos;est le point que personne
          n&apos;explique correctement.
        </p>
        <p className="mb-4">
          L&apos;obligation se déclenche après{' '}
          <strong className="text-white">
            90 jours consécutifs passés sur le territoire thaïlandais, sans en
            sortir.
          </strong>
        </p>
        <p className="mb-4">
          Le mot important est <em>consécutifs</em>. Car voici la règle qui
          change tout :
        </p>

        <div className="border-l-4 border-sky-400 bg-sky-500/5 rounded-r-xl p-5 mb-6">
          <p className="text-white font-semibold">
            Chaque sortie du territoire remet le compteur à zéro.
          </p>
        </div>

        <p className="mb-4">
          Vous partez trois jours au Laos ? Un week-end à Singapour ? Deux
          semaines en France ? À votre retour, le compteur repart de zéro depuis
          votre date de réentrée. Peu importe la durée du voyage — seul compte
          le fait d&apos;avoir franchi la frontière.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          Ce que ça implique pour les détenteurs de DTV
        </h3>
        <p className="mb-4">
          Si vous voyagez régulièrement — visa runs, déplacements
          professionnels, retours en Europe, escapades dans la région — vous ne
          serez probablement <strong className="text-white">jamais</strong>{' '}
          concerné par le TM47. Beaucoup de nomades numériques sous DTV ne le
          feront pas une seule fois en cinq ans.
        </p>
        <p className="mb-4">
          En revanche, si vous vous installez vraiment, que vous posez vos
          valises dans un condo et que vous restez plus de trois mois
          d&apos;affilée, l&apos;obligation vous rattrape. Et c&apos;est
          précisément le profil de ceux qui viennent en Thaïlande pour se poser,
          pas pour bouger.
        </p>
        <p>
          Une amie qui a obtenu son DTV en même temps que moi, via la voie Soft
          Power et un cours de cuisine, est dans ce cas. Elle est restée sur
          place sans sortir du territoire, et a dû faire son premier rapport à
          l&apos;immigration de Hat Yai.
        </p>
      </section>

      {/* ── SECTION 3 ── */}
      <section className="mb-12">
        <h2
          id="calendrier"
          className="text-2xl font-bold text-white mb-4 scroll-mt-24"
        >
          3. Le calendrier : quand exactement ?
        </h2>
        <p className="mb-4">
          Votre premier TM47 est dû le{' '}
          <strong className="text-white">90e jour</strong> de votre séjour
          continu. Ensuite, le cycle se répète tous les 90 jours tant que vous
          ne sortez pas du pays.
        </p>
        <figure className="my-8">
          <Image
            src="/images/blog/tm47-calendrier-90-jours.jpg"
            alt="Calendrier marquant l&apos;échéance du rapport de 90 jours en Thaïlande"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            La fenêtre de dépôt s&apos;ouvre 15 jours avant l&apos;échéance et se ferme 7 jours après. Programmez l&apos;alerte au 80e jour.
          </figcaption>
        </figure>
        <p className="mb-4">
          L&apos;immigration laisse une fenêtre confortable :
        </p>
        <ul className="space-y-3 mb-6 pl-4 border-l-2 border-gray-800 text-gray-400 text-sm">
          <li>
            <strong className="text-white">Au plus tôt :</strong> 15 jours avant
            la date d&apos;échéance.
          </li>
          <li>
            <strong className="text-white">Au plus tard :</strong> 7 jours après
            la date d&apos;échéance, sans pénalité.
          </li>
          <li>
            <strong className="text-white">Au-delà du 7e jour :</strong> amende.
          </li>
        </ul>
        <div className="border-l-4 border-amber-500 bg-amber-500/5 rounded-r-xl p-5 mb-6">
          <p className="text-amber-400 font-semibold text-sm mb-2">
            Nuance essentielle : le délai en ligne est plus court
          </p>
          <p className="text-gray-300 text-sm">
            La tolérance de 7 jours après l&apos;échéance ne vaut que pour le
            dépôt en personne. En ligne, le portail n&apos;accepte plus rien
            après la date d&apos;échéance elle-même. Si vous comptez sur votre
            semaine de marge en pensant déposer depuis votre canapé, vous serez
            obligé de vous déplacer.
          </p>
        </div>

        <p className="mb-4">
          Le conseil de bon sens : programmez une alerte sur votre téléphone au{' '}
          <strong className="text-white">80e jour</strong>. Vous aurez ainsi
          trois semaines de marge pour vous en occuper sans stress, et vous
          éviterez de découvrir votre retard un dimanche soir.
        </p>
        <p>
          Attention si le 7e jour tombe un week-end : les bureaux étant fermés,
          il faut avoir déposé avant.
        </p>
      </section>

      {/* ── SECTION 4 ── */}
      <section className="mb-12">
        <h2
          id="tm30-prerequis"
          className="text-2xl font-bold text-white mb-4 scroll-mt-24"
        >
          4. Le prérequis absolu : votre TM30
        </h2>
        <p className="mb-4">
          Voici le blocage numéro un, et il surprend beaucoup de monde.
        </p>
        <div className="border-l-4 border-red-500 bg-red-500/5 rounded-r-xl p-5 mb-6">
          <p className="text-red-100 text-sm">
            <strong className="text-white">
              Vous ne pouvez pas faire votre TM47 si votre TM30 n&apos;est pas
              enregistré dans le système.
            </strong>{' '}
            Et l&apos;adresse déclarée sur votre TM47 doit correspondre
            exactement à celle de votre TM30. La moindre divergence bloque le
            dossier.
          </p>
        </div>
        <p className="mb-4">
          Rappel : le TM30 est la déclaration de résidence que votre{' '}
          <strong className="text-white">propriétaire</strong> doit effectuer
          dans les 24 heures suivant votre arrivée dans le logement. C&apos;est
          son obligation, pas la vôtre — mais c&apos;est vous qui en subissez
          les conséquences s&apos;il ne la fait pas. Nous détaillons ce mécanisme
          dans notre{' '}
          <Link
            href="/blog/arrivee-thailande-aeroport-immigration-taxi-visa-dtv"
            className="text-sky-400 hover:underline"
          >
            guide de l&apos;arrivée en Thaïlande
          </Link>
          .
        </p>
        <p>
          Conséquence pratique : exigez le reçu du TM30 de votre propriétaire
          dès la signature du bail. Sans ce document, vous serez bloqué non
          seulement pour le TM47, mais aussi pour votre{' '}
          <Link href="/blog/extension-180-jours-visa-dtv-thailande" className="text-sky-400 hover:underline font-medium">
            extension de 180 jours
          </Link>
          .
        </p>
      </section>

      {/* ── SECTION 5 ── */}
      <section className="mb-12">
        <h2
          id="methodes"
          className="text-2xl font-bold text-white mb-4 scroll-mt-24"
        >
          5. Les quatre façons de faire son TM47
        </h2>
        <p className="mb-4">
          Contrairement à ce qu&apos;on lit souvent, il n&apos;y a pas deux mais{' '}
          <strong className="text-white">quatre méthodes</strong>.
        </p>
        <figure className="my-8">
          <Image
            src="/images/blog/tm47-en-ligne.jpg"
            alt="Dépôt en ligne du rapport de 90 jours TM47 depuis chez soi"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            En ligne, par courrier, par un agent ou sur place : quatre voies, avec des taux de réussite très inégaux.
          </figcaption>
        </figure>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          En personne — obligatoire la première fois
        </h3>
        <p className="mb-4">
          C&apos;est le point que personne ne mentionne, et qui coûte des
          amendes à beaucoup de gens :{' '}
          <strong className="text-white">
            votre tout premier rapport doit impérativement être fait en personne
          </strong>
          , au bureau d&apos;immigration de votre zone de résidence.
          L&apos;accès au portail en ligne n&apos;est ouvert qu&apos;à partir du
          deuxième rapport.
        </p>
        <p className="mb-4">
          Mon amie l&apos;a confirmé : première fois à l&apos;immigration de Hat
          Yai, en physique, et à partir de là elle pourra faire les suivants
          depuis son téléphone.
        </p>
        <p className="mb-4">
          Un autre contact installé à Pattaya me disait de son côté que « le
          truc en ligne n&apos;existe pas encore ». En réalité, il venait
          simplement de faire son premier rapport — donc obligatoirement en
          personne. Il n&apos;avait pas encore atteint le suivant. Les deux
          témoignages disent la même chose, vus depuis deux moments différents
          du cycle.
        </p>
        <p className="mb-4">
          Ce qu&apos;il faut apporter : votre passeport original, des
          photocopies de la page d&apos;identité, du visa, du dernier tampon
          d&apos;entrée et des extensions éventuelles, le formulaire TM47 rempli
          en lettres capitales et en anglais, et une photo 4×6 cm.
        </p>

        <div className="bg-[#111111] border border-gray-800 rounded-2xl p-5 mb-6">
          <p className="text-white font-semibold text-sm mb-2">
            Le bonus phuketois : le drive-thru
          </p>
          <p className="text-gray-400 text-sm">
            L&apos;immigration de Phuket Town propose le rapport des 90 jours au
            guichet Room 101 — mais aussi via un service{' '}
            <strong className="text-white">drive-thru</strong>. Vous passez en
            scooter ou en voiture, vous tendez votre passeport, c&apos;est réglé
            sans descendre du véhicule. Un service peu connu qui évite la file
            d&apos;attente.
          </p>
        </div>

        <p className="mb-4">
          Sur l&apos;immigration de Phuket en général, mon expérience
          personnelle est plutôt bonne. J&apos;ai connu une première visite
          compliquée — un quiproquo lors de l&apos;achat de mon scooter, où
          l&apos;erreur venait de leur côté sans qu&apos;ils l&apos;admettent.
          Mais toutes les fois suivantes se sont très bien passées : accueil
          correct, traitement rapide, frais minimes. C&apos;est globalement
          fluide.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          En ligne — à partir du deuxième rapport
        </h3>
        <p className="mb-4">
          Le portail officiel est{' '}
          <strong className="text-white">tm47.immigration.go.th</strong>, en
          anglais. Vous créez un compte avec votre nom, numéro de passeport,
          email et mot de passe, puis vous soumettez.
        </p>
        <p className="mb-4">
          Le traitement prend 1 à 3 jours ouvrés, et vous recevez par email un
          reçu officiel indiquant votre prochaine date d&apos;échéance.
          Conservez-le : l&apos;immigration peut vous le demander lors
          d&apos;une extension.
        </p>
        <p className="mb-4">
          <strong className="text-white">Nouveauté 2026 :</strong> il vous faut
          votre numéro TDAC — celui de la carte d&apos;arrivée numérique remplie
          avant votre vol — pour utiliser le système en ligne. Si vous ne
          l&apos;avez plus, vous pouvez le récupérer sur tdac.immigration.go.th.
          Sans lui, retour au guichet. Notre{' '}
          <Link
            href="/blog/tdac-thailande-carte-arrivee"
            className="text-sky-400 hover:underline"
          >
            guide complet du TDAC
          </Link>{' '}
          détaille cette formalité.
        </p>
        <p className="mb-4">
          Le portail peut être lent ou temporairement indisponible. Le réflexe :
          essayer tôt le matin heure thaïlandaise, et ne jamais attendre le
          dernier jour.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          Par courrier recommandé
        </h3>
        <p className="mb-4">
          Méthode totalement ignorée en français, mais parfaitement valide. Vous
          envoyez le formulaire TM47 rempli, les photocopies de passeport et une{' '}
          <strong className="text-white">
            enveloppe timbrée pré-adressée à votre nom
          </strong>
          , au bureau d&apos;immigration de votre zone,{' '}
          <strong className="text-white">au moins 10 jours avant</strong>{' '}
          l&apos;échéance. Le bureau vous renvoie la confirmation tamponnée.
        </p>
        <p className="mb-4">
          Uniquement depuis la Thaïlande, en courrier recommandé ou EMS. Utile
          si vous vivez loin d&apos;un bureau d&apos;immigration.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          Par un tiers ou un agent
        </h3>
        <p>
          Vous pouvez mandater quelqu&apos;un. Il lui faudra votre passeport
          original, le formulaire TM47 signé de votre main, et une procuration
          simple. Les agences de visa proposent aussi ce service.
        </p>
      </section>

      {/* ── SECTION 6 ── */}
      <section className="mb-12">
        <h2
          id="amendes"
          className="text-2xl font-bold text-white mb-4 scroll-mt-24"
        >
          6. Les amendes : ce que ça coûte vraiment
        </h2>
        <p className="mb-4">
          Deux niveaux de sanction, et l&apos;écart est significatif.
        </p>
        <figure className="my-8">
          <Image
            src="/images/blog/tm47-amende.jpg"
            alt="Amende payée au comptoir de l&apos;immigration thaïlandaise pour un rapport de 90 jours en retard"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            L&apos;amende tombe dès le premier jour de retard, et elle se règle en espèces au guichet.
          </figcaption>
        </figure>
        <ul className="space-y-3 mb-6 pl-4 border-l-2 border-gray-800 text-gray-400 text-sm">
          <li>
            <strong className="text-white">
              Si vous vous présentez de vous-même en retard :
            </strong>{' '}
            2 000 THB, soit environ 52 €. L&apos;amende se règle sur place au
            bureau d&apos;immigration.
          </li>
          <li>
            <strong className="text-white">
              Si c&apos;est un contrôle qui vous rattrape
            </strong>{' '}
            — barrage de police, audit d&apos;immigration, vérification lors
            d&apos;une autre démarche : jusqu&apos;à 5 000 THB, plus 200 THB par
            jour de retard.
          </li>
        </ul>
        <p className="mb-4">
          La différence est nette : mieux vaut se dénoncer soi-même que se faire
          prendre.
        </p>
        <p className="mb-4">
          Au-delà du montant, c&apos;est l&apos;accumulation qui pose problème.
          Des retards répétés créent un historique négatif qui peut compliquer
          vos demandes d&apos;extension, voire dans les cas extrêmes mener à un
          refus. Le système thaïlandais étant désormais entièrement numérisé et
          biométrique, votre historique est visible en deux clics par
          n&apos;importe quel agent.
        </p>
        <div className="border-l-4 border-amber-500 bg-amber-500/5 rounded-r-xl p-5">
          <p className="text-amber-400 font-semibold text-sm mb-2">
            Point important
          </p>
          <p className="text-gray-300 text-sm">
            En retard, vous ne pouvez plus déposer en ligne. Le portail refuse
            les dossiers hors délai. Déplacement obligatoire et paiement de
            l&apos;amende sur place.
          </p>
        </div>
      </section>

      {/* ── SECTION 7 ── */}
      <section className="mb-12">
        <h2
          id="pieges"
          className="text-2xl font-bold text-white mb-4 scroll-mt-24"
        >
          7. Les six pièges à connaître
        </h2>
        <ul className="space-y-4 mb-6 list-none pl-0">
          <li className="flex items-start gap-3 text-gray-300 text-sm">
            <span className="text-amber-500 mt-1 flex-none">1.</span>
            <div>
              <strong className="text-white">
                Le premier rapport en ligne.
              </strong>{' '}
              Impossible. Beaucoup essaient, se font rejeter, perdent des jours
              et se retrouvent hors délai. Première fois en personne, sans
              exception.
            </div>
          </li>
          <li className="flex items-start gap-3 text-gray-300 text-sm">
            <span className="text-amber-500 mt-1 flex-none">2.</span>
            <div>
              <strong className="text-white">Le mauvais bureau.</strong> Vous
              devez déposer au bureau d&apos;immigration couvrant l&apos;adresse
              de votre TM30. Si vous vivez à Phuket, vous ne pouvez pas déposer
              à Bangkok, même de passage.
            </div>
          </li>
          <li className="flex items-start gap-3 text-gray-300 text-sm">
            <span className="text-amber-500 mt-1 flex-none">3.</span>
            <div>
              <strong className="text-white">Le nouveau passeport.</strong> Si
              vous avez renouvelé votre passeport, le système ne reconnaîtra pas
              le nouveau numéro. Il faut retourner une fois en personne pour
              lier le nouveau document à votre dossier, avant de pouvoir
              reprendre les dépôts en ligne.
            </div>
          </li>
          <li className="flex items-start gap-3 text-gray-300 text-sm">
            <span className="text-amber-500 mt-1 flex-none">4.</span>
            <div>
              <strong className="text-white">
                Le numéro TDAC introuvable.
              </strong>{' '}
              Sans lui, pas d&apos;accès au portail en 2026. Récupérez-le à
              l&apos;avance sur tdac.immigration.go.th.
            </div>
          </li>
          <li className="flex items-start gap-3 text-gray-300 text-sm">
            <span className="text-amber-500 mt-1 flex-none">5.</span>
            <div>
              <strong className="text-white">
                Le rejet « first time user » après un voyage.
              </strong>{' '}
              Cas documenté sur les forums : un résident de longue date dépose
              en ligne et se fait rejeter avec le motif « premier dépôt,
              présentez-vous en personne ». La cause probable est une sortie
              puis une réentrée sur le territoire entre-temps, qui a fait
              repartir son dossier de zéro dans le système. Anticipez : après un
              voyage, prévoyez de pouvoir vous déplacer.
            </div>
          </li>
          <li className="flex items-start gap-3 text-gray-300 text-sm">
            <span className="text-amber-500 mt-1 flex-none">6.</span>
            <div>
              <strong className="text-white">
                Le compteur qu&apos;on croit à tort en cours.
              </strong>{' '}
              À l&apos;inverse des oublis, certains font leur rapport alors
              qu&apos;ils rentrent tout juste d&apos;un voyage à
              l&apos;étranger. C&apos;est inutile : leur compteur est reparti de
              zéro à la réentrée.
            </div>
          </li>
        </ul>
      </section>

      {/* ── SECTION 8 ── */}
      <section className="mb-14">
        <h2
          id="oubli"
          className="text-2xl font-bold text-white mb-4 scroll-mt-24"
        >
          8. Vous avez oublié : que faire ?
        </h2>
        <p className="mb-4">Pas de panique, ce n&apos;est pas dramatique.</p>
        <p className="mb-4">
          Rendez-vous au bureau d&apos;immigration de votre zone avec votre
          passeport, vos photocopies et le formulaire rempli. Vous paierez
          l&apos;amende sur place — 2 000 THB dans la grande majorité des cas —
          et votre rapport sera enregistré.
        </p>
        <p className="mb-4">
          Votre visa n&apos;est pas menacé. Votre séjour reste légal. Vous
          repartez avec votre reçu et la prochaine date d&apos;échéance.
        </p>
        <p className="mb-6">
          Ce qu&apos;il ne faut surtout pas faire : mentir, prétendre avoir
          perdu son passeport, ou tenter d&apos;arranger la vérité. Le système
          est biométrique et votre historique complet apparaît à l&apos;écran.
          La transparence coûte 2 000 THB, la mauvaise foi coûte votre
          réputation auprès d&apos;une administration que vous reverrez
          régulièrement pendant cinq ans.
        </p>

        <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6">
          <p className="text-white font-bold text-sm mb-3">
            Ce qu&apos;il faut retenir
          </p>
          <p className="text-gray-400 text-sm mb-3">
            Le TM47 n&apos;est pas compliqué. Il est simplement invisible —
            personne ne vous prévient, et on le découvre généralement trop tard.
          </p>
          <p className="text-gray-400 text-sm">
            Retenez trois choses. Le compteur ne tourne que si vous restez sans
            sortir. Le premier rapport se fait obligatoirement en personne. Et
            sans TM30 valide de votre propriétaire, rien n&apos;est possible.
            Programmez une alerte au 80e jour, exigez le reçu TM30 dès votre
            emménagement, et le sujet est réglé pour cinq ans.
          </p>
        </div>
      </section>

      {/* ── ENCART AUTEUR (E-E-A-T) ── */}
      <div className="my-14 bg-[#111111] border border-gray-800 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-6 shadow-lg">
        <div className="w-24 h-24 rounded-full bg-gray-800 flex-shrink-0 overflow-hidden border-2 border-sky-500/50">
          <div className="w-full h-full bg-gradient-to-br from-sky-500/20 to-emerald-500/20 flex items-center justify-center text-3xl">
            🇹🇭
          </div>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-1">
            Matthieu Moretti
          </h3>
          <p className="text-sky-400 text-xs font-semibold mb-3 uppercase tracking-wider">
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

      {/* ── MAILLAGE INTERNE ── */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 mb-12">
        <p className="text-white font-bold text-sm mb-4">
          📚 Pour aller plus loin :
        </p>
        <ul className="space-y-3 list-none pl-0">
          <li>
            <Link
              href="/blog/fiscalite-thailande-expatries-residence-fiscale"
              className="text-sky-400 hover:text-sky-300 hover:underline text-sm transition-colors"
            >
              → Fiscalité : ce qui se passe vraiment après 180 jours de présence
            </Link>
          </li>
          <li>
            <Link
              href="/blog/arrivee-thailande-aeroport-immigration-taxi-visa-dtv"
              className="text-sky-400 hover:text-sky-300 hover:underline text-sm transition-colors"
            >
              → TM30 et arrivée en Thaïlande : le guide complet
            </Link>
          </li>
          <li>
            <Link
              href="/blog/20000-thb-immigration-thailande-regle-especes"
              className="text-sky-400 hover:text-sky-300 hover:underline text-sm transition-colors"
            >
              → La règle des 20 000 bahts à l&apos;immigration
            </Link>
          </li>
          <li>
            <Link
              href="/blog/tdac-thailande-carte-arrivee"
              className="text-sky-400 hover:text-sky-300 hover:underline text-sm transition-colors"
            >
              → TDAC : la carte d&apos;arrivée numérique obligatoire
            </Link>
          </li>
        </ul>
      </div>

      {/* ── FAQ ── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white mb-6">
          FAQ — Le rapport des 90 jours en questions
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
        <div className="absolute top-0 right-0 w-40 h-40 bg-sky-500 opacity-10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500 opacity-5 rounded-full blur-3xl pointer-events-none" />

        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 relative z-10">
          Un projet d&apos;installation en Thaïlande ?
        </h3>
        <p className="text-gray-400 mb-8 relative z-10 text-sm md:text-base">
          TM30, TM47, extension de 180 jours : les formalités s&apos;enchaînent
          et se conditionnent les unes les autres. Nous préparons votre dossier
          DTV et sécurisons vos premières démarches sur place.
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
