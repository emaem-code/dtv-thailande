import type { Metadata } from 'next';
import './globals.css';
import FloatingCTA from './components/FloatingCTA';

// ─── MÉTADONNÉES ULTRA-OPTIMISÉES (RÈGLE TOUT L'AUDIT CODEX) ──────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://dtv-thailande.fr'), // Résout l'absence d'URL canonique de base
  title: {
    default: 'Visa DTV Thaïlande : accompagnement 5 ans',
    template: '%s',
  },
  description: 'Obtenez votre Visa Destination Thailand en toute sécurité. Accompagnement sur-mesure pour freelances et familles : dossiers, conformité bancaire et Visa Run.',
 
  alternates: {
    canonical: '/',
  },

  // ─── ICÔNES : onglet navigateur, écran d'accueil iOS/Android ───
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },

  openGraph: {
    title: 'Visa DTV Thaïlande : accompagnement 5 ans',
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
      <body className="bg-black text-white antialiased font-sans">
        {children}
        {/* LE BOUTON FLOTTANT INJECTÉ SUR TOUTES LES PAGES (Sauf l'accueil grâce à son code interne) */}
        <FloatingCTA />
      </body>
    </html>
  );
}
