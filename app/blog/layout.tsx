import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Visa DTV Thaïlande : Stratégies, Fiscalité et Expatriation',
  description: 'Découvrez nos décryptages, conseils d\'experts et stratégies pour sécuriser votre Visa Destination Thailand (DTV) et réussir votre installation.',
};

export default function BlogIndexLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}