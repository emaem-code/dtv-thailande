'use client';

import React, { useState, useRef, useEffect } from 'react';

const videos = [
  { id: 0, src: '/video-dtv.mp4', title: 'Concept DTV' },
  { id: 1, src: '/video-erreur.mp4', title: 'Erreurs à éviter' },
  { id: 2, src: '/video-temoignage.mp4', title: 'Témoignage' },
  { id: 3, src: '/video-accompagnement.mp4', title: 'Notre Accompagnement' },
  { id: 4, src: '/video-budget.mp4', title: 'Le Budget' },
];

export default function MobileVideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true); // Muet par défaut
  
  // 👉 CORRECTION TYPESCRIPT ICI : On précise bien que ça peut être null
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

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const getVideoStyle = (index: number) => {
    const total = videos.length;
    
    if (index === currentIndex) {
      // VIDÉO ACTIVE : Parfaitement au centre
      return "translate-x-0 scale-100 opacity-100 z-30 shadow-2xl";
    } 
    if (index === (currentIndex + 1) % total) {
      // VIDÉO SUIVANTE : Décalée fortement à droite, plus petite
      return "translate-x-[85%] scale-90 opacity-40 z-20"; 
    } 
    // TOUTES LES AUTRES : Rangées et cachées à gauche
    return "-translate-x-[150%] scale-50 opacity-0 z-10";
  };

  return (
    <div className="relative w-full h-[75vh] flex flex-col items-center justify-center overflow-hidden py-10">
      
      {/* BOUTON DE SON GLOBAL (En haut à droite, super visible) */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-4 right-4 z-50 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg"
      >
        {isMuted ? (
          <>
            <span className="text-xl">🔇</span>
            <span className="text-xs font-bold uppercase tracking-wider">Activer le son</span>
          </>
        ) : (
          <>
            <span className="text-xl">🔊</span>
            <span className="text-xs font-bold uppercase tracking-wider">Son activé</span>
          </>
        )}
      </button>

      {/* LE CARROUSEL */}
      <div className="relative w-full max-w-[280px] aspect-[9/16]">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={`absolute inset-0 w-full h-full rounded-2xl overflow-hidden transition-all duration-500 ease-out bg-zinc-900 ${getVideoStyle(index)}`}
          >
            <video
              // 👉 CORRECTION TYPESCRIPT ICI : Les accolades empêchent le retour de valeur implicite
              ref={(el) => { videoRefs.current[index] = el; }} 
              src={video.src}
              className="w-full h-full object-cover"
              playsInline
              onEnded={handleNext}
            />
            
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 h-1/2 flex flex-col justify-end">
               <h3 className="text-white font-extrabold text-xl leading-tight mb-2 drop-shadow-lg">
                 {video.title}
               </h3>
               <p className="text-white/50 text-[10px] uppercase tracking-widest">
                 {index === currentIndex ? "En lecture..." : "À suivre"}
               </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}