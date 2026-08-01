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

const post = getBlogPost('assurance-sante-visa-dtv-thailande');
const articleSchema = createArticleSchema(post);
const breadcrumbSchema = createBreadcrumbSchema(post);

export const metadata = createArticleMetadata(post);

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Le Visa DTV impose-t-il une assurance santé ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. Aucune couverture n'est exigée pour l'obtention du DTV, contrairement au visa retraite O-A qui impose une assurance minimale avec justificatif. Cette absence d'obligation ne signifie pas que vous pouvez vous en passer.",
      },
    },
    {
      '@type': 'Question',
      name: 'Combien coûte une assurance santé expatrié en Thaïlande ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Entre 400 et 800 € par an pour une assurance locale avant 40 ans, 800 à 1 500 € pour une couverture régionale ASEAN, et 1 500 à 3 000 € pour une assurance mondiale. À titre d'exemple concret, une formule Essential sans franchise avec un plafond de 10 millions de THB revient à environ 1 215 € par an.",
      },
    },
    {
      '@type': 'Question',
      name: 'Ma mutuelle française me couvre-t-elle en Thaïlande ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Rarement au-delà de quelques semaines, et jamais à hauteur des coûts du secteur privé thaïlandais. La Sécurité sociale ne couvre que les urgences imprévues lors de séjours courts. Pour une installation, une assurance internationale est nécessaire.",
      },
    },
    {
      '@type': 'Question',
      name: "Suis-je couvert en cas d'accident de scooter en Thaïlande ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Pas automatiquement. De nombreux contrats limitent la couverture aux deux-roues de 125 cm³ ou moins et exigent un permis moto valide ainsi que le port du casque. Vérifiez ces clauses par écrit auprès de votre assureur avant de rouler.",
      },
    },
    {
      '@type': 'Question',
      name: 'Puis-je souscrire une fois arrivé en Thaïlande ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, mais avec un délai de carence pendant lequel certains soins ne sont pas couverts. Toute pathologie découverte durant cette période est généralement requalifiée en antécédent, donc exclue. Souscrire avant le départ évite cette période de vulnérabilité.",
      },
    },
    {
      '@type': 'Question',
      name: "Que faire en cas d'urgence sans assurance en Thaïlande ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Les hôpitaux publics — Vachira à Phuket, Siriraj à Bangkok — pratiquent des tarifs sans commune mesure avec le privé. Une réduction est parfois négociable dans le privé en cas de paiement comptant. Mais ces solutions se traitent après coup, dans de mauvaises conditions.",
      },
    },
  ],
};

export default function ArticleAssuranceSante() {
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
        <span className="inline-block rounded-full border border-rose-500/25 bg-rose-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-rose-400 mb-5">
          Santé · Vie pratique
        </span>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
          Santé et Visa DTV :{' '}
          <span className="text-rose-400">pourquoi vous ne devez surtout pas venir sans assurance</span>
        </h1>

        <p className="text-base text-gray-500 mt-6">
          Lecture : 12 min · Mis à jour : {post.date} · Par{' '}
          <strong className="text-gray-400">Matthieu Moretti</strong>
        </p>
        <PartageArticle slug="assurance-sante-visa-dtv-thailande" variant="entete" />
      </header>

      {/* ── INTRODUCTION ── */}
      <div className="text-lg text-gray-400 mb-12 space-y-5">
        <p>
          Il y a une phrase qui revient dans presque tous les guides sur le Visa DTV, et elle est
          exacte : <strong className="text-white">aucune assurance santé n&apos;est exigée pour
          l&apos;obtenir.</strong>
        </p>
        <p>
          Le dossier consulaire ne comporte aucune ligne à ce sujet. Contrairement au{' '}
          <Link href="/blog/comparatif-visas-thailande" className="text-rose-400 hover:underline font-medium">
            visa retraite O-A
          </Link>
          , qui impose une couverture minimale et un justificatif à fournir, le DTV n&apos;en demande
          rien. Vous pouvez déposer votre demande, obtenir vos cinq ans, atterrir à Phuket et vivre
          votre vie sans qu&apos;aucune administration ne vous pose la question.
        </p>
        <p className="text-white font-medium border-l-4 border-rose-500 pl-5 py-1">
          C&apos;est précisément ce qui en fait un piège. Parce que l&apos;absence d&apos;obligation
          administrative est interprétée par beaucoup comme une absence de nécessité — et parce que
          le raisonnement qui suit, « je suis jeune, en bonne santé, j&apos;économise 1 000 € par
          an », tient parfaitement jusqu&apos;au jour où il ne tient plus du tout.
        </p>
      </div>

      {/* ── SOMMAIRE ── */}
      <nav className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 mb-12 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Au programme de ce guide :</h2>
        <ul className="space-y-3">
          <li><a href="#cout-reel" className="text-rose-400 hover:text-rose-300 hover:underline transition-colors text-sm md:text-base">1. Ce qu&apos;une hospitalisation coûte réellement</a></li>
          <li><a href="#prive-public" className="text-rose-400 hover:text-rose-300 hover:underline transition-colors text-sm md:text-base">2. Phuket : le privé, le public, et qui décide</a></li>
          <li><a href="#piege-scooter" className="text-rose-400 hover:text-rose-300 hover:underline transition-colors text-sm md:text-base">3. Le piège du scooter, celui que personne ne vérifie</a></li>
          <li><a href="#familles-contrats" className="text-rose-400 hover:text-rose-300 hover:underline transition-colors text-sm md:text-base">4. Les quatre familles de contrats</a></li>
          <li><a href="#ce-que-je-paie" className="text-rose-400 hover:text-rose-300 hover:underline transition-colors text-sm md:text-base">5. Ce que je paie, concrètement</a></li>
          <li><a href="#points-verifier" className="text-rose-400 hover:text-rose-300 hover:underline transition-colors text-sm md:text-base">6. Les six points à vérifier avant de signer</a></li>
          <li><a href="#quand-souscrire" className="text-rose-400 hover:text-rose-300 hover:underline transition-colors text-sm md:text-base">7. Quand souscrire</a></li>
        </ul>
      </nav>

      {/* ── SECTION 1 ── */}
      <section className="mb-12">
        <h2 id="cout-reel" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          1. Ce qu&apos;une hospitalisation coûte réellement en Thaïlande
        </h2>
        <p className="mb-6">
          Commençons par les chiffres, parce que c&apos;est là que l&apos;abstraction s&apos;arrête.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-gray-800 mb-6">
          <table className="w-full min-w-[420px] text-sm">
            <thead>
              <tr className="bg-[#111111] border-b border-gray-800">
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Prestation (secteur privé)</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Coût constaté</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]"><td className="px-4 py-3">Consultation spécialiste</td><td className="px-4 py-3">80 à 120 €</td></tr>
              <tr className="border-b border-gray-800/60"><td className="px-4 py-3">IRM</td><td className="px-4 py-3">environ 400 €</td></tr>
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]"><td className="px-4 py-3">Journée d&apos;hospitalisation</td><td className="px-4 py-3">400 à 600 €</td></tr>
              <tr><td className="px-4 py-3">Chirurgie</td><td className="px-4 py-3 text-white font-semibold">15 000 à 50 000 €</td></tr>
            </tbody>
          </table>
        </div>

        <figure className="my-8">
          <Image
            src="/images/blog/assurance-sante-facture-hospitaliere.jpg"
            alt="Facture d'hospitalisation dans un hôpital privé thaïlandais — jusqu'à 42 000 € pour une fracture ouverte"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Trois jours et une fracture du bras : 350 000 THB. L&apos;hôpital soigne d&apos;abord,
            présente la facture ensuite.
          </figcaption>
        </figure>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">Deux cas documentés</h3>
        <p className="mb-4">
          <strong className="text-white">Fracture du bras, chirurgie et trois jours
          d&apos;hospitalisation au Bangkok Hospital de Phuket : 350 000 THB</strong>, soit environ
          9 000 €. Pour une fracture. Trois jours.
        </p>
        <p className="mb-6">
          <strong className="text-white">Fracture ouverte tibia-péroné après un accident de moto à
          Phuket</strong>, chirurgie d&apos;urgence et deux semaines d&apos;hospitalisation :{' '}
          <strong className="text-white">42 000 €</strong>. Ce ne sont pas des cas extrêmes, mais
          des accidents ordinaires — du type de ceux qui arrivent tous les jours sur les routes de
          l&apos;île.
        </p>

        <div className="bg-rose-500/5 border border-rose-500/25 rounded-2xl p-6">
          <p className="text-white font-semibold mb-2">Le pari asymétrique</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Une assurance correcte coûte, selon l&apos;âge et la formule, entre 450 et 2 500 € par
            an. Une seule hospitalisation lourde évitée représente donc{' '}
            <strong className="text-white">dix à trente années de primes</strong>. Vous risquez une
            somme connue et supportable contre une somme inconnue et potentiellement ruineuse.
          </p>
        </div>
      </section>

      {/* ── SECTION 2 ── */}
      <section className="mb-12">
        <h2 id="prive-public" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          2. Phuket : le privé, le public, et ce que personne ne vous dit
        </h2>
        <p className="mb-4">
          <strong className="text-white">Le secteur privé</strong> — Bangkok Hospital Phuket en tête.
          Standard international, urgences prises en charge en moins de trente minutes, personnel
          francophone disponible, équipements récents. Et des tarifs européens, parfois davantage.
        </p>
        <p className="mb-6">
          <strong className="text-white">Le secteur public</strong> — Vachira Hospital
          principalement. Coûts sans commune mesure, qualité correcte, mais délais d&apos;attente
          longs et personnel anglophone en nombre limité.
        </p>

        <figure className="my-8">
          <Image
            src="/images/blog/assurance-sante-urgences-hopital.jpg"
            alt="Entrée des urgences d'un hôpital privé à Phuket, où les ambulances conduisent en cas d'accident"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            En urgence vitale, ce n&apos;est pas vous qui choisissez l&apos;hôpital. L&apos;ambulance
            vous conduit au plus proche et au mieux équipé.
          </figcaption>
        </figure>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          Le détail qui décide à votre place
        </h3>
        <p className="mb-4">
          Voici ce qu&apos;on oublie de préciser :{' '}
          <strong className="text-white">en cas d&apos;urgence vitale, ce n&apos;est pas vous qui
          choisissez.</strong>
        </p>
        <p className="mb-4">
          Si vous êtes inconscient sur le bord d&apos;une route de{' '}
          <Link href="/blog/ou-vivre-thailande-2026-phuket-pattaya-bangkok-huahin" className="text-rose-400 hover:underline font-medium">
            Kathu ou de Chalong
          </Link>
          , l&apos;ambulance vous conduit à l&apos;établissement le plus proche et le mieux équipé. À
          Phuket, ce sera le plus souvent le privé.
        </p>
        <p>
          Et une fois admis, vous ne partez pas. L&apos;hôpital vous soigne, puis vous présente la
          facture. Sans assurance, la discussion se déplace alors du terrain médical au terrain
          financier. La décision d&apos;aller au public ou au privé, vous ne la prenez que pour les
          soins programmés — pour les urgences, elle est prise sans vous.
        </p>
      </section>

      {/* ── SECTION 3 ── */}
      <section className="mb-12">
        <h2 id="piege-scooter" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          3. ⚠️ Le piège du scooter, celui que presque personne ne vérifie
        </h2>
        <p className="mb-4">
          Si vous ne devez retenir qu&apos;une section de cet article, c&apos;est celle-ci.
        </p>
        <p className="mb-6">
          À Phuket, tout le monde roule. Scooter de location à la semaine, moto achetée à
          l&apos;année, trajets quotidiens entre Kathu, Patong et Phuket Town. C&apos;est le mode de
          déplacement normal, et c&apos;est aussi la première cause d&apos;accident chez les
          expatriés.
        </p>

        <figure className="my-8">
          <Image
            src="/images/blog/assurance-sante-scooter-phuket.jpg"
            alt="Scooter garé sur une route de Phuket — première cause d'accident chez les expatriés"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Au-delà de 125 cm³, de nombreux contrats ne couvrent plus rien. Vérifiez avant de rouler.
          </figcaption>
        </figure>

        <p className="mb-4">
          Or <strong className="text-white">la plupart des contrats d&apos;assurance santé et voyage
          excluent ou limitent fortement les accidents de deux-roues.</strong> Les conditions varient
          d&apos;un assureur à l&apos;autre, mais on retrouve régulièrement les mêmes clauses :
        </p>
        <ul className="space-y-3 mb-6 pl-4 border-l-2 border-amber-500/40 text-gray-400 text-sm">
          <li>
            <strong className="text-white">Une limite de cylindrée.</strong> De nombreux contrats
            plafonnent la couverture aux deux-roues de 125 cm³ ou moins. Au-delà, l&apos;accident
            n&apos;est pas pris en charge. Si vous roulez en 150, 300 ou 350 cm³ — courant chez les
            résidents — vérifiez impérativement ce point.
          </li>
          <li>
            <strong className="text-white">L&apos;obligation de détenir le permis
            correspondant.</strong> Conduire sans autorisation valide constitue une infraction, et la
            non-conformité qui contribue à l&apos;accident justifie la réduction ou le refus
            d&apos;indemnisation.
          </li>
          <li>
            <strong className="text-white">Le port du casque.</strong> Son absence est un motif
            d&apos;exclusion fréquent, et facile à établir pour l&apos;assureur.
          </li>
          <li>
            <strong className="text-white">L&apos;alcool.</strong> Un accident survenu sous influence
            entraîne un refus quasi systématique.
          </li>
        </ul>

        <p className="mb-6">
          L&apos;assurance du loueur et celle attachée à la vignette annuelle sont{' '}
          <strong className="text-white">très insuffisantes</strong> : la seconde plafonne les soins
          médicaux autour de 13 000 THB et ne couvre pas les dommages causés à autrui. Autrement dit,
          vous pouvez être parfaitement assuré en santé et{' '}
          <strong className="text-white">ne pas l&apos;être du tout</strong> pour le risque auquel
          vous vous exposez tous les jours.
        </p>

        <div className="border border-amber-500/30 bg-amber-500/5 rounded-2xl p-6 mb-6">
          <p className="text-white font-semibold mb-2">Ce qu&apos;il faut faire</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Ouvrez votre contrat et cherchez les mots « deux-roues », « motocycle », « cylindrée » et
            « permis ». Si vous roulez au-delà de 125 cm³, demandez{' '}
            <strong className="text-white">par écrit</strong> à votre assureur si vous êtes couvert,
            et faites ajouter l&apos;option si elle existe. Elle coûte généralement entre 100 et
            500 € par an — sans commune mesure avec les 42 000 € d&apos;une fracture ouverte.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">
          La confusion qui coûte le plus cher
        </h3>
        <p className="mb-4">
          Il faut distinguer deux contrats que beaucoup mélangent, et l&apos;un ne remplace jamais
          l&apos;autre.
        </p>
        <p className="mb-4">
          <strong className="text-white">L&apos;assurance du véhicule</strong> couvre la machine et
          les dommages causés aux tiers. Pour ma part, je roule en Forza 350 et je paie{' '}
          <strong className="text-white">5 200 THB par an en tous risques</strong> — environ 140 €.
          Le contrat rembourse intégralement le scooter à son prix d&apos;achat, 181 000 THB. C&apos;est
          une excellente couverture, et elle ne me soignera pas.
        </p>
        <p className="mb-4">
          <strong className="text-white">L&apos;assurance santé</strong> couvre votre corps. C&apos;est
          elle qui paiera le bloc opératoire, les plaques de titane et les deux semaines
          d&apos;hospitalisation.
        </p>
        <p>
          Dernier point, décisif : <strong className="text-white">je détiens le permis grosse
          cylindrée</strong>. Sans lui, mon assureur serait fondé à refuser la prise en charge
          d&apos;un accident sur cette machine, quel que soit le montant que je verse chaque année.
          Le permis n&apos;est pas une formalité administrative, c&apos;est une condition de validité
          de votre couverture.
        </p>
      </section>

      {/* ── SECTION 4 ── */}
      <section className="mb-12">
        <h2 id="familles-contrats" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          4. Les quatre familles de contrats
        </h2>
        <p className="mb-6">
          Il n&apos;existe pas de meilleure assurance dans l&apos;absolu. Il existe une adéquation
          entre un contrat et une situation.
        </p>

        <div className="space-y-4">
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-5">
            <p className="text-white font-semibold mb-1">L&apos;assurance locale thaïlandaise</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Couverture limitée à la Thaïlande, plafonds de 50 000 à 500 000 €, franchises souvent
              élevées. <strong className="text-white">400 à 800 € par an</strong> avant 40 ans.
              Problématique le jour où vous devez être soigné ailleurs — y compris lors d&apos;un
              visa run.
            </p>
          </div>
          <div className="bg-[#111111] border border-emerald-500/20 rounded-2xl p-5">
            <p className="text-white font-semibold mb-1">L&apos;assurance régionale ASEAN</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Couvre la Thaïlande et les pays voisins, plafonds de 500 000 à 1 M€.{' '}
              <strong className="text-white">800 à 1 500 € par an</strong> avant 40 ans. C&apos;est
              le format le plus adapté au titulaire de DTV, qui sort régulièrement du territoire.
            </p>
          </div>
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-5">
            <p className="text-white font-semibold mb-1">L&apos;assurance mondiale</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Couverture internationale, plafonds de 1 à 5 M€, dentaire et optique souvent inclus.{' '}
              <strong className="text-white">1 500 à 3 000 € par an</strong> avant 40 ans. Justifiée
              si vous rentrez fréquemment en Europe ou si vous avez des enfants.
            </p>
          </div>
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-5">
            <p className="text-white font-semibold mb-1">La Caisse des Français de l&apos;Étranger</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              La CFE maintient vos droits à la Sécurité sociale et valide vos trimestres de retraite,
              mais rembourse <strong className="text-white">sur la base des tarifs français</strong>,
              très inférieurs aux coûts thaïlandais du privé. Une complémentaire est indispensable,
              portant l&apos;ensemble à 1 500 à 3 000 € par an.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 5 ── */}
      <section className="mb-12">
        <h2 id="ce-que-je-paie" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          5. Ce que je paie, concrètement
        </h2>
        <p className="mb-6">
          Puisque les fourchettes restent abstraites, voici mes propres chiffres.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-gray-800 mb-6">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="bg-[#111111] border-b border-gray-800">
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Contrat</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Ce qu&apos;il couvre</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Coût</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]">
                <td className="px-4 py-4 font-semibold text-white">Moto, tous risques</td>
                <td className="px-4 py-4">Le Forza 350, remboursé 181 000 THB, plus les tiers</td>
                <td className="px-4 py-4 text-white font-semibold">5 200 THB/an<br /><span className="text-xs font-normal text-gray-500">~140 €</span></td>
              </tr>
              <tr>
                <td className="px-4 py-4 font-semibold text-white">Santé — formule Essential</td>
                <td className="px-4 py-4">Hospitalisation et chirurgie jusqu&apos;à 10 M THB/an, sans franchise</td>
                <td className="px-4 py-4 text-white font-semibold">44 609 THB/an<br /><span className="text-xs font-normal text-gray-500">~1 215 €</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mb-6">
          Soit environ <strong className="text-white">1 355 € par an</strong> pour être couvert sur
          les deux plans.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">
          Ce que couvre concrètement ce contrat
        </h3>
        <ul className="space-y-3 mb-6 pl-4 border-l-2 border-emerald-500/40 text-gray-400 text-sm">
          <li><strong className="text-white">Plafond annuel : 10 000 000 THB</strong> par personne, soit environ 270 000 €. À comparer aux 42 000 € de la fracture ouverte évoquée plus haut.</li>
          <li><strong className="text-white">Aucune franchise.</strong> Couverture dès le premier baht, sans avance de frais dans le réseau partenaire.</li>
          <li><strong className="text-white">Zone Europe, ASEAN et Inde hors Singapour.</strong> Hors zone, couverture maintenue jusqu&apos;à 1 637 500 THB pendant les 30 premiers jours de tout voyage.</li>
          <li><strong className="text-white">Chambre individuelle, soins intensifs, bloc, implants, imagerie, honoraires</strong> intégralement pris en charge.</li>
          <li><strong className="text-white">Cinq visites de médecine courante par an</strong> remboursées jusqu&apos;à 2 500 THB, plus des téléconsultations illimitées.</li>
          <li><strong className="text-white">Rapatriement, évacuation et assistance inclus</strong> à hauteur d&apos;un million de dollars — dans toutes les formules.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">
          Ce que cette formule ne couvre pas
        </h3>
        <p className="mb-4">
          C&apos;est la contrepartie du tarif, et il faut la connaître avant de signer.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-gray-800 mb-6">
          <table className="w-full min-w-[380px] text-sm">
            <thead>
              <tr className="bg-[#111111] border-b border-gray-800">
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Poste</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Formule d&apos;entrée</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]"><td className="px-4 py-3">Hospitalisation psychiatrique</td><td className="px-4 py-3">Aucune couverture</td></tr>
              <tr className="border-b border-gray-800/60"><td className="px-4 py-3">Complications de grossesse</td><td className="px-4 py-3">Aucune couverture</td></tr>
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]"><td className="px-4 py-3">Affections congénitales et héréditaires</td><td className="px-4 py-3">Aucune couverture</td></tr>
              <tr className="border-b border-gray-800/60"><td className="px-4 py-3">Soins palliatifs, rééducation</td><td className="px-4 py-3">Aucune couverture</td></tr>
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]"><td className="px-4 py-3">Greffe d&apos;organe</td><td className="px-4 py-3">Plafonnée à 491 250 THB</td></tr>
              <tr><td className="px-4 py-3">Dialyse rénale</td><td className="px-4 py-3">Plafonnée à 163 750 THB</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mb-6">
          Les formules supérieures lèvent tout ou partie de ces limites, avec des plafonds globaux
          portés à 32,75 puis 65,5 millions de THB.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">
          Le levier de la franchise, chiffré
        </h3>
        <p className="mb-4">
          C&apos;est l&apos;arbitrage le plus mal compris. Voici ce que la franchise change réellement
          sur ce même contrat :
        </p>
        <div className="overflow-x-auto rounded-2xl border border-gray-800 mb-6">
          <table className="w-full min-w-[420px] text-sm">
            <thead>
              <tr className="bg-[#111111] border-b border-gray-800">
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Franchise annuelle</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Prime annuelle</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Économie</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]"><td className="px-4 py-3 text-white font-semibold">Aucune</td><td className="px-4 py-3">44 609 THB</td><td className="px-4 py-3">—</td></tr>
              <tr className="border-b border-gray-800/60"><td className="px-4 py-3">16 375 THB</td><td className="px-4 py-3">37 920 THB</td><td className="px-4 py-3">~182 €</td></tr>
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]"><td className="px-4 py-3">32 750 THB</td><td className="px-4 py-3">33 458 THB</td><td className="px-4 py-3">~303 €</td></tr>
              <tr><td className="px-4 py-3">81 875 THB</td><td className="px-4 py-3">28 984 THB</td><td className="px-4 py-3">~425 €</td></tr>
            </tbody>
          </table>
        </div>
        <div className="border border-rose-500/30 bg-rose-500/5 rounded-2xl p-5 mb-6">
          <p className="text-sm text-gray-300 leading-relaxed">
            Prenez la ligne du bas. Vous économisez 425 € par an, et vous acceptez de payer
            81 875 THB — environ 2 230 € — à chaque sinistre.{' '}
            <strong className="text-white">Cette option devient perdante dès que vous êtes
            hospitalisé une fois tous les cinq ans.</strong> Sur une île où le scooter est le mode de
            déplacement quotidien, c&apos;est un pari que je n&apos;ai pas voulu prendre.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">
          Pourquoi je n&apos;ai ni dentaire ni optique
        </h3>
        <p className="mb-4">
          Le module dentaire et optique n&apos;est disponible qu&apos;à partir de la formule
          supérieure, et uniquement en y ajoutant un module de médecine courante. Le prendre
          supposait donc de changer de niveau de contrat, pas seulement de cocher une case.
        </p>
        <p className="mb-4">
          L&apos;arbitrage mérite d&apos;être posé, parce qu&apos;il va à l&apos;encontre de ce que
          recommandent la plupart des comparatifs. Les plafonds dentaires sont de l&apos;ordre de{' '}
          <strong className="text-white">22 925 THB</strong> pour les soins courants et{' '}
          <strong className="text-white">49 125 THB</strong> pour les soins lourds, l&apos;optique
          autour de <strong className="text-white">9 825 THB</strong> — des montants modestes, sur
          des soins qui comptent parmi les moins chers de Thaïlande.
        </p>
        <p>
          <strong className="text-white">La logique de l&apos;assurance est de couvrir ce qu&apos;on
          ne peut pas payer, pas ce qu&apos;on peut payer.</strong> Un détartrage ou une paire de
          lunettes relèvent de la seconde catégorie ici. Une chirurgie d&apos;urgence relève de la
          première. C&apos;est ce qui permet de rester à 1 215 € par an plutôt qu&apos;au double.
        </p>
      </section>

      {/* ── SECTION 6 ── */}
      <section className="mb-12">
        <h2 id="points-verifier" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          6. Les six points à vérifier avant de signer
        </h2>
        <p className="mb-6">
          Le prix affiché ne veut rien dire tant que vous n&apos;avez pas contrôlé ces éléments.
        </p>

        <figure className="my-8">
          <Image
            src="/images/blog/assurance-sante-contrat-exclusions.jpg"
            alt="Conditions générales d'un contrat d'assurance santé expatrié — les exclusions à vérifier avant de signer"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Le prix affiché ne veut rien dire tant que vous n&apos;avez pas lu les exclusions.
          </figcaption>
        </figure>

        <ul className="space-y-4 mb-6 pl-4 border-l-2 border-gray-800 text-gray-400 text-sm">
          <li>
            <strong className="text-white">Le rapatriement sanitaire.</strong> Un rapatriement
            médicalisé vers la France coûte de l&apos;ordre de 35 000 €. Certains assureurs
            l&apos;intègrent d&apos;office dans toutes leurs formules, d&apos;autres en font une
            option payante. Vérifiez sur quel modèle vous êtes.
          </li>
          <li>
            <strong className="text-white">Le délai de carence.</strong> Période initiale pendant
            laquelle certains soins ne sont pas couverts. Toute pathologie découverte durant cette
            période est généralement requalifiée en antécédent, donc exclue.
          </li>
          <li>
            <strong className="text-white">Les antécédents médicaux.</strong> Ne dissimulez rien au
            questionnaire. Une fausse déclaration entraîne la nullité du contrat au moment précis où
            vous en avez besoin. Déclarer votre hypertension augmentera votre prime ; la taire peut
            vous coûter la totalité de la facture.
          </li>
          <li>
            <strong className="text-white">Le montant de la franchise.</strong> Voir le calcul
            détaillé plus haut : l&apos;économie annuelle est réelle, le risque aussi.
          </li>
          <li>
            <strong className="text-white">Les deux-roues.</strong> Voir la section 3. C&apos;est le
            point le plus souvent négligé et le plus coûteux.
          </li>
          <li>
            <strong className="text-white">Les zones et réseaux exclus.</strong> Certains contrats
            appliquent un ticket modérateur dans une liste d&apos;établissements, ou excluent
            certaines provinces. Vérifiez si vos déplacements vous y conduisent.
          </li>
        </ul>
      </section>

      {/* ── SECTION 7 ── */}
      <section className="mb-12">
        <h2 id="quand-souscrire" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          7. Quand souscrire
        </h2>
        <p className="mb-4">
          <strong className="text-white">Avant le départ, sans exception.</strong> Trois raisons, dans
          l&apos;ordre d&apos;importance.
        </p>
        <p className="mb-4">
          Le <strong className="text-white">délai de carence</strong> court à partir de la
          souscription. Souscrire trois mois avant votre installation, c&apos;est{' '}
          <Link href="/blog/arrivee-thailande-aeroport-immigration-taxi-visa-dtv" className="text-rose-400 hover:underline font-medium">
            arriver couvert
          </Link>
          .
        </p>
        <p className="mb-4">
          Les <strong className="text-white">antécédents</strong> se figent à la date de souscription.
          Toute pathologie découverte après votre arrivée mais avant la fin de la carence sera traitée
          comme préexistante.
        </p>
        <p>
          Enfin, <strong className="text-white">les primes augmentent avec l&apos;âge</strong>, et
          souscrire tôt stabilise votre tarif dans la durée. L&apos;écart entre une souscription à
          35 ans et à 55 ans se compte en milliers d&apos;euros sur la vie du contrat.
        </p>
      </section>

      {/* ── À RETENIR ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Ce qu&apos;il faut retenir</h2>
        <ul className="space-y-3 mb-6 pl-4 border-l-2 border-rose-500/40 text-gray-400 text-sm">
          <li><strong className="text-white">Le DTV n&apos;exige aucune assurance.</strong> C&apos;est un vide administratif, pas une autorisation de s&apos;en passer.</li>
          <li><strong className="text-white">Une fracture coûte 9 000 €, une fracture ouverte 42 000 €.</strong> Une assurance coûte 450 à 2 500 € par an.</li>
          <li><strong className="text-white">En urgence, vous n&apos;aurez pas le choix de l&apos;hôpital.</strong> L&apos;ambulance décide, et à Phuket elle vous conduit au privé.</li>
          <li><strong className="text-white">Le scooter est votre principal risque et votre principale exclusion.</strong> Vérifiez la cylindrée, le permis et le casque.</li>
          <li><strong className="text-white">Souscrivez avant de partir.</strong> Le délai de carence et la date de figement des antécédents ne se rattrapent pas.</li>
        </ul>
        <p>
          Et si votre installation se prolonge au-delà de six mois, pensez à anticiper l&apos;autre
          sujet que personne n&apos;aborde :{' '}
          <LienArticle slug="fiscalite-thailande-expatries-residence-fiscale" className="text-rose-400 hover:underline font-medium">
            la résidence fiscale au-delà de 180 jours
          </LienArticle>
          .
        </p>
      </section>

      {/* ── ENCART AUTEUR ── */}
      <div className="my-14 bg-[#111111] border border-gray-800 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-6 shadow-lg">
        <div className="w-24 h-24 rounded-full bg-gray-800 flex-shrink-0 overflow-hidden border-2 border-rose-500/50">
          <div className="w-full h-full bg-gradient-to-br from-rose-500/20 to-amber-500/20 flex items-center justify-center text-3xl">🏍️</div>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-1">Matthieu Moretti</h3>
          <p className="text-rose-400 text-xs font-semibold mb-3 uppercase tracking-wider">Expertise terrain · Phuket</p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Installé à Kathu, je roule quotidiennement sur les routes de l&apos;île. Les chiffres de
            cet article sont ceux de mes propres contrats, devis à l&apos;appui. Je ne vends pas
            d&apos;assurance et je ne perçois aucune commission sur les contrats cités : mon métier
            est le montage de dossiers de visa, et ce guide existe parce que la question revient à
            chaque accompagnement.
          </p>
        </div>
      </div>

      {/* ── SOURCES ── */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 mb-12">
        <p className="text-white font-bold text-sm mb-4">📚 Sources et ressources</p>
        <ul className="space-y-3">
          <li>
            <a href="https://th.diplomatie.gouv.fr/fr/social" target="_blank" rel="noopener noreferrer" className="text-rose-400 hover:text-rose-300 hover:underline text-sm transition-colors">
              → Ambassade de France en Thaïlande — rubrique Social et Santé
            </a>
          </li>
          <li>
            <a href="https://www.cfe.fr" target="_blank" rel="noopener noreferrer" className="text-rose-400 hover:text-rose-300 hover:underline text-sm transition-colors">
              → Caisse des Français de l&apos;Étranger
            </a>
          </li>
          <li>
            <a href="https://www.moph.go.th/eng/" target="_blank" rel="noopener noreferrer" className="text-rose-400 hover:text-rose-300 hover:underline text-sm transition-colors">
              → Ministère de la Santé publique thaïlandais
            </a>
          </li>
        </ul>
      </div>

      {/* ── FAQ ── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white mb-6">FAQ — Assurance santé en Thaïlande</h2>
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
        <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500 opacity-10 rounded-full blur-3xl" />
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 relative z-10">
          Préparez votre installation, pas seulement votre visa
        </h3>
        <p className="text-gray-400 mb-8 text-sm md:text-base relative z-10">
          Assurance, logement, permis, formalités d&apos;arrivée : le visa n&apos;est que la première
          étape. Nous montons votre dossier DTV et vous orientons sur tout ce qui vient après.
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

      <PartageArticle slug="assurance-sante-visa-dtv-thailande" variant="fin" />

      <BlogNavigation variant="article-bottom" />
    </article>
  );
}
