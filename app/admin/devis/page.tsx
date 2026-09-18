import React from 'react';
import Link from 'next/link';
import { listerDevis, totaliser, type Devis } from '../../lib/devis';
import { agenceIncomplete, mentionsManquantes, siretEnAttente } from '../../lib/agence';
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

      {agenceIncomplete() ? (
        <div className="border border-amber-500/30 bg-amber-500/5 rounded-xl p-4 mb-6">
          <p className="text-amber-400 font-semibold text-sm mb-1">
            Mentions légales incomplètes
          </p>
          <p className="text-xs text-gray-400 leading-relaxed">
            Il manque {mentionsManquantes().join(' et ')}. Vous pouvez préparer des devis, mais
            l&apos;envoi au client est bloqué : un devis sans ces mentions n&apos;est pas opposable.
            Tout se débloque en complétant{' '}
            <code className="text-gray-300">app/lib/agence.ts</code>.
          </p>
        </div>
      ) : siretEnAttente() ? (
        <div className="border border-sky-500/25 bg-sky-500/5 rounded-xl p-4 mb-6">
          <p className="text-sky-400 font-semibold text-sm mb-1">Immatriculation en cours</p>
          <p className="text-xs text-gray-400 leading-relaxed">
            Les devis partent avec la mention « SIRET en cours d&apos;attribution », admise pendant
            l&apos;instruction de la formalité. Dès que l&apos;INSEE renvoie le numéro, renseignez-le
            dans <code className="text-gray-300">app/lib/agence.ts</code> et repassez{' '}
            <code className="text-gray-300">immatriculationEnCours</code> à{' '}
            <code className="text-gray-300">false</code>.
          </p>
        </div>
      ) : null}

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
        <>
        {/* ── TÉLÉPHONE : une carte par devis ──────────────────────────────
            Six colonnes dans 390 px de large n'ont pas de bonne réponse. Le
            tableau débordait de près du double et le conteneur, en
            `overflow-hidden`, coupait honoraires, budget et état sans même
            laisser défiler : trois informations sur six devenaient
            inatteignables depuis un téléphone. Faire défiler un tableau
            horizontalement n'aurait pas mieux valu — cet écran se consulte
            debout, d'une main. La carte entière est cliquable. */}
        <ul className="sm:hidden space-y-3">
          {devis.map((d) => {
            const t = totaliser(d);
            const et = ETIQUETTES[d.statut] ?? ETIQUETTES.brouillon;
            return (
              <li key={d.id}>
                <Link
                  href={`/admin/devis/${d.id}`}
                  className="block border border-white/10 rounded-2xl p-4 active:bg-white/5 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-amber-500 font-medium">{d.numero}</p>
                      <p className="text-[11px] text-gray-600 mt-0.5">
                        {new Date(d.creeLe).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <span
                      className={`flex-none text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${et.classe}`}
                    >
                      {d.signature ? 'Signé' : et.texte}
                    </span>
                  </div>

                  <p className="text-white mt-3 truncate">
                    {d.client.nom || <span className="text-gray-600">sans nom</span>}
                  </p>
                  <p className="text-[11px] text-gray-600 truncate">{d.client.email}</p>

                  <div className="flex items-baseline justify-between gap-3 mt-3 pt-3 border-t border-white/5">
                    <span className="text-xs text-gray-500">
                      {d.dossier.personnes} pers. · {d.dossier.softPower ? 'Soft Power' : 'À distance'}
                    </span>
                    <span className="text-sm text-white font-medium whitespace-nowrap">
                      {euros(t.honoraires)}{' '}
                      <span className="text-xs text-gray-600 font-normal">/ {euros(t.total)}</span>
                    </span>
                  </div>

                  {d.signature && (
                    <p className="text-[11px] text-gray-600 mt-2">
                      Signé le {new Date(d.signature.signeLe).toLocaleDateString('fr-FR')} par{' '}
                      {d.signature.prenom} {d.signature.nom}
                    </p>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── ÉCRAN LARGE : le tableau ── */}
        <div className="hidden sm:block border border-white/10 rounded-2xl overflow-hidden">
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
                        {d.signature ? 'Signé' : et.texte}
                      </span>
                      {d.signature && (
                        <p className="text-[11px] text-gray-600 mt-1">
                          {new Date(d.signature.signeLe).toLocaleDateString('fr-FR')} ·{' '}
                          {d.signature.prenom} {d.signature.nom}
                        </p>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        </>
      )}
    </>
  );
}
