"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { useModalA11y } from "./useModalA11y";
import s from "../home.module.css";

const videos = [
  {
    src: "/video-dtv.mp4",
    poster: "/poster-dtv.jpg",
    title: "Et si c’était déjà fait ?",
    label: "Le projet",
  },
  {
    src: "/video-erreur.mp4",
    poster: "/poster-erreur.jpg",
    title: "Les erreurs à éviter",
    label: "Le dossier",
  },
  {
    src: "/video-temoignage.mp4",
    poster: "/poster-temoignage.jpg",
    title: "Leur nouvelle vie",
    label: "Le témoignage",
  },
  {
    src: "/video-accompagnement.mp4",
    poster: "/poster-accompagnement.jpg",
    title: "À vos côtés, à chaque étape",
    label: "La méthode",
  },
  {
    src: "/video-budget.mp4",
    poster: "/poster-budget.jpg",
    title: "Parlons budget",
    label: "Les tarifs",
  },
];

export default function HomeVideos() {
  const [active, setActive] = useState<number | null>(null);
  const fermer = useCallback(() => setActive(null), []);
  const { dialogRef, handleDialogKeyDown } = useModalA11y(
    active !== null,
    fermer,
  );
  return (
    <section
      id="accompagnement"
      aria-labelledby="titre-videos"
    >
      <div className={s.sectionIntro}>
        <div>
          <p className={s.eyebrow}>Quelques images valent mille questions.</p>
          <h2 id="titre-videos">
            On vous montre <em>le chemin.</em>
          </h2>
        </div>
        <p>
          Votre projet, nos réponses.
          <br />
          Tout comprendre en 5 vidéos, à votre rythme.
        </p>
      </div>
      <div className={s.videoGrid}>
        {videos.map((v, i) => (
          <button
            key={v.src}
            onClick={() => setActive(i)}
            className={s.videoCard}
            aria-label={`Lire la vidéo : ${v.title}`}
          >
            <Image
              src={v.poster}
              alt={`Aperçu vidéo ${v.title} pour l’accompagnement Visa DTV Thaïlande`}
              fill
              sizes="(max-width: 760px) 55vw, 20vw"
            />
            <span className={s.videoNumber}>
              0{i + 1} / {v.label}
            </span>
            <span className={s.playIcon} aria-hidden="true">
              ▶
            </span>
            <span className={s.videoTitle}>
              {v.title}
              <span aria-hidden="true">↗</span>
            </span>
          </button>
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
              autoPlay
              playsInline
              preload="metadata"
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
