import Link from "next/link";
import type { Metadata } from "next";
import { AGENCE, mentionSiret } from "../lib/agence";

// ─── MÉTADONNÉES SEO DE LA PAGE CONTACT (Résout l'erreur Codex) ───
export const metadata: Metadata = {
  title: 'Contactez-nous | DTV Thaïlande',
  description: 'Une question spécifique sur votre dossier de Visa DTV ? Notre équipe vous répond sous 24h à 48h.',
  alternates: {
    canonical: 'https://dtv-thailande.fr/contact',
  },
  openGraph: {
    title: 'Contactez-nous | DTV Thaïlande',
    description: 'Prenez contact avec notre équipe pour votre dossier de Visa DTV.',
    url: 'https://dtv-thailande.fr/contact',
    siteName: 'DTV Thaïlande',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contactez-nous | DTV Thaïlande',
    description: 'Prenez contact avec notre équipe pour votre dossier de Visa DTV.',
    images: ['/og-image.jpg'],
  },
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-8 font-sans">
      <div className="max-w-xl w-full space-y-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Contactez-nous</h1>
        
        <p className="text-gray-400 text-lg">
          Une question spécifique sur votre dossier ? <br/> 
          Notre équipe vous répond sous 24h à 48h.
        </p>

        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm mt-8">
          <p className="text-xl font-medium">
            Envoyez-nous un e-mail à :
          </p>
          <a 
            href="mailto:contact@dtv-thailande.fr" 
            className="block mt-4 text-2xl md:text-3xl font-bold text-amber-500 hover:text-white transition-colors"
          >
            contact@dtv-thailande.fr
          </a>
        </div>

        {/* L'adresse du siège rassure autant qu'elle oblige : un prestataire
            qui encaisse un acompte à distance doit dire où il est établi. */}
        <div className="border-t border-white/10 pt-8 text-sm text-gray-500 leading-relaxed">
          <p className="text-gray-300 font-medium">{AGENCE.nom} — {AGENCE.enseigne}</p>
          <p>{AGENCE.activite}</p>
          <p className="mt-2">
            {AGENCE.adresse}
            <br />
            {AGENCE.codePostal} {AGENCE.ville}, {AGENCE.pays}
          </p>
          <p className="mt-2">
            {mentionSiret()} · {AGENCE.mentionTva}
          </p>
          <p className="mt-2 text-gray-600">
            Activité exercée depuis {AGENCE.lieu}, en Thaïlande — d&apos;où des réponses parfois
            décalées de quelques heures.
          </p>
        </div>

        <div className="pt-4">
          <Link href="/" className="text-gray-500 hover:text-white transition-colors uppercase tracking-wide text-sm font-bold">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}