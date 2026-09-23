"use client";

import { useEffect, useRef } from "react";

/** Les éléments sont visibles par défaut ; seule leur entrée déclenche le CSS. */
export function useHomeMotion() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return;
        target.setAttribute("data-in-view", "");
        // L'étincelle attend la fin d'une éventuelle arrivée de sa carte.
        if (target.matches("[data-sparkle]")) {
          const arrival = target.parentElement?.closest("[data-reveal]")?.getAnimations()[0];
          const remaining = arrival
            ? Math.max(0, Number(arrival.effect?.getComputedTiming().endTime) - Number(arrival.currentTime)) : 0;
          (target as HTMLElement).style.setProperty("--motion-arrival-wait", `${remaining}ms`);
        }
        observer.unobserve(target);
      });
    }, { threshold: 0.08 });
    ref.current?.querySelectorAll('[data-reveal], [data-hero-image], [data-sparkle="scroll"]')
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return ref;
}
