import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Comment déposer son dossier Visa DTV : Guide e-Visa Thaïlande",
  description: "Tutoriel étape par étape pour déposer votre demande de Visa DTV sur thaievisa.go.th. Évitez les refus, maîtrisez les formats et les délais de l'ambassade.",
  alternates: {
    canonical: 'https://www.dtv-thailande.fr/blog/guide-depot-dossier-evisa-dtv',
  },
  openGraph: {
    title: "Guide Complet : Comment déposer son dossier Visa DTV sur l'e-Visa",
    description: "Le tutoriel pour comprendre les pièges du portail gouvernemental thaïlandais et sécuriser votre expatriation.",
    url: 'https://www.dtv-thailande.fr/blog/guide-depot-dossier-evisa-dtv',
    siteName: 'DTV Thaïlande',
    locale: 'fr_FR',
    type: 'article',
    images: [
      {
        url: '/images/og-evisa-dtv.jpg', // Pense à ajouter une image avec ce nom dans ton dossier public/images/
        width: 1200,
        height: 630,
        alt: "Tutoriel dépôt e-Visa DTV Thaïlande",
      },
    ],
  }
};

export default function EVisaGuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://www.dtv-thailande.fr/blog/guide-depot-dossier-evisa-dtv"
        },
        "headline": "Guide Complet : Comment déposer son dossier Visa DTV sur le portail e-Visa Thaïlandais",
        "description": "Tutoriel étape par étape pour déposer votre demande de Visa DTV sur thaievisa.go.th et éviter les pièges consulaires.",
        "image": "https://www.dtv-thailande.fr/images/og-evisa-dtv.jpg",
        "author": {
          "@type": "Person",
          "name": "Matthieu Moretti",
          "url": "https://www.dtv-thailande.fr/a-propos"
        },
        "publisher": {
          "@type": "Organization",
          "name": "DTV Thaïlande",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.dtv-thailande.fr/logo.png"
          }
        },
        "datePublished": "2026-06-25T09:00:00+02:00",
        "dateModified": "2026-06-25T09:00:00+02:00"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Peut-on modifier sa demande sur le portail après l'avoir soumise ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Non. Une fois le paiement validé, la demande est scellée. Si vous avez fait une erreur, l'officier consulaire mettra votre dossier en statut 'Pending Document' pour vous demander une correction via le portail, ou rejettera directement la demande."
            }
          },
          {
            "@type": "Question",
            "name": "Puis-je déposer mon dossier physiquement à l'Ambassade de Paris ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Dans le cadre standard d'une demande de DTV, l'Ambassade Royale de Thaïlande à Paris a massivement numérisé ses services et privilégie exclusivement la procédure en ligne. Tout se fait via le portail officiel thaievisa.go.th."
            }
          },
          {
            "@type": "Question",
            "name": "Que signifie le statut 'Pending for Document' sur mon compte e-Visa ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Cela signifie que l'ambassade a audité votre dossier et qu'une pièce est manquante, illisible ou non conforme (très souvent une traduction manquante ou un relevé bancaire incomplet). Vous disposez d'un délai limité pour uploader le bon document directement sur le portail afin de débloquer l'instruction."
            }
          },
          {
            "@type": "Question",
            "name": "Combien de temps l'Ambassade met-elle pour traiter un e-Visa DTV depuis la France ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Selon les constats sur le terrain, le délai de traitement pour les résidents français oscille entre 3 et 4 semaines ouvrées. Il est fortement déconseillé de réserver des billets d'avion non remboursables avant la validation finale et la réception du visa par e-mail."
            }
          },
          {
            "@type": "Question",
            "name": "La plateforme e-Visa est-elle disponible en français ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Non. L'intégralité du portail gouvernemental (thaievisa.go.th), y compris les menus déroulants, les champs de saisie et les communications de l'ambassade, est exclusivement en anglais (ou en thaï)."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 bg-[#0a0a0a] text-gray-300">
        <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-5xl mb-8">
          Guide Complet : Comment déposer son dossier Visa DTV sur le portail e-Visa Thaïlandais
        </h1>

        <div className="prose prose-lg prose-invert max-w-none">
          <p className="text-xl text-gray-400 mb-8">
            L'ère des files d'attente interminables devant les ambassades est révolue. Depuis la mise en place du système officiel Thai e-Visa, l'intégralité de la demande pour le <strong className="text-white">Visa DTV Thaïlande</strong> (Destination Thailand Visa) depuis la France se déroule en ligne.
          </p>

          <p className="mb-4">
            Sur le papier, la promesse est séduisante : quelques clics, un formulaire numérique, et votre sésame pour l'expatriation ou le télétravail en Thaïlande arrive par e-mail.
          </p>
          <p className="mb-4">
            La réalité est beaucoup plus nuancée. Si l'interface informatique est accessible, les exigences consulaires cachées derrière chaque bouton sont d'une rigueur absolue. Une case mal cochée, un fichier trop lourd ou une traduction non conforme entraînent un refus catégorique de votre dossier, sans aucun remboursement des frais engagés.
          </p>
          <p className="mb-12">
            Voici le tutoriel étape par étape pour déposer votre demande de Visa DTV de manière autonome, ainsi que les pièges critiques à éviter à chaque stade de la procédure.
          </p>

          <hr className="my-8 border-white/10" />

          <h2 className="text-2xl font-bold text-amber-500 mt-10 mb-4">Étape 1 : La création du compte et l'enregistrement</h2>
          <p className="mb-4">
            La première étape consiste à vous rendre sur le portail officiel (<em>thaievisa.go.th</em>) pour créer votre profil candidat.
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-8 text-gray-300">
            <li><strong className="text-white">La procédure :</strong> Cliquez sur "Create an Account". Vous devrez fournir une adresse e-mail valide, créer un mot de passe sécurisé et renseigner vos informations d'identité de base.</li>
            <li><strong className="text-white">Le point de vigilance :</strong> Le nom et les prénoms saisis lors de la création du compte doivent correspondre à la virgule et au tiret près à la bande MRZ de votre passeport. Une incohérence orthographique à ce stade précoce bloque souvent l'édition finale du visa.</li>
          </ul>

          <h2 className="text-2xl font-bold text-amber-500 mt-10 mb-4">Étape 2 : Le choix stratégique de l'Ambassade (La juridiction)</h2>
          <p className="mb-4">
            C'est ici que de nombreux candidats autonomes commettent leur première erreur fatale. Le système vous demande de sélectionner l'ambassade ou le consulat qui traitera votre dossier. Bien que la procédure e-Visa soit numérique, elle n'est pas centralisée.
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-8 text-gray-300">
            <li><strong className="text-white">La règle stricte :</strong> Vous devez obligatoirement sélectionner l'ambassade du pays dans lequel vous vous trouvez physiquement au moment de la demande. Si vous êtes résident français et postulez depuis la France, vous devez sélectionner l'Ambassade Royale de Thaïlande à Paris.</li>
            <li><strong className="text-white">Le piège :</strong> Les exigences documentaires varient massivement d'une ambassade à l'autre. Ne tentez jamais de mentir sur votre géolocalisation pour contourner une règle : le portail enregistre les métadonnées de connexion, et les officiers consulaires vérifient minutieusement les tampons d'entrée et de sortie sur les scans de votre passeport pour s'assurer que vous êtes bien dans le pays déclaré.</li>
          </ul>

          <h2 className="text-2xl font-bold text-amber-500 mt-10 mb-4">Étape 3 : Le remplissage du formulaire de demande</h2>
          <p className="mb-4">
            Une fois votre profil créé et la juridiction validée, vous accédez au cœur du dossier. Vous devez naviguer dans une interface exclusivement en anglais. Voici les sélections exactes à effectuer :
          </p>
          <ul className="list-disc pl-6 space-y-4 mb-6 text-gray-300">
            <li><strong className="text-white">Purpose of Visit :</strong> Sélectionnez <code>Destination Thailand Visa (DTV)</code>.</li>
            <li><strong className="text-white">Visa Category :</strong> Vous ferez face à trois options strictes correspondant à votre profil.
              <ul className="list-circle pl-6 mt-3 space-y-3">
                <li><em>Workcation (Digital Nomad / Remote Worker) :</em> Le choix pour les freelances, dirigeants d'entreprise et salariés à distance. Attention, vous devrez prouver que vos revenus proviennent de l'extérieur de la Thaïlande. (Consultez notre <Link href="/blog/visa-dtv-freelance-auto-entrepreneur" className="text-emerald-500 hover:text-emerald-400 underline transition-colors">guide détaillé pour les freelances</Link> pour monter ce dossier spécifique).</li>
                <li><em>Soft Power (Muay Thai, Cuisine, Séminaires médicaux) :</em> Pour ceux qui viennent suivre une formation certifiée, assister à un séminaire ou recevoir un traitement médical long.</li>
                <li><em>Spouse and Children (Dépendant) :</em> Uniquement réservé aux conjoints mariés civilement et aux enfants légitimes de moins de 20 ans d'un titulaire principal du DTV. (Voir notre analyse approfondie sur <Link href="/blog/visa-dtv-couple-famille-pacs" className="text-emerald-500 hover:text-emerald-400 underline transition-colors">le piège du PACS et du DTV en famille</Link>).</li>
              </ul>
            </li>
          </ul>
          <p className="mb-8">
            C'est ici que la réalité du droit thaïlandais frappe les familles. Le visa "conjoint accompagnant" automatique n'existe pas. Chaque membre de la famille doit faire l'objet d'une demande distincte sur le portail.
          </p>

          <h2 className="text-2xl font-bold text-amber-500 mt-10 mb-4">Étape 4 : Le téléversement des justificatifs (Le champ de mines)</h2>
          <p className="mb-4">
            C'est l'étape qui génère la grande majorité des refus de visa DTV. L'interface vous demande de téléverser (uploader) vos preuves professionnelles, financières et d'identité.
          </p>
          <ul className="list-disc pl-6 space-y-4 mb-8 text-gray-300">
            <li><strong className="text-white">La contrainte technique :</strong> Le portail est archaïque sur la gestion des fichiers. Il n'accepte qu'un seul document PDF ou JPG par champ de téléchargement, avec une limite stricte de taille (qui varie généralement entre 3 Mo et 5 Mo selon les mises à jour). Si votre historique bancaire fait 15 pages, vous devrez le fusionner et le compresser sans détruire la résolution et la lisibilité du document, sous peine de rejet par l'officier consulaire.</li>
            <li><strong className="text-white">La barrière de la langue :</strong> L'administration thaïlandaise ne lit pas le français. Tout document officiel (Kbis, statuts de société, livret de famille, acte de naissance) doit impérativement faire l'objet d'une traduction assermentée en anglais ou en thaï, souvent suivie d'une légalisation en bonne et due forme. Fournir un extrait SIRENE brut ou un relevé bancaire sans traduction des entêtes est la garantie d'une mise en attente du dossier.</li>
          </ul>

          <h2 className="text-2xl font-bold text-amber-500 mt-10 mb-4">Étape 5 : Le paiement des frais consulaires</h2>
          <p className="mb-4">
            La dernière étape fige votre dossier. Vous devez vous acquitter des frais de visa (entre 350 € et 420 € selon le taux de change et les frais de plateforme applicables à votre juridiction).
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-8 text-gray-300">
            <li><strong className="text-white">L'avertissement financier :</strong> Ce paiement est ferme et définitif. Si, dans les jours qui suivent, l'ambassade rejette votre dossier à cause d'une traduction manquante, d'un PDF illisible ou d'un solde bancaire jugé non conforme, <strong className="text-white">ces frais ne vous seront jamais remboursés</strong>. Vous devrez reprendre la procédure à zéro, créer une nouvelle demande, et repayer l'intégralité de la somme.</li>
          </ul>

          <hr className="my-12 border-white/10" />

          <h2 className="text-3xl font-bold text-red-500 mt-10 mb-6">Les 5 motifs de refus les plus fréquents sur le portail e-Visa</h2>
          <p className="mb-6">
            L'ambassade ne fait pas de sentiment. Voici les erreurs qui mènent à un rejet automatique de votre dossier (et à la perte de vos frais consulaires) :
          </p>
          <ol className="list-decimal pl-6 space-y-4 mb-12 text-gray-300 marker:text-amber-500 marker:font-bold">
            <li><strong className="text-white">Le "Virement de la veille" :</strong> Présenter un relevé bancaire avec 500 000 THB fraîchement virés la semaine du dépôt. L'ambassade exige une stabilité sur 3 à 6 mois. (Découvrez les règles exactes de la <Link href="/blog/fonds-bancaires-visa-dtv" className="text-emerald-500 hover:text-emerald-400 underline transition-colors">preuve financière pour le DTV</Link>).</li>
            <li><strong className="text-white">L'erreur de juridiction :</strong> Vous postulez sur l'e-Visa de Paris alors que les tampons de votre passeport prouvent que vous êtes actuellement à Bali ou déjà en Thaïlande.</li>
            <li><strong className="text-white">L'absence de traduction assermentée :</strong> Fournir un document d'état civil (livret de famille) ou un document d'entreprise (Kbis) en français, non traduit et non légalisé.</li>
            <li><strong className="text-white">Le formatage des PDF :</strong> Téléverser des justificatifs tronqués, illisibles ou fractionnés car ils dépassaient la limite de poids autorisée par le portail.</li>
            <li><strong className="text-white">Le contrat de travail inadapté :</strong> Pour le motif <em>Workcation</em>, fournir un simple contrat de travail français classique sans avenant de télétravail international explicite autorisant le travail depuis l'étranger.</li>
          </ol>

          <h2 className="text-2xl font-bold text-amber-500 mt-10 mb-4">Délais de traitement : À quoi s'attendre avec l'Ambassade de Paris ?</h2>
          <p className="mb-4">
            Une fois le bouton <em>Submit</em> pressé et les frais payés, votre dossier passe en statut <code>Pending</code>. Actuellement, pour un dépôt via l'e-Visa à l'Ambassade de Paris, les retours terrain constatent un délai de traitement oscillant entre <strong className="text-white">3 et 4 semaines ouvrées</strong>. À titre de comparaison, une demande déposée depuis un pays limitrophe de la Thaïlande (Laos, Malaisie) peut parfois être traitée en 3 à 5 jours, ce qui souligne le niveau d'exigence et le volume de dossiers traités en France.
          </p>
          <p className="mb-12">
            Ce délai parisien peut s'allonger considérablement en cas de statut <code>Pending for Document</code> (l'officier consulaire met le dossier en pause et vous demande une pièce supplémentaire). Anticipez votre demande au minimum un mois et demi avant votre vol, mais pas plus de trois mois à l'avance, sous peine de voir l'ambassade exiger des relevés bancaires plus récents.
          </p>

          <h2 className="text-2xl font-bold text-amber-500 mt-10 mb-4">Et après ? L'arrivée de votre e-Visa</h2>
          <p className="mb-12">
            Si votre dossier franchit toutes ces étapes avec succès, son statut passera en <code>Approved</code>. Vous ne recevrez pas votre passeport par la poste avec un autocollant physique. Le e-Visa DTV vous sera envoyé directement par e-mail sous la forme d'un document PDF officiel. Vous devrez l'imprimer impérativement pour le présenter à la compagnie aérienne lors de l'enregistrement, puis à l'officier d'immigration à votre arrivée sur le territoire thaïlandais.
          </p>

          {/* CTA Box (Glassmorphism dark theme) */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 my-12 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mt-0 mb-4">Sécurisez votre expatriation avec une ingénierie consulaire sur-mesure</h2>
            <p className="text-gray-300 mb-4">
              Le portail e-Visa n'est qu'un outil informatique. La véritable difficulté du Visa DTV réside dans la structuration juridique et administrative de votre dossier en amont.
            </p>
            <p className="text-gray-300 mb-4">
              Les dirigeants d'entreprise, les freelances et les familles font face à des profils atypiques (gestion d'entreprise à distance, montages financiers complexes, statuts matrimoniaux multiples) qui ne rentrent pas parfaitement dans les cases préconçues de l'administration.
            </p>
            <p className="text-gray-300 mb-8">
              Si vous souhaitez éviter le stress des traductions assermentées, le cauchemar des fichiers PDF refusés et le risque de perdre des centaines d'euros en frais consulaires, notre équipe prend le relais. <strong className="text-white">De l'audit de votre situation financière à la soumission technique de vos fichiers sur le portail gouvernemental, nous gérons l'intégralité du processus de A à Z.</strong>
            </p>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-[#0a0a0a] bg-emerald-500 hover:bg-emerald-400 transition-colors duration-200">
              Découvrir notre accompagnement Visa DTV
            </Link>
          </div>

          <hr className="my-12 border-white/10" />

          <h2 className="text-2xl font-bold text-white mt-10 mb-8">Foire Aux Questions (FAQ) - e-Visa DTV</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-amber-500">Peut-on modifier sa demande sur le portail après l'avoir soumise ?</h3>
              <p className="mt-2 text-gray-400">Non. Une fois le paiement validé, la demande est scellée. Si vous avez fait une erreur, l'officier consulaire mettra votre dossier en statut "Pending Document" pour vous demander une correction via le portail, ou rejettera directement la demande.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-500">Puis-je déposer mon dossier physiquement à l'Ambassade de Paris ?</h3>
              <p className="mt-2 text-gray-400">Dans le cadre standard d'une demande de DTV, l'Ambassade Royale de Thaïlande à Paris a massivement numérisé ses services et privilégie exclusivement la procédure en ligne. Tout se fait via le portail officiel.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-500">Que signifie le statut "Pending for Document" sur mon compte e-Visa ?</h3>
              <p className="mt-2 text-gray-400">Cela signifie que l'ambassade a audité votre dossier et qu'une pièce est manquante, illisible ou non conforme (très souvent une traduction manquante ou un relevé bancaire incomplet). Vous disposez d'un délai limité pour uploader le bon document directement sur le portail afin de débloquer l'instruction.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-500">Combien de temps l'Ambassade met-elle pour traiter un e-Visa DTV depuis la France ?</h3>
              <p className="mt-2 text-gray-400">Selon les constats sur le terrain, le délai de traitement pour les résidents français oscille entre 3 et 4 semaines ouvrées. Il est fortement déconseillé de réserver des billets d'avion non remboursables avant la validation finale et la réception du visa par e-mail.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-500">La plateforme e-Visa est-elle disponible en français ?</h3>
              <p className="mt-2 text-gray-400">Non. L'intégralité du portail gouvernemental (thaievisa.go.th), y compris les menus déroulants, les champs de saisie et les communications de l'ambassade, est exclusivement en anglais (ou en thaï).</p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}