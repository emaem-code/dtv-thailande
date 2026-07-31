import type { Metadata } from 'next';
import BoutonEligibilite from '../../components/BoutonEligibilite';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import BlogNavigation from '../../components/BlogNavigation';
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
    images: [{ url: '/images/blog/guide-depot-dossier-evisa-dtv.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guide e-Visa DTV : déposer son dossier',
    description:
      "Tutoriel étape par étape pour déposer votre demande de Visa DTV sur thaievisa.go.th.",
    images: ['/images/blog/guide-depot-dossier-evisa-dtv.jpg'],
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
  image: 'https://dtv-thailande.fr/images/blog/guide-depot-dossier-evisa-dtv.jpg',
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
      <BlogNavigation variant="article-top" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, breadcrumbSchema]) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className="mb-12 border-b border-gray-800 pb-10">
        <span className="inline-block rounded-full border border-sky-500/25 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sky-400 mb-5">
          {post.category}
        </span>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
          Guide complet : déposer son dossier <span className="text-sky-400">Visa DTV sur e-Visa</span>
        </h1>

        <p className="text-base text-gray-500 mt-6">
          Lecture : 10 min · Mis à jour : {post.date} · Par{' '}
          <strong className="text-gray-400">Matthieu Moretti</strong>
        </p>
      </header>

      <section className="mb-12 space-y-5 text-lg text-gray-400">
        <p>
          L'ère des files d'attente interminables devant les ambassades est révolue. Depuis la mise
          en place du système officiel Thai e-Visa, l'intégralité de la demande pour le{' '}
          <strong className="text-white">Visa DTV Thaïlande</strong> depuis la France se déroule en ligne.
        </p>

        <p>
          Sur le papier, la promesse est séduisante : quelques clics, un formulaire numérique, et
          votre sésame pour l'expatriation ou le télétravail en Thaïlande arrive par e-mail.
        </p>
        <p>
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

      <nav className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 mb-12 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Au programme de ce guide :</h2>
        <ul className="space-y-3">
          <li><a href="#compte" className="text-sky-400 hover:text-sky-300 hover:underline transition-colors text-sm md:text-base">1. Créer votre compte e-Visa</a></li>
          <li><a href="#juridiction" className="text-sky-400 hover:text-sky-300 hover:underline transition-colors text-sm md:text-base">2. Choisir la bonne ambassade</a></li>
          <li><a href="#formulaire" className="text-sky-400 hover:text-sky-300 hover:underline transition-colors text-sm md:text-base">3. Remplir le formulaire DTV</a></li>
          <li><a href="#justificatifs" className="text-sky-400 hover:text-sky-300 hover:underline transition-colors text-sm md:text-base">4. Téléverser les justificatifs</a></li>
          <li><a href="#refus" className="text-sky-400 hover:text-sky-300 hover:underline transition-colors text-sm md:text-base">5. Éviter les motifs de refus</a></li>
        </ul>
      </nav>

      <section id="compte" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">1. La création du compte et l'enregistrement</h2>
        <p className="mb-4">
          La première étape consiste à vous rendre sur le portail officiel{' '}
          <a href="https://www.thaievisa.go.th/" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">
            thaievisa.go.th
          </a>{' '}
          pour créer votre profil candidat.
        </p>
        <figure className="my-8">
          <Image
            src="/images/blog/guide-evisa-creation-compte.jpg"
            alt="Création du compte sur le portail officiel Thai e-Visa pour déposer sa demande de DTV"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Le portail officiel est gratuit. Tout site qui vous facture des « frais de dossier » avant l&apos;ambassade est un intermédiaire.
          </figcaption>
        </figure>
        <ul className="space-y-3 mb-6 pl-4 border-l-2 border-gray-800 text-gray-400 text-sm">
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
        <h2 className="text-2xl font-bold text-white mb-4">2. Le choix stratégique de l'ambassade</h2>
        <p className="mb-4">
          C'est ici que de nombreux candidats autonomes commettent leur première erreur. Le système
          vous demande de sélectionner l'ambassade ou le consulat qui traitera votre dossier. Bien
          que la procédure e-Visa soit numérique, elle n'est pas centralisée.
        </p>
        <div className="border border-sky-500/30 bg-sky-500/5 rounded-xl p-5 mb-4">
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
        <h2 className="text-2xl font-bold text-white mb-4">3. Le remplissage du formulaire de demande</h2>
        <p className="mb-4">
          Une fois votre profil créé et la juridiction validée, vous accédez au cœur du dossier. Vous
          devez naviguer dans une interface exclusivement en anglais.
        </p>
        <ul className="space-y-3 mb-6 pl-4 border-l-2 border-gray-800 text-gray-400 text-sm">
          <li>
            <strong className="text-white">Purpose of Visit :</strong> sélectionnez Destination
            Thailand Visa (DTV).
          </li>
          <li>
            <strong className="text-white">Workcation :</strong> choix adapté aux freelances,
            dirigeants d'entreprise et salariés à distance. Consultez notre{' '}
            <Link href="/blog/visa-dtv-freelance-auto-entrepreneur" className="text-amber-400 hover:text-amber-300 hover:underline transition-colors">
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
            <Link href="/blog/visa-dtv-couple-famille-pacs" className="text-amber-400 hover:text-amber-300 hover:underline transition-colors">
              le PACS et le DTV en famille
            </Link>.
          </li>
        </ul>
      </section>

      <section id="justificatifs" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-4">4. Le téléversement des justificatifs</h2>
        <p className="mb-4">
          C'est l'étape qui génère la grande majorité des refus de visa DTV. L'interface vous demande
          de téléverser vos preuves professionnelles, financières et d'identité.
        </p>
        <figure className="my-8">
          <Image
            src="/images/blog/guide-evisa-televersement.jpg"
            alt="Téléversement des justificatifs sur la plateforme e-Visa pour une demande de visa DTV"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10"
          />
          <figcaption className="mt-3 text-sm text-gray-500">
            Un fichier par champ, format et poids imposés. C&apos;est l&apos;étape où les dossiers se bloquent le plus souvent.
          </figcaption>
        </figure>
        <div className="grid gap-4">
          <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-2">La contrainte technique</h3>
            <p>
              Le portail n'accepte qu'un seul document PDF ou JPG par champ, avec une limite stricte
              de taille. Si votre historique bancaire fait 15 pages, il doit être fusionné et
              compressé sans perdre en lisibilité.
            </p>
          </div>
          <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl">
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
        <h2 className="text-2xl font-bold text-white mb-4">5. Le paiement des frais consulaires</h2>
        <p className="mb-4">
          La dernière étape fige votre dossier. Vous devez vous acquitter des frais de visa, qui
          varient selon la juridiction, le taux de change et les frais de plateforme applicables.
        </p>
        <p className="border border-red-500/30 bg-red-500/5 rounded-xl p-5 text-red-100">
          <strong className="text-white">Attention :</strong> ce paiement est ferme et définitif. Si
          l'ambassade rejette votre dossier à cause d'une traduction manquante, d'un PDF illisible ou
          d'un solde bancaire jugé non conforme, les frais consulaires ne sont pas remboursés.
        </p>
      </section>

      <section id="refus" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white mb-6">Les 5 motifs de refus les plus fréquents</h2>
        <ol className="space-y-3 mb-6 pl-4 border-l-2 border-gray-800 text-gray-400 text-sm">
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
        <h2 className="text-2xl font-bold text-white mb-4">Délais de traitement à l'ambassade de Paris</h2>
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
        <h2 className="text-2xl font-bold text-white mb-4">Et après ? L'arrivée de votre e-Visa</h2>
        <p>
          Si votre dossier est accepté, son statut passe en Approved. Vous ne recevez pas de vignette
          physique dans votre passeport : le e-Visa DTV arrive par e-mail sous forme de PDF officiel.
          Imprimez-le pour l'enregistrement aérien et pour l'officier d'immigration à votre arrivée
          en Thaïlande.
        </p>
      </section>

      {/* ── ENCART AUTEUR ── */}
      <div className="my-14 bg-[#111111] border border-gray-800 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-6 shadow-lg">
        <div className="w-24 h-24 rounded-full bg-gray-800 flex-shrink-0 overflow-hidden border-2 border-sky-500/50">
          <div className="w-full h-full bg-gradient-to-br from-sky-500/20 to-sky-500/20 flex items-center justify-center text-3xl">🛂</div>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-1">Matthieu Moretti</h3>
          <p className="text-sky-400 text-xs font-semibold mb-3 uppercase tracking-wider">Expertise e-Visa & Dossier DTV</p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Basé à Phuket, j'accompagne les candidats au Visa DTV dans la préparation, la vérification et la soumission de leurs documents consulaires. L'objectif : transformer une procédure e-Visa technique en dossier clair, cohérent et défendable.
          </p>
        </div>
      </div>

      {/* ── MAILLAGE INTERNE ── */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 mb-12">
        <p className="text-white font-bold text-sm mb-4">📚 Pour préparer votre dossier :</p>
        <ul className="space-y-3">
          <li>
            <Link href="/blog/fonds-bancaires-visa-dtv" className="text-amber-400 hover:text-amber-300 hover:underline text-sm transition-colors">
              → Vérifier la preuve financière de 500 000 THB
            </Link>
          </li>
          <li>
            <Link href="/blog/visa-dtv-freelance-auto-entrepreneur" className="text-amber-400 hover:text-amber-300 hover:underline text-sm transition-colors">
              → Construire un dossier DTV solide quand on est freelance
            </Link>
          </li>
          <li>
            <Link href="/blog/visa-dtv-couple-famille-pacs" className="text-amber-400 hover:text-amber-300 hover:underline text-sm transition-colors">
              → Comprendre les règles pour conjoint, PACS et famille
            </Link>
          </li>
        </ul>
      </div>

      {/* ── FAQ INTERNE ── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white mb-6">FAQ : e-Visa DTV</h2>
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

      {/* ── ZONE DE CONVERSION PRINCIPALE ── */}
      <div className="mt-4 bg-[#111111] border border-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500 opacity-10 rounded-full blur-3xl" />
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 relative z-10">
          Sécurisez votre dépôt e-Visa
        </h3>
        <p className="text-gray-400 mb-8 text-sm md:text-base relative z-10">
          Le portail e-Visa n'est qu'un outil informatique. La vraie difficulté reste la cohérence du dossier, la lisibilité des justificatifs et la conformité des traductions.
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
