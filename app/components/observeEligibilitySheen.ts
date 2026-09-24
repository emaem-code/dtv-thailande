/** Un seul reflet visible, avec une cadence conservée quand le bouton change. */
export function observeEligibilitySheen(root: HTMLDivElement) {
  const buttons = Array.from(root.querySelectorAll<HTMLElement>('[data-sparkle="scroll"]'));
  const header = root.querySelector<HTMLElement>('header [data-sparkle]');
  const visible = new Set<HTMLElement>();
  const started = performance.now();
  let active: HTMLElement | null = null;

  const select = () => {
    // Conserver le même bouton tant qu'il reste entièrement visible évite
    // de faire sauter le reflet entre les différentes cartes tarifaires.
    const next = active && visible.has(active) && active.isConnected
      ? active
      : buttons.find((button) => visible.has(button) && button.isConnected)
        ?? (header?.isConnected && header.getClientRects().length ? header : null);
    if (next === active) return;
    active?.removeAttribute("data-sparkle-active");
    active?.style.removeProperty("--motion-arrival-wait");
    active = next;
    if (active) {
      // Changer de section ne relance pas un reflet après chaque défilement.
      active.style.setProperty("--motion-arrival-wait", `${started - performance.now()}ms`);
      active.setAttribute("data-sparkle-active", "");
    }
  };

  const headerHeight = root.querySelector("header")?.getBoundingClientRect().height ?? 0;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting, intersectionRatio }) => {
      const button = target as HTMLElement;
      if (isIntersecting && intersectionRatio >= 0.99) visible.add(button);
      else visible.delete(button);
    });
    select();
  }, {
    // Écarter les boutons qui passent sous l'en-tête fixe ou au bord inférieur.
    rootMargin: `-${Math.ceil(headerHeight)}px 0px -8px 0px`,
    threshold: [0, 0.99],
  });
  buttons.forEach((button) => observer.observe(button));
  select();
  return () => {
    observer.disconnect();
    active?.removeAttribute("data-sparkle-active");
    active?.style.removeProperty("--motion-arrival-wait");
  };
}
