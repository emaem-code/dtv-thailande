import React from "react";
import HomeHeader from "../components/HomeHeader";
import AlertesReglementaires from "../components/AlertesReglementaires";
import LectureBlog from "../components/LectureBlog";
import PageMotion from "../components/PageMotion";
import Link from "next/link";
import { AGENCE, mentionSiret } from "../lib/agence";
import accueil from "../home.module.css";
import s from "./blog.module.css";

/**
 * En-tête et pied communs à l'index du blog et à tous les articles.
 * Évite d'ajouter les composants page par page sur les dix-huit articles.
 *
 * Le bloc d'inscription aux alertes vit ici, et pas ailleurs : quelqu'un qui
 * vient de lire pourquoi le dépôt en Asie a été fermé sait déjà pourquoi il
 * voudrait être prévenu la prochaine fois. La même proposition sur la page
 * d'accueil n'aurait aucun contexte.
 */
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageMotion className={`${accueil.page} ${s.blog}`}>
      <a href="#contenu-blog" className={accueil.skipLink}>
        Aller au contenu
      </a>
      <HomeHeader />
      <LectureBlog>{children}</LectureBlog>
      <div className={s.alertes}>
        <AlertesReglementaires />
      </div>
      <footer className={s.footer}>
        <Link href="/" className={s.footerBrand}>
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
    </PageMotion>
  );
}
