'use client';

import React, { useState, useRef, useEffect } from 'react';

// 👉 NOUVEAUX TITRES IMPACTANTS
const videos = [
  { id: 0, src: '/video-dtv.mp4', title: 'Le passeport liberté', phrases: ["Votre nouveau quotidien.", "Zéro stress administratif.", "Visa DTV : 5 ans de liberté."] },
  { id: 1, src: '/video-erreur.mp4', title: 'Le piège de l\'ambassade', phrases: ["Une simple erreur de case...", "Un projet de vie annulé.", "Ne laissez rien au hasard."] },
  { id: 2, src: '/video-temoignage.mp4', title: 'Ils vivent le rêve', phrases: ["Témoignage client.", "Dossier géré à 100%.", "Visa obtenu en quelques jours."] },
  { id: 3, src: '/video-accompagnement.mp4', title: 'La méthode VIP', phrases: ["Arrivez sereinement.", "Profitez pleinement.", "On gère le dossier."] },
  { id: 4, src: '/video-budget.mp4', title: 'Votre investissement', phrases: ["Un tarif adapté à votre profil.", "Formule Basique ou Esprit Libre.", "Ne payez que ce qu'il vous faut."] },
];

function MobileTextOverlay({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((p) => (p + 1) % phrases.length), 4000);
    return () => clearInterval(timer);
  }, [phrases.length]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.3)_0%,_transparent_65%)]">
      {phrases.map((phrase, i) => (
        <h3 key={i} className={`absolute w-full px-4 text-white font-extrabold text-xl leading-tight tracking-wide transition-all duration-1000 transform drop-shadow-[0_2px_10px_rgba(0,0,0,1)] ${i === index ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}>
          {phrase}
        </h3>
      ))}
    </div>
  );
}

export default function MobileVideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        video.muted = isMuted;
        if (index === currentIndex) {
          video.play().catch(e => console.log("Autoplay bloqué :", e));
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentIndex, isMuted]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % videos.length);
  const handleVideoClick = (index: number) => {
    if (index !== currentIndex) setCurrentIndex(index);
  };

  const getVideoStyle = (index: number) => {
    const total = videos.length;
    if (index === currentIndex) {
      return "translate-x-0 scale-100 opacity-100 z-30 shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-white/10";
    }
    if (index === (currentIndex + 1) % total) {
      return "translate-x-[70%] scale-90 opacity-40 z-20 cursor-pointer hover:opacity-60";
    }
    if (index === (currentIndex - 1 + total) % total) {
      return "-translate-x-[70%] scale-90 opacity-40 z-20 cursor-pointer hover:opacity-60";
    }
    return "translate-x-0 scale-50 opacity-0 z-10 pointer-events-none";
  };

  return (
    <div className="relative w-full h-[55vh] min-h-[400px] flex flex-col items-center justify-center overflow-hidden py-4">
      
      <div className="relative w-full max-w-[260px] aspect-[9/16]">
        {videos.map((video, index) => {
          const isActive = index === currentIndex;
          
          return (
            <div
              key={video.id}
              onClick={() => handleVideoClick(index)}
              className={`absolute inset-0 w-full h-full rounded-[32px] overflow-hidden transition-all duration-500 ease-out bg-zinc-900 ${getVideoStyle(index)}`}
            >
              <video
                ref={(el) => { videoRefs.current[index] = el; }}
                src={video.src}
                className="w-full h-full object-cover"
                playsInline
                loop={false}
                onEnded={handleNext}
              />

              {isActive && <MobileTextOverlay phrases={video.phrases} />}

              {isActive && (
                <>
                  {/* 👉 Le titre respire plus bas (pt-12) pour éviter le bord arrondi */}
                  <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/90 via-black/30 to-transparent pt-12 pb-14 px-6 flex flex-col justify-start pointer-events-none z-30">
                    <h3 className="text-white font-extrabold text-center text-lg tracking-wide drop-shadow-lg">
                      {video.title}
                    </h3>
                  </div>

                  {/* 👉 Le bouton est décalé vers l'intérieur (top-8 right-6) et légèrement plus grand (w-9 h-9) */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} 
                    className="absolute top-8 right-6 z-40 flex items-center justify-center w-9 h-9 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full shadow-lg transition-transform active:scale-90"
                    aria-label="Toggle mute"
                  >
                    {isMuted ? (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                    ) : (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                    )}
                  </button>
                </>
              )}
            </div>
          )
        })}
      </div>

    </div>
  );
}