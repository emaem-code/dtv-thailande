'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Faut-il bloquer les 500 000 THB pendant 5 ans pour le Visa DTV ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non, il n'est pas nécessaire de bloquer les fonds pendant 5 ans. L'ambassade exige de prouver un solde de 500 000 THB (environ 14 500 €) avec un historique bancaire stable de 3 à 6 mois au moment du dépôt du dossier."
      }
    },
    {
      "@type": "Question",
      "name": "Quels documents doit fournir un freelance ou auto-entrepreneur ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un freelance doit présenter un dossier solide comprenant : son Kbis (ou avis Sirene), ses statuts traduits en anglais, un portfolio professionnel, ainsi que des contrats clients actifs prouvant la pérennité de son activité à distance."
      }
    },
    {
      "@type": "Question",
      "name": "Le PACS est-il reconnu pour le statut d'accompagnant ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non, les ambassades thaïlandaises ne reconnaissent pas le PACS. Seuls les conjoints légalement mariés et les enfants légitimes (de moins de 20 ans) peuvent bénéficier du visa DTV en tant qu'accompagnant (DTV Spouse/Child)."
      }
    }
  ]
};

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      id: "finances",
      category: "Finances & Épargne",
      q: "Faut-il bloquer 15 000 € sur mon compte pendant les 5 ans du visa ?",
      a: (
        <>
          Non. L'administration exige de prouver la liquidité de 500 000 THB (env. 14 500 €) uniquement lors de la demande initiale (et lors d'éventuelles extensions). L'argent n'est pas bloqué. Pour comprendre les subtilités d'historique de 3 ou 6 mois, consultez notre <Link href="/blog/fonds-bancaires-visa-dtv" className="text-amber-500 hover:underline font-medium">décryptage complet sur les fonds bancaires</Link>.
        </>
      )
    },
    {
      id: "investissements",
      category: "Finances & Épargne",
      q: "Mes investissements (Crypto, PEA, Actions) comptent-ils comme garantie ?",
      a: "Malheureusement, non. L'ambassade thaïlandaise est très conservatrice et rejette les actifs volatils. La somme doit être disponible sur un compte courant ou d'épargne classique. Nous vous accompagnons sur la présentation de vos relevés (y compris de néobanques comme Revolut ou Boursorama) pour qu'ils respectent les stricts standards consulaires."
    },
    {
      id: "freelance",
      category: "Statut Freelance & Télétravail",
      q: "Je suis Auto-entrepreneur / Indépendant et n'ai pas d'employeur. Est-ce un problème ?",
      a: "C'est le profil le plus courant, mais aussi celui qui subit le plus de refus si le dossier est mal monté. L'ambassade s'attend à des fiches de paie classiques. Notre agence se charge de 'traduire' la réalité de votre micro-entreprise (Kbis, URSSAF, Sirene, portfolio) en un dossier administratif irréfutable aux yeux des officiers d'immigration thaïlandais."
    },
    {
      id: "softpower",
      category: "Soft Power (Écoles & Immersion)",
      q: "Comment être certain que l'école choisie ne fera pas annuler mon visa ?",
      a: "Le risque d'utiliser une école 'fantôme' ou non agréée est une interdiction de territoire. C'est pourquoi nous ne travaillons qu'avec un réseau fermé d'établissements de Muay Thaï et de Cuisine Thaïlandaise qui possèdent une double homologation officielle (DBD et Ministère de l'Éducation). Votre lettre d'acceptation est garantie conforme à 100%."
    },
    {
      id: "famille",
      category: "Famille & PACS",
      q: "Mon partenaire et moi sommes pacsés. Le visa s'étend-il à mon conjoint ?",
      a: "Attention, piège majeur : le droit thaïlandais ne reconnaît pas le PACS, uniquement le mariage civil. Si vous n'êtes pas mariés, la demande d'un visa 'accompagnant' sera automatiquement rejetée. Mais rassurez-vous, nous avons des stratégies d'optimisation pour permettre aux couples pacsés de sécuriser leurs départs ensemble via des dossiers individuels synchronisés."
    },
    {
      id: "fiscalite",
      category: "Fiscalité & Impôts",
      q: "Vais-je payer des impôts en Thaïlande avec le DTV ?",
      a: "Le visa DTV ne fait pas automatiquement de vous un résident fiscal. Vous ne devenez imposable en Thaïlande que si vous y séjournez plus de 180 jours dans l'année ET que vous y rapatriez des revenus. Dans le cadre de nos offres, nous vous fournissons les recommandations de base pour comprendre la convention fiscale franco-thaïlandaise et optimiser votre calendrier de voyage."
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] py-20 px-4 sm:px-6">
      
      {/* ── SCRIPT JSON-LD ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    
      <div className="max-w-4xl mx-auto">
        
        {/* ── EN-TÊTE ── */}
        <div className="text-center mb-10 mt-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-wide mb-6">
            Foire Aux Questions <span className="text-amber-500">(FAQ)</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            L'immigration thaïlandaise est stricte et les rumeurs sur internet sont nombreuses. Voici les réponses claires de nos experts aux questions les plus fréquentes concernant l'obtention du Visa DTV.
          </p>
        </div>

        {/* ── SOMMAIRE DE NAVIGATION RAPIDE ── */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <a href="#finances" className="px-5 py-2 rounded-full border border-white/10 bg-[#111111] text-gray-300 text-sm hover:border-amber-500/50 hover:text-amber-400 transition-all">Finances</a>
          <a href="#freelance" className="px-5 py-2 rounded-full border border-white/10 bg-[#111111] text-gray-300 text-sm hover:border-amber-500/50 hover:text-amber-400 transition-all">Freelance</a>
          <a href="#softpower" className="px-5 py-2 rounded-full border border-white/10 bg-[#111111] text-gray-300 text-sm hover:border-amber-500/50 hover:text-amber-400 transition-all">Soft Power</a>
          <a href="#famille" className="px-5 py-2 rounded-full border border-white/10 bg-[#111111] text-gray-300 text-sm hover:border-amber-500/50 hover:text-amber-400 transition-all">Famille</a>
          <a href="#fiscalite" className="px-5 py-2 rounded-full border border-white/10 bg-[#111111] text-gray-300 text-sm hover:border-amber-500/50 hover:text-amber-400 transition-all">Fiscalité</a>
        </div>

        {/* ── ACCORDÉONS FAQ ── */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                id={faq.id} // Ajout de l'identifiant pour les liens du sommaire
                className={`scroll-mt-32 border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-amber-500/30 bg-amber-500/5' : 'border-white/10 bg-[#0d0d0d] hover:border-white/20'
                }`}
              >
                <button 
                  onClick={() => toggleQuestion(index)}
                  className="w-full text-left p-6 flex items-start justify-between gap-4 focus:outline-none"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-amber-500 font-bold block mb-2">
                      {faq.category}
                    </span>
                    <h2 className="text-white font-bold text-lg md:text-xl pr-4">
                      {faq.q}
                    </h2>
                  </div>
                  <div className={`mt-1 flex-none transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6 pt-0 text-gray-300 text-base leading-relaxed border-t border-white/5 mt-2">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CTA FINAL ── */}
        <div className="mt-16 p-8 bg-[#111111] border border-gray-800 rounded-3xl text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500 opacity-10 rounded-full blur-3xl"></div>
          
          <h3 className="text-2xl text-white font-bold mb-4 relative z-10">Une question non abordée ici ?</h3>
          <p className="text-gray-400 mb-8 relative z-10">Chaque situation est unique. Confiez-nous l'analyse de votre profil pour sécuriser votre départ.</p>
          
          <Link 
            href="/#contact" 
            className="relative z-10 inline-flex items-center justify-center bg-white text-black font-bold text-lg py-4 px-8 rounded-full hover:bg-gray-200 transition-all duration-300 active:scale-95"
          >
            Faire mon test d'éligibilité
          </Link>
        </div>

      </div>
    </main>
  );
}