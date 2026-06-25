import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { createBreadcrumbSchema, getBlogPost } from '../posts';

const post = getBlogPost('guide-depot-dossier-evisa-dtv');
const breadcrumbSchema = createBreadcrumbSchema(post);

export const metadata: Metadata = {
  title: 'Guide e-Visa DTV : déposer son dossier',
  description:
    "Tutoriel étape par étape pour déposer votre demande de Visa DTV sur thaievisa.go.th. Évitez les refus, maîtrisez les formats et les délais de l'ambassade.",
  alternates: {
    canonical: '/blog/guide-depot-dossier-evisa-dtv',
  },
  openGraph: {
    title: 'Guide e-Visa DTV : déposer son dossier',
    description:
      "Le tutoriel pour comprendre les pièges du portail gouvernemental thaïlandais et sécuriser votre expatriation.",
    url: '/blog/guide-depot-dossier-evisa-dtv',
    siteName: 'DTV Thaïlande',
    locale: 'fr_FR',
    type: 'article',
    images: [{ url: '/logo.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guide e-Visa DTV : déposer son dossier',
    description:
      "Tutoriel étape par étape pour déposer votre demande de Visa DTV sur thaievisa.go.th.",
    images: ['/logo.png'],
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://dtv-thailande.fr/blog/guide-depot-dossier-evisa-dtv',
  },
  headline: 'Guide complet : comment déposer son dossier Visa DTV sur le portail e-Visa thaïlandais',
  description:
    'Tutoriel étape par étape pour déposer votre demande de Visa DTV sur thaievisa.go.th et éviter les pièges consulaires.',
  image: 'https://dtv-thailande.fr/logo.png',
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
  datePublished: '2026-06-25',
  dateModified: '2026-06-25',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Peut-on modifier sa demande sur le portail après l'avoir soumise ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. Une fois le paiement validé, la demande est scellée. Si vous avez fait une erreur, l'officier consulaire mettra votre dossier en statut Pending Document pour vous demander une correction via le portail, ou rejettera directement la demande.",
      },
    },
    {
      '@type': 'Question',
      name: "Puis-je déposer mon dossier physiquement à l'Ambassade de Paris ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Dans le cadre standard d'une demande de DTV, l'Ambassade Royale de Thaïlande à Paris a massivement numérisé ses services et privilégie exclusivement la procédure en ligne. Tout se fait via le portail officiel thaievisa.go.th.",
      },
    },
    {
      '@type': 'Question',
      name: "Que signifie le statut Pending for Document sur mon compte e-Visa ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Cela signifie que l'ambassade a audité votre dossier et qu'une pièce est manquante, illisible ou non conforme. Vous disposez d'un délai limité pour uploader le bon document directement sur le portail afin de débloquer l'instruction.",
      },
    },
    {
      '@type': 'Question',
      name: "Combien de temps l'Ambassade met-elle pour traiter un e-Visa DTV depuis la France ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Selon les constats sur le terrain, le délai de traitement pour les résidents français oscille entre 3 et 4 semaines ouvrées. Il est fortement déconseillé de réserver des billets d'avion non remboursables avant la validation finale.",
      },
    },
    {
      '@type': 'Question',
      name: 'La plateforme e-Visa est-elle disponible en français ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. L'intégralité du portail gouvernemental thaievisa.go.th, y compris les menus déroulants, les champs de saisie et les communications de l'ambassade, est exclusivement en anglais ou en thaï.",
      },
    },
  ],
};

export default function EVisaGuidePage() {
  return (
    <article className="max-w-3xl mx-auto px-5 md:px-6 py-14 md:py-20 font-sans text-gray-300 leading-relaxed bg-[#0a0a0a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, breadcrumbSchema]) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className="mb-12">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-amber-500">
          <span>{post.category}</span>
          <span className="h-1 w-1 rounded-full bg-gray-600" />
          <time dateTime={post.publishedAt}>{post.date}</time>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
          Guide complet : comment déposer son dossier Visa DTV sur le portail e-Visa thaïlandais
        </h1>

        <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
          L'ère des files d'attente interminables devant les ambassades est révolue. Depuis la mise
          en place du système officiel Thai e-Visa, l'intégralité de la demande pour le{' '}
          <strong className="text-white">Visa DTV Thaïlande</strong> depuis la France se déroule en ligne.
        </p>
      </header>

      <section className="mb-12">
        <p className="mb-4">
          Sur le papier, la promesse est séduisante : quelques clics, un formulaire numérique, et
          votre sésame pour l'expatriation ou le télétravail en Thaïlande arrive par e-mail.
        </p>
        <p className="mb-4">
          La réalité est beaucoup plus nuancée. Si l'interface informatique est accessible, les
          exigences consulaires cachées derrière chaque bouton sont d'une rigueur absolue. Une case
          mal cochée, un fichier trop lourd ou une traduction non conforme entraînent un refus
          catégorique de votre dossier, sans remboursement des frais engagés.
        </p>
        <p>
          Voici le tutoriel étape par étape pour déposer votre demande de Visa DTV de manière
          autonome, ainsi que les pièges critiques à éviter à chaque stade de la procédure.
        </p>
      </section>

      <nav className="mb-12 rounded-3xl border border-white/10 bg-[#111111] p-6">
        <h2 className="text-xl font-bold text-white mb-4">Au programme de ce guide :</h2>
        <ul className="space-y-3">
          <li><a href="#compte" className="text-amber-400 hover:text-amber-300 hover:underline">1. Créer votre compte e-Visa</a></li>
          <li><a href="#juridiction" className="text-amber-400 hover:text-amber-300 hover:underline">2. Choisir la bonne ambassade</a></li>
          <li><a href="#formulaire" className="text-amber-400 hover:text-amber-300 hover:underline">3. Remplir le formulaire DTV</a></li>
          <li><a href="#justificatifs" className="text-amber-400 hover:text-amber-300 hover:underline">4. Téléverser les justificatifs</a></li>
          <li><a href="#refus" className="text-amber-400 hover:text-amber-300 hover:underline">5. Éviter les motifs de refus</a></li>
        </ul>
      </nav>

      <section id="compte" className="mb-12 scroll-mt-24">
        <h2 className="text-3xl font-bold text-white mb-4">1. La création du compte et l'enregistrement</h2>
        <p className="mb-4">
          La première étape consiste à vous rendre sur le portail officiel{' '}
          <a href="https://www.thaievisa.go.th/" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">
            thaievisa.go.th
          </a>{' '}
          pour créer votre profil candidat.
        </p>
        <ul className="space-y-3 pl-5 list-disc marker:text-amber-500">
          <li>
            <strong className="text-white">La procédure :</strong> cliquez sur Create an Account,
            fournissez une adresse e-mail valide, créez un mot de passe sécurisé et renseignez vos
            informations d'identité.
          </li>
          <li>
            <strong className="text-white">Le point de vigilance :</strong> le nom et les prénoms
            doivent correspondre à la bande MRZ de votre passeport. Une incohérence orthographique à
            ce stade peut bloquer l'édition finale du visa.
          </li>
        </ul>
      </section>

      <section id="juridiction" className="mb-12 scroll-mt-24">
        <h2 className="text-3xl font-bold text-white mb-4">2. Le choix stratégique de l'ambassade</h2>
        <p className="mb-4">
          C'est ici que de nombreux candidats autonomes commettent leur première erreur. Le système
          vous demande de sélectionner l'ambassade ou le consulat qui traitera votre dossier. Bien
          que la procédure e-Visa soit numérique, elle n'est pas centralisée.
        </p>
        <div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-6">
          <p className="mb-3">
            <strong className="text-white">La règle stricte :</strong> vous devez sélectionner
            l'ambassade du pays dans lequel vous vous trouvez physiquement au moment de la demande.
          </p>
          <p>
            <strong className="text-white">Le piège :</strong> ne tentez jamais de mentir sur votre
            géolocalisation pour contourner une règle. Les officiers vérifient les tampons d'entrée
            et de sortie sur les scans de passeport.
          </p>
        </div>
      </section>

      <section id="formulaire" className="mb-12 scroll-mt-24">
        <h2 className="text-3xl font-bold text-white mb-4">3. Le remplissage du formulaire de demande</h2>
        <p className="mb-4">
          Une fois votre profil créé et la juridiction validée, vous accédez au cœur du dossier. Vous
          devez naviguer dans une interface exclusivement en anglais.
        </p>
        <ul className="space-y-4 pl-5 list-disc marker:text-amber-500">
          <li>
            <strong className="text-white">Purpose of Visit :</strong> sélectionnez Destination
            Thailand Visa (DTV).
          </li>
          <li>
            <strong className="text-white">Workcation :</strong> choix adapté aux freelances,
            dirigeants d'entreprise et salariés à distance. Consultez notre{' '}
            <Link href="/blog/visa-dtv-freelance-auto-entrepreneur" className="text-amber-400 hover:underline">
              guide détaillé pour les freelances
            </Link>.
          </li>
          <li>
            <strong className="text-white">Soft Power :</strong> choix adapté aux formations
            certifiées, au Muay Thai, à la cuisine ou aux séminaires médicaux.
          </li>
          <li>
            <strong className="text-white">Spouse and Children :</strong> réservé aux conjoints
            mariés civilement et aux enfants éligibles. Pour les couples, relisez notre analyse sur{' '}
            <Link href="/blog/visa-dtv-couple-famille-pacs" className="text-amber-400 hover:underline">
              le PACS et le DTV en famille
            </Link>.
          </li>
        </ul>
      </section>

      <section id="justificatifs" className="mb-12 scroll-mt-24">
        <h2 className="text-3xl font-bold text-white mb-4">4. Le téléversement des justificatifs</h2>
        <p className="mb-4">
          C'est l'étape qui génère la grande majorité des refus de visa DTV. L'interface vous demande
          de téléverser vos preuves professionnelles, financières et d'identité.
        </p>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
            <h3 className="text-xl font-bold text-white mb-2">La contrainte technique</h3>
            <p>
              Le portail n'accepte qu'un seul document PDF ou JPG par champ, avec une limite stricte
              de taille. Si votre historique bancaire fait 15 pages, il doit être fusionné et
              compressé sans perdre en lisibilité.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
            <h3 className="text-xl font-bold text-white mb-2">La barrière de la langue</h3>
            <p>
              Tout document officiel en français peut nécessiter une traduction assermentée en anglais
              ou en thaï. Fournir un Kbis, un livret de famille ou un document d'entreprise non traduit
              augmente fortement le risque de mise en attente.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">5. Le paiement des frais consulaires</h2>
        <p className="mb-4">
          La dernière étape fige votre dossier. Vous devez vous acquitter des frais de visa, qui
          varient selon la juridiction, le taux de change et les frais de plateforme applicables.
        </p>
        <p className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6 text-red-100">
          <strong className="text-white">Attention :</strong> ce paiement est ferme et définitif. Si
          l'ambassade rejette votre dossier à cause d'une traduction manquante, d'un PDF illisible ou
          d'un solde bancaire jugé non conforme, les frais consulaires ne sont pas remboursés.
        </p>
      </section>

      <section id="refus" className="mb-12 scroll-mt-24">
        <h2 className="text-3xl font-bold text-white mb-6">Les 5 motifs de refus les plus fréquents</h2>
        <ol className="space-y-4 pl-5 list-decimal marker:text-amber-500 marker:font-bold">
          <li>
            <strong className="text-white">Le virement de la veille :</strong> présenter un solde de
            500 000 THB fraîchement viré. L'ambassade attend une stabilité bancaire. Relisez notre{' '}
            <Link href="/blog/fonds-bancaires-visa-dtv" className="text-amber-400 hover:underline">
              guide sur la preuve financière DTV
            </Link>.
          </li>
          <li>
            <strong className="text-white">L'erreur de juridiction :</strong> postuler à Paris alors
            que votre passeport montre que vous êtes actuellement en Asie.
          </li>
          <li>
            <strong className="text-white">L'absence de traduction :</strong> fournir un document
            français non traduit ou non légalisé.
          </li>
          <li>
            <strong className="text-white">Le formatage des PDF :</strong> envoyer des justificatifs
            tronqués, illisibles ou fractionnés.
          </li>
          <li>
            <strong className="text-white">Le contrat inadapté :</strong> pour Workcation, fournir un
            contrat sans autorisation claire de télétravail international.
          </li>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Délais de traitement à l'ambassade de Paris</h2>
        <p className="mb-4">
          Une fois le bouton Submit pressé et les frais payés, votre dossier passe en statut Pending.
          Pour un dépôt via l'e-Visa à Paris, les retours terrain constatent un délai de traitement
          entre <strong className="text-white">3 et 4 semaines ouvrées</strong>.
        </p>
        <p>
          Ce délai peut s'allonger en cas de statut Pending for Document. Anticipez votre demande au
          minimum un mois et demi avant votre vol, mais évitez de déposer trop tôt si vos relevés
          bancaires risquent d'être jugés trop anciens.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Et après ? L'arrivée de votre e-Visa</h2>
        <p>
          Si votre dossier est accepté, son statut passe en Approved. Vous ne recevez pas de vignette
          physique dans votre passeport : le e-Visa DTV arrive par e-mail sous forme de PDF officiel.
          Imprimez-le pour l'enregistrement aérien et pour l'officier d'immigration à votre arrivée
          en Thaïlande.
        </p>
      </section>

      <section className="mb-12 rounded-3xl border border-white/10 bg-[#111111] p-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Sécurisez votre expatriation avec une ingénierie consulaire sur-mesure
        </h2>
        <p className="mb-4">
          Le portail e-Visa n'est qu'un outil informatique. La véritable difficulté du Visa DTV réside
          dans la structuration juridique et administrative de votre dossier en amont.
        </p>
        <p className="mb-6">
          Si vous souhaitez éviter le stress des traductions assermentées, des fichiers PDF refusés et
          le risque de perdre des frais consulaires, notre équipe prend le relais : audit, préparation
          et soumission technique du dossier.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-bold text-black transition-colors hover:bg-gray-200"
        >
          Découvrir notre accompagnement Visa DTV
        </Link>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-8">Foire Aux Questions - e-Visa DTV</h2>
        <div className="space-y-8">
          {[
            [
              "Peut-on modifier sa demande sur le portail après l'avoir soumise ?",
              "Non. Une fois le paiement validé, la demande est scellée. L'officier consulaire peut demander une correction via le portail, mais il peut aussi rejeter directement la demande.",
            ],
            [
              "Puis-je déposer mon dossier physiquement à l'Ambassade de Paris ?",
              "La procédure standard du DTV depuis la France se fait en ligne via le portail officiel Thai e-Visa.",
            ],
            [
              'Que signifie le statut Pending for Document ?',
              "Cela signifie qu'une pièce est manquante, illisible ou non conforme. Vous devez uploader le bon document dans le délai indiqué.",
            ],
            [
              "Combien de temps l'ambassade met-elle à traiter un e-Visa DTV ?",
              "Pour les résidents français, le délai observé oscille généralement entre 3 et 4 semaines ouvrées.",
            ],
            [
              'La plateforme e-Visa est-elle disponible en français ?',
              "Non. Le portail, les champs de saisie et les communications de l'ambassade sont en anglais ou en thaï.",
            ],
          ].map(([question, answer]) => (
            <div key={question}>
              <h3 className="text-xl font-bold text-white mb-2">{question}</h3>
              <p className="text-gray-400">{answer}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-16 pt-8 border-t border-white/10">
        <Link href="/blog" className="text-amber-400 hover:text-amber-300 hover:underline font-medium">
          ← Retour au blog
        </Link>
      </div>
    </article>
  );
}
