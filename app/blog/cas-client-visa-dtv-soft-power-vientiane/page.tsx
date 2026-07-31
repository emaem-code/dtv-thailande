import React from 'react';
import BoutonEligibilite from '../../components/BoutonEligibilite';
import LienArticle from '../../components/LienArticle';
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

const post = getBlogPost('cas-client-visa-dtv-soft-power-vientiane');
const articleSchema = createArticleSchema(post);
const breadcrumbSchema = createBreadcrumbSchema(post);

export const metadata = createArticleMetadata(post);

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Peut-on obtenir un DTV sans revenus réguliers ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, par la voie Soft Power, qui repose sur l'inscription à une formation culturelle certifiée et sur la preuve d'épargne, sans exiger de justificatifs professionnels.",
      },
    },
    {
      '@type': 'Question',
      name: "Un passeport rempli de visa runs empêche-t-il d'obtenir un DTV ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. Ce client cumulait vingt et un mois d'entrées terrestres avant d'obtenir le sien. L'historique de séjour n'est pas un critère d'exclusion pour une demande de visa consulaire.",
      },
    },
    {
      '@type': 'Question',
      name: "Combien de temps prend l'instruction d'un dossier DTV ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Trois à quatre jours ouvrables à Vientiane, environ quatre semaines à l'ambassade de Paris selon ses propres indications. Le délai dépend aussi de la rapidité avec laquelle vous fournissez les pièces complémentaires éventuelles.",
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on déposer son dossier DTV seul ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui. Les principales difficultés sont le formalisme technique du portail et l'interprétation exacte des pièces demandées. Le risque en cas d'erreur est la perte des frais consulaires, qui ne sont pas remboursés.",
      },
    },
    {
      '@type': 'Question',
      name: 'Le cursus à 20 000 THB est-il toujours proposé ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. Ce dépôt date de mai 2026, sous un format de six cours que l'école a depuis retiré de son offre. Le format de référence est désormais le cursus de neuf mois. Les inscriptions antérieures restent honorées.",
      },
    },
  ],
};

export default function ArticleCasClient() {
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
        <span className="inline-block rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-violet-400 mb-5">
          Cas client · Terrain
        </span>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
          5 000 € de visa runs en 21 mois —{' '}
          <span className="text-violet-400">puis un DTV de 5 ans en trois jours</span>
        </h1>

        <p className="text-base text-gray-500 mt-6">
          Lecture : 9 min · Publié le {post.date} · Par{' '}
          <strong className="text-gray-400">Matthieu Moretti</strong>
        </p>
      </header>

      {/* ── INTRODUCTION ── */}
      <div className="text-lg text-gray-400 mb-12 space-y-5">
        <p>
          Il est arrivé en Thaïlande en août 2024. Jusqu&apos;en mai 2026, il n&apos;a connu
          qu&apos;une seule méthode pour rester : le visa run. Tous les deux mois, sans exception —
          tantôt par la route vers la frontière la plus proche, en moto ou en bus, tantôt en avion
          vers un pays voisin quand la voie terrestre devenait trop risquée ou trop encombrée.
        </p>
        <p>
          En vingt et un mois de ce régime, il a dépensé{' '}
          <strong className="text-white">près de 5 000 €</strong>.
        </p>
        <p>
          Puis, en trois jours, il a obtenu un <strong className="text-white">Visa DTV valable cinq
          ans</strong>. Entre les deux, aucun changement de situation : ni nouveau contrat, ni
          augmentation de revenus, ni statut professionnel décroché. Il était éligible depuis le
          début — il ne le savait pas.
        </p>
        <p className="text-white font-medium border-l-4 border-violet-500 pl-5 py-1">
          Ce cas est intéressant précisément parce qu&apos;il n&apos;a rien d&apos;exceptionnel. Des
          milliers de francophones vivent aujourd&apos;hui en Thaïlande exactement comme il vivait, en
          payant chaque année le triple de ce que coûterait la solution définitive.
        </p>
      </div>

      {/* ── SOMMAIRE ── */}
      <nav className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 mb-12 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Au programme :</h2>
        <ul className="space-y-3">
          <li><a href="#profil" className="text-violet-400 hover:text-violet-300 hover:underline transition-colors text-sm md:text-base">1. Le profil que tout le monde croit inéligible</a></li>
          <li><a href="#calcul" className="text-violet-400 hover:text-violet-300 hover:underline transition-colors text-sm md:text-base">2. Le calcul qu&apos;il n&apos;avait jamais fait</a></li>
          <li><a href="#pourquoi" className="text-violet-400 hover:text-violet-300 hover:underline transition-colors text-sm md:text-base">3. Pourquoi il se croyait exclu</a></li>
          <li><a href="#deroule" className="text-violet-400 hover:text-violet-300 hover:underline transition-colors text-sm md:text-base">4. Ce qui s&apos;est passé concrètement</a></li>
          <li><a href="#blocages" className="text-violet-400 hover:text-violet-300 hover:underline transition-colors text-sm md:text-base">5. Là où ça a réellement coincé</a></li>
          <li><a href="#vientiane-paris" className="text-violet-400 hover:text-violet-300 hover:underline transition-colors text-sm md:text-base">6. Trois jours à Vientiane, un mois à Paris</a></li>
          <li><a href="#preuve" className="text-violet-400 hover:text-violet-300 hover:underline transition-colors text-sm md:text-base">7. Ce que ce cas prouve — et ce qu&apos;il ne prouve pas</a></li>
        </ul>
      </nav>

      {/* ── SECTION 1 ── */}
      <section className="mb-12">
        <h2 id="profil" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          1. Le profil : celui que tout le monde croit inéligible
        </h2>
        <p className="mb-6">Reprenons sa situation telle qu&apos;elle était au printemps 2026.</p>

        <figure className="my-8">
          <Image
            src="/images/blog/cas-client-visa-run-frontiere-moto.jpg"
            alt="Passage de frontière terrestre à moto pour un visa run depuis la Thaïlande"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Vingt et un mois de frontières, tous les deux mois, par la route comme par les airs. Le
            mode de vie que le DTV rend inutile.
          </figcaption>
        </figure>

        <ul className="space-y-3 mb-6 pl-4 border-l-2 border-gray-800 text-gray-400 text-sm">
          <li>
            <strong className="text-white">Un passeport chargé.</strong> Vingt et un mois
            d&apos;entrées et sorties par voie terrestre et aérienne, tampon après tampon. Exactement le profil
            que l&apos;immigration surveille de près.
          </li>
          <li>
            <strong className="text-white">Pas de revenus réguliers.</strong> Aucune fiche de paie,
            aucun contrat de travail, aucune facturation stable à présenter.
          </li>
          <li>
            <strong className="text-white">Un statut professionnel quasi inexistant.</strong> Rien
            qui ressemble au portfolio ou à l&apos;attestation d&apos;employeur que les ambassades
            réclament habituellement.
          </li>
        </ul>

        <p className="mb-6">
          Sur le papier, c&apos;est le dossier qu&apos;on décourage. Il cochait toutes les cases du
          candidat que les agences refusent d&apos;accompagner.
        </p>

        <figure className="my-8">
          <Image
            src="/images/blog/cas-client-passeport-tampons.jpg"
            alt="Passeport chargé de tampons d'entrée après vingt et un mois de visa runs en Thaïlande"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Exactement le profil que l&apos;immigration surveille. Et pourtant, le dossier est passé.
          </figcaption>
        </figure>

        <div className="bg-emerald-500/5 border border-emerald-500/25 rounded-2xl p-6">
          <p className="text-white font-semibold mb-2">Mais il avait deux choses</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            D&apos;abord, <strong className="text-white">aucun antécédent de refus</strong> — il
            n&apos;avait tout simplement jamais demandé de visa. Ensuite, et c&apos;est décisif, il
            disposait largement de{' '}
            <Link href="/blog/fonds-bancaires-visa-dtv" className="text-emerald-400 hover:underline font-medium">
              l&apos;épargne exigée
            </Link>
            . C&apos;est tout ce qu&apos;il fallait.
          </p>
        </div>
      </section>

      {/* ── SECTION 2 ── */}
      <section className="mb-12">
        <h2 id="calcul" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          2. Le calcul qu&apos;il n&apos;avait jamais fait
        </h2>
        <p className="mb-4">
          C&apos;est en reconstituant ses dépenses que la conversation a basculé.
        </p>
        <p className="mb-6">
          Un visa run ne se résume pas au prix du transport. Il faut additionner l&apos;aller-retour
          vers la frontière — par la route ou{' '}
          <strong className="text-white">par avion, ce qui change complètement l&apos;addition</strong>{' '}
          —, les nuits sur place, les repas et déplacements pendant le trajet,{' '}
          <Link href="/blog/fin-exemption-visa-60-jours" className="text-violet-400 hover:underline font-medium">
            les extensions payées à l&apos;immigration
          </Link>
          , et — comme beaucoup — les agences auxquelles il faisait appel pour organiser ses sorties.
          Sur vingt et un mois, en additionnant tout, il en avait pour près de 5 000 €.
        </p>
        <p className="mb-6">
          C&apos;est d&apos;ailleurs l&apos;alternance des deux modes qui explique une partie du
          montant. Les sorties aériennes coûtent trois à quatre fois une sortie terrestre, mais elles
          sont mieux perçues au retour : depuis le plafonnement des entrées terrestres en exemption à
          deux par année civile, le passage par la route est devenu le signal le plus visible du
          profil « visa runner ». Beaucoup basculent alors sur l&apos;avion, et voient leur budget
          annuel doubler sans pour autant gagner un statut.{' '}
          <LienArticle slug="overstay-thailande-amende-blacklist-visa-dtv" className="text-violet-400 hover:underline font-medium">
            C&apos;est précisément la trajectoire que l&apos;immigration lit dans un passeport
          </LienArticle>
          .
        </p>

        <div className="overflow-x-auto rounded-2xl border border-gray-800 mb-6">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="bg-[#111111] border-b border-gray-800">
                <th className="text-left px-4 py-3 text-gray-400 font-semibold"></th>
                <th className="text-left px-4 py-3 text-red-400 font-semibold">Visa runs</th>
                <th className="text-left px-4 py-3 text-emerald-400 font-semibold">Visa DTV</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]">
                <td className="px-4 py-4 font-semibold text-white">Période couverte</td>
                <td className="px-4 py-4">21 mois</td>
                <td className="px-4 py-4 text-white font-semibold">5 ans</td>
              </tr>
              <tr className="border-b border-gray-800/60">
                <td className="px-4 py-4 font-semibold text-white">Coût total</td>
                <td className="px-4 py-4 text-white font-semibold">~5 000 €</td>
                <td className="px-4 py-4 text-white font-semibold">moins de 4 000 €</td>
              </tr>
              <tr className="border-b border-gray-800/60 bg-[#0d0d0d]">
                <td className="px-4 py-4 font-semibold text-white">Coût annuel</td>
                <td className="px-4 py-4">~2 850 €</td>
                <td className="px-4 py-4">~800 €</td>
              </tr>
              <tr>
                <td className="px-4 py-4 font-semibold text-white">Ce qui est inclus</td>
                <td className="px-4 py-4">transports, nuits, repas, extensions, agences</td>
                <td className="px-4 py-4">cursus, frais consulaires, extensions sur 5 ans, accompagnement TTC</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mb-4">
          Le chiffre de 4 000 € comprend tout, et il est calculé{' '}
          <strong className="text-white">au tarif actuel</strong> : le cursus de neuf mois, les frais
          consulaires, les extensions sur l&apos;ensemble de la période et notre accompagnement toutes
          taxes comprises. Ce n&apos;est pas un prix d&apos;appel auquel il faudrait ajouter des
          suppléments.
        </p>
        <p className="mb-6">
          <strong className="text-white">Projeté sur cinq ans, son rythme de visa runs lui aurait
          coûté plus de 14 000 €.</strong> Soit environ 10 000 € de différence avec la solution
          qu&apos;il a fini par choisir.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">
          Ce que le tableau ne montre pas
        </h3>
        <p className="mb-4">
          Le coût financier n&apos;est que la partie visible.
        </p>
        <p className="mb-4">
          Il y a les <strong className="text-white">journées entières perdues</strong> — une dizaine
          de passages de frontière, chacun mobilisant un à deux jours de trajet et d&apos;attente.
        </p>
        <p className="mb-4">
          Il y a <strong className="text-white">l&apos;incertitude à chaque guichet</strong>. Depuis
          2025, les officiers réduisent les tampons à trente jours, parfois quinze, pour les profils
          jugés abusifs. Un passeport chargé finit par attirer l&apos;attention, et personne ne sait à
          l&apos;avance si le passage suivant se déroulera normalement.
        </p>
        <p>
          Il y a enfin <strong className="text-white">l&apos;impossibilité de se projeter</strong>.
          Difficile de signer un bail d&apos;un an, d&apos;acheter un véhicule ou de lancer un projet
          quand on ignore si l&apos;on sera encore autorisé à rester dans deux mois. Cinq années de
          validité, ce n&apos;est pas seulement moins cher : c&apos;est la fin de cette question-là.
        </p>
      </section>

      {/* ── SECTION 3 ── */}
      <section className="mb-12">
        <h2 id="pourquoi" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          3. Pourquoi il pensait ne pas être éligible
        </h2>
        <p className="mb-4">
          C&apos;est le point qui revient dans presque toutes les conversations que j&apos;ai avec des
          expatriés en visa run.
        </p>
        <p className="mb-4">
          Le Visa DTV a été présenté partout comme le visa des <em>digital nomads</em>. Les articles,
          les vidéos, les groupes Facebook : tout le monde parle de{' '}
          <Link href="/blog/visa-dtv-freelance-auto-entrepreneur" className="text-violet-400 hover:underline font-medium">
            freelances avec portfolio
          </Link>
          , de télétravailleurs salariés, de contrats clients à produire. Résultat, ceux qui n&apos;ont
          pas ce profil se sentent exclus d&apos;office et continuent leurs allers-retours en pensant
          que c&apos;est leur seule option.
        </p>
        <p>
          Or le DTV comporte une seconde voie d&apos;accès,{' '}
          <Link href="/blog/visa-dtv-soft-power-ecoles" className="text-violet-400 hover:underline font-medium">
            la catégorie Soft Power
          </Link>
          , qui ne demande aucun justificatif professionnel. Elle repose sur l&apos;inscription à une
          formation culturelle certifiée — cuisine ou Muay Thaï — et sur la preuve d&apos;épargne.
          C&apos;est cette voie que je lui ai recommandée. Pas parce qu&apos;elle est plus facile,
          mais parce qu&apos;elle correspondait à ce qu&apos;il avait réellement.
        </p>
      </section>

      {/* ── SECTION 4 ── */}
      <section className="mb-12">
        <h2 id="deroule" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          4. Ce qui s&apos;est passé concrètement
        </h2>
        <p className="mb-6">
          <strong className="text-white">Mai 2026.</strong> Inscription dans une école certifiée de
          Bangkok, puis dépôt du dossier sur{' '}
          <Link href="/blog/guide-depot-dossier-evisa-dtv" className="text-violet-400 hover:underline font-medium">
            le portail e-Visa officiel
          </Link>
          , et déplacement à Vientiane, au Laos, pour la finalisation et le règlement des frais
          consulaires au guichet de l&apos;ambassade.
        </p>

        <figure className="my-8">
          <Image
            src="/images/blog/cas-client-ambassade-vientiane.jpg"
            alt="Ambassade de Thaïlande à Vientiane, où le dossier DTV a été déposé et délivré en trois jours"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Trois à quatre jours ouvrables à Vientiane, contre environ quatre semaines à Paris selon
            l&apos;ambassade elle-même.
          </figcaption>
        </figure>

        <p className="mb-6">
          <strong className="text-white">Trois jours plus tard, le visa était délivré.</strong> Cinq
          ans de validité. Cent quatre-vingts jours par entrée. Plus de moto vers la frontière tous
          les deux mois.
        </p>

        <div className="border border-amber-500/30 bg-amber-500/5 rounded-2xl p-6">
          <p className="text-white font-semibold mb-2">
            ⚠️ Une précision indispensable sur le cursus
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Il s&apos;est inscrit sous un format de six mois facturé 20 000 THB, qui existait encore
            au printemps 2026. <strong className="text-white">Ce format a depuis été retiré de
            l&apos;offre</strong> : interrogée directement, l&apos;école nous a confirmé par écrit ne
            plus proposer que le programme de neuf mois, les inscriptions antérieures restant
            honorées. Les chiffres du tableau ci-dessus intègrent déjà ce nouveau tarif — c&apos;est
            pourquoi la comparaison reste valable pour un dossier déposé aujourd&apos;hui.
          </p>
        </div>
      </section>

      {/* ── SECTION 5 ── */}
      <section className="mb-12">
        <h2 id="blocages" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          5. Là où ça a réellement coincé
        </h2>
        <p className="mb-4">
          C&apos;est la partie que les récits de réussite passent sous silence, et c&apos;est pourtant
          la seule qui compte.
        </p>
        <p className="mb-6">
          Le dossier n&apos;est pas passé du premier coup parce qu&apos;il était simple. Il est passé
          parce qu&apos;il a été <strong className="text-white">construit exactement comme
          l&apos;administration l&apos;attend</strong> — ce qui n&apos;a rien d&apos;évident.
        </p>

        <figure className="my-8">
          <Image
            src="/images/blog/cas-client-dossier-formatage.jpg"
            alt="Préparation et formatage des justificatifs pour le dépôt d'un dossier DTV en ligne"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Formats imposés, tailles limitées, intitulés ambigus. C&apos;est là que la plupart des
            dossiers se bloquent.
          </figcaption>
        </figure>

        <ul className="space-y-3 mb-6 pl-4 border-l-2 border-gray-800 text-gray-400 text-sm">
          <li>
            <strong className="text-white">Les contraintes techniques du portail.</strong> Les
            justificatifs doivent être fournis dans des formats et des tailles précis. Un fichier trop
            lourd, une image mal cadrée, et le téléversement échoue ou le document devient illisible
            pour l&apos;officier. Cette contrainte n&apos;est documentée nulle part de façon claire, et
            elle bloque plus de dossiers qu&apos;on ne l&apos;imagine.
          </li>
          <li>
            <strong className="text-white">Les intitulés ambigus.</strong> Certaines demandes de
            l&apos;ambassade ne veulent pas dire ce qu&apos;elles semblent dire. Un champ qui ressemble
            à une demande de justificatif de domicile n&apos;en est pas forcément une. Fournir le
            mauvais document, c&apos;est déclencher une demande complémentaire — ou un refus.
          </li>
          <li>
            <strong className="text-white">Les pièces additionnelles.</strong> L&apos;ambassade a
            effectivement réclamé des documents supplémentaires en cours d&apos;instruction. Ils ont
            été fournis <strong className="text-white">en quelques heures</strong>, dans le format
            attendu.
          </li>
        </ul>

        <p className="mb-4">
          C&apos;est là que se joue la différence entre trois jours et plusieurs semaines. Un candidat
          seul découvre la demande, ne sait pas exactement ce qui est attendu, envoie une première
          version, attend, recommence.
        </p>
        <p className="text-white font-medium border-l-4 border-violet-500 pl-5 py-1">
          Livré à lui-même, ce client n&apos;aurait pas su par où commencer. Ce n&apos;est pas une
          question d&apos;intelligence : c&apos;est une question de connaissance d&apos;un formalisme
          administratif que rien ne permet d&apos;anticiper quand on le découvre.
        </p>
      </section>

      {/* ── SECTION 6 ── */}
      <section className="mb-12">
        <h2 id="vientiane-paris" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          6. Trois jours à Vientiane, un mois à Paris
        </h2>
        <p className="mb-4">
          Un élément de comparaison, à prendre pour ce qu&apos;il est : un témoignage isolé.
        </p>
        <p className="mb-4">
          Une connaissance ayant déposé son dossier à l&apos;ambassade de Paris a également reçu une
          demande de pièces complémentaires. Le traitement a pris{' '}
          <strong className="text-white">environ un mois</strong>, avec des exigences documentaires
          qu&apos;elle a décrites comme nettement plus strictes.
        </p>
        <p>
          Je ne dispose pas d&apos;assez de dépôts parisiens pour en tirer une règle. Mais
          l&apos;ambassade de France indique elle-même un délai d&apos;instruction d&apos;environ
          quatre semaines, quand Vientiane rend une décision en trois à quatre jours ouvrables.
          L&apos;écart n&apos;est donc pas une impression : il est documenté par l&apos;administration
          elle-même, et il pèse lourd dans{' '}
          <Link href="/blog/comparatif-visas-thailande" className="text-violet-400 hover:underline font-medium">
            le choix de votre juridiction de dépôt
          </Link>
          .
        </p>
      </section>

      {/* ── SECTION 7 ── */}
      <section className="mb-12">
        <h2 id="preuve" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          7. Ce que ce cas prouve — et ce qu&apos;il ne prouve pas
        </h2>
        <p className="mb-6">
          Soyons précis, parce que c&apos;est ce qui distingue un retour d&apos;expérience d&apos;un
          argument commercial.
        </p>

        <div className="bg-emerald-500/5 border border-emerald-500/25 rounded-2xl p-6 mb-5">
          <p className="text-white font-semibold mb-3">Ce qu&apos;il prouve</p>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• <strong className="text-white">L&apos;absence de revenus réguliers n&apos;est pas rédhibitoire.</strong> La voie Soft Power existe précisément pour ces situations.</li>
            <li>• <strong className="text-white">Un passeport chargé de visa runs ne condamne pas.</strong> Ce client en avait vingt et un mois derrière lui.</li>
            <li>• <strong className="text-white">L&apos;épargne est le vrai critère.</strong> C&apos;est elle qui a porté le dossier, pas le statut professionnel.</li>
            <li>• <strong className="text-white">Le formalisme prime sur le fond.</strong> Un dossier éligible mal présenté échoue ; bien présenté, il passe en trois jours.</li>
          </ul>
        </div>

        <div className="bg-amber-500/5 border border-amber-500/25 rounded-2xl p-6">
          <p className="text-white font-semibold mb-3">Ce qu&apos;il ne prouve pas</p>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• <strong className="text-white">Que tout le monde obtiendra son visa en trois jours.</strong> Ce délai est celui de Vientiane, sur un dossier complet, avec des pièces complémentaires traitées immédiatement.</li>
            <li>• <strong className="text-white">Que ce format de cursus reste disponible.</strong> Il ne l&apos;est plus : l&apos;école ne propose désormais que le programme de neuf mois.</li>
            <li>• <strong className="text-white">Qu&apos;il faut passer par un accompagnement.</strong> Un candidat méthodique, patient et à l&apos;aise avec l&apos;administration peut y arriver seul. Ce qu&apos;il perdra, c&apos;est du temps — et éventuellement les frais consulaires si le dossier est rejeté, car ils ne sont pas remboursés.</li>
          </ul>
        </div>
      </section>

      {/* ── SECTION 8 ── */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Si vous vous reconnaissez</h2>
        <p className="mb-6">
          Vous êtes en Thaïlande depuis des mois, vous enchaînez les frontières, vous pensez ne pas
          avoir le profil. Posez-vous trois questions.
        </p>
        <ul className="space-y-4 mb-6 pl-4 border-l-2 border-violet-500/40 text-gray-400 text-sm">
          <li>
            <strong className="text-white">Disposez-vous de l&apos;épargne exigée ?</strong>{' '}
            C&apos;est le seul critère réellement bloquant. Le reste se construit.
          </li>
          <li>
            <strong className="text-white">Combien vous coûtent réellement vos visa runs sur douze
            mois ?</strong> Faites l&apos;addition complète — transports, nuits, repas, extensions,
            agences — et non le seul prix du billet. C&apos;est ce calcul qui a décidé ce client, et
            il l&apos;avait toujours repoussé parce qu&apos;il redoutait le résultat.
          </li>
          <li>
            <strong className="text-white">Combien de temps allez-vous tenir ainsi ?</strong>{' '}
            <Link href="/blog/20000-thb-immigration-thailande-regle-especes" className="text-violet-400 hover:underline font-medium">
              Les contrôles se durcissent
            </Link>
            , les tampons réduits se multiplient, et un passeport trop chargé finit par attirer
            l&apos;attention.
          </li>
        </ul>
      </section>

      {/* ── ENCART AUTEUR ── */}
      <div className="my-14 bg-[#111111] border border-gray-800 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-6 shadow-lg">
        <div className="w-24 h-24 rounded-full bg-gray-800 flex-shrink-0 overflow-hidden border-2 border-violet-500/50">
          <div className="w-full h-full bg-gradient-to-br from-violet-500/20 to-violet-500/20 flex items-center justify-center text-3xl">🛂</div>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-1">Matthieu Moretti</h3>
          <p className="text-violet-400 text-xs font-semibold mb-3 uppercase tracking-wider">Montage de dossiers DTV · Phuket</p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Ce dossier fait partie de ceux que j&apos;ai montés personnellement. Les montants, les
            dates et les délais sont ceux de l&apos;opération réelle. J&apos;ai volontairement laissé
            de côté le détail des pièces et des formats attendus par le portail : c&apos;est le cœur
            de mon travail, et le publier n&apos;aiderait personne à mieux comprendre son propre
            dossier.
          </p>
        </div>
      </div>

      {/* ── FAQ ── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white mb-6">FAQ</h2>
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
        <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500 opacity-10 rounded-full blur-3xl" />
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 relative z-10">
          Faites le calcul, puis parlons-en
        </h3>
        <p className="text-gray-400 mb-8 text-sm md:text-base relative z-10">
          Si vos visa runs vous coûtent plus de 2 000 € par an, le DTV est déjà rentable la première
          année. Vérifiez votre éligibilité en deux minutes — y compris si vous pensez ne pas avoir
          le profil.
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

      <BlogNavigation variant="article-bottom" />
    </article>
  );
}
