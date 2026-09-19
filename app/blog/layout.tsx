import React from 'react';
import SiteHeader from '../components/SiteHeader';
import AlertesReglementaires from '../components/AlertesReglementaires';

/**
 * En-tête et pied communs à l'index du blog et à tous les articles.
 * Évite d'ajouter les composants page par page sur les dix-huit articles.
 *
 * Le bloc d'inscription aux alertes vit ici, et pas ailleurs : quelqu'un qui
 * vient de lire pourquoi le dépôt en Asie a été fermé sait déjà pourquoi il
 * voudrait être prévenu la prochaine fois. La même proposition sur la page
 * d'accueil n'aurait aucun contexte.
 */
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <AlertesReglementaires />
    </>
  );
}
