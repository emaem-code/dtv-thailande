import React from 'react';
import type { Metadata } from 'next';
import OngletsAdmin from './OngletsAdmin';

/**
 * L'espace d'administration ne doit jamais être indexé, ni suivi par un
 * moteur. `noindex` s'ajoute au filtrage par mot de passe : la ceinture et
 * les bretelles, parce qu'une page d'admin qui remonte dans les résultats de
 * recherche est un classique.
 */
export const metadata: Metadata = {
  title: 'Administration — DTV Thaïlande',
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <OngletsAdmin />
      <main className="max-w-6xl mx-auto px-5 sm:px-6 py-8">{children}</main>
    </div>
  );
}
