"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FILM_ACCUEIL, FILM_ACCUEIL_SOURCES, DATE_VERIFICATION_FILM_ACCUEIL } from "../lib/film-accueil";
import { useModales } from "./ModalesProvider";
import SourcesProcedure from "./SourcesProcedure";
import s from "./HomeExplainer.module.css";

type Lecture = "ready" | "playing" | "paused" | "ended";

export default function HomeExplainer() {
  const [scene, setScene] = useState(0);
  const [lecture, setLecture] = useState<Lecture>("ready");
  const [progress, setProgress] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [captions, setCaptions] = useState(true);
  const [captionIndex, setCaptionIndex] = useState(0);
  const [notice, setNotice] = useState("");
  const playerRef = useRef<HTMLDivElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const frenchVoice = useRef<SpeechSynthesisVoice | null>(null);
  const elapsed = useRef(0);
  const stateRef = useRef<Lecture>("ready");
  const sceneRef = useRef(0);
  const voiceRef = useRef(true);
  const restartVoiceOnResume = useRef(false);
  const narrated = useRef(false);
  const speechStarted = useRef(false);
  const speechBoundary = useRef(false);
  const startSceneRef = useRef<(index: number) => void>(() => {});
  const { ouvrirEligibilite } = useModales();
  const current = FILM_ACCUEIL[scene];
  const captionParts = current.narration.split(/(?<=[.!?;])\s+/u);

  const cancelSpeech = useCallback(() => {
    if (speechRef.current) {
      speechRef.current.onend = null;
      speechRef.current.onerror = null;
      window.speechSynthesis.cancel();
      speechRef.current = null;
    }
    narrated.current = false;
    speechStarted.current = false;
    speechBoundary.current = false;
  }, []);

  const finishScene = useCallback(() => {
    if (stateRef.current !== "playing") return;
    if (sceneRef.current < FILM_ACCUEIL.length - 1) {
      startSceneRef.current(sceneRef.current + 1);
    } else {
      cancelSpeech();
      stateRef.current = "ended";
      setLecture("ended");
      setProgress(1);
    }
  }, [cancelSpeech]);

  const startScene = useCallback((index: number) => {
    cancelSpeech();
    restartVoiceOnResume.current = false;
    sceneRef.current = index;
    stateRef.current = "playing";
    elapsed.current = 0;
    setScene(index);
    setProgress(0);
    setCaptionIndex(0);
    setLecture("playing");
    setNotice("");

    if (!voiceRef.current) return;
    if (!("speechSynthesis" in window) || !frenchVoice.current) {
      setNotice("La voix française n’est pas disponible sur cet appareil. Vous pouvez suivre les sous-titres.");
      setCaptions(true);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(FILM_ACCUEIL[index].narration);
    utterance.voice = frenchVoice.current;
    utterance.lang = "fr-FR";
    utterance.rate = 0.95;
    utterance.onstart = () => { speechStarted.current = true; };
    utterance.onboundary = (event) => {
      if (speechRef.current !== utterance) return;
      speechBoundary.current = true;
      let end = 0;
      const parts = FILM_ACCUEIL[index].narration.split(/(?<=[.!?;])\s+/u);
      const part = parts.findIndex((text) => { end += text.length + 1; return event.charIndex < end; });
      setCaptionIndex(part < 0 ? parts.length - 1 : part);
    };
    utterance.onend = () => {
      if (speechRef.current !== utterance) return;
      speechRef.current = null;
      narrated.current = false;
      finishScene();
    };
    utterance.onerror = () => {
      if (speechRef.current !== utterance) return;
      speechRef.current = null;
      narrated.current = false;
      speechBoundary.current = false;
      speechStarted.current = false;
      setCaptions(true);
      setNotice("La narration est indisponible. L’explication continue avec les sous-titres.");
    };
    speechRef.current = utterance;
    narrated.current = true;
    window.speechSynthesis.resume();
    window.speechSynthesis.speak(utterance);
  }, [cancelSpeech, finishScene]);

  useEffect(() => { startSceneRef.current = startScene; }, [startScene]);

  const pause = useCallback(() => {
    if (stateRef.current !== "playing") return;
    stateRef.current = "paused";
    setLecture("paused");
    if (speechRef.current) window.speechSynthesis.pause();
  }, []);

  const togglePlay = () => {
    if (lecture === "playing") return pause();
    if (lecture === "paused") {
      if (restartVoiceOnResume.current) return startScene(sceneRef.current);
      stateRef.current = "playing";
      setLecture("playing");
      if (speechRef.current) window.speechSynthesis.resume();
      return;
    }
    startScene(0);
  };

  const toggleVoice = () => {
    const enabled = !voiceRef.current;
    voiceRef.current = enabled;
    restartVoiceOnResume.current = enabled && stateRef.current === "paused";
    setVoiceEnabled(enabled);
    if (!enabled) {
      cancelSpeech();
      setCaptions(true);
      setNotice("");
    } else if (stateRef.current === "playing") {
      startScene(sceneRef.current);
    }
  };

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const updateVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      frenchVoice.current = voices.find((voice) => voice.lang === "fr-FR" && voice.localService)
        ?? voices.find((voice) => voice.lang.startsWith("fr")) ?? null;
    };
    updateVoice();
    window.speechSynthesis.addEventListener("voiceschanged", updateVoice);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", updateVoice);
      cancelSpeech();
    };
  }, [cancelSpeech]);

  useEffect(() => {
    if (lecture !== "playing") return;
    let previous = performance.now();
    const interval = window.setInterval(() => {
      const now = performance.now();
      elapsed.current += (now - previous) / 1000;
      previous = now;
      const duration = FILM_ACCUEIL[sceneRef.current].duration;
      // Certains appareils exposent une voix sans parvenir à la démarrer.
      if (narrated.current && ((!speechStarted.current && elapsed.current > 5) || elapsed.current > duration * 3)) {
        cancelSpeech();
        setCaptions(true);
        setNotice("La narration est indisponible. L’explication continue avec les sous-titres.");
      }
      const fraction = elapsed.current / duration;
      if (!speechBoundary.current) {
        const count = FILM_ACCUEIL[sceneRef.current].narration.split(/(?<=[.!?;])\s+/u).length;
        setCaptionIndex(Math.min(count - 1, Math.floor(fraction * count)));
      }
      setProgress(Math.min(narrated.current ? 0.96 : 1, fraction));
      if (!narrated.current && fraction >= 1) finishScene();
    }, 100);
    return () => window.clearInterval(interval);
  }, [lecture, scene, finishScene, cancelSpeech]);

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

  const goToChapter = (index: number) => {
    // Une navigation explicite lance le chapitre choisi, comme une piste vidéo.
    startScene(index);
    playerRef.current?.scrollIntoView({
      block: "start",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return (
    <section id="film-dtv" className={s.section} aria-labelledby="titre-film-dtv">
      <header className={s.heading}>
        <div>
          <p className={s.eyebrow}>Regarder. Comprendre. Se projeter.</p>
          <h2 id="titre-film-dtv">Votre projet, <em>en quelques images.</em></h2>
        </div>
        <p>Le visa, le dossier, l’accompagnement.<br />L’essentiel de cette page, raconté simplement.</p>
      </header>

      <div className={s.player} ref={playerRef} role="region" aria-label="Présentation animée du Visa DTV" data-playing={lecture === "playing"}>
        <div className={s.stage}>
          <div className={s.scene} key={current.id} data-scene={current.id} data-started={lecture !== "ready"}>
            <div className={s.photo}>
              <Image src={current.image} alt={current.alt} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 660px" />
              <div className={s.photoFrame} aria-hidden="true" />
              <span className={s.location}>Destination Thaïlande ↗</span>
            </div>
            <div className={s.sceneCopy}>
              <div className={s.sceneTop}><span>DTV · Le film</span><span>{String(scene + 1).padStart(2, "0")} / 07</span></div>
              <p className={s.chapterName}>{current.chapitre}</p>
              <h3 className={s.sceneTitle}>{current.titre}<em>{current.accent}</em></h3>
              <div className={s.path} aria-hidden="true"><span /><span /><span /></div>
              <ul className={s.points}>{current.points.map((point, index) => <li key={point} data-current={index === Math.min(current.points.length - 1, Math.floor(progress * current.points.length))}><span aria-hidden="true">0{index + 1}</span>{point}</li>)}</ul>
            </div>
          </div>
          {lecture === "ready" && <button className={s.start} onClick={() => { togglePlay(); playButtonRef.current?.focus({ preventScroll: true }); }}><span aria-hidden="true">▶</span> Regarder l’explication <small>7 chapitres · à votre rythme</small></button>}
          {lecture === "ended" && <div className={s.end}><span>Le premier pas est le plus simple.</span><button onClick={() => { cancelSpeech(); ouvrirEligibilite(); }}>Vérifier mon éligibilité ↗</button></div>}
        </div>

        <div className={s.controls}>
          <button ref={playButtonRef} onClick={togglePlay} aria-label={lecture === "playing" ? "Mettre l’explication en pause" : lecture === "ended" ? "Revoir l’explication" : "Lire l’explication"} className={s.playButton}>
            <span aria-hidden="true">{lecture === "playing" ? "Ⅱ" : lecture === "ended" ? "↺" : "▶"}</span><span>{lecture === "playing" ? "Pause" : lecture === "ended" ? "Revoir" : "Lecture"}</span>
          </button>
          <span className={s.chapterCount}>{scene + 1} / {FILM_ACCUEIL.length}</span>
          <div className={s.track} role="progressbar" aria-label="Avancement de l’explication" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(((scene + progress) / FILM_ACCUEIL.length) * 100)}><span style={{ transform: `scaleX(${(scene + progress) / FILM_ACCUEIL.length})` }} /></div>
          <button onClick={toggleVoice} aria-pressed={voiceEnabled} aria-label="Narration française" className={s.option}>Voix <span aria-hidden="true">{voiceEnabled ? "✓" : "—"}</span></button>
          <button onClick={() => setCaptions(!captions)} aria-pressed={captions} aria-label="Sous-titres" className={s.option}>ST <span aria-hidden="true">{captions ? "✓" : "—"}</span></button>
        </div>

        {captions && <p className={s.captions} aria-live="off">{lecture === "ready" ? "Lancez la présentation pour découvrir l’essentiel, avec une narration française et des sous-titres." : captionParts[captionIndex]}</p>}
        <p className={s.notice} role="status">{notice}</p>
        <nav className={s.chapters} aria-label="Chapitres de l’explication">{FILM_ACCUEIL.map((part, index) => <button key={part.id} onClick={() => goToChapter(index)} aria-current={scene === index ? "step" : undefined}><span>{String(index + 1).padStart(2, "0")}</span>{part.chapitre}</button>)}</nav>
      </div>

      <div className={s.below}>
        <p>Un projet personnel mérite une réponse personnelle.</p>
        <button onClick={() => { pause(); ouvrirEligibilite(); }}>Vérifier mon éligibilité <span aria-hidden="true">↗</span></button>
      </div>
      <details className={s.transcript}>
        <summary>Lire la transcription et les sources</summary>
        {FILM_ACCUEIL.map((part) => <div key={part.id}><h3>{part.chapitre}</h3><p>{part.narration}</p></div>)}
        <p>Les conditions du poste consulaire compétent font foi. La décision sur le visa appartient à l’ambassade.</p>
        <SourcesProcedure sources={FILM_ACCUEIL_SOURCES} />
        <p>Sources consultées le {DATE_VERIFICATION_FILM_ACCUEIL}. Narration produite par la voix française disponible sur votre appareil.</p>
      </details>
    </section>
  );
}
