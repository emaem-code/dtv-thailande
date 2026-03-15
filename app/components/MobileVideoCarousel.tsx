'use client';

import React, { useState, useRef, useEffect } from 'react';

// 1. TA LISTE DE VIDÉOS (Avec les textes d'animation de retour !)
const videos = [
  { id: 0, src: '/video-dtv.mp4', title: 'Concept DTV', phrases: ["Votre nouveau quotidien.", "Zéro stress administratif.", "Visa DTV : 5 ans de liberté."] },
  { id: 1, src: '/video-erreur.mp4', title: 'Erreurs à éviter', phrases: ["Une simple erreur de case...", "Un projet de vie annulé.", "Ne laissez rien au hasard."] },
  { id: 2, src: '/video-temoignage.mp4', title: 'Témoignage', phrases: ["Témoignage client.", "Dossier géré à 100%.", "Visa obtenu en quelques jours."] },
  { id: 3, src: '/video-accompagnement.mp4', title: 'Notre Accompagnement', phrases: ["Arrivez sereinement.", "Profitez pleinement.", "On gère le dossier."] },
  { id: 4, src: '/video-budget.mp4', title: 'Le Budget', phrases: ["Un tarif adapté à votre profil.", "Formule Basique ou Esprit Libre.", "Ne payez que ce qu'il vous faut."] },
];

// 2. LE MINI-COMPOSANT POUR LE TEXTE ANIMÉ SUR MOBILE
function MobileTextOverlay({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((p) => (p + 1) % phrases.length), 4500);
    return () => clearInterval(timer);
  }, [phrases.length]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.3)_0%,_transparent_65%)]">
      {phrases.map((phrase, i) => (
        <h3 key={i} className={`absolute w-full px-4 text-white font-extrabold text-lg md:text-xl leading-snug tracking-wide transition-all duration-1000 transform drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] ${i === index ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}>
          {phrase}
        </h3>
      ))}
    </div>
  );
}

// 3. LE COMPOSANT PRINCIPAL
export default function MobileVideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volume, setVolume] = useState(0); // 0 = muet par défaut
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        video.volume = volume;
        video.muted = volume === 0;
        if (index === currentIndex) {
          video.play().catch(e => console.log("Autoplay bloqué :", e));
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentIndex, volume]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % videos.length);
  
  // 👉 NOUVEAU : Fonction pour changer de vidéo au clic
  const handleVideoClick = (index: number) => {
    if (index !== currentIndex) setCurrentIndex(index);
  };

  // 👉 NOUVEAU : Logique de positionnement (Gauche, Centre, Droite)
  const getVideoStyle = (index: number) => {
    const total = videos.length;
    if (index === currentIndex) {
      return "translate-x-0 scale-100 opacity-100 z-30 shadow-[0_0_30px_rgba(0,0,0,0.8)]"; // ACTIVE (Centre)
    }
    if (index === (currentIndex + 1) % total) {
      return "translate-x-[65%] scale-85 opacity-50 z-20 cursor-pointer hover:opacity-80"; // SUIVANTE (Droite)
    }
    if (index === (currentIndex - 1 + total) % total) {
      return "-translate-x-[65%] scale-85 opacity-50 z-20 cursor-pointer hover:opacity-80"; // PRÉCÉDENTE (Gauche)
    }
    return "translate-x-0 scale-50 opacity-0 z-10 pointer-events-none"; // AUTRES (Cachées)
  };

  return (
    // 👉 NOUVEAU : On réduit la hauteur à h-[50vh] pour laisser la place au bouton d'éligibilité en bas !
    <div className="relative w-full h-[50vh] min-h-[380px] flex flex-col items-center justify-center overflow-hidden py-4">
      
      <div className="relative w-full max-w-[240px] aspect-[9/16]">
        {videos.map((video, index) => {
          const isActive = index === currentIndex;
          
          return (
            <div
              key={video.id}
              onClick={() => handleVideoClick(index)}
              className={`absolute inset-0 w-full h-full rounded-2xl overflow-hidden transition-all duration-500 ease-out bg-zinc-900 ${getVideoStyle(index)}`}
            >
              <video
                ref={(el) => { videoRefs.current[index] = el; }}
                src={video.src}
                className="w-full h-full object-cover"
                playsInline
                onEnded={handleNext}
              />

              {/* 👉 LE TEXTE ANIMÉ EST DE RETOUR */}
              {isActive && <MobileTextOverlay phrases={video.phrases} />}

              {/* 👉 NOUVEAU : MODULE DE VOLUME CENTRÉ AVEC CURSEUR */}
              {isActive && (
                <div 
                  onClick={(e) => e.stopPropagation()} 
                  className="absolute top-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 bg-black/60 backdrop-blur-md border border-white/20 p-3 rounded-xl w-4/5 max-w-[160px] shadow-xl"
                >
                  <button 
                    onClick={() => setVolume(volume === 0 ? 0.5 : 0)} 
                    className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider"
                  >
                    {volume === 0 ? '🔇 Mettre le son' : '🔊 Couper le son'}
                  </button>
                  <input 
                    type="range" min="0" max="1" step="0.1" 
                    value={volume} 
                    onChange={(e) => setVolume(parseFloat(e.target.value))} 
                    className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                </div>
              )}
              
              {/* 👉 TITRE (Remonté pour ne pas être coupé) */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent pt-16 pb-8 px-4 flex flex-col justify-end pointer-events-none">
                <h3 className="text-white font-extrabold text-center text-lg leading-tight drop-shadow-lg">
                  {video.title}
                </h3>
              </div>

            </div>
          )
        })}
      </div>

    </div>
  );
}