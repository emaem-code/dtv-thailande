"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useHomeMotion } from "./useHomeMotion";
import s from "../home.module.css";

/** Cibles éditoriales communes aux deux générations d'articles, sans modifier leur contenu. */
function prepareArticles(root: HTMLDivElement) {
  root.querySelectorAll("article").forEach((article) => {
    article.querySelectorAll([
      "header", "h2", "figure", "img", "blockquote", "aside",
      ":is(div, p)[class*='rounded'][class*='border'][class*='bg-']",
      ":is(div, p)[class*='border-l-']",
    ].join(", "))
      .forEach((element) => {
        // Sommaires, tableaux, réponses dépliables et commandes restent stables.
        if (element.closest("nav, details, form, [role='dialog']") || element.querySelector("table, form")) return;
        // Une image ou un titre dans un encadré accompagne celui-ci, sans double mouvement.
        if (element.parentElement?.closest("[data-reveal]")) return;
        element.setAttribute("data-reveal", "");
      });
  });
}

export default function PageMotion({ children, className }: { children: ReactNode; className: string }) {
  const pathname = usePathname();
  const ref = useHomeMotion({
    pageKey: pathname,
    prepare: pathname.startsWith("/blog/") ? prepareArticles : undefined,
    preserveFirstScreen: true,
    observeChanges: pathname.startsWith("/blog"),
  });
  return <div ref={ref} className={`${className} ${s.motion}`}>{children}</div>;
}
