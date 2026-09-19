import React from 'react';
import { totaliser, devisSelonOption, nomComplet, type Devis } from '../lib/devis-modele';
import { FONDS_EUR_PARIS, MARGE_CONSEILLEE } from '../lib/taux';
import {
  AGENCE,
  agenceIncomplete,
  mentionSiret,
  siretEnAttente,
  ACOMPTE_POURCENT,
  VALIDITE_JOURS,
  CLAUSE_REFUS,
  CLAUSE_RETRACTATION,
  CLAUSE_DEBOURS,
  CLAUSE_PAIEMENT,
  MEDIATEUR,
} from '../lib/agence';
import {
  MENTION_TRADUCTIONS,
  FORMULES,
  SUPPLEMENT_FORMULE,
  HONORAIRES,
  PALIER_MAX,
  prestationsFormule,
  CLAUSE_VOYAGE,
  mentionVoyage,
} from '../lib/tarifs';
import { empreinteLisible } from '../lib/signature';

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

function dateHeureFr(iso: string): string {
  return new Date(iso).toLocaleString('fr-FR', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Paris',
  });
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

function nomFormule(id: Devis['dossier']['formule']): string {
  return FORMULES.find((f) => f.id === id)?.nom ?? id;
}

/**
 * Décompose les honoraires entre l'accompagnement et le supplément de formule,
 * et seulement si les deux tombent juste sur le total facturé.
 *
 * Un montant ajusté à la main afficherait sinon une addition fausse sur un
 * document contractuel, ce qui est pire que pas d'addition du tout.
 */
function decomposerHonoraires(
  devis: Devis,
): { base: number; supplement: number } | null {
  const supplement = SUPPLEMENT_FORMULE[devis.dossier.formule];
  if (supplement === 0) return null;
  const base = HONORAIRES[Math.min(Math.max(1, devis.dossier.personnes || 1), PALIER_MAX)];
  return base + supplement === devis.honoraires ? { base, supplement } : null;
}

/**
 * Les formules mises en regard, sur un devis à options.
 *
 * Remplace le détail des honoraires, les frais externes et la synthèse : un
 * document qui présenterait une formule en détail puis un comparatif des
 * trois obligerait le client à se demander laquelle fait foi. Ici, rien ne
 * fait foi tant qu'il n'a pas choisi — et il choisit en signant.
 *
 * Les cartes s'empilent plutôt que de former des colonnes : trois colonnes
 * dans la largeur d'un téléphone sont illisibles, et à l'impression elles se
 * couperaient en deux.
 */
function ComparatifOptions({ devis }: { devis: Devis }) {
  return (
    <section className="py-8">
      <h3 className="text-[10px] uppercase tracking-widest text-gray-500 print:text-gray-600 font-bold mb-2">
        Les formules proposées
      </h3>
      {/* Le compte s'écrit à partir des options réellement proposées : annoncer
          « trois niveaux » au-dessus de deux cartes suffit à faire douter le
          lecteur du reste du document. */}
      <p className="text-xs text-gray-400 print:text-gray-700 mb-5 leading-relaxed">
        {devis.options.length === 2 ? 'Deux' : devis.options.length === 3 ? 'Trois' : devis.options.length}{' '}
        niveaux d&apos;accompagnement pour le même dossier. Prenez le temps de les comparer : vous
        choisirez celle que vous retenez au moment de signer, en bas de cette page. Aucune n&apos;est
        engagée avant.
      </p>

      <div className="space-y-5">
        {devis.options.map((option) => {
          const variante = devisSelonOption(devis, option);
          const to = totaliser(variante);
          const vedette = option.formule === 'premium';
          return (
            <div
              key={option.formule}
              className={`rounded-xl border p-5 print:break-inside-avoid ${
                vedette
                  ? 'border-amber-500/40 bg-amber-500/[0.04] print:border-amber-300 print:bg-amber-50'
                  : 'border-white/10 print:border-gray-300'
              }`}
            >
              <div className="flex justify-between items-baseline gap-4 flex-wrap">
                <p className="text-white print:text-black font-bold text-lg">
                  Formule {nomFormule(option.formule)}
                </p>
                <p className="text-xl font-black text-white print:text-black whitespace-nowrap">
                  {euros(to.total)}
                </p>
              </div>
              <p className="text-xs text-gray-500 print:text-gray-600 mt-1">
                Dont {euros(to.honoraires)} d&apos;honoraires et {euros(to.debours)} de frais
                externes réglés par vos soins · acompte à la signature {euros(to.acompte)}
              </p>

              <ul className="mt-4 space-y-1.5">
                {prestationsFormule(option.formule, devis.dossier.softPower).map((ligne) => (
                  <li
                    key={ligne}
                    className="flex gap-2 text-sm text-gray-300 print:text-gray-800 leading-relaxed"
                  >
                    <span className="text-amber-500 print:text-amber-700 flex-none">✓</span>
                    <span>{ligne}</span>
                  </li>
                ))}
              </ul>

              {/* À l'écran le détail se replie, pour que les formules se
                  comparent d'un coup d'œil. À l'impression il se déplie : un
                  devis papier qui annonce « 631 € de frais externes » sans dire
                  lesquels demande au client de croire sur parole. */}
              <details className="mt-4 print:hidden">
                <summary className="text-xs text-gray-500 hover:text-gray-300 cursor-pointer transition-colors">
                  Détail des frais externes
                </summary>
                <DetailDebours option={option} />
              </details>
              <div className="hidden print:block mt-4">
                <p className="text-[10px] uppercase tracking-widest text-gray-600 font-bold">
                  Détail des frais externes
                </p>
                <DetailDebours option={option} />
              </div>
            </div>
          );
        })}
      </div>

      {/* La formule qui organise l'arrivée annonce « transfert depuis
          l'aéroport organisé » : sans cette clause, rien sur la page ne dit
          que le vol, l'hôtel et le chauffeur restent à la charge du client.
          Elle se trouvait plus bas, dans le bloc des frais externes — que le
          comparatif remplace justement. */}
      {/* Le bloc « 1. Mes honoraires » porte ces conditions hors comparatif ;
          ici il n'existe pas. Sans elles, le devis chiffrait l'acompte sans
          jamais dire quand le solde est dû — une condition de prix absente
          d'un document contractuel. */}
      <p className="text-xs text-gray-400 print:text-gray-700 mt-5 leading-relaxed">
        <strong className="text-white print:text-black">Paiement.</strong> {CLAUSE_PAIEMENT}
      </p>

      {formuleAvecVoyage(devis) && (
        <p className="text-xs text-gray-400 print:text-gray-700 mt-2 leading-relaxed">
          <strong className="text-white print:text-black">Voyage d&apos;installation.</strong>{' '}
          Si vous retenez la formule {nomFormule(formuleAvecVoyage(devis)!)} :{' '}
          {CLAUSE_VOYAGE} {mentionVoyage(formuleAvecVoyage(devis)!)}
        </p>
      )}
    </section>
  );
}

/** Les lignes de frais externes d'une option, écran et impression. */
function DetailDebours({ option }: { option: Devis['options'][number] }) {
  return (
    <table className="w-full text-sm mt-3">
      <tbody className="divide-y divide-white/5 print:divide-gray-200">
        {option.debours.map((ligne, i) => (
          <tr key={`${ligne.libelle}-${i}`}>
            <td className="py-2 pr-4">
              <p className="text-white print:text-black">{ligne.libelle}</p>
              {ligne.detail && (
                <p className="text-xs text-gray-500 print:text-gray-600 mt-0.5">{ligne.detail}</p>
              )}
            </td>
            <td className="py-2 pl-2 text-right text-white print:text-black whitespace-nowrap">
              {euros(Math.round(ligne.quantite * ligne.unitaire))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/**
 * La formule, parmi celles soumises au client, au titre de laquelle le voyage
 * doit être expliqué : la première de la grille qui organise l'arrivée, donc
 * la moins chère des concernées.
 */
function formuleAvecVoyage(devis: Devis): Devis['dossier']['formule'] | undefined {
  return devis.options.map((o) => o.formule).find((f) => f !== 'essentielle');
}

export default function DocumentDevis({ devis }: { devis: Devis }) {
  const t = totaliser(devis);
  const incomplet = agenceIncomplete();
  const detailHonoraires = decomposerHonoraires(devis);
  /** Un devis signé a tranché : il redevient un devis à formule unique. */
  const aOptions = devis.options.length > 0 && !devis.signature;

  /**
   * La formule au titre de laquelle le voyage doit être expliqué, hors
   * comparatif. En mode comparatif, la clause est portée par le comparatif
   * lui-même, qui remplace tout ce bloc.
   */
  const formuleVoyage = aOptions ? undefined : devis.dossier.formule === 'essentielle'
    ? undefined
    : devis.dossier.formule;

  return (
    <article className="bg-[#0d0d0d] print:bg-white text-gray-300 print:text-black rounded-2xl print:rounded-none border border-white/10 print:border-0 overflow-hidden">
      {incomplet && (
        <p className="bg-red-500/15 border-b border-red-500/30 text-red-300 print:hidden text-xs px-6 py-3">
          Document non conforme : il manque l&apos;adresse du siège. À compléter dans
          app/lib/agence.ts avant tout envoi.
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
              {mentionSiret() || (
                <span className="text-red-400 print:text-red-700">SIRET à renseigner</span>
              )}
              <br />
              {AGENCE.email}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 print:text-gray-600 font-bold mb-2">
              Client
            </p>
            <p className="text-white print:text-black font-semibold">
              {nomComplet(devis.client) || '—'}
            </p>
            <p className="text-gray-400 print:text-gray-700 leading-relaxed whitespace-pre-line">
              {devis.client.adresse}
              {devis.client.adresse && '\n'}
              {devis.client.email}
              {devis.client.telephone && `\n${devis.client.telephone}`}
            </p>
          </div>
        </section>

        {/* ── MOT AU CLIENT ──
            Le même texte part en tête du courriel. Le répéter ici n'est pas une
            redondance : le devis est la pièce qu'on imprime, qu'on transfère à
            son conjoint ou qu'on relit trois semaines plus tard, et le courriel
            qui le portait est alors perdu de vue. Ce qui a été dit au client
            doit voyager avec le document qui l'engage. */}
        {(devis.message ?? '').trim() && (
          <section className="py-8 border-b border-white/10 print:border-gray-300">
            <div className="text-sm text-gray-300 print:text-gray-800 leading-relaxed space-y-4 max-w-2xl">
              {(devis.message ?? '')
                .trim()
                .split(/\n{2,}/)
                .map((paragraphe, i) => (
                  <p key={i} className="whitespace-pre-line">
                    {paragraphe}
                  </p>
                ))}
            </div>
          </section>
        )}

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
              <dd className="text-white print:text-black mt-1">
                {aOptions ? 'Au choix, voir ci-dessous' : nomFormule(devis.dossier.formule)}
              </dd>
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
              Épargne à justifier pour votre foyer : {euros(t.fondsEuros)}
            </p>
            <p className="text-xs text-gray-400 print:text-gray-700 leading-relaxed">
              L&apos;ambassade de Thaïlande à Paris exige un relevé bancaire officiel faisant
              apparaître un solde créditeur non bloqué d&apos;au moins{' '}
              <strong className="text-white print:text-black">
                {euros(FONDS_EUR_PARIS)} par personne
              </strong>
              , et ce <strong className="text-white print:text-black">chacun des trois derniers
              mois</strong>. Le montant est affiché en euros par le poste, et non converti depuis
              les {t.fondsThb} de la règle nationale : c&apos;est la somme en euros qui vous sera
              opposée au guichet. Le seuil s&apos;apprécie par demandeur, conjoint et enfants
              rattachés compris. Les fonds peuvent être réunis sur le compte du demandeur principal
              et ne sont jamais bloqués. Prévoyez {MARGE_CONSEILLEE} par personne plutôt que le
              strict minimum : un solde à l&apos;euro près ne laisse aucune marge.
            </p>
          </div>
        </section>

        {aOptions ? (
          <ComparatifOptions devis={devis} />
        ) : (
        <>
        {/* ── HONORAIRES ── */}
        <section className="py-8">
          <h3 className="text-[10px] uppercase tracking-widest text-gray-500 print:text-gray-600 font-bold mb-4">
            1. Mes honoraires d&apos;accompagnement
          </h3>
          {/* Le détail de la formule est la contrepartie du prix. Le document
              décrivait auparavant l'Essentielle quelle que soit la formule
              retenue : un client Premium ou VIP payait un supplément sans
              jamais lire ce qu'il achetait. */}
          <div className="flex justify-between items-baseline gap-4 border-b border-white/10 print:border-gray-300 pb-3">
            <div>
              <p className="text-white print:text-black font-medium">
                Formule {nomFormule(devis.dossier.formule)}
                {devis.dossier.personnes > 1 && ` — ${devis.dossier.personnes} dossiers`}
              </p>
              <p className="text-xs text-gray-500 print:text-gray-600 mt-1">
                {devis.dossier.softPower ? 'Voie Soft Power' : 'Voie activité à distance'} · dépôt à
                l&apos;ambassade de Thaïlande à Paris
              </p>
            </div>
            <p className="text-xl font-bold text-white print:text-black flex-none">
              {euros(t.honoraires)}
            </p>
          </div>

          <ul className="mt-4 space-y-1.5">
            {prestationsFormule(devis.dossier.formule, devis.dossier.softPower).map((ligne) => (
              <li
                key={ligne}
                className="flex gap-2 text-sm text-gray-300 print:text-gray-800 leading-relaxed"
              >
                <span className="text-amber-500 print:text-amber-700 flex-none">✓</span>
                <span>{ligne}</span>
              </li>
            ))}
          </ul>

          {/* Le décomposé n'apparaît que s'il tombe juste. Un devis dont les
              honoraires ont été ajustés à la main afficherait sinon une
              addition fausse, ce qui est pire que pas d'addition du tout. */}
          {detailHonoraires && (
            <p className="text-xs text-gray-500 print:text-gray-600 mt-3">
              Soit {euros(detailHonoraires.base)} d&apos;accompagnement pour{' '}
              {devis.dossier.personnes} personne{devis.dossier.personnes > 1 ? 's' : ''}, et{' '}
              {euros(detailHonoraires.supplement)} au titre de la formule{' '}
              {nomFormule(devis.dossier.formule)}.
            </p>
          )}
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
          {/* La clause voyage n'a de sens que sur les formules qui organisent
              l'arrivée. Elle dit ce que le prestataire ne fait pas, et c'est
              le plus important : ni réservation en son nom, ni encaissement,
              ni commission.

              Elle se lisait sur `dossier.formule`, qui reste « essentielle »
              tant qu'aucune option n'est retenue : un devis proposant la
              Premium annonçait donc « transfert depuis l'aéroport organisé »
              sans dire nulle part qui paie le vol. On regarde les formules
              réellement soumises au client, pas celle du dossier. */}
          {formuleVoyage && (
            <p className="text-xs text-gray-400 print:text-gray-700 mt-2 leading-relaxed">
              <strong className="text-white print:text-black">Voyage d&apos;installation.</strong>{' '}
              {CLAUSE_VOYAGE} {mentionVoyage(formuleVoyage)}
            </p>
          )}
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
        </>
        )}

        {/* ── CONDITIONS ── */}
        <section className="pt-8 text-xs text-gray-400 print:text-gray-700 leading-relaxed space-y-3">
          <p>
            <strong className="text-white print:text-black">En cas de refus.</strong> {CLAUSE_REFUS}
          </p>
          <p>
            <strong className="text-white print:text-black">Droit de rétractation.</strong>{' '}
            {CLAUSE_RETRACTATION}
          </p>
          <p>
            <strong className="text-white print:text-black">Ce que ce devis n&apos;est pas.</strong>{' '}
            Un accompagnement administratif n&apos;est pas une garantie de délivrance : la décision
            appartient au seul poste consulaire. Le présent document ne constitue pas un contrat de
            voyage.
          </p>
          {/* Article R616-1 du code de la consommation : les coordonnées du
              médiateur figurent sur les documents contractuels, pas seulement
              sur les mentions légales. Tant que l'adhésion n'est pas prise, le
              paragraphe reste absent — mieux vaut un devis muet qu'un devis qui
              renvoie vers un médiateur qui ne traiterait pas le litige. */}
          {MEDIATEUR && (
            <p>
              <strong className="text-white print:text-black">
                Médiation de la consommation.
              </strong>{' '}
              En cas de litige non résolu directement avec moi, vous pouvez saisir gratuitement
              le médiateur {MEDIATEUR.nom}, {MEDIATEUR.adresse} — {MEDIATEUR.site}.
            </p>
          )}
          {siretEnAttente() && (
            <p>
              <strong className="text-white print:text-black">Immatriculation en cours.</strong>{' '}
              La formalité de création a été déposée et le numéro SIRET est en cours
              d&apos;attribution par l&apos;INSEE. Il vous sera communiqué dès réception et figurera
              sur la facture.
            </p>
          )}
          <p>{AGENCE.mentionTva}</p>
        </section>

        {/* ── SIGNATURE ── */}
        {/* Le cadre de signature et la mention légale qui l'explique forment un
            tout : `break-inside-avoid` les fait basculer ensemble sur la page
            suivante plutôt que de laisser la mention orpheline, ou pire, de
            couper la signature elle-même en deux. */}
        <div className="print:break-inside-avoid">
        <section className="mt-10 pt-8 border-t border-white/10 print:border-gray-300 flex flex-col sm:flex-row justify-between gap-8">
          <div className="text-sm">
            <p className="text-white print:text-black font-semibold">{AGENCE.nom}</p>
            <p className="text-gray-500 print:text-gray-600 text-xs mt-1">
              {AGENCE.enseigne} · {AGENCE.site}
            </p>
          </div>

          {/* Signé, le cadre porte le nom et l'horodatage ; en attente, il
              laisse la place d'une signature manuscrite — certains clients
              préfèrent encore imprimer, et rien n'interdit les deux voies. */}
          {devis.signature ? (
            <div className="sm:text-right text-sm sm:max-w-sm">
              <p className="text-[10px] uppercase tracking-widest text-emerald-500 print:text-emerald-700 font-bold mb-2">
                Bon pour accord — signé électroniquement
              </p>
              <p className="text-white print:text-black font-semibold">
                {devis.signature.prenom} {devis.signature.nom}
              </p>
              <p className="text-gray-400 print:text-gray-700 text-xs mt-1 whitespace-pre-line leading-relaxed">
                {devis.signature.adresse}
              </p>
              <p className="text-gray-500 print:text-gray-600 text-xs mt-2">
                Le {dateHeureFr(devis.signature.signeLe)}
              </p>
              {/* Pas de `break-all` : les groupes de huit sont séparés par des
                  espaces, le retour à la ligne s'y fait proprement. Une coupure
                  au caractère laisserait une lettre orpheline en fin de bloc. */}
              <p className="text-gray-600 print:text-gray-600 text-[9px] mt-2 font-mono leading-relaxed">
                {empreinteLisible(devis.signature.empreinte)}
              </p>
            </div>
          ) : (
            <div className="sm:text-right">
              <div className="border-b border-gray-600 print:border-gray-400 w-56 mb-2 h-12" />
              <p className="text-[10px] uppercase tracking-widest text-gray-500 print:text-gray-600 font-bold">
                Bon pour accord — date et signature
              </p>
            </div>
          )}
        </section>

        {devis.signature && (
          <p className="mt-6 pt-4 border-t border-white/5 print:border-gray-200 text-[10px] text-gray-500 print:text-gray-600 leading-relaxed print:break-inside-avoid">
            Document accepté par signature électronique au sens de l&apos;article 1367 du code
            civil. L&apos;identité du signataire a été vérifiée par un code à usage unique envoyé
            à {devis.signature.email}, depuis l&apos;adresse {devis.signature.ip}. L&apos;empreinte
            SHA-256 ci-dessus scelle le contenu : toute modification ultérieure du document la
            rendrait différente.
            {devis.signature.renonciationRetractation &&
              ' Le client a expressément demandé le commencement de l’exécution avant l’expiration du délai de rétractation.'}
          </p>
        )}
        </div>
      </div>
    </article>
  );
}
