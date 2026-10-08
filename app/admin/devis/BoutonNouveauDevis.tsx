'use client';

import React, { useState, useId } from 'react';
import { useRouter } from 'next/navigation';

import { PAYS_RESIDENCE } from '../../lib/residence-consulaire';

export default function BoutonNouveauDevis({ leadId, paysResidence = '' }: { leadId?: number; paysResidence?: string }) {
  const router = useRouter();
  const idPays = useId();
  const [pays, setPays] = useState(paysResidence);
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState('');

  const creer = async () => {
    setEnCours(true);
    setErreur('');
    try {
      const reponse = await fetch('/api/admin/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, dossier: { paysResidence: pays } }),
      });
      const corps = (await reponse.json()) as { devis?: { id: number }; erreur?: string };
      if (reponse.ok && corps.devis) {
        router.push(`/admin/devis/${corps.devis.id}`);
        return;
      }
      setErreur(corps.erreur || 'Création impossible.');
    } catch {
      setErreur('Le serveur n’a pas répondu.');
    }
    setEnCours(false);
  };

  return (
    <div className="text-right">
      <label htmlFor={idPays} className="block text-xs mb-2">Pays de résidence confirmé</label>
      <select id={idPays} className="champ mb-2 max-w-xs" value={pays}
        onChange={(e) => { setPays(e.target.value); setErreur(''); }} disabled={enCours}>
        <option value="">Choisir le pays</option>
        {PAYS_RESIDENCE.map((p) => <option key={p.valeur} value={p.valeur}>{p.libelle}</option>)}
        <option value="autre">Autre pays ou territoire — examen manuel</option>
      </select>
      <button
        onClick={creer}
        disabled={enCours || !pays}
        className={
          leadId
            ? 'text-xs bg-white/10 hover:bg-white/15 text-white px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50'
            : 'bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap'
        }
      >
        {/* Sur un téléphone, le libellé complet mangeait la moitié de la barre
            d'outils et repoussait les filtres hors de l'écran. Le bouton reste
            la cible la plus visible ; c'est son texte qui se réduit. */}
        {enCours ? (
          'Création…'
        ) : leadId ? (
          'Créer le devis'
        ) : (
          <>
            <span className="sm:hidden">+ Devis</span>
            <span className="hidden sm:inline">Nouveau devis</span>
          </>
        )}
      </button>
      {erreur && <p role="alert" className="text-xs text-red-400 mt-2 max-w-xs">{erreur}</p>}
    </div>
  );
}
