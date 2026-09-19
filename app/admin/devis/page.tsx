import React from 'react';
import Link from 'next/link';
import { listerDevis, totaliser, type Devis } from '../../lib/devis';
import { nomComplet } from '../../lib/devis-modele';
import { agenceIncomplete, mentionsManquantes, siretEnAttente } from '../../lib/agence';
import ListeDevis, { type LigneDevis } from './ListeDevis';

export const dynamic = 'force-dynamic';

/**
 * Le tableau de bord des devis.
 *
 * La page reste un composant serveur : elle lit la base, calcule les totaux et
 * ne transmet que des valeurs simples. Le tri, la recherche et les actions
 * vivent dans `ListeDevis`, qui a besoin du navigateur — mais le pilote
 * Postgres, lui, n'a rien à faire dans le paquet envoyé au client.
 */

/** Réduit un devis à ce que la liste affiche, et pas un champ de plus. */
function versLigne(d: Devis): LigneDevis {
  const t = totaliser(d);
  return {
    id: d.id,
    numero: d.numero,
    jeton: d.jeton,
    creeLe: d.creeLe,
    envoyeLe: d.envoyeLe,
    consulteLe: d.consulteLe,
    consultations: d.consultations,
    relanceLe: d.relanceLe,
    statut: d.statut,
    nom: nomComplet(d.client),
    email: d.client.email,
    personnes: d.dossier.personnes,
    softPower: d.dossier.softPower,
    honoraires: t.honoraires,
    total: t.total,
    signeLe: d.signature ? d.signature.signeLe : null,
    signePar: d.signature ? `${d.signature.prenom} ${d.signature.nom}`.trim() : '',
    archive: d.archive,
  };
}

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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Devis</h1>
        <p className="text-sm text-gray-500 mt-1">
          {devis.length} document{devis.length > 1 ? 's' : ''} · numérotation continue
        </p>
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
            l&apos;onglet{' '}
            <Link href="/admin/leads" className="text-amber-500 hover:underline">
              Demandes
            </Link>
            .
          </p>
        </div>
      ) : (
        <ListeDevis lignes={devis.map(versLigne)} />
      )}
    </>
  );
}
