'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function Formulaire() {
  const router = useRouter();
  const parametres = useSearchParams();
  const suite = parametres.get('suite') || '/admin/devis';

  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const [enCours, setEnCours] = useState(false);

  const soumettre = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnCours(true);
    setErreur('');
    try {
      const reponse = await fetch('/api/admin/connexion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ motDePasse }),
      });
      if (reponse.ok) {
        router.replace(suite);
        router.refresh();
        return;
      }
      const corps = (await reponse.json().catch(() => ({}))) as { erreur?: string };
      setErreur(corps.erreur || 'Connexion refusée.');
    } catch {
      setErreur('Le serveur n’a pas répondu. Réessayez dans un instant.');
    }
    setEnCours(false);
  };

  return (
    <form onSubmit={soumettre} className="w-full max-w-sm">
      <h1 className="text-2xl font-bold text-white mb-2">Espace d&apos;administration</h1>
      <p className="text-sm text-gray-500 mb-8">DTV Thaïlande — devis et demandes</p>

      <label htmlFor="mdp" className="block text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">
        Mot de passe
      </label>
      <input
        id="mdp"
        type="password"
        autoFocus
        autoComplete="current-password"
        value={motDePasse}
        onChange={(e) => setMotDePasse(e.target.value)}
        className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500/60 transition-colors"
      />

      {erreur && (
        <p className="mt-4 text-sm text-red-400 leading-relaxed" role="alert">
          {erreur}
        </p>
      )}

      <button
        type="submit"
        disabled={enCours || !motDePasse}
        className="mt-6 w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-bold py-3 rounded-xl transition-colors"
      >
        {enCours ? 'Vérification…' : 'Entrer'}
      </button>
    </form>
  );
}

export default function PageConnexion() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <Suspense fallback={null}>
        <Formulaire />
      </Suspense>
    </main>
  );
}
