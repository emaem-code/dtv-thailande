"use client"; 

import { useState, useRef, useEffect } from "react";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import MobileVideoCarousel from './components/MobileVideoCarousel';
import HomeContent from "./components/HomeContent";
import SiteHeader from "./components/SiteHeader";
import { PRIX_APPEL, prix } from "./lib/tarifs";
import { useApparitionAuScroll } from "./components/useApparitionAuScroll";
import { useModales } from "./components/ModalesProvider";
import { getSortedBlogPosts } from "./blog/posts";

// NOTE : pas de balisage FAQPage ici — il appartient à la page /faq, qui porte
// les mêmes questions. Deux FAQPage identiques sur un même site se concurrencent.

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
        <div
          key={i}
          className={`absolute w-full px-4 text-white font-bold text-base lg:text-xl leading-tight tracking-normal text-center transition-all duration-1000 transform drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] ${
            i === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {phrase}
        </div>
      ))}
    </div>
  );
}

function HeroText({
  nbGuides,
  onEligibilite,
  onGuide,
}: {
  nbGuides: number;
  onEligibilite: () => void;
  onGuide: () => void;
}) {
  return (
    <div className="w-full text-center lg:text-left animate-in fade-in duration-1000">
      <span className="inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-500 mb-5">
        Agence basée à Phuket
      </span>

      <h1 className="text-4xl md:text-5xl xl:text-[3.4rem] font-extrabold tracking-tighter leading-[1.08] text-white">
        Visa DTV Thaïlande :{' '}
        <span className="bg-clip-text text-transparent bg-gradient-to-br from-amber-400 to-amber-600">
          5 ans, sans mauvaise surprise
        </span>
      </h1>

      <p className="text-sm md:text-base text-gray-400 mt-4 leading-relaxed max-w-lg mx-auto lg:mx-0">
        Nous montons votre dossier consulaire de bout en bout. Trois voies d&apos;accès, un tarif
        public, et un accompagnement par quelqu&apos;un qui a fait la démarche lui-même.
      </p>

      <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
        <button
          onClick={onEligibilite}
          className="inline-flex items-center justify-center bg-white text-black font-bold text-sm py-3.5 px-7 rounded-full hover:bg-gray-200 transition-all active:scale-95"
        >
          Vérifier mon éligibilité
        </button>
        <button
          onClick={onGuide}
          className="inline-flex items-center justify-center gap-2 border border-amber-500/50 text-amber-500 font-bold text-sm py-3.5 px-7 rounded-full hover:bg-amber-500/10 transition-all active:scale-95"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          Le guide gratuit
        </button>
      </div>

      <dl className="mt-8 pt-6 border-t border-white/10 flex gap-8 justify-center lg:justify-start">
        <div>
          <dt className="sr-only">Guides publiés</dt>
          <dd className="text-xl font-extrabold text-white">{nbGuides}</dd>
          <p className="text-[11px] text-gray-500 mt-0.5">guides en ligne</p>
        </div>
        <div>
          <dt className="sr-only">Durée du visa</dt>
          <dd className="text-xl font-extrabold text-white">5 ans</dd>
          <p className="text-[11px] text-gray-500 mt-0.5">de séjour obtenu</p>
        </div>
        <div>
          <dt className="sr-only">Tarif de départ</dt>
          <dd className="text-xl font-extrabold text-white">{prix(PRIX_APPEL)}</dd>
          <p className="text-[11px] text-gray-500 mt-0.5">à partir de</p>
        </div>
      </dl>
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
    { id: 4, src: "/video-budget.mp4", poster: "/poster-budget.jpg", title: "Votre investissement", hasText: true, phrases: [`À partir de ${prix(PRIX_APPEL)}. Tout inclus`, "Frais de visa et agence inclus", "Vérifiez votre éligibilité"] }
  ];

  useEffect(() => {
    const resetTimer = setTimeout(() => {
      setShowVolume(false);
    }, 0);
    const showTimer = setTimeout(() => {
      setShowVolume(true);
    }, 3000);
    return () => {
      clearTimeout(resetTimer);
      clearTimeout(showTimer);
    };
  }, [activeIndex]);

  useEffect(() => {
    videoRefs.current.forEach((vid, index) => {
      if (!vid) return;
      // Le navigateur n'autorise la lecture automatique que si la vidéo est
      // réellement muette au moment de l'appel. La prop React `muted` n'étant
      // pas fiable sur <video>, on la force ici sur l'élément lui-même.
      vid.muted = volume === 0;
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

      {/* 💻 DESKTOP VIEW : lecteur vertical à gauche, chapitres cliquables à droite */}
      <div className="hidden lg:flex flex-row items-stretch w-full gap-6 xl:gap-8">

        {/* À GAUCHE : Le Lecteur Vidéo "Focus" (format portrait) */}
        <div className="relative w-[228px] xl:w-[264px] aspect-[9/16] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/10 shrink-0 bg-[#0a0a0a]">
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
                  preload={isActive ? "auto" : "none"}
                  muted
                  autoPlay={isActive}
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

        {/* À DROITE : La Liste des Chapitres, cliquables — hauteur alignée sur le lecteur */}
        <div className="flex flex-col gap-2 xl:gap-2.5 flex-1 min-w-0">
          <div className="flex-none text-gray-500 text-[10px] xl:text-xs font-bold uppercase tracking-widest px-1 flex items-center gap-2">
            <svg className="w-3 h-3 text-amber-500 flex-none" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 4h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1zm6 4.5v7l6-3.5-6-3.5z" />
            </svg>
            Tout comprendre en 5 vidéos
          </div>

          {videos.map((video, index) => {
            const isActive = index === activeIndex;
            return (
              <div 
                key={video.id}
                onClick={() => handleVideoClick(index)}
                className={`group relative flex-1 min-h-0 flex items-center gap-3 xl:gap-4 p-2 xl:p-2.5 rounded-2xl cursor-pointer transition-all duration-500 overflow-hidden ${
                  isActive 
                    ? 'bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.05)]' 
                    : 'bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 grayscale-[50%] hover:grayscale-0'
                }`}
              >
                <div className="relative h-full aspect-[3/4] rounded-lg overflow-hidden shrink-0 border border-white/10 shadow-lg">
                  <Image
                    src={video.poster}
                    alt={`Aperçu vidéo ${video.title} pour l'accompagnement Visa DTV Thaïlande`}
                    fill
                    sizes="(min-width: 1280px) 64px, 52px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {isActive ? (
                    /* Vidéo en cours : égaliseur animé */
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-[1px]">
                      <div className="flex gap-1 items-end h-4">
                        <div className="w-1 bg-amber-500 rounded-full animate-bounce h-2" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-1 bg-amber-500 rounded-full animate-bounce h-4" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-1 bg-amber-500 rounded-full animate-bounce h-3" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  ) : (
                    /* Vidéo en attente : symbole lecture, pour qu'on comprenne que c'est cliquable */
                    <div className="absolute inset-0 bg-black/35 flex items-center justify-center transition-all duration-300 group-hover:bg-black/15">
                      <span className="flex items-center justify-center w-6 h-6 xl:w-7 xl:h-7 rounded-full bg-black/55 border border-white/40 backdrop-blur-[2px] transition-transform duration-300 group-hover:scale-110 group-hover:border-amber-400">
                        <svg className="w-2.5 h-2.5 xl:w-3 xl:h-3 text-white ml-[1px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-center">
                  <div className={`text-sm xl:text-base font-bold leading-tight mb-0.5 transition-colors ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                    {video.title.replace('\n', ' ')}
                  </div>
                  <p className="text-[11px] xl:text-xs text-gray-400 line-clamp-2 leading-relaxed">
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

// Nouveau Composant pour les Ressources Officielles
function FooterRessources() {
  return (
    <section className="w-full max-w-4xl mx-auto mt-20 mb-8 py-8 px-4 border-t border-white/10 text-center">
      <h2 className="text-lg font-bold text-white mb-4">Ressources Officielles</h2>
      <p className="text-gray-500 text-sm mb-4">Pour des informations vérifiées, consultez les sites gouvernementaux :</p>
      <div className="flex flex-wrap justify-center gap-6">
        <a 
          href="http://www.thaiembassy.fr/fr/visa-rdv/les-types-de-visa-et-les-documents-necessaires/dtv/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-amber-500 hover:underline text-sm font-medium transition-colors"
        >
          Ambassade Royale de Thaïlande
        </a>
        <a 
          href="https://www.tatnews.org" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-amber-500 hover:underline text-sm font-medium transition-colors"
        >
          Tourism Authority of Thailand (TAT)
        </a>
      </div>
    </section>
  );
}

export default function Home() {
  // Compteur d'articles réellement publiés — se met à jour seul à chaque publication
  const nbGuides = getSortedBlogPosts().filter(
    (p) => new Date(p.publishedAt) <= new Date()
  ).length;

  // Fenêtres et menu mobile : gérés à la racine du site (ModalesProvider).
  const { ouvrirGuide, ouvrirEligibilite, ouvrirMethode } = useModales();
  // Le bandeau de prix ne sort qu'une fois le hero dépassé
  const bandeauVisible = useApparitionAuScroll(520);

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white flex flex-col font-sans selection:bg-amber-500/30 relative overflow-x-hidden pb-24 md:pb-28">


      <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />

      {/* ── EN-TÊTE COMMUN À TOUT LE SITE ── */}
      <SiteHeader />

      {/* CONTENU PRINCIPAL */}
      <main className="flex-1 flex flex-col items-center justify-start w-full mx-auto pt-8 lg:pt-12">

        {/* HERO : texte à gauche, bloc vidéo à droite (lecteur portrait + chapitres) */}
        <section className="w-full max-w-6xl px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-10 lg:gap-12 items-center">
          <h2 className="sr-only">Pourquoi choisir notre accompagnement pour le Visa DTV ?</h2>
          <HeroText
            nbGuides={nbGuides}
            onEligibilite={ouvrirEligibilite}
            onGuide={ouvrirGuide}
          />
          <VideoSequence />
        </section>

        {/* CONTENU DE FOND : rendu dans le HTML, sous la ligne de flottaison */}
        <HomeContent />

        {/* Modification n°2 : Ajout du bloc ressources OFFICIELLES à la fin du main */}
        <FooterRessources />

      </main>

      {/* PIED DE PAGE (tous écrans depuis la refonte : la sidebar ne porte plus les liens) */}
      <footer className="flex w-full flex-col items-center justify-center gap-4 pt-16 pb-8 text-sm font-medium text-gray-600 relative opacity-90">
        <div className="w-24 h-px bg-white/10 mb-4"></div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 px-4 text-center">
          <button onClick={ouvrirMethode} className="hover:text-gray-300 transition-colors">Notre Méthode</button>
          <Link href="/blog" className="hover:text-gray-300 transition-colors">Le Blog</Link>
          <Link href="/faq" className="hover:text-gray-300 transition-colors">FAQ</Link>
          <Link href="/contact" className="hover:text-gray-300 transition-colors">Nous contacter</Link>
          <Link href="/mentions-legales" className="hover:text-gray-300 transition-colors">Mentions légales</Link>
        </div>
        <span className="text-xs text-gray-700 mt-2">© {new Date().getFullYear()} Visa DTV Thaïlande.</span>
      </footer>

      {/* ── BANDEAU DE PRIX FLOTTANT ──
          Masqué en haut de page : le hero porte déjà le même bouton, et
          l'en-tête collant en porte un troisième. Il n'apparaît qu'une fois
          le hero dépassé, sur une seule ligne. */}
      <div
        className={`fixed bottom-4 md:bottom-6 left-0 w-full flex justify-center z-[60] px-3 pointer-events-none transition-all duration-500 ${
          bandeauVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="pointer-events-auto flex items-center gap-3 md:gap-5 bg-black/80 backdrop-blur-2xl rounded-full pl-5 pr-2 py-2 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
          <p className="hidden sm:block text-gray-300 text-xs md:text-sm font-medium whitespace-nowrap">
            Clé en main · <span className="text-white font-bold">dès {prix(PRIX_APPEL)}</span>
          </p>
          <button
            onClick={ouvrirEligibilite}
            className="bg-white text-black px-5 py-2.5 md:px-6 md:py-3 rounded-full font-bold text-[13px] md:text-sm hover:bg-amber-400 active:scale-95 transition-all duration-300 whitespace-nowrap"
          >
            Vérifier mon éligibilité — 2 min
          </button>
        </div>
      </div>

    </div>
  );
}
