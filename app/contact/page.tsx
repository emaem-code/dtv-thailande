import Link from "next/link";

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

        <div className="pt-8">
          <Link href="/" className="text-gray-500 hover:text-white transition-colors uppercase tracking-wide text-sm font-bold">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}