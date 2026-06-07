import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preuve bancaire visa DTV : 500 000 THB, 3 ou 6 mois ?',
  description: 'Faut-il bloquer 15 000 € pour le Visa DTV Thaïlande ? Découvrez les exigences officielles des ambassades sur l\'historique de 3 à 6 mois et les erreurs à éviter.',
};

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}