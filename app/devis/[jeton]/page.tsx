import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DocumentDevis from '../../components/DocumentDevis';
import { lireDevisParJeton } from '../../lib/devis';
import { totaliser } from '../../lib/devis-modele';
import { AGENCE, ACOMPTE_POURCENT, RETRACTATION_JOURS } from '../../lib/agence';
import { devisExpire, dateLimite, finRetractation, empreinteLisible } from '../../lib/signature';
import { ETAPES, piecesAReunir } from '../../lib/parcours';
import BoutonImprimer from './BoutonImprimer';
import BlocSignature from './BlocSignature';
import ListePieces from './ListePieces';

/**
 * L'espace du client.
 *
 * Avant signature, c'est le devis et le moyen de l'accepter. Après, la même
 * adresse devient le tableau de bord du dossier : ce qui a été signé, où en
 * est le traitement, ce qui reste à fournir, ce qui est dû et quand.
 *
 * L'adresse contient un jeton aléatoire de 128 bits : elle n'est pas
 * devinable, et c'est ce qui en tient lieu de protection. Aucun compte n'est
 * demandé au client — lui imposer un mot de passe pour lire son propre dossier
 * serait une friction gratuite, et une friction sur le chemin d'une signature
 * se paie en contrats perdus. En contrepartie, la page n'est jamais indexée.
 */
export const metadata: Metadata = {
  title: 'Votre espace — DTV Thaïlande',
  robots: { index: false, follow: false, nocache: true },
};

// Un devis corrigé, une étape franchie : visibles immédiatement.
export const dynamic = 'force-dynamic';

function euros(m: number): string {
  return `${m.toLocaleString('fr-FR').replace(/ | /g, ' ')} €`;
}

function dateFr(valeur: string | Date): string {
  return new Date(valeur).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function dateHeureFr(valeur: string): string {
  return new Date(valeur).toLocaleString('fr-FR', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Paris',
  });
}

export default async function PageEspaceClient({
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

  const t = totaliser(devis);
  const signature = devis.signature;
  const expire = !signature && devisExpire(devis);
  const groupes = piecesAReunir(devis.dossier);
  const etapeCourante = devis.suivi.etape;

  return (
    <main className="min-h-screen bg-[#0a0a0a] print:bg-white py-10 print:py-0 px-4 print:px-0">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-6 print:hidden">
          <p className="text-sm text-gray-500">
            {signature ? 'Votre dossier' : 'Votre devis'} {devis.numero} · {AGENCE.enseigne}
          </p>
          <BoutonImprimer />
        </div>

        {/* ── BANDEAU D'ÉTAT ── */}
        {signature ? (
          <section className="mb-6 border border-emerald-500/30 bg-emerald-500/[0.06] rounded-2xl p-6 print:hidden">
            <p className="text-emerald-400 font-semibold">
              Devis accepté et signé le {dateHeureFr(signature.signeLe)}
            </p>
            <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">
              Par {signature.prenom} {signature.nom}, après vérification par code envoyé à{' '}
              {signature.email}. Un accusé vous a été adressé par courriel.
            </p>
            <details className="mt-4 group">
              <summary className="text-xs text-gray-500 hover:text-gray-300 cursor-pointer transition-colors">
                Voir l&apos;empreinte du document signé
              </summary>
              <p className="text-[11px] text-gray-500 mt-3 leading-relaxed">
                Empreinte SHA-256 du contrat accepté. Elle change dès qu&apos;un seul caractère du
                document est modifié : c&apos;est ce qui permet de prouver, plus tard, que le texte
                est bien resté celui que vous avez signé.
              </p>
              <p className="font-mono text-[11px] text-gray-400 mt-2 break-all leading-relaxed">
                {empreinteLisible(signature.empreinte)}
              </p>
            </details>
          </section>
        ) : expire ? (
          <section className="mb-6 border border-red-500/30 bg-red-500/[0.06] rounded-2xl p-6 print:hidden">
            <p className="text-red-400 font-semibold">Ce devis a expiré</p>
            <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">
              Il était valable jusqu&apos;au {dateFr(dateLimite(devis))}. Les frais consulaires et
              le cours du baht ayant pu bouger, il ne peut plus être signé en l&apos;état.
              Écrivez-moi à{' '}
              <a href={`mailto:${AGENCE.email}`} className="text-amber-500 hover:underline">
                {AGENCE.email}
              </a>{' '}
              : je vous en réémets un aux conditions du jour, sans frais.
            </p>
          </section>
        ) : (
          <section className="mb-6 border border-white/10 rounded-2xl p-6 print:hidden">
            <p className="text-white font-semibold">À lire, puis à signer en bas de page</p>
            <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">
              Prenez le temps de tout relire. Un point à ajuster ? Répondez au courriel qui vous a
              transmis ce lien — mieux vaut corriger avant qu&apos;après. Valable jusqu&apos;au{' '}
              {dateFr(dateLimite(devis))}.
            </p>
          </section>
        )}

        <DocumentDevis devis={devis} />

        {/* ── SIGNATURE ── */}
        {!signature && !expire && (
          <BlocSignature
            jeton={jeton}
            honoraires={t.honoraires}
            total={t.total}
            acompte={t.acompte}
            nomPreRempli={devis.client.nom}
            adressePreRemplie={devis.client.adresse}
          />
        )}

        {/* ── ESPACE DE SUIVI, UNE FOIS SIGNÉ ── */}
        {signature && (
          <>
            <section className="mt-8 border border-white/10 rounded-2xl p-6 sm:p-8 print:hidden">
              <h2 className="text-lg font-bold text-white">Où en est votre dossier</h2>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Mis à jour au fil du traitement. Vous n&apos;avez rien à faire ici : c&apos;est moi
                qui avance les étapes.
              </p>

              <ol className="mt-6 space-y-0">
                {ETAPES.map((etape, i) => {
                  const franchie = i <= etapeCourante;
                  const courante = i === etapeCourante;
                  return (
                    <li key={etape.cle} className="flex gap-4">
                      <div className="flex flex-col items-center flex-none">
                        <span
                          className={`w-7 h-7 rounded-full border flex items-center justify-center text-[11px] font-bold ${
                            franchie
                              ? 'bg-amber-500 border-amber-500 text-black'
                              : 'border-white/15 text-gray-600'
                          }`}
                        >
                          {franchie ? '✓' : i + 1}
                        </span>
                        {i < ETAPES.length - 1 && (
                          <span
                            className={`w-px flex-1 min-h-[28px] ${i < etapeCourante ? 'bg-amber-500/50' : 'bg-white/10'}`}
                          />
                        )}
                      </div>
                      <div className="pb-6 min-w-0">
                        <p
                          className={`text-sm font-medium ${courante ? 'text-amber-400' : franchie ? 'text-white' : 'text-gray-500'}`}
                        >
                          {etape.titre}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{etape.detail}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>

              {devis.suivi.note && (
                <div className="border border-amber-500/25 bg-amber-500/[0.04] rounded-xl p-4">
                  <p className="text-[10px] uppercase tracking-widest text-amber-500 font-bold mb-1.5">
                    Mot de Matthieu
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                    {devis.suivi.note}
                  </p>
                  {devis.suivi.majLe && (
                    <p className="text-[11px] text-gray-600 mt-2">
                      Le {dateFr(devis.suivi.majLe)}
                    </p>
                  )}
                </div>
              )}
            </section>

            <div className="print:hidden">
              <ListePieces jeton={jeton} groupes={groupes} cochees={devis.suivi.pieces} />
            </div>

            {/* ── ÉCHÉANCES ── */}
            <section className="mt-8 border border-white/10 rounded-2xl p-6 sm:p-8 print:hidden">
              <h2 className="text-lg font-bold text-white">Vos échéances</h2>
              <dl className="mt-5 divide-y divide-white/5">
                <div className="flex justify-between gap-4 py-3">
                  <div>
                    <dt className="text-sm text-white">
                      Acompte — {ACOMPTE_POURCENT} % des honoraires
                    </dt>
                    <dd className="text-xs text-gray-500 mt-0.5">
                      À régler pour lancer le montage du dossier.
                    </dd>
                  </div>
                  <p className="text-sm font-bold text-amber-500 flex-none">{euros(t.acompte)}</p>
                </div>
                <div className="flex justify-between gap-4 py-3">
                  <div>
                    <dt className="text-sm text-white">Solde des honoraires</dt>
                    <dd className="text-xs text-gray-500 mt-0.5">
                      Exigible au dépôt du dossier sur le portail e-Visa.
                    </dd>
                  </div>
                  <p className="text-sm font-bold text-white flex-none">{euros(t.solde)}</p>
                </div>
                <div className="flex justify-between gap-4 py-3">
                  <div>
                    <dt className="text-sm text-white">Fin du délai de rétractation</dt>
                    <dd className="text-xs text-gray-500 mt-0.5">
                      {signature.renonciationRetractation
                        ? 'Vous avez demandé un démarrage immédiat. Le droit subsiste jusqu’à cette date, au prorata du travail déjà fait.'
                        : `${RETRACTATION_JOURS} jours à compter de votre signature.`}
                    </dd>
                  </div>
                  <p className="text-sm text-gray-300 flex-none">
                    {dateFr(finRetractation(signature.signeLe, RETRACTATION_JOURS))}
                  </p>
                </div>
                <div className="flex justify-between gap-4 py-3">
                  <div>
                    <dt className="text-sm text-white">Antériorité de l&apos;épargne</dt>
                    <dd className="text-xs text-gray-500 mt-0.5">
                      {t.fondsThb} doivent être présents sur le compte depuis trois mois pleins au
                      moment du dépôt. C&apos;est la seule condition qui ne se rattrape pas : si
                      vous visez un départ, comptez trois mois d&apos;antériorité plus le délai
                      d&apos;instruction.
                    </dd>
                  </div>
                </div>
              </dl>
            </section>
          </>
        )}

        <p className="text-center text-xs text-gray-600 mt-8 print:hidden">
          Une question ? Répondez simplement au courriel qui vous a transmis ce lien, ou écrivez à{' '}
          <a href={`mailto:${AGENCE.email}`} className="text-amber-500 hover:underline">
            {AGENCE.email}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
