import Link from 'next/link';
import { BlogNavigation } from '@/components/BlogNavigation'; // Ajuste le chemin d'import selon ton architecture
import {
  createArticleMetadata,
  createArticleSchema,
  createBreadcrumbSchema,
  getBlogPost,
} from '@/app/admin/blogArticleTemplate'; // Ajuste le chemin selon ton fichier utilitaire

export async function generateMetadata(): Promise<Metadata> {
  const post = getBlogPost('paiement-thailande-sans-compte-bancaire-visa-dtv');
  return createArticleMetadata(post);
}

export default function PaiementThailandePage() {
  const post = getBlogPost('paiement-thailande-sans-compte-bancaire-visa-dtv');
  const articleSchema = createArticleSchema(post);
  const breadcrumbSchema = createBreadcrumbSchema(post);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Peut-on vraiment vivre sans cash en Thaïlande avec Wise en 2026 ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'À 90-95%, oui. Wise via QR PromptPay et carte dématérialisée couvre l\'essentiel du quotidien. Le cash reste nécessaire pour les 20 000 THB demandés à l\'immigration, les achats de moins de 200 THB au 7-Eleven, et certaines factures locales.',
        },
      },
      {
        '@type': 'Question',
        name: 'Pourquoi ma carte Revolut est-elle facturée 3 à 5% en Thaïlande ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ce sont des frais d\'interchange que le commerçant répercute sur les cartes internationales. Wise QR PromptPay évite ce problème car le paiement transite par le réseau bancaire local thaïlandais — zéro frais d\'interchange, donc zéro surtaxe.',
        },
      },
      {
        '@type': 'Question',
        name: 'Peut-on retirer des espèces avec Wise aux ATM thaïlandais ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Non. Avec un compte Wise enregistré à une adresse thaïlandaise, les retraits ATM en Thaïlande sont bloqués — c\'est une restriction réglementaire de la Banque de Thaïlande. La solution : arriver avec 1 000 à 2 000€ en espèces et les changer au comptoir Superrich de l\'aéroport.',
        },
      },
      {
        '@type': 'Question',
        name: 'Comment payer au 7-Eleven avec Wise ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La carte Wise physique ou dématérialisée fonctionne sur les terminaux 7-Eleven, mais uniquement à partir de 200 THB d\'achat. En dessous de ce seuil, le paiement en espèces est obligatoire.',
        },
      },
      {
        '@type': 'Question',
        name: 'Pourquoi ma facture d\'eau est-elle refusée au 7-Eleven ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Si vous vivez en condo, votre facture d\'eau est émise par le bureau de gestion de l\'immeuble (Juristic Office) avec un code-barres interne non reconnu par le 7-Eleven. Seules les factures des régies publiques (MWA/PWA) y sont payables. Réglez au bureau de gestion en espèces ou via TrueMoney/mPAY.',
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-black text-gray-300 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <BlogNavigation variant="article-top" />

        <article className="mt-12">
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 text-sm font-medium text-amber-400 bg-amber-500/10 border border-amber-500/25 rounded-full">
                Finances · Vie Pratique
              </span>
              <span className="text-sm text-gray-500">{post.date}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Paiements en Thaïlande avec un Visa DTV :{' '}
              <span className="text-amber-400">la vraie stratégie sans compte bancaire (2026)</span>
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-700" />
                <span>Par Matthieu Moretti</span>
              </div>
              <span>•</span>
              <span>10 min de lecture</span>
            </div>
          </header>

          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              L'atterrissage à Bangkok ou Phuket marque le début d'une nouvelle vie. Mais dès les premiers jours, une réalité s'impose : les banques thaïlandaises ne veulent pas de vous. Kasikorn, Bangkok Bank, SCB, Krungsri — toutes refusent le Visa DTV. Pas de compte local, donc pas de prélèvement automatique, pas d'accès au système bancaire thaïlandais classique.
            </p>
            <p className="text-xl text-gray-400 leading-relaxed mb-12">
              Bonne nouvelle : en 2026, cette contrainte est largement contournable. Entre Wise qui vient d'intégrer officiellement le réseau PromptPay, les QR codes omniprésents et quelques astuces testées sur le terrain à Phuket, voici comment gérer vos paiements du quotidien sans jamais manquer d'argent — et sans payer de frais inutiles.
            </p>

            <nav className="bg-[#111111] border border-gray-800 rounded-xl p-6 mb-12">
              <h2 className="text-lg font-semibold text-white mb-4 mt-0">Sommaire</h2>
              <ul className="space-y-2 m-0 list-none p-0">
                <li><a href="#banques-thailandaises" className="text-gray-400 hover:text-amber-400 transition-colors">1. Pourquoi les banques thaïlandaises refusent le Visa DTV</a></li>
                <li><a href="#revolution-wise" className="text-gray-400 hover:text-amber-400 transition-colors">2. La révolution Wise de mai 2026</a></li>
                <li><a href="#piege-atm" className="text-gray-400 hover:text-amber-400 transition-colors">3. Le piège critique — les retraits ATM Wise bloqués</a></li>
                <li><a href="#taux-de-change" className="text-gray-400 hover:text-amber-400 transition-colors">4. La vérité sur les taux de change</a></li>
                <li><a href="#3-niveaux-paiement" className="text-gray-400 hover:text-amber-400 transition-colors">5. Les 3 niveaux de paiement en Thaïlande</a></li>
                <li><a href="#frais-revolut" className="text-gray-400 hover:text-amber-400 transition-colors">6. Pourquoi votre carte Revolut vous coûte 3 à 5% de plus</a></li>
                <li><a href="#astuce-alipay" className="text-gray-400 hover:text-amber-400 transition-colors">7. L'astuce Alipay pour les QR codes non reconnus</a></li>
                <li><a href="#verite-tagthai" className="text-gray-400 hover:text-amber-400 transition-colors">8. TAGTHAi — ce que c'est vraiment</a></li>
                <li><a href="#fiscalite" className="text-gray-400 hover:text-amber-400 transition-colors">9. Un mot sur la fiscalité — la contrepartie de la traçabilité</a></li>
                <li><a href="#strategie-recap" className="text-gray-400 hover:text-amber-400 transition-colors">10. La stratégie complète — récapitulatif pratique</a></li>
              </ul>
            </nav>

            <section id="banques-thailandaises" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-white mb-6">1. Pourquoi les banques thaïlandaises refusent le Visa DTV</h2>
              <p>
                Le DTV est techniquement classé comme un visa touristique de longue durée. Depuis le durcissement des règles de conformité bancaire en 2025, les banques thaïlandaises exigent un visa de type Non-Immigrant (travail, retraite, mariage, études) ou un visa LTR pour ouvrir un compte. Le DTV, malgré ses 5 ans de validité, ne confère pas de statut de résident au sens de la Banque de Thaïlande.
              </p>
              
              <div className="bg-amber-500/5 border border-amber-500/20 text-amber-200 rounded-lg p-6 my-6">
                <strong className="text-amber-400 block mb-2">💡 Testé personnellement sur le terrain</strong>
                Kasikorn, Bangkok Bank et SCB refusent systématiquement. Ce n'est pas une question de dossier ou de négociation avec le conseiller — c'est une politique de conformité générale appliquée à la lettre.
              </div>

              <p>
                Conséquence directe : vous devez construire une stratégie de paiement 100% autonome dès votre arrivée. Ce guide est cette stratégie.
              </p>
            </section>

            <section id="revolution-wise" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-white mb-6">2. La révolution Wise de mai 2026 — ce qui a vraiment changé</h2>
              <p>
                Depuis le 19 mai 2026, Wise opère en Thaïlande sous une licence officielle de la Banque de Thaïlande — première entreprise non bancaire à obtenir les cinq licences nécessaires. Ce n'est pas un détail technique : c'est un changement fondamental pour tous les expatriés sous Visa DTV.
              </p>
              
              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Ce que Wise permet désormais :</h3>
              <ul className="space-y-4 my-6 border-l-2 border-gray-800 pl-6 list-none">
                <li className="relative before:content-[''] before:absolute before:-left-[29px] before:top-2.5 before:w-2 before:h-2 before:bg-sky-500 before:rounded-full">
                  Scanner et payer n'importe quel QR code PromptPay ou ThaiQR directement depuis l'application — y compris chez les petits commerçants, les marchés et les particuliers.
                </li>
                <li className="relative before:content-[''] before:absolute before:-left-[29px] before:top-2.5 before:w-2 before:h-2 before:bg-sky-500 before:rounded-full">
                  Payer au taux interbancaire réel, sans marge de change cachée.
                </li>
                <li className="relative before:content-[''] before:absolute before:-left-[29px] before:top-2.5 before:w-2 before:h-2 before:bg-sky-500 before:rounded-full">
                  Utiliser la carte physique ou dématérialisée (Apple Wallet, Google Wallet) sur tous les terminaux de paiement.
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Les limites à connaître :</h3>
              <ul className="space-y-4 my-6 border-l-2 border-gray-800 pl-6 list-none">
                <li className="relative before:content-[''] before:absolute before:-left-[29px] before:top-2.5 before:w-2 before:h-2 before:bg-gray-500 before:rounded-full">
                  Maximum 10 000 THB par transaction pour les paiements PromptPay depuis le solde Wise — suffisant pour le quotidien, mais pas pour une caution d'appartement ou un gros achat.
                </li>
                <li className="relative before:content-[''] before:absolute before:-left-[29px] before:top-2.5 before:w-2 before:h-2 before:bg-gray-500 before:rounded-full">
                  Si vous aviez un compte Wise avant le 21 janvier 2026, les nouvelles règles s'appliquent à partir du 3 août 2026.
                </li>
                <li className="relative before:content-[''] before:absolute before:-left-[29px] before:top-2.5 before:w-2 before:h-2 before:bg-gray-500 before:rounded-full">
                  Les cartes Wise existantes liées à une adresse thaïlandaise seront remplacées gratuitement d'ici septembre 2026.
                </li>
              </ul>
              
              <p>
                Au quotidien à Phuket, Wise couvre l'essentiel : restaurants, supermarchés, Grab, marchés, commerces. C'est la solution principale pour les expatriés DTV.
              </p>
            </section>

            <section id="piege-atm" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-white mb-6">3. Le piège critique — les retraits ATM Wise bloqués en Thaïlande</h2>
              
              <div className="bg-red-500/5 border border-red-500/20 text-red-200 rounded-lg p-6 my-6">
                <strong className="text-red-400 block mb-2">⚠️ Attention : Restriction ATM</strong>
                C'est l'information que personne ne mentionne clairement. Avec le passage sous licence thaïlandaise, si votre compte Wise est enregistré avec une adresse en Thaïlande, <strong>les retraits aux distributeurs automatiques thaïlandais sont bloqués</strong>. Ce n'est pas un choix commercial de Wise — c'est une restriction réglementaire : la loi thaïlandaise réserve la distribution d'espèces aux banques traditionnelles.
              </div>

              <p>La carte Wise continue de fonctionner dans les ATM à l'étranger, mais plus en Thaïlande.</p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Ce que ça implique concrètement :</h3>
              <ul className="space-y-4 my-6 border-l-2 border-gray-800 pl-6 list-none">
                <li className="relative before:content-[''] before:absolute before:-left-[29px] before:top-2.5 before:w-2 before:h-2 before:bg-amber-500 before:rounded-full">
                  <strong>Arriver avec 1 000 à 2 000€ en espèces depuis la France</strong> — c'est la recommandation terrain absolue.
                </li>
                <li className="relative before:content-[''] before:absolute before:-left-[29px] before:top-2.5 before:w-2 before:h-2 before:bg-amber-500 before:rounded-full">
                  Vous pouvez transporter légalement jusqu'à l'équivalent de 20 000 USD (environ 18 000€) sans déclaration douanière — au-delà, la déclaration est obligatoire et la non-déclaration est une infraction pénale.
                </li>
                <li className="relative before:content-[''] before:absolute before:-left-[29px] before:top-2.5 before:w-2 before:h-2 before:bg-amber-500 before:rounded-full">
                  Changer votre cash au comptoir Superrich niveau B de l'aéroport — jamais aux kiosques du hall d'arrivée.
                </li>
                <li className="relative before:content-[''] before:absolute before:-left-[29px] before:top-2.5 before:w-2 before:h-2 before:bg-amber-500 before:rounded-full">
                  Payer ensuite un maximum par carte Wise et QR code pour préserver votre réserve d'espèces.
                </li>
              </ul>
            </section>

            <section id="taux-de-change" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-white mb-6">4. La vérité sur les taux de change</h2>
              <p>
                Quand vous cherchez "EUR/THB" sur Google, vous voyez le taux interbancaire — le taux de référence que les banques utilisent entre elles. Par exemple : 1€ = 38,50 THB.
              </p>
              <p>
                Ce taux n'existe pas dans les bureaux de change physiques. Vous obtiendrez toujours un taux inférieur — souvent 37 à 37,50 THB pour 1€. Sur 1 000€ échangés, ça représente 1 000 à 1 500 THB perdus, soit 25 à 40€.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Comment minimiser cette perte :</h3>
              <ul className="space-y-4 my-6 border-l-2 border-gray-800 pl-6 list-none">
                <li className="relative before:content-[''] before:absolute before:-left-[29px] before:top-2.5 before:w-2 before:h-2 before:bg-green-500 before:rounded-full">
                  Évitez les kiosques du hall d'arrivée à Suvarnabhumi — ce sont les pires taux de l'aéroport.
                </li>
                <li className="relative before:content-[''] before:absolute before:-left-[29px] before:top-2.5 before:w-2 before:h-2 before:bg-green-500 before:rounded-full">
                  Descendez au niveau B, comptoir Superrich — structurellement 2 à 3% meilleur que les guichets bancaires des zones touristiques.
                </li>
                <li className="relative before:content-[''] before:absolute before:-left-[29px] before:top-2.5 before:w-2 before:h-2 before:bg-green-500 before:rounded-full">
                  En ville, comparez plusieurs bureaux avant d'échanger de grosses sommes.
                </li>
                <li className="relative before:content-[''] before:absolute before:-left-[29px] before:top-2.5 before:w-2 before:h-2 before:bg-green-500 before:rounded-full">
                  Pour vos dépenses courantes, privilégiez Wise QR PromptPay — taux interbancaire réel, zéro marge.
                </li>
              </ul>
            </section>

            <section id="3-niveaux-paiement" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-white mb-6">5. Les 3 niveaux de paiement en Thaïlande</h2>
              <p>Voici la réalité terrain organisée clairement pour vous permettre d'anticiper chaque situation.</p>

              <div className="bg-[#111111] border border-gray-800 rounded-lg p-6 my-6">
                <h3 className="text-xl font-bold text-green-400 mb-4 mt-0 flex items-center gap-2">
                  <span>✅ Niveau 1 — Ce que Wise couvre</span>
                </h3>
                <ul className="space-y-2 mb-0 list-disc pl-5">
                  <li><strong>Restaurants, marchés, commerces :</strong> scan QR PromptPay ou ThaiQR depuis l'app Wise.</li>
                  <li><strong>Grab taxi et livraison repas :</strong> paiement carte Wise dans l'application.</li>
                  <li><strong>Supermarchés, pharmacies, centres commerciaux :</strong> carte physique ou dématérialisée sur terminal.</li>
                  <li><strong>7-Eleven :</strong> carte Wise acceptée sur terminal — mais attention au seuil.</li>
                </ul>
                <div className="mt-4 p-4 bg-black/50 rounded border border-gray-800 text-sm">
                  <strong className="text-amber-400">Le piège du 7-Eleven : le seuil des 200 THB.</strong> Vérifié sur le terrain : le réseau 7-Eleven impose un minimum de 200 THB d'achat pour accepter un paiement par carte internationale. Pour une bouteille d'eau ou un en-cas en dessous de ce seuil, c'est cash obligatoire. Une raison de plus de toujours garder des espèces sur soi.
                </div>
              </div>

              <div className="bg-[#111111] border border-gray-800 rounded-lg p-6 my-6">
                <h3 className="text-xl font-bold text-amber-400 mb-4 mt-0 flex items-center gap-2">
                  <span>⚠️ Niveau 2 — Ce que Wise ne couvre pas</span>
                </h3>
                <ul className="space-y-4 mb-0 list-none pl-0">
                  <li>
                    <strong className="text-white">Facture d'électricité :</strong> se règle au 7-Eleven avec le code-barres de la facture, en espèces, moyennant des frais de service minimes (15-20 THB).
                  </li>
                  <li>
                    <strong className="text-white">Facture d'eau — la nuance que personne n'explique :</strong> les factures émises directement par les régies publiques (MWA à Bangkok, PWA en province) sont payables au 7-Eleven. Mais si vous vivez en condo ou en résidence — comme la majorité des expatriés DTV — votre facture d'eau est émise par le bureau de gestion de l'immeuble (Juristic Office), avec un code-barres interne que le 7-Eleven ne reconnaît pas. Dans ce cas : règlement en espèces directement au bureau de gestion, ou via une application locale comme TrueMoney Wallet ou mPAY.
                  </li>
                </ul>
              </div>

              <div className="bg-[#111111] border border-gray-800 rounded-lg p-6 my-6">
                <h3 className="text-xl font-bold text-red-400 mb-4 mt-0 flex items-center gap-2">
                  <span>❌ Niveau 3 — Réservé aux banques thaïlandaises</span>
                </h3>
                <ul className="space-y-2 mb-0 list-disc pl-5">
                  <li>Prélèvements automatiques récurrents.</li>
                  <li>Virements exigeant un compte bancaire local par le bénéficiaire.</li>
                  <li>Services gouvernementaux nécessitant une identité bancaire thaïlandaise.</li>
                </ul>
              </div>
            </section>

            <div className="bg-[#111111] border border-gray-800 rounded-xl p-8 my-12">
              <h3 className="text-xl font-bold text-white mb-4 mt-0">D'autres guides indispensables pour votre DTV</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/blog/tdac-thailande-carte-arrivee" className="flex items-center gap-3 p-4 rounded-lg bg-black border border-gray-800 hover:border-sky-500/50 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-sky-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-500/20 transition-colors">
                    ✈️
                  </div>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">TDAC Thaïlande : guide de la carte d'arrivée</span>
                </Link>
                <Link href="/blog/fonds-bancaires-visa-dtv" className="flex items-center gap-3 p-4 rounded-lg bg-black border border-gray-800 hover:border-amber-500/50 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                    💰
                  </div>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Preuve bancaire Visa DTV : erreurs à éviter</span>
                </Link>
              </div>
            </div>

            <section id="frais-revolut" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-white mb-6">6. Pourquoi votre carte Revolut vous coûte 3 à 5% de plus</h2>
              <p>
                C'est l'une des questions les plus fréquentes dans les groupes Facebook d'expatriés. Des voyageurs constatent que leur carte Revolut est surtaxée de 3 à 5% par les commerçants. Ce n'est pas un bug de Revolut — c'est le commerçant qui répercute ses frais d'interchange bancaire sur les cartes internationales.
              </p>
              <p>
                Quand vous payez avec une carte Visa ou Mastercard étrangère, la transaction passe par les réseaux internationaux : frais d'interchange, frais de réseau, frais d'acquisition. Le commerçant se voit facturer 1,5 à 3% — et beaucoup transfèrent ce coût au client.
              </p>
              
              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Pourquoi Wise QR évite ce problème :</h3>
              <p>
                En scannant un QR PromptPay avec Wise, le paiement transite par le commutateur national thaïlandais — pas par Visa ou Mastercard. Le commerçant reçoit ses bahts instantanément, sans aucun frais de traitement. Il n'a donc aucune raison de vous surtaxer. Vous ne payez que les frais de conversion transparents de Wise, au taux interbancaire.
              </p>

              <div className="bg-amber-500/5 border border-amber-500/20 text-amber-200 rounded-lg p-6 my-6">
                <strong className="text-amber-400 block mb-2">💡 Conseil en or à retenir</strong>
                Méfiez-vous aussi de la conversion dynamique (DCC) : si un terminal vous propose de payer "en euros", refusez toujours — le taux appliqué inclut une marge bancaire exorbitante. Payez toujours et sans exception dans la devise locale (en bahts).
              </div>
            </section>

            <section id="astuce-alipay" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-white mb-6">7. L'astuce Alipay pour les QR codes non reconnus</h2>
              <p>
                Certains terminaux anciens ou QR codes personnels générés de manière atypique peuvent afficher une erreur lorsqu'ils sont scannés par Wise. L'astuce terrain qui fonctionne :
              </p>

              <ol className="space-y-4 my-6 list-decimal pl-5 text-gray-300">
                <li className="pl-2">Créez un compte Alipay</li>
                <li className="pl-2">Liez votre carte Wise à ce compte</li>
                <li className="pl-2">Scannez le QR code du commerçant depuis l'application Alipay</li>
                <li className="pl-2">Le paiement est débité sur Wise au taux interbancaire, le commerçant reçoit ses bahts via l'infrastructure PromptPay d'Alipay</li>
              </ol>

              <p>
                Cette combinaison Alipay + Wise sert de solution de secours pour les rares situations où le scan Wise direct échoue.
              </p>
            </section>

            <section id="verite-tagthai" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-white mb-6">8. TAGTHAi — ce que c'est vraiment</h2>
              <p>
                Beaucoup d'expatriés pensent que TAGTHAi, l'application promue par les agences de tourisme thaïlandaises, est un wallet pour le quotidien. C'est une erreur.
              </p>
              
              <ul className="space-y-4 my-6 border-l-2 border-gray-800 pl-6 list-none">
                <li className="relative before:content-[''] before:absolute before:-left-[29px] before:top-2.5 before:w-2 before:h-2 before:bg-gray-500 before:rounded-full">
                  <strong>TAGTHAi c'est :</strong> les pass touristiques (musées, temples, attractions) et le remboursement de TVA (VAT Refund) dans les grands centres commerciaux.
                </li>
                <li className="relative before:content-[''] before:absolute before:-left-[29px] before:top-2.5 before:w-2 before:h-2 before:bg-red-500 before:rounded-full">
                  <strong>TAGTHAi ce n'est pas :</strong> un substitut de compte bancaire. Son rechargement exige un déplacement physique à un guichet de change KBank avec passeport et espèces — impossible par virement ou carte. Et son scanner ne fonctionne qu'avec les QR codes d'entreprises affiliées au réseau KBank, pas avec les QR personnels des vendeurs de rue et chauffeurs de taxi.
                </li>
              </ul>
              <p className="font-semibold text-white">Pour le quotidien, c'est Wise. Point.</p>
            </section>

            <section id="fiscalite" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-white mb-6">9. Un mot sur la fiscalité — la contrepartie de la traçabilité</h2>
              <p>
                Le passage de Wise sous licence thaïlandaise a une conséquence de second ordre importante : chaque conversion vers le baht et chaque paiement PromptPay transite désormais par l'infrastructure financière régulée thaïlandaise.
              </p>
              <p>
                Pour rappel : après 180 jours passés en Thaïlande sur une année civile, vous devenez résident fiscal thaïlandais. Et depuis janvier 2024, les revenus étrangers rapatriés en Thaïlande par un résident fiscal sont imposables. Avec Wise local, vos flux sont documentés et traçables — ce qui est une bonne chose pour votre conformité, à condition d'anticiper votre situation fiscale.
              </p>
              <p>
                Ce sujet mérite un article dédié. Retenez simplement : la simplicité de paiement s'accompagne d'une transparence totale vis-à-vis de l'administration thaïlandaise.
              </p>
            </section>

            <section id="strategie-recap" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-white mb-6">10. La stratégie complète — récapitulatif pratique</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-[#111111] border border-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-white mb-4 mt-0">🛂 Avant de partir de France :</h3>
                  <ul className="space-y-3 mb-0 list-disc pl-5 text-sm">
                    <li>Ouvrez un compte Wise et commandez la carte physique (délai 1 à 2 semaines) ou activez la carte dématérialisée dans Apple Wallet ou Google Wallet</li>
                    <li>Prévoyez 1 000 à 2 000€ en espèces — largement sous le seuil de déclaration de 20 000 USD</li>
                    <li>Installez Wise, Grab et Alipay avant le départ</li>
                  </ul>
                </div>

                <div className="bg-[#111111] border border-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-white mb-4 mt-0">🛬 À l'aéroport :</h3>
                  <ul className="space-y-3 mb-0 list-disc pl-5 text-sm">
                    <li>Ne changez pas aux kiosques du hall d'arrivée</li>
                    <li>Descendez au niveau B de Suvarnabhumi, comptoir Superrich</li>
                    <li>Changez au meilleur taux disponible sur place</li>
                  </ul>
                </div>

                <div className="bg-[#111111] border border-gray-800 rounded-lg p-6 md:col-span-2">
                  <h3 className="text-lg font-bold text-white mb-4 mt-0">🛍️ Au quotidien :</h3>
                  <ul className="space-y-3 mb-0 list-disc pl-5 text-sm grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <li><strong>Paiements courants :</strong> Wise QR PromptPay ou carte dématérialisée</li>
                    <li><strong>Grab :</strong> carte Wise dans l'app</li>
                    <li><strong>7-Eleven :</strong> carte Wise si achat ≥ 200 THB, cash en dessous</li>
                    <li><strong>Facture électricité :</strong> cash au 7-Eleven avec code-barres</li>
                    <li><strong>Facture eau en condo :</strong> espèces au bureau de gestion, ou TrueMoney/mPAY</li>
                    <li><strong>QR non reconnus :</strong> Alipay lié à Wise</li>
                    <li><strong>Gros paiements (&gt;10 000 THB) :</strong> anticiper, la limite PromptPay Wise s'applique par transaction</li>
                  </ul>
                </div>
              </div>
            </section>

            <hr className="border-gray-800 my-16" />

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8">FAQ — Vos questions sur les paiements en Thaïlande</h2>
              
              <div className="space-y-4">
                <details className="group bg-[#111111] border border-gray-800 rounded-lg [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-white font-medium">
                    Peut-on vraiment vivre sans cash en Thaïlande avec Wise en 2026 ?
                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-400">
                    À 90-95%, oui. Wise via QR PromptPay et carte dématérialisée couvre l'essentiel du quotidien. Le cash reste nécessaire pour les 20 000 THB demandés à l'immigration, les achats de moins de 200 THB au 7-Eleven, et certaines factures locales.
                  </div>
                </details>

                <details className="group bg-[#111111] border border-gray-800 rounded-lg [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-white font-medium">
                    Pourquoi ma carte Revolut est-elle facturée 3 à 5% en Thaïlande ?
                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-400">
                    Ce sont des frais d'interchange que le commerçant répercute sur les cartes internationales. Wise QR PromptPay évite ce problème car le paiement transite par le réseau bancaire local thaïlandais — zéro frais d'interchange, donc zéro surtaxe.
                  </div>
                </details>

                <details className="group bg-[#111111] border border-gray-800 rounded-lg [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-white font-medium">
                    Peut-on retirer des espèces avec Wise aux ATM thaïlandais ?
                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-400">
                    Non. Avec un compte Wise enregistré à une adresse thaïlandaise, les retraits ATM en Thaïlande sont bloqués — c'est une restriction réglementaire de la Banque de Thaïlande. La solution : arriver avec 1 000 à 2 000€ en espèces et les changer au comptoir Superrich de l'aéroport.
                  </div>
                </details>

                <details className="group bg-[#111111] border border-gray-800 rounded-lg [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-white font-medium">
                    Comment payer au 7-Eleven avec Wise ?
                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-400">
                    La carte Wise physique ou dématérialisée fonctionne sur les terminaux 7-Eleven, mais uniquement à partir de 200 THB d'achat. En dessous de ce seuil, le paiement en espèces est obligatoire.
                  </div>
                </details>

                <details className="group bg-[#111111] border border-gray-800 rounded-lg [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-white font-medium">
                    Pourquoi ma facture d'eau est-elle refusée au 7-Eleven ?
                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-400">
                    Si vous vivez en condo, votre facture d'eau est émise par le bureau de gestion de l'immeuble (Juristic Office) avec un code-barres interne non reconnu par le 7-Eleven. Seules les factures des régies publiques (MWA/PWA) y sont payables. Réglez au bureau de gestion en espèces ou via TrueMoney/mPAY.
                  </div>
                </details>
                
                <details className="group bg-[#111111] border border-gray-800 rounded-lg [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-white font-medium">
                    Y a-t-il une limite au montant des paiements Wise PromptPay ?
                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-400">
                    Oui : 10 000 THB maximum par transaction. Pour les gros paiements (caution, loyer élevé, achat important), il faudra fractionner ou prévoir une alternative.
                  </div>
                </details>

                <details className="group bg-[#111111] border border-gray-800 rounded-lg [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-white font-medium">
                    Wise remplace-t-il un compte bancaire thaïlandais ?
                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-400">
                    Pour 90-95% du quotidien, oui. Pour les prélèvements automatiques, les paiements supérieurs à 10 000 THB par transaction et les services gouvernementaux, non.
                  </div>
                </details>
                
                <details className="group bg-[#111111] border border-gray-800 rounded-lg [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-white font-medium">
                    TAGTHAi peut-il servir pour les dépenses quotidiennes ?
                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-400">
                    Non. TAGTHAi est réservé aux pass touristiques et au VAT Refund. Son rechargement exige un déplacement physique à un guichet KBank et son scanner ne lit pas les QR codes personnels des petits commerçants.
                  </div>
                </details>
              </div>
            </section>

            <div className="mt-16 bg-gradient-to-br from-amber-500/20 to-amber-900/20 border border-amber-500/30 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4 mt-0">Besoin d'un audit pour votre dossier Visa DTV ?</h2>
              <p className="text-amber-100/80 mb-6">Ne laissez pas un détail gâcher votre projet d'expatriation en Thaïlande. Vérifions ensemble votre dossier et prévoyons votre arrivée sereinement.</p>
              <Link href="/contact" className="inline-block bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 px-8 rounded-full transition-colors">
                Contactez-moi
              </Link>
            </div>

          </div>
        </article>

        <BlogNavigation variant="article-bottom" />
      </div>
    </main>
  );
}