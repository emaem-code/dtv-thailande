import type { Metadata } from 'next';

export const baseUrl = 'https://dtv-thailande.fr';

export type BlogPost = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  excerpt: string;
  date: string;
  publishedAt: string;
  modifiedAt: string;
  category: string;
  tagColor: string;
  hoverBorder: string;
  image: string;
};

export const blogPosts = [
  {
  slug: 'assurance-sante-visa-dtv-thailande',
  title: 'Assurance santé et Visa DTV : pourquoi ne pas venir sans (2026)',
  shortTitle: 'Assurance santé et Visa DTV',
  description: "Le Visa DTV n'exige aucune assurance santé — contrairement au visa retraite. Coûts réels d'une hospitalisation à Phuket, exclusions scooter et tarifs constatés en 2026.",
  excerpt: "Aucune assurance n'est exigée pour obtenir le DTV. C'est précisément ce qui en fait un piège — et l'exclusion deux-roues que presque personne ne vérifie.",
  date: '11 Août 2026',
  publishedAt: '2026-08-11T07:00:00Z',
  modifiedAt: '2026-08-11T07:00:00Z',
  category: 'Santé',
  tagColor: 'text-red-400 border-red-500/25 bg-red-500/10',
  hoverBorder: 'hover:border-red-500/50',
  image: '/images/blog/assurance-sante-visa-dtv-thailande.jpg',
},
  {
  slug: 'fiscalite-thailande-expatries-residence-fiscale',
  title: 'Fiscalité en Thaïlande : impôts, 180 jours et résidence fiscale (2026)',
  shortTitle: 'Fiscalité et résidence fiscale',
  description: "Devenez-vous imposable en Thaïlande après 180 jours ? Retraités, freelances, propriétaires : ce que dit vraiment la réforme de 2024 et la convention franco-thaïlandaise.",
  excerpt: "Le sujet que les agences de visas évitent. Ce que change réellement la réforme de 2024, et pourquoi les retraités français sont protégés là où les freelances ne le sont pas.",
  date: '7 Août 2026',
  publishedAt: '2026-08-07T07:00:00Z',
  modifiedAt: '2026-08-07T07:00:00Z',
  category: 'Fiscalité',
  tagColor: 'text-emerald-400 border-emerald-500/25 bg-emerald-500/10',
  hoverBorder: 'hover:border-emerald-500/50',
  image: '/images/blog/fiscalite-thailande-expatries-residence-fiscale.jpg',
},
  {
  slug: 'tm47-rapport-90-jours-thailande',
  title: 'TM47 : le rapport des 90 jours en Thaïlande (2026)',
  shortTitle: 'Rapport des 90 jours',
  description: "Le rapport des 90 jours (TM47) est obligatoire et méconnu. Qui doit le faire, quand, comment, et les amendes encourues. Le guide complet 2026.",
  excerpt: "Une obligation légale dont personne ne parle en français. Découvrez qui est vraiment concerné par le TM47 — et pourquoi beaucoup de détenteurs de DTV ne le feront jamais.",
  date: '4 Août 2026',
  publishedAt: '2026-08-04T07:00:00Z',
  modifiedAt: '2026-08-04T07:00:00Z',
  category: 'Formalités',
  tagColor: 'text-sky-400 border-sky-500/25 bg-sky-500/10',
  hoverBorder: 'hover:border-sky-500/50',
  image: '/images/blog/tm47-rapport-90-jours-thailande.jpg',
},
  {
  slug: 'ou-vivre-thailande-2026-phuket-pattaya-bangkok-huahin',
  title: 'Où vivre en Thaïlande en 2026 : le comparatif terrain',
  shortTitle: 'Où vivre en Thaïlande',
  description: "Budgets réels, loyers 2026, ambiance et vécu d'expatriés à Phuket, Pattaya, Bangkok et Hua Hin. Le comparatif honnête pour choisir votre ville.",
  excerpt: "Combien coûte vraiment la vie à Phuket, Pattaya, Bangkok et Hua Hin ? Deux expatriés racontent leur quotidien et leurs budgets réels.",
  date: '28 Juillet 2026',
  publishedAt: '2026-07-28T07:00:00Z',
  modifiedAt: '2026-07-28T07:00:00Z',
  category: 'Vie pratique',
  tagColor: 'text-amber-400 border-amber-500/25 bg-amber-500/10',
  hoverBorder: 'hover:border-amber-500/50',
  image: '/images/blog/ou-vivre-thailande-2026-phuket-pattaya-bangkok-huahin.jpg',
},
  {
    slug: '20000-thb-immigration-thailande-regle-especes',
    title: "20 000 bahts à l'immigration thaïlandaise : la loi oubliée qui refoule des voyageurs (2026)",
    shortTitle: 'Règle des 20 000 THB',
    description: "Des voyageurs refoulés faute de 20 000 THB en espèces à l'immigration thaïlandaise. La loi, les profils ciblés, le tampon de refus : le guide terrain complet 2026.",
    excerpt: "Pourquoi l'immigration refoule-t-elle certains voyageurs sans 20 000 bahts en espèces ? Découvrez les profils ciblés et comment éviter le tampon de refus.",
    date: '24 Juillet 2026',
    publishedAt: '2026-07-24T07:00:00Z',
    modifiedAt: '2026-07-26T07:00:00Z',
    category: 'Formalités',
    tagColor: 'text-sky-400 border-sky-500/25 bg-sky-500/10',
    hoverBorder: 'hover:border-sky-500/50',
    image: '/images/blog/20000-thb-immigration-thailande-regle-especes.jpg', // Pense à remplacer par ta future miniature
  },
  {
    slug: 'paiement-thailande-sans-compte-bancaire-visa-dtv',
    title: 'Paiements en Thaïlande avec un Visa DTV : la vraie stratégie sans compte bancaire (2026)',
    shortTitle: 'Paiements, Wise et Banques',
    description: 'Wise, PromptPay, QR codes, cash : le guide terrain complet pour gérer ses paiements en Thaïlande avec un Visa DTV sans compte bancaire local en 2026.',
    excerpt: "Comment vivre et payer en Thaïlande sans compte bancaire local ? Découvrez la stratégie ultime avec Wise, les QR codes et les astuces terrain pour éviter les frais.",
    date: '21 Juillet 2026',
    publishedAt: '2026-07-21',
    modifiedAt: '2026-07-26',
    category: 'Finances',
    tagColor: 'text-amber-400 border-amber-500/25 bg-amber-500/10',
    hoverBorder: 'hover:border-amber-500/50',
    image: '/images/blog/paiement-thailande-sans-compte-bancaire-visa-dtv.jpg', // Tu pourras changer l'image ici si tu en as une spécifique
  },
    {
    slug: 'arrivee-thailande-aeroport-immigration-taxi-visa-dtv',
    title: 'Arrivée en Thaïlande 2026 : Aéroport, Taxi et Visa DTV',
    shortTitle: 'Arrivée aéroport et Visa DTV',
    description: 'Arriver en Thaïlande en 2026 : TDAC obligatoire, immigration, taxi aéroport, carte SIM et TM30 pour votre visa DTV. Le guide complet étape par étape.',
    excerpt: "Le guide définitif pour naviguer sans stress dès votre descente de l'avion en 2026 : TDAC, transports, change et l'incontournable TM30.",
    date: '13 Juillet 2026',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-26',
    category: 'Formalités',
    tagColor: 'text-sky-400 border-sky-500/25 bg-sky-500/10',
    hoverBorder: 'hover:border-sky-500/50',
    image: '/images/blog/arrivee-thailande-aeroport-immigration-taxi-visa-dtv.jpg',
  },
  {
    slug: 'guide-depot-dossier-evisa-dtv',
    title: 'Guide e-Visa DTV : déposer son dossier',
    shortTitle: 'Guide e-Visa DTV : déposer son dossier',
    description: "Tutoriel étape par étape pour déposer votre demande de Visa DTV sur thaievisa.go.th et éviter les refus consulaires.",
    excerpt: "Créer le compte, choisir l'ambassade, uploader les justificatifs et éviter les erreurs de dépôt sur le portail Thai e-Visa.",
    date: '25 Juin 2026',
    publishedAt: '2026-06-25',
    modifiedAt: '2026-06-25',
    category: 'Formalités',
    tagColor: 'text-sky-400 border-sky-500/25 bg-sky-500/10',
    hoverBorder: 'hover:border-sky-500/50',
    image: '/images/blog/guide-depot-dossier-evisa-dtv.jpg',
  },
  {
    slug: 'comparatif-visas-thailande',
    title: 'Quel Visa Choisir pour Vivre en Thaïlande ? Comparatif 2026',
    shortTitle: 'Quel visa choisir pour vivre en Thaïlande ?',
    description: 'Comparatif des visas longue durée en Thaïlande : DTV, LTR, ED et METV selon votre profil, budget et activité.',
    excerpt: 'DTV, LTR, Non-ED, METV... Découvrez quel visa longue durée est le plus adapté à votre profil, votre budget et votre activité professionnelle.',
    date: '19 Juin 2026',
    publishedAt: '2026-06-19',
    modifiedAt: '2026-07-26',
    category: 'Stratégie et Expatriation',
    tagColor: 'text-emerald-400 border-emerald-500/25 bg-emerald-500/10',
    hoverBorder: 'hover:border-emerald-500/50',
    image: '/images/blog/comparatif-visas-thailande.jpg',
  },
  {
    slug: 'visa-dtv-couple-famille-pacs',
    title: 'Visa DTV Famille : PACS, Mariage et Enfants',
    shortTitle: 'Visa DTV famille, PACS et mariage',
    description: 'Le cadre légal du Visa DTV pour familles, couples pacsés, mariés, enfants et preuve financière des 500 000 THB.',
    excerpt: "Le guide légal pour s'expatrier en Thaïlande en famille. Reconnaissance du PACS, concubinage, mariages de même sexe et preuve financière des 500 000 THB.",
    date: '17 Juin 2026',
    publishedAt: '2026-06-17',
    modifiedAt: '2026-07-26',
    category: 'Famille & Couple',
    tagColor: 'text-pink-400 border-pink-500/25 bg-pink-500/10',
    hoverBorder: 'hover:border-pink-500/50',
    image: '/images/blog/visa-dtv-couple-famille-pacs.jpg',
  },
  {
    slug: 'fin-exemption-visa-60-jours',
    title: "Visa Run Thaïlande : fin de l'exemption 60 jours",
    shortTitle: "Visa Run : fin de l'exemption 60 jours",
    description: "Analyse terrain : durcissement des frontières, fin annoncée des 60 jours, coûts des Visa Runs et alternatives DTV.",
    excerpt: "Le gouvernement vient d'annuler la mesure phare de l'exemption de visa longue durée. Découvrez les nouvelles règles strictes d'immigration et l'impact sur vos séjours.",
    date: '11 Juin 2026',
    publishedAt: '2026-06-11',
    modifiedAt: '2026-07-26',
    category: 'Actualité',
    tagColor: 'text-red-400 border-red-500/25 bg-red-500/10',
    hoverBorder: 'hover:border-red-500/50',
    image: '/images/blog/fin-exemption-visa-60-jours.jpg',
  },
  {
    slug: 'visa-dtv-freelance-auto-entrepreneur',
    title: 'Visa DTV Freelance : dossier sans fiche de paie',
    shortTitle: 'Visa DTV freelance et auto-entrepreneur',
    description: 'Kbis, URSSAF, portfolio et contrats clients : monter un dossier Visa DTV solide sans fiche de paie classique.',
    excerpt: 'Comment obtenir le Visa DTV Thaïlande quand on est auto-entrepreneur ou freelance ? Kbis, URSSAF, portfolio : le guide complet pour monter un dossier béton.',
    date: '10 Juin 2026',
    publishedAt: '2026-06-10',
    modifiedAt: '2026-07-26',
    category: 'Freelance',
    tagColor: 'text-purple-400 border-purple-500/25 bg-purple-500/10',
    hoverBorder: 'hover:border-purple-500/50',
    image: '/images/blog/visa-dtv-freelance-auto-entrepreneur.jpg',
  },
  {
    slug: 'tdac-thailande-carte-arrivee',
    title: "TDAC Thaïlande : guide de la carte d'arrivée",
    shortTitle: "TDAC Thaïlande : carte d'arrivée",
    description: "Tutoriel pas-à-pas pour remplir le TDAC obligatoire avant l'arrivée en Thaïlande avec ou sans Visa DTV.",
    excerpt: "Le guide étape par étape pour remplir le nouveau formulaire TDAC obligatoire pour entrer en Thaïlande. Évitez les blocages à l'embarquement.",
    date: '09 Juin 2026',
    publishedAt: '2026-06-09',
    modifiedAt: '2026-07-23',
    category: 'Formalités',
    tagColor: 'text-sky-400 border-sky-500/25 bg-sky-500/10',
    hoverBorder: 'hover:border-sky-500/50',
    image: '/images/blog/tdac-thailande-carte-arrivee.jpg',
  },
  {
    slug: 'visa-dtv-soft-power-ecoles',
    title: 'Visa DTV Soft Power : éviter les fausses écoles',
    shortTitle: 'Visa DTV Soft Power et écoles',
    description: 'Cuisine, Muay Thaï, écoles agréées et pièges à éviter pour obtenir le Visa DTV via la voie Soft Power.',
    excerpt: 'Le guide définitif pour obtenir le Visa DTV via la voie culturelle. Comparatif Cuisine vs Muay Thaï, gestion des présences et pièges à éviter.',
    date: '08 Juin 2026',
    publishedAt: '2026-06-10',
    modifiedAt: '2026-07-26',
    category: 'Soft Power',
    tagColor: 'text-emerald-400 border-emerald-500/25 bg-emerald-500/10',
    hoverBorder: 'hover:border-emerald-500/50',
    image: '/images/blog/visa-dtv-soft-power-ecoles.jpg',
  },
  {
    slug: 'fonds-bancaires-visa-dtv',
    title: 'Preuve bancaire Visa DTV : 500 000 THB',
    shortTitle: 'Preuve bancaire Visa DTV',
    description: "Exigences officielles sur la preuve financière DTV : 500 000 THB, historique bancaire et erreurs à éviter.",
    excerpt: "Exigences officielles des ambassades sur la preuve financière de 500 000 THB pour le Visa DTV. L'erreur fatale du virement de dernière minute.",
    date: '01 Juin 2026',
    publishedAt: '2026-06-01',
    modifiedAt: '2026-07-26',
    category: 'Finances',
    tagColor: 'text-amber-400 border-amber-500/25 bg-amber-500/10',
    hoverBorder: 'hover:border-amber-500/50',
    image: '/images/blog/fonds-bancaires-visa-dtv.jpg',
  },
] satisfies BlogPost[];

export function getSortedBlogPosts(): BlogPost[] {
  const now = new Date();
  return [...blogPosts]
    .filter((post) => new Date(post.publishedAt) <= now)
    .sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getBlogPost(slug: string): BlogPost {
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    throw new Error(`Article de blog introuvable: ${slug}`);
  }

  return post;
}

export function absoluteUrl(path: string): string {
  return new URL(path, baseUrl).toString();
}

export function createArticleMetadata(post: BlogPost): Metadata {
  const articleUrl = `/blog/${post.slug}`;

  return {
    title: post.shortTitle,
    description: post.description,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: articleUrl,
      siteName: 'DTV Thaïlande',
      locale: 'fr_FR',
      type: 'article',
      // TODO: Générer un opengraph-image.tsx ou lier une image spécifique à cet article quand les vraies miniatures seront disponibles.
      images: [{ url: post.image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export function createArticleSchema(post: BlogPost) {
  const url = absoluteUrl(`/blog/${post.slug}`);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: post.title,
    description: post.description,
    image: absoluteUrl(post.image),
    author: {
      '@type': 'Person',
      name: 'Matthieu Moretti',
      url: absoluteUrl('/contact'),
    },
    publisher: {
      '@type': 'Organization',
      name: 'DTV Thaïlande',
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/logo.png'),
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.modifiedAt,
  };
}

export function createBreadcrumbSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: absoluteUrl('/blog'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: absoluteUrl(`/blog/${post.slug}`),
      },
    ],
  };
}
