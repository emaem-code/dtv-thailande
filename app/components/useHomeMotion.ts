"use client";

import { useEffect, useRef } from "react";
import { observeEligibilitySheen } from "./observeEligibilitySheen";

type Options = {
  pageKey?: string;
  prepare?: (root: HTMLDivElement) => void;
  preserveFirstScreen?: boolean;
  observeChanges?: boolean;
};

/** Les éléments sont visibles par défaut ; seule leur entrée déclenche le CSS. */
export function useHomeMotion({
  pageKey = "",
  prepare,
  preserveFirstScreen = true,
  observeChanges = false,
}: Options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting || target.hasAttribute("data-in-view") || target.hasAttribute("data-motion-static")) return;
        // Un en-tête partage son déclenchement ; le CSS garde les trois temps.
        const elements = target.hasAttribute("data-heading-part")
          ? target.closest("[data-motion-heading]")!.querySelectorAll("[data-heading-part]")
          : [target];
        elements.forEach((element) => {
          element.setAttribute("data-in-view", "");
          observer.unobserve(element);
        });
      });
    }, {
      threshold: 0.08,
      // Le mouvement commence à l'entrée dans l'écran, sans attente au bas de page.
      rootMargin: "0px",
    });
    const root = ref.current;
    if (!root) return () => observer.disconnect();
    const stopSheen = observeEligibilitySheen(root);
    const registered = new WeakSet<Element>();
    const register = () => {
      prepare?.(root);
      root.querySelectorAll('[data-reveal], [data-hero-image]').forEach((element) => {
        if (element.hasAttribute("data-in-view") || element.hasAttribute("data-motion-static")) return;
        const group = element.hasAttribute("data-heading-part")
          ? Array.from(element.closest("[data-motion-heading]")!.querySelectorAll("[data-heading-part]"))
          : [element];
        // Ne jamais faire disparaître un contenu déjà visible, même après un filtre.
        if (preserveFirstScreen && element.hasAttribute("data-reveal") && group.some((part) => part.getBoundingClientRect().top < window.innerHeight)) {
          group.forEach((part) => {
            part.setAttribute("data-motion-static", "");
            registered.add(part);
            observer.unobserve(part);
          });
        } else if (!registered.has(element)) {
          // Préparer le décalage hors écran évite tout saut au déclenchement.
          // Le contenu garde son opacité normale, même si le script s'arrête.
          if (element.hasAttribute("data-reveal")) element.setAttribute("data-motion-prepared", "");
          registered.add(element);
          observer.observe(element);
        }
      });
    };
    register();
    // Le blog peut changer de page ou filtrer ses cartes sans recharger le layout.
    const mutations = observeChanges ? new MutationObserver(register) : null;
    mutations?.observe(root, { childList: true, subtree: true });
    return () => { observer.disconnect(); mutations?.disconnect(); stopSheen(); };
  }, [pageKey, prepare, preserveFirstScreen, observeChanges]);
  return ref;
}
