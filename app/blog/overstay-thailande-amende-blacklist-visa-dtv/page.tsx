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

const post = getBlogPost('overstay-thailande-amende-blacklist-visa-dtv');
const articleSchema = createArticleSchema(post);
const breadcrumbSchema = createBreadcrumbSchema(post);

export const metadata = createArticleMetadata(post);

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Combien coûte un jour d'overstay en Thaïlande ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "500 THB par jour de dépassement, avec un plafond de 20 000 THB. L'amende cesse donc d'augmenter au quarantième jour de dépassement : que vous dépassiez de 40 jours ou de 400, le montant réclamé à la caisse est le même.",
      },
    },
    {
      '@type': 'Question',
      name: "Un overstay entraîne-t-il automatiquement une interdiction d'entrée ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. Selon l'Ordonnance 1/2558 du ministère de l'Intérieur thaïlandais, un dépassement de 90 jours ou moins, lorsque la personne se présente d'elle-même aux autorités au moment de quitter le pays, donne lieu à une amende sans interdiction de retour. Les interdictions commencent au-delà de 90 jours : 1 an, puis 3 ans au-delà d'un an de dépassement, 5 ans au-delà de trois ans, et 10 ans au-delà de cinq ans.",
      },
    },
    {
      '@type': 'Question',
      name: "Quelle différence entre se présenter de soi-même et être arrêté ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Elle est considérable et c'est le point décisif. Un dépassement de 30 jours déclaré spontanément au comptoir d'immigration en quittant le pays coûte 15 000 THB, sans interdiction. Le même dépassement découvert lors d'un contrôle expose à 15 000 THB et cinq ans d'interdiction du territoire, l'ordonnance prévoyant 5 ans pour tout dépassement inférieur à un an constaté par arrestation.",
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on demander un Visa DTV alors qu'on est en overstay en Thaïlande ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. Le Visa DTV se dépose auprès d'une ambassade ou d'un consulat de Thaïlande à l'étranger via le système e-Visa ; il n'existe aucune conversion depuis le territoire thaïlandais. Un dépassement en cours doit donc être régularisé, c'est-à-dire soldé au moment du départ, avant qu'une demande de DTV puisse être envisagée.",
      },
    },
    {
      '@type': 'Question',
      name: "Un overstay passé bloque-t-il une demande de Visa DTV ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Un dépassement court, régularisé volontairement et sans interdiction prononcée, ne constitue pas un obstacle en soi. Il figure toutefois dans la base de données de l'immigration et s'ajoute au reste de l'historique du demandeur. Une interdiction d'entrée formelle relève d'une autre situation, qui nécessite l'avis d'un avocat spécialisé en droit de l'immigration thaïlandais.",
      },
    },
    {
      '@type': 'Question',
      name: "Combien de personnes ont été refoulées à l'entrée en Thaïlande en 2026 ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Selon le bilan du Bureau de l'Immigration pour la période de janvier à mai 2026, 29 490 étrangers ont été refoulés à l'entrée et plus de 14 000 personnes arrêtées pour dépassement de séjour ou travail illégal. 169 506 noms figurent dans le système APPS, qui bloque les passagers avant l'embarquement.",
      },
    },
    {
      '@type': 'Question',
      name: "Le visa run est-il encore possible en 2026 ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Il devient très risqué. Depuis fin 2025, les entrées en exemption de visa par frontière terrestre sont plafonnées à deux par année civile, et les bureaux d'immigration locaux ont reçu instruction de refuser les extensions lorsqu'ils détectent un comportement de visa runner. L'historique de visa runs figure parmi les trois principaux motifs de refoulement invoqués par le Bureau de l'Immigration.",
      },
    },
  ],
};

const sommaire = [
  { id: 'contexte-2026', label: 'Ce qui a changé en 2026 : 29 490 personnes refoulées en cinq mois' },
  { id: 'bareme-amende', label: "Le barème officiel : 500 THB par jour, plafond à 20 000 THB" },
  { id: 'tableau-interdictions', label: 'Le tableau des interdictions — et les chiffres faux qui circulent' },
  { id: 'vous-etes-dedans', label: 'Vous êtes en overstay en ce moment' },
  { id: 'vous-y-pensez', label: "Vous n'êtes pas en overstay, mais vous y pensez" },
  { id: 'ce-que-change-dtv', label: 'Ce que change réellement un DTV — et ce qu\'il ne change pas' },
  { id: 'overstay-passe', label: "Un dépassement passé empêche-t-il d'obtenir un DTV ?" },
  { id: 'ce-que-je-retiens', label: 'Ce que je retiens de mes propres années à compter' },
];

export default function ArticleOverstay() {
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
          Overstay en Thaïlande :{' '}
          <span className="text-sky-400">500 THB par jour, et l&apos;erreur qui coûte cinq ans</span>
        </h1>

        <p className="text-base text-gray-500 mt-6">
          Lecture : 13 min · Mis à jour : {post.date} · Par{' '}
          <strong className="text-gray-400">Matthieu Moretti</strong>
        </p>
        <PartageArticle slug="overstay-thailande-amende-blacklist-visa-dtv" variant="entete" />
      </header>

      {/* ── INTRODUCTION ── */}
      <div className="text-lg text-gray-400 mb-12 space-y-5">
        <p>
          Il y a un geste que connaissent tous ceux qui vivent en Thaïlande sans visa long séjour. On
          ouvre le calendrier du téléphone, on pose le passeport à côté, et{' '}
          <strong className="text-white">on compte.</strong> On remonte tampon par tampon : entré le
          12, sorti le 8, rentré le 21. On additionne les jours passés dans le royaume depuis janvier.
          Et on essaie de deviner ce que verra l&apos;officier d&apos;immigration au prochain retour.
        </p>
        <p>
          Cent dix jours, ça passe encore. Cent quatre-vingts, c&apos;est déjà une conversation au
          guichet. Deux cent quarante, et on commence à préparer des justificatifs qu&apos;on
          n&apos;aura peut-être même pas le droit de montrer.
        </p>
        <p>
          J&apos;ai fait ce calcul un nombre incalculable de fois. Je suis sorti vers Bali, vers la
          Malaisie, vers la France — de vraies sorties parfois, des allers-retours administratifs le
          reste du temps. Et à chaque retour, le même trajet dans la file d&apos;attente avec la même
          question qui tourne : est-ce que cette fois-ci ça passe ? L&apos;officier feuillette,
          s&apos;arrête sur une page, lève les yeux. Deux secondes de silence qui durent longtemps.
        </p>
        <p className="text-white font-medium border-l-4 border-sky-500 pl-5 py-1">
          Ce que je veux dire dans cet article, c&apos;est que ce calcul repose très souvent sur des
          chiffres faux. Beaucoup de gens croient risquer une interdiction de séjour alors qu&apos;ils
          ne risquent qu&apos;une amende. D&apos;autres pensent s&apos;en sortir avec une amende alors
          qu&apos;ils jouent cinq ans d&apos;interdiction. Et la différence entre les deux ne tient
          pas du tout à la durée du dépassement.
        </p>
        <p>
          Depuis que j&apos;ai mon DTV, je ne compte plus. C&apos;est difficile à expliquer à
          quelqu&apos;un qui ne l&apos;a pas vécu, mais c&apos;est probablement le bénéfice le plus
          concret de ce visa — et personne ne le met jamais dans un tableau comparatif.
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

      <figure className="my-8">
        <Image
          src="/images/blog/overstay-comptage-jours-calendrier.jpg"
          alt="Passeport ouvert et calendrier posés côte à côte pour compter les jours de présence en Thaïlande"
          width={1200}
          height={800}
          className="rounded-2xl border border-white/10"
        />
        <figcaption className="mt-3 text-sm text-gray-500">
          Le calendrier, le passeport et l&apos;addition au crayon. Le rituel de tous ceux qui vivent
          en Thaïlande sans visa long séjour.
        </figcaption>
      </figure>

      {/* ── SECTION 1 ── */}
      <section className="mb-12">
        <h2 id="contexte-2026" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          1. Ce qui a changé en 2026 : 29 490 personnes refoulées en cinq mois
        </h2>
        <p className="mb-4">
          Commençons par le contexte, parce qu&apos;il rend tout le reste de cet article urgent.
        </p>
        <p className="mb-4">
          Les règles d&apos;entrée en Thaïlande n&apos;ont presque pas bougé.{' '}
          <strong className="text-white">Ce qui a changé, c&apos;est leur application.</strong> Les
          officiers d&apos;immigration n&apos;évaluent plus chaque entrée isolément : ils lisent
          l&apos;historique complet du passeport. Un profil dont le carnet de tampons raconte une vie
          en Thaïlande sur des entrées touristiques est désormais un profil à risque, à
          l&apos;aéroport comme aux frontières terrestres.
        </p>
        <p className="mb-6">
          Le Bureau de l&apos;Immigration a publié son bilan pour la période{' '}
          <strong className="text-white">janvier à mai 2026</strong>, sous une bannière qui ne laisse
          pas beaucoup de place à l&apos;interprétation : «{' '}
          <em className="text-white">No Entry, No Stay, No Escape</em> ».
        </p>

        <div className="overflow-x-auto rounded-2xl border border-gray-800 mb-6">
          <table className="w-full min-w-[460px] text-sm">
            <thead>
              <tr className="bg-[#111111] border-b border-gray-800">
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Bilan janvier – mai 2026</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Chiffre officiel</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]">
                <td className="px-4 py-3">Étrangers refoulés à l&apos;entrée</td>
                <td className="px-4 py-3 text-white font-semibold">29 490</td>
              </tr>
              <tr className="border-b border-gray-800/60">
                <td className="px-4 py-3">Noms inscrits dans le système APPS</td>
                <td className="px-4 py-3 text-white font-semibold">169 506</td>
              </tr>
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]">
                <td className="px-4 py-3">Arrestations (dépassement, travail illégal)</td>
                <td className="px-4 py-3">plus de 14 000</td>
              </tr>
              <tr className="border-b border-gray-800/60">
                <td className="px-4 py-3">Zones ciblées par des opérations</td>
                <td className="px-4 py-3">190</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Visas Éducation frauduleux annulés</td>
                <td className="px-4 py-3">668</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mb-4">
          Trois précisions sur ce tableau, parce que chaque ligne cache quelque chose.
        </p>
        <p className="mb-4">
          Les <strong className="text-white">trois motifs principaux de refoulement</strong> invoqués
          par le Bureau sont : fonds insuffisants, absence d&apos;itinéraire de voyage détaillé, et{' '}
          <strong className="text-white">historique de visa runs</strong>. Sur le premier point, la
          règle est chiffrée et beaucoup de voyageurs l&apos;ignorent — j&apos;y consacre{' '}
          <Link href="/blog/20000-thb-immigration-thailande-regle-especes" className="text-sky-400 hover:underline font-medium">
            un guide entier sur les 20 000 THB exigibles à l&apos;entrée
          </Link>
          .
        </p>
        <p className="mb-4">
          Le <strong className="text-white">système APPS</strong> (<em>Advanced Passenger Processing
          System</em>) ne bloque pas à l&apos;arrivée : il bloque{' '}
          <strong className="text-white">avant l&apos;embarquement</strong>, dans votre aéroport de
          départ. Vous ne découvrez pas le problème à Suvarnabhumi, vous le découvrez au comptoir
          d&apos;enregistrement, en France, avec vos valises.
        </p>
        <p className="mb-6">
          Les <strong className="text-white">190 zones ciblées</strong> ne sont pas réparties au
          hasard. Chonburi — Pattaya — arrive en tête avec 147 opérations, suivie de Chiang Mai et de
          Phuket. Ce sont précisément les trois zones où la communauté francophone est la plus
          installée.
        </p>
        <p className="mb-6">
          Le porte-parole du Bureau, le général de police Choengron Rimphadee, a tenu à rassurer les
          vacanciers : quelqu&apos;un qui vient une ou deux fois par an n&apos;a rien à craindre. La
          campagne vise les personnes qui enchaînent les entrées touristiques pour vivre, travailler
          ou tenir un commerce sans le visa correspondant.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">
          Deux changements réglementaires qu&apos;il faut connaître
        </h3>
        <p className="mb-4">
          Depuis fin 2025, les{' '}
          <strong className="text-white">entrées en exemption de visa par frontière terrestre sont
          plafonnées à deux par année civile.</strong> Cette seule mesure tue net le visa run
          terrestre comme mode de vie. Et les bureaux d&apos;immigration locaux ont reçu instruction
          de refuser les demandes d&apos;extension, voire d&apos;annuler les séjours en cours,
          lorsqu&apos;ils détectent un comportement de visa runner.
        </p>
        <p className="mb-6">
          En parallèle, la réforme de l&apos;exemption de visa suit son cours — un sujet que je
          documente et remets à jour séparément dans{' '}
          <Link href="/blog/fin-exemption-visa-60-jours" className="text-sky-400 hover:underline font-medium">
            mon suivi de la fin de l&apos;exemption de 60 jours
          </Link>
          .
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">
          Ce que ça donne au guichet : mon dernier passage
        </h3>
        <p className="mb-4">
          Ces chiffres ne sont pas abstraits, et je peux le dire parce que je suis passé dedans.
        </p>
        <p className="mb-4">
          Lors de ma dernière entrée avant d&apos;obtenir mon DTV, l&apos;agente a tiqué en feuilletant
          mon passeport. Elle a appelé son supérieur. Il est venu, il a regardé les pages, et il
          m&apos;a demandé <strong className="text-white">ce que je faisais en Thaïlande.</strong> La
          question réelle derrière la question, je l&apos;ai comprise tout de suite : il voulait
          savoir si je travaillais sur place sans être en règle. Je lui ai expliqué que mon activité
          était en ligne, que je voyageais, que je profitais de la vie.
        </p>
        <p className="mb-6">
          Il m&apos;a laissé entrer. Mais pas sans un message, et je le cite de mémoire au plus
          près : <em className="text-white">« Pour cette fois c&apos;est bon, mais on vous met sur
          liste rouge. La prochaine fois, si vous n&apos;avez pas un visa adéquat de longue durée, un
          DTV par exemple, on vous refusera l&apos;entrée. »</em>
        </p>
        <p className="mb-6">
          Je ne sais pas à quelle catégorie administrative correspond exactement cette « liste
          rouge » — je rapporte les mots qui m&apos;ont été dits, pas un mécanisme officiel que
          j&apos;aurais vérifié. Mais le fond du message, lui, ne laissait aucune place au doute. Ce
          n&apos;était pas une menace, c&apos;était un avertissement, et il était même plutôt
          bienveillant : un officier de l&apos;immigration thaïlandaise m&apos;a lui-même nommé le
          visa que je devais aller chercher.
        </p>
        <p className="mb-6">
          Je n&apos;étais pas en dépassement de séjour. Je n&apos;avais rien à me reprocher sur le
          papier. C&apos;est exactement le point de cet article :{' '}
          <strong className="text-white">l&apos;examen ne porte plus sur votre tampon, il porte sur
          votre trajectoire.</strong> Et il ne se déclenche pas quand vous êtes en faute — il se
          déclenche quand votre passeport raconte une histoire.
        </p>

        <div className="bg-red-500/5 border border-red-500/30 rounded-2xl p-6">
          <p className="text-white font-semibold mb-2">Ce qu&apos;un refus d&apos;entrée signifie concrètement</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Ce n&apos;est pas un demi-tour poli. C&apos;est une expulsion{' '}
            <strong className="text-white">aux frais du voyageur</strong> : l&apos;immigration vous
            retient jusqu&apos;à ce que vous ayez payé votre billet de retour. Le tampon de refus,
            lui, reste dans le passeport et dans la base de données — et il ne s&apos;efface pas au
            bout de douze mois.
          </p>
        </div>
      </section>

      {/* ── SECTION 2 ── */}
      <section className="mb-12">
        <h2 id="bareme-amende" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          2. Le barème officiel : 500 THB par jour, plafond à 20 000 THB
        </h2>
        <p className="mb-4">
          Passons aux chiffres, et sortons des forums.
        </p>
        <p className="mb-6">
          Le texte de référence est l&apos;
          <strong className="text-white">Ordonnance 1/2558 du ministère de l&apos;Intérieur</strong>{' '}
          (<em>Ministry of Interior&apos;s Order 1/2558, Regarding Classes of Aliens Ineligible for
          Admission to the Kingdom of Thailand</em>), entrée en vigueur le{' '}
          <strong className="text-white">20 mars 2016</strong>. Elle est publiée en anglais sur les
          sites des bureaux d&apos;immigration thaïlandais, en <code className="text-sky-400">.go.th</code>.
          Le lien figure dans les sources en bas de cette page.
        </p>
        <p className="mb-6">
          <strong className="text-white">L&apos;amende est de 500 THB par jour de dépassement,
          plafonnée à 20 000 THB.</strong>
        </p>

        <div className="overflow-x-auto rounded-2xl border border-gray-800 mb-6">
          <table className="w-full min-w-[380px] text-sm">
            <thead>
              <tr className="bg-[#111111] border-b border-gray-800">
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Durée du dépassement</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Amende</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]"><td className="px-4 py-3">1 jour</td><td className="px-4 py-3">500 THB</td></tr>
              <tr className="border-b border-gray-800/60"><td className="px-4 py-3">10 jours</td><td className="px-4 py-3">5 000 THB</td></tr>
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]"><td className="px-4 py-3">30 jours</td><td className="px-4 py-3">15 000 THB</td></tr>
              <tr><td className="px-4 py-3">40 jours et au-delà</td><td className="px-4 py-3 text-white font-semibold">20 000 THB (plafond)</td></tr>
            </tbody>
          </table>
        </div>

        <p className="mb-4">
          Ce plafond a une conséquence que beaucoup de gens ignorent :{' '}
          <strong className="text-white">l&apos;amende cesse d&apos;augmenter au quarantième
          jour.</strong> 40 × 500 = 20 000. Que vous dépassiez de 40 jours ou de 400, vous paierez le
          même montant à la caisse.
        </p>
        <p>
          Ce serait une bonne nouvelle si l&apos;amende était la seule sanction. Elle ne l&apos;est
          pas — et c&apos;est précisément le piège. Au moment exact où l&apos;amende arrête de
          grimper, c&apos;est l&apos;autre compteur qui prend le relais.
        </p>
      </section>

      {/* ── SECTION 3 ── */}
      <section className="mb-12">
        <h2 id="tableau-interdictions" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          3. Le tableau des interdictions — et les chiffres faux qui circulent
        </h2>
        <p className="mb-6">
          Voici le cœur de l&apos;ordonnance, et le passage qui justifie à lui seul cet article.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mb-3">
          Si vous vous présentez de vous-même aux autorités
        </h3>
        <p className="mb-4 text-sm text-gray-500">
          C&apos;est-à-dire au comptoir d&apos;immigration d&apos;un aéroport, d&apos;un port ou
          d&apos;un poste frontière, au moment de quitter le pays.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-emerald-500/25 mb-8">
          <table className="w-full min-w-[400px] text-sm">
            <thead>
              <tr className="bg-emerald-500/10 border-b border-emerald-500/25">
                <th className="text-left px-4 py-3 text-emerald-300 font-semibold">Dépassement</th>
                <th className="text-left px-4 py-3 text-emerald-300 font-semibold">Interdiction de retour</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]">
                <td className="px-4 py-3 text-white font-semibold">90 jours ou moins</td>
                <td className="px-4 py-3 text-emerald-400 font-semibold">aucune interdiction</td>
              </tr>
              <tr className="border-b border-gray-800/60"><td className="px-4 py-3">plus de 90 jours</td><td className="px-4 py-3">1 an</td></tr>
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]"><td className="px-4 py-3">plus d&apos;1 an</td><td className="px-4 py-3">3 ans</td></tr>
              <tr className="border-b border-gray-800/60"><td className="px-4 py-3">plus de 3 ans</td><td className="px-4 py-3">5 ans</td></tr>
              <tr><td className="px-4 py-3">plus de 5 ans</td><td className="px-4 py-3">10 ans</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold text-gray-200 mb-3">Si vous êtes arrêté et poursuivi</h3>

        <div className="overflow-x-auto rounded-2xl border border-red-500/30 mb-6">
          <table className="w-full min-w-[400px] text-sm">
            <thead>
              <tr className="bg-red-500/10 border-b border-red-500/30">
                <th className="text-left px-4 py-3 text-red-300 font-semibold">Dépassement</th>
                <th className="text-left px-4 py-3 text-red-300 font-semibold">Interdiction de retour</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]">
                <td className="px-4 py-3">moins d&apos;1 an</td>
                <td className="px-4 py-3 text-red-400 font-semibold">5 ans</td>
              </tr>
              <tr>
                <td className="px-4 py-3">plus d&apos;1 an</td>
                <td className="px-4 py-3 text-red-400 font-semibold">10 ans</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mb-8 text-sm text-gray-500">
          Les interdictions courent à compter de la date de départ du territoire.
        </p>

        <figure className="my-8">
          <Image
            src="/images/blog/overstay-guichet-immigration-controle.jpg"
            alt="File d'attente devant les comptoirs d'immigration dans un aéroport asiatique"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Ce n&apos;est pas la longueur du dépassement qui décide de votre sort, c&apos;est la
            manière dont il se termine.
          </figcaption>
        </figure>

        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">
          Le même dépassement, deux issues à cinq ans d&apos;écart
        </h3>
        <p className="mb-4">
          Regardez ces deux tableaux ensemble et prenez un cas concret. Un dépassement de{' '}
          <strong className="text-white">30 jours</strong>.
        </p>
        <ul className="space-y-3 mb-6 pl-4 border-l-2 border-sky-500/40 text-gray-400 text-sm">
          <li>
            Vous vous <strong className="text-white">présentez de vous-même</strong> en partant :{' '}
            <strong className="text-emerald-400">15 000 THB, et rien d&apos;autre.</strong> Aucune
            interdiction. Vous pouvez revenir.
          </li>
          <li>
            Vous êtes <strong className="text-white">contrôlé</strong> dans la rue, dans un bar, lors
            d&apos;un raid dans une zone ciblée :{' '}
            <strong className="text-red-400">15 000 THB et cinq ans d&apos;interdiction du
            territoire.</strong>
          </li>
        </ul>
        <p className="mb-6">
          Même durée. Même amende. Cinq ans d&apos;écart. Ce n&apos;est pas la longueur du dépassement
          qui détermine votre sort, c&apos;est{' '}
          <strong className="text-white">la manière dont il se termine.</strong> Tout, dans cette
          affaire, se joue sur cette bascule.
        </p>

        <div className="bg-red-500/5 border border-red-500/30 rounded-2xl p-6 mb-6">
          <p className="text-white font-semibold mb-3">
            ⚠️ Attention aux chiffres qui circulent sur ce sujet
          </p>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            En préparant cet article, j&apos;ai lu ce que renvoient les premiers résultats de
            recherche, en français comme en anglais. Plusieurs pages affirment qu&apos;un dépassement
            de moins de 90 jours entraîne un an d&apos;interdiction.{' '}
            <strong className="text-white">C&apos;est l&apos;inverse de ce que dit
            l&apos;ordonnance.</strong> D&apos;autres inversent les colonnes « présenté » et
            « arrêté », ce qui est encore plus grave puisque cela pousse à la mauvaise décision.
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Ces pages sont des fermes de contenu qui se recopient les unes les autres. Elles
            terrorisent des gens qui ne risquent qu&apos;une amende, et rassurent des gens qui jouent
            cinq ans de leur vie. Vérifiez toujours le texte source : le lien officiel est en bas de
            cette page.
          </p>
        </div>

        <div className="bg-sky-500/5 border border-sky-500/25 rounded-2xl p-6">
          <p className="text-white font-semibold mb-2">Une nuance, et je préfère être clair</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            « Aucune interdiction » ne veut pas dire « aucune trace ». Un dépassement, même court,
            même réglé spontanément, est{' '}
            <strong className="text-white">enregistré dans la base de données de
            l&apos;immigration</strong>. Il sera visible par chaque officier, à chaque entrée future.
            Cela ne vous ferme aucune porte — mais cela s&apos;ajoute au reste de votre historique.
            Nous y revenons en section 7.
          </p>
        </div>
      </section>

      {/* ── SECTION 4 ── */}
      <section className="mb-12">
        <h2 id="vous-etes-dedans" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          4. Vous êtes en overstay en ce moment
        </h2>
        <p className="mb-6">
          Si vous lisez cet article la boule au ventre parce que votre tampon est périmé depuis
          quelques jours ou quelques semaines, voici l&apos;ordre des opérations. Je ne vais rien vous
          vendre dans cette section.
        </p>

        <div className="space-y-4 mb-8">
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-5">
            <p className="text-sky-400 font-bold text-sm mb-2">Un</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              <strong className="text-white">Comptez précisément vos jours de dépassement</strong>, à
              partir du lendemain de la date inscrite sur votre tampon ou votre autorisation de
              séjour. C&apos;est ce chiffre qui détermine tout le reste.
            </p>
          </div>
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-5">
            <p className="text-sky-400 font-bold text-sm mb-2">Deux</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              <strong className="text-white">Situez-vous dans les tableaux de la section 3.</strong>{' '}
              Si vous êtes sous les 90 jours et que vous partez de votre propre initiative, vous êtes
              dans le scénario le plus favorable prévu par le texte : une amende, et pas
              d&apos;interdiction.
            </p>
          </div>
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-5">
            <p className="text-sky-400 font-bold text-sm mb-2">Trois</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              <strong className="text-white">Sortez du pays et déclarez-vous au comptoir
              d&apos;immigration en partant.</strong> C&apos;est cette démarche volontaire qui vous
              place dans le premier tableau et non dans le second. Prévoyez le montant en espèces.
            </p>
          </div>
          <div className="bg-amber-500/5 border border-amber-500/30 rounded-2xl p-5">
            <p className="text-amber-400 font-bold text-sm mb-2">Quatre</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              <strong className="text-white">Si votre dépassement excède 90 jours</strong>, ou
              s&apos;il s&apos;accompagne d&apos;autres complications — passeport perdu, procédure en
              cours, situation familiale ou professionnelle particulière —, la lecture d&apos;un
              tableau ne suffit plus. Consultez un avocat spécialisé en droit de l&apos;immigration
              thaïlandais avant de faire quoi que ce soit. Ce n&apos;est pas mon métier et je ne vais
              pas prétendre le contraire.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">
          Le point qu&apos;il faut connaître avant d&apos;espérer
        </h3>
        <p className="mb-4">
          <strong className="text-white">Le Visa DTV ne se demande pas depuis la Thaïlande.</strong>{' '}
          Il se dépose auprès d&apos;une ambassade ou d&apos;un consulat de Thaïlande à
          l&apos;étranger, via le système e-Visa. Il n&apos;existe aucune conversion sur place.
        </p>
        <p>
          Autrement dit, un dépassement en cours doit être régularisé — donc soldé au départ du
          territoire — avant même qu&apos;une demande de DTV puisse être envisagée. L&apos;ordre est
          celui-là et il n&apos;est pas négociable. Le fonctionnement du dépôt consulaire est détaillé
          dans{' '}
          <Link href="/blog/guide-depot-dossier-evisa-dtv" className="text-sky-400 hover:underline font-medium">
            mon guide du dépôt de dossier e-Visa
          </Link>
          .
        </p>
      </section>

      {/* ── SECTION 5 ── */}
      <section className="mb-12">
        <h2 id="vous-y-pensez" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          5. Vous n&apos;êtes pas en overstay — mais vous y pensez
        </h2>
        <p className="mb-4">
          C&apos;est à vous que cet article s&apos;adresse en réalité. Parce que vous êtes plus
          nombreux, et parce que vous avez encore toutes vos options.
        </p>
        <p className="mb-4">
          Vous êtes sur votre deuxième ou troisième entrée en exemption. Vous avez encore trois
          semaines de tampon. Vous vous demandez si vous ne pourriez pas rester quelques jours de
          plus, puisque l&apos;amende est « seulement » de 500 THB par jour et que le vol est plus
          cher le week-end suivant.
        </p>
        <p className="mb-6">
          Le raisonnement se tient arithmétiquement. Il ne tient plus du tout dans le contexte de
          2026, pour une raison que les tableaux ne montrent pas : le dépassement volontaire vous fait
          basculer de la catégorie « touriste distrait » à la catégorie{' '}
          <strong className="text-white">« profil à surveiller »</strong>. Or c&apos;est exactement le
          critère qui a produit 29 490 refoulements en cinq mois. Vous n&apos;échangez pas quelques
          jours contre 2 500 THB. Vous échangez quelques jours contre une ligne dans votre historique,
          au moment précis de l&apos;histoire où cet historique est devenu la chose que l&apos;on
          regarde.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">
          Le calcul que presque personne ne fait
        </h3>
        <p className="mb-4">
          Faites-le avec moi, grossièrement. Un visa run, tout compris — vol ou transport terrestre,
          nuit d&apos;hôtel, frais éventuels, journée perdue — revient rarement à moins de{' '}
          <strong className="text-white">200 à 250 €</strong> quand on cesse de se mentir. Quatre à
          cinq par an. Sur cinq ans, vous êtes entre{' '}
          <strong className="text-white">4 000 et 6 000 €</strong>, sans la moindre garantie
          d&apos;être laissé entrer la fois suivante, et sans jamais avoir eu autre chose qu&apos;un
          tampon de deux mois.
        </p>
        <p className="mb-6">
          Un DTV coûte moins que cela sur la même durée, et il vous donne 180 jours par entrée,
          renouvelables, pendant cinq ans. J&apos;ai documenté ce calcul en détail à partir d&apos;un
          cas réel, chiffres à l&apos;appui :{' '}
          <LienArticle slug="cas-client-visa-dtv-soft-power-vientiane" className="text-sky-400 hover:underline font-medium">
            un client qui avait dépensé près de 5 000 € en 21 mois de visa runs
          </LienArticle>{' '}
          avant de découvrir qu&apos;il était éligible depuis le début.
        </p>
        <p className="mb-6">
          Et si vous hésitez encore sur le type de visa qui correspond à votre situation,{' '}
          <Link href="/blog/comparatif-visas-thailande" className="text-sky-400 hover:underline font-medium">
            le comparatif des visas long séjour
          </Link>{' '}
          remet les options côte à côte.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">
          On vous dira peut-être que vous n&apos;êtes pas éligible. Faites vérifier.
        </h3>
        <p className="mb-4">
          Après l&apos;avertissement de l&apos;officier, j&apos;ai fait ce que tout le monde fait : je
          suis allé chercher un professionnel. J&apos;ai consulté deux avocats, à plusieurs mois
          d&apos;intervalle.
        </p>
        <p className="mb-4">
          Le premier m&apos;a expliqué que le DTV était{' '}
          <strong className="text-white">trop compliqué à obtenir</strong>, qu&apos;il y avait
          beaucoup de refus, et m&apos;a globalement découragé.
        </p>
        <p className="mb-4">
          Le second m&apos;a dit que je n&apos;étais{' '}
          <strong className="text-white">pas éligible</strong> : mon entreprise était trop jeune et
          mes revenus pas assez significatifs. Il me proposait tout de même de s&apos;occuper de mon
          dossier pour <strong className="text-white">1 200 €</strong>. Je lui ai parlé de ce dont
          j&apos;avais entendu vaguement parler — la possibilité d&apos;obtenir le DTV via des cours de
          cuisine ou de Muay Thaï. À l&apos;époque je n&apos;avais même pas le vocabulaire, je ne
          connaissais pas le terme « Soft Power ». Il m&apos;a répondu que je confondais avec le visa
          étudiant, six mois ou un an maximum, et que ce que je décrivais n&apos;existait pas.
        </p>
        <p className="mb-6">
          Cette voie existait depuis <strong className="text-white">2024</strong>. Elle figurait dans
          les textes officiels du DTV depuis sa création.
        </p>
        <p className="mb-6">
          J&apos;ai monté mon dossier moi-même, par la voie Soft Power, celle qui « n&apos;existait
          pas ». <strong className="text-white">Il a été accordé en quatre jours.</strong>
        </p>

        <div className="bg-sky-500/5 border border-sky-500/25 rounded-2xl p-6">
          <p className="text-white font-semibold mb-3">
            Ce que je veux que vous reteniez de cet épisode
          </p>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            Pas que les avocats sont incompétents — ce sont des juristes, et le droit de
            l&apos;immigration thaïlandais est vaste. Mais qu&apos;un professionnel qui ne suit pas ce
            visa au quotidien peut passer complètement à côté de la voie qui vous concerne. Deux
            personnes m&apos;ont dit non. La bonne réponse tenait dans un dispositif qu&apos;aucune
            des deux n&apos;avait identifié.
          </p>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            Et surtout : la difficulté du DTV n&apos;est presque jamais dans le remplissage du
            formulaire. Elle est dans le{' '}
            <strong className="text-white">diagnostic</strong> — déterminer laquelle des voies
            d&apos;éligibilité s&apos;applique à votre situation réelle. Mon dossier est passé en
            quatre jours parce que j&apos;avais passé des mois à comprendre laquelle était la mienne,
            et parce que je l&apos;ai construite dans le bon ordre. Ce sont ces mois-là qui font la
            différence, pas les quatre jours.
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            C&apos;est devenu mon métier pour cette raison précise. Si l&apos;on vous a dit que vous
            n&apos;étiez pas éligible, demandez un deuxième avis avant de renoncer et de repartir pour
            cinq ans de frontières. Il y a{' '}
            <Link href="/blog/visa-dtv-soft-power-ecoles" className="text-sky-400 hover:underline font-medium">
              plusieurs voies d&apos;accès au DTV
            </Link>
            , et la vôtre n&apos;est pas forcément celle à laquelle vous pensez.
          </p>
        </div>
      </section>

      {/* ── SECTION 6 ── */}
      <section className="mb-12">
        <h2 id="ce-que-change-dtv" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          6. Ce que change réellement un DTV — et ce qu&apos;il ne change pas
        </h2>
        <p className="mb-6">
          Je vais être précis, parce que c&apos;est le genre de sujet où l&apos;on a envie d&apos;en
          promettre trop.
        </p>

        <figure className="my-8">
          <Image
            src="/images/blog/overstay-dtv-fin-du-comptage.jpg"
            alt="Calendrier refermé et poussé de côté sur un bureau, symbole de la fin du comptage des jours"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Le bénéfice le plus sous-estimé du DTV ne se chiffre pas : le calendrier retourne dans le
            tiroir.
          </figcaption>
        </figure>

        <div className="bg-emerald-500/5 border border-emerald-500/25 rounded-2xl p-6 mb-6">
          <p className="text-white font-semibold mb-3">Ce que le DTV supprime</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Le comptage. Vous entrez, vous obtenez 180 jours, vous vivez. Vous pouvez demander une{' '}
            <LienArticle slug="extension-180-jours-visa-dtv-thailande" className="text-sky-400 hover:underline font-medium">
              extension de 180 jours supplémentaires
            </LienArticle>{' '}
            sur place. Vous sortez quand vous voulez et vous rentrez sur le même visa pendant cinq ans. Le calendrier et le passeport côte à côte sur
            la table, c&apos;est terminé. C&apos;est le bénéfice dont je parlais en introduction, et
            je maintiens que c&apos;est le plus sous-estimé de tous.
          </p>
        </div>

        <div className="bg-amber-500/5 border border-amber-500/30 rounded-2xl p-6">
          <p className="text-white font-semibold mb-3">Ce que le DTV ne supprime pas</p>
          <ul className="space-y-2 text-sm text-gray-300 leading-relaxed">
            <li>
              → Il ne vous dispense pas du{' '}
              <LienArticle slug="tm47-rapport-90-jours-thailande" className="text-sky-400 hover:underline font-medium">
                rapport de 90 jours (TM47)
              </LienArticle>{' '}
              si vous restez sans sortir du pays.
            </li>
            <li>
              → Il ne vous dispense pas de la{' '}
              <Link href="/blog/arrivee-thailande-aeroport-immigration-taxi-visa-dtv" className="text-sky-400 hover:underline font-medium">
                déclaration TM30 par votre logeur
              </Link>
              .
            </li>
            <li>
              → Il ne vous rend pas invulnérable : un visa peut être annulé en cas d&apos;infraction.
            </li>
            <li>
              → Il ne vous exonère pas des{' '}
              <LienArticle slug="fiscalite-thailande-expatries-residence-fiscale" className="text-sky-400 hover:underline font-medium">
                règles de résidence fiscale
              </LienArticle>{' '}
              une fois les 180 jours de présence franchis dans l&apos;année civile.
            </li>
          </ul>
        </div>
      </section>

      {/* ── SECTION 7 ── */}
      <section className="mb-12">
        <h2 id="overstay-passe" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          7. Un dépassement passé empêche-t-il d&apos;obtenir un DTV ?
        </h2>
        <p className="mb-6">
          C&apos;est la question qu&apos;on me pose le plus dès que le mot overstay apparaît dans une
          conversation. Je vais y répondre avec un cas, et avec ses limites.
        </p>
        <p className="mb-4">
          Un client est venu me voir avec un dépassement d&apos;
          <strong className="text-white">une semaine</strong> dans son passeport. Il l&apos;avait
          réglé lui-même en partant, à l&apos;aéroport, quelques centaines de bahts. Il en avait fait
          une montagne pendant des mois, convaincu que ce tampon lui fermait définitivement la porte
          de la Thaïlande. Son DTV a été délivré sans que la question soit soulevée.
        </p>
        <p className="mb-6">
          Ce n&apos;est pas un miracle et je ne vais pas le présenter comme tel. C&apos;est simplement
          la lecture du premier tableau de la section 3 : sous 90 jours, régularisé volontairement au
          départ, aucune interdiction n&apos;est prononcée. Il n&apos;y avait aucun ban attaché à son
          nom. Il n&apos;y avait donc rien à contourner.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">
          Ce que ce cas ne prouve pas
        </h3>
        <p className="mb-4">
          Il ne prouve pas qu&apos;un dépassement n&apos;a aucune importance. Un cas ne fait pas une
          règle, et trois situations très différentes se cachent derrière le même mot :
        </p>
        <ul className="space-y-3 mb-6 pl-4 border-l-2 border-sky-500/40 text-gray-400 text-sm">
          <li>
            un <strong className="text-white">dépassement court, réglé au départ</strong> — pas
            d&apos;interdiction, mais une trace dans la base ;
          </li>
          <li>
            un <strong className="text-white">dépassement en cours</strong> — à régulariser
            impérativement avant toute démarche, voir la section 4 ;
          </li>
          <li>
            une <strong className="text-white">interdiction d&apos;entrée formelle</strong> — une
            inscription sur liste. Ce n&apos;est plus la même conversation, et elle se tient avec un
            avocat.
          </li>
        </ul>
        <p className="mb-4">
          Et il reste le facteur dont on a parlé au début : un dossier consulaire n&apos;est pas
          examiné dans le vide. Un historique chargé — dépassement passé, entrées répétées en
          exemption, tampons de frontière terrestre à répétition — demande d&apos;être présenté avec
          beaucoup plus de soin qu&apos;un dossier vierge.
        </p>
        <p className="mb-6">
          <strong className="text-white">Sur un point je ne transige pas : jamais de
          dissimulation.</strong> La base de données de l&apos;immigration voit tout, et toute
          tentative de cacher quoi que ce soit transforme un problème gérable en problème définitif.
          Mais un dossier construit dans le bon ordre, avec les bonnes pièces au bon endroit, ne se
          défend pas de la même façon qu&apos;un dossier envoyé au hasard. C&apos;est précisément la
          partie de mon travail que je ne détaille pas ici.
        </p>

        <div className="bg-sky-500/5 border border-sky-500/25 rounded-2xl p-6">
          <p className="text-white font-semibold mb-2">Un conseil qui vaut pour tout le monde</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Si vous avez un historique chargé, faites-vous accompagner{' '}
            <strong className="text-white">avant de déposer, pas après un refus.</strong> Un refus,
            lui, reste dans la base de données et ne s&apos;efface pas au bout de douze mois. C&apos;est
            l&apos;une des rares situations où l&apos;ordre dans lequel on fait les choses change
            réellement l&apos;issue.
          </p>
        </div>
      </section>

      {/* ── SECTION 8 ── */}
      <section className="mb-12">
        <h2 id="ce-que-je-retiens" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          8. Ce que je retiens de mes propres années à compter
        </h2>
        <p className="mb-6">
          Je ne vais pas jouer le donneur de leçons : j&apos;ai été exactement à la place du lecteur
          qui compte ses jours. Trois choses que j&apos;ai apprises et que je n&apos;avais lues nulle
          part.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mb-3">
          La sortie aérienne et la sortie terrestre ne se valent pas
        </h3>
        <p className="mb-6">
          Elles ne se valent plus du tout depuis le plafonnement des entrées terrestres en exemption à
          deux par année civile. Mes propres sorties étaient aériennes, ce qui m&apos;a évité un mur
          que beaucoup ont découvert au poste frontière.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mb-3">
          L&apos;accumulation compte plus que chaque entrée
        </h3>
        <p className="mb-6">
          On croit passer un examen à chaque retour. En réalité on construit un dossier, entrée après
          entrée, et c&apos;est ce dossier qui est jugé. La quatrième entrée n&apos;est pas évaluée
          comme la première.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mb-3">
          Le coût réel n&apos;est pas financier
        </h3>
        <p>
          Ce sont les décisions qu&apos;on ne prend pas. On ne signe pas le bail d&apos;un an. On ne
          prend pas l&apos;abonnement à la salle. On ne fait pas venir la famille en mai parce
          qu&apos;on ne sait pas où l&apos;on sera. C&apos;est ça, le prix du comptage, et aucun
          tableau comparatif ne le chiffre.
        </p>
      </section>

      {/* ── À RETENIR ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Ce qu&apos;il faut retenir</h2>
        <ul className="space-y-3 mb-6 pl-4 border-l-2 border-sky-500/40 text-gray-400 text-sm">
          <li><strong className="text-white">500 THB par jour, plafond à 20 000 THB.</strong> L&apos;amende cesse d&apos;augmenter au quarantième jour — mais c&apos;est alors l&apos;autre compteur qui démarre.</li>
          <li><strong className="text-white">90 jours ou moins, en se présentant soi-même : aucune interdiction.</strong> C&apos;est écrit dans l&apos;Ordonnance 1/2558, contrairement à ce que répètent beaucoup de pages.</li>
          <li><strong className="text-white">Être contrôlé plutôt que se déclarer coûte cinq ans.</strong> À durée de dépassement identique. C&apos;est le seul chiffre qui compte vraiment.</li>
          <li><strong className="text-white">Aucune interdiction ne signifie pas aucune trace.</strong> Tout dépassement est enregistré et visible à chaque entrée future.</li>
          <li><strong className="text-white">Le DTV ne se demande pas depuis la Thaïlande.</strong> Un dépassement en cours doit être soldé au départ avant toute démarche.</li>
          <li><strong className="text-white">L&apos;examen ne porte plus sur votre tampon mais sur votre trajectoire.</strong> On peut vous arrêter au guichet sans que vous soyez en faute.</li>
          <li><strong className="text-white">Si l&apos;on vous a dit que vous n&apos;étiez pas éligible, demandez un deuxième avis.</strong> Deux avocats me l&apos;ont dit avant que j&apos;obtienne le mien en quatre jours par une voie qu&apos;ils ignoraient.</li>
          <li><strong className="text-white">Le vrai bénéfice du DTV n&apos;est pas dans les tableaux.</strong> C&apos;est de ne plus avoir à compter.</li>
        </ul>
      </section>

      {/* ── ENCART AUTEUR ── */}
      <div className="my-14 bg-[#111111] border border-gray-800 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-6 shadow-lg">
        <PhotoAuteur accent="sky" />
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-1">Matthieu Moretti</h3>
          <p className="text-sky-400 text-xs font-semibold mb-3 uppercase tracking-wider">
            Expertise terrain · Phuket
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Installé à Kathu, je monte des dossiers de Visa DTV à plein temps. Avant d&apos;obtenir le
            mien, j&apos;ai vécu la mécanique du séjour à durée limitée : les sorties vers Bali, la
            Malaisie, la France, le même calcul repris à chaque retour, et un avertissement d&apos;un
            officier d&apos;immigration qui m&apos;a servi de déclencheur. Les chiffres de cet article
            proviennent de l&apos;Ordonnance 1/2558 et des bilans publiés par le Bureau de
            l&apos;Immigration, dont les liens figurent ci-dessous. Je ne suis pas avocat : pour une
            situation de dépassement lourde ou une interdiction prononcée, adressez-vous à un
            professionnel du droit.
          </p>
        </div>
      </div>

      {/* ── SOURCES ── */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 mb-12">
        <p className="text-white font-bold text-sm mb-4">📚 Sources et ressources</p>
        <ul className="space-y-3">
          <li>
            <a
              href="https://www.samutprakanimmigration.go.th/warning-of-overstay-in-thailand/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 hover:underline text-sm transition-colors"
            >
              → Ordonnance 1/2558 du ministère de l&apos;Intérieur — barème des amendes et des
              interdictions (immigration thaïlandaise)
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
              → Ambassade Royale de Thaïlande en France — types de visas et documents requis
            </a>
          </li>
        </ul>
      </div>

      {/* ── FAQ ── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white mb-6">FAQ — Overstay en Thaïlande</h2>
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
          Arrêtez de compter vos jours
        </h3>
        <p className="text-gray-400 mb-8 text-sm md:text-base relative z-10">
          Cinq ans de séjour, 180 jours par entrée, renouvelables. Nous vérifions votre éligibilité au
          Visa DTV et montons l&apos;intégralité de votre dossier — y compris lorsque votre passeport
          a une histoire.
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

      <PartageArticle slug="overstay-thailande-amende-blacklist-visa-dtv" variant="fin" />

      <BlogNavigation variant="article-bottom" />
    </article>
  );
}
