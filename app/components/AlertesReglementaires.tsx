'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Le bloc d'inscription aux alertes réglementaires.
 *
 * Il est placé en bas des pages du blog, et c'est le seul endroit où il a du
 * sens : quelqu'un qui vient de lire pourquoi le dépôt en Asie a été fermé le
 * 31 août sait déjà pourquoi il voudrait être prévenu la prochaine fois. Sur
 * la page d'accueil, la même proposition n'aurait aucun contexte.
 *
 * La promesse est chiffrée plutôt que vague. « Recevez les actualités » ne dit
 * rien ; « quatre messages entre mai et septembre » dit à la fois la fréquence
 * et la raison d'être. C'est aussi une promesse tenable — s'il n'y a pas de
 * changement de règle, il n'y a pas de message, et c'est très bien ainsi.
 */

type Etat = 'repos' | 'envoi' | 'envoye' | 'erreur';

export default function AlertesReglementaires() {
  const chemin = usePathname();
  const [email, setEmail] = useState('');
  const [consentement, setConsentement] = useState(false);
  const [etat, setEtat] = useState<Etat>('repos');
  const [message, setMessage] = useState('');

  const envoyer = async (e: React.FormEvent) => {
    e.preventDefault();
    setEtat('envoi');
    setMessage('');
    try {
      const reponse = await fetch('/api/abonnes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consentement, source: chemin }),
      });
      const corps = (await reponse.json()) as { erreur?: string };
      if (reponse.ok) {
        setEtat('envoye');
        return;
      }
      setEtat('erreur');
      setMessage(corps.erreur || 'L’inscription a échoué.');
    } catch {
      setEtat('erreur');
      setMessage('Le serveur n’a pas répondu. Réessayez dans un instant.');
    }
  };

  if (etat === 'envoye') {
    return (
      <section className="max-w-3xl mx-auto px-5 md:px-6 pb-14 md:pb-20">
        <div className="border border-emerald-500/25 bg-emerald-500/5 rounded-3xl p-8 text-center">
          <p className="text-3xl mb-3">✉️</p>
          <h3 className="text-lg font-bold text-white mb-2">Regardez votre boîte</h3>
          <p className="text-sm text-gray-400 leading-relaxed max-w-md mx-auto">
            Un message vient de partir vers <strong className="text-white">{email}</strong>. Un clic
            à l&apos;intérieur, et c&apos;est réglé. Sans ce clic, votre adresse n&apos;est pas
            ajoutée — et s&apos;il n&apos;arrive pas d&apos;ici quelques minutes, pensez au dossier
            des indésirables.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-5 md:px-6 pb-14 md:pb-20">
      <div className="border border-white/10 bg-[#111111] rounded-3xl p-8 md:p-10">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
          Être prévenu quand les règles changent
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xl">
          Entre mai et septembre 2026, le DTV a changé quatre fois : dépôt en Asie fermé, casier
          judiciaire exigé, exemption de visa ramenée de 60 à 30 jours, et un seuil financier que
          presque tout le monde convertit de travers. Préparer un départ sur des règles périmées
          coûte des frais consulaires non remboursables.
        </p>
        <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xl">
          Un message quand une règle bouge. Rien le reste du temps — et si rien ne change, vous
          n&apos;aurez aucune nouvelle, ce qui sera la meilleure des nouvelles.
        </p>

        <form onSubmit={envoyer} className="space-y-4 max-w-md">
          <input
            type="email"
            aria-label="Votre adresse e-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@adresse.fr"
            className="champ"
            autoComplete="email"
          />

          <label className="flex items-start gap-3 text-xs text-gray-400 leading-relaxed cursor-pointer">
            <input
              type="checkbox"
              required
              checked={consentement}
              onChange={(e) => setConsentement(e.target.checked)}
              className="case-a-cocher mt-0.5 flex-none"
            />
            <span>
              J&apos;accepte de recevoir par courriel les changements de règles du visa DTV. Mon
              adresse ne sert qu&apos;à cela, n&apos;est jamais transmise à un tiers, et chaque
              message comporte un lien de désinscription.
            </span>
          </label>

          {etat === 'erreur' && <p className="text-sm text-red-400">{message}</p>}

          <button
            type="submit"
            disabled={etat === 'envoi'}
            className="bouton-principal bouton-auto disabled:opacity-50"
          >
            {etat === 'envoi' ? 'Un instant…' : 'Me prévenir'}
          </button>
        </form>

        <p className="text-[11px] text-gray-600 mt-5 leading-relaxed max-w-xl">
          Responsable du traitement : DTV Thaïlande. Finalité : vous informer des évolutions
          réglementaires du visa DTV. Conservation : 24 mois sans interaction. Vous disposez
          d&apos;un droit d&apos;accès, de rectification et d&apos;effacement — voir les{' '}
          <Link href="/mentions-legales" className="underline hover:text-gray-400">
            mentions légales
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
