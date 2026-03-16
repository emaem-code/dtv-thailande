'use client';

import React, { useState, useRef, useEffect } from 'react';

const videos = [
  { id: 0, src: '/video-dtv.mp4', poster: '/poster-dtv.jpg', title: "Et si c'était\ndéjà fait ?", phrases: ["5 ans. Légal. Libre", "Votre vie d'après commence", "On s'en est occupé pour vous"] },
  { id: 1, src: '/video-erreur.mp4', poster: '/poster-erreur.jpg', title: "Un refus.\nTout s'effondre", phrases: ["45% des dossiers sont refusés", "Une case mal remplie suffit", "Ne laissez rien au hasard"] },
  { id: 2, src: '/video-temoignage.mp4', poster: '/poster-temoignage.jpg', title: "Acceptés.\nDu premier coup", phrases: ["Dossier géré à 100%", "Zéro aller-retour ambassade", "Ils sont déjà en Thaïlande"] },
  { id: 3, src: '/video-accompagnement.mp4', poster: '/poster-accompagnement.jpg', title: "On prend tout\nen charge", phrases: ["Audit, traductions, dépôt", "Vous faites vos valises", "Nous faisons le reste"] },
  { id: 4, src: '/video-budget.mp4', poster: '/poster-budget.jpg', title: "Votre\ninvestissement", phrases: ["À partir de 999 €. Tout inclus", "Frais de visa et agence inclus", "Vérifiez votre éligibilité"] },
];

// ─────────────────────────────────────────────────────────────────────────────
// POURQUOI LE SVG CLIPPATH ?
//
// Sur iOS Safari, les <video> sont rendues par AVFoundation dans un layer natif
// qui s'affiche PAR-DESSUS le DOM. border-radius, overflow:hidden,
// WebkitMaskImage — aucun ne peut atteindre ce layer.
//
// clipPath avec clipPathUnits="objectBoundingBox" est la seule propriété CSS
// appliquée APRÈS la composition des layers natifs Apple.
// Elle opère au niveau du moteur de rendu Metal/CoreAnimation,
// pas au niveau DOM — c'est pour ça qu'elle clippe réellement la vidéo.
//
// rx/ry sont calculés pour max-w-[280px] aspect-[9/16] → 280 × 497px
//   rx = 32/280  = 0.1143
//   ry = 32/497  = 0.0644
// ─────────────────────────────────────────────────────────────────────────────
function SvgClipDef() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      style={{ position: 'absolute', overflow: 'hidden', pointerEvents: 'none' }}
    >
      <defs>
        <clipPath id="video-rounded-clip" clipPathUnits="objectBoundingBox">
          <rect x="0" y="0" width="1" height="1" rx="0.1143" ry="0.0644" />
        </clipPath>
      </defs>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function VideoTitle({ title }: { title: string }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setIsVisible(false), 3000);
    return () => clearTimeout(timer);
  }, [title]);

  return (
    <div
      className={`absolute top-0 inset-x-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent pt-12 pb-14 px-6 flex flex-col justify-start pointer-events-none z-30 transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <h3 className="text-white font-bold text-center text-xl tracking-wide drop-shadow-lg whitespace-pre-line leading-tight">
        {title}
      </h3>
    </div>
  );
}

function MobileTextOverlay({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    setIndex(-1);
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      setIndex(0);
      interval = setInterval(() => {
        setIndex((p) => (p + 1) % phrases.length);
      }, 4500);
    }, 3500);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [phrases]);

  return (
    <div className="absolute bottom-[20%] left-0 w-full flex justify-center z-20 pointer-events-none px-4">
      {phrases.map((phrase, i) => (
        <h3
          key={i}
          className={`absolute w-full px-5 text-white font-bold text-base md:text-lg leading-tight tracking-normal text-center transition-all duration-700 transform drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] ${
            i === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {phrase}
        </h3>
      ))}
    </div>
  );
}

export default function MobileVideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [showVolume, setShowVolume] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    setShowVolume(false);
    const timer = setTimeout(() => setShowVolume(true), 3000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      video.muted = isMuted;
      if (index === currentIndex) {
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [currentIndex, isMuted]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % videos.length);
  const handleVideoClick = (index: number) => {
    if (index !== currentIndex) setCurrentIndex(index);
  };

  const getVideoStyle = (index: number): string => {
    const total = videos.length;
    if (index === currentIndex)
      return 'translate-x-0 scale-100 opacity-100 z-30 shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-white/10';
    if (index === (currentIndex + 1) % total)
      return 'translate-x-[70%] scale-90 opacity-40 z-20 cursor-pointer hover:opacity-60';
    if (index === (currentIndex - 1 + total) % total)
      return '-translate-x-[70%] scale-90 opacity-40 z-20 cursor-pointer hover:opacity-60';
    return 'translate-x-0 scale-50 opacity-0 z-10 pointer-events-none';
  };

  return (
    <>
      {/* Masque SVG déclaré hors du flux — référencé par url(#video-rounded-clip) */}
      <SvgClipDef />

      <div className="relative w-full h-[55vh] min-h-[400px] flex flex-col items-center justify-center overflow-hidden py-4">
        <div className="relative w-[82%] max-w-[280px] aspect-[9/16] mx-auto">

          {videos.map((video, index) => {
            const isActive = index === currentIndex;

            return (
              <div
                key={video.id}
                onClick={() => handleVideoClick(index)}
                className={`absolute inset-0 w-full h-full transition-all duration-500 ease-out bg-zinc-900 ${getVideoStyle(index)}`}
                style={{
                  // ── Pour Chrome / Firefox / Android ──
                  borderRadius: '32px',
                  overflow: 'hidden',

                  // ── Pour iOS Safari (AVFoundation layer) ──
                  // clipPath SVG objectBoundingBox = seule solution qui atteint
                  // le layer natif Metal/CoreAnimation d'iOS
                  WebkitClipPath: 'url(#video-rounded-clip)',
                  clipPath: 'url(#video-rounded-clip)',

                  // Force un compositing layer GPU isolé
                  WebkitTransform: 'translateZ(0)',
                  transform: 'translateZ(0)',
                  isolation: 'isolate',
                }}
              >
                <video
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={video.src}
                  poster={video.poster}
                  className="w-full h-full object-cover"
                  style={{ display: 'block', WebkitTransform: 'translateZ(0)' }}
                  playsInline
                  preload={isActive ? 'metadata' : 'none'}
                  loop={false}
                  onEnded={handleNext}
                />

                {isActive && (
                  <>
                    <MobileTextOverlay phrases={video.phrases} />
                    <VideoTitle title={video.title} />

                    <button
                      onClick={(e) => { e.stopPropagation(); setIsMuted((m) => !m); }}
                      className={`absolute top-10 right-3 z-40 flex items-center justify-center p-2 bg-transparent transition-all duration-700 active:scale-90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] ${
                        !isMuted
                          ? 'opacity-100 text-white'
                          : showVolume
                          ? 'opacity-100 animate-pulse text-amber-500'
                          : 'opacity-0 pointer-events-none'
                      }`}
                      aria-label="Toggle mute"
                    >
                      {isMuted ? (
                        <svg className="w-7 h-7 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                        </svg>
                      ) : (
                        <svg className="w-7 h-7 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                      )}
                    </button>
                  </>
                )}
              </div>
            );
          })}

        </div>
      </div>
    </>
  );
}