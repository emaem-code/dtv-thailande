import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { confirmer, CONSENTEMENT } from '../../../lib/abonnes';

/**
 * La page qui valide le clic reçu par courriel.
 *
 * Elle agit au chargement, sans bouton à presser : la personne a déjà donné
 * son consentement dans le formulaire, puis l'a confirmé en cliquant dans son
 * courriel. Lui demander un troisième geste serait de la friction sans objet.
 */
export const metadata: Metadata = {
  title: 'Inscription confirmée — DTV Thaïlande',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function PageConfirmer({
  params,
}: {
  params: Promise<{ jeton: string }>;
}) {
  const { jeton } = await params;
  let email: string | null = null;
  try {
    email = await confirmer(jeton);
  } catch {
    email = null;
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-5 py-16">
      <div className="max-w-lg w-full border border-white/10 rounded-2xl p-8 text-center">
        {email ? (
          <>
            <p className="text-4xl mb-4">✓</p>
            <h1 className="text-xl font-bold text-white mb-3">C&apos;est confirmé</h1>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              {email} recevra un message chaque fois qu&apos;une règle du visa DTV change — et
              uniquement dans ce cas. Entre mai et septembre 2026, cela aurait représenté quatre
              messages.
            </p>
            <p className="text-xs text-gray-600 leading-relaxed mb-8">{CONSENTEMENT}</p>
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold text-white mb-3">Ce lien n&apos;est plus valable</h1>
            <p className="text-sm text-gray-400 leading-relaxed mb-8">
              Il a peut-être déjà servi, ou l&apos;adresse a été retirée depuis. Vous pouvez
              recommencer depuis n&apos;importe quel article du blog.
            </p>
          </>
        )}
        <Link
          href="/blog"
          className="inline-block bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm px-6 py-3 rounded-xl transition-colors"
        >
          Lire les articles
        </Link>
      </div>
    </main>
  );
}
