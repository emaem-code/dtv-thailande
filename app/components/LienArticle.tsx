import React from 'react';
import Link from 'next/link';
import { estPublie } from '../blog/posts';

/**
 * Lien vers un article du blog qui se désactive tout seul.
 *
 * Un article programmé renvoie un 404 tant que sa date de publication n'est
 * pas atteinte. Ce composant affiche donc le texte sans lien tant que l'article
 * n'est pas en ligne, puis le transforme en lien automatiquement le jour venu —
 * sans aucune intervention, et sans jamais exposer un lien mort à un visiteur
 * ni à Google.
 */
export default function LienArticle({
  slug,
  className,
  children,
}: {
  slug: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (!estPublie(slug)) {
    return <span className="text-gray-300">{children}</span>;
  }

  return (
    <Link href={`/blog/${slug}`} className={className}>
      {children}
    </Link>
  );
}
