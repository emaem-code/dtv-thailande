import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DocumentDevis from '../../components/DocumentDevis';
import { lireDevisParJeton } from '../../lib/devis';
import { AGENCE } from '../../lib/agence';
import BoutonImprimer from './BoutonImprimer';

/**
 * Le devis tel que le client le reçoit.
 *
 * L'adresse contient un jeton aléatoire de 128 bits : elle n'est pas
 * devinable, et c'est ce qui en tient lieu de protection. Aucune session n'est
 * demandée au client — lui imposer un compte pour lire son propre devis serait
 * une friction gratuite. En contrepartie, la page n'est jamais indexée.
 */
export const metadata: Metadata = {
  title: 'Votre devis — DTV Thaïlande',
  robots: { index: false, follow: false, nocache: true },
};

// Un devis corrigé doit être visible immédiatement : pas de mise en cache.
export const dynamic = 'force-dynamic';

export default async function PageDevisClient({
  params,
}: {
  params: Promise<{ jeton: string }>;
}) {
  const { jeton } = await params;

  let devis = null;
  try {
    devis = await lireDevisParJeton(jeton);
  } catch {
    // Base injoignable : on ne montre pas une trace technique au client.
    devis = null;
  }

  if (!devis) notFound();

  return (
    <main className="min-h-screen bg-[#0a0a0a] print:bg-white py-10 print:py-0 px-4 print:px-0">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6 print:hidden">
          <p className="text-sm text-gray-500">
            Devis {devis.numero} · {AGENCE.enseigne}
          </p>
          <BoutonImprimer />
        </div>

        <DocumentDevis devis={devis} />

        <p className="text-center text-xs text-gray-600 mt-8 print:hidden">
          Une question sur ce devis ? Répondez simplement au courriel qui vous l&apos;a transmis, ou
          écrivez à{' '}
          <a href={`mailto:${AGENCE.email}`} className="text-amber-500 hover:underline">
            {AGENCE.email}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
