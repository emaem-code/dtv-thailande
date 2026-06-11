import { Metadata } from 'next';

// ─── MÉTADONNÉES DE LA FAQ (GÉRÉES ICI CAR LA PAGE EST UN COMPOSANT CLIENT) ───
export const metadata: Metadata = {
  title: 'FAQ Visa DTV Thaïlande : Vos questions fréquentes sur le visa 5 ans',
  description: 'Fonds bancaires, freelance, soft power, famille : trouvez toutes les réponses officielles et détaillées à vos questions sur le Visa Destination Thailand (DTV).',
  alternates: {
    canonical: 'https://dtv-thailande.fr/faq',
  },
  openGraph: {
    title: 'FAQ Visa DTV Thaïlande | Toutes vos questions sur le visa 5 ans',
    description: 'Consultez notre FAQ complète : fonds bancaires, freelances, écoles Soft Power, famille et fiscalité pour le Visa DTV.',
    url: 'https://dtv-thailande.fr/faq',
    siteName: 'DTV Thaïlande',
    images: [{ url: '/logo.png' }], // Le logo s'affichera lors des partages
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ Visa DTV Thaïlande | Vos questions sur le visa 5 ans',
    description: 'Découvrez toutes nos réponses officielles sur le Visa DTV : finances, freelances, Soft Power, famille et fiscalité.',
    images: ['/logo.png'],
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}