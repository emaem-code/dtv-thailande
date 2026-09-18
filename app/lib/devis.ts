import { randomBytes } from 'crypto';
import { requete, transaction, assurerSchema } from './db';
import { PREMIER_NUMERO } from './agence';
import {
  suiviVide,
  type Client,
  type Dossier,
  type Debours,
  type Devis,
  type Option,
  type Signature,
  type Suivi,
} from './devis-modele';

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
  options: Option[] | null;
  signature: Signature | null;
  suivi: Partial<Suivi> | null;
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
    options: l.options ?? [],
    signature: l.signature ?? null,
    // Les devis antérieurs à la signature en ligne ont un suivi vide, et la
    // colonne vaut `{}`. On complète plutôt que de laisser des champs absents
    // remonter jusqu'aux composants.
    suivi: { ...suiviVide(), ...(l.suivi ?? {}) },
  };
}

/**
 * Réserve le prochain numéro, sans trou.
 *
 * Le verrou de ligne sérialise les demandes concurrentes : deux devis créés
 * dans la même seconde ne peuvent pas recevoir le même numéro, et aucun numéro
 * n'est consommé sans être attribué.
 *
 * Deux garanties s'ajoutent à la continuité :
 *
 * — le compteur ne descend jamais en dessous de PREMIER_NUMERO, y compris si
 *   la ligne existait déjà avec une valeur plus basse ;
 * — une nouvelle année reprend là où la précédente s'est arrêtée, plutôt que
 *   de repartir à zéro. L'année figure dans le numéro à titre indicatif ; la
 *   séquence, elle, reste unique sur toute la vie de l'entreprise.
 */
async function prochainNumero(
  q: <R extends Record<string, unknown>>(t: string, v?: unknown[]) => Promise<R[]>,
): Promise<string> {
  const annee = new Date().getFullYear();
  const plancher = PREMIER_NUMERO - 1;

  await q(
    `INSERT INTO compteurs (annee, dernier)
     VALUES ($1, GREATEST($2, COALESCE((SELECT MAX(dernier) FROM compteurs), 0)))
     ON CONFLICT (annee) DO NOTHING`,
    [annee, plancher],
  );
  const [ligne] = await q<{ dernier: number }>(
    `UPDATE compteurs SET dernier = GREATEST(dernier, $2) + 1 WHERE annee = $1 RETURNING dernier`,
    [annee, plancher],
  );

  return `${annee}${String(ligne.dernier).padStart(6, '0')}`;
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

/**
 * Erreur levée lorsqu'on tente de modifier un devis déjà signé.
 *
 * Distinguée d'une erreur quelconque pour que la route la traduise en 409
 * plutôt qu'en 500 : ce n'est pas une panne, c'est un refus.
 */
export class DevisSigneError extends Error {
  constructor() {
    super(
      'Ce devis a été accepté et signé électroniquement : son contenu ne peut plus ' +
        'être modifié. L’empreinte conservée ne correspondrait plus au document signé, ' +
        'et la preuve perdrait toute valeur. Créez un avenant sous forme de nouveau devis.',
    );
    this.name = 'DevisSigneError';
  }
}

export async function majDevis(
  id: number,
  champs: Partial<Pick<Devis, 'client' | 'dossier' | 'honoraires' | 'debours' | 'statut' | 'options'>>,
): Promise<Devis | null> {
  await assurerSchema();

  // Le verrouillage se fait ici, et non dans l'interface : une route appelée
  // directement doit se heurter à la même règle qu'un bouton grisé.
  const actuel = await lireDevis(id);
  if (!actuel) return null;
  if (actuel.signature) throw new DevisSigneError();

  const [ligne] = await requete<LigneDevis>(
    `UPDATE devis SET
       client     = COALESCE($2, client),
       dossier    = COALESCE($3, dossier),
       honoraires = COALESCE($4, honoraires),
       debours    = COALESCE($5, debours),
       statut     = COALESCE($6, statut),
       options    = COALESCE($7, options),
       maj_le     = now()
     WHERE id = $1 RETURNING *`,
    [
      id,
      champs.client ? JSON.stringify(champs.client) : null,
      champs.dossier ? JSON.stringify(champs.dossier) : null,
      champs.honoraires ?? null,
      champs.debours ? JSON.stringify(champs.debours) : null,
      champs.statut ?? null,
      champs.options ? JSON.stringify(champs.options) : null,
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

// ─── SIGNATURE ────────────────────────────────────────────────────────────────

/**
 * Scelle le devis.
 *
 * La condition `signature IS NULL` est ce qui rend l'opération sûre face à un
 * double envoi : le second n'écrase rien et ne renvoie aucune ligne. Sans
 * elle, un client impatient qui clique deux fois remplacerait l'horodatage et
 * l'adresse IP de sa propre preuve.
 *
 * Le statut passe à « accepté » et la date d'envoi est renseignée si elle ne
 * l'était pas : un devis transmis à la main, sans passer par le bouton
 * d'envoi, a tout de même été porté à la connaissance du client — sa
 * signature le prouve.
 */
export async function enregistrerSignature(
  jeton: string,
  signature: Signature,
  option?: Option,
): Promise<Devis | null> {
  await assurerSchema();

  // Sur un devis à options, la variante retenue devient le devis lui-même :
  // honoraires, débours et formule sont figés dans la même écriture que la
  // signature. Le document signé cesse ainsi d'être une offre à plusieurs
  // branches pour devenir un contrat unique, et tout ce qui le relit ensuite
  // — le PDF, la facture, l'espace client — n'a plus à choisir.
  const [ligne] = await requete<LigneDevis>(
    `UPDATE devis SET
       signature  = $2,
       statut     = 'accepte',
       envoye_le  = COALESCE(envoye_le, now()),
       suivi      = COALESCE(suivi, '{}'::jsonb) || $3::jsonb,
       honoraires = COALESCE($4, honoraires),
       debours    = COALESCE($5, debours),
       dossier    = CASE WHEN $6::text IS NULL THEN dossier
                         ELSE jsonb_set(dossier, '{formule}', to_jsonb($6::text)) END,
       maj_le     = now()
     WHERE jeton = $1 AND signature IS NULL
     RETURNING *`,
    [
      jeton,
      JSON.stringify(signature),
      JSON.stringify({ etape: 0, majLe: signature.signeLe }),
      option?.honoraires ?? null,
      option ? JSON.stringify(option.debours) : null,
      option?.formule ?? null,
    ],
  );
  return ligne ? versDevis(ligne) : null;
}

/** Avancement du dossier, tenu par Matthieu. Reste ouvert après la signature. */
export async function majSuivi(
  id: number,
  champs: { etape?: number; note?: string },
): Promise<Devis | null> {
  await assurerSchema();
  const fusion: Record<string, unknown> = { majLe: new Date().toISOString() };
  if (champs.etape !== undefined) fusion.etape = champs.etape;
  if (champs.note !== undefined) fusion.note = champs.note;

  const [ligne] = await requete<LigneDevis>(
    `UPDATE devis SET suivi = COALESCE(suivi, '{}'::jsonb) || $2::jsonb, maj_le = now()
     WHERE id = $1 RETURNING *`,
    [id, JSON.stringify(fusion)],
  );
  return ligne ? versDevis(ligne) : null;
}

/**
 * Coche ou décoche une pièce, depuis l'espace client.
 *
 * Lecture puis écriture de l'objet entier plutôt qu'un `jsonb_set` : le
 * chemin comporte deux niveaux, et Postgres ne crée que le dernier. Au volume
 * d'un dossier, la simplicité vaut mieux que l'astuce.
 */
export async function basculerPiece(
  jeton: string,
  piece: string,
  coche: boolean,
): Promise<Devis | null> {
  await assurerSchema();
  const devis = await lireDevisParJeton(jeton);
  if (!devis || !devis.signature) return null;

  const pieces = { ...devis.suivi.pieces, [piece]: coche };
  const [ligne] = await requete<LigneDevis>(
    `UPDATE devis SET suivi = COALESCE(suivi, '{}'::jsonb) || $2::jsonb, maj_le = now()
     WHERE jeton = $1 RETURNING *`,
    [jeton, JSON.stringify({ pieces })],
  );
  return ligne ? versDevis(ligne) : null;
}

// ─── CODES À USAGE UNIQUE ─────────────────────────────────────────────────────

export type CodeEnAttente = {
  empreinte: string;
  email: string;
  envoyeLe: Date;
  expireLe: Date;
  tentatives: number;
};

/** Un seul code vivant par devis : le nouvel envoi remplace le précédent. */
export async function enregistrerCode(
  jeton: string,
  empreinte: string,
  email: string,
  expireLe: Date,
): Promise<void> {
  await assurerSchema();
  await requete(
    `INSERT INTO codes_signature (jeton, empreinte, email, envoye_le, expire_le, tentatives)
     VALUES ($1, $2, $3, now(), $4, 0)
     ON CONFLICT (jeton) DO UPDATE
       SET empreinte = EXCLUDED.empreinte,
           email     = EXCLUDED.email,
           envoye_le = now(),
           expire_le = EXCLUDED.expire_le,
           tentatives = 0`,
    [jeton, empreinte, email, expireLe],
  );
}

export async function lireCode(jeton: string): Promise<CodeEnAttente | null> {
  await assurerSchema();
  const [l] = await requete<{
    empreinte: string;
    email: string;
    envoye_le: Date;
    expire_le: Date;
    tentatives: number;
  }>(`SELECT * FROM codes_signature WHERE jeton = $1`, [jeton]);
  if (!l) return null;
  return {
    empreinte: l.empreinte,
    email: l.email,
    envoyeLe: l.envoye_le,
    expireLe: l.expire_le,
    tentatives: l.tentatives,
  };
}

/** Compte une saisie fausse et renvoie le nouveau total. */
export async function compterTentative(jeton: string): Promise<number> {
  const [l] = await requete<{ tentatives: number }>(
    `UPDATE codes_signature SET tentatives = tentatives + 1 WHERE jeton = $1 RETURNING tentatives`,
    [jeton],
  );
  return l?.tentatives ?? 0;
}

export async function supprimerCode(jeton: string): Promise<void> {
  await requete(`DELETE FROM codes_signature WHERE jeton = $1`, [jeton]);
}
