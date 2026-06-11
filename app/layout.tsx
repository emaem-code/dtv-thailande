import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// @ts-ignore: CSS module declarations are not present in this project setup.
import './globals.css';
import FloatingCTA from './components/FloatingCTA';

const inter = Inter({ subsets: ['latin'] });

// ─── MÉTADONNÉES ULTRA-OPTIMISÉES (RÈGLE TOUT L'AUDIT CODEX) ──────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://dtv-thailande.fr'), // Résout l'absence d'URL canonique de base
  title: {
    default: "Visa DTV Thaïlande (5 ans) | Agence d'Accompagnement Premium",
    template: "%s | DTV Thaïlande" // Permet aux articles de blog d'ajouter leur titre proprement
  },
  description: 'Obtenez votre Visa Destination Thailand en toute sécurité. Accompagnement sur-mesure pour freelances et familles : dossiers, conformité bancaire et Visa Run.',
 
  openGraph: {
    title: "Visa DTV Thaïlande (5 ans) | Agence d'Accompagnement Premium",
    description: 'Obtenez votre Visa Destination Thailand en toute sécurité. Accompagnement sur-mesure pour freelances et familles.',
    url: 'https://dtv-thailande.fr',
    siteName: 'DTV Thaïlande',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/logo.png' }], // Résout le manque de og:image pour les partages de l'accueil
  },
  twitter: {
    card: 'summary_large_image', // Résout le problème des Twitter Cards tronquées
  },
};

// ─── DONNÉES STRUCTURÉES (ENTITÉ ET ENTREPRISE) ───
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "DTV Thaïlande",
  "url": "https://dtv-thailande.fr",
  "logo": "https://dtv-thailande.fr/logo.png",
  "description": "Agence spécialisée dans l'accompagnement et l'obtention du Visa DTV (Destination Thailand Visa) pour la Thaïlande.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Phuket",
    "addressCountry": "TH"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "contact@dtv-thailande.fr",
    "availableLanguage": "French"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        {/* INJECTION DU SCRIPT D'ORGANISATION SUR TOUT LE SITE */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {children}
        {/* LE BOUTON FLOTTANT INJECTÉ SUR TOUTES LES PAGES (Sauf l'accueil grâce à son code interne) */}
        <FloatingCTA />
      </body>
    </html>
  );
}