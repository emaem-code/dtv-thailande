import { randomBytes } from 'crypto';
import { requete, transaction, assurerSchema } from './db';
import type { Client, Dossier, Debours, Devis } from './devis-modele';

/**
 * Lecture et écriture des devis.
 *
 * Réservé au serveur : ce module ouvre une connexion Postgres. Les types et
 * les calculs vivent dans `devis-modele`, que les composants client peuvent
 * importer sans entraîner le pilote avec eux.
 */

export * from './devis-modele';

// ─── PERSISTANCE ──────────────────────────────────────────────────────────────

type LigneDevis = {
  id: number;
  numero: string;
  jeton: string;
  cree_le: Date;
  maj_le: Date;
  envoye_le: Date | null;
  statut: string;
  lead_id: number | null;
  client: Client;
  dossier: Dossier;
  honoraires: number;
  debours: Debours[];
};

function versDevis(l: LigneDevis): Devis {
  return {
    id: l.id,
    numero: l.numero,
    jeton: l.jeton,
    creeLe: l.cree_le.toISOString(),
    majLe: l.maj_le.toISOString(),
    envoyeLe: l.envoye_le ? l.envoye_le.toISOString() : null,
    statut: l.statut as Devis['statut'],
    leadId: l.lead_id,
    client: l.client,
    dossier: l.dossier,
    honoraires: l.honoraires,
    debours: l.debours,
  };
}

/**
 * Réserve le prochain numéro de l'année, sans trou.
 *
 * Le verrou de ligne sérialise les demandes concurrentes : deux devis créés
 * dans la même seconde ne peuvent pas recevoir le même numéro, et aucun numéro
 * n'est consommé sans être attribué.
 */
async function prochainNumero(
  q: <R extends Record<string, unknown>>(t: string, v?: unknown[]) => Promise<R[]>,
): Promise<string> {
  const annee = new Date().getFullYear();
  await q(`INSERT INTO compteurs (annee) VALUES ($1) ON CONFLICT (annee) DO NOTHING`, [annee]);
  const [ligne] = await q<{ dernier: number }>(
    `UPDATE compteurs SET dernier = dernier + 1 WHERE annee = $1 RETURNING dernier`,
    [annee],
  );
  return `DTV-${annee}-${String(ligne.dernier).padStart(3, '0')}`;
}

export async function creerDevis(base: {
  client: Client;
  dossier: Dossier;
  honoraires: number;
  debours: Debours[];
  leadId?: number | null;
}): Promise<Devis> {
  await assurerSchema();
  return transaction(async (q) => {
    const numero = await prochainNumero(q);
    const jeton = randomBytes(16).toString('base64url');
    const [ligne] = await q<LigneDevis>(
      `INSERT INTO devis (numero, jeton, lead_id, client, dossier, honoraires, debours)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        numero,
        jeton,
        base.leadId ?? null,
        JSON.stringify(base.client),
        JSON.stringify(base.dossier),
        base.honoraires,
        JSON.stringify(base.debours),
      ],
    );
    return versDevis(ligne);
  });
}

export async function majDevis(
  id: number,
  champs: Partial<Pick<Devis, 'client' | 'dossier' | 'honoraires' | 'debours' | 'statut'>>,
): Promise<Devis | null> {
  await assurerSchema();
  const [ligne] = await requete<LigneDevis>(
    `UPDATE devis SET
       client     = COALESCE($2, client),
       dossier    = COALESCE($3, dossier),
       honoraires = COALESCE($4, honoraires),
       debours    = COALESCE($5, debours),
       statut     = COALESCE($6, statut),
       maj_le     = now()
     WHERE id = $1 RETURNING *`,
    [
      id,
      champs.client ? JSON.stringify(champs.client) : null,
      champs.dossier ? JSON.stringify(champs.dossier) : null,
      champs.honoraires ?? null,
      champs.debours ? JSON.stringify(champs.debours) : null,
      champs.statut ?? null,
    ],
  );
  return ligne ? versDevis(ligne) : null;
}

export async function marquerEnvoye(id: number): Promise<void> {
  await assurerSchema();
  await requete(
    `UPDATE devis SET envoye_le = now(), statut = 'envoye', maj_le = now()
     WHERE id = $1 AND statut = 'brouillon'`,
    [id],
  );
}

export async function listerDevis(limite = 100): Promise<Devis[]> {
  await assurerSchema();
  const lignes = await requete<LigneDevis>(
    `SELECT * FROM devis ORDER BY cree_le DESC LIMIT $1`,
    [limite],
  );
  return lignes.map(versDevis);
}

export async function lireDevis(id: number): Promise<Devis | null> {
  await assurerSchema();
  const [ligne] = await requete<LigneDevis>(`SELECT * FROM devis WHERE id = $1`, [id]);
  return ligne ? versDevis(ligne) : null;
}

export async function lireDevisParJeton(jeton: string): Promise<Devis | null> {
  await assurerSchema();
  const [ligne] = await requete<LigneDevis>(`SELECT * FROM devis WHERE jeton = $1`, [jeton]);
  return ligne ? versDevis(ligne) : null;
}

export async function supprimerDevis(id: number): Promise<void> {
  await assurerSchema();
  await requete(`DELETE FROM devis WHERE id = $1 AND statut = 'brouillon'`, [id]);
}
