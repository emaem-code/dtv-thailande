import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // Le "*" signifie que la règle s'applique à tous les robots (Google, Bing, etc.)
      allow: '/', // On autorise l'accès à la racine et à tout le site
      disallow: ['/private/', '/api/'], // On interdit l'accès aux dossiers privés ou techniques
    },
    sitemap: 'https://dtv-thailande.fr/sitemap.xml', // On indique où trouver la carte
  };
}