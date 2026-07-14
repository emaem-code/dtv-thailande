import Link from 'next/link';
import BlogNavigation from '../../components/BlogNavigation';
import {
  createArticleMetadata,
  createArticleSchema,
  createBreadcrumbSchema,
  getBlogPost,
} from '../posts';

const post = getBlogPost('arrivee-thailande-aeroport-immigration-taxi-visa-dtv');
const articleSchema = createArticleSchema(post);
const breadcrumbSchema = createBreadcrumbSchema(post);

export const metadata = createArticleMetadata(post);

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Faut-il remplir le TDAC si j'ai déjà un visa DTV ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui. Le TDAC est obligatoire pour toute personne entrant sur le territoire thaïlandais, quel que soit son statut ou son type de visa.",
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on payer le taxi avec une carte bancaire à Bangkok ou Phuket ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Les taxis traditionnels exigent généralement un paiement en espèces. Pour payer par carte, utilisez plutôt Grab, Bolt ou l'Airport Rail Link à Bangkok.",
      },
    },
    {
      '@type': 'Question',
      name: "Combien de temps prend l'immigration à Suvarnabhumi ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Le passage peut prendre 20 minutes en heures creuses, mais dépasser 2 heures en haute saison. Avoir le TDAC rempli et les documents imprimés accélère le contrôle.",
      },
    },
    {
      '@type': 'Question',
      name: 'Le TM30 est-il obligatoire pour un visa DTV ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui. Sans reçu TM30, l'immigration peut refuser le rapport des 90 jours ou l'extension de 180 jours liée au Visa DTV.",
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on vraiment vivre sans cash en Thaïlande avec une carte Wise ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Presque. Wise, Grab et les QR codes ThaiQR couvrent la majorité du quotidien. Il reste recommandé de prévoir du cash pour les 20 000 THB demandés à l'entrée et certains frais consulaires.",
      },
    },
  ],
};

export default function ArriveeThailandeAeroportImmigrationTaxiVisaDtv() {
  return (
    <article className="max-w-3xl mx-auto px-5 md:px-6 py-14 md:py-20 font-sans text-gray-300 leading-relaxed bg-[#0a0a0a]">
      <BlogNavigation variant="article-top" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, breadcrumbSchema, faqSchema]) }}
      />

      <header className="mb-12 border-b border-gray-800 pb-10">
        <span className="inline-block rounded-full border border-sky-500/25 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sky-400 mb-5">
          Formalités · Arrivée 2026
        </span>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
          Arrivée en Thaïlande 2026 : <span className="text-sky-400">aéroport, immigration, taxi et Visa DTV</span>
        </h1>

        <p className="text-base text-gray-500 mt-6">
          Lecture : 14 min · Mis à jour : {post.date} · Par{' '}
          <strong className="text-gray-400">Matthieu Moretti</strong>
        </p>
      </header>

      <div className="text-lg text-gray-400 mb-12 space-y-5">
        <p>
          L&apos;atterrissage à Bangkok ou Phuket marque le début d&apos;une nouvelle vie, mais
          franchir les portes de l&apos;aéroport demande aujourd&apos;hui une préparation
          chirurgicale. Entre la numérisation des formalités, les exigences financières de
          l&apos;immigration et les défis logistiques, l&apos;improvisation n&apos;est plus permise.
        </p>
        <p>
          Que vous veniez en touriste ou pour activer votre précieux{' '}
          <strong className="text-white">Visa DTV de 5 ans</strong>, voici le guide définitif pour
          naviguer sans stress dès votre descente de l&apos;avion, sécuriser votre connectivité, et
          valider les premières étapes indispensables au maintien de votre statut.
        </p>
      </div>

      <nav className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 mb-12 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Au programme de ce guide :</h2>
        <ul className="space-y-3">
          <li><a href="#aeroports" className="text-sky-400 hover:text-sky-300 hover:underline transition-colors text-sm md:text-base">1. Suvarnabhumi ou Phuket : à quoi s&apos;attendre ?</a></li>
          <li><a href="#immigration" className="text-sky-400 hover:text-sky-300 hover:underline transition-colors text-sm md:text-base">2. Immigration 2026 : TDAC, attente et règles d&apos;or</a></li>
          <li><a href="#interrogatoire-dtv" className="text-sky-400 hover:text-sky-300 hover:underline transition-colors text-sm md:text-base">3. Que faire si l&apos;immigration questionne votre DTV ?</a></li>
          <li><a href="#connectivite" className="text-sky-400 hover:text-sky-300 hover:underline transition-colors text-sm md:text-base">4. Internet dès l&apos;atterrissage</a></li>
          <li><a href="#transports" className="text-sky-400 hover:text-sky-300 hover:underline transition-colors text-sm md:text-base">5. Taxis, VTC et train</a></li>
          <li><a href="#argent" className="text-sky-400 hover:text-sky-300 hover:underline transition-colors text-sm md:text-base">6. Argent, retraits et carte Wise</a></li>
          <li><a href="#erreurs" className="text-sky-400 hover:text-sky-300 hover:underline transition-colors text-sm md:text-base">7. Les erreurs fatales à éviter</a></li>
          <li><a href="#tm30" className="text-sky-400 hover:text-sky-300 hover:underline transition-colors text-sm md:text-base">8. TM30 : l&apos;étape indispensable du Visa DTV</a></li>
        </ul>
      </nav>

      <section id="aeroports" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">1. Suvarnabhumi vs Phuket : à quoi s&apos;attendre ?</h2>
        <p className="mb-4">
          Votre expérience d&apos;arrivée différera grandement selon votre porte d&apos;entrée. Il
          est crucial de ne pas confondre les infrastructures de la capitale avec celles de l&apos;île.
        </p>
        <div className="grid gap-4">
          <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-2">Aéroport de Suvarnabhumi, Bangkok - BKK</h3>
            <p>
              C&apos;est un hub gigantesque. Les distances de marche sont longues, mais l&apos;avantage
              majeur reste sa connectivité : vous disposez d&apos;un train direct, l&apos;Airport Rail
              Link, au sous-sol pour rejoindre le centre-ville sans subir le trafic routier.
            </p>
          </div>
          <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-2">Aéroport international de Phuket - HKT</h3>
            <p>
              Plus petit, mais souvent congestionné. Ici, pas de train : vous dépendez entièrement du
              réseau routier pour rejoindre Patong, Rawai, Kathu ou Phuket Town. Le choix entre taxi,
              Grab, Bolt ou InDrive devient donc beaucoup plus stratégique.
            </p>
          </div>
        </div>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-[#111111]">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="border-b border-white/10 text-xs uppercase tracking-widest text-sky-400">
              <tr>
                <th className="px-5 py-4">Critère</th>
                <th className="px-5 py-4">Bangkok Suvarnabhumi</th>
                <th className="px-5 py-4">Phuket HKT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-gray-400">
              <tr>
                <td className="px-5 py-4 font-semibold text-white">Taille</td>
                <td className="px-5 py-4">Très grand hub international</td>
                <td className="px-5 py-4">Aéroport plus compact, mais vite saturé</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-white">Transport direct</td>
                <td className="px-5 py-4">Airport Rail Link au sous-sol</td>
                <td className="px-5 py-4">Route uniquement : taxi, Grab, Bolt ou InDrive</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-white">Point de vigilance</td>
                <td className="px-5 py-4">Longues distances de marche</td>
                <td className="px-5 py-4">Trafic vers Patong, Rawai, Kathu ou Phuket Town</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="immigration" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">2. Immigration 2026 : TDAC, temps d&apos;attente et règles d&apos;or</h2>
        <p className="mb-4">
          Le passage de l&apos;immigration s&apos;est métamorphosé. L&apos;ancien formulaire papier
          TM6 a disparu au profit d&apos;un écosystème numérique beaucoup plus strict.
        </p>
        <ul className="space-y-3 mb-6 pl-4 border-l-2 border-gray-800 text-gray-400 text-sm">
          <li>
            <strong className="text-white">Temps de passage :</strong> prévoyez 20 à 45 minutes aux
            heures creuses, mais jusqu&apos;à 2 heures en très haute saison. Allez aux toilettes avant
            de vous engager dans la file.
          </li>
          <li>
            <strong className="text-white">TDAC obligatoire :</strong> la Thailand Digital Arrival
            Card doit être remplie en ligne dans les 72 heures précédant votre arrivée.
          </li>
          <li>
            <strong className="text-white">e-Visa imprimé :</strong> malgré la numérisation, gardez
            une copie papier de votre approbation e-Visa. Ne comptez jamais uniquement sur votre
            smartphone.
          </li>
          <li>
            <strong className="text-white">Règle des 20 000 THB :</strong> vous devez pouvoir
            justifier de 20 000 THB en espèces, ou équivalent en euros/dollars, par voyageur.
          </li>
        </ul>
        <div className="border border-red-500/30 bg-red-500/5 rounded-xl p-5 mb-4">
          <p className="text-red-100">
            Les distributeurs étant situés après la douane, préparez ce montant depuis la France pour
            éviter tout risque de refoulement.
          </p>
        </div>
      </section>

      <section id="interrogatoire-dtv" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">3. Que faire si l&apos;immigration vous questionne sur votre DTV ?</h2>
        <p className="mb-4">
          Le Visa DTV étant très convoité, certains agents peuvent se montrer pointilleux lors de
          votre première entrée. L&apos;objectif n&apos;est pas de raconter votre vie : il faut rester
          clair, calme et cohérent.
        </p>
        <ul className="space-y-3 mb-6 pl-4 border-l-2 border-gray-800 text-gray-400 text-sm">
          <li>
            <strong className="text-white">Soyez concis :</strong> si vous avez obtenu le DTV via le
            Soft Power, dites simplement que vous venez étudier. Si vous êtes freelance, expliquez
            que vous travaillez à distance pour des clients étrangers.
          </li>
          <li>
            <strong className="text-white">Ne dites jamais :</strong> que vous cherchez du travail en
            Thaïlande. Le DTV ne sert pas à intégrer le marché du travail local.
          </li>
          <li>
            <strong className="text-white">Gardez vos preuves :</strong> lettre d&apos;acceptation
            d&apos;école, contrats, preuves de revenus, réservation d&apos;hôtel et documents
            consulaires imprimés.
          </li>
          <li>
            <strong className="text-white">Restez poli :</strong> le fameux sourire thaï commence au
            guichet. Ne vous énervez jamais, même si l&apos;agent semble insistant.
          </li>
        </ul>
      </section>

      <section id="connectivite" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">4. Connectivité : avoir internet dès l&apos;atterrissage</h2>
        <p className="mb-4">
          Accéder à Internet est votre première priorité pour commander un transport, consulter vos
          documents ou rassurer vos proches.
        </p>
        <div className="grid gap-4">
          <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-2">Wi-Fi de l&apos;aéroport</h3>
            <p>
              Le réseau AOT Airport Free Wi-Fi offre une connexion gratuite après inscription. Utilisez
              un VPN si vous devez accéder à des comptes sensibles sur ce réseau public.
            </p>
          </div>
          <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-2">eSIM avant le départ</h3>
            <p>
              Saily ou Airalo permettent d&apos;être connecté dès l&apos;atterrissage pour quelques
              euros, tout en gardant votre ligne française active pour recevoir vos SMS bancaires.
            </p>
          </div>
          <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-2">Carte SIM locale en ville</h3>
            <p>
              Pour AIS ou TrueMove, attendez d&apos;être en ville. Les forfaits 30 jours avec 5G y
              coûtent souvent entre 299 et 599 THB. Votre passeport sera demandé pour l&apos;enregistrement.
            </p>
          </div>
        </div>
      </section>

      <section id="transports" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">5. Quitter l&apos;aéroport : taxis, VTC et train</h2>
        <p className="mb-4">
          S&apos;extraire de l&apos;aéroport demande de choisir la bonne option pour éviter les tarifs
          abusifs et les mauvaises surprises.
        </p>
        <ul className="space-y-3 mb-6 pl-4 border-l-2 border-gray-800 text-gray-400 text-sm">
          <li>
            <strong className="text-white">Airport Rail Link (À Bangkok uniquement) :</strong> c&apos;est
            l&apos;arme absolue pour contourner les embouteillages. Le trajet coûte maximum 45 THB et le paiement sans contact (Tap-to-Pay) avec une carte bancaire est actif aux portiques.
          </li>
          <li>
            <strong className="text-white">Taxis Publics (Taxi-Meter) :</strong> option de dernier recours uniquement. Paiement en espèces obligatoire — compteur + taxe aéroport (50 THB à Bangkok, 100 THB à Phuket) + péages autoroutiers. À éviter si vous avez votre téléphone chargé.
          </li>
          <li>
            <strong className="text-white">Les applications VTC (Grab, Bolt, InDrive) :</strong> c&apos;est la solution recommandée. Prix fixé à l&apos;avance, zéro négociation, et paiement directement par carte bancaire dans l&apos;application — votre carte Wise fonctionne parfaitement.
          </li>
        </ul>
        <div className="border border-sky-500/30 bg-sky-500/5 rounded-xl p-5">
          <p>
            Grab reste la référence pour la fiabilité, Bolt et InDrive cassent les prix. À titre d&apos;exemple, un trajet depuis l&apos;aéroport de Phuket vers Kathu coûte en moyenne <strong className="text-white">570 à 680 THB avec Bolt</strong>, payable par carte sans aucun cash.
          </p>
        </div>
      </section>

      <section id="argent" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">6. Argent : retraits, change et carte Wise</h2>
        <p className="mb-4">
          La Thaïlande facture cher l&apos;accès à votre argent. Voici comment optimiser vos premiers
          bahts sans multiplier les frais inutiles.
        </p>
        <p className="mb-4 text-white font-semibold">
          Pour ceux qui préfèrent opérer en cash ou qui n&apos;ont pas encore de carte Wise, voici comment minimiser les frais :
        </p>
        <ul className="space-y-3 mb-6 pl-4 border-l-2 border-gray-800 text-gray-400 text-sm">
          <li>
            <strong className="text-white">Taxe ATM de 220 THB :</strong> chaque retrait avec une
            carte étrangère vous sera facturé environ 6 €. La stratégie consiste à faire de gros retraits d&apos;un coup (jusqu&apos;à 30 000 THB) pour diluer ces frais fixes.
          </li>
          <li>
            <strong className="text-white">Superrich à Suvarnabhumi :</strong> ignorez les kiosques du hall d&apos;arrivée et descendez au Niveau B (sous-sol). Les guichets Superrich y offrent d&apos;excellents taux.
          </li>
        </ul>

        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 mb-4">
          <h3 className="text-xl font-bold text-white mb-2">La carte Wise : le game changer de l&apos;expatrié en 2026</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            En pratique, une carte Wise suffit à couvrir l&apos;essentiel de votre quotidien en
            Thaïlande dès le premier jour. Paiement en THB au taux interbancaire réel sur tous vos achats,
            scan de QR codes ThaiQR/PromptPay directement depuis l&apos;application, et règlement de vos
            courses Grab par carte — vous vous déplacez et payez comme un local sans jamais sortir un billet
            de votre poche. C&apos;est une expérience testée et validée sur le terrain à Phuket en 2026.
          </p>
        </div>

        <div className="border border-amber-500/30 bg-amber-500/5 rounded-xl p-5">
          <h3 className="text-xl font-bold text-white mb-2">Quel est le vrai besoin en cash ?</h3>
          <p className="mb-3 text-sm text-gray-300">
            Avec Wise, le besoin d&apos;espèces se réduit à deux situations très précises : les
            <strong className="text-white"> 20 000 THB exigés à l&apos;entrée</strong> par
            l&apos;immigration thaïlandaise (à préparer depuis la France), et les frais consulaires lors d&apos;un Visa Run.
          </p>
          <p className="text-sm text-gray-300">
            Prévoyez environ <strong className="text-white">600 € en liquide</strong> pour couvrir ces
            deux cas incompressibles. Pour tout le reste, Wise s&apos;en charge.
          </p>
        </div>
      </section>

      <section id="erreurs" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">7. Les 5 erreurs fatales à ne jamais faire à l&apos;aéroport</h2>
        <ol className="space-y-3 mb-6 pl-4 border-l-2 border-gray-800 text-gray-400 text-sm">
          <li>
            <strong className="text-white">Arriver sans espèces ni carte Wise :</strong> l&apos;exigence des 20 000 THB à la douane et les frais consulaires des visa runs rendent environ 600 € en liquide indispensables. Pour tout le reste, une carte Wise élimine le besoin de cash au quotidien. L&apos;erreur fatale est d&apos;arriver sans l&apos;un ni l&apos;autre.
          </li>
          <li>
            <strong className="text-white">Ne pas imprimer son e-Visa :</strong> votre téléphone peut
            s&apos;éteindre, perdre le réseau ou buguer au mauvais moment.
          </li>
          <li>
            <strong className="text-white">Suivre les rabatteurs de taxis :</strong> utilisez les
            bornes officielles ou vos applications VTC.
          </li>
          <li>
            <strong className="text-white">Acheter la première carte SIM venue :</strong> les kiosques
            touristiques sont souvent beaucoup plus chers.
          </li>
          <li>
            <strong className="text-white">Ne pas avoir l&apos;adresse exacte :</strong> le TDAC, le
            chauffeur et parfois l&apos;immigration peuvent vous la demander.
          </li>
        </ol>
      </section>

      <section id="tm30" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">8. Le TM30 : l&apos;étape indispensable pour votre Visa DTV</h2>
        <p className="mb-4">
          Votre arrivée ne s&apos;achève pas lorsque vous posez vos valises. Le TM30, déclaration de
          résidence, est le pilier légal de votre installation.
        </p>
        <ul className="space-y-3 mb-6 pl-4 border-l-2 border-gray-800 text-gray-400 text-sm">
          <li>
            <strong className="text-white">Obligation des 24 heures :</strong> votre propriétaire doit
            déclarer votre présence dans les 24 heures suivant votre arrivée.
          </li>
          <li>
            <strong className="text-white">Impact sur le DTV :</strong> sans reçu TM30, l&apos;immigration
            peut refuser votre rapport de 90 jours ou votre extension de 180 jours.
          </li>
          <li>
            <strong className="text-white">Stratégie :</strong> exigez ce justificatif avant toute
            signature de bail ou remise d&apos;acompte.
          </li>
        </ul>
        <p className="border border-amber-500/30 bg-amber-500/5 rounded-xl p-5">
          C&apos;est l&apos;une des garanties les plus simples pour protéger votre investissement dans
          le Visa DTV et profiter sereinement de vos 5 années de liberté.
        </p>
      </section>

      <div className="my-14 bg-[#111111] border border-gray-800 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-6 shadow-lg">
        <div className="w-24 h-24 rounded-full bg-gray-800 flex-shrink-0 overflow-hidden border-2 border-sky-500/50">
          <div className="w-full h-full bg-gradient-to-br from-sky-500/20 to-cyan-500/20 flex items-center justify-center text-3xl">🛂</div>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-1">Matthieu Moretti</h3>
          <p className="text-sky-400 text-xs font-semibold mb-3 uppercase tracking-wider">Expertise Visa DTV & Installation à Phuket</p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Basé en Thaïlande, j&apos;accompagne les candidats au Visa DTV dans la préparation de leur
            arrivée, la structuration de leur dossier et les premières démarches administratives sur
            place.
          </p>
        </div>
      </div>

      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 mb-12">
        <p className="text-white font-bold text-sm mb-4">📚 Pour préparer votre arrivée :</p>
        <ul className="space-y-3">
          <li>
            <Link href="/blog/tdac-thailande-carte-arrivee" className="text-amber-400 hover:text-amber-300 hover:underline text-sm transition-colors">
              → Remplir correctement le TDAC avant votre vol
            </Link>
          </li>
          <li>
            <Link href="/blog/guide-depot-dossier-evisa-dtv" className="text-amber-400 hover:text-amber-300 hover:underline text-sm transition-colors">
              → Comprendre le dépôt e-Visa DTV
            </Link>
          </li>
          <li>
            <Link href="/blog/fonds-bancaires-visa-dtv" className="text-amber-400 hover:text-amber-300 hover:underline text-sm transition-colors">
              → Préparer votre preuve financière DTV
            </Link>
          </li>
        </ul>
      </div>

      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white mb-6">FAQ : arrivée en Thaïlande et Visa DTV</h2>
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

      <div className="mt-4 bg-[#111111] border border-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500 opacity-10 rounded-full blur-3xl" />
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 relative z-10">
          Préparez votre arrivée sans stress
        </h3>
        <p className="text-gray-400 mb-8 text-sm md:text-base relative z-10">
          TDAC, e-Visa imprimé, preuves financières, TM30 et installation locale : nous pouvons
          vérifier votre dossier avant le départ et sécuriser vos premières démarches en Thaïlande.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 relative z-10">
          <Link href="/contact" className="inline-flex items-center justify-center bg-white text-black font-bold text-sm py-4 px-7 rounded-full hover:bg-gray-100 transition-all duration-300">
            Faire auditer mon arrivée
          </Link>
          <Link href="/" className="inline-flex items-center justify-center border border-white/20 text-white font-bold text-sm py-4 px-7 rounded-full hover:bg-white/5 transition-all duration-300">
            Découvrir notre accompagnement
          </Link>
        </div>
      </div>

      <BlogNavigation variant="article-bottom" />
    </article>
  );
}