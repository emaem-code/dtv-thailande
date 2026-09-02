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
  slug: 'dtv-nouvelles-regles-31-aout-2026',
  title: "Visa DTV : les nouvelles règles du 31 août 2026, et qui passe entre les gouttes",
  shortTitle: 'Nouvelles règles du DTV au 31 août 2026',
  description: "Dépôt obligatoire dans son pays de nationalité ou de résidence, casier judiciaire de moins de six mois : ce qui change au 31 août 2026, ce qui ne change pas, et la clause qui protège les dossiers déjà payés.",
  excerpt: "Le dépôt à Vientiane ou Savannakhet est fermé à ceux qui n'y résident pas. Mais les dossiers déjà payés et les DTV déjà délivrés ne sont pas touchés.",
  date: '30 Août 2026',
  publishedAt: '2026-08-30T09:00:00Z',
  modifiedAt: '2026-09-02T10:00:00Z',
  category: 'Actualité',
  tagColor: 'text-red-400 border-red-500/25 bg-red-500/10',
  hoverBorder: 'hover:border-red-500/50',
  image: '/images/blog/dtv-nouvelles-regles-31-aout-2026.jpg',
},
  {
  slug: 'extension-180-jours-visa-dtv-thailande',
  title: "Extension du Visa DTV : 180 + 180 jours, et pourquoi vous n'en aurez peut-être jamais besoin",
  shortTitle: 'Extension de 180 jours du DTV',
  description: "TM7, 1 900 THB, une seule extension par entrée : la procédure réelle de l'extension du Visa DTV, et le calcul qui montre qu'une sortie du pays est souvent préférable.",
  excerpt: "Sortir de Thaïlande annule votre séjour en cours mais vous rend 180 jours neufs. Si vous rentrez en Europe une fois par an, l'extension ne vous servira jamais.",
  date: '24 Août 2026',
  publishedAt: '2026-08-24T07:00:00Z',
  modifiedAt: '2026-08-24T07:00:00Z',
  category: 'Formalités',
  tagColor: 'text-sky-400 border-sky-500/25 bg-sky-500/10',
  hoverBorder: 'hover:border-sky-500/50',
  image: '/images/blog/extension-180-jours-visa-dtv-thailande.jpg',
},
  {
  slug: 'overstay-thailande-amende-blacklist-visa-dtv',
  title: "Overstay en Thaïlande : 500 THB par jour, et l'erreur qui coûte 5 ans",
  shortTitle: 'Overstay en Thaïlande : amendes et blacklist',
  description: "500 THB par jour, plafond à 20 000 THB, et le seuil des 90 jours qui déclenche l'interdiction de retour. Le barème officiel de l'overstay en Thaïlande, source à l'appui.",
  excerpt: "Se présenter de soi-même ou être contrôlé : le même dépassement de 30 jours coûte une amende dans un cas, cinq ans d'interdiction dans l'autre.",
  date: '20 Août 2026',
  publishedAt: '2026-08-20T07:00:00Z',
  modifiedAt: '2026-08-20T07:00:00Z',
  category: 'Formalités',
  tagColor: 'text-sky-400 border-sky-500/25 bg-sky-500/10',
  hoverBorder: 'hover:border-sky-500/50',
  image: '/images/blog/overstay-thailande-amende-blacklist-visa-dtv.jpg',
},
  {
  slug: 'cas-client-visa-dtv-soft-power-vientiane',
  title: 'Visa runs : 5 000 € en 21 mois, puis un DTV de 5 ans en 3 jours',
  shortTitle: 'Cas client : 21 mois de visa runs',
  description: "Il a dépensé près de 5 000 € en visa runs sur 21 mois. Un Visa DTV de 5 ans lui aurait coûté moins de 4 000 € tout compris. Le cas d'un expatrié qui se croyait inéligible.",
  excerpt: "Sans revenus réguliers ni statut professionnel, il enchaînait les frontières depuis août 2024. Il était éligible depuis le début — il ne le savait pas.",
  date: '16 Août 2026',
  publishedAt: '2026-08-16T07:00:00Z',
  modifiedAt: '2026-08-16T07:00:00Z',
  category: 'Cas client',
  tagColor: 'text-violet-400 border-violet-500/25 bg-violet-500/10',
  hoverBorder: 'hover:border-violet-500/50',
  image: '/images/blog/cas-client-visa-dtv-soft-power-vientiane.jpg',
},
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
  tagColor: 'text-rose-400 border-rose-500/25 bg-rose-500/10',
  hoverBorder: 'hover:border-rose-500/50',
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
    modifiedAt: '2026-08-08',
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
    tagColor: 'text-teal-400 border-teal-500/25 bg-teal-500/10',
    hoverBorder: 'hover:border-teal-500/50',
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
    modifiedAt: '2026-08-08',
    category: 'Stratégie et Expatriation',
    tagColor: 'text-indigo-400 border-indigo-500/25 bg-indigo-500/10',
    hoverBorder: 'hover:border-indigo-500/50',
    image: '/images/blog/comparatif-visas-thailande.jpg',
  },
  {
    slug: 'visa-dtv-couple-famille-pacs',
    title: 'Visa DTV famille : conjoint et enfants accompagnants',
    shortTitle: 'Visa DTV famille et accompagnants',
    description: "La catégorie « conjoint et enfants accompagnants » du Visa DTV : 500 000 THB exigés de chaque personne, enfants compris, et le blocage du PACS.",
    excerpt: "Le seuil de 500 000 THB s'applique à chaque demandeur : une famille de quatre doit en justifier deux millions. Le mariage dispense le conjoint de prouver son activité, pas les fonds.",
    date: '17 Juin 2026',
    publishedAt: '2026-06-17',
    modifiedAt: '2026-09-02',
    category: 'Famille & Couple',
    tagColor: 'text-fuchsia-400 border-fuchsia-500/25 bg-fuchsia-500/10',
    hoverBorder: 'hover:border-fuchsia-500/50',
    image: '/images/blog/visa-dtv-couple-famille-pacs.jpg',
  },
  {
    slug: 'fin-exemption-visa-60-jours',
    title: "Exemption Thaïlande : 60 → 30 jours au 15 septembre 2026",
    shortTitle: "Exemption 60 → 30 jours : ce qui change",
    description: "Texte publié au Journal Royal le 31 août 2026 : 30 jours d'exemption pour les entrées à partir du 15 septembre, liste des pays réduite de 93 à 60.",
    excerpt: "C'est officiel : l'exemption touristique tombe à 30 jours pour toute entrée effectuée à partir du 15 septembre 2026. Ce qui change, ce qui reste, et ce que vous gardez si vous entrez avant.",
    date: '11 Juin 2026',
    publishedAt: '2026-06-11',
    modifiedAt: '2026-09-02',
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
    modifiedAt: '2026-08-08',
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
    tagColor: 'text-orange-400 border-orange-500/25 bg-orange-500/10',
    hoverBorder: 'hover:border-orange-500/50',
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
    modifiedAt: '2026-08-08',
    category: 'Finances',
    tagColor: 'text-teal-400 border-teal-500/25 bg-teal-500/10',
    hoverBorder: 'hover:border-teal-500/50',
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

/**
 * Un article programmé renvoie un 404 tant que sa date n'est pas atteinte.
 * Cette fonction permet de n'afficher un lien vers lui qu'une fois publié :
 * le lien apparaît alors tout seul, sans intervention.
 */
export function estPublie(slug: string): boolean {
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return false;
  return new Date(post.publishedAt) <= new Date();
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
      // Un auteur identifiable compte davantage sur un sujet où le lecteur
      // engage de l'argent et un projet de vie : Google demande explicitement
      // qu'on sache qui a écrit, et que la signature mène à des informations
      // sur son parcours.
      image: absoluteUrl('/images/matthieu-moretti.jpg'),
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
