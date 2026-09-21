import type { Metadata } from 'next';
import './globals.css';
import FloatingCTA from './components/FloatingCTA';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import ModalesProvider from './components/ModalesProvider';
import BandeauBacASable from './components/BandeauBacASable';

// ─── MÉTADONNÉES ULTRA-OPTIMISÉES (RÈGLE TOUT L'AUDIT CODEX) ──────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://dtv-thailande.fr'), // Résout l'absence d'URL canonique de base
  title: {
    default: 'Visa DTV Thaïlande : conditions, tarifs et accompagnement',
    template: '%s',
  },
  description:
    'Visa DTV Thaïlande : conditions d’éligibilité, épargne exigée, frais réels et accompagnement complet du dossier, pour les freelances, les salariés à distance et les familles.',
 
  alternates: {
    canonical: '/',
  },

  // ─── ICÔNES : onglet navigateur, écran d'accueil iOS/Android ───
  // Pas de bloc `icons` ici : Next détecte automatiquement app/favicon.ico,
  // app/icon.png et app/apple-icon.png, et ajoute lui-même une empreinte
  // dans l'URL à chaque modification du fichier — ce qui casse le cache.
  // Déclarer les icônes manuellement écrasait ce mécanisme.

  openGraph: {
    title: 'Visa DTV Thaïlande : conditions, tarifs et accompagnement',
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
        {/* Mesure d'audience sans cookie ni identifiant persistant : le
            comptage se fait côté serveur à partir d'une empreinte renouvelée
            chaque jour. Rien n'est écrit dans le navigateur du visiteur, donc
            l'article 82 de la loi Informatique et Libertés ne s'applique pas
            et aucun bandeau de consentement n'est requis. Le jour où l'on
            ajoute un outil qui pose un cookie, cette phrase cesse d'être vraie
            et le bandeau devient obligatoire. */}
        {/* Ne s'affiche jamais en production : voir le fichier du composant. */}
        <BandeauBacASable />
        <Analytics />
        {/* Core Web Vitals mesurés sur les vrais visiteurs, et non en
            laboratoire : c'est ce que Search Console reproche sans jamais dire
            sur quelle page. */}
        <SpeedInsights />
      </body>
    </html>
  );
}
