'use client';

import React from 'react';
import Link from 'next/link';

export default function BlogIndex() {
  // C'est ici que tu ajouteras tes futurs articles
  const articles = [
    {
      id: 1,
      title: "Visa DTV Thaïlande : Faut-il bloquer les 500 000 THB pendant 3 ou 6 mois ?",
      excerpt: "La fameuse preuve financière cristallise toutes les angoisses. Faut-il laisser cet argent bloqué ? L'ambassade de Paris est-elle plus stricte ? Voici la réponse officielle.",
      category: "Finances & Épargne",
      date: "Juin 2026",
      readTime: "4 min",
      slug: "fonds-bancaires-visa-dtv", // Doit correspondre exactement au nom de ton dossier
    },
    // Pour ajouter un nouvel article plus tard, il suffira de copier-coller ce bloc au-dessus
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* En-tête de la page */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-wide mb-4">
            Le Blog <span className="text-amber-500">DTV</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Décryptages, stratégies et conseils d'experts pour sécuriser votre Visa Destination Thailand et réussir votre expatriation.
          </p>
        </div>

        {/* Grille des articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link 
              key={article.id} 
              href={`/blog/${article.slug}`}
              className="group flex flex-col bg-[#111111] border border-white/10 rounded-3xl overflow-hidden hover:border-amber-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] hover:-translate-y-1"
            >
              {/* Image / Visuel de la carte */}
              <div className="w-full h-48 bg-gradient-to-br from-gray-800 to-black relative overflow-hidden flex items-center justify-center border-b border-white/5">
                <div className="absolute inset-0 bg-[url('/poster-budget.jpg')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-500 grayscale group-hover:grayscale-0"></div>
                <div className="absolute inset-0 bg-black/40"></div>
                {/* Icône décorative */}
                <svg className="w-12 h-12 text-amber-500/50 group-hover:scale-110 transition-transform duration-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15M9 11l3 3m0 0l3-3m-3 3V8" />
                </svg>
              </div>

              {/* Contenu de la carte */}
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {article.readTime} de lecture
                  </span>
                </div>
                
                <h2 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-amber-400 transition-colors">
                  {article.title}
                </h2>
                
                <p className="text-gray-400 text-sm leading-relaxed flex-1">
                  {article.excerpt}
                </p>

                <div className="mt-6 flex items-center text-sm font-bold text-white group-hover:text-amber-500 transition-colors">
                  Lire l'article
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}