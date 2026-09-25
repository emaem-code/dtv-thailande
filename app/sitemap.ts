import { MetadataRoute } from 'next';
import { baseUrl, getSortedBlogPosts } from './blog/posts';

// Dates éditoriales, à maintenir lors d'un changement réel du contenu de la page
// (y compris ses composants et données). Un build ou une retouche de style
// ne doit pas les faire avancer.
const DATES_MODIFICATION_CONTENU = {
  '/': '2026-09-25', // Argument du film explicatif.
  '/blog': '2026-09-25', // Description du blog.
  '/faq': '2026-09-22', // Seuil bancaire et liens vers l'ambassade.
  '/eligibilite': '2026-09-25', // Texte de confirmation et prise de rendez-vous.
  '/contact': '2026-09-25', // Interlocuteur unique et délai de réponse.
  '/mentions-legales': '2026-09-18', // Identité légale et informations de l'entreprise.
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: DATES_MODIFICATION_CONTENU['/'],
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: DATES_MODIFICATION_CONTENU['/blog'],
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: DATES_MODIFICATION_CONTENU['/faq'],
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      // Page de conversion : c'est la destination que l'on partage par e-mail
      // aux prospects, et la cible des requêtes « suis-je éligible au DTV ».
      url: `${baseUrl}/eligibilite`,
      lastModified: DATES_MODIFICATION_CONTENU['/eligibilite'],
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: DATES_MODIFICATION_CONTENU['/contact'],
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: DATES_MODIFICATION_CONTENU['/mentions-legales'],
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = getSortedBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.modifiedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}
