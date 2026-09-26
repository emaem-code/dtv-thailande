import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { desinscrire } from '../../../lib/abonnes';

/**
 * La désinscription, en un clic et sans contrepartie.
 *
 * L'article L34-5 du code des postes impose un moyen simple de s'opposer. Une
 * page qui demanderait une confirmation, un motif ou un mot de passe n'en
 * serait pas un — et une désinscription rendue pénible se transforme en
 * signalement pour courrier indésirable, ce qui coûte bien plus cher qu'un
 * abonné perdu.
 */
export const metadata: Metadata = {
  title: 'Désinscription — DTV Thaïlande',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function PageDesinscription({
  params,
}: {
  params: Promise<{ jeton: string }>;
}) {
  const { jeton } = await params;
  let email: string | null = null;
  try {
    email = await desinscrire(jeton);
  } catch {
    email = null;
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-5 py-16">
      <div className="max-w-lg w-full border border-white/10 rounded-2xl p-8 text-center">
        <h1 className="text-xl font-bold text-white mb-3">
          {email ? 'C’est fait' : 'Ce lien n’est plus valable'}
        </h1>
        <p className="text-sm text-gray-400 leading-relaxed mb-8">
          {email
            ? `${email} ne recevra plus aucune alerte. Aucune confirmation ne vous sera demandée, et je ne vous écrirai pas pour vous faire changer d’avis.`
            : 'Il a peut-être déjà servi. Si vous continuez à recevoir des messages, répondez simplement à l’un d’eux et je m’en occuperai.'}
        </p>
        <Link href="/" className="text-sm text-amber-500 hover:underline">
          Retour au site
        </Link>
      </div>
    </main>
  );
}
