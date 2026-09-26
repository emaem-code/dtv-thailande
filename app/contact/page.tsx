import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { AGENCE, mentionSiret } from "../lib/agence";
import { RENDEZ_VOUS } from "../lib/rendez-vous";
import s from "./contact.module.css";

// ─── MÉTADONNÉES SEO DE LA PAGE CONTACT (Résout l'erreur Codex) ───
export const metadata: Metadata = {
  title: 'Contactez-moi | DTV Thaïlande',
  description: 'Une question spécifique sur votre dossier de Visa DTV ? Je vous réponds sous 48 heures.',
  alternates: {
    canonical: 'https://dtv-thailande.fr/contact',
  },
  openGraph: {
    title: 'Contactez-moi | DTV Thaïlande',
    description: 'Contactez-moi directement pour votre dossier de Visa DTV.',
    url: 'https://dtv-thailande.fr/contact',
    siteName: 'DTV Thaïlande',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contactez-moi | DTV Thaïlande',
    description: 'Contactez-moi directement pour votre dossier de Visa DTV.',
    images: ['/og-image.jpg'],
  },
};

export default function Contact() {
  return (
    <main className={s.page}>
      <div className={s.container}>
        <header className={s.intro}>
          <p className={s.eyebrow}>Votre projet, parlons-en.</p>
          <h1 className={s.title}>Contactez-moi</h1>
          <p className={s.lead}>
            Une question sur votre projet en Thaïlande ou votre dossier DTV ?
            Choisissez la façon d’échanger qui vous convient.
          </p>
        </header>

        <div className={s.choices}>
          <section className={`${s.card} ${s.appointment}`} aria-labelledby="contact-visio">
            <div className={s.cardTop}>
              <span className={s.icon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" focusable="false">
                  <rect x="3" y="6" width="12" height="12" rx="3" />
                  <path d="m15 10 6-3v10l-6-3" />
                </svg>
              </span>
              <p className={s.format}>En visio · {RENDEZ_VOUS.dureeMinutes} minutes</p>
            </div>
            <h2 id="contact-visio" className={s.cardTitle}>Faisons le point ensemble</h2>
            <p className={s.description}>
              Vous préférez en parler de vive voix ? Réservez un créneau pour
              présenter votre situation et poser vos questions sur le Visa DTV.
            </p>
            <div className={s.action}>
              <a className={s.primary} href={RENDEZ_VOUS.url} target="_blank" rel="noopener noreferrer">
                {RENDEZ_VOUS.libelle}
              </a>
              <p className={s.note}>L’agenda Google s’ouvre dans un nouvel onglet.</p>
            </div>
          </section>

          <section className={`${s.card} ${s.email}`} aria-labelledby="contact-email">
            <div className={s.cardTop}>
              <span className={s.icon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" focusable="false">
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
              </span>
              <p className={s.format}>Par e-mail · À votre rythme</p>
            </div>
            <h2 id="contact-email" className={s.cardTitle}>Écrivez-moi simplement</h2>
            <p className={s.description}>
              Une question précise ou un dossier à me présenter ?
              Décrivez votre projet par e-mail. Je vous réponds sous 48 heures.
            </p>
            <div className={s.action}>
              <a className={s.secondary} href={`mailto:${AGENCE.email}`}>Écrire un e-mail</a>
              <p className={s.note}>{AGENCE.email}</p>
            </div>
          </section>
        </div>

        <section className={s.practical} aria-labelledby="contact-interlocuteur">
          <div className={s.person}>
            <Image
              src="/images/matthieu-moretti.jpg"
              alt="Matthieu Moretti, votre interlocuteur DTV Thaïlande"
              width={80}
              height={80}
              sizes="80px"
              className={s.portrait}
            />
            <div>
              <p className={s.label}>Votre interlocuteur</p>
              <h2 id="contact-interlocuteur" className={s.personName}>{AGENCE.nom} — {AGENCE.enseigne}</h2>
              <p className={s.activity}>{AGENCE.activite}</p>
              <p className={s.location}>
                Activité exercée depuis {AGENCE.lieu}, en Thaïlande — d’où des réponses
                parfois décalées de quelques heures.
              </p>
            </div>
          </div>
          <div className={s.company}>
            <p className={s.label}>Siège de l’activité</p>
            <address>{AGENCE.adresse}<br />{AGENCE.codePostal} {AGENCE.ville}, {AGENCE.pays}</address>
            <p>{mentionSiret()}<br />{AGENCE.mentionTva}</p>
          </div>
        </section>

        <Link href="/" className={s.back}>Retour à l’accueil</Link>
      </div>
    </main>
  );
}
