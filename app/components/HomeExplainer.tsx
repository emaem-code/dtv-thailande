"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FILM_ACCUEIL, FILM_ACCUEIL_SOURCES, DATE_VERIFICATION_FILM_ACCUEIL } from "../lib/film-accueil";
import { FILM_AUDIO_SRC, FILM_AUDIO_DURATION, FILM_AUDIO_CHAPTERS, getFilmPosition } from "../lib/film-accueil-audio";
import { useModales } from "./ModalesProvider";
import SourcesProcedure from "./SourcesProcedure";
import ActionIcon from "./ActionIcon";
import s from "./HomeExplainer.module.css";

type Lecture = "ready" | "loading" | "playing" | "paused" | "ended";

export default function HomeExplainer() {
  const [scene, setScene] = useState(0);
  const [lecture, setLecture] = useState<Lecture>("ready");
  const [pointIndex, setPointIndex] = useState(-1);
  const [elapsed, setElapsed] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [captions, setCaptions] = useState(true);
  const [captionIndex, setCaptionIndex] = useState(0);
  const [notice, setNotice] = useState("");
  const [replayKey, setReplayKey] = useState(0);
  const playerRef = useRef<HTMLDivElement>(null);
  const chaptersRef = useRef<HTMLElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const pendingSeek = useRef<number | null>(null);
  const playRequest = useRef(0);
  const started = useRef(false);
  const { ouvrirEligibilite } = useModales();
  const current = FILM_ACCUEIL[scene];
  const captionParts = current.narration.split(/(?<=[.!?;])\s+/u);

  const syncPosition = useCallback((time: number) => {
    const position = getFilmPosition(time);
    setElapsed(time);
    setScene(position.scene);
    setPointIndex(position.pointIndex);
    setCaptionIndex(position.captionIndex);
  }, []);

  const pause = useCallback(() => {
    playRequest.current += 1;
    audioRef.current?.pause();
    if (started.current && !audioRef.current?.ended) setLecture("paused");
  }, []);

  const playFrom = async (time?: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const request = ++playRequest.current;
    started.current = true;
    setLecture("loading");
    setNotice("");
    // Aucun fichier audio n’est demandé avant une action du visiteur.
    if (!audio.getAttribute("src")) audio.src = FILM_AUDIO_SRC;
    if (audio.error) audio.load();
    if (time !== undefined) {
      pendingSeek.current = time;
      syncPosition(time);
      setReplayKey((key) => key + 1);
      if (audio.readyState >= 1) {
        audio.currentTime = time;
        pendingSeek.current = null;
      }
    }
    try {
      await audio.play();
    } catch {
      if (playRequest.current !== request) return;
      setLecture("paused");
      setNotice("Le son n’a pas pu démarrer. Appuyez sur Lecture pour réessayer, ou consultez la transcription ci-dessous.");
    }
  };

  const togglePlay = () => {
    if (lecture === "playing" || lecture === "loading") return pause();
    void playFrom(lecture === "ready" || lecture === "ended" ? 0 : undefined);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (soundEnabled) setCaptions(true);
  };

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      playRequest.current += 1;
      audio?.pause();
    };
  }, []);

  useEffect(() => {
    const onVisibility = () => { if (document.hidden) pause(); };
    document.addEventListener("visibilitychange", onVisibility);
    const observer = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) pause();
    }) : null;
    if (playerRef.current) observer?.observe(playerRef.current);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      observer?.disconnect();
    };
  }, [pause]);

  useEffect(() => {
    const navigation = chaptersRef.current;
    const active = navigation?.querySelector<HTMLElement>('[aria-current="step"]');
    if (!navigation || !active) return;
    // Suivre le chapitre dans sa barre, sans déplacer la page ni le focus.
    const left = active.offsetLeft;
    const right = left + active.offsetWidth;
    if (left < navigation.scrollLeft || right > navigation.scrollLeft + navigation.clientWidth) {
      navigation.scrollTo({
        left: left < navigation.scrollLeft ? left : right - navigation.clientWidth,
        behavior: "instant",
      });
    }
  }, [scene]);

  useEffect(() => {
    const alignAnchor = () => {
      if (window.location.hash === "#film-dtv" || window.location.hash === "#accompagnement") {
        playerRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
      }
    };
    // Recaler aussi l’arrivée directe après l’hydratation et les médias initiaux.
    const frame = window.requestAnimationFrame(alignAnchor);
    window.addEventListener("hashchange", alignAnchor);
    window.addEventListener("load", alignAnchor, { once: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", alignAnchor);
      window.removeEventListener("load", alignAnchor);
    };
  }, []);

  const goToChapter = (index: number) => {
    void playFrom(FILM_AUDIO_CHAPTERS[index].start);
    playerRef.current?.scrollIntoView({
      block: "start",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return (
    <section className={s.section} aria-labelledby="titre-film-dtv">
      <header className={s.heading}>
        <div>
          <p className={s.eyebrow}>Regarder. Comprendre. Se projeter.</p>
          <h2 id="titre-film-dtv">Le DTV, <em>en images.</em></h2>
        </div>
        <p>Le visa, le dossier, l’accompagnement.<br />L’essentiel de cette page, raconté simplement.</p>
      </header>

      <div id="accompagnement" className={s.player} ref={playerRef} role="region" aria-label="Présentation animée du Visa DTV" data-playing={lecture === "playing"}>
        {/* Les deux liens historiques arrivent au même endroit : le lecteur. */}
        <span id="film-dtv" className={s.anchor} aria-hidden="true" />
        <audio
          ref={audioRef}
          preload="none"
          muted={!soundEnabled}
          onLoadedMetadata={() => {
            const audio = audioRef.current;
            if (audio && pendingSeek.current !== null) {
              audio.currentTime = pendingSeek.current;
              pendingSeek.current = null;
              syncPosition(audio.currentTime);
            }
          }}
          onTimeUpdate={() => {
            if (audioRef.current && pendingSeek.current === null) syncPosition(audioRef.current.currentTime);
          }}
          onPlaying={() => setLecture("playing")}
          onWaiting={() => { if (audioRef.current && !audioRef.current.paused) setLecture("loading"); }}
          onPause={() => { if (started.current && !audioRef.current?.ended) setLecture("paused"); }}
          onEnded={() => { syncPosition(FILM_AUDIO_DURATION); setLecture("ended"); }}
          onError={() => {
            playRequest.current += 1;
            setLecture("paused");
            setNotice("Le fichier audio n’a pas pu être chargé. Réessayez avec Lecture ; la transcription reste disponible ci-dessous.");
          }}
        />
        <div className={s.stage}>
          <div className={s.scene} key={`${current.id}-${replayKey}`} data-scene={current.id} data-started={lecture !== "ready"}>
            <div className={s.photo}>
              <Image src={current.image} alt={current.alt} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 660px" />
              <div className={s.photoFrame} aria-hidden="true" />
              <span className={s.location}><ActionIcon name="location" size={14} /> Destination Thaïlande</span>
            </div>
            <div className={s.sceneCopy}>
              <div className={s.sceneTop}><span>DTV · Le film</span><span>{String(scene + 1).padStart(2, "0")} / 07</span></div>
              <p className={s.chapterName}>{current.chapitre}</p>
              <h3 className={s.sceneTitle}>{current.titre}<em>{current.accent}</em></h3>
              <ul className={s.points}>
                {current.points.map((point, index) => (
                  <li key={point} data-current={index === Math.max(0, pointIndex)} data-speaking={lecture !== "ready" && index === pointIndex}>
                    <span className={s.pointNumber} aria-hidden="true">0{index + 1}</span>
                    <span className={s.pointText}>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {lecture === "ready" && <button className={s.start} onClick={() => { togglePlay(); playButtonRef.current?.focus({ preventScroll: true }); }}><span aria-hidden="true">▶</span> Regarder l’explication <small>7 chapitres · à votre rythme</small></button>}
          {lecture === "ended" && <div className={s.end}><span>Le premier pas est le plus simple.</span><button onClick={() => { pause(); ouvrirEligibilite(); }}>Vérifier mon éligibilité <ActionIcon name="eligibility" /></button></div>}
        </div>

        <div className={s.controls}>
          <button ref={playButtonRef} onClick={togglePlay} aria-label={lecture === "loading" ? "Annuler le chargement" : lecture === "playing" ? "Mettre l’explication en pause" : lecture === "ended" ? "Revoir l’explication" : "Lire l’explication"} className={s.playButton}>
            <span aria-hidden="true">{lecture === "playing" || lecture === "loading" ? "Ⅱ" : lecture === "ended" ? "↺" : "▶"}</span><span>{lecture === "loading" ? "Attente" : lecture === "playing" ? "Pause" : lecture === "ended" ? "Revoir" : "Lecture"}</span>
          </button>
          <span className={s.chapterCount}>{scene + 1} / {FILM_ACCUEIL.length}</span>
          <div className={s.track} role="progressbar" aria-label="Avancement de l’explication" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round((Math.min(1, elapsed / FILM_AUDIO_DURATION)) * 100)}><span style={{ transform: `scaleX(${Math.min(1, elapsed / FILM_AUDIO_DURATION)})` }} /></div>
          <div className={s.options}>
            <button onClick={toggleSound} data-enabled={soundEnabled} className={s.option}>{soundEnabled ? "Désactiver le son" : "Activer le son"}</button>
            <button onClick={() => setCaptions(!captions)} data-enabled={captions} className={s.option}>{captions ? "Désactiver les sous-titres" : "Activer les sous-titres"}</button>
          </div>
        </div>

        {captions && <p className={s.captions} aria-live="off">{lecture === "ready" ? "Lancez la présentation pour découvrir l’essentiel, avec une narration française et des sous-titres." : captionParts[captionIndex]}</p>}
        <p className={s.notice} role="status">{notice || (lecture === "loading" ? "Chargement du son…" : "")}</p>
        <nav ref={chaptersRef} className={s.chapters} aria-label="Chapitres de l’explication">{FILM_ACCUEIL.map((part, index) => <button key={part.id} onClick={() => goToChapter(index)} aria-current={scene === index ? "step" : undefined}><span>{String(index + 1).padStart(2, "0")}</span>{part.chapitre}</button>)}</nav>
      </div>

      <div className={s.below}>
        <p>Un projet personnel mérite une réponse personnelle.</p>
        <button onClick={() => { pause(); ouvrirEligibilite(); }}>Vérifier mon éligibilité <ActionIcon name="eligibility" /></button>
      </div>
      <details className={s.transcript}>
        <summary>Lire la transcription et les sources</summary>
        {FILM_ACCUEIL.map((part) => <div key={part.id}><h3>{part.chapitre}</h3><p>{part.narration}</p></div>)}
        <p>Les conditions du poste consulaire compétent font foi. La décision sur le visa appartient à l’ambassade.</p>
        <SourcesProcedure sources={FILM_ACCUEIL_SOURCES} />
        <p>Sources consultées le {DATE_VERIFICATION_FILM_ACCUEIL}. Voix off enregistrée, avec accompagnement musical.</p>
      </details>
    </section>
  );
}
