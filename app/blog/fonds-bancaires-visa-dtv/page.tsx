import Link from 'next/link';

export default function BlogArticle() {
  return (
    <>
      {/* Conteneur principal avec fond sombre adapté à ton site */}
      <article className="max-w-3xl mx-auto px-6 py-16 font-sans text-gray-300 leading-relaxed bg-[#0a0a0a]">

        {/* En-tête de l'article */}
        <header className="mb-14 border-b border-gray-800 pb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Visa DTV Thaïlande : Faut-il bloquer les 500 000 THB pendant 3 ou 6 mois ?
          </h1>
          <p className="text-xl text-[#F59E0B] font-semibold">
            Le Guide Définitif 2026
          </p>
        </header>

        {/* Introduction */}
        <div className="text-lg text-gray-400 mb-12 space-y-6">
          <p>
            L&apos;annonce du Visa DTV (Destination Thailand Visa) a fait l&apos;effet d&apos;une bombe dans la
            communauté des expatriés, freelances et digital nomads. Avec sa validité de 5 ans et ses
            entrées multiples, c&apos;est aujourd&apos;hui le sésame ultime pour s&apos;installer au Pays du Sourire.
          </p>
          <p>
            Cependant, un critère précis cristallise toutes les angoisses : la fameuse preuve financière
            des 500 000 Bahts (environ 13 000 €). Faut-il laisser cet argent bloqué pendant 6 mois ?
            Un virement de dernière minute est-il accepté ? L&apos;ambassade de Paris est-elle plus stricte
            que celle de Vientiane ?
          </p>
          <p className="text-white font-medium border-l-4 border-[#F59E0B] pl-4">
            Face à l&apos;avalanche de rumeurs, il est temps de faire le point. Voici la réponse claire,
            officielle et basée sur notre expertise de terrain.
          </p>
        </div>

        {/* Contenu principal */}
        <div className="space-y-8">

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">
            1. Pourquoi la Thaïlande exige-t-elle 500 000 THB ?
          </h2>
          <p>
            Avant de parler des délais, il est crucial de comprendre la logique derrière cette exigence.
            Le gouvernement thaïlandais a créé le Visa DTV pour attirer des profils qualifiés, mais il
            souhaite s&apos;assurer que ces nouveaux résidents ne se retrouveront pas en difficulté financière
            sur son territoire.
          </p>
          <p>
            La somme n&apos;est pas une taxe, ni un droit d&apos;entrée. Il s&apos;agit uniquement d&apos;une{' '}
            <strong className="text-white">preuve de solvabilité</strong> correspondant approximativement
            à une année de salaire moyen confortable en Thaïlande.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">
            2. La règle des 3 mois vs 6 mois
          </h2>
          <p>
            C&apos;est ici que la confusion règne en maître. La réponse à la question &quot;faut-il prouver 3 ou
            6 mois d&apos;historique bancaire ?&quot; est en réalité :{' '}
            <strong className="text-white">
              cela dépend d&apos;où vous déposez votre dossier.
            </strong>
          </p>

          <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-2">
            L&apos;approche stricte : L&apos;ambassade de Paris
          </h3>
          <p>
            Si vous choisissez de faire vos démarches depuis la France, attendez-vous au niveau
            d&apos;exigence le plus élevé. L&apos;ambassade de Paris demande très fréquemment un historique
            irréprochable sur les{' '}
            <strong className="text-white">6 derniers mois</strong>.
          </p>

          <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-2">
            La voie de la souplesse : Le Visa Run en Asie
          </h3>
          <p>
            C&apos;est la stratégie que nous recommandons. En optant pour un dépôt au Laos (Vientiane)
            ou en Malaisie, la norme est de réclamer{' '}
            <strong className="text-white">les relevés des 3 derniers mois</strong>. C&apos;est un gain de
            temps inestimable.
          </p>

          {/* Ajoute tes autres paragraphes ici en suivant le même modèle */}

        </div>

        {/* Call to Action Premium */}
        <div className="mt-16 bg-[#111111] border border-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
          {/* Lueur ambrée en fond */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#F59E0B] opacity-10 rounded-full blur-3xl pointer-events-none" />

          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">
            Sécurisez votre expatriation avec DTV-Thaïlande
          </h3>
          <p className="text-gray-400 mb-8 relative z-10">
            Un relevé mal traduit, un historique trop court ou une mauvaise planification peuvent
            entraîner un refus immédiat. Nous prenons en charge l&apos;analyse de vos critères financiers,
            votre inscription en école certifiée et l&apos;organisation logistique de votre Visa Run.
          </p>

          <Link
            href="/#contact"
            className="relative z-10 inline-flex items-center justify-center bg-white text-black font-semibold text-lg py-4 px-8 rounded-full hover:bg-gray-200 transition-all duration-300"
          >
            Découvrir nos formules d&apos;accompagnement — 2 min
          </Link>
        </div>

      </article>
    </>
  );
}