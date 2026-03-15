'use client';

import React, { useState, useRef, useEffect } from 'react';

const videos = [
  { id: 0, src: '/video-dtv.mp4', title: 'Le Visa DTV' },
  { id: 1, src: '/video-budget.mp4', title: 'Le Budget' },
  { id: 2, src: '/video-accompagnement.mp4', title: 'L\'Accompagnement' },
  { id: 3, src: '/video-temoignage.mp4', title: 'Témoignages' },
  { id: 4, src: '/video-erreur.mp4', title: 'Les Erreurs à éviter' },
];

export default function MobileVideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volume, setVolume] = useState(0); // 0 = Muet par défaut pour l'autoplay
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        video.volume = volume;
        if (index !== currentIndex) {
          video.pause();
          video.currentTime = 0;
        }
      }
    });

    const activeVideo = videoRefs.current[currentIndex];
    if (activeVideo) {
      activeVideo.play().catch(error => {
        console.log("Auto-play bloqué, interaction requise:", error);
      });
    }
  }, [currentIndex, volume]);

  const handleVideoEnd = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const getVideoStyle = (index: number) => {
    const total = videos.length;
    if (index === currentIndex) return "translate-x-0 scale-100 opacity-100 z-20";
    if (index === (currentIndex + 1) % total) return "translate-x-[15%] scale-90 opacity-40 z-10";
    if (index === (currentIndex - 1 + total) % total) return "-translate-x-[150%] scale-75 opacity-0 z-0";
    return "translate-x-[150%] scale-75 opacity-0 z-0";
  };

  return (
    <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 py-10">
      <div className="relative w-full h-full max-w-[320px] aspect-[9/16] preserve-3d">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ease-in-out will-change-transform ${getVideoStyle(index)}`}
          >
            <video
              ref={(el) => (videoRefs.current[index] = el!)}
              src={video.src}
              className="w-full h-full object-cover"
              loop={false}
              playsInline
              onEnded={handleVideoEnd}
            />
            
            {/* 👇 BOUTON CENTRAL DE SON (Uniquement sur la vidéo active) 👇 */}
            {index === currentIndex && (
              <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setVolume(volume === 0 ? 1 : 0); // Alterne entre 0% et 100%
                  }}
                  className="pointer-events-auto flex items-center justify-center w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white shadow-xl transition-transform active:scale-90"
                >
                  {volume === 0 ? (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                  ) : (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                  )}
                </button>
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent p-6 flex items-end">
              <h3 className="text-white text-xl font-bold tracking-tight">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {videos.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white w-4' : 'bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  );
}