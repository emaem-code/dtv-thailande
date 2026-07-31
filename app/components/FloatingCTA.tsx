"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useModales } from './ModalesProvider';

export default function FloatingCTA() {
  const pathname = usePathname();
  const { ouvrirEligibilite } = useModales();
  const [isMounted, setIsMounted] = useState(false);

  // Évite les erreurs d'hydratation entre le serveur et le client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // On ne l'affiche pas si la page n'est pas chargée OU si on est sur l'accueil
  if (!isMounted || pathname === '/') return null;

  return (
    <div className="fixed bottom-6 right-6 z-[90] animate-in fade-in slide-in-from-bottom-4 duration-700">
      <button
        onClick={ouvrirEligibilite}
        className="group relative flex items-center gap-3 bg-black/80 backdrop-blur-xl border border-amber-500/30 p-1.5 pr-5 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.6)] hover:border-amber-500/60 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <div className="flex items-center justify-center w-10 h-10 bg-amber-500 text-black rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)]">
          {/* Icône de validation : on ouvre le test, on ne renvoie plus à l'accueil */}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex flex-col justify-center text-left">
          <span className="text-white text-sm font-bold tracking-wide group-hover:text-amber-400 transition-colors leading-tight">
            Vérifier mon éligibilité
          </span>
          <span className="text-gray-400 text-[10px] uppercase tracking-wider font-semibold">
            2 minutes, sans engagement
          </span>
        </div>
      </button>
    </div>
  );
}