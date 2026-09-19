'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BoutonNouveauDevis from './BoutonNouveauDevis';

/**
 * La liste des devis, et surtout : où en est chacun.
 *
 * Elle affichait jusqu'ici un montant et une étiquette d'état. C'était
 * l'inventaire, pas le tableau de bord — rien n'y disait quoi faire
 * aujourd'hui. Un devis « envoyé » peut aussi bien avoir été lu trois fois
 * hier que dormir depuis six jours dans les indésirables d'un client, et ces
 * deux situations appellent des gestes opposés.
 *
 * Toutes les données nécessaires existaient déjà en base. Elles ne
 * remontaient simplement pas jusqu'ici.
 */

export type LigneDevis = {
  id: number;
  numero: string;
  jeton: string;
  creeLe: string;
  envoyeLe: string | null;
  consulteLe: string | null;
  consultations: number;
  relanceLe: string | null;
  statut: string;
  nom: string;
  email: string;
  personnes: number;
  softPower: boolean;
  honoraires: number;
  total: number;
  signeLe: string | null;
  signePar: string;
};

type Filtre = 'tous' | 'brouillon' | 'envoye' | 'signe';

function euros(m: number): string {
  return `${m.toLocaleString('fr-FR').replace(/ | /g, ' ')} €`;
}

/** « à l'instant », « il y a 3 h », « hier », « il y a 5 j ». */
function depuis(iso: string): string {
  const heures = (Date.now() - new Date(iso).getTime()) / 3_600_000;
  if (heures < 1) return "à l'instant";
  if (heures < 24) return `il y a ${Math.floor(heures)} h`;
  if (heures < 48) return 'hier';
  return `il y a ${Math.floor(heures / 24)} j`;
}

function jours(iso: string): number {
  return (Date.now() - new Date(iso).getTime()) / 86_400_000;
}

type Etat = { texte: string; ton: 'neutre' | 'attention' | 'bon' | 'alerte' };

/**
 * Une phrase qui dit où en est le dossier, et rien d'autre.
 *
 * Le cas qui justifie à lui seul cette colonne : un devis envoyé depuis plus
 * de deux jours et jamais ouvert. Ce n'est pas un client qui hésite, c'est un
 * courriel qui n'est pas arrivé — et la relance automatique empruntera le même
 * chemin, donc elle ne réglera rien. Il faut un appel, ou un autre canal.
 */
function etatDossier(d: LigneDevis): Etat {
  if (d.signeLe) {
    return { texte: `Signé ${depuis(d.signeLe)} par ${d.signePar}`, ton: 'bon' };
  }
  if (!d.envoyeLe) {
    return { texte: `Brouillon, créé ${depuis(d.creeLe)}`, ton: 'neutre' };
  }

  const morceaux: string[] = [];
  let ton: Etat['ton'] = 'neutre';

  if (!d.consulteLe) {
    if (jours(d.envoyeLe) > 2) {
      morceaux.push(`Envoyé ${depuis(d.envoyeLe)} · jamais ouvert`);
      ton = 'alerte';
    } else {
      morceaux.push(`Envoyé ${depuis(d.envoyeLe)} · pas encore ouvert`);
    }
  } else {
    morceaux.push(
      d.consultations > 1
        ? `Ouvert ${d.consultations} fois · 1re lecture ${depuis(d.consulteLe)}`
        : `Ouvert ${depuis(d.consulteLe)}`,
    );
    ton = 'attention';
  }

  if (d.relanceLe) morceaux.push(`relancé ${depuis(d.relanceLe)}`);

  return { texte: morceaux.join(' · '), ton };
}

const TONS: Record<Etat['ton'], string> = {
  neutre: 'text-gray-500',
  attention: 'text-sky-400',
  bon: 'text-emerald-400',
  alerte: 'text-amber-400',
};

/** Copie le lien client dans le presse-papier, et le dit. */
function BoutonLien({ jeton }: { jeton: string }) {
  const [copie, setCopie] = useState(false);

  const copier = async (e: React.MouseEvent) => {
    // La ligne entière est cliquable : sans cela, copier le lien ouvrirait
    // aussi le devis.
    e.preventDefault();
    e.stopPropagation();
    const lien = `${window.location.origin}/devis/${jeton}`;
    try {
      await navigator.clipboard.writeText(lien);
      setCopie(true);
      setTimeout(() => setCopie(false), 2000);
    } catch {
      // Safari refuse l'accès au presse-papier hors geste direct dans
      // certains contextes. Plutôt que d'échouer en silence, on montre le
      // lien : il reste sélectionnable à la main.
      window.prompt('Lien client — copiez-le :', lien);
    }
  };

  return (
    <button
      onClick={copier}
      title="Copier le lien client"
      className="text-[11px] px-2 py-1 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/25 transition-colors whitespace-nowrap"
    >
      {copie ? '✓ Copié' : 'Lien'}
    </button>
  );
}

/** Supprime un brouillon. Les devis envoyés sont refusés côté serveur. */
function BoutonSupprimer({ d, onFait }: { d: LigneDevis; onFait: () => void }) {
  const [enCours, setEnCours] = useState(false);

  const supprimer = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm(`Supprimer définitivement le brouillon ${d.numero} ?`)) return;
    setEnCours(true);
    try {
      await fetch(`/api/admin/devis/${d.id}`, { method: 'DELETE' });
      onFait();
    } catch {
      window.alert('Suppression impossible : le serveur n’a pas répondu.');
    }
    setEnCours(false);
  };

  return (
    <button
      onClick={supprimer}
      disabled={enCours}
      title="Supprimer ce brouillon"
      className="text-[11px] px-2 py-1 rounded-lg border border-white/10 text-gray-500 hover:text-red-400 hover:border-red-500/30 transition-colors disabled:opacity-40 whitespace-nowrap"
    >
      {enCours ? '…' : 'Suppr.'}
    </button>
  );
}

export default function ListeDevis({ lignes }: { lignes: LigneDevis[] }) {
  const router = useRouter();
  const [filtre, setFiltre] = useState<Filtre>('tous');
  const [recherche, setRecherche] = useState('');

  const comptes = useMemo(
    () => ({
      tous: lignes.length,
      brouillon: lignes.filter((d) => !d.envoyeLe && !d.signeLe).length,
      envoye: lignes.filter((d) => d.envoyeLe && !d.signeLe).length,
      signe: lignes.filter((d) => d.signeLe).length,
    }),
    [lignes],
  );

  /**
   * Deux chiffres, pas dix.
   *
   * Ce qui est signé ce mois-ci, et ce qui pourrait l'être. Le premier est
   * acquis, le second est le travail qui reste — et c'est le seul rapport
   * entre les deux qui vaille d'être regardé tous les jours.
   */
  const argent = useMemo(() => {
    const debutDuMois = new Date();
    debutDuMois.setDate(1);
    debutDuMois.setHours(0, 0, 0, 0);

    let signeCeMois = 0;
    let enAttente = 0;
    for (const d of lignes) {
      if (d.signeLe) {
        if (new Date(d.signeLe) >= debutDuMois) signeCeMois += d.honoraires;
      } else if (d.envoyeLe) {
        enAttente += d.honoraires;
      }
    }
    return { signeCeMois, enAttente };
  }, [lignes]);

  const visibles = useMemo(() => {
    const q = recherche.trim().toLowerCase();
    return lignes.filter((d) => {
      if (filtre === 'brouillon' && (d.envoyeLe || d.signeLe)) return false;
      if (filtre === 'envoye' && (!d.envoyeLe || d.signeLe)) return false;
      if (filtre === 'signe' && !d.signeLe) return false;
      if (!q) return true;
      return (
        d.numero.toLowerCase().includes(q) ||
        d.nom.toLowerCase().includes(q) ||
        d.email.toLowerCase().includes(q)
      );
    });
  }, [lignes, filtre, recherche]);

  const ONGLETS: { cle: Filtre; libelle: string }[] = [
    { cle: 'tous', libelle: 'Tous' },
    { cle: 'brouillon', libelle: 'Brouillons' },
    { cle: 'envoye', libelle: 'En attente' },
    { cle: 'signe', libelle: 'Signés' },
  ];

  return (
    <>
      {/* ── BANDEAU CHIFFRÉ ── */}
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 mb-5 text-sm">
        <span className="text-gray-500">
          <strong className="text-emerald-400 font-semibold">{euros(argent.signeCeMois)}</strong>{' '}
          signés ce mois-ci
        </span>
        <span className="text-gray-500">
          <strong className="text-white font-semibold">{euros(argent.enAttente)}</strong> en attente
          de signature
        </span>
      </div>

      {/* ── BARRE D'OUTILS ──
          Collante en haut : au bout de vingt devis, « Nouveau devis » restait
          hors d'écran dès qu'on avait fait défiler la liste, et il fallait
          remonter pour l'atteindre. */}
      <div className="sticky top-0 z-10 -mx-4 px-4 py-3 bg-[#0a0a0a]/95 backdrop-blur border-b border-white/5 mb-5 space-y-3">
        {/* Les filtres défilent dans leur propre conteneur ; le bouton reste
            en dehors. Placé à l'intérieur, il était emporté par le défilement
            et sortait de l'écran sur un téléphone — exactement le bouton qu'on
            voulait rendre plus accessible. */}
        <div className="flex items-center gap-2">
          <div className="flex-1 min-w-0 flex items-center gap-2 overflow-x-auto">
            {ONGLETS.map((o) => (
              <button
                key={o.cle}
                onClick={() => setFiltre(o.cle)}
                className={`flex-none text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                  filtre === o.cle
                    ? 'bg-amber-500 border-amber-500 text-black'
                    : 'border-white/10 text-gray-400 hover:text-white hover:border-white/25'
                }`}
              >
                {o.libelle}{' '}
                <span className={filtre === o.cle ? 'text-black/60' : 'text-gray-600'}>
                  {comptes[o.cle]}
                </span>
              </button>
            ))}
          </div>
          <div className="flex-none">
            <BoutonNouveauDevis />
          </div>
        </div>

        <input
          type="search"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          placeholder="Rechercher un numéro, un nom, un e-mail…"
          className="champ"
        />
      </div>

      {visibles.length === 0 ? (
        <div className="border border-white/10 rounded-2xl p-10 text-center">
          <p className="text-gray-500 text-sm">
            Aucun devis ne correspond{recherche ? ' à cette recherche' : ' à ce filtre'}.
          </p>
        </div>
      ) : (
        <>
          {/* ── TÉLÉPHONE ── */}
          <ul className="sm:hidden space-y-3">
            {visibles.map((d) => {
              const etat = etatDossier(d);
              return (
                <li key={d.id} className="border border-white/10 rounded-2xl overflow-hidden">
                  <Link
                    href={`/admin/devis/${d.id}`}
                    className="block p-4 active:bg-white/5 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-amber-500 font-medium">{d.numero}</p>
                      <span className="flex-none text-sm text-white font-medium whitespace-nowrap">
                        {euros(d.honoraires)}
                      </span>
                    </div>
                    <p className="text-white mt-2 truncate">
                      {d.nom || <span className="text-gray-600">sans nom</span>}
                    </p>
                    <p className="text-[11px] text-gray-600 truncate">{d.email}</p>
                    <p className={`text-xs mt-2 ${TONS[etat.ton]}`}>{etat.texte}</p>
                  </Link>
                  <div className="flex items-center gap-2 px-4 pb-3 -mt-1">
                    {d.envoyeLe && <BoutonLien jeton={d.jeton} />}
                    {!d.envoyeLe && !d.signeLe && (
                      <BoutonSupprimer d={d} onFait={() => router.refresh()} />
                    )}
                    <span className="ml-auto text-[11px] text-gray-600">
                      {d.personnes} pers. · {d.softPower ? 'Soft Power' : 'À distance'}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* ── ÉCRAN LARGE ── */}
          <div className="hidden sm:block border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-black/40 border-b border-white/10 text-left">
                  <th className="px-5 py-3 text-[10px] uppercase tracking-widest text-gray-500 font-bold">Numéro</th>
                  <th className="px-5 py-3 text-[10px] uppercase tracking-widest text-gray-500 font-bold">Client</th>
                  <th className="px-5 py-3 text-[10px] uppercase tracking-widest text-gray-500 font-bold">Où en est le dossier</th>
                  <th className="px-5 py-3 text-[10px] uppercase tracking-widest text-gray-500 font-bold text-right">Honoraires</th>
                  <th className="px-5 py-3 text-[10px] uppercase tracking-widest text-gray-500 font-bold text-right">Budget</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {visibles.map((d) => {
                  const etat = etatDossier(d);
                  return (
                    <tr key={d.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="px-5 py-4 align-top">
                        <Link
                          href={`/admin/devis/${d.id}`}
                          className="text-amber-500 hover:underline font-medium"
                        >
                          {d.numero}
                        </Link>
                        <p className="text-[11px] text-gray-600 mt-0.5">
                          {new Date(d.creeLe).toLocaleDateString('fr-FR')}
                        </p>
                      </td>
                      <td className="px-5 py-4 align-top text-white">
                        {d.nom || <span className="text-gray-600">sans nom</span>}
                        <p className="text-[11px] text-gray-600 mt-0.5">{d.email}</p>
                      </td>
                      <td className={`px-5 py-4 align-top ${TONS[etat.ton]}`}>
                        {etat.texte}
                        <p className="text-[11px] text-gray-600 mt-0.5">
                          {d.personnes} pers. · {d.softPower ? 'Soft Power' : 'À distance'}
                        </p>
                      </td>
                      <td className="px-5 py-4 align-top text-right text-white font-medium">
                        {euros(d.honoraires)}
                      </td>
                      <td className="px-5 py-4 align-top text-right text-gray-400">
                        {euros(d.total)}
                      </td>
                      <td className="px-5 py-4 align-top">
                        <div className="flex items-center justify-end gap-2">
                          {d.envoyeLe && <BoutonLien jeton={d.jeton} />}
                          {!d.envoyeLe && !d.signeLe && (
                            <BoutonSupprimer d={d} onFait={() => router.refresh()} />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
