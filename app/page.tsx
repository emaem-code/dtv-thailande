"use client"; 

import { useState, useRef, useEffect } from "react";
import Script from "next/script";
import Link from "next/link";
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
    { id: 0, src: "/video-dtv.mp4", title: "Le passeport liberté", hasText: true, phrases: ["Votre nouveau quotidien.", "Zéro stress administratif.", "Visa DTV : 5 ans de liberté."] },
    { id: 1, src: "/video-erreur.mp4", title: "Le piège de l'ambassade", hasText: true, phrases: ["Une simple erreur de case...", "Un projet de vie annulé.", "Ne laissez rien au hasard."] },
    { id: 2, src: "/video-temoignage.mp4", title: "Ils vivent le rêve", hasText: true, phrases: ["Témoignage client.", "Dossier géré à 100%.", "Visa obtenu en quelques jours."] },
    { id: 3, src: "/video-accompagnement.mp4", title: "La méthode VIP", hasText: true, phrases: ["Arrivez sereinement.", "Profitez pleinement.", "On gère le dossier."] },
    { id: 4, src: "/video-budget.mp4", title: "Votre investissement", hasText: true, phrases: ["Un tarif adapté à votre profil.", "Formule Basique ou Esprit Libre.", "Ne payez que ce qu'il vous faut."] }
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
      
      {/* VERSION MOBILE & TABLETTE (Tactile) */}
      <div className="block lg:hidden w-full">
        <MobileVideoCarousel />
      </div>

      {/* VERSION PC (Grand écran uniquement) */}
      <div className="hidden lg:flex justify-center w-full h-full pb-8">
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
    // 👉 min-h-[100dvh] permet à la page de s'adapter PARFAITEMENT à Safari Mobile
    // 👉 On a bien pb-40 pour le mobile et pb-24 pour l'ordi
    <div className="min-h-[100dvh] w-full bg-[#0a0a0a] text-white flex flex-col font-sans selection:bg-amber-500/30 relative overflow-x-hidden pb-40 md:pb-24">
      
      <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />

      {/* HEADER FAÇON APPLE */}
      {/* 👉 NOUVEAU : justify-center sur mobile, justify-between sur PC */}
      <header className="w-full p-4 md:p-6 flex justify-center md:justify-between items-center text-sm font-medium text-gray-400 z-10 flex-none">
        
        {/* 👉 NOUVEAU : Bouton Guide "Premium" (Halo lumineux + radar) */}
        <div className="flex relative group">
          {/* Effet de lueur (Glow) qui s'active au survol */}
          <div className="absolute inset-0 bg-amber-500/20 blur-md rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <button 
            onClick={() => setIsGuideOpen(true)}
            className="relative flex items-center gap-3 px-5 py-2.5 bg-gradient-to-b from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 border border-white/10 hover:border-white/20 rounded-full transition-all duration-300 text-gray-200 hover:text-white backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.5)]"
          >
            {/* Nouveau point orange façon "Radar" (animate-ping) */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
            </span>
            <span className="tracking-wide font-semibold">Le guide offert</span>
          </button>
        </div>
        
        {/* Liens droits (PC uniquement) */}
        <div className="hidden md:flex gap-4">
          <Link href="/contact" className="px-4 py-2 rounded-full hover:bg-white/5 hover:text-white transition-all duration-300">
            Nous contacter
          </Link>
          <Link href="/mentions-legales" className="px-4 py-2 rounded-full hover:bg-white/5 hover:text-white transition-all duration-300">
            Mentions légales
          </Link>
        </div>
      </header>

      {/* CONTENEUR PRINCIPAL */}
      <div className="flex-1 flex flex-col items-center justify-start md:justify-center w-full max-w-7xl mx-auto px-4 gap-4 md:gap-8 mt-2 md:mt-0">
        
        {/* L'ACCROCHE */}
        <main className="text-center flex-none">
          <h1 className="text-[28px] md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-2 leading-tight">
            Votre Visa de 5 ans. <br />
            <span className="text-gray-400 text-xl md:text-3xl lg:text-4xl">On s'occupe du reste.</span>
          </h1>
          <p className="text-gray-400 text-xs md:text-base max-w-xl mx-auto mt-2">
            Obtenez le Visa DTV thaïlandais sans charge mentale. Un dossier béton. Zéro erreur. Vous n'avez plus qu'à faire vos valises.
          </p>
        </main>

        {/* LE RÊVE (Vidéos) */}
        <section className="flex-none md:flex-1 w-full flex items-center justify-center my-2">
          <VideoSequence />
        </section>

      </div>

      {/* 👉 LE FOOTER FAÇON APPLE (Doux et discret) */}
      <footer className="w-full flex flex-col items-center justify-center gap-3 pt-12 pb-8 text-sm font-medium text-gray-500 mt-auto z-10 relative opacity-90">
        <div className="flex gap-6">
          <Link href="/contact" className="hover:text-white transition-colors">Nous contacter</Link>
          <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
        </div>
        <span className="text-xs text-gray-600">© {new Date().getFullYear()} Visa DTV Thaïlande</span>
      </footer>

      {/* LE BOUTON D'ACTION FLOTTANT (Avec effet "Pulse" subtil) */}
      <div className="fixed bottom-6 md:bottom-8 left-0 w-full flex justify-center z-50 px-4 pointer-events-none">
        <div className="relative group pointer-events-auto">
          {/* L'effet de halo qui respire doucement en arrière-plan */}
          <div className="absolute inset-0 bg-white/20 rounded-full blur-lg animate-pulse"></div>
          
          <div className="relative bg-black/40 backdrop-blur-xl p-2 rounded-full border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:scale-105">
            <button 
              onClick={() => setIsEligibleOpen(true)}
              className="bg-white text-black px-6 py-4 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base hover:bg-gray-200 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-2"
            >
              Vérifier mon éligibilité (Test Rapide)
            </button>
          </div>
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