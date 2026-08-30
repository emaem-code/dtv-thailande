'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Bandeau d'annonce réglementaire, affiché sous l'en-tête sur tout le site.
 *
 * Volontairement un bandeau et non une fenêtre modale. Google déconseille
 * explicitement les calques qui recouvrent le contenu à l'arrivée du visiteur
 * et recommande à la place « des bannières qui n'occupent qu'une petite
 * fraction de l'écran » : l'essentiel du trafic du site venant de la recherche
 * sur les articles du blog, une modale d'accueil mettrait en jeu l'actif qu'on
 * cherche justement à faire vivre.
 *
 * Le ton est mesuré pour la même raison : le message principal de l'article
 * annoncé est que la majorité des lecteurs ne sont PAS concernés. Une alerte
 * rouge indifférenciée dirait le contraire et inquiéterait des détenteurs de
 * DTV dont le visa n'est pas menacé.
 */

/** Article vers lequel le bandeau renvoie. */
const SLUG_ANNONCE = 'dtv-nouvelles-regles-31-aout-2026';

/**
 * Date après laquelle le bandeau disparaît de lui-même.
 *
 * Une annonce « nouveau » encore affichée dans trois mois devient du papier
 * peint que plus personne ne voit, et elle date le site. Cette constante évite
 * d'avoir à y repenser : passé cette date, plus rien ne s'affiche.
 */
const FIN_ANNONCE = new Date('2026-10-31T23:59:59Z');

/**
 * Pages où le bandeau serait redondant : l'article lui-même, et les trois
 * articles qui portent déjà leur propre encart de mise à jour en tête. Deux
 * bandeaux empilés font bricolage.
 */
const CHEMINS_EXCLUS = [
  `/blog/${SLUG_ANNONCE}`,
  '/blog/cas-client-visa-dtv-soft-power-vientiane',
  '/blog/fonds-bancaires-visa-dtv',
  '/blog/visa-dtv-freelance-auto-entrepreneur',
];

/** Clé de mémorisation du refus. Versionnée : une future annonce reparaîtra. */
const CLE_STOCKAGE = `annonce-fermee:${SLUG_ANNONCE}`;

export default function BandeauAnnonce() {
  const chemin = usePathname();
  // Rien n'est rendu au premier passage : le serveur ne connaît pas le choix
  // du visiteur, et afficher puis retirer le bandeau provoquerait un saut de
  // mise en page à l'hydratation.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (new Date() > FIN_ANNONCE) return;
    try {
      if (window.localStorage.getItem(CLE_STOCKAGE) === '1') return;
    } catch {
      /* navigation privée ou stockage bloqué : on affiche, sans mémoriser */
    }
    setVisible(true);
  }, []);

  const fermer = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(CLE_STOCKAGE, '1');
    } catch {
      /* le refus ne sera pas mémorisé, ce n'est pas bloquant */
    }
  };

  if (!visible || CHEMINS_EXCLUS.includes(chemin)) return null;

  return (
    <div
      role="region"
      aria-label="Annonce : évolution des règles du Visa DTV"
      className="w-full border-b border-amber-500/20 bg-amber-500/[0.07]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-3">
        <p className="flex-1 text-xs sm:text-sm text-gray-300 leading-snug">
          <span className="font-semibold text-amber-400">Nouveau — 31 août 2026 :</span>{' '}
          deux conditions s&apos;ajoutent au dépôt d&apos;un Visa DTV. Les dossiers déjà payés et les
          visas déjà délivrés ne sont pas concernés.{' '}
          <Link
            href={`/blog/${SLUG_ANNONCE}`}
            className="text-amber-400 font-medium underline underline-offset-2 hover:text-amber-300 transition-colors whitespace-nowrap"
          >
            Lire ce qui change
          </Link>
        </p>
        <button
          onClick={fermer}
          aria-label="Masquer cette annonce"
          className="flex-none p-1.5 rounded-full text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
