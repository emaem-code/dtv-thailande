'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useModales } from './ModalesProvider';

/**
 * En-tête unique du site, présent sur toutes les pages.
 *
 * Logo D-avion à gauche, toujours cliquable vers l'accueil. Menu identique
 * partout : sur ordinateur les liens sont affichés, sur mobile ils passent
 * dans un panneau déroulant à droite, comme dans une application.
 *
 * Les trois fenêtres (méthode, guide, éligibilité) sont montées à la racine
 * du site : les boutons les ouvrent donc directement, depuis n'importe quelle
 * page, sans jamais renvoyer vers l'accueil.
 */
export default function SiteHeader() {
  const { ouvrirGuide, ouvrirEligibilite, ouvrirMethode } = useModales();
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    document.body.style.overflow = ouvert ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [ouvert]);

  const fermer = () => setOuvert(false);

  const liens = [
    { label: 'Notre méthode', action: ouvrirMethode, href: '/' },
    { label: 'Tarifs', href: '/#tarifs' },
    { label: 'Le blog', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-[70] w-full border-b border-white/[0.06] bg-[#0a0a0a]/85 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

          {/* ── LOGO : retour à l'accueil ── */}
          <Link
            href="/"
            onClick={fermer}
            className="flex items-center gap-3 shrink-0 group"
            aria-label="Retour à l'accueil"
          >
            <Image
              src="/logo.svg?v=2"
              alt="DTV Destination Thaïlande"
              width={38}
              height={38}
              priority
              unoptimized
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="leading-none">
              <span className="block text-lg font-black text-white tracking-tight">DTV</span>
              <span className="block text-[8px] font-bold text-amber-500 tracking-[0.18em] uppercase mt-0.5">
                Destination Thaïlande
              </span>
            </span>
          </Link>

          {/* ── LIENS : ordinateur ── */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-400">
            {liens.map((l) =>
              l.action ? (
                <button key={l.label} onClick={l.action} className="hover:text-white transition-colors">
                  {l.label}
                </button>
              ) : (
                <Link key={l.label} href={l.href} className="hover:text-white transition-colors">
                  {l.label}
                </Link>
              ),
            )}
          </nav>

          {/* ── ACTIONS ── */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={ouvrirGuide}
              className="hidden sm:inline-flex items-center gap-2 border border-amber-500/40 text-amber-500 font-bold text-xs py-2 px-4 rounded-full hover:bg-amber-500/10 transition-all"
            >
              Guide gratuit
            </button>

            <button
              onClick={ouvrirEligibilite}
              className="hidden sm:inline-flex bg-white text-black font-bold text-xs py-2.5 px-4 rounded-full hover:bg-gray-200 transition-all active:scale-95"
            >
              Test d&apos;éligibilité
            </button>

            {/* ── BOUTON MENU : mobile ── */}
            <button
              onClick={() => setOuvert(true)}
              className="lg:hidden p-2 -mr-2 text-white hover:text-amber-400 transition-colors"
              aria-label="Ouvrir le menu"
              aria-expanded={ouvert}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── PANNEAU MOBILE : glisse depuis la droite ── */}
      {ouvert && (
        <div className="lg:hidden fixed inset-0 z-[100]">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={fermer}
          />

          <div className="absolute top-0 right-0 h-full w-[82%] max-w-sm bg-[#0d0d0d] border-l border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
              <span className="text-[10px] font-bold text-amber-500 tracking-[0.2em] uppercase">
                Menu
              </span>
              <button
                onClick={fermer}
                className="p-2 -mr-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Fermer le menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-3">
              {liens.map((l) =>
                l.action ? (
                  <button
                    key={l.label}
                    onClick={() => {
                      l.action?.();
                      fermer();
                    }}
                    className="w-full text-left px-5 py-4 text-white font-medium border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    {l.label}
                  </button>
                ) : (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={fermer}
                    className="block px-5 py-4 text-white font-medium border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    {l.label}
                  </Link>
                ),
              )}
              <Link
                href="/mentions-legales"
                onClick={fermer}
                className="block px-5 py-4 text-gray-500 text-sm border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                Mentions légales
              </Link>
            </nav>

            <div className="p-4 border-t border-white/10 space-y-2.5">
              <button
                onClick={() => {
                  ouvrirGuide();
                  fermer();
                }}
                className="w-full inline-flex items-center justify-center gap-2 border border-amber-500/50 text-amber-500 font-bold text-sm py-3.5 rounded-full hover:bg-amber-500/10 transition-all"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                </span>
                Le guide gratuit
              </button>

              <button
                onClick={() => {
                  ouvrirEligibilite();
                  fermer();
                }}
                className="w-full inline-flex items-center justify-center bg-white text-black font-bold text-sm py-3.5 rounded-full hover:bg-gray-200 transition-all active:scale-95"
              >
                Test d&apos;éligibilité
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
