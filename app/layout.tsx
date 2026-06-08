import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// ─── MÉTADONNÉES OPTIMISÉES POUR L'ACCUEIL ───
export const metadata: Metadata = {
  title: 'Visa DTV Thaïlande (5 ans) | Agence d\'Accompagnement Premium',
  description: 'Obtenez votre Visa Destination Thailand en toute sécurité. Accompagnement sur-mesure pour freelances et familles : dossiers, conformité bancaire et Visa Run.',
  openGraph: {
    title: 'Visa DTV Thaïlande | Agence d\'Accompagnement Premium',
    description: 'Obtenez votre Visa Destination Thailand en toute sécurité.',
    url: 'https://dtv-thailande.fr',
    siteName: 'DTV Thaïlande',
    locale: 'fr_FR',
    type: 'website',
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
      </body>
    </html>
  );
}