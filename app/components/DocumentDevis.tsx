import React from 'react';
import { totaliser, type Devis } from '../lib/devis-modele';
import {
  AGENCE,
  agenceIncomplete,
  ACOMPTE_POURCENT,
  VALIDITE_JOURS,
  CLAUSE_REFUS,
  CLAUSE_DEBOURS,
  CLAUSE_PAIEMENT,
} from '../lib/agence';
import { MENTION_TRADUCTIONS } from '../lib/tarifs';

/**
 * Le devis tel que le client le voit — à l'écran comme à l'impression.
 *
 * Un seul composant sert l'aperçu de l'admin et la page remise au client :
 * ce que Matthieu relit est exactement ce qui part, sans divergence possible
 * entre une prévisualisation et un rendu final.
 *
 * Les couleurs sont posées en classes `print:` pour basculer sur fond blanc à
 * l'impression. Le thème sombre du site est juste à l'écran ; imprimé, il vide
 * une cartouche et se lit mal.
 */

function euros(montant: number): string {
  return `${montant.toLocaleString('fr-FR').replace(/ | /g, ' ')} €`;
}

function eurosPrecis(montant: number): string {
  return `${montant.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/ | /g, ' ')} €`;
}

function dateFr(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function dateEcheance(iso: string): string {
  const d = new Date(iso);
  d.setDate(d.getDate() + VALIDITE_JOURS);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function libelleFoyer(d: Devis['dossier']): string {
  if (d.personnes <= 1) return '1 personne';
  const morceaux = [`${d.adultes} adulte${d.adultes > 1 ? 's' : ''}`];
  if (d.enfants > 0) morceaux.push(`${d.enfants} enfant${d.enfants > 1 ? 's' : ''}`);
  return `${d.personnes} personnes · ${morceaux.join(' + ')}`;
}

export default function DocumentDevis({ devis }: { devis: Devis }) {
  const t = totaliser(devis);
  const incomplet = agenceIncomplete();

  return (
    <article className="bg-[#0d0d0d] print:bg-white text-gray-300 print:text-black rounded-2xl print:rounded-none border border-white/10 print:border-0 overflow-hidden">
      {incomplet && (
        <p className="bg-red-500/15 border-b border-red-500/30 text-red-300 print:bg-white print:text-red-700 text-xs px-6 py-3">
          Document non conforme : il manque le numéro SIRET et l&apos;adresse de
          l&apos;entreprise. À compléter dans app/lib/agence.ts avant tout envoi.
        </p>
      )}

      <div className="p-6 sm:p-10">
        {/* ── EN-TÊTE ── */}
        <header className="flex flex-col sm:flex-row justify-between gap-6 pb-8 border-b border-white/10 print:border-gray-300">
          <div>
            <p className="text-2xl font-extrabold text-white print:text-black tracking-tight">
              DTV <span className="text-amber-500 print:text-amber-700">Thaïlande</span>
            </p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 print:text-gray-600 mt-1">
              {AGENCE.activite}
            </p>
          </div>
          <div className="sm:text-right text-sm">
            <span className="inline-block bg-amber-500/15 print:bg-amber-100 border border-amber-500/30 text-amber-400 print:text-amber-800 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3">
              Devis personnalisé
            </span>
            <p className="text-white print:text-black font-semibold">{devis.numero}</p>
            <p className="text-gray-500 print:text-gray-600 text-xs mt-1">
              Établi le {dateFr(devis.creeLe)}
              <br />
              Valable jusqu&apos;au {dateEcheance(devis.creeLe)}
            </p>
          </div>
        </header>

        {/* ── PARTIES ── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-8 text-sm border-b border-white/10 print:border-gray-300">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 print:text-gray-600 font-bold mb-2">
              Prestataire
            </p>
            <p className="text-white print:text-black font-semibold">{AGENCE.nom}</p>
            <p className="text-gray-400 print:text-gray-700 leading-relaxed">
              {AGENCE.enseigne}
              <br />
              {AGENCE.adresse && (
                <>
                  {AGENCE.adresse}
                  <br />
                </>
              )}
              {AGENCE.codePostal} {AGENCE.ville}, {AGENCE.pays}
              <br />
              {AGENCE.siret ? `SIRET ${AGENCE.siret}` : <span className="text-red-400">SIRET à renseigner</span>}
              <br />
              {AGENCE.email}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 print:text-gray-600 font-bold mb-2">
              Client
            </p>
            <p className="text-white print:text-black font-semibold">
              {devis.client.nom || '—'}
            </p>
            <p className="text-gray-400 print:text-gray-700 leading-relaxed whitespace-pre-line">
              {devis.client.adresse}
              {devis.client.adresse && '\n'}
              {devis.client.email}
              {devis.client.telephone && `\n${devis.client.telephone}`}
            </p>
          </div>
        </section>

        {/* ── PROFIL DU DOSSIER ── */}
        <section className="py-8 border-b border-white/10 print:border-gray-300">
          <h2 className="text-lg font-bold text-white print:text-black mb-4">
            Accompagnement Visa DTV — {libelleFoyer(devis.dossier)}
          </h2>
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-gray-500 print:text-gray-600 font-bold">Voie</dt>
              <dd className="text-white print:text-black mt-1">
                {devis.dossier.softPower ? 'Soft Power (école certifiée)' : 'Activité à distance'}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-gray-500 print:text-gray-600 font-bold">Formule</dt>
              <dd className="text-white print:text-black mt-1 capitalize">{devis.dossier.formule}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-gray-500 print:text-gray-600 font-bold">Dépôt</dt>
              <dd className="text-white print:text-black mt-1">Ambassade de Paris</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-gray-500 print:text-gray-600 font-bold">
                Destination
              </dt>
              <dd className="text-white print:text-black mt-1">{devis.dossier.destination || '—'}</dd>
            </div>
          </dl>

          {/* Le seuil bancaire vient avant les prix : c'est le seul critère qui
              peut rendre le dossier infaisable, et mieux vaut le découvrir ici. */}
          <div className="mt-6 border border-amber-500/30 bg-amber-500/5 print:bg-amber-50 print:border-amber-300 rounded-xl p-5">
            <p className="text-amber-400 print:text-amber-800 font-semibold text-sm mb-1">
              Épargne à justifier pour votre foyer : {t.fondsThb}
            </p>
            <p className="text-xs text-gray-400 print:text-gray-700 leading-relaxed">
              Soit environ {euros(t.fondsEuros)} au cours actuel. Le seuil de 500 000 THB
              s&apos;apprécie <strong className="text-white print:text-black">par personne</strong>,
              conjoint et enfants rattachés compris. Les fonds peuvent être réunis sur le compte du
              demandeur principal, ne sont jamais bloqués, et doivent être présents depuis au moins
              trois mois au moment du dépôt.
            </p>
          </div>
        </section>

        {/* ── HONORAIRES ── */}
        <section className="py-8">
          <h3 className="text-[10px] uppercase tracking-widest text-gray-500 print:text-gray-600 font-bold mb-4">
            1. Mes honoraires d&apos;accompagnement
          </h3>
          <div className="flex justify-between items-baseline gap-4 border-b border-white/10 print:border-gray-300 pb-3">
            <div>
              <p className="text-white print:text-black font-medium">
                Accompagnement complet du dossier
              </p>
              <p className="text-xs text-gray-500 print:text-gray-600 mt-1">
                Montage des {devis.dossier.personnes} dossier
                {devis.dossier.personnes > 1 ? 's' : ''}, vérification des justificatifs financiers,
                {devis.dossier.softPower ? ' choix et mise en relation avec l’école certifiée,' : ''}{' '}
                dépôt sur le portail e-Visa, relectures et suivi jusqu&apos;à la délivrance.
              </p>
            </div>
            <p className="text-xl font-bold text-white print:text-black flex-none">
              {euros(t.honoraires)}
            </p>
          </div>
          <p className="text-xs text-gray-400 print:text-gray-700 mt-3 leading-relaxed">
            <strong className="text-white print:text-black">Ferme et définitif.</strong> Ce montant
            ne varie pas, quel que soit le nombre d&apos;allers-retours avec l&apos;ambassade.{' '}
            {CLAUSE_PAIEMENT}
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-4 text-sm">
            <p className="text-gray-400 print:text-gray-700">
              À la signature ({ACOMPTE_POURCENT} %) :{' '}
              <strong className="text-white print:text-black">{euros(t.acompte)}</strong>
            </p>
            <p className="text-gray-400 print:text-gray-700">
              Au dépôt du dossier :{' '}
              <strong className="text-white print:text-black">{euros(t.solde)}</strong>
            </p>
          </div>
        </section>

        {/* ── FRAIS EXTERNES ── */}
        <section className="py-8 border-t border-white/10 print:border-gray-300">
          <h3 className="text-[10px] uppercase tracking-widest text-gray-500 print:text-gray-600 font-bold mb-4">
            2. Frais externes — réglés directement par vos soins
          </h3>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-white/5 print:divide-gray-200">
              {devis.debours.map((ligne, i) => (
                <tr key={`${ligne.libelle}-${i}`}>
                  <td className="py-3 pr-4">
                    <p className="text-white print:text-black">{ligne.libelle}</p>
                    {ligne.detail && <p className="text-xs text-gray-500 print:text-gray-600 mt-0.5">{ligne.detail}</p>}
                  </td>
                  <td className="py-3 px-2 text-right text-gray-500 print:text-gray-600 whitespace-nowrap text-xs">
                    {ligne.quantite} × {eurosPrecis(ligne.unitaire)}
                  </td>
                  <td className="py-3 pl-2 text-right text-white print:text-black whitespace-nowrap">
                    {euros(Math.round(ligne.quantite * ligne.unitaire))}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="py-3 font-semibold text-white print:text-black" colSpan={2}>
                  Sous-total des frais externes
                </td>
                <td className="py-3 pl-2 text-right font-bold text-white print:text-black whitespace-nowrap">
                  {euros(t.debours)}
                </td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-gray-400 print:text-gray-700 mt-3 leading-relaxed">
            {CLAUSE_DEBOURS} {MENTION_TRADUCTIONS}
          </p>
        </section>

        {/* ── SYNTHÈSE ── */}
        <section className="border border-white/10 print:border-gray-300 rounded-xl overflow-hidden">
          <div className="flex justify-between items-center px-5 py-4 bg-white/[0.03] print:bg-gray-50">
            <div>
              <p className="text-white print:text-black font-semibold">Budget total de l&apos;opération</p>
              <p className="text-xs text-gray-500 print:text-gray-600 mt-0.5">
                Soit {euros(t.parPersonne)} par personne
              </p>
            </div>
            <p className="text-2xl font-black text-white print:text-black">{euros(t.total)}</p>
          </div>
          <div className="flex justify-between items-center px-5 py-4 border-t border-white/10 print:border-gray-300 bg-amber-500/10 print:bg-amber-50">
            <div>
              <p className="text-amber-400 print:text-amber-800 font-semibold">
                Montant à me régler
              </p>
              <p className="text-xs text-gray-400 print:text-gray-700 mt-0.5">
                Le reste va à l&apos;ambassade, à l&apos;école et au traducteur
              </p>
            </div>
            <p className="text-2xl font-black text-amber-500 print:text-amber-800">
              {euros(t.honoraires)}
            </p>
          </div>
        </section>

        {/* ── CONDITIONS ── */}
        <section className="pt-8 text-xs text-gray-400 print:text-gray-700 leading-relaxed space-y-3">
          <p>
            <strong className="text-white print:text-black">En cas de refus.</strong> {CLAUSE_REFUS}
          </p>
          <p>
            <strong className="text-white print:text-black">Ce que ce devis n&apos;est pas.</strong>{' '}
            Un accompagnement administratif n&apos;est pas une garantie de délivrance : la décision
            appartient au seul poste consulaire. Le présent document ne constitue pas un contrat de
            voyage.
          </p>
          <p>{AGENCE.mentionTva}</p>
        </section>

        {/* ── SIGNATURE ── */}
        <section className="mt-10 pt-8 border-t border-white/10 print:border-gray-300 flex flex-col sm:flex-row justify-between gap-8">
          <div className="text-sm">
            <p className="text-white print:text-black font-semibold">{AGENCE.nom}</p>
            <p className="text-gray-500 print:text-gray-600 text-xs mt-1">
              {AGENCE.enseigne} · {AGENCE.site}
            </p>
          </div>
          <div className="sm:text-right">
            <div className="border-b border-gray-600 print:border-gray-400 w-56 mb-2 h-12" />
            <p className="text-[10px] uppercase tracking-widest text-gray-500 print:text-gray-600 font-bold">
              Bon pour accord — date et signature
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
