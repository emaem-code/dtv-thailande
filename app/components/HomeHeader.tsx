"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useModales } from "./ModalesProvider";
import { useModalA11y } from "./useModalA11y";
import BandeauAnnonce from "./BandeauAnnonce";
import s from "../home.module.css";

const liens = [
  { href: "/#visa-dtv", label: "Le visa DTV" },
  { href: "/#methode", label: "L’accompagnement" },
  { href: "/#tarifs", label: "Nos tarifs" },
  { href: "/blog", label: "Le journal" },
];

export default function HomeHeader() {
  const { ouvrirGuide, ouvrirEligibilite } = useModales();
  const surPageEligibilite = usePathname() === "/eligibilite";
  const [ouvert, setOuvert] = useState(false);
  const fermer = useCallback(() => setOuvert(false), []);
  const { dialogRef, handleDialogKeyDown } = useModalA11y(ouvert, fermer);

  return (
    <>
      <header className={s.header}>
        <div className={s.headerInner}>
          <Link
            href="/"
            className={s.brand}
            aria-label="DTV Thaïlande — accueil"
          >
            <Image
              src="/logo.svg?v=4"
              alt=""
              width={44}
              height={35}
              priority
              unoptimized
            />
            <span>
              DTV<span>DESTINATION THAÏLANDE</span>
            </span>
          </Link>
          <nav className={s.desktopNav} aria-label="Navigation principale">
            {liens.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className={s.headerActions}>
            <button className={s.guideLink} onClick={ouvrirGuide}>
              Le guide gratuit ↗
            </button>
            {surPageEligibilite ? (
              <a className={s.headerCta} href="#formulaire-eligibilite">
                Mon éligibilité <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <button className={s.headerCta} onClick={ouvrirEligibilite} data-sparkle="ready">
                Mon éligibilité <span aria-hidden="true">↗</span>
              </button>
            )}
            <button
              className={s.menuButton}
              onClick={() => setOuvert(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={ouvert}
              aria-controls="menu-accueil"
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <div className={s.announcement}>
        <BandeauAnnonce />
      </div>
      {ouvert && (
        <div className={s.menuOverlay}>
          <div className={s.menuBackdrop} onClick={fermer} />
          <div
            ref={dialogRef}
            id="menu-accueil"
            className={s.menuPanel}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            tabIndex={-1}
            onKeyDown={handleDialogKeyDown}
          >
            <div className={s.menuTitle}>
              <span>Destination Thaïlande</span>
              <button onClick={fermer} aria-label="Fermer le menu">
                ×
              </button>
            </div>
            <nav aria-label="Navigation mobile">
              {[
                ...liens,
                { href: "/eligibilite", label: "Éligibilité" },
                { href: "/faq", label: "Questions fréquentes" },
                { href: "/contact", label: "Nous contacter" },
                { href: "/mentions-legales", label: "Mentions légales" },
              ].map((l) => (
                <Link href={l.href} key={l.href} onClick={fermer}>
                  {l.label}
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </nav>
            <Link href="/eligibilite" className={s.primary} onClick={fermer} data-sparkle="ready">
              Vérifier mon éligibilité <span aria-hidden="true">→</span>
            </Link>
            <a href="/guide-dtv-2025.pdf" download className={s.textLink}>
              Télécharger le guide gratuit ↓
            </a>
          </div>
        </div>
      )}
    </>
  );
}
