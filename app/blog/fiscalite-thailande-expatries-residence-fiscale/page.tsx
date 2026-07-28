import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import BlogNavigation from '../../components/BlogNavigation';
import {
  createArticleMetadata,
  createArticleSchema,
  createBreadcrumbSchema,
  getBlogPost,
} from '../posts';

export const revalidate = 600;

const post = getBlogPost('fiscalite-thailande-expatries-residence-fiscale');
const articleSchema = createArticleSchema(post);
const breadcrumbSchema = createBreadcrumbSchema(post);

export const metadata = createArticleMetadata(post);

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Est-ce que je deviens imposable en Thaïlande dès que j'ai mon Visa DTV ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. Le visa n'a aucun effet fiscal. Seule la présence effective de 180 jours ou plus sur une année civile déclenche la résidence fiscale thaïlandaise.",
      },
    },
    {
      '@type': 'Question',
      name: 'Les 180 jours doivent-ils être consécutifs ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. L'administration additionne tous les jours de présence sur l'année civile, quel que soit le nombre de séjours.",
      },
    },
    {
      '@type': 'Question',
      name: 'Je suis retraité français, dois-je payer des impôts en Thaïlande sur ma pension ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non, si votre pension est imposée en France. Le communiqué de l'ambassade de France du 19 février 2026 confirme que ces revenus sont exonérés en Thaïlande en application de la convention bilatérale, et dispensés de déclaration. Vous devez en revanche pouvoir justifier de l'imposition française sur demande, avec des documents traduits en thaï.",
      },
    },
    {
      '@type': 'Question',
      name: 'Dois-je déclarer mes revenus en Thaïlande si je ne rapatrie rien ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Les revenus étrangers non rapatriés ne sont pas dans le champ de l'impôt thaïlandais. L'obligation de déposer une déclaration se déclenche si vos revenus taxables en Thaïlande dépassent un seuil légal.",
      },
    },
    {
      '@type': 'Question',
      name: "L'épargne que j'avais avant 2024 est-elle concernée ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. L'ordre Por. 162/2566 exonère les revenus perçus avant le 1er janvier 2024, même rapatriés aujourd'hui. Il faut pouvoir en documenter l'antériorité.",
      },
    },
    {
      '@type': 'Question',
      name: "La loi qui exonère les revenus rapatriés dans les deux ans, c'est pour quand ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Elle n'est pas adoptée. Le projet est suspendu depuis la dissolution du Parlement et les élections de février 2026. Les règles en vigueur restent celles de 2024.",
      },
    },
  ],
};

export default function ArticleFiscaliteThailande() {
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
        <span className="inline-block rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-5">
          Fiscalité · Expatriation
        </span>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
          Fiscalité en Thaïlande :{' '}
          <span className="text-emerald-400">ce qui se passe vraiment après 180 jours</span>
        </h1>

        <p className="text-base text-gray-500 mt-6">
          Lecture : 14 min · Mis à jour : {post.date} · Par{' '}
          <strong className="text-gray-400">Matthieu Moretti</strong>
        </p>
      </header>

      {/* ── INTRODUCTION ── */}
      <div className="text-lg text-gray-400 mb-12 space-y-5">
        <p>
          C&apos;est la question que personne ne veut poser à son agence de visas, et à laquelle
          aucune ne répond volontiers :{' '}
          <strong className="text-white">
            à partir de quand devient-on imposable en Thaïlande, et sur quoi ?
          </strong>
        </p>
        <p>
          Depuis la réforme entrée en vigueur au 1er janvier 2024, les forums d&apos;expatriés
          tournent en boucle sur le sujet. On y lit tout et son contraire : que les retraités vont
          être taxés deux fois, que les freelances doivent déclarer chaque virement, qu&apos;une
          nouvelle loi va tout changer l&apos;an prochain. La plupart de ces affirmations sont
          fausses, périmées, ou vraies pour une situation et fausses pour une autre.
        </p>
        <p>
          Cet article fait le point sur l&apos;état du droit en 2026, en distinguant les trois
          situations qui n&apos;ont rien à voir entre elles : le retraité, l&apos;actif à distance,
          et le propriétaire de biens en France.
        </p>
        <div className="border-l-4 border-emerald-500 bg-emerald-500/5 rounded-r-xl p-5">
          <p className="text-sm text-gray-300 leading-relaxed">
            <strong className="text-white">Avertissement nécessaire :</strong> je ne suis ni
            fiscaliste ni avocat. Ce guide expose les règles publiques et les positions officielles
            des administrations concernées. Il ne remplace pas l&apos;analyse de votre situation par
            un professionnel — et vous verrez en le lisant pourquoi cette analyse est rarement
            superflue.
          </p>
        </div>
      </div>

      {/* ── SOMMAIRE ── */}
      <nav className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 mb-12 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Au programme de ce guide :</h2>
        <ul className="space-y-3">
          <li><a href="#regle-180-jours" className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors text-sm md:text-base">1. La règle de base : 180 jours, et rien d&apos;autre</a></li>
          <li><a href="#reforme-2024" className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors text-sm md:text-base">2. Ce que la réforme de 2024 a réellement changé</a></li>
          <li><a href="#reforme-suspendue" className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors text-sm md:text-base">3. La réforme annoncée qui n&apos;est jamais arrivée</a></li>
          <li><a href="#retraite" className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors text-sm md:text-base">4. Vous êtes retraité français</a></li>
          <li><a href="#freelance" className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors text-sm md:text-base">5. Vous êtes freelance ou télétravailleur</a></li>
          <li><a href="#proprietaire" className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors text-sm md:text-base">6. Vous avez des biens immobiliers en France</a></li>
          <li><a href="#dtv-statut" className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors text-sm md:text-base">7. Ce que le Visa DTV ne fait pas</a></li>
          <li><a href="#retenir" className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors text-sm md:text-base">8. Ce qu&apos;il faut retenir</a></li>
        </ul>
      </nav>

      {/* ── SECTION 1 ── */}
      <section className="mb-12">
        <h2 id="regle-180-jours" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          1. La règle de base : 180 jours, et rien d&apos;autre
        </h2>
        <p className="mb-4">
          Commençons par le seul point sur lequel il n&apos;existe aucune ambiguïté.
        </p>
        <p className="mb-6">
          <strong className="text-white">L&apos;article 41 du Code des impôts thaïlandais</strong>{' '}
          fixe un seuil unique : toute personne présente en Thaïlande{' '}
          <strong className="text-white">180 jours ou plus au cours d&apos;une année civile</strong>{' '}
          (du 1er janvier au 31 décembre) est résident fiscal thaïlandais.
        </p>

        <figure className="my-8">
          <Image
            src="/images/blog/fiscalite-thailande-180-jours-calendrier.jpg"
            alt="Décompte des 180 jours de présence en Thaïlande qui déclenchent la résidence fiscale"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Le compteur repart à zéro chaque 1er janvier. C&apos;est le seul chiffre qui détermine
            votre statut fiscal thaïlandais.
          </figcaption>
        </figure>

        <p className="mb-4">Trois précisions qui règlent 90 % des questions de forum :</p>
        <ul className="space-y-3 mb-6 pl-4 border-l-2 border-gray-800 text-gray-400 text-sm">
          <li>
            <strong className="text-white">Les jours n&apos;ont pas besoin d&apos;être
            consécutifs.</strong> Trois séjours de deux mois répartis dans l&apos;année vous amènent
            au même résultat qu&apos;un séjour continu de six mois. L&apos;administration additionne.
          </li>
          <li>
            <strong className="text-white">La nationalité n&apos;entre pas en jeu.</strong> Le
            système thaïlandais repose sur la résidence, pas sur la citoyenneté. Un Français, un
            Thaïlandais et un Américain présents 200 jours sont logés à la même enseigne.
          </li>
          <li>
            <strong className="text-white">Votre visa n&apos;y change rien.</strong> Un visa est une
            autorisation de séjour, pas un statut fiscal. Le DTV ne vous rend pas imposable, et il ne
            vous en protège pas non plus. Seul le décompte des jours compte.
          </li>
        </ul>

        <div className="border border-sky-500/30 bg-sky-500/5 rounded-2xl p-5">
          <p className="text-sm text-gray-300 leading-relaxed">
            <strong className="text-white">À retenir :</strong> le compteur se remet à zéro chaque
            1er janvier. Un séjour d&apos;octobre à mars ne représente que trois mois sur chaque
            année civile — et peut donc, selon les dates, ne déclencher la résidence fiscale sur
            aucune des deux. Attention toutefois à ne pas confondre ce décompte avec vos{' '}
            <Link href="/blog/tm47-rapport-90-jours-thailande" className="text-sky-400 hover:underline font-medium">
              obligations déclaratives de présence
            </Link>
            , qui suivent un calendrier totalement différent.
          </p>
        </div>
      </section>

      {/* ── SECTION 2 ── */}
      <section className="mb-12">
        <h2 id="reforme-2024" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          2. Ce que la réforme de 2024 a réellement changé
        </h2>
        <p className="mb-6">
          Voici le point qui a mis le feu aux forums, et qu&apos;il faut comprendre précisément.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          Avant 2024 : la faille de l&apos;année suivante
        </h3>
        <p className="mb-4">
          Historiquement, les revenus de source étrangère n&apos;étaient imposables en Thaïlande que
          s&apos;ils y étaient rapatriés <strong className="text-white">au cours de l&apos;année même
          où ils avaient été perçus</strong>. Il suffisait donc d&apos;attendre le 1er janvier pour
          transférer ses revenus de l&apos;année précédente en franchise d&apos;impôt. La règle était
          connue, légale, et massivement utilisée.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          Depuis le 1er janvier 2024 : la faille est fermée
        </h3>
        <p className="mb-4">
          L&apos;<strong className="text-white">ordre Por. 161/2566</strong> du Revenue Department a
          supprimé ce mécanisme. Désormais, un résident fiscal thaïlandais est imposable sur ses
          revenus de source étrangère{' '}
          <strong className="text-white">rapatriés en Thaïlande, quelle que soit l&apos;année où ils
          ont été perçus</strong>. Les taux appliqués sont ceux du barème progressif thaïlandais, de{' '}
          <strong className="text-white">5 % à 35 %</strong>.
        </p>

        <figure className="my-8">
          <Image
            src="/images/blog/fiscalite-thailande-virement-rapatrie.jpg"
            alt="Virement de revenus étrangers vers la Thaïlande — seul le montant rapatrié est imposable"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            La Thaïlande n&apos;impose pas le revenu mondial. Seules les sommes que vous faites
            entrer dans le pays sont dans le champ.
          </figcaption>
        </figure>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          La clause d&apos;antériorité que beaucoup ignorent
        </h3>
        <p className="mb-6">
          Un second texte, l&apos;<strong className="text-white">ordre Por. 162/2566</strong> publié
          en novembre 2023, a introduit une exception essentielle : les revenus{' '}
          <strong className="text-white">perçus avant le 1er janvier 2024</strong> restent exonérés,
          même s&apos;ils sont rapatriés aujourd&apos;hui. Concrètement, une épargne constituée
          jusqu&apos;au 31 décembre 2023 échappe au dispositif — à condition, évidemment, de pouvoir
          documenter l&apos;antériorité des sommes.
        </p>

        <div className="bg-emerald-500/5 border border-emerald-500/25 rounded-2xl p-6">
          <p className="text-white font-semibold mb-2">Deux mots qui font toute la différence</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Toute la réforme repose sur la notion de{' '}
            <strong className="text-white">revenu rapatrié</strong>. Ce n&apos;est pas votre revenu
            mondial qui est visé, mais les sommes que vous faites entrer en Thaïlande. Contrairement
            à ce qu&apos;on lit régulièrement, la Thaïlande n&apos;a pas adopté un système
            d&apos;imposition sur le revenu mondial. Un résident fiscal thaïlandais qui ne fait
            entrer aucun revenu étranger dans le pays n&apos;a, sur ces revenus, rien à déclarer
            localement.
          </p>
        </div>
      </section>

      {/* ── SECTION 3 ── */}
      <section className="mb-12">
        <h2 id="reforme-suspendue" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          3. La réforme annoncée qui n&apos;est jamais arrivée
        </h2>
        <p className="mb-4">
          Si vous avez lu quelque part qu&apos;une nouvelle règle allait assouplir tout cela,
          l&apos;information était exacte — mais elle n&apos;a pas abouti.
        </p>
        <p className="mb-4">
          En mai 2025, le Revenue Department a annoncé travailler sur un texte exonérant les revenus
          étrangers rapatriés <strong className="text-white">dans l&apos;année de leur perception ou
          l&apos;année suivante</strong>. L&apos;objectif affiché : faire revenir en Thaïlande une
          partie des quelque 2 000 milliards de bahts détenus à l&apos;étranger, que la réforme de
          2024 avait figés.
        </p>
        <p className="mb-6">
          <strong className="text-white">Il n&apos;a jamais été adopté.</strong> La dissolution de la
          Chambre des représentants a suspendu tous les textes en cours, et les élections générales
          du 8 février 2026 ont gelé le calendrier législatif. À ce jour, le dispositif reste à
          l&apos;état de projet.
        </p>

        <div className="border border-amber-500/30 bg-amber-500/5 rounded-2xl p-5">
          <p className="text-white font-semibold mb-2">⚠️ Ce qu&apos;il faut en faire</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Ne fondez aucune décision financière sur cette annonce. Les règles applicables restent
            celles de l&apos;ordre Por. 161/2566. Si le texte revient un jour à l&apos;ordre du jour,
            ce sera avec un nouveau gouvernement et peut-être sous une autre forme.
          </p>
        </div>
      </section>

      {/* ── SECTION 4 ── */}
      <section className="mb-12">
        <h2 id="retraite" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          4. Vous êtes retraité français
        </h2>
        <p className="mb-6">
          C&apos;est la situation la plus répandue, celle qui a suscité le plus d&apos;inquiétude, et
          paradoxalement celle qui est aujourd&apos;hui la plus claire.
        </p>

        <figure className="my-8">
          <Image
            src="/images/blog/fiscalite-thailande-retraite-pension.jpg"
            alt="Justificatifs de pension française à présenter à l'administration fiscale thaïlandaise"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Les retraites françaises sont exonérées en Thaïlande — à condition de pouvoir prouver
            leur imposition en France.
          </figcaption>
        </figure>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          Ce que dit la convention franco-thaïlandaise
        </h3>
        <p className="mb-4">
          La convention fiscale entre la France et la Thaïlande, signée en 1975, attribue le droit
          d&apos;imposer les pensions selon leur nature : l&apos;<strong className="text-white">article
          18</strong> pour les pensions privées, l&apos;<strong className="text-white">article
          19</strong> pour la fonction publique, l&apos;<strong className="text-white">article
          22</strong> pour les autres revenus dont les prestations sociales. Ces revenus, lorsqu&apos;ils
          sont imposables en France, le restent — et l&apos;<strong className="text-white">article
          23</strong> prévoit le mécanisme d&apos;élimination de la double imposition.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          Le communiqué officiel du 19 février 2026
        </h3>
        <p className="mb-4">
          C&apos;est l&apos;information que peu de sources francophones exploitent. Après de longs
          échanges entre administrations,{' '}
          <a
            href="https://th.diplomatie.gouv.fr/fr/reforme-fiscale-thailandaise-communique"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:underline font-medium"
          >
            l&apos;ambassade de France en Thaïlande a publié un communiqué
          </a>{' '}
          qui tranche la question. Le Revenue Department thaïlandais a confirmé aux autorités
          françaises que :
        </p>
        <ul className="space-y-3 mb-6 pl-4 border-l-2 border-emerald-500/40 text-gray-400 text-sm">
          <li>
            Les pensions publiques et privées imposées en France entrent dans le champ de
            l&apos;impôt thaïlandais, mais{' '}
            <strong className="text-white">en sont exonérées</strong> en application de
            l&apos;article 23, paragraphe 2 a) de la convention.
          </li>
          <li>
            Ces revenus sont <strong className="text-white">dispensés de déclaration</strong> et
            n&apos;ont pas à figurer dans la déclaration de revenus thaïlandaise.
          </li>
          <li>
            Ils <strong className="text-white">ne comptent pas dans le calcul du seuil</strong> de
            dépôt obligatoire de la déclaration thaïlandaise.
          </li>
        </ul>
        <p className="mb-6">
          Autrement dit : un retraité français dont la pension est imposée en France n&apos;a, sur
          cette pension, <strong className="text-white">rien à déclarer et rien à payer en
          Thaïlande</strong>.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          Les deux obligations qui subsistent
        </h3>
        <p className="mb-4">
          <strong className="text-white">Vous devez pouvoir prouver l&apos;imposition en
          France.</strong> L&apos;administration thaïlandaise peut vous le demander à tout moment. La
          preuve principale reconnue est l&apos;avis d&apos;imposition français — mais il n&apos;est
          disponible qu&apos;en été, après la fin de la campagne déclarative thaïlandaise. Dans
          l&apos;intervalle, le communiqué admet tout moyen de preuve, notamment les bulletins de
          pension mentionnant le prélèvement à la source.
        </p>
        <p className="mb-4">
          <strong className="text-white">Vos justificatifs doivent être traduits en thaï.</strong>{' '}
          Une traduction de courtoisie peut suffire, mais l&apos;administration est en droit
          d&apos;exiger une{' '}
          <Link href="/blog/visa-dtv-couple-famille-pacs" className="text-emerald-400 hover:underline font-medium">
            traduction certifiée
          </Link>
          . Anticipez : faire traduire un avis d&apos;imposition dans l&apos;urgence coûte plus cher.
        </p>
        <p>
          Enfin, cette exonération concerne les pensions. Si vous percevez par ailleurs des revenus
          d&apos;une autre nature — locatifs, mobiliers, activité — ils suivent leur propre régime,
          et l&apos;obligation de déclaration thaïlandaise peut se déclencher pour eux.
        </p>
      </section>

      {/* ── SECTION 5 ── */}
      <section className="mb-12">
        <h2 id="freelance" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          5. Vous êtes freelance ou télétravailleur
        </h2>
        <p className="mb-6">
          C&apos;est le cas du titulaire de{' '}
          <Link href="/blog/visa-dtv-freelance-auto-entrepreneur" className="text-emerald-400 hover:underline font-medium">
            DTV Workcation
          </Link>
          , et c&apos;est la situation la moins confortable — précisément parce qu&apos;elle est la
          moins documentée.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">Le mécanisme</h3>
        <p className="mb-4">
          Vous êtes freelance, développeur, consultant, e-commerçant. Vos clients sont européens ou
          américains, vos revenus arrivent sur un compte hors de Thaïlande. Vous vivez à Phuket ou
          Chiang Mai plus de 180 jours par an.
        </p>
        <p className="mb-6">
          Vous êtes résident fiscal thaïlandais. Et{' '}
          <strong className="text-white">chaque euro que vous faites entrer en Thaïlande</strong> —
          pour payer votre loyer, vos courses, votre scooter — constitue potentiellement un revenu
          étranger rapatrié, imposable au barème progressif. Contrairement au retraité, vous
          n&apos;avez pas de disposition conventionnelle qui vous protège automatiquement : un revenu
          d&apos;activité indépendante n&apos;a pas le même traitement qu&apos;une pension de source
          française.
        </p>

        <div className="bg-[#111111] border-l-4 border-amber-500 rounded-r-2xl p-6 mb-6">
          <p className="text-white font-bold mb-2">La question que personne ne tranche</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Votre activité est-elle exercée <em>en</em> Thaïlande, puisque vous y êtes physiquement,
            ou <em>depuis l&apos;étranger</em>, puisque vos clients et votre structure y sont ? De la
            réponse dépend la qualification de vos revenus, et donc leur traitement. Cette question
            n&apos;a pas de réponse générale : elle dépend de votre structure juridique, du pays de
            vos clients, de votre statut en France, de la durée de votre présence et de la convention
            applicable.
          </p>
        </div>

        <figure className="my-8">
          <Image
            src="/images/blog/fiscalite-thailande-consultation-expert.jpg"
            alt="Consultation d'un fiscaliste pour un freelance résident fiscal en Thaïlande"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            C&apos;est la situation pour laquelle aucune réponse générale n&apos;existe. C&apos;est
            aussi celle qui a le plus à gagner à consulter.
          </figcaption>
        </figure>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          Les trois questions à poser à un professionnel
        </h3>
        <ol className="space-y-3 mb-6 pl-4 border-l-2 border-gray-800 text-gray-400 text-sm">
          <li>
            <strong className="text-white">Ai-je conservé ma résidence fiscale française ?</strong>{' '}
            Le critère du foyer, du séjour principal, du centre des intérêts économiques — vous
            pouvez être considéré comme résident des deux pays, et c&apos;est alors la convention qui
            départage.
          </li>
          <li>
            <strong className="text-white">Comment mes revenus sont-ils qualifiés au regard de la
            convention ?</strong> Bénéfices d&apos;entreprise, professions indépendantes, revenus
            d&apos;emploi : les articles applicables diffèrent.
          </li>
          <li>
            <strong className="text-white">Quelles sont mes obligations déclaratives dans chaque
            pays, indépendamment de l&apos;impôt dû ?</strong> Déclarer et payer sont deux choses
            distinctes, et l&apos;omission de la première se sanctionne même quand la seconde est
            nulle.
          </li>
        </ol>

        <p>
          Un point pratique enfin. Depuis mai 2026,{' '}
          <Link href="/blog/paiement-thailande-sans-compte-bancaire-visa-dtv" className="text-emerald-400 hover:underline font-medium">
            Wise opère en Thaïlande sous licence de la Banque de Thaïlande
          </Link>
          . Chaque conversion vers le baht et chaque paiement PromptPay transite désormais par
          l&apos;infrastructure financière régulée thaïlandaise. Ce n&apos;est pas un problème en soi
          — c&apos;est même une bonne chose pour votre conformité. Mais vos flux sont documentés,
          datés et traçables. L&apos;époque où la question de la résidence fiscale restait théorique
          parce qu&apos;invérifiable est révolue.
        </p>
      </section>

      {/* ── SECTION 6 ── */}
      <section className="mb-12">
        <h2 id="proprietaire" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          6. Vous avez des biens immobiliers en France
        </h2>
        <p className="mb-4">
          Troisième situation : vous vivez en Thaïlande et vous conservez un ou plusieurs biens
          immobiliers en France, loués ou non.
        </p>
        <p className="mb-6">
          Les conventions fiscales attribuent classiquement l&apos;imposition des revenus immobiliers
          à <strong className="text-white">l&apos;État où le bien est situé</strong>. Vos loyers
          français restent donc imposables en France, quelle que soit votre résidence. Vous continuez
          à ce titre à déposer une déclaration française de revenus fonciers, en tant que
          non-résident si vous avez effectué les démarches correspondantes.
        </p>

        <div className="border border-amber-500/30 bg-amber-500/5 rounded-2xl p-6">
          <p className="text-white font-semibold mb-3">Là où ça se complique</p>
          <div className="text-sm text-gray-300 leading-relaxed space-y-3">
            <p>
              <strong className="text-white">Le rapatriement de ces loyers en Thaïlande.</strong> Le
              communiqué de février 2026 traite explicitement des pensions. Il ne traite pas des
              revenus fonciers. Le mécanisme d&apos;élimination de la double imposition de
              l&apos;article 23 s&apos;applique en principe aux revenus couverts par la convention,
              mais la pratique administrative thaïlandaise sur ce point est nettement moins
              documentée que pour les retraites.
            </p>
            <p>
              <strong className="text-white">Votre statut de résident fiscal français.</strong>{' '}
              Conserver un bien en France ne fait pas de vous un résident fiscal français, mais
              l&apos;occuper, y avoir votre famille ou y conserver le centre de vos intérêts
              économiques peut y contribuer. Là encore, le faisceau d&apos;indices prime.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 7 ── */}
      <section className="mb-12">
        <h2 id="dtv-statut" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          7. Ce que le Visa DTV ne fait pas
        </h2>
        <p className="mb-4">
          Un rappel qui mérite sa propre section, parce que la confusion est constante.
        </p>
        <ul className="space-y-3 mb-6 pl-4 border-l-2 border-gray-800 text-gray-400 text-sm">
          <li>
            <strong className="text-white">Le DTV n&apos;est pas un statut fiscal.</strong> Il
            autorise un séjour de 180 jours par entrée, renouvelable, sur cinq ans. Il ne dit rien de
            votre imposition.
          </li>
          <li>
            <strong className="text-white">Le DTV ne vous exonère de rien.</strong> Aucune
            disposition ne prévoit d&apos;avantage fiscal attaché à ce visa, contrairement au{' '}
            <Link href="/blog/comparatif-visas-thailande" className="text-emerald-400 hover:underline font-medium">
              LTR
            </Link>{' '}
            qui comporte, lui, des dispositions spécifiques pour certaines catégories de
            bénéficiaires.
          </li>
          <li>
            <strong className="text-white">Le DTV ne vous rend pas imposable non plus.</strong> Vous
            pouvez parfaitement détenir un DTV et rester sous les 180 jours, donc hors du champ de la
            résidence fiscale thaïlandaise.
          </li>
        </ul>
        <p>
          La seule interaction réelle entre les deux sujets tient à une coïncidence de calendrier :
          la durée de séjour autorisée par entrée, 180 jours, correspond exactement au seuil de
          résidence fiscale. Un titulaire de DTV qui consomme la totalité de son séjour et revient
          dans la même année civile bascule mécaniquement.
        </p>
      </section>

      {/* ── SECTION 8 ── */}
      <section className="mb-12">
        <h2 id="retenir" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          8. Ce qu&apos;il faut retenir
        </h2>
        <ul className="space-y-3 mb-6 pl-4 border-l-2 border-emerald-500/40 text-gray-400 text-sm">
          <li><strong className="text-white">Les 180 jours sont le seul déclencheur.</strong> Ni le visa, ni la nationalité, ni le lieu de vos clients n&apos;entrent en compte.</li>
          <li><strong className="text-white">Seuls les revenus rapatriés sont visés.</strong> La Thaïlande n&apos;impose pas le revenu mondial.</li>
          <li><strong className="text-white">Les retraités français sont protégés par la convention</strong> — mais doivent pouvoir le prouver, documents traduits à l&apos;appui.</li>
          <li><strong className="text-white">Les freelances sont dans la zone grise</strong>, et ce sont eux qui ont le plus à gagner à consulter.</li>
          <li><strong className="text-white">La réforme assouplissante n&apos;existe pas encore.</strong> Ne planifiez rien dessus.</li>
        </ul>
        <p>
          Et si vous n&apos;en êtes pas encore là, sachez que la question fiscale n&apos;intervient
          qu&apos;après l&apos;obtention du visa : le dossier consulaire, lui, se joue sur{' '}
          <Link href="/blog/fonds-bancaires-visa-dtv" className="text-emerald-400 hover:underline font-medium">
            la preuve financière des 500 000 THB
          </Link>
          , qui relève d&apos;une logique entièrement différente.
        </p>
      </section>

      {/* ── ENCART AUTEUR ── */}
      <div className="my-14 bg-[#111111] border border-gray-800 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-6 shadow-lg">
        <div className="w-24 h-24 rounded-full bg-gray-800 flex-shrink-0 overflow-hidden border-2 border-emerald-500/50">
          <div className="w-full h-full bg-gradient-to-br from-emerald-500/20 to-sky-500/20 flex items-center justify-center text-3xl">🇹🇭</div>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-1">Matthieu Moretti</h3>
          <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Veille réglementaire &amp; Expatriation</p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Installé à Phuket, je suis au quotidien l&apos;évolution des règles qui encadrent
            l&apos;expatriation en Thaïlande. Sur les sujets fiscaux, mon rôle s&apos;arrête à
            documenter précisément l&apos;état du droit et les positions officielles — l&apos;analyse
            de votre situation personnelle relève d&apos;un professionnel, et cet article vous donne
            les questions à lui poser.
          </p>
        </div>
      </div>

      {/* ── SOURCES ── */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 mb-12">
        <p className="text-white font-bold text-sm mb-4">📚 Sources officielles</p>
        <ul className="space-y-3">
          <li>
            <a href="https://th.diplomatie.gouv.fr/fr/reforme-fiscale-thailandaise-communique" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 hover:underline text-sm transition-colors">
              → Réforme fiscale thaïlandaise : communiqué de l&apos;ambassade de France (19 février 2026)
            </a>
          </li>
          <li>
            <a href="https://www.rd.go.th/english/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 hover:underline text-sm transition-colors">
              → The Revenue Department (administration fiscale thaïlandaise)
            </a>
          </li>
          <li>
            <a href="https://www.impots.gouv.fr/international-particulier/les-conventions-internationales" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 hover:underline text-sm transition-colors">
              → Les conventions fiscales internationales — impots.gouv.fr
            </a>
          </li>
          <li>
            <a href="https://www.impots.gouv.fr/particulier/questions/je-suis-non-resident-quelle-est-ma-situation-fiscale" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 hover:underline text-sm transition-colors">
              → Je suis non-résident : quelle est ma situation fiscale ? — impots.gouv.fr
            </a>
          </li>
        </ul>
      </div>

      {/* ── FAQ VISUELLE ── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white mb-6">FAQ — Fiscalité et résidence fiscale</h2>
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
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500 opacity-10 rounded-full blur-3xl" />
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 relative z-10">
          Sécurisez d&apos;abord votre visa
        </h3>
        <p className="text-gray-400 mb-8 text-sm md:text-base relative z-10">
          La question fiscale se pose une fois installé. Avant cela, il faut un dossier consulaire
          irréprochable. Nous montons votre demande de Visa DTV de A à Z, et nous vous orientons vers
          les bons interlocuteurs pour la suite.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 relative z-10">
          <Link href="/" className="inline-flex items-center justify-center bg-white text-black font-bold text-sm py-4 px-7 rounded-full hover:bg-gray-100 transition-all duration-300">
            Vérifier mon éligibilité au DTV
          </Link>
          <Link href="/contact" className="inline-flex items-center justify-center border border-white/20 text-white font-bold text-sm py-4 px-7 rounded-full hover:bg-white/5 transition-all duration-300">
            Nous contacter
          </Link>
        </div>
      </div>

      <BlogNavigation variant="article-bottom" />
    </article>
  );
}
