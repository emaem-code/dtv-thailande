"use client";

import { useId, useState, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "../blog/posts";
import s from "../blog/blog.module.css";

type ArticleCarte = Pick<
  BlogPost,
  "slug" | "title" | "excerpt" | "category" | "date" | "image"
>;
const normaliser = (texte: string) =>
  texte
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr");

function Carte({
  post,
  vedette = false,
  ordre = 0,
}: {
  post: ArticleCarte;
  vedette?: boolean;
  ordre?: number;
}) {
  return (
    <Link href={`/blog/${post.slug}`} className={vedette ? s.vedette : s.carte}
      data-reveal="" style={{ "--motion-order": ordre } as CSSProperties}>
      <div className={s.imageArticle}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority={vedette}
          sizes={
            vedette
              ? "(max-width: 760px) 100vw, (max-width: 1400px) 55vw, 720px"
              : "(max-width: 640px) 100vw, (max-width: 1000px) 50vw, (max-width: 1400px) 33vw, 420px"
          }
        />
        {vedette && <span className={s.aLaUne}>À la une</span>}
      </div>
      <div className={s.texteCarte}>
        <div className={s.metaCarte}>
          <span>{post.category}</span>
          <span>{post.date}</span>
        </div>
        <h2>{post.title}</h2>
        <p>{post.excerpt}</p>
        <span className={s.lire}>
          Lire l&apos;article <span aria-hidden="true">↗</span>
        </span>
      </div>
    </Link>
  );
}

export default function IndexBlog({ posts }: { posts: ArticleCarte[] }) {
  const [recherche, setRecherche] = useState("");
  const [theme, setTheme] = useState("");
  const id = useId();
  const themes = [...new Set(posts.map((post) => post.category))].sort((a, b) =>
    a.localeCompare(b, "fr"),
  );
  const filtresActifs = Boolean(recherche.trim() || theme);
  const selection = posts.filter(
    (post) =>
      (!theme || post.category === theme) &&
      normaliser(`${post.title} ${post.excerpt} ${post.category}`).includes(
        normaliser(recherche.trim()),
      ),
  );
  const grille = filtresActifs ? selection : posts.slice(1);

  return (
    <>
      {!filtresActifs && posts[0] && <Carte post={posts[0]} vedette />}
      <section className={s.bibliotheque} aria-labelledby="titre-bibliotheque">
        <div className={s.enteteBibliotheque}>
          <div data-motion-heading="">
            <p className={s.eyebrow} data-reveal="" data-heading-part="0">À votre rythme</p>
            <h2 id="titre-bibliotheque" data-reveal="" data-heading-part="1">Explorez les guides.</h2>
          </div>
          <p aria-live="polite" aria-atomic="true">
            {selection.length} article{selection.length > 1 ? "s" : ""}
            {filtresActifs
              ? " trouvé" + (selection.length > 1 ? "s" : "")
              : " à découvrir"}
          </p>
        </div>
        <div className={s.filtres}>
          <div className={s.recherche}>
            <label htmlFor={`${id}-recherche`}>
              Rechercher dans le journal
            </label>
            <div>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <circle cx="10.5" cy="10.5" r="6.5" />
                <path d="m16 16 5 5" />
              </svg>
              <input
                id={`${id}-recherche`}
                type="search"
                placeholder="Un sujet, une question…"
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
              />
            </div>
          </div>
          <div className={s.theme}>
            <label htmlFor={`${id}-theme`}>Par thème</label>
            <select
              id={`${id}-theme`}
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="">Tous les thèmes</option>
              {themes.map((categorie) => (
                <option key={categorie}>{categorie}</option>
              ))}
            </select>
          </div>
          {filtresActifs && (
            <button
              className={s.effacer}
              type="button"
              onClick={() => {
                setRecherche("");
                setTheme("");
              }}
            >
              Tout afficher ×
            </button>
          )}
        </div>
        <div className={s.grille}>
          {grille.map((post, index) => (
            <Carte key={post.slug} post={post} ordre={index % 3} />
          ))}
        </div>
        {grille.length === 0 && (
          <div className={s.aucunResultat}>
            <p>Aucun article ne correspond à votre recherche.</p>
            <button
              type="button"
              onClick={() => {
                setRecherche("");
                setTheme("");
              }}
            >
              Voir tous les articles →
            </button>
          </div>
        )}
      </section>
    </>
  );
}
