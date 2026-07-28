import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import BlogNavigation from '../components/BlogNavigation';
import { getSortedBlogPosts } from './posts';
export const revalidate = 600;

// ─── MÉTADONNÉES SEO DE L'ACCUEIL DU BLOG (CORRIGÉES) ───
export const metadata: Metadata = {
  title: 'Blog Visa DTV Thaïlande : guides pratiques',
  description: 'Découvrez nos guides exclusifs sur le Visa DTV : conformité des fonds bancaires, sélection des écoles Soft Power et formalités d\'arrivée comme le TDAC.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog Visa DTV Thaïlande : guides pratiques',
    description: 'Tutoriels, décryptages légaux et astuces de terrain pour réussir votre visa de 5 ans.',
    url: '/blog',
    siteName: 'DTV Thaïlande',
    locale: 'fr_FR',
    type: 'website',
    // TODO: Générer un opengraph-image.tsx ou lier une image spécifique à cette page quand les vraies miniatures seront disponibles.
    images: [{ url: '/logo.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Visa DTV Thaïlande : guides pratiques',
    description: 'Tutoriels, décryptages légaux et astuces de terrain pour réussir votre visa de 5 ans.',
    images: ['/logo.png'], // <-- RÉSOUT L'ANOMALIE TWITTER:IMAGE
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

export default function BlogIndex() {
  const sortedPosts = getSortedBlogPosts();

  return (
    <main className="min-h-screen bg-[#0a0a0a] py-20 px-4 sm:px-6">
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <div className="max-w-5xl mx-auto">
        <BlogNavigation variant="blog-index" />
        
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sortedPosts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className={`group flex flex-col justify-between p-8 rounded-3xl bg-[#111111] border border-white/10 transition-all duration-300 ${post.hoverBorder} hover:bg-[#161616] hover:-translate-y-1 shadow-lg`}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className={`inline-block whitespace-nowrap text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border ${post.tagColor}`}>
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm font-medium shrink-0">
                    {post.date}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-gray-200 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center text-sm font-bold text-white group-hover:text-amber-500 transition-colors">
                Lire l&apos;article
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">→</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-20 p-8 bg-[#111111] border border-gray-800 rounded-3xl text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500 opacity-5 rounded-full blur-3xl"></div>
          
          <h3 className="text-2xl text-white font-bold mb-4 relative z-10">
            Passez de la théorie à la pratique
          </h3>
          <p className="text-gray-400 mb-8 relative z-10 max-w-xl mx-auto">
            Vous avez lu nos guides mais vous souhaitez déléguer la charge administrative ? 
            Nous prenons en main l&apos;intégralité de votre dossier DTV.
          </p>
          
          <Link 
            href="/contact" 
            className="relative z-10 inline-flex items-center justify-center bg-white text-black font-bold text-lg py-4 px-8 rounded-full hover:bg-gray-200 transition-all duration-300 active:scale-95"
          >
            Nous confier votre dossier
          </Link>
        </div>

      </div>

      <section className="max-w-4xl mx-auto mt-16 pt-8 border-t border-white/10 text-center">
        <h2 className="text-xl font-bold text-white mb-4">Ressources Officielles</h2>
        <p className="text-gray-400 text-sm mb-6">
          Pour approfondir vos démarches, consultez les plateformes gouvernementales :
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <a 
            href="http://www.thaiembassy.fr/fr/visa-rdv/les-types-de-visa-et-les-documents-necessaires/dtv/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-amber-500 hover:text-amber-400 hover:underline transition-colors text-sm font-medium"
          >
            Ambassade Royale de Thaïlande
          </a>
          <a 
            href="https://www.tatnews.org" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-amber-500 hover:text-amber-400 hover:underline transition-colors text-sm font-medium"
          >
            Tourism Authority of Thailand (TAT)
          </a>
        </div>
      </section>

    </main>
  );
}
