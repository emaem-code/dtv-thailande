'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const ONGLETS = [
  { href: '/admin/devis', libelle: 'Devis' },
  { href: '/admin/leads', libelle: 'Demandes' },
];

export default function OngletsAdmin() {
  const chemin = usePathname();
  const router = useRouter();

  // La page de connexion a son propre écran, sans navigation : y afficher des
  // onglets vers des pages inaccessibles n'aurait aucun sens.
  if (chemin === '/admin/connexion') return null;

  const deconnecter = async () => {
    await fetch('/api/admin/connexion', { method: 'DELETE' });
    router.replace('/admin/connexion');
    router.refresh();
  };

  return (
    <header className="border-b border-white/10 bg-[#0d0d0d] sticky top-0 z-40 print:hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 flex items-center gap-6 h-14">
        <Link href="/admin/devis" className="font-bold text-white text-sm tracking-tight flex-none">
          DTV <span className="text-amber-500">Admin</span>
        </Link>

        <nav className="flex items-center gap-1 flex-1">
          {ONGLETS.map((o) => {
            const actif = chemin === o.href || chemin.startsWith(`${o.href}/`);
            return (
              <Link
                key={o.href}
                href={o.href}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  actif
                    ? 'bg-amber-500/15 text-amber-400 font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {o.libelle}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/"
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors hidden sm:block"
        >
          Voir le site
        </Link>
        <button
          onClick={deconnecter}
          className="text-xs text-gray-500 hover:text-red-400 transition-colors"
        >
          Quitter
        </button>
      </div>
    </header>
  );
}
