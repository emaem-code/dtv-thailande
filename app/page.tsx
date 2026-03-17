"use client"; 

import { useState, useRef, useEffect } from "react";
import Script from "next/script";
import Link from "next/link";
import DtvGuideModal from "./components/DtvGuideModal"; 
import MobileVideoCarousel from './components/MobileVideoCarousel';
import EligibilityFormModal from "./components/EligibilityFormModal";
// 👉 NOUVEAU : Import de la FAQ
import FaqModal from "./components/FaqModal";

function AnimatedTextOverlay({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const timeout = setTimeout(() => {
      setIndex(0);
      interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % phrases.length);
      }, 4500); 
    }, 3000); 

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [phrases.length]);

  return (
    <div className="absolute bottom-[30%] left-0 w-full flex justify-center z-20 pointer-events-none px-2">
      {phrases.map((phrase, i) => (
        <h3
          key={i}
          className={`absolute w-full px-2 text-white font-bold text-base lg:text-lg leading-tight tracking-normal text-center transition-all duration-1000 transform drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] ${
            i === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {phrase}
        </h3>
      ))}
    </div>
  );
}

function HeroText() {
  return (
    <div className="pb-2 md:pt-0 md:pb-4 flex flex-col items-center justify-center text-center px-4 w-full animate-in fade-in zoom-in duration-1000">
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
        Votre vie en Thaïlande <br className="block md:hidden" /> commence ici
      </h1>
      <p className="text-[13px] md:text-base text-gray-400 mt-1.5 md:mt-2 font-medium max-w-xl mx-auto leading-relaxed">
        Visa DTV 5 ans · Dossier béton · Zéro charge mentale
      </p>
    </div>
  );
}

function VideoSequence() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [volume, setVolume] = useState(0);
  const [showVolume, setShowVolume] = useState(false);
  const [showTitle, setShowTitle] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const videos = [
    { id: 0, src: "/video-dtv.mp4", poster: "/poster-dtv.jpg", title: "Et si c'était déjà fait ?", hasText: true, phrases: ["5 ans de liberté totale", "Votre vie d'après commence", "On s'en est occupé pour vous"] },
    { id: 1, src: "/video-erreur.mp4", poster: "/poster-erreur.jpg", title: "Un refus et tout s'effondre", hasText: true, phrases: ["Un simple détail peut valoir un refus", "Une case mal remplie suffit", "Ne laissez rien au hasard"] },
    { id: 2, src: "/video-temoignage.mp4", poster: "/poster-temoignage.jpg", title: "Acceptés du premier coup", hasText: true, phrases: ["Dossier géré à 100%", "Zéro aller-retour ambassade", "Ils sont déjà en Thaïlande"] },
    { id: 3, src: "/video-accompagnement.mp4", poster: "/poster-accompagnement.jpg", title: "On prend tout en charge", hasText: true, phrases: ["Audit, traductions, dépôt", "Vous faites vos valises", "Nous faisons le reste"] },
    { id: 4, src: "/video-budget.mp4", poster: "/poster-budget.jpg", title: "Votre investissement", hasText: true, phrases: ["À partir de 850 €. Tout inclus", "Frais de visa et agence inclus", "Vérifiez votre éligibilité"] }
  ];

  useEffect(() => {
    setShowVolume(false);
    setShowTitle(true);
    const timer = setTimeout(() => {
      setShowVolume(true);
      setShowTitle(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  useEffect(() => {
    videoRefs.current.forEach((vid, index) => {
      if (!vid) return;
      vid.volume = volume;
      if (index === activeIndex) {
        const playPromise = vid.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => console.log("Lecture auto bloquée"));
        }
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
      
      <div className="block lg:hidden w-full">
        <MobileVideoCarousel />
      </div>

      <div className="hidden lg:flex justify-center w-full h-full pb-8">
        <div className="grid grid-cols-5 gap-4 w-full max-w-6xl px-4 h-full max-h-[45vh] xl:max-h-[55vh]">
          {videos.map((video, index) => {
            const isActive = index === activeIndex;

            return (
              <div 
                key={video.id}
                onClick={() => handleVideoClick(index)}
                className="bg-[#0a0a0a] relative overflow-hidden cursor-pointer aspect-[9/16] h-full group rounded-2xl border border-white/5 shadow-2xl"
              >
                <video 
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={video.src}
                  poster={video.poster}
                  playsInline
                  preload={isActive ? "metadata" : "none"}
                  muted={volume === 0}
                  onEnded={handleVideoEnd}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-60 grayscale-[30%] group-hover:opacity-80'}`}
                />
                
                <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>
               
                {isActive && (
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      setVolume(volume === 0 ? 0.8 : 0); 
                    }} 
                    className={`absolute top-4 right-4 z-40 flex items-center justify-center p-2 bg-transparent transition-all duration-1000 active:scale-90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] ${
                      volume !== 0 
                        ? 'text-white' 
                        : showVolume 
                          ? 'animate-pulse text-amber-500' 
                          : 'text-white/50'
                    }`}
                    aria-label="Toggle mute"
                  >
                    {volume === 0 ? (
                      <svg className="w-7 h-7 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                    ) : (
                      <svg className="w-7 h-7 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                    )}
                  </button>
                )}

                {isActive && video.hasText && video.phrases && (
                  <AnimatedTextOverlay phrases={video.phrases} />
                )}

                <p className={`absolute bottom-4 left-0 w-full text-center font-bold text-[11px] md:text-sm tracking-wide z-10 transition-all duration-1000 ${
                  isActive 
                    ? (showTitle ? 'opacity-100 text-white' : 'opacity-0 translate-y-2') 
                    : 'opacity-100 text-gray-400'
                }`}>
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

export default function Home() {
  const [isGuideOpen, setIsGuideOpen] = useState(false); 
  const [isEligibleOpen, setIsEligibleOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // 👉 NOUVEAU : État pour la FAQ
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-[100dvh] w-full bg-[#0a0a0a] text-white flex flex-col font-sans selection:bg-amber-500/30 relative overflow-x-hidden pb-32 md:pb-32">
      
      <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />

      <header className="w-full p-4 md:p-6 flex justify-between items-center text-sm font-medium text-gray-400 z-[60] absolute top-0 left-0">
        
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden p-2 -ml-2 text-white hover:text-amber-400 transition-colors focus:outline-none"
          aria-label="Menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="hidden md:flex relative group">
          <div className="absolute inset-0 bg-amber-500/20 blur-md rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
          <button 
            onClick={() => setIsGuideOpen(true)}
            className="relative flex items-center gap-2.5 px-4 py-2 bg-gradient-to-b from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 border border-white/10 hover:border-white/20 rounded-full transition-all duration-300 text-gray-200 hover:text-white backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.5)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
            </span>
            <span className="tracking-wide font-semibold text-xs md:text-sm">Le guide gratuit</span>
          </button>
        </div>
        
        <div className="hidden md:flex gap-4 items-center">
          {/* 👉 NOUVEAU : Bouton FAQ Desktop */}
          <button onClick={() => setIsFaqOpen(true)} className="px-4 py-2 rounded-full hover:bg-white/5 hover:text-white transition-all duration-300">FAQ</button>
          <Link href="/contact" className="px-4 py-2 rounded-full hover:bg-white/5 hover:text-white transition-all duration-300">Nous contacter</Link>
          <Link href="/mentions-legales" className="px-4 py-2 rounded-full hover:bg-white/5 hover:text-white transition-all duration-300">Mentions légales</Link>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-300">
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="flex flex-col items-center gap-8 text-lg font-medium">
            <button 
              onClick={() => { setIsGuideOpen(true); setIsMobileMenuOpen(false); }}
              className="flex items-center gap-3 text-amber-500 hover:text-amber-400 text-xl font-bold transition-colors"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
              Le guide gratuit
            </button>
            {/* 👉 NOUVEAU : Bouton FAQ Mobile */}
            <button onClick={() => { setIsFaqOpen(true); setIsMobileMenuOpen(false); }} className="text-white hover:text-gray-300 transition-colors">FAQ</button>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-gray-300 transition-colors">Nous contacter</Link>
            <Link href="/mentions-legales" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-gray-300 transition-colors">Mentions légales</Link>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-start w-full mx-auto pt-14 md:pt-20">
        
        <HeroText />
        
        <section className="w-full max-w-7xl px-4 flex items-center justify-center my-0 md:my-4">
          <VideoSequence />
        </section>

      </div>

      <footer className="hidden md:flex w-full flex-col items-center justify-center gap-3 pt-2 pb-8 text-sm font-medium text-gray-500 mt-auto z-10 relative opacity-90">
        <div className="flex gap-6">
          <button onClick={() => setIsFaqOpen(true)} className="hover:text-white transition-colors">FAQ</button>
          <Link href="/contact" className="hover:text-white transition-colors">Nous contacter</Link>
          <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
        </div>
        <span className="text-xs text-gray-600">© {new Date().getFullYear()} Visa DTV Thaïlande</span>
      </footer>

      <div className="fixed bottom-3 md:bottom-6 left-0 w-full flex justify-center z-50 px-3 pointer-events-none">
        <div className="relative flex flex-col items-center gap-1.5 md:gap-3 pointer-events-auto bg-black/70 backdrop-blur-2xl rounded-[2rem] px-5 pt-3 pb-3 md:px-6 md:pt-4 md:pb-4 border border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.6)]">

          <div className="text-center pointer-events-none">
            <p className="text-gray-200 text-xs md:text-sm font-medium tracking-wide">
              Accompagnement clé en main · <span className="text-white font-bold">à partir de 850 €</span>
            </p>
            <p className="text-gray-400 text-[10px] md:text-xs tracking-wide mt-0.5">
              Frais de visa, traductions et honoraires d'agence inclus
            </p>
          </div>

          <div className="relative group w-full mt-1">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-lg animate-pulse" />
            <div className="relative bg-black/40 backdrop-blur-xl p-1 md:p-1.5 rounded-full border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:scale-105">
              <button
                onClick={() => setIsEligibleOpen(true)}
                className="w-full bg-white text-black px-6 py-3 md:px-8 md:py-3.5 rounded-full font-bold text-[13px] md:text-base hover:bg-gray-200 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] whitespace-nowrap"
              >
                Vérifier mon éligibilité — 2 min
              </button>
            </div>
          </div>

        </div>
      </div>

      <DtvGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
      
      <EligibilityFormModal 
        isOpen={isEligibleOpen} 
        onClose={() => setIsEligibleOpen(false)} 
      />

      {/* 👉 NOUVEAU : Le composant FAQ Modale */}
      <FaqModal 
        isOpen={isFaqOpen} 
        onClose={() => setIsFaqOpen(false)} 
      />

    </div>
  );
}