import React from 'react';
import { Metadata } from 'next';
import SiteHeader from '../components/SiteHeader';

// ─── MÉTADONNÉES DE LA FAQ (GÉRÉES ICI CAR LA PAGE EST UN COMPOSANT CLIENT) ───
export const metadata: Metadata = {
  title: 'FAQ Visa DTV Thaïlande : 30 questions, 30 réponses',
  description: "Fonds bancaires, freelance, Soft Power, famille, TM47, extension, overstay, fiscalité : toutes les réponses documentées sur le Visa DTV, sources officielles à l'appui.",
  alternates: {
    canonical: 'https://dtv-thailande.fr/faq',
  },
  openGraph: {
    title: 'FAQ Visa DTV Thaïlande : 30 questions, 30 réponses',
    description: 'Consultez notre FAQ complète : fonds bancaires, freelances, écoles Soft Power, famille et fiscalité pour le Visa DTV.',
    url: 'https://dtv-thailande.fr/faq',
    siteName: 'DTV Thaïlande',
    images: [{ url: '/og-image.jpg' }], // Le logo s'affichera lors des partages
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ Visa DTV Thaïlande : 30 questions, 30 réponses',
    description: 'Découvrez toutes nos réponses officielles sur le Visa DTV : finances, freelances, Soft Power, famille et fiscalité.',
    images: ['/og-image.jpg'],
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
}
