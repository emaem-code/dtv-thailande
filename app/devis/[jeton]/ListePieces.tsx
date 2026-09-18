'use client';

import React, { useState } from 'react';
import type { GroupePieces } from '../../lib/parcours';

/**
 * Les pièces à réunir, cochables par le client.
 *
 * L'état est enregistré côté serveur : une case qui se décoche au prochain
 * passage n'aiderait personne, et Matthieu voit du même coup où en est le
 * client sans avoir à le lui demander.
 *
 * L'affichage est mis à jour avant la réponse du serveur, et remis en place si
 * l'enregistrement échoue. Cocher une case doit répondre instantanément ;
 * attendre un aller-retour réseau pour voir une croix apparaître donne
 * l'impression d'une application cassée.
 */

export default function ListePieces({
  jeton,
  groupes,
  cochees,
}: {
  jeton: string;
  groupes: GroupePieces[];
  cochees: Record<string, boolean>;
}) {
  const [etat, setEtat] = useState<Record<string, boolean>>(cochees);
  const [erreur, setErreur] = useState('');

  const total = groupes.reduce((s, g) => s + g.pieces.length, 0);
  const faites = groupes.reduce(
    (s, g) => s + g.pieces.filter((p) => etat[p.id]).length,
    0,
  );

  const basculer = async (piece: string) => {
    const coche = !etat[piece];
    setEtat((e) => ({ ...e, [piece]: coche }));
    setErreur('');
    try {
      const reponse = await fetch(`/api/devis/${jeton}/pieces`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ piece, coche }),
      });
      if (!reponse.ok) throw new Error();
    } catch {
      setEtat((e) => ({ ...e, [piece]: !coche }));
      setErreur('Impossible d’enregistrer. Vérifiez votre connexion.');
    }
  };

  return (
    <section className="mt-8 border border-white/10 rounded-2xl p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-lg font-bold text-white">Les pièces à réunir</h2>
        <p className="text-sm text-gray-500">
          {faites} sur {total}
        </p>
      </div>

      <div className="h-1.5 bg-white/5 rounded-full mt-4 overflow-hidden">
        <div
          className="h-full bg-amber-500 rounded-full transition-all duration-500"
          style={{ width: `${total ? Math.round((faites / total) * 100) : 0}%` }}
        />
      </div>

      <p className="text-xs text-gray-500 mt-4 leading-relaxed">
        Cochez au fur et à mesure : je vois votre avancement de mon côté. Envoyez-moi les documents
        par courriel, en une ou plusieurs fois, comme il vous arrange.
      </p>

      <div className="mt-6 space-y-8">
        {groupes.map((groupe) => (
          <div key={groupe.titre}>
            <h3 className="text-sm font-bold text-white">{groupe.titre}</h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{groupe.introduction}</p>
            <ul className="mt-3 space-y-2">
              {groupe.pieces.map((piece) => {
                const coche = Boolean(etat[piece.id]);
                return (
                  <li key={piece.id}>
                    <label className="flex gap-3 items-start cursor-pointer border border-white/10 rounded-xl p-4 hover:border-white/20 transition-colors">
                      <input
                        type="checkbox"
                        checked={coche}
                        onChange={() => basculer(piece.id)}
                        className="mt-1 w-4 h-4 flex-none accent-amber-500"
                      />
                      <span className="min-w-0">
                        <span
                          className={`block text-sm font-medium ${coche ? 'text-gray-500 line-through' : 'text-white'}`}
                        >
                          {piece.titre}
                          {piece.parPersonne && (
                            <span className="ml-2 align-middle inline-block text-[9px] font-bold uppercase tracking-wider text-amber-500 border border-amber-500/30 rounded-full px-2 py-0.5 no-underline">
                              par personne
                            </span>
                          )}
                        </span>
                        <span className="block text-xs text-gray-500 mt-1 leading-relaxed">
                          {piece.detail}
                        </span>
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {erreur && <p className="text-sm text-red-400 mt-4">{erreur}</p>}
    </section>
  );
}
