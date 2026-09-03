import React from 'react';
import { listerLeads, CONSERVATION_MOIS, type Lead } from '../../lib/leads';
import BoutonNouveauDevis from '../devis/BoutonNouveauDevis';

export const dynamic = 'force-dynamic';

function quand(iso: string): string {
  const date = new Date(iso);
  const heures = (Date.now() - date.getTime()) / 3_600_000;
  if (heures < 1) return "à l'instant";
  if (heures < 24) return `il y a ${Math.floor(heures)} h`;
  if (heures < 48) return 'hier';
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

export default async function PageLeads() {
  let leads: Lead[] = [];
  let erreur = '';
  try {
    leads = await listerLeads();
  } catch (e) {
    leads = [];
    erreur = (e as Error).message;
  }

  const aTraiter = leads.filter((l) => !l.traite);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Demandes</h1>
        <p className="text-sm text-gray-500 mt-1">
          {aTraiter.length} à traiter sur {leads.length} · conservées {CONSERVATION_MOIS} mois
        </p>
      </div>

      {erreur && (
        <div className="border border-red-500/30 bg-red-500/5 rounded-xl p-4 mb-6">
          <p className="text-red-400 font-semibold text-sm mb-1">Base de données injoignable</p>
          <p className="text-xs text-gray-400 leading-relaxed">{erreur}</p>
        </div>
      )}

      {leads.length === 0 && !erreur ? (
        <div className="border border-white/10 rounded-2xl p-12 text-center">
          <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
            Aucune demande enregistrée. Les prochaines soumissions du test d&apos;éligibilité
            apparaîtront ici. Celles reçues avant la mise en place de cette page sont restées chez
            Formspree, qui continue de recevoir chaque demande en parallèle.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map((l) => (
            <div
              key={l.id}
              className={`border rounded-2xl p-5 transition-colors ${
                l.traite ? 'border-white/5 bg-white/[0.01] opacity-60' : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-white font-semibold">
                    {l.prenom || 'Sans prénom'}
                    <span className="text-gray-500 font-normal text-sm ml-2">{l.email}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {quand(l.creeLe)} · {l.personnes} personne{l.personnes > 1 ? 's' : ''} ·{' '}
                    {l.softPower ? 'Soft Power' : 'Activité à distance'}
                    {l.formule && ` · formule ${l.formule}`}
                    {l.telephone && ` · ${l.telephone}`}
                  </p>
                </div>
                {!l.traite && <BoutonNouveauDevis leadId={l.id} />}
              </div>

              <details className="mt-4 group">
                <summary className="text-xs text-gray-500 hover:text-gray-300 cursor-pointer list-none">
                  Voir le détail de la demande ▾
                </summary>
                <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs border-t border-white/5 pt-3">
                  {Object.entries(l.donnees).map(([cle, valeur]) => (
                    <div key={cle} className="flex gap-2 min-w-0">
                      <dt className="text-gray-600 flex-none">{cle} :</dt>
                      <dd className="text-gray-300 truncate">{valeur}</dd>
                    </div>
                  ))}
                </dl>
              </details>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
