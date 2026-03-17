"use client"; 

import { useState, useRef, useEffect } from "react";
import Script from "next/script";
import Link from "next/link";
import DtvGuideModal from "./components/DtvGuideModal"; 
import MobileVideoCarousel from './components/MobileVideoCarousel';
import EligibilityFormModal from "./components/EligibilityFormModal";
import ProcessModal from "./components/ProcessModal";
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
    <div className="absolute bottom-[30%] left-0 w-full flex justify-center z-20 pointer-events-none px-4">
      {phrases.map((phrase, i) => (
        <h3
          key={i}
          className={`absolute w-full px-4 text-white font-bold text-base lg:text-xl leading-tight tracking-normal text-center transition-all duration-1000 transform drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] ${
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
    <div className="pb-4 lg:pb-6 flex flex-col items-center justify-center text-center px-4 w-full animate-in fade-in zoom-in duration-1000">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
        Votre vie en Thaïlande <br className="block md:hidden" /> commence ici
      </h1>
      <p className="text-[14px] md:text-lg text-gray-400 mt-2 font-medium max-w-xl mx-auto leading-relaxed">
        Visa DTV 5 ans · Dossier béton · Zéro charge mentale
      </p>
    </div>
  );
}

function VideoSequence() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [volume, setVolume] = useState(0);
  const [showVolume, setShowVolume] = useState(false);
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
    const timer = setTimeout(() => {
      setShowVolume(true);
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
    <div className="relative w-full flex flex-col items-center justify-center">
      
      {/* 📱 MOBILE VIEW */}
      <div className="block lg:hidden w-full">
        <MobileVideoCarousel />
      </div>

      {/* 💻 DESKTOP VIEW : ASYMÉTRIE PREMIUM */}
      <div className="hidden lg:flex flex-row items-center justify-center w-full max-w-6xl px-4 gap-12 xl:gap-20 py-2">
        
        {/* À GAUCHE : Le Lecteur Vidéo "Focus" */}
        <div className="relative w-[340px] xl:w-[380px] aspect-[9/16] rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/10 shrink-0 bg-[#0a0a0a]">
          {videos.map((video, index) => {
            const isActive = index === activeIndex;
            return (
              <div 
                key={video.id} 
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${isActive ? 'opacity-100 z-20' : 'opacity-0 z-0 pointer-events-none'}`}
              >
                <video 
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={video.src}
                  poster={video.poster}
                  playsInline
                  preload={isActive ? "metadata" : "none"}
                  muted={volume === 0}
                  onEnded={handleVideoEnd}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute bottom-0 w-full h-[60%] bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none"></div>
               
                {isActive && (
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      setVolume(volume === 0 ? 0.8 : 0); 
                    }} 
                    className={`absolute top-6 right-6 z-40 flex items-center justify-center p-3 bg-black/40 backdrop-blur-md rounded-full transition-all duration-500 hover:scale-110 active:scale-95 border border-white/10 ${
                      volume !== 0 
                        ? 'text-white' 
                        : showVolume 
                          ? 'animate-pulse text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]' 
                          : 'text-white/50'
                    }`}
                    aria-label="Toggle mute"
                  >
                    {volume === 0 ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                    )}
                  </button>
                )}

                {isActive && video.hasText && video.phrases && (
                  <AnimatedTextOverlay phrases={video.phrases} />
                )}
              </div>
            );
          })}
        </div>

        {/* À DROITE : La Liste des Chapitres (Sans le texte Étape) */}
        <div className="flex flex-col gap-3 xl:gap-4 w-full max-w-lg">
          <h3 className="text-gray-500 text-xs xl:text-sm font-bold uppercase tracking-widest mb-2 px-2">L'accompagnement clé en main</h3>
          
          {videos.map((video, index) => {
            const isActive = index === activeIndex;
            return (
              <div 
                key={video.id}
                onClick={() => handleVideoClick(index)}
                className={`group relative flex items-center gap-5 p-3 xl:p-4 rounded-2xl cursor-pointer transition-all duration-500 overflow-hidden ${
                  isActive 
                    ? 'bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.05)]' 
                    : 'bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 grayscale-[50%] hover:grayscale-0'
                }`}
              >
                <div className="relative w-16 h-24 xl:w-20 xl:h-28 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-lg">
                  <img src={video.poster} alt={video.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  
                  {isActive && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-[1px]">
                      <div className="flex gap-1 items-end h-4">
                        <div className="w-1 bg-amber-500 rounded-full animate-bounce h-2" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-1 bg-amber-500 rounded-full animate-bounce h-4" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-1 bg-amber-500 rounded-full animate-bounce h-3" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-center">
                  <h4 className={`text-base xl:text-lg font-bold leading-tight mb-1.5 transition-colors ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                    {video.title.replace('\n', ' ')}
                  </h4>
                  <p className="text-xs xl:text-sm text-gray-400 line-clamp-2 leading-relaxed">
                    {video.phrases[0]}
                  </p>
                </div>
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
  const [isProcessOpen, setIsProcessOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white flex flex-col font-sans selection:bg-amber-500/30 relative overflow-x-hidden pb-48 md:pb-56">
      
      <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />

      {/* 💻 NOUVEAU : SIDEBAR LATÉRALE (Uniquement Desktop) */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 w-64 h-screen border-r border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl z-[60] py-10 px-6 justify-between shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col gap-10">
          
          {/* Logo / Titre Sidebar */}
          <div className="px-2">
            <h2 className="text-xl font-black text-white leading-tight">VISA DTV <br/><span className="text-amber-500">THAÏLANDE</span></h2>
          </div>

          {/* Bouton Primaire (Guide) */}
          <button 
            onClick={() => setIsGuideOpen(true)}
            className="relative flex items-center justify-center gap-3 px-4 py-3.5 bg-gradient-to-b from-amber-500/20 to-amber-500/10 hover:from-amber-500/30 hover:to-amber-500/20 border border-amber-500/50 rounded-2xl transition-all duration-300 text-amber-500 font-bold shadow-[0_0_15px_rgba(245,158,11,0.2)] active:scale-95"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            Le guide gratuit
          </button>

          {/* Menu de Navigation unifié */}
          <nav className="flex flex-col gap-1.5">
            <button onClick={() => setIsProcessOpen(true)} className="text-left px-4 py-3 rounded-xl hover:bg-white/5 hover:text-white transition-all duration-300 text-sm font-medium text-gray-400 flex items-center gap-3">
              <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
              Notre Méthode
            </button>
            <button onClick={() => setIsFaqOpen(true)} className="text-left px-4 py-3 rounded-xl hover:bg-white/5 hover:text-white transition-all duration-300 text-sm font-medium text-gray-400 flex items-center gap-3">
              <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              FAQ
            </button>
            <Link href="/contact" className="text-left px-4 py-3 rounded-xl hover:bg-white/5 hover:text-white transition-all duration-300 text-sm font-medium text-gray-400 flex items-center gap-3">
              <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Nous contacter
            </Link>
            <Link href="/mentions-legales" className="text-left px-4 py-3 rounded-xl hover:bg-white/5 hover:text-white transition-all duration-300 text-sm font-medium text-gray-400 flex items-center gap-3">
              <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              Mentions légales
            </Link>
          </nav>
        </div>

        <div className="text-[10px] text-gray-600 px-2 leading-relaxed">
          © {new Date().getFullYear()} Visa DTV Thaïlande.<br/>Expertise & Expatriation.
        </div>
      </aside>

      {/* 📱 HEADER MOBILE (Inchangé) */}
      <header className="lg:hidden w-full p-4 md:p-6 flex justify-between items-center text-sm font-medium text-gray-400 z-[60] absolute top-0 left-0">
        <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-white hover:text-amber-400 transition-colors focus:outline-none" aria-label="Menu">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </header>

      {/* 📱 MENU MOBILE PLEIN ÉCRAN */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-300 lg:hidden">
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <div className="flex flex-col items-center gap-8 text-lg font-medium">
            <button onClick={() => { setIsGuideOpen(true); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 text-amber-500 hover:text-amber-400 text-xl font-bold transition-colors">
              <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span></span>
              Le guide gratuit
            </button>
            <button onClick={() => { setIsProcessOpen(true); setIsMobileMenuOpen(false); }} className="text-white hover:text-gray-300 transition-colors">Notre Méthode</button>
            <button onClick={() => { setIsFaqOpen(true); setIsMobileMenuOpen(false); }} className="text-white hover:text-gray-300 transition-colors">FAQ</button>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-gray-300 transition-colors">Nous contacter</Link>
            <Link href="/mentions-legales" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-gray-300 transition-colors">Mentions légales</Link>
          </div>
        </div>
      )}

      {/* CONTENU PRINCIPAL (Décalé à droite sur Desktop pour laisser la place à la Sidebar) */}
      <div className="flex-1 flex flex-col items-center justify-start w-full lg:ml-64 lg:w-[calc(100%-16rem)] mx-auto pt-16 lg:pt-10">
        <HeroText />
        
        <section className="w-full max-w-7xl px-4 flex items-center justify-center mt-2 lg:mt-4">
          <VideoSequence />
        </section>
      </div>

      {/* FOOTER MOBILE (Disparaît sur Desktop car les liens sont dans la Sidebar) */}
      <footer className="lg:hidden flex w-full flex-col items-center justify-center gap-4 pt-16 pb-8 text-sm font-medium text-gray-600 relative opacity-90">
        <div className="w-24 h-px bg-white/10 mb-4"></div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 px-4 text-center">
          <button onClick={() => setIsProcessOpen(true)} className="hover:text-gray-300 transition-colors">Notre Méthode</button>
          <button onClick={() => setIsFaqOpen(true)} className="hover:text-gray-300 transition-colors">FAQ</button>
          <Link href="/contact" className="hover:text-gray-300 transition-colors">Nous contacter</Link>
          <Link href="/mentions-legales" className="hover:text-gray-300 transition-colors">Mentions légales</Link>
        </div>
        <span className="text-xs text-gray-700 mt-2">© {new Date().getFullYear()} Visa DTV Thaïlande.</span>
      </footer>

      {/* DOCK FLOTTANT DU PRIX (Centré par rapport au contenu sur Desktop) */}
      <div className="fixed bottom-3 md:bottom-8 left-0 lg:left-64 w-full lg:w-[calc(100%-16rem)] flex justify-center z-50 px-3 pointer-events-none">
        <div className="relative flex flex-col items-center gap-1.5 md:gap-3 pointer-events-auto bg-black/70 backdrop-blur-2xl rounded-[2rem] px-5 pt-3 pb-3 md:px-8 md:pt-5 md:pb-5 border border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">

          <div className="text-center pointer-events-none">
            <p className="text-gray-200 text-xs md:text-sm font-medium tracking-wide">
              Accompagnement clé en main · <span className="text-white font-bold">à partir de 850 €</span>
            </p>
            <p className="text-gray-400 text-[10px] md:text-xs tracking-wide mt-1">
              Frais de visa, traductions et honoraires d'agence inclus
            </p>
          </div>

          <div className="relative group w-full mt-2">
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

      {/* MODALS */}
      <DtvGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
      <EligibilityFormModal isOpen={isEligibleOpen} onClose={() => setIsEligibleOpen(false)} />
      <FaqModal isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} />
      <ProcessModal isOpen={isProcessOpen} onClose={() => setIsProcessOpen(false)} />

    </div>
  );
}