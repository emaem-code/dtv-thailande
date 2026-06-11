"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function FloatingCTA() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  // Évite les erreurs d'hydratation entre le serveur et le client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // On ne l'affiche pas si la page n'est pas chargée OU si on est sur l'accueil
  if (!isMounted || pathname === '/') return null;

  return (
    <div className="fixed bottom-6 right-6 z-[90] animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link
        href="/"
        className="group relative flex items-center gap-3 bg-black/80 backdrop-blur-xl border border-amber-500/30 p-1.5 pr-5 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.6)] hover:border-amber-500/60 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <div className="flex items-center justify-center w-10 h-10 bg-amber-500 text-black rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)]">
          {/* Icône de Maison */}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-white text-sm font-bold tracking-wide group-hover:text-amber-400 transition-colors leading-tight">
            Vérifier mon éligibilité
          </span>
          <span className="text-gray-400 text-[10px] uppercase tracking-wider font-semibold">
            & Guide gratuit
          </span>
        </div>
      </Link>
    </div>
  );
}