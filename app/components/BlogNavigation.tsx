import Link from 'next/link';

type BlogNavigationProps = {
  variant: 'blog-index' | 'article-top' | 'article-bottom';
};

export default function BlogNavigation({ variant }: BlogNavigationProps) {
  if (variant === 'blog-index') {
    return (
      <nav aria-label="Navigation du blog" className="mb-10">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/10 px-5 py-2.5 text-sm font-bold text-amber-300 shadow-lg shadow-amber-950/20 transition-colors hover:bg-amber-500 hover:text-black"
        >
          ← Retour à l'accueil
        </Link>
      </nav>
    );
  }

  if (variant === 'article-top') {
    return (
      <nav aria-label="Navigation de l'article" className="mb-10">
        <Link
          href="/blog"
          className="inline-flex items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/10 px-5 py-2.5 text-sm font-bold text-amber-300 shadow-lg shadow-amber-950/20 transition-colors hover:bg-amber-500 hover:text-black"
        >
          ← Retour au blog
        </Link>
      </nav>
    );
  }

  return (
    <nav
      aria-label="Navigation de fin d'article"
      className="mt-16 rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/20 sm:flex sm:items-center sm:justify-between"
    >
      <Link
        href="/blog"
        className="inline-flex w-full items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/10 px-5 py-3 text-sm font-bold text-amber-300 transition-colors hover:bg-amber-500 hover:text-black sm:w-auto"
      >
        ← Retour au blog
      </Link>
      <Link
        href="/"
        className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-black sm:mt-0 sm:w-auto"
      >
        Retour à l'accueil
      </Link>
    </nav>
  );
}
