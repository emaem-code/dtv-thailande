import React from "react";
import Link from "next/link";
import IndexBlog from "../components/IndexBlog";
import s from "./blog.module.css";
import type { Metadata } from "next";
import BlogNavigation from "../components/BlogNavigation";
import { getSortedBlogPosts } from "./posts";
export const revalidate = 600;

// ─── MÉTADONNÉES SEO DE L'ACCUEIL DU BLOG (CORRIGÉES) ───
export const metadata: Metadata = {
  title: "Blog Visa DTV Thaïlande : guides pratiques",
  description:
    "Découvrez les guides exclusifs sur le Visa DTV : conformité des fonds bancaires, sélection des écoles Soft Power et formalités d'arrivée comme le TDAC.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog Visa DTV Thaïlande : guides pratiques",
    description:
      "Tutoriels, décryptages légaux et astuces de terrain pour réussir votre visa de 5 ans.",
    url: "/blog",
    siteName: "DTV Thaïlande",
    locale: "fr_FR",
    type: "website",
    // TODO: Générer un opengraph-image.tsx ou lier une image spécifique à cette page quand les vraies miniatures seront disponibles.
    images: [{ url: "/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Visa DTV Thaïlande : guides pratiques",
    description:
      "Tutoriels, décryptages légaux et astuces de terrain pour réussir votre visa de 5 ans.",
    images: ["/og-image.jpg"], // <-- RÉSOUT L'ANOMALIE TWITTER:IMAGE
  },
};

// ─── SCHEMA BLOG JSON-LD ──────────────────────────────────────────────────────
const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Blog DTV Thaïlande",
  description:
    "Guides, stratégies et conseils pratiques pour obtenir le Visa DTV et réussir son expatriation en Thaïlande.",
  url: "https://dtv-thailande.fr/blog",
  publisher: {
    "@type": "Organization",
    name: "DTV Thaïlande",
    logo: {
      "@type": "ImageObject",
      url: "https://dtv-thailande.fr/logo.png",
    },
  },
};

export default function BlogIndex() {
  const sortedPosts = getSortedBlogPosts();

  return (
    <main id="contenu-blog" className={s.index}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <div className={s.indexInterieur}>
        <BlogNavigation variant="blog-index" />

        <header className={s.hero}>
          <div>
            <p className={s.eyebrow}>Le journal · Depuis Phuket</p>
            <h1 className={s.titreIndex}>
              Le Blog <em>DTV Thaïlande</em>
            </h1>
          </div>
          <p className={s.introIndex}>
            Décryptage légal, stratégies financières et réalités du terrain.
            Découvrez les guides complets pour monter un dossier consulaire
            irréfutable et réussir votre installation en Thaïlande sans mauvaise
            surprise.
          </p>
        </header>

        <IndexBlog
          posts={sortedPosts.map(
            ({ slug, title, excerpt, category, date, image }) => ({
              slug,
              title,
              excerpt,
              category,
              date,
              image,
            }),
          )}
        />

        <div className={s.conversion} data-reveal="">
          <h3 className={s.titreConversion}>
            Passez de la théorie à la pratique
          </h3>
          <p className={s.texteConversion}>
            Vous avez lu les guides et souhaitez déléguer la charge
            administrative ? Je prends en main l&apos;intégralité de votre
            dossier DTV.
          </p>

          <Link href="/contact" className={s.boutonConversion}>
            Me confier votre dossier
          </Link>
        </div>
      </div>

      <section className={s.ressources} data-motion-heading="">
        <h2 className="text-xl font-bold text-white mb-4" data-reveal="" data-heading-part="0">
          Ressources Officielles
        </h2>
        <p className="text-gray-400 text-sm mb-6" data-reveal="" data-heading-part="1">
          Pour approfondir vos démarches, consultez les plateformes
          gouvernementales :
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="https://www.thaiembassy.fr/fr/visa-rdv/les-types-de-visa-et-les-documents-necessaires/dtv/"
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
