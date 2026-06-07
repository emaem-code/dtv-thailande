import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ Visa DTV Thaïlande : Vos questions fréquentes sur le visa 5 ans',
  description: 'Fonds bancaires, freelance, soft power, famille : trouvez toutes les réponses officielles et détaillées à vos questions sur le Visa Destination Thailand (DTV).',
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}