import React from 'react';
import Link from 'next/link';

// ─── SCHEMA ARTICLE JSON-LD ───────────────────────────────────────────────────
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://dtv-thailande.fr/blog/fonds-bancaires-visa-dtv"
  },
  "headline": "Visa DTV : Faut-il bloquer les 500 000 THB pendant 3 ou 6 mois ?",
  "description": "Exigences officielles des ambassades sur la preuve financière de 500 000 THB pour le Visa DTV.",
  "image": "https://dtv-thailande.fr/poster-budget.jpg",  
  "author": {
    "@type": "Person",
    "name": "Matthieu Moretti",
    "url": "https://dtv-thailande.fr/contact"
  },  
  "publisher": {
    "@type": "Organization",
    "name": "DTV Thaïlande",
    "logo": {
      "@type": "ImageObject",
      "url": "https://dtv-thailande.fr/logo.png"
    }
  },
  "datePublished": "2026-06-01",
  "dateModified": "2026-06-07"
};

// ─── SCHEMA FAQ JSON-LD ───────────────────────────────────────────────────────
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "L'argent doit-il être en Bahts sur un compte thaïlandais ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. Les fonds peuvent être en euros ou dans n'importe quelle devise convertible sur votre compte bancaire européen (Crédit Agricole, BoursoBank, Revolut…). L'ambassade effectuera elle-même la conversion le jour du traitement du dossier.",
      },
    },
    {
      '@type': 'Question',
      name: 'Dois-je faire traduire mes relevés de compte bancaire ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Pour un dépôt en Asie via la méthode Soft Power, nos retours de terrain montrent que les relevés en français sont généralement acceptés sans traduction. Pour un dépôt à Paris avec un profil Freelance, une traduction assermentée est souvent exigée.",
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on utiliser l'argent une fois le visa obtenu ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui. L'exigence des 500 000 THB ne vaut que pour l'obtention du visa. Une fois le DTV tamponné dans votre passeport, vous êtes libre d'utiliser ces fonds pour vos billets d'avion, votre logement ou votre école en Thaïlande.",
      },
    },
    {
      '@type': 'Question',
      name: 'Un compte Revolut ou N26 est-il accepté pour le visa DTV ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, les néobanques comme Revolut ou N26 sont acceptées à condition de pouvoir fournir des relevés officiels avec IBAN et historique complet. Vérifiez que votre banque permet d'exporter des relevés au format PDF officiel avec en-tête.",
      },
    },
    {
      '@type': 'Question',
      name: 'Faut-il 3 ou 6 mois d\'historique bancaire pour le visa DTV ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Cela dépend de l'ambassade. L'ambassade de Paris exige généralement 6 mois d'historique. Les ambassades en Asie (Vientiane, Kuala Lumpur, Phnom Penh) acceptent souvent 3 mois. C'est pourquoi beaucoup de candidats optent pour un Visa Run en Asie du Sud-Est.",
      },
    },
    {
      '@type': 'Question',
      name: 'Que se passe-t-il si le solde descend en dessous de 500 000 THB pendant la période ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "C'est un motif de refus quasi-automatique. L'officier consulaire vérifie que le solde n'est jamais descendu sous le seuil requis sur toute la période demandée. Une seule irrégularité suffit à invalider le dossier.",
      },
    },
  ],
};

// ─── TABLEAU COMPARATIF DES AMBASSADES ───────────────────────────────────────
const ambassades = [
  {
    ville: 'Paris',
    pays: '🇫🇷 France',
    delai: '6 mois',
    traduction: 'Assermentée obligatoire',
    traitement: '5–10 jours',
    difficulte: 'Élevée',
    difficulteColor: 'text-red-400',
  },
  {
    ville: 'Vientiane',
    pays: '🇱🇦 Laos',
    delai: '3 mois',
    traduction: 'Souvent acceptée en français',
    traitement: '3 jours ouvrables',
    difficulte: 'Faible',
    difficulteColor: 'text-emerald-400',
  },
  {
    ville: 'Kuala Lumpur',
    pays: '🇲🇾 Malaisie',
    delai: '3 mois',
    traduction: 'Souvent acceptée',
    traitement: '3–5 jours',
    difficulte: 'Faible',
    difficulteColor: 'text-emerald-400',
  },
  {
    ville: 'Phnom Penh',
    pays: '🇰🇭 Cambodge',
    delai: '3 mois',
    traduction: 'Variable',
    traitement: '3–5 jours',
    difficulte: 'Modérée',
    difficulteColor: 'text-amber-400',
  },
  {
    ville: 'Genève',
    pays: '🇨🇭 Suisse',
    delai: '6 mois',
    traduction: 'Assermentée souvent exigée',
    traitement: '7–12 jours',
    difficulte: 'Élevée',
    difficulteColor: 'text-red-400',
  },
];

// ─── TYPES DE COMPTES BANCAIRES ───────────────────────────────────────────────
const comptes = [
  { type: 'Compte courant classique', verdict: '✅ Accepté', note: 'Méthode la plus sûre et transparente.', color: 'border-emerald-500/30 bg-emerald-500/5' },
  { type: 'Livret A / LDD / Épargne', verdict: '✅ Accepté', note: 'Liquide par définition. Relevés exigés.', color: 'border-emerald-500/30 bg-emerald-500/5' },
  { type: 'Compte joint (mariés)', verdict: '✅ Accepté', note: 'Acte de mariage requis. PACS : zone grise.', color: 'border-emerald-500/30 bg-emerald-500/5' },
  { type: 'Néobanque (Revolut, N26)', verdict: '✅ Accepté', note: 'Relevés PDF officiels avec IBAN obligatoires.', color: 'border-emerald-500/30 bg-emerald-500/5' },
  { type: 'PEA / Compte-titres / Assurance Vie', verdict: '⚠️ Risqué', note: 'Fonds non liquides. Souvent refusé.', color: 'border-amber-500/30 bg-amber-500/5' },
  { type: 'Compte professionnel (SASU, SARL)', verdict: '❌ Refusé', note: "L'argent appartient à la personne morale, pas à vous.", color: 'border-red-500/30 bg-red-500/5' },
  { type: 'Crypto-monnaies (BTC, ETH…)', verdict: '❌ Refusé', note: 'Aucun portefeuille crypto accepté. Convertir en fiat.', color: 'border-red-500/30 bg-red-500/5' },
];

export default function BlogArticleDTV() {
  return (
    <article className="max-w-3xl mx-auto px-5 md:px-6 py-14 md:py-20 font-sans text-gray-300 leading-relaxed bg-[#0a0a0a]">
      
      {/* ── INJECTION DES SCRIPTS SEO JSON-LD ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── EN-TÊTE ── */}
      <header className="mb-12 border-b border-gray-800 pb-10">
        <span className="inline-block bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
          Guide Visa · 2026
        </span>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
          Visa DTV : 500 000 THB —{' '}
          <span className="text-[#F59E0B]">3 ou 6 mois ?</span>{' '}
          La réponse définitive (2026)
        </h1>

        <p className="text-base text-gray-500 mt-4">
          Mis à jour en 2026 · Lecture : 8 min · Par{' '}
          <strong className="text-gray-400">Matthieu Moretti</strong>
        </p>
      </header>

      {/* ── INTRODUCTION ── */}
      <div className="text-lg text-gray-400 mb-12 space-y-5">
        <p>
          L&apos;annonce du Visa DTV (Destination Thailand Visa) a fait l&apos;effet d&apos;une bombe dans la
          communauté des expatriés, freelances et digital nomads. Avec sa validité de{' '}
          <strong className="text-white">5 ans et ses entrées multiples</strong>, c&apos;est aujourd&apos;hui
          le sésame ultime pour s&apos;installer au Pays du Sourire.
        </p>
        <p>
          Cependant, un critère précis cristallise toutes les angoisses et sature les groupes
          d&apos;entraide : la fameuse preuve financière des{' '}
          <strong className="text-white">500 000 Bahts (environ 13 000 €)</strong>. Faut-il laisser
          cet argent bloqué pendant 6 mois ? Un virement de dernière minute est-il accepté ?
          L&apos;ambassade de Paris est-elle plus stricte que celle de Vientiane ?
        </p>
        <p className="text-white font-medium border-l-4 border-[#F59E0B] pl-5 py-1">
          Face à l&apos;avalanche de rumeurs et de témoignages contradictoires, voici la réponse
          claire, officielle et basée sur notre expertise de terrain pour réussir votre
          expatriation sans essuyer un refus.
        </p>
      </div>

      {/* ── SOMMAIRE CLIQUABLE ── */}
      <nav className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 mb-12 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Sommaire de l'article</h2>
        <ul className="space-y-3">
          <li><a href="#logique-financiere" className="text-amber-500 hover:text-amber-400 hover:underline transition-colors text-sm md:text-base">1. Pourquoi la Thaïlande exige-t-elle 500 000 THB ?</a></li>
          <li><a href="#delais-ambassades" className="text-amber-500 hover:text-amber-400 hover:underline transition-colors text-sm md:text-base">2. La règle des 3 mois vs 6 mois : la vérité selon les ambassades</a></li>
          <li><a href="#erreur-virement" className="text-amber-500 hover:text-amber-400 hover:underline transition-colors text-sm md:text-base">3. L'erreur fatale : le virement de dernière minute</a></li>
          <li><a href="#types-comptes" className="text-amber-500 hover:text-amber-400 hover:underline transition-colors text-sm md:text-base">4. Quels types de comptes bancaires sont acceptés ?</a></li>
          <li><a href="#taux-change" className="text-amber-500 hover:text-amber-400 hover:underline transition-colors text-sm md:text-base">5. La règle d'or du taux de change (EUR / THB)</a></li>
          <li><a href="#soft-power" className="text-amber-500 hover:text-amber-400 hover:underline transition-colors text-sm md:text-base">6. Le cas spécifique du DTV &quot;Soft Power&quot;</a></li>
          <li><a href="#visa-run" className="text-amber-500 hover:text-amber-400 hover:underline transition-colors text-sm md:text-base">7. Organiser son Visa Run : le timing parfait</a></li>
        </ul>
      </nav>

      {/* ── SECTION 1 ── */}
      <section className="mb-12">
        <h2 id="logique-financiere" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          1. Pourquoi la Thaïlande exige-t-elle 500 000 THB ?
        </h2>
        <p className="mb-4">
          Avant de parler des délais, il est crucial de comprendre la logique derrière cette
          exigence. Le gouvernement thaïlandais a créé le Visa DTV pour attirer des profils
          qualifiés et des passionnés de culture (via la catégorie Soft Power), mais il souhaite
          s&apos;assurer que ces résidents ne se retrouveront pas en difficulté financière sur son
          territoire.
        </p>
        <p>
          La somme de 500 000 Bahts n&apos;est{' '}
          <strong className="text-white">ni une taxe, ni un droit d&apos;entrée, ni un dépôt conservé
          par l&apos;État</strong>. Il s&apos;agit uniquement d&apos;une preuve de solvabilité correspondant
          approximativement à une année de salaire moyen confortable en Thaïlande. L&apos;officier
          consulaire veut simplement la certitude que vous disposez d&apos;un matelas de sécurité en
          cas de coup dur (frais médicaux imprévus, perte de revenus temporaire, retour d&apos;urgence
          en Europe).
        </p>
      </section>

      {/* ── SECTION 2 + TABLEAU ── */}
      <section className="mb-12">
        <h2 id="delais-ambassades" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          2. La règle des 3 mois vs 6 mois : la vérité selon les ambassades
        </h2>
        <p className="mb-4">
          C&apos;est ici que la confusion règne en maître. La réponse est en réalité :{' '}
          <strong className="text-white">cela dépend d&apos;où vous déposez votre dossier.</strong>{' '}
          Chaque ambassade et consulat royal de Thaïlande possède un pouvoir discrétionnaire sur
          l&apos;application des directives d&apos;immigration.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">
          L&apos;approche stricte : l&apos;ambassade de Paris
        </h3>
        <p className="mb-5">
          Si vous faites vos démarches depuis la France, attendez-vous au niveau d&apos;exigence le
          plus élevé. Comme l'indique {' '}
          <a href="https://paris.thaiembassy.org/fr/publicservice/destination-thailand-visa-dtv" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:underline font-medium">le site officiel de l'ambassade de Paris</a>,
          il est très fréquemment demandé un historique bancaire irréprochable sur les{' '}
          <strong className="text-white">6 derniers mois</strong>. Le solde ne doit à aucun moment
          descendre sous l&apos;équivalent de 500 000 THB sur ce semestre entier.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
          La voie de la souplesse : les ambassades en Asie
        </h3>
        <p className="mb-6">
          C&apos;est la stratégie que nous recommandons massivement à nos clients. En optant pour un
          dépôt dans les pays limitrophes (Laos, Cambodge, Malaisie), la norme s&apos;assouplit à{' '}
          <strong className="text-white">3 mois d&apos;historique</strong> — un gain de temps
          inestimable pour préparer votre départ.
        </p>

        {/* TABLEAU COMPARATIF */}
        <div className="overflow-x-auto rounded-2xl border border-gray-800 mb-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#111111] border-b border-gray-800">
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Ambassade</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Délai exigé</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold hidden md:table-cell">Traduction FR</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold hidden md:table-cell">Traitement</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Difficulté</th>
              </tr>
            </thead>
            <tbody>
              {ambassades.map((a, i) => (
                <tr
                  key={a.ville}
                  className={`border-b border-gray-800/60 ${i % 2 === 0 ? 'bg-[#0d0d0d]' : 'bg-[#0a0a0a]'}`}
                >
                  <td className="px-4 py-3">
                    <span className="text-white font-semibold">{a.ville}</span>
                    <br />
                    <span className="text-gray-500 text-xs">{a.pays}</span>
                  </td>
                  <td className="px-4 py-3 font-bold text-white">{a.delai}</td>
                  <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{a.traduction}</td>
                  <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{a.traitement}</td>
                  <td className={`px-4 py-3 font-semibold ${a.difficulteColor}`}>{a.difficulte}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-600 italic mt-2">
          * Données issues de notre expérience terrain 2025–2026. Les pratiques consulaires peuvent évoluer.
        </p>
      </section>

      {/* ── SECTION 3 ── */}
      <section className="mb-12">
        <h2 id="erreur-virement" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          3. L&apos;erreur fatale : le virement de dernière minute
        </h2>
        <p className="mb-4">
          C&apos;est le <strong className="text-white">motif de refus numéro un</strong>. Vous vous
          apprêtez à déposer votre dossier et vous demandez à un proche de vous virer 13 000 €
          la veille de l&apos;impression de vos relevés. C&apos;est une très mauvaise idée.
        </p>
        <p className="mb-4">
          Les officiers consulaires sont formés pour détecter le{' '}
          <strong className="text-white">&quot;money parking&quot;</strong> — le fait de stationner
          temporairement de l&apos;argent pour obtenir un visa. Si vos relevés des mois 1 et 2
          affichent 1 500 € et que le mois 3 affiche soudainement 15 000 € sans justification
          claire (vente immobilière, dividendes d&apos;entreprise), votre demande sera rejetée.
        </p>
        <p>
          L&apos;argent doit avoir eu le temps de{' '}
          <strong className="text-white">&quot;vieillir&quot; sur votre compte</strong> pour prouver
          qu&apos;il vous appartient. L&apos;ambassade y verra sinon un prêt artificiel d&apos;un proche ou une
          tentative de manipulation.
        </p>
      </section>

      {/* ── SECTION 4 + TABLEAU COMPTES ── */}
      <section className="mb-12">
        <h2 id="types-comptes" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          4. Quels types de comptes bancaires sont acceptés ?
        </h2>
        <p className="mb-6">
          Avoir 13 000 € est une chose, mais la manière dont ils sont stockés en est une autre.
          Tous les supports ne sont pas égaux aux yeux de l&apos;immigration thaïlandaise :
        </p>

        <div className="space-y-3">
          {comptes.map((c) => (
            <div
              key={c.type}
              className={`flex items-start gap-4 p-4 rounded-xl border ${c.color}`}
            >
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">{c.type}</p>
                <p className="text-gray-400 text-sm mt-0.5">{c.note}</p>
              </div>
              <span className="text-sm font-bold whitespace-nowrap">{c.verdict}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 5 ── */}
      <section className="mb-12">
        <h2 id="taux-change" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          5. La règle d&apos;or du taux de change (EUR / THB)
        </h2>
        <p className="mb-4">
          Une erreur fréquente consiste à viser le strict minimum. Si le taux du jour indique
          que 500 000 THB équivalent à 12 800 €, et que vous présentez un relevé à 12 850 €,
          vous jouez avec le feu.
        </p>
        <p className="mb-4">
          Le taux fluctue constamment. Entre le moment où vous imprimez votre relevé et le jour
          où l&apos;officier traite votre dossier, l&apos;euro peut baisser par rapport au baht. Si
          l&apos;ambassade calcule ce jour-là que vos 12 850 € ne valent plus que 495 000 THB, le
          visa est refusé pour manque de fonds.
        </p>
        <div className="bg-amber-500/8 border border-amber-500/20 rounded-2xl p-5">
          <p className="text-amber-300 font-semibold text-sm">
            💡 Notre conseil : prévoyez toujours une marge de 10 à 15 %.
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Nous conseillons à nos clients de présenter un solde minimum de{' '}
            <strong className="text-white">14 500 € à 15 000 €</strong> pour être totalement à
            l&apos;abri des variations monétaires.
          </p>
        </div>
      </section>

      {/* ── SECTION 6 ── */}
      <section className="mb-12">
        <h2 id="soft-power" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          6. Le cas spécifique du DTV &quot;Soft Power&quot;
        </h2>
        <p className="mb-4">
          Si l&apos;exigence des 500 000 THB reste immuable pour tous les profils, le DTV Soft Power
          offre un{' '}
          <strong className="text-white">avantage colossal sur le reste de la documentation</strong>.
        </p>
        <p className="mb-4">
          En passant par une inscription en école de cuisine thaïlandaise certifiée, vous n&apos;avez
          plus besoin de justifier de fiches de paie, de contrats de travail ou de portfolio
          professionnel. L&apos;ambassade se concentre uniquement sur l&apos;inscription à l&apos;école et
          sur la validité de votre relevé bancaire.
        </p>
        <p>
          De plus, lors d&apos;un dépôt au Laos pour cette catégorie, les relevés bancaires en
          français passent généralement sans problème — vous économisant ainsi des centaines
          d&apos;euros en frais de traduction certifiée.
        </p>
      </section>

      {/* ── SECTION 7 ── */}
      <section className="mb-12">
        <h2 id="visa-run" className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          7. Organiser son Visa Run : le timing parfait
        </h2>

        <div className="space-y-4">
          {[
            {
              icon: '✈️',
              title: 'La soumission du dossier',
              text: <>Vous devez impérativement déposer votre demande via une ambassade située à l'étranger, soit physiquement, soit sur <a href="https://www.thaievisa.go.th/" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:underline">le portail gouvernemental Thai e-Visa</a> (selon l'ambassade dont vous dépendez).</>,
            },
            {
              icon: '🗓️',
              title: 'La durée du séjour',
              text: "Prévoyez un voyage de 5 nuits (ex : lundi au samedi). Dépôt en début de semaine, traitement sous 3 jours ouvrables à Vientiane, récupération le vendredi.",
            },
            {
              icon: '⚠️',
              title: 'Les pièges du calendrier',
              text: "Attention aux jours fériés — l'ambassade de Vientiane ferme lors des jours fériés laotiens ET thaïlandais. Un mauvais calcul peut vous bloquer une semaine de plus.",
            },
            {
              icon: '💵',
              title: 'Le règlement',
              text: "Les frais consulaires (10 000 THB) se règlent exclusivement en espèces au guichet de l'ambassade. Aucune carte bancaire n'est acceptée.",
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 p-4 bg-white/3 border border-gray-800 rounded-xl">
              <span className="text-2xl leading-none mt-0.5">{item.icon}</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">{item.title}</p>
                <p className="text-gray-400 text-sm">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 8 ── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white mb-4">
          8. L&apos;angoisse du dossier refusé : ne laissez pas de place au hasard
        </h2>
        <p className="mb-4">
          Préparer un dossier consulaire est stressant. Entre les calculs de taux de change,
          la sélection des bonnes lignes comptables, l&apos;inscription officielle à une école locale
          et la planification des vols vers le Laos, la moindre erreur entraîne la perte des
          frais d&apos;ambassade <strong className="text-white">(non remboursables)</strong> et retarde
          votre projet de vie.
        </p>
        <ul className="space-y-2 mb-4">
          {[
            'Analyse millimétrée de vos relevés bancaires pour s\'assurer de leur conformité.',
            'Inscription officielle à l\'école de cuisine (pour la voie Soft Power).',
            'Montage du dossier consulaire parfait pour l\'ambassade de Vientiane.',
            'Organisation intégrale de votre logistique (vols régionaux, hôtels, transferts) pour un Visa Run sans stress.',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-gray-400">
              <span className="text-amber-400 mt-0.5 flex-none">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ── ENCART AUTEUR (E-E-A-T) ── */}
      <div className="my-14 bg-[#111111] border border-gray-800 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-6 shadow-lg">
        <div className="w-24 h-24 rounded-full bg-gray-800 flex-shrink-0 overflow-hidden border-2 border-amber-500/50">
          <div className="w-full h-full bg-gradient-to-br from-amber-500/20 to-emerald-500/20 flex items-center justify-center text-3xl">🇹🇭</div>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-1">Matthieu Moretti</h3>
          <p className="text-amber-500 text-xs font-semibold mb-3 uppercase tracking-wider">Entrepreneur & Expert Expatriation</p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Entrepreneur digital installé à Phuket, j'accompagne les freelances et porteurs de projet dans leur installation en Thaïlande. Mon objectif : vous éviter les pièges administratifs grâce à une expertise forgée directement sur le terrain, au contact des réalités de l'immigration.
          </p>
        </div>
      </div>

      {/* ── FAQ ── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white mb-3">
          FAQ — Vos questions les plus fréquentes
        </h2>
        <p className="text-gray-400 mb-6 text-sm">
          Pour toute autre interrogation concernant les statuts (Freelance, Famille, Soft Power), consultez notre <Link href="/faq" className="text-amber-500 hover:underline font-medium">Foire Aux Questions complète</Link>.
        </p>

        <div className="space-y-4">
          {faqSchema.mainEntity.map((item) => (
            <details
              key={item.name}
              className="group border border-gray-800 rounded-xl overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none bg-[#111111] hover:bg-[#161616] transition-colors">
                <span className="text-white font-semibold text-sm">{item.name}</span>
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
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#F59E0B] opacity-8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500 opacity-5 rounded-full blur-3xl pointer-events-none" />

        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 relative z-10">
          Sécurisez votre expatriation avec DTV-Thaïlande
        </h3>
        <p className="text-gray-400 mb-8 relative z-10 text-sm md:text-base">
          Un relevé mal traduit, un historique trop court ou une mauvaise planification peuvent
          entraîner un refus immédiat. Nous prenons en charge l&apos;analyse de vos critères
          financiers, votre inscription en école certifiée et l&apos;organisation logistique de votre
          Visa Run.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-white text-black font-bold text-sm py-4 px-7 rounded-full hover:bg-gray-100 active:scale-95 transition-all duration-300"
          >
            Vérifier mon éligibilité — 2 min
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-transparent text-white font-semibold text-sm py-4 px-7 rounded-full border border-gray-700 hover:border-gray-500 hover:bg-white/5 transition-all duration-300"
          >
            Demander un devis sur-mesure
          </Link>
        </div>
      </div>

    </article>
  );
}