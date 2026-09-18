'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import DocumentDevis from '../../../components/DocumentDevis';
import {
  totaliser,
  deboursParDefaut,
  honorairesParDefaut,
  type Devis,
  type Debours,
} from '../../../lib/devis-modele';
import { empreinteLisible } from '../../../lib/signature';
import { ETAPES } from '../../../lib/parcours';

/**
 * Édition d'un devis, avec aperçu en direct.
 *
 * L'aperçu utilise le composant qui sert aussi la page client : ce qui est
 * relu ici est exactement ce qui partira, sans écart possible entre une
 * prévisualisation et le document réel.
 */

function euros(m: number): string {
  return `${m.toLocaleString('fr-FR').replace(/ | /g, ' ')} €`;
}

const CHAMP =
  'w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-amber-500/60 transition-colors';
const ETIQUETTE = 'block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1.5';

export default function EditeurDevis({ initial }: { initial: Devis }) {
  const router = useRouter();
  const [devis, setDevis] = useState<Devis>(initial);
  const [etat, setEtat] = useState<'repos' | 'envoi' | 'enregistre' | 'erreur'>('repos');
  const [message, setMessage] = useState('');

  const totaux = useMemo(() => totaliser(devis), [devis]);
  const modifiable = devis.statut === 'brouillon';

  /**
   * Un devis signé se verrouille.
   *
   * L'empreinte conservée au moment de la signature porte sur le texte d'alors.
   * Modifier un montant après coup ne produirait pas une correction mais une
   * preuve fausse : le document affiché ne serait plus celui que le client a
   * accepté. Un changement se fait par un nouveau devis, pas par-dessus.
   */
  const signe = Boolean(devis.signature);

  const [etapeSuivi, setEtapeSuivi] = useState(devis.suivi.etape);
  const [noteSuivi, setNoteSuivi] = useState(devis.suivi.note);
  const [etatSuivi, setEtatSuivi] = useState<'repos' | 'envoi' | 'ok' | 'erreur'>('repos');
  const [confirmeSuppression, setConfirmeSuppression] = useState(false);
  const [messageClient, setMessageClient] = useState('');

  const changer = (partiel: Partial<Devis>) => {
    setDevis((d) => ({ ...d, ...partiel }));
    setEtat('repos');
  };

  const changerDossier = (partiel: Partial<Devis['dossier']>) => {
    setDevis((d) => {
      const dossier = { ...d.dossier, ...partiel };
      dossier.personnes = Math.max(1, (dossier.adultes || 1) + (dossier.enfants || 0));
      return { ...d, dossier };
    });
    setEtat('repos');
  };

  /** Remet honoraires et débours aux valeurs de la grille, pour la composition en cours. */
  const recalculer = () => {
    setDevis((d) => ({
      ...d,
      honoraires: honorairesParDefaut(d.dossier.personnes),
      debours: deboursParDefaut(d.dossier.personnes, d.dossier.softPower),
    }));
    setEtat('repos');
  };

  const changerLigne = (index: number, partiel: Partial<Debours>) => {
    setDevis((d) => ({
      ...d,
      debours: d.debours.map((l, i) => (i === index ? { ...l, ...partiel } : l)),
    }));
    setEtat('repos');
  };

  const enregistrer = async () => {
    setEtat('envoi');
    setMessage('');
    try {
      const reponse = await fetch(`/api/admin/devis/${devis.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client: devis.client,
          dossier: devis.dossier,
          honoraires: devis.honoraires,
          debours: devis.debours,
        }),
      });
      const corps = (await reponse.json()) as { devis?: Devis; erreur?: string };
      if (reponse.ok && corps.devis) {
        setDevis(corps.devis);
        setEtat('enregistre');
        router.refresh();
        return;
      }
      setEtat('erreur');
      setMessage(corps.erreur || 'Enregistrement impossible.');
    } catch {
      setEtat('erreur');
      setMessage('Le serveur n’a pas répondu.');
    }
  };

  const envoyer = async () => {
    if (!devis.client.email) {
      setEtat('erreur');
      setMessage('Renseignez l’adresse e-mail du client avant d’envoyer.');
      return;
    }
    setEtat('envoi');
    setMessage('');
    try {
      await enregistrer();
      const reponse = await fetch(`/api/admin/devis/${devis.id}/envoyer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageClient }),
      });
      const corps = (await reponse.json()) as { erreur?: string; lien?: string };
      if (reponse.ok) {
        setDevis((d) => ({ ...d, statut: 'envoye', envoyeLe: new Date().toISOString() }));
        setEtat('enregistre');
        setMessage(`Devis envoyé à ${devis.client.email}.`);
        router.refresh();
        return;
      }
      setEtat('erreur');
      setMessage(corps.erreur || 'Envoi impossible.');
    } catch {
      setEtat('erreur');
      setMessage('Le serveur n’a pas répondu.');
    }
  };

  const enregistrerSuivi = async (champs: { etape?: number; note?: string }) => {
    setEtatSuivi('envoi');
    try {
      const reponse = await fetch(`/api/admin/devis/${devis.id}/suivi`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(champs),
      });
      const corps = (await reponse.json()) as { devis?: Devis };
      if (reponse.ok && corps.devis) {
        setDevis(corps.devis);
        setEtatSuivi('ok');
        router.refresh();
        return;
      }
      setEtatSuivi('erreur');
    } catch {
      setEtatSuivi('erreur');
    }
  };

  /**
   * Suppression d'un brouillon.
   *
   * Réservée aux brouillons, et la route le revérifie : un devis transmis à un
   * client appartient à la suite comptable, qui doit rester continue. Un
   * brouillon jamais sorti d'ici n'a en revanche aucune existence légale — le
   * garder ne sert qu'à encombrer la liste.
   *
   * Confirmation en deux clics plutôt qu'une fenêtre système : moins brutal,
   * et ça marche aussi sur un téléphone.
   */
  const supprimer = async () => {
    if (!confirmeSuppression) {
      setConfirmeSuppression(true);
      return;
    }
    setEtat('envoi');
    try {
      const reponse = await fetch(`/api/admin/devis/${devis.id}`, { method: 'DELETE' });
      if (reponse.ok) {
        router.push('/admin/devis');
        router.refresh();
        return;
      }
      setEtat('erreur');
      setMessage('Suppression impossible.');
    } catch {
      setEtat('erreur');
      setMessage('Le serveur n’a pas répondu.');
    }
  };

  const changerStatut = async (statut: Devis['statut']) => {
    await fetch(`/api/admin/devis/${devis.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ statut }),
    });
    setDevis((d) => ({ ...d, statut }));
    router.refresh();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">
      {/* ── COLONNE D'ÉDITION ── */}
      <div className="space-y-6 print:hidden lg:sticky lg:top-20">
        <div>
          <h1 className="text-xl font-bold text-white">{devis.numero}</h1>
          <p className="text-xs text-gray-500 mt-1">
            {signe
              ? `Signé le ${new Date(devis.signature!.signeLe).toLocaleDateString('fr-FR')} — verrouillé`
              : devis.statut === 'brouillon'
                ? 'Brouillon — modifiable'
                : `Envoyé le ${devis.envoyeLe ? new Date(devis.envoyeLe).toLocaleDateString('fr-FR') : '—'}`}
          </p>
        </div>

        {signe && devis.signature && (
          <section className="border border-emerald-500/30 bg-emerald-500/[0.05] rounded-xl p-4 space-y-2">
            <h2 className="text-sm font-bold text-emerald-400">Signé électroniquement</h2>
            <dl className="text-xs text-gray-400 space-y-1 leading-relaxed">
              <div>
                <dt className="inline text-gray-600">Signataire </dt>
                <dd className="inline text-white">
                  {devis.signature.prenom} {devis.signature.nom}
                </dd>
              </div>
              <div>
                <dt className="text-gray-600">Adresse déclarée</dt>
                <dd className="text-gray-300 whitespace-pre-line">{devis.signature.adresse}</dd>
              </div>
              <div>
                <dt className="inline text-gray-600">Code envoyé à </dt>
                <dd className="inline text-gray-300">{devis.signature.email}</dd>
              </div>
              <div>
                <dt className="inline text-gray-600">Date et heure </dt>
                <dd className="inline text-gray-300">
                  {new Date(devis.signature.signeLe).toLocaleString('fr-FR', {
                    dateStyle: 'long',
                    timeStyle: 'short',
                    timeZone: 'Europe/Paris',
                  })}
                </dd>
              </div>
              <div>
                <dt className="inline text-gray-600">Adresse IP </dt>
                <dd className="inline text-gray-300">{devis.signature.ip}</dd>
              </div>
              <div>
                <dt className="inline text-gray-600">Rétractation </dt>
                <dd className="inline text-gray-300">
                  {devis.signature.renonciationRetractation
                    ? 'renonciation demandée — exécution immédiate'
                    : 'délai de 14 jours en cours'}
                </dd>
              </div>
              <div>
                <dt className="text-gray-600">Empreinte SHA-256 du contrat</dt>
                <dd className="font-mono text-[10px] text-gray-500 break-all leading-relaxed">
                  {empreinteLisible(devis.signature.empreinte)}
                </dd>
              </div>
            </dl>
            <p className="text-[11px] text-gray-500 leading-relaxed pt-1">
              Le document est figé : le modifier invaliderait l&apos;empreinte, et avec elle la
              preuve. Une évolution des conditions passe par un nouveau devis.
            </p>
            <details>
              <summary className="text-[11px] text-gray-500 hover:text-gray-300 cursor-pointer">
                Voir le texte exact qui a été signé
              </summary>
              <pre className="mt-2 max-h-72 overflow-auto bg-black/40 border border-white/5 rounded-lg p-3 text-[10px] text-gray-400 whitespace-pre-wrap leading-relaxed">
                {devis.signature.contrat}
              </pre>
            </details>
          </section>
        )}

        {signe && (
          <section className="border border-white/10 rounded-xl p-4 space-y-3">
            <h2 className="text-sm font-bold text-white">Avancement du dossier</h2>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Visible par le client sur sa page. C&apos;est ce qui remplace les courriels
              « où en êtes-vous ? ».
            </p>
            <div>
              <label className={ETIQUETTE} htmlFor="etape">
                Étape franchie
              </label>
              <select
                id="etape"
                className={CHAMP}
                value={etapeSuivi}
                onChange={(e) => {
                  const etape = Number(e.target.value);
                  setEtapeSuivi(etape);
                  void enregistrerSuivi({ etape });
                }}
              >
                <option value={-1}>Aucune</option>
                {ETAPES.map((etape, i) => (
                  <option key={etape.cle} value={i}>
                    {i + 1}. {etape.titre}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={ETIQUETTE} htmlFor="note">
                Mot au client (facultatif)
              </label>
              <textarea
                id="note"
                rows={3}
                className={CHAMP}
                value={noteSuivi}
                onChange={(e) => setNoteSuivi(e.target.value)}
                onBlur={() => {
                  if (noteSuivi !== devis.suivi.note) void enregistrerSuivi({ note: noteSuivi });
                }}
              />
            </div>
            <p className="text-[11px] text-gray-600">
              {etatSuivi === 'envoi'
                ? 'Enregistrement…'
                : etatSuivi === 'ok'
                  ? 'Enregistré — le client le voit.'
                  : etatSuivi === 'erreur'
                    ? 'Enregistrement impossible.'
                    : 'Enregistré automatiquement.'}
            </p>
            {Object.keys(devis.suivi.pieces).length > 0 && (
              <p className="text-[11px] text-gray-500 leading-relaxed border-t border-white/5 pt-3">
                Pièces cochées par le client :{' '}
                <strong className="text-gray-300">
                  {Object.values(devis.suivi.pieces).filter(Boolean).length}
                </strong>
              </p>
            )}
          </section>
        )}

        {/* Les champs contractuels sont désactivés en bloc par le `fieldset` :
            une propriété à un seul endroit vaut mieux qu'un `disabled` recopié
            sur quinze champs, dont un finirait par être oublié. */}
        <fieldset disabled={signe} className="space-y-6 disabled:opacity-50">
        {/* Client */}
        <section className="border border-white/10 rounded-xl p-4 space-y-3">
          <h2 className="text-sm font-bold text-white">Client</h2>
          <div>
            <label className={ETIQUETTE} htmlFor="nom">Nom complet</label>
            <input id="nom" className={CHAMP} value={devis.client.nom}
              onChange={(e) => changer({ client: { ...devis.client, nom: e.target.value } })} />
          </div>
          <div>
            <label className={ETIQUETTE} htmlFor="email">E-mail</label>
            <input id="email" type="email" className={CHAMP} value={devis.client.email}
              onChange={(e) => changer({ client: { ...devis.client, email: e.target.value } })} />
          </div>
          <div>
            <label className={ETIQUETTE} htmlFor="tel">Téléphone</label>
            <input id="tel" className={CHAMP} value={devis.client.telephone}
              onChange={(e) => changer({ client: { ...devis.client, telephone: e.target.value } })} />
          </div>
          <div>
            <label className={ETIQUETTE} htmlFor="adr">Adresse postale</label>
            <textarea id="adr" rows={2} className={CHAMP} value={devis.client.adresse}
              onChange={(e) => changer({ client: { ...devis.client, adresse: e.target.value } })} />
          </div>
        </section>

        {/* Dossier */}
        <section className="border border-white/10 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">Dossier</h2>
            <button onClick={recalculer}
              className="text-[11px] text-amber-500 hover:text-amber-400 transition-colors">
              Recalculer depuis la grille
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={ETIQUETTE} htmlFor="adultes">Adultes</label>
              <input id="adultes" type="number" min={1} className={CHAMP} value={devis.dossier.adultes}
                onChange={(e) => changerDossier({ adultes: Math.max(1, Number(e.target.value) || 1) })} />
            </div>
            <div>
              <label className={ETIQUETTE} htmlFor="enfants">Enfants</label>
              <input id="enfants" type="number" min={0} className={CHAMP} value={devis.dossier.enfants}
                onChange={(e) => changerDossier({ enfants: Math.max(0, Number(e.target.value) || 0) })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={ETIQUETTE} htmlFor="voie">Voie</label>
              <select id="voie" className={CHAMP} value={devis.dossier.softPower ? 'sp' : 'std'}
                onChange={(e) => changerDossier({ softPower: e.target.value === 'sp' })}>
                <option value="std">Activité à distance</option>
                <option value="sp">Soft Power</option>
              </select>
            </div>
            <div>
              <label className={ETIQUETTE} htmlFor="formule">Formule</label>
              <select id="formule" className={CHAMP} value={devis.dossier.formule}
                onChange={(e) => changerDossier({ formule: e.target.value as Devis['dossier']['formule'] })}>
                <option value="essentielle">Essentielle</option>
                <option value="premium">Premium</option>
                <option value="vip">VIP</option>
              </select>
            </div>
          </div>
          <div>
            <label className={ETIQUETTE} htmlFor="dest">Destination en Thaïlande</label>
            <input id="dest" className={CHAMP} value={devis.dossier.destination}
              onChange={(e) => changerDossier({ destination: e.target.value })} />
          </div>
          {totaux.surDevis && (
            <p className="text-[11px] text-amber-400 leading-relaxed">
              Plus de quatre personnes : la grille ne couvre pas ce cas. Fixez les honoraires
              manuellement ci-dessous.
            </p>
          )}
        </section>

        {/* Honoraires */}
        <section className="border border-amber-500/25 bg-amber-500/[0.04] rounded-xl p-4">
          <label className={ETIQUETTE} htmlFor="hono">Mes honoraires (entrent dans le CA)</label>
          <div className="flex items-center gap-2">
            <input id="hono" type="number" min={0} step={50} className={CHAMP} value={devis.honoraires}
              onChange={(e) => changer({ honoraires: Math.max(0, Number(e.target.value) || 0) })} />
            <span className="text-gray-500 text-sm flex-none">€</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-2">
            Acompte à la signature : <strong className="text-amber-500">{euros(totaux.acompte)}</strong>
            {' · '}solde {euros(totaux.solde)}
          </p>
        </section>

        {/* Débours */}
        <section className="border border-white/10 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">Frais externes</h2>
            <button
              onClick={() => changer({ debours: [...devis.debours, { libelle: '', quantite: 1, unitaire: 0 }] })}
              className="text-[11px] text-amber-500 hover:text-amber-400 transition-colors">
              + Ajouter une ligne
            </button>
          </div>
          {devis.debours.map((ligne, i) => (
            <div key={i} className="border-t border-white/5 pt-3 first:border-0 first:pt-0 space-y-2">
              <div className="flex gap-2">
                <input className={CHAMP} placeholder="Libellé" value={ligne.libelle}
                  onChange={(e) => changerLigne(i, { libelle: e.target.value })} />
                <button
                  onClick={() => changer({ debours: devis.debours.filter((_, j) => j !== i) })}
                  aria-label="Supprimer cette ligne"
                  className="flex-none px-2 text-gray-600 hover:text-red-400 transition-colors">
                  ×
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 items-center">
                <input type="number" min={0} step={1} className={CHAMP} value={ligne.quantite}
                  onChange={(e) => changerLigne(i, { quantite: Math.max(0, Number(e.target.value) || 0) })} />
                <input type="number" min={0} step={0.01} className={CHAMP} value={ligne.unitaire}
                  onChange={(e) => changerLigne(i, { unitaire: Math.max(0, Number(e.target.value) || 0) })} />
                <p className="text-sm text-gray-400 text-right">
                  {euros(Math.round(ligne.quantite * ligne.unitaire))}
                </p>
              </div>
              <input className={`${CHAMP} text-xs`} placeholder="Précision (facultatif)" value={ligne.detail ?? ''}
                onChange={(e) => changerLigne(i, { detail: e.target.value })} />
            </div>
          ))}
          <p className="text-[11px] text-gray-500 border-t border-white/5 pt-3">
            Sous-total <strong className="text-gray-300">{euros(totaux.debours)}</strong> — hors chiffre
            d&apos;affaires, réglé par le client aux prestataires.
          </p>
        </section>

        {/* Actions qui touchent au contenu contractuel */}
        <section className="space-y-3">
          {/* Le mot personnel évite le double envoi : sans lui, il fallait
              expédier le courriel du site, impersonnel, puis le sien avec ce
              qui compte — un rétroplanning, une échéance. Deux messages pour
              une seule affaire, et le client ne sait plus lequel fait foi. */}
          <div>
            <label className={ETIQUETTE} htmlFor="mot">
              Votre mot au client (facultatif)
            </label>
            <textarea
              id="mot"
              rows={6}
              className={CHAMP}
              value={messageClient}
              onChange={(e) => setMessageClient(e.target.value)}
              placeholder={
                'Bonjour Matteo,\n\nVoici le devis dont nous avons parlé…\n\nUn point important sur le calendrier : vos fonds doivent être\nsur le compte au plus tard le 5 novembre.'
              }
            />
            <p className="text-[11px] text-gray-500 mt-1.5 leading-relaxed">
              Placé en tête du courriel, à la place de la formule d&apos;ouverture standard. Le
              récapitulatif des montants et le bouton de signature suivent automatiquement. Laissez
              vide pour le message type.
            </p>
          </div>

          <div className="flex gap-2">
            <button onClick={enregistrer} disabled={etat === 'envoi'}
              className="flex-1 border border-white/15 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-white/5 transition-colors disabled:opacity-50">
              {etat === 'envoi' ? 'Enregistrement…' : 'Enregistrer'}
            </button>
            <button onClick={envoyer} disabled={etat === 'envoi'}
              className="flex-1 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold py-2.5 rounded-xl transition-colors disabled:opacity-50">
              Envoyer au client
            </button>
          </div>
        </section>
        </fieldset>

        {/* Actions toujours disponibles, signé ou non */}
        <section className="space-y-3">
          <div className="flex gap-2">
            <button onClick={() => window.print()}
              className="flex-1 text-xs text-gray-400 hover:text-white border border-white/10 py-2 rounded-lg transition-colors">
              Imprimer / PDF
            </button>
            <a href={`/devis/${devis.jeton}`} target="_blank" rel="noopener noreferrer"
              className="flex-1 text-xs text-gray-400 hover:text-white border border-white/10 py-2 rounded-lg transition-colors text-center">
              Voir la page client
            </a>
          </div>

          {/* Un devis signé est déjà accepté, et son statut ne se force plus :
              le verrou de `majDevis` refuserait de toute façon. */}
          {!modifiable && !signe && (
            <div className="flex gap-2">
              <button onClick={() => changerStatut('accepte')}
                className="flex-1 text-xs text-emerald-400 border border-emerald-500/25 py-2 rounded-lg hover:bg-emerald-500/10 transition-colors">
                Marquer accepté
              </button>
              <button onClick={() => changerStatut('refuse')}
                className="flex-1 text-xs text-red-400 border border-red-500/25 py-2 rounded-lg hover:bg-red-500/10 transition-colors">
                Marquer refusé
              </button>
            </div>
          )}

          {modifiable && (
            <button
              onClick={supprimer}
              onBlur={() => setConfirmeSuppression(false)}
              className={`w-full text-xs py-2 rounded-lg border transition-colors ${
                confirmeSuppression
                  ? 'text-red-300 border-red-500/50 bg-red-500/10'
                  : 'text-gray-600 border-transparent hover:text-red-400 hover:border-red-500/25'
              }`}
            >
              {confirmeSuppression
                ? 'Confirmer la suppression définitive'
                : 'Supprimer ce brouillon'}
            </button>
          )}

          {message && (
            <p className={`text-xs leading-relaxed ${etat === 'erreur' ? 'text-red-400' : 'text-emerald-400'}`}>
              {message}
            </p>
          )}
          {etat === 'enregistre' && !message && (
            <p className="text-xs text-emerald-400">Enregistré.</p>
          )}
        </section>
      </div>

      {/* ── APERÇU ── */}
      <div className="print:col-span-2">
        <DocumentDevis devis={devis} />
      </div>
    </div>
  );
}
