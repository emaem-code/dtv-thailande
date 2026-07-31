import type { Metadata } from 'next';
import './globals.css';
import FloatingCTA from './components/FloatingCTA';
import ModalesProvider from './components/ModalesProvider';

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
  // Pas de bloc `icons` ici : Next détecte automatiquement app/favicon.ico,
  // app/icon.png et app/apple-icon.png, et ajoute lui-même une empreinte
  // dans l'URL à chaque modification du fichier — ce qui casse le cache.
  // Déclarer les icônes manuellement écrasait ce mécanisme.

  openGraph: {
    title: 'Visa DTV Thaïlande : accompagnement 5 ans',
    description: 'Obtenez votre Visa Destination Thailand en toute sécurité. Accompagnement sur-mesure pour freelances et familles.',
    url: 'https://dtv-thailande.fr',
    siteName: 'DTV Thaïlande',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/og-image.jpg' }], // Résout le manque de og:image pour les partages de l'accueil
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
        {/* Les fenêtres du site sont montées ici : toutes les pages y ont accès.
            Le bouton flottant doit être À L'INTÉRIEUR du fournisseur, sinon il
            ne peut pas ouvrir le test d'éligibilité. */}
        <ModalesProvider>
          {children}
          {/* Bouton flottant présent sur toutes les pages sauf l'accueil */}
          <FloatingCTA />
        </ModalesProvider>
      </body>
    </html>
  );
}
