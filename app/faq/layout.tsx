import { Metadata } from 'next';

// ─── MÉTADONNÉES DE LA FAQ (GÉRÉES ICI CAR LA PAGE EST UN COMPOSANT CLIENT) ───
export const metadata: Metadata = {
  title: 'FAQ Visa DTV Thaïlande : Vos questions fréquentes sur le visa 5 ans',
  description: 'Fonds bancaires, freelance, soft power, famille : trouvez toutes les réponses officielles et détaillées à vos questions sur le Visa Destination Thailand (DTV).',
  alternates: {
    canonical: 'https://dtv-thailande.fr/faq', // <-- LE CANONICAL POUR LA FAQ SE MET ICI
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}