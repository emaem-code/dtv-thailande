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
      const reponse = await fetch(`/api/admin/devis/${devis.id}/envoyer`, { method: 'POST' });
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
            {devis.statut === 'brouillon'
              ? 'Brouillon — modifiable'
              : `Envoyé le ${devis.envoyeLe ? new Date(devis.envoyeLe).toLocaleDateString('fr-FR') : '—'}`}
          </p>
        </div>

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

        {/* Actions */}
        <section className="space-y-3">
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

          {!modifiable && (
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
