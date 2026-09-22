import Link from "next/link";
import HomeHeader from "./HomeHeader";
import { AGENCE, mentionSiret } from "../lib/agence";
import s from "../pages-claires.module.css";

type Page = "faq" | "contact" | "mentions" | "eligibilite";

/** L'habillage est séparé des pages pour conserver leur contenu et les formulaires. */
export default function PageClaire({
  page,
  children,
}: {
  page: Page;
  children: React.ReactNode;
}) {
  return (
    <div className={`${s.surface} ${s[page]}`}>
      <a className={s.evitement} href="#contenu-page">
        Aller au contenu
      </a>
      <HomeHeader />
      <div id="contenu-page" tabIndex={-1} className={s.contenu}>
        {children}
      </div>
      <footer className={s.pied}>
        <Link href="/" className={s.marque}>
          DTV <span>Destination Thaïlande</span>
        </Link>
        <nav aria-label="Liens de pied de page">
          <Link href="/">Accueil</Link>
          <Link href="/blog">Le blog</Link>
          <Link href="/eligibilite">Éligibilité</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/mentions-legales">Mentions légales</Link>
        </nav>
        <p>
          {AGENCE.nom} — {AGENCE.enseigne} · {mentionSiret()}
        </p>
      </footer>
    </div>
  );
}
