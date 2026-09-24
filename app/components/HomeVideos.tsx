"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { useModalA11y } from "./useModalA11y";
import { PRIX_APPEL, prix } from "../lib/tarifs";
import s from "../home.module.css";

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
  const [active, setActive] = useState<number | null>(null);
  const fermer = useCallback(() => setActive(null), []);
  const { dialogRef, handleDialogKeyDown } = useModalA11y(
    active !== null,
    fermer,
  );
  return (
    <section
      id="accompagnement"
      className={s.videosSection}
      aria-labelledby="titre-videos"
    >
      <div className={s.sectionIntro} data-motion-heading="">
        <div>
          <p className={s.eyebrow} data-reveal="" data-heading-part="0">Quelques images valent mille questions.</p>
          <h2 id="titre-videos" data-reveal="" data-heading-part="1">
            On vous montre <em>le chemin.</em>
          </h2>
        </div>
        <p data-reveal="" data-heading-part="2">
          Votre projet, nos réponses.
          <br />{" "}
          Tout comprendre en 5 vidéos, à votre rythme.
        </p>
      </div>
      <div className={s.videoGrid} data-motion-group="">
        {videos.map((v, i) => (
          <article
            key={v.src}
            className={s.videoCard}
            aria-labelledby={`titre-video-${i}`}
            data-reveal=""
          >
            <button
              onClick={() => setActive(i)}
              className={s.videoThumbnail}
              aria-label={`Lire la vidéo : ${v.title}`}
              aria-haspopup="dialog"
            >
              <Image
                src={v.poster}
                alt={`Aperçu vidéo ${v.title} pour l’accompagnement Visa DTV Thaïlande`}
                fill
                sizes={
                  i === 0
                    ? "(max-width: 760px) 88px, (max-width: 1400px) 30vw, 424px"
                    : "(max-width: 760px) 88px, 112px"
                }
              />
              <span className={s.playIcon} aria-hidden="true">▶</span>
            </button>
            <div className={s.videoCopy}>
              <div className={s.videoHeading}>
                <p className={s.videoNumber}>0{i + 1} / {v.label}</p>
                <h3 id={`titre-video-${i}`} className={s.videoTitle}>{v.title}</h3>
              </div>
              <ul className={s.videoPhrases}>
                {v.phrases.map((phrase) => (
                  <li key={phrase}>{phrase}</li>
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
