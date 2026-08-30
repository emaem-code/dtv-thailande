import React from 'react';
import Image from 'next/image';

/**
 * Portrait de l'auteur, affiché dans l'encart de signature des articles.
 *
 * Ce composant existe pour une raison précise : le médaillon était recopié à
 * la main dans chaque article, et dix-neuf copies avaient produit dix-sept
 * variantes de dégradés et d'emojis. Le contenant est désormais unique ; seule
 * la couleur d'accent, qui suit la catégorie de l'article, reste paramétrable.
 *
 * Le texte de la bio, lui, reste propre à chaque article : il précise ce que
 * l'auteur a vécu directement et ce qu'il tient de sources documentaires. Cette
 * nuance-là ne doit surtout pas être mutualisée.
 */

/**
 * Les classes Tailwind sont écrites en toutes lettres : le compilateur analyse
 * le code source et ne verrait pas une classe assemblée dynamiquement.
 */
const BORDURES: Record<string, string> = {
  amber: 'border-amber-500/50',
  emerald: 'border-emerald-500/50',
  fuchsia: 'border-fuchsia-500/50',
  indigo: 'border-indigo-500/50',
  orange: 'border-orange-500/50',
  purple: 'border-purple-500/50',
  red: 'border-red-500/50',
  rose: 'border-rose-500/50',
  sky: 'border-sky-500/50',
  teal: 'border-teal-500/50',
  violet: 'border-violet-500/50',
};

export default function PhotoAuteur({ accent = 'sky' }: { accent?: string }) {
  return (
    <div
      className={`w-24 h-24 rounded-full bg-gray-800 flex-shrink-0 overflow-hidden border-2 ${
        BORDURES[accent] ?? BORDURES.sky
      }`}
    >
      <Image
        src="/images/matthieu-moretti.jpg"
        alt="Matthieu Moretti, fondateur de DTV Thaïlande, à Kathu (Phuket)"
        width={96}
        height={96}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
