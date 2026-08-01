import BoutonsPartage from './BoutonsPartage';
import { baseUrl, getBlogPost } from '../blog/posts';

type Props = {
  slug: string;
  variant: 'entete' | 'fin';
};

/**
 * Enveloppe serveur des boutons de partage.
 *
 * Le titre et l'adresse canonique sont lus ici, côté serveur, à partir de
 * posts.ts. Le composant client ne reçoit que deux chaînes : la liste des
 * articles n'est donc jamais envoyée au navigateur.
 *
 * On construit l'adresse à partir de baseUrl plutôt que de window.location
 * pour que le lien partagé soit toujours propre, sans les paramètres de suivi
 * qu'une campagne ou un réseau social aurait pu ajouter.
 */
export default function PartageArticle({ slug, variant }: Props) {
  const post = getBlogPost(slug);
  if (!post) return null;

  return (
    <BoutonsPartage
      url={`${baseUrl}/blog/${slug}`}
      titre={post.title}
      variant={variant}
    />
  );
}
