import Link from "next/link";

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 md:p-16 font-sans">
      <div className="max-w-3xl mx-auto space-y-10">
        <Link href="/" className="text-amber-500 hover:text-white transition-colors uppercase tracking-wide text-sm font-bold">
          ← Retour à l'accueil
        </Link>
        
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Mentions Légales</h1>

        <section className="space-y-6 text-gray-400 text-sm md:text-base leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">1. Éditeur du site</h2>
            <p>Ce site est édité par Matthieu Moretti.</p>
            <p>Statut : Entreprise en cours d'immatriculation.</p>
            <p>Email de contact : contact@dtv-thailande.fr</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-2">2. Hébergement</h2>
            <p>Le site est hébergé par la société Vercel Inc.</p>
            <p>Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.</p>
            <p>Site web : https://vercel.com</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-2">3. Données personnelles (RGPD)</h2>
            <p>
              Les informations recueillies via notre formulaire de qualification sont strictement confidentielles. 
              Elles sont utilisées uniquement dans le cadre de l'évaluation de votre éligibilité au visa DTV et 
              l'élaboration de votre devis. En aucun cas ces données ne seront cédées ou vendues à des tiers.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}