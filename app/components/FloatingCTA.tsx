"use client";

import { usePathname } from 'next/navigation';
import { useModales } from './ModalesProvider';
import { useApparitionAuScroll } from './useApparitionAuScroll';

/**
 * Bouton flottant d'accès au test d'éligibilité.
 *
 * Il n'apparaît qu'au défilement, et à des moments différents selon l'écran :
 *
 * — sur mobile, les boutons de l'en-tête sont repliés dans le menu, donc ce
 *   bouton devient le seul appel à l'action permanent : il sort tôt (300 px) ;
 * — sur ordinateur, l'en-tête est collant et son bouton reste visible en
 *   permanence : ce bouton ferait doublon, on le retient donc bien plus
 *   longtemps (1 200 px), le temps que le lecteur soit vraiment engagé.
 */
export default function FloatingCTA() {
  const pathname = usePathname();
  const { ouvrirEligibilite } = useModales();
  const passeSeuilMobile = useApparitionAuScroll(300);
  const passeSeuilDesktop = useApparitionAuScroll(1200);

  // L'accueil a son propre bandeau de prix, on n'en ajoute pas un second
  if (pathname === '/') return null;
  // L'espace d'administration et les devis remis aux clients ne sont pas des
  // pages de vente : un bouton « Vérifier mon éligibilité » y serait déplacé,
  // et il se retrouverait imprimé en travers du devis.
  if (pathname.startsWith('/admin') || pathname.startsWith('/devis/')) return null;

  return (
    <div
      className={`fixed bottom-5 right-5 z-[60] transition-all duration-500 ${
        passeSeuilMobile
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      } ${passeSeuilDesktop ? 'lg:opacity-100 lg:translate-y-0' : 'lg:opacity-0 lg:translate-y-4 lg:pointer-events-none'}`}
    >
      <button
        onClick={ouvrirEligibilite}
        className="group flex items-center gap-2.5 bg-white text-black pl-3.5 pr-5 py-3 rounded-full font-bold text-sm shadow-[0_10px_35px_rgba(0,0,0,0.6)] ring-1 ring-black/10 hover:bg-amber-400 active:scale-95 transition-all duration-300"
      >
        <svg className="w-4 h-4 flex-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="whitespace-nowrap">
          Tester mon éligibilité
        </span>
      </button>
    </div>
  );
}
