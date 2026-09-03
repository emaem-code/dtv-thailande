import React from 'react';
import Link from 'next/link';
import { listerDevis, totaliser, type Devis } from '../../lib/devis';
import { agenceIncomplete, mentionsManquantes } from '../../lib/agence';
import BoutonNouveauDevis from './BoutonNouveauDevis';

export const dynamic = 'force-dynamic';

function euros(m: number): string {
  return `${m.toLocaleString('fr-FR').replace(/ | /g, ' ')} €`;
}

const ETIQUETTES: Record<string, { texte: string; classe: string }> = {
  brouillon: { texte: 'Brouillon', classe: 'text-gray-400 border-white/15 bg-white/5' },
  envoye: { texte: 'Envoyé', classe: 'text-sky-400 border-sky-500/25 bg-sky-500/10' },
  accepte: { texte: 'Accepté', classe: 'text-emerald-400 border-emerald-500/25 bg-emerald-500/10' },
  refuse: { texte: 'Refusé', classe: 'text-red-400 border-red-500/25 bg-red-500/10' },
};

export default async function PageDevis() {
  let devis: Devis[] = [];
  let erreur = '';
  try {
    devis = await listerDevis();
  } catch (e) {
    devis = [];
    erreur = (e as Error).message;
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Devis</h1>
          <p className="text-sm text-gray-500 mt-1">
            {devis.length} document{devis.length > 1 ? 's' : ''} · numérotation continue
          </p>
        </div>
        <BoutonNouveauDevis />
      </div>

      {agenceIncomplete() && (
        <div className="border border-amber-500/30 bg-amber-500/5 rounded-xl p-4 mb-6">
          <p className="text-amber-400 font-semibold text-sm mb-1">
            Mentions légales incomplètes
          </p>
          <p className="text-xs text-gray-400 leading-relaxed">
            Il manque {mentionsManquantes().join(' et ')}. Vous pouvez préparer des devis, mais
            l&apos;envoi au client est bloqué : un devis sans ces mentions n&apos;est pas opposable.
            Le jour de l&apos;immatriculation, tout se débloque en complétant{' '}
            <code className="text-gray-300">app/lib/agence.ts</code>.
          </p>
        </div>
      )}

      {erreur && (
        <div className="border border-red-500/30 bg-red-500/5 rounded-xl p-4 mb-6">
          <p className="text-red-400 font-semibold text-sm mb-1">Base de données injoignable</p>
          <p className="text-xs text-gray-400 leading-relaxed">{erreur}</p>
        </div>
      )}

      {devis.length === 0 && !erreur ? (
        <div className="border border-white/10 rounded-2xl p-12 text-center">
          <p className="text-gray-400 text-sm">
            Aucun devis pour l&apos;instant. Créez-en un, ou partez d&apos;une demande reçue depuis
            l&apos;onglet <Link href="/admin/leads" className="text-amber-500 hover:underline">Demandes</Link>.
          </p>
        </div>
      ) : (
        <div className="border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-black/40 border-b border-white/10 text-left">
                <th className="px-5 py-3 text-[10px] uppercase tracking-widest text-gray-500 font-bold">Numéro</th>
                <th className="px-5 py-3 text-[10px] uppercase tracking-widest text-gray-500 font-bold">Client</th>
                <th className="px-5 py-3 text-[10px] uppercase tracking-widest text-gray-500 font-bold">Foyer</th>
                <th className="px-5 py-3 text-[10px] uppercase tracking-widest text-gray-500 font-bold text-right">Honoraires</th>
                <th className="px-5 py-3 text-[10px] uppercase tracking-widest text-gray-500 font-bold text-right">Budget</th>
                <th className="px-5 py-3 text-[10px] uppercase tracking-widest text-gray-500 font-bold">État</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {devis.map((d) => {
                const t = totaliser(d);
                const et = ETIQUETTES[d.statut] ?? ETIQUETTES.brouillon;
                return (
                  <tr key={d.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="px-5 py-4">
                      <Link href={`/admin/devis/${d.id}`} className="text-amber-500 hover:underline font-medium">
                        {d.numero}
                      </Link>
                      <p className="text-[11px] text-gray-600 mt-0.5">
                        {new Date(d.creeLe).toLocaleDateString('fr-FR')}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-white">
                      {d.client.nom || <span className="text-gray-600">sans nom</span>}
                      <p className="text-[11px] text-gray-600 mt-0.5">{d.client.email}</p>
                    </td>
                    <td className="px-5 py-4 text-gray-400">
                      {d.dossier.personnes} pers.
                      <p className="text-[11px] text-gray-600 mt-0.5">
                        {d.dossier.softPower ? 'Soft Power' : 'À distance'}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-right text-white font-medium">{euros(t.honoraires)}</td>
                    <td className="px-5 py-4 text-right text-gray-400">{euros(t.total)}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${et.classe}`}>
                        {et.texte}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
