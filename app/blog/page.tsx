import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

// ─── MÉTADONNÉES SEO DE L'ACCUEIL DU BLOG ───
export const metadata: Metadata = {
  title: 'Le Blog du Visa DTV Thaïlande | Guides et Stratégies d\'Expatriation',
  description: 'Découvrez nos guides exclusifs sur le Visa DTV : conformité des fonds bancaires, sélection des écoles Soft Power et formalités d\'arrivée comme le TDAC.',
  openGraph: {
    title: 'Le Blog du Visa DTV Thaïlande | Guides et Stratégies d\'Expatriation',
    description: 'Tutoriels, décryptages légaux et astuces de terrain pour réussir votre visa de 5 ans.',
    url: 'https://dtv-thailande.fr/blog',
    siteName: 'DTV Thaïlande',
    locale: 'fr_FR',
    type: 'website',
  },
};

// ─── SCHEMA BLOG JSON-LD ──────────────────────────────────────────────────────
const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Blog DTV Thaïlande",
  "description": "Guides, stratégies et conseils d'experts pour obtenir le Visa DTV et réussir son expatriation en Thaïlande.",
  "url": "https://dtv-thailande.fr/blog",
  "publisher": {
    "@type": "Organization",
    "name": "DTV Thaïlande",
    "logo": {
      "@type": "ImageObject",
      "url": "https://dtv-thailande.fr/logo.png"
    }
  }
};

// ─── LISTE DES ARTICLES DE BLOG ───────────────────────────────────────────────
const posts = [
  {
    slug: 'fin-exemption-visa-60-jours', // <--- C'EST ICI QU'IL FAUT METTRE LE BON DOSSIER
    title: "Urgent : La Thaïlande met fin à l'exemption de 60 jours (Retour aux 30 jours)",
    description: "Le gouvernement vient d'annuler la mesure phare de l'exemption de visa longue durée. Découvrez les nouvelles règles strictes d'immigration et l'impact sur vos séjours.",
    date: '11 Juin 2026',
    category: 'Actualité',
    tagColor: 'text-red-400 border-red-500/25 bg-red-500/10',
    hoverBorder: 'hover:border-red-500/50',
  },
  {
    slug: 'visa-dtv-freelance-auto-entrepreneur', // <--- CELUI DES FREELANCES
    title: "Visa DTV Freelance & Auto-Entrepreneur : Dossier Sans Fiche de Paie",
    description: "Comment obtenir le Visa DTV Thaïlande quand on est auto-entrepreneur ou freelance ? Kbis, URSSAF, portfolio : le guide complet pour monter un dossier béton.",
    date: '10 Juin 2026',
    category: 'Freelance',
    tagColor: 'text-purple-400 border-purple-500/25 bg-purple-500/10',
    hoverBorder: 'hover:border-purple-500/50',
  },
  {
    slug: 'tdac-thailande-carte-arrivee',
    title: "TDAC Thaïlande 2026 : Guide Complet de la Nouvelle Carte d'Arrivée Numérique",
    description: "Le guide étape par étape pour remplir le nouveau formulaire TDAC obligatoire pour entrer en Thaïlande. Évitez les blocages à l'embarquement.",
    date: '09 Juin 2026',
    category: 'Formalités',
    tagColor: 'text-sky-400 border-sky-500/25 bg-sky-500/10',
    hoverBorder: 'hover:border-sky-500/50',
  },
  {
    slug: 'visa-dtv-soft-power-ecoles',
    title: 'Visa DTV Soft Power : Éviter les arnaques des écoles (Cuisine & Muay Thaï)',
    description: 'Le guide définitif pour obtenir le Visa DTV via la voie culturelle. Comparatif Cuisine vs Muay Thaï, gestion des présences et pièges à éviter.',
    date: '08 Juin 2026',
    category: 'Soft Power',
    tagColor: 'text-emerald-400 border-emerald-500/25 bg-emerald-500/10',
    hoverBorder: 'hover:border-emerald-500/50',
  },
  {
    slug: 'fonds-bancaires-visa-dtv',
    title: 'Visa DTV : Faut-il bloquer les 500 000 THB pendant 3 ou 6 mois ?',
    description: "Exigences officielles des ambassades sur la preuve financière de 500 000 THB pour le Visa DTV. L'erreur fatale du virement de dernière minute.",
    date: '01 Juin 2026',
    category: 'Finances',
    tagColor: 'text-amber-400 border-amber-500/25 bg-amber-500/10',
    hoverBorder: 'hover:border-amber-500/50',
  }
];

export default function BlogIndex() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] py-20 px-4 sm:px-6">
      
      {/* ── INJECTION DU SCRIPT SEO ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <div className="max-w-5xl mx-auto">
        
        {/* ── EN-TÊTE ÉDITORIAL (Correction "Thin Content") ── */}
        <div className="text-center mb-16 mt-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-wide mb-6">
            Le Blog <span className="text-amber-500">DTV Thaïlande</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Décryptage légal, stratégies financières et réalités du terrain. 
            Découvrez nos guides complets pour monter un dossier consulaire irréfutable 
            et réussir votre installation en Thaïlande sans mauvaise surprise.
          </p>
        </div>

        {/* ── GRILLE DES ARTICLES ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className={`group flex flex-col justify-between p-8 rounded-3xl bg-[#111111] border border-white/10 transition-all duration-300 ${post.hoverBorder} hover:bg-[#161616] hover:-translate-y-1 shadow-lg`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className={`inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border ${post.tagColor}`}>
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm font-medium">
                    {post.date}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-gray-200 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  {post.description}
                </p>
              </div>

              <div className="flex items-center text-sm font-bold text-white group-hover:text-amber-500 transition-colors">
                Lire l'article 
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* ── CTA BAS DE PAGE ── */}
        <div className="mt-20 p-8 bg-[#111111] border border-gray-800 rounded-3xl text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500 opacity-5 rounded-full blur-3xl"></div>
          
          <h3 className="text-2xl text-white font-bold mb-4 relative z-10">
            Passez de la théorie à la pratique
          </h3>
          <p className="text-gray-400 mb-8 relative z-10 max-w-xl mx-auto">
            Vous avez lu nos guides mais vous souhaitez déléguer la charge administrative ? 
            Nous prenons en main l'intégralité de votre dossier DTV.
          </p>
          
          <Link 
            href="/contact" 
            className="relative z-10 inline-flex items-center justify-center bg-white text-black font-bold text-lg py-4 px-8 rounded-full hover:bg-gray-200 transition-all duration-300 active:scale-95"
          >
            Nous confier votre dossier
          </Link>
        </div>

      </div>
    </main>
  );
}