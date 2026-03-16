'use client';

import React, { useState, useRef, useEffect } from 'react';

const videos = [
  { id: 0, src: '/video-dtv.mp4', poster: '/poster-dtv.jpg', title: "Et si c'était\ndéjà fait ?", phrases: ["5 ans. Légal. Libre", "Votre vie d'après commence", "On s'en est occupé pour vous"] },
  { id: 1, src: '/video-erreur.mp4', poster: '/poster-erreur.jpg', title: "Un refus.\nTout s'effondre", phrases: ["45% des dossiers sont refusés", "Une case mal remplie suffit", "Ne laissez rien au hasard"] },
  { id: 2, src: '/video-temoignage.mp4', poster: '/poster-temoignage.jpg', title: "Acceptés.\nDu premier coup", phrases: ["Dossier géré à 100%", "Zéro aller-retour ambassade", "Ils sont déjà en Thaïlande"] },
  { id: 3, src: '/video-accompagnement.mp4', poster: '/poster-accompagnement.jpg', title: "On prend tout\nen charge", phrases: ["Audit, traductions, dépôt", "Vous faites vos valises", "Nous faisons le reste"] },
  { id: 4, src: '/video-budget.mp4', poster: '/poster-budget.jpg', title: "Votre\ninvestissement", phrases: ["À partir de 999 €. Tout inclus", "Frais de visa et agence inclus", "Vérifiez votre éligibilité"] },
];

function VideoTitle({ title }: { title: string }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`absolute top-0 inset-x-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent pt-12 pb-14 px-6 flex flex-col justify-start pointer-events-none z-30 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <h3 className="text-white font-bold text-center text-xl tracking-wide drop-shadow-lg whitespace-pre-line leading-tight">
        {title}
      </h3>
    </div>
  );
}

function MobileTextOverlay({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const timeout = setTimeout(() => {
      setIndex(0);
      interval = setInterval(() => {
        setIndex((p) => (p + 1) % phrases.length);
      }, 4500); 
    }, 3500);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [phrases.length]);

  return (
    <div className="absolute bottom-[20%] left-0 w-full flex justify-center z-20 pointer-events-none px-4">
      {phrases.map((phrase, i) => (
        <h3 
          key={i} 
          className={`absolute w-full px-5 text-white font-bold text-base md:text-lg leading-tight tracking-normal text-center transition-all duration-1000 transform drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] ${i === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
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
      if (video) {
        video.muted = isMuted;
        if (index === currentIndex) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => console.log("Autoplay en attente"));
          }
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
      <div className="relative w-[82%] max-w-[280px] aspect-[9/16] mx-auto">
        {videos.map((video, index) => {
          const isActive = index === currentIndex;
          
          return (
            <div
              key={video.id}
              onClick={() => handleVideoClick(index)}
              className={`absolute inset-0 w-full h-full rounded-[32px] overflow-hidden transition-all duration-500 ease-out bg-zinc-900 ${getVideoStyle(index)}`}
              style={{
                WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                WebkitTransform: 'translateZ(0)',
                willChange: 'transform',
              }}
            >
             <video
                ref={(el) => { videoRefs.current[index] = el; }}
                src={video.src}
                poster={video.poster} 
                className="w-full h-full object-cover"
                playsInline
                preload={isActive ? "metadata" : "none"}
                loop={false}
                onEnded={handleNext}
              />

              {isActive && (
                <>
                  <MobileTextOverlay phrases={video.phrases} />
                  <VideoTitle title={video.title} />
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} 
                    className={`absolute top-10 right-3 z-40 flex items-center justify-center p-2 bg-transparent transition-all duration-1000 active:scale-90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] ${
                      !isMuted 
                        ? 'text-white' 
                        : showVolume 
                          ? 'animate-pulse text-amber-500' 
                          : 'text-white/50'
                    }`}
                    aria-label="Toggle mute"
                  >
                    {isMuted ? (
                      <svg className="w-7 h-7 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                    ) : (
                      <svg className="w-7 h-7 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
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