"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ActionIcon from "./ActionIcon";
import s from "../blog/blog.module.css";

type Repere = { id: string; titre: string };

/** Le sommaire lit les titres existants : aucun contenu éditorial n'est dupliqué dans le code. */
export default function LectureBlog({
  children,
}: {
  children: React.ReactNode;
}) {
  const chemin = usePathname();
  const contenu = useRef<HTMLDivElement>(null);
  const barre = useRef<HTMLDivElement>(null);
  const [reperes, setReperes] = useState<Repere[]>([]);
  const [actif, setActif] = useState("");
  const estArticle = chemin !== "/blog";

  useEffect(() => {
    if (!estArticle) return;
    const article = contenu.current?.querySelector("article");
    if (!article) return;
    const titres = Array.from(
      article.querySelectorAll<HTMLHeadingElement>("h2[id], section[id] > h2"),
    );
    setReperes(
      titres.map((titre) => ({
        id: titre.id || titre.parentElement?.id || "",
        titre: titre.textContent?.trim() || "",
      })),
    );
    let attente = 0;
    const actualiser = () => {
      const rect = article.getBoundingClientRect();
      const avance = Math.min(
        1,
        Math.max(0, -rect.top / Math.max(1, rect.height - window.innerHeight)),
      );
      if (barre.current) barre.current.style.transform = `scaleX(${avance})`;
      let courant = "";
      for (const titre of titres) {
        if (titre.getBoundingClientRect().top <= 180)
          courant = titre.id || titre.parentElement?.id || "";
      }
      setActif(courant);
      attente = 0;
    };
    const planifier = () => {
      if (!attente) attente = requestAnimationFrame(actualiser);
    };
    actualiser();
    window.addEventListener("scroll", planifier, { passive: true });
    window.addEventListener("resize", planifier);
    return () => {
      window.removeEventListener("scroll", planifier);
      window.removeEventListener("resize", planifier);
      cancelAnimationFrame(attente);
    };
  }, [chemin, estArticle]);

  if (!estArticle) return children;

  return (
    <main id="contenu-blog" className={s.lecture}>
      <div className={s.progression} aria-hidden="true">
        <div ref={barre} />
      </div>
      <div ref={contenu} className={s.articleContent}>
        {children}
      </div>
      <aside className={s.reperes} aria-label="Repères de lecture">
        <div className={s.reperesInterieur}>
          <p className={s.eyebrow}>Dans cet article</p>
          <nav aria-label="Sommaire de lecture">
            {reperes.map((repere) => (
              <a
                key={repere.id}
                href={`#${repere.id}`}
                aria-current={actif === repere.id ? "location" : undefined}
              >
                {repere.titre}
              </a>
            ))}
          </nav>
          <Link className={s.retourJournal} href="/blog">
            Explorer le journal <span aria-hidden="true"><ActionIcon name="book" /></span>
          </Link>
        </div>
      </aside>
    </main>
  );
}
