"use client";

import Link from "next/link";
import Image from "next/image";
import HomeContent from "./components/HomeContent";
import HomeHeader from "./components/HomeHeader";
import ActionIcon from "./components/ActionIcon";
import { useModales } from "./components/ModalesProvider";
import { useApparitionAuScroll } from "./components/useApparitionAuScroll";
import { useHomeMotion } from "./components/useHomeMotion";
import { PRIX_APPEL, prix } from "./lib/tarifs";
import { AGENCE, mentionSiret } from "./lib/agence";
import s from "./home.module.css";

export default function Home() {
  const { ouvrirGuide, ouvrirEligibilite, ouvrirMethode } = useModales();
  const afficherRappel = useApparitionAuScroll(720);
  const motionRef = useHomeMotion();

  return (
    <div className={`${s.page} ${s.motion}`} ref={motionRef}>
      <a className={s.skipLink} href="#contenu">
        Aller au contenu
      </a>
      <HomeHeader />
      <main id="contenu">
        <section className={s.hero} aria-labelledby="titre-accueil">
          <div className={s.heroCopy}>
            <p className={s.eyebrow}>
              <span className={s.statusDot} /> Votre projet, un interlocuteur sur place.
            </p>
            <h1 id="titre-accueil">
              <span>Visa DTV Thaïlande</span>Votre nouvelle vie
              <br />
              commence <em>ici.</em>
            </h1>
            <p className={s.heroDescription}>
              La Thaïlande dans vos projets. Un interlocuteur français à Phuket
              pour vous aider à les concrétiser, du premier document à votre
              arrivée.
            </p>
            <div className={s.heroActions}>
              <button onClick={ouvrirEligibilite} className={s.primary} data-sparkle="scroll">
                Vérifier mon éligibilité <ActionIcon name="eligibility" />
              </button>
              <a href="#accompagnement" className={s.textLink}>
                <span className={s.smallPlay} aria-hidden="true">
                  <ActionIcon name="play" size={14} />
                </span>{" "}
                Découvrir l’accompagnement
              </a>
            </div>
            <p className={s.microcopy}>
              Gratuit & sans engagement <span>·</span> Environ 2 minutes
            </p>
            <div className={s.advisorMini}>
              <Image
                src="/images/matthieu-moretti.jpg"
                width={48}
                height={48}
                alt="Matthieu Moretti, votre interlocuteur à Phuket"
              />
              <div>
                <strong>Matthieu, à vos côtés depuis Phuket.</strong>
                <span>Un vrai interlocuteur. En français, à chaque étape.</span>
              </div>
            </div>
          </div>
          <div className={s.heroVisual}>
            <div className={s.heroImageFrame}>
              <Image
                src="/images/hero-accueil.jpg"
                alt="Ordinateur portable ouvert sur une table en bois, terrasse donnant sur la végétation tropicale et la mer"
                fill
                priority
                sizes="(max-width: 760px) 100vw, 48vw"
                className={s.heroImage}
                data-hero-image=""
              />
            </div>
            <span className={s.locationTag}>
              <ActionIcon name="location" /> Destination Thaïlande
            </span>
            <div className={s.photoCaption}>
              <span>PLUS QU’UN VOYAGE.</span>
              <p>
                Une autre façon
                <br />
                de vivre.
              </p>
            </div>
            <a href="#visa-dtv" className={s.visaTicket}>
              <span className={s.ticketIcon} aria-hidden="true">
                <ActionIcon name="passport" size={24} />
              </span>
              <span>
                <strong>Votre prochain chapitre</strong>
                <small>DTV · 5 ans de validité · entrées multiples</small>
              </span>
            </a>
          </div>
        </section>

        <div
          className={s.trustStrip}
          data-motion-group=""
          aria-label="Les repères de votre accompagnement"
        >
          <p data-reveal="">
            <span aria-hidden="true">01</span>
            <strong>Un accompagnement humain</strong>
            <small>Un interlocuteur francophone à Phuket</small>
          </p>
          <p data-reveal="">
            <span aria-hidden="true">02</span>
            <strong>Un budget annoncé dès le départ</strong>
            <small>À partir de {prix(PRIX_APPEL)} par personne</small>
          </p>
          <p data-reveal="">
            <span aria-hidden="true">03</span>
            <strong>Votre dossier, de bout en bout</strong>
            <small>Préparation, dépôt et suivi consulaire</small>
          </p>
        </div>

        <h2 className="sr-only">
          Pourquoi choisir cet accompagnement pour le Visa DTV ?
        </h2>
        <HomeContent />

        <section className={s.advisorSection} aria-labelledby="titre-matthieu" data-motion-group="">
          <div className={s.advisorPortrait} data-reveal="">
            <Image
              src="/images/matthieu-moretti.jpg"
              alt="Matthieu Moretti, fondateur de DTV Thaïlande"
              fill
              sizes="(max-width: 760px) 90vw, 400px"
            />
          </div>
          <div data-motion-heading="">
            <p className={s.eyebrow} data-reveal="" data-heading-part="0">Derrière le site, une personne.</p>
            <h2 id="titre-matthieu" data-reveal="" data-heading-part="1">
              Le terrain, avant
              <br />
              <em>la théorie.</em>
            </h2>
            <p data-reveal="" data-heading-part="2">
              Je suis Matthieu, installé à Kathu, Phuket. J’ai moi-même fait la
              démarche du Visa DTV. Aujourd’hui, j’accompagne les francophones
              qui veulent préparer leur installation avec un dossier clair et un
              interlocuteur sur place.
            </p>
            <p data-reveal="">
              Je monte votre dossier consulaire de bout en bout. Trois voies
              d’accès, un tarif public, et un accompagnement par quelqu’un qui a
              fait la démarche lui-même.
            </p>
            <Link href="/contact" className={s.textLink} data-reveal="">
              Parlons de votre projet <ActionIcon name="message" />
            </Link>
          </div>
        </section>

        <section className={s.finalCta} aria-labelledby="titre-depart" data-motion-group="">
          <div data-motion-heading="">
            <p className={s.eyebrow} data-reveal="" data-heading-part="0">Le premier pas est le plus simple.</p>
            <h2 id="titre-depart" data-reveal="" data-heading-part="1">
              Et si votre projet
              <br />
              prenait <em>vraiment forme ?</em>
            </h2>
            <p data-reveal="" data-heading-part="2">
              Commençons par votre situation. Je prépare la suite
              avec vous.
            </p>
          </div>
          <div className={s.finalActions} data-reveal="">
            <button onClick={ouvrirEligibilite} className={s.primary} data-sparkle="scroll">
              Vérifier mon éligibilité <ActionIcon name="eligibility" />
            </button>
            <span>Gratuit · Sans engagement · En français</span>
            <button onClick={ouvrirGuide} className={s.textLink}>
              Je préfère commencer par le guide <ActionIcon name="book" />
            </button>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footerTop}>
          <Link
            href="/"
            className={s.brand}
            aria-label="DTV Thaïlande — accueil"
          >
            <Image
              src="/logo.svg?v=4"
              alt=""
              width={44}
              height={35}
              unoptimized
            />
            <span>
              DTV<span>DESTINATION THAÏLANDE</span>
            </span>
          </Link>
          <p>
            Votre projet de vie en Thaïlande.
            <br />
            Un accompagnement en français.
          </p>
          <nav aria-label="Liens de pied de page">
            <button onClick={ouvrirMethode}>La méthode</button>
            <Link href="/eligibilite">Éligibilité</Link>
            <Link href="/blog">Le Blog</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/contact">Me contacter</Link>
            <Link href="/mentions-legales">Mentions légales</Link>
          </nav>
        </div>
        <div className={s.officialResources}>
          <h2>Ressources Officielles</h2>
          <p>
            Pour des informations vérifiées, consultez les sites gouvernementaux
            :
          </p>
          <div>
            <a
              href="https://www.thaiembassy.fr/fr/visa-rdv/les-types-de-visa-et-les-documents-necessaires/dtv/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ambassade Royale de Thaïlande <ActionIcon name="window" size={14} />
            </a>
            <a
              href="https://www.tatnews.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tourism Authority of Thailand <ActionIcon name="window" size={14} />
            </a>
            <a
              href="https://www.thaievisa.go.th/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Portail officiel Thai e-Visa <ActionIcon name="window" size={14} />
            </a>
          </div>
        </div>
        <div className={s.footerBottom}>
          <p>
            {AGENCE.nom} — {AGENCE.enseigne} · {AGENCE.adresse},{" "}
            {AGENCE.codePostal} {AGENCE.ville}, {AGENCE.pays}
            <br />
            {mentionSiret()}
          </p>
          <span>© {new Date().getFullYear()} Visa DTV Thaïlande.</span>
        </div>
      </footer>

      {afficherRappel && (
        <aside className={s.stickyCta} aria-label="Commencer mon projet">
          <span>
            Votre projet commence ici
            <small>Accompagnement dès {prix(PRIX_APPEL)}</small>
          </span>
          <button onClick={ouvrirEligibilite} data-sparkle="ready">
            Mon éligibilité <ActionIcon name="eligibility" />
          </button>
        </aside>
      )}
    </div>
  );
}
