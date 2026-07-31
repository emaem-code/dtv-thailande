import React from 'react';
import SiteHeader from '../components/SiteHeader';

/**
 * En-tête commun à l'index du blog et à tous les articles.
 * Évite d'ajouter le composant page par page sur les dix-huit articles.
 */
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
}
