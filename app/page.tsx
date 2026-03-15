"use client"; 

import { useState, useRef, useEffect } from "react";
import Script from "next/script";
import DtvGuideModal from "./components/DtvGuideModal"; 
import MobileVideoCarousel from './components/MobileVideoCarousel';

// --- MINI-COMPOSANT : TEXTE ANIMÉ (PC) ---
function AnimatedTextOverlay({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 4500); 
    return () => clearInterval(timer);
  }, [phrases.length]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.3)_0%,_transparent_65%)]">
      {phrases.map((phrase, i) => (
        <h3
          key={i}
          className={`absolute w-full px-4 text-white font-extrabold text-base md:text-xl lg:text-2xl leading-snug tracking-wide transition-all duration-1000 transform [text-shadow:_0_4px_15px_rgb(0_0_0_/_100%)] ${
            i === index ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
          }`}
        >
          {phrase}
        </h3>
      ))}
    </div>
  );
}

// --- COMPOSANT MOTEUR DES VIDÉOS (PC) ---
function VideoSequence() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [volume, setVolume] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const videos = [
    { id: 0, src: "/video-dtv.mp4", title: "Concept DTV", hasText: true, phrases: ["Votre nouveau quotidien.", "Zéro stress administratif.", "Visa DTV : 5 ans de liberté."] },
    { id: 1, src: "/video-erreur.mp4", title: "Erreurs à éviter", hasText: true, phrases: ["Une simple erreur de case...", "Un projet de vie annulé.", "Ne laissez rien au hasard."] },
    { id: 2, src: "/video-temoignage.mp4", title: "Témoignage", hasText: true, phrases: ["Témoignage client.", "Dossier géré à 100%.", "Visa obtenu en quelques jours."] },
    { id: 3, src: "/video-accompagnement.mp4", title: "Notre Accompagnement", hasText: true, phrases: ["Arrivez sereinement.", "Profitez pleinement.", "On gère le dossier."] },
    { id: 4, src: "/video-budget.mp4", title: "Le Budget", hasText: true, phrases: ["Un tarif adapté à votre profil.", "Formule Basique ou Esprit Libre.", "Ne payez que ce qu'il vous faut."] }
  ];

  useEffect(() => {
    videoRefs.current.forEach((vid, index) => {
      if (!vid) return;
      vid.volume = volume;
      if (index === activeIndex) {
        vid.play().catch(() => console.log("Lecture auto bloquée"));
      } else {
        vid.pause();
        vid.currentTime = 0;
      }
    });
  }, [activeIndex, volume]);

  const handleVideoClick = (index: number) => {
    if (index === activeIndex) {
      if (videoRefs.current[index]) {
        videoRefs.current[index]!.currentTime = 0;
        videoRefs.current[index]!.play();
      }
    } else {
      setActiveIndex(index);
    }
  };

  const handleVideoEnd = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % 5);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      
      {/* VERSION MOBILE */}
      <div className="block md:hidden w-full">
        <MobileVideoCarousel />
      </div>

      {/* VERSION PC */}
      <div className="hidden md:flex justify-center w-full h-full pb-8">
        <div className="grid grid-cols-5 gap-[2px] w-full max-w-6xl px-4 h-full max-h-[50vh]">
          {videos.map((video, index) => {
            const isActive = index === activeIndex;

            return (
              <div 
                key={video.id}
                onClick={() => handleVideoClick(index)}
                className="bg-[#0a0a0a] relative overflow-hidden cursor-pointer aspect-[9/16] h-full group"
              >
                <video 
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={video.src}
                  playsInline
                  muted={volume === 0}
                  onEnded={handleVideoEnd}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-60 grayscale-[30%] group-hover:opacity-80'}`}
                />
                
                <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>
               
                {isActive && (
                  <div 
                    onClick={(e) => e.stopPropagation()} 
                    className="absolute top-3 right-3 z-30 flex items-center gap-2 bg-black/40 backdrop-blur-md hover:bg-black/70 border border-white/20 text-white px-3 py-1.5 rounded-full transition-all duration-300 shadow-lg group/volume"
                  >
                    <button onClick={() => setVolume(volume === 0 ? 0.5 : 0)} className="flex items-center justify-center transition-transform active:scale-90">
                      {volume === 0 ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                      )}
                    </button>
                    <div className="flex items-center w-0 overflow-hidden group-hover/volume:w-20 transition-all duration-300 ease-in-out">
                      <input type="range" min="0" max="1" step="0.1" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white" />
                    </div>
                  </div>
                )}

                {video.hasText && isActive && video.phrases && (
                  <AnimatedTextOverlay phrases={video.phrases} />
                )}

                <p className={`absolute bottom-4 left-0 w-full text-center font-medium text-[10px] md:text-sm tracking-wide z-10 transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`}>
                  {video.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

// --- LA PAGE PRINCIPALE ---
export default function Home() {
  const [isGuideOpen, setIsGuideOpen] = useState(false); 
  const [isEligibleOpen, setIsEligibleOpen] = useState(false);

  return (
    // 👉 NOUVEAU : min-h-[100dvh] permet à la page de s'adapter PARFAITEMENT à Safari Mobile
    // 👉 On ajoute pb-28 (padding bottom) pour que le bouton flottant ne cache jamais le contenu
    <div className="min-h-[100dvh] w-full bg-[#0a0a0a] text-white flex flex-col font-sans selection:bg-amber-500/30 relative overflow-x-hidden pb-28 md:pb-0">
      
      <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />

      {/* HEADER (Épuré sur mobile) */}
      <header className="w-full p-4 md:p-6 flex justify-between items-center text-xs md:text-sm font-medium text-gray-400 z-10 flex-none">
        <div className="flex gap-6">
          <button 
            onClick={() => setIsGuideOpen(true)}
            className="hover:text-white transition-colors tracking-wide uppercase flex items-center gap-2"
          >
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.5)]"></span>
            Le Guide Offert
          </button>
        </div>
        {/* 👉 NOUVEAU : On cache ces liens sur mobile (hidden md:flex) pour alléger l'écran */}
        <div className="hidden md:flex gap-6">
          <a href="#" className="hover:text-white transition-colors tracking-wide uppercase">Nous contacter</a>
          <a href="#" className="hover:text-white transition-colors tracking-wide uppercase">Mentions légales</a>
        </div>
      </header>

      {/* CONTENEUR PRINCIPAL */}
      <div className="flex-1 flex flex-col items-center justify-start md:justify-center w-full max-w-7xl mx-auto px-4 gap-4 md:gap-8 mt-2 md:mt-0">
        
        {/* L'ACCROCHE */}
        <main className="text-center flex-none">
          <h1 className="text-[28px] md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-2 leading-tight">
            Obtenez votre Visa de 5 ans. <br />
            <span className="text-gray-400 text-xl md:text-3xl lg:text-4xl">On s'occupe du reste.</span>
          </h1>
          <p className="text-gray-400 text-xs md:text-base max-w-xl mx-auto mt-2">
            Sécurisez votre dossier. Évitez les pièges de l'ambassade. Partez l'esprit libre.
          </p>
        </main>

        {/* LE RÊVE (Vidéos) */}
        <section className="flex-none md:flex-1 w-full flex items-center justify-center my-2">
          <VideoSequence />
        </section>

      </div>

      {/* 👉 NOUVEAU : LE BOUTON D'ACTION FLOTTANT (STYLE APPLE) 👈 */}
      <div className="fixed bottom-6 md:bottom-8 left-0 w-full flex justify-center z-50 px-4 pointer-events-none">
        <div className="bg-black/30 backdrop-blur-xl p-2 rounded-full border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)] pointer-events-auto transition-transform duration-500">
          <button 
            onClick={() => setIsEligibleOpen(true)}
            className="bg-white text-black px-6 py-4 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base hover:bg-gray-200 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Vérifier mon éligibilité (Test Rapide)
          </button>
        </div>
      </div>

      <DtvGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />

      {/* MODAL FORMULAIRE */}
      {isEligibleOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setIsEligibleOpen(false)} />
          <div className="relative bg-[#0a0a0a] w-full max-w-4xl h-[85vh] rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setIsEligibleOpen(false)}
              className="absolute top-4 right-4 z-[110] text-gray-400 hover:text-white bg-white/10 p-2 rounded-full"
            >
              ✕
            </button>
            <iframe 
              src="https://tally.so/embed/b5ky6e?hideTitle=1&transparentBackground=1" 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              title="Test d'éligibilité DTV"
            ></iframe>
          </div>
        </div>
      )}

    </div>
  );
}