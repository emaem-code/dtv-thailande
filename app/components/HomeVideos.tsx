"use client";

// En sommeil : cartes conservées pour de futurs témoignages clients.
// Ce composant n’est plus appelé. Les anciens films et affiches ont été retirés
// de public/ ; remplacer leurs références ci-dessous avant toute réactivation.

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useModalA11y } from "./useModalA11y";
import { PRIX_APPEL, prix } from "../lib/tarifs";
import s from "../home.module.css";
import film from "./HomeVideos.module.css";

const videos = [
  {
    src: "/video-dtv.mp4",
    poster: "/poster-dtv.jpg",
    title: "Et si c’était déjà fait ?",
    label: "Le projet",
    phrases: [
      "5 ans de liberté totale",
      "Votre vie d'après commence",
      "On s'en est occupé pour vous",
    ],
  },
  {
    src: "/video-erreur.mp4",
    poster: "/poster-erreur.jpg",
    title: "Les erreurs à éviter",
    label: "Le dossier",
    phrases: [
      "Un simple détail peut valoir un refus",
      "Une case mal remplie suffit",
      "Ne laissez rien au hasard",
    ],
  },
  {
    src: "/video-temoignage.mp4",
    poster: "/poster-temoignage.jpg",
    title: "Leur nouvelle vie",
    label: "Le témoignage",
    phrases: [
      "Dossier géré à 100%",
      "Zéro aller-retour ambassade",
      "Ils sont déjà en Thaïlande",
    ],
  },
  {
    src: "/video-accompagnement.mp4",
    poster: "/poster-accompagnement.jpg",
    title: "À vos côtés, à chaque étape",
    label: "La méthode",
    phrases: [
      "Audit, traductions, dépôt",
      "Vous faites vos valises",
      "Nous faisons le reste",
    ],
  },
  {
    src: "/video-budget.mp4",
    poster: "/poster-budget.jpg",
    title: "Parlons budget",
    label: "Les tarifs",
    phrases: [
      `Budget complet dès ${prix(PRIX_APPEL)} par personne`,
      "Frais consulaires et traductions compris",
      "Dégressif dès la deuxième personne",
    ],
  },
];

export default function HomeVideos() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const fermer = useCallback(() => setActive(null), []);
  const { dialogRef, handleDialogKeyDown } = useModalA11y(
    active !== null,
    fermer,
  );

  useEffect(() => {
    if (
      !sectionRef.current ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    // Une seule lecture visuelle, quand les phrases sont réellement dans le champ.
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.55) continue;
        entry.target.setAttribute("data-phrases-active", "");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.55, rootMargin: `0px 0px -${Math.round(window.innerHeight * 0.08)}px 0px` });

    sectionRef.current.querySelectorAll("[data-film-phrases]").forEach((list) => observer.observe(list));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="accompagnement"
      className={film.section}
      aria-labelledby="titre-videos"
    >
      <div className={film.intro} data-motion-heading="">
        <div>
          <p className={film.eyebrow} data-reveal="" data-heading-part="0">Quelques images valent mille questions.</p>
          <h2 id="titre-videos" data-reveal="" data-heading-part="1">
            On vous montre <em>le chemin.</em>
          </h2>
        </div>
        <div className={film.introAside} data-reveal="" data-heading-part="2">
          <span className={film.collection}>La collection DTV <span aria-hidden="true">01 — 05</span></span>
          <p>Quatre films pour se projeter.<br />Un client raconte son expérience.</p>
        </div>
      </div>
      <div className={film.collectionRule} aria-hidden="true" data-reveal="" />
      <div className={film.grid}>
        {videos.map((v, i) => (
          <article
            key={v.src}
            className={film.card}
            aria-labelledby={`titre-video-${i}`}
            data-film={i + 1}
            data-testimonial={i === 2 || undefined}
          >
            <button
              onClick={() => setActive(i)}
              className={film.thumbnail}
              aria-label={`Lire la vidéo : ${v.title}`}
              aria-describedby={`type-video-${i}`}
              aria-haspopup="dialog"
              data-reveal=""
            >
              <Image
                src={v.poster}
                alt={`Aperçu vidéo ${v.title} pour l’accompagnement Visa DTV Thaïlande`}
                fill
                sizes="(max-width: 600px) calc(100vw - 42px), (max-width: 900px) 46vw, (max-width: 1199px) 30vw, 260px"
              />
              <span id={`type-video-${i}`} className={film.type}>
                {i === 2 ? "Avis client" : "Film d’illustration"}
              </span>
              <span className={film.play} aria-hidden="true">
                <span className={film.playIcon}>▶</span>
                {i === 2 ? "Écouter l’avis" : "Voir le film"}
                <span className={film.playArrow}>↗</span>
              </span>
            </button>
            <div className={film.copy}>
              <div>
                <p className={film.chapter}>
                  <span className={film.number} aria-hidden="true">0{i + 1}</span>
                  <span>{v.label}</span>
                </p>
                <h3 id={`titre-video-${i}`} className={film.title}>{v.title}</h3>
              </div>
              <ul className={film.phrases} data-film-phrases="">
                {v.phrases.map((phrase) => (
                  <li key={phrase}><span>{phrase}</span></li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
      {active !== null && (
        <div className={s.videoOverlay}>
          <div className={s.menuBackdrop} onClick={fermer} />
          <div
            ref={dialogRef}
            className={s.videoDialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="titre-video-active"
            onKeyDown={handleDialogKeyDown}
            tabIndex={-1}
          >
            <div className={s.videoDialogHeader}>
              <h3 id="titre-video-active">{videos[active].title}</h3>
              <button onClick={fermer} aria-label="Fermer la vidéo">
                ×
              </button>
            </div>
            <video
              key={videos[active].src}
              src={videos[active].src}
              poster={videos[active].poster}
              controls
              tabIndex={0}
              playsInline
              preload="none"
              aria-label={videos[active].title}
            />
            <div className={s.videoDialogFooter}>
              <button
                disabled={active === 0}
                onClick={() => setActive(active - 1)}
              >
                ← Précédente
              </button>
              <span>
                {active + 1} / {videos.length}
              </span>
              <button
                disabled={active === videos.length - 1}
                onClick={() => setActive(active + 1)}
              >
                Suivante →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
