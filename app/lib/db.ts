import { Pool, type QueryResultRow } from 'pg';

/**
 * Accès à la base Postgres (Neon en production).
 *
 * Le pilote retenu est `pg` et non `@neondatabase/serverless`, pour une raison
 * pratique : `pg` parle le protocole Postgres standard, donc le même code
 * tourne contre une base locale pendant le développement et contre Neon en
 * production. Neon accepte les connexions TCP sur son point d'entrée mutualisé
 * (« pooled »), qui est précisément celui que l'intégration Vercel place dans
 * DATABASE_URL. Au volume d'un cabinet individuel, la question du nombre de
 * connexions simultanées ne se pose pas.
 */

let pool: Pool | null = null;

function obtenirPool(): Pool {
  if (pool) return pool;

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL absente. Sur Vercel elle est créée par l'intégration Neon ; " +
        'en local, récupérez-la avec `vercel env pull .env.local`.',
    );
  }

  pool = new Pool({
    connectionString: url,
    // Neon impose TLS. En local, la base n'en a pas : on ne l'exige que si
    // l'URL ne désigne pas explicitement la machine de développement.
    ssl: /localhost|127\.0\.0\.1/.test(url) ? undefined : { rejectUnauthorized: true },
    max: 3,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 8_000,
  });

  return pool;
}

export async function requete<T extends QueryResultRow = QueryResultRow>(
  texte: string,
  valeurs: unknown[] = [],
): Promise<T[]> {
  const res = await obtenirPool().query<T>(texte, valeurs);
  return res.rows;
}

/** Exécute une suite d'opérations dans une transaction, avec retour arrière en cas d'échec. */
export async function transaction<T>(
  travail: (q: <R extends QueryResultRow = QueryResultRow>(t: string, v?: unknown[]) => Promise<R[]>) => Promise<T>,
): Promise<T> {
  const client = await obtenirPool().connect();
  try {
    await client.query('BEGIN');
    const resultat = await travail(async <R extends QueryResultRow = QueryResultRow>(t: string, v: unknown[] = []) => {
      const r = await client.query<R>(t, v);
      return r.rows;
    });
    await client.query('COMMIT');
    return resultat;
  } catch (erreur) {
    await client.query('ROLLBACK');
    throw erreur;
  } finally {
    client.release();
  }
}

/**
 * Crée les tables si elles n'existent pas.
 *
 * Appelée au début de chaque opération plutôt qu'une fois au démarrage : sur
 * une plateforme sans serveur, il n'y a pas de « démarrage » unique, et une
 * migration oubliée se traduirait par une erreur en production. Les ordres
 * sont idempotents, leur coût est négligeable.
 */
let schemaPret: Promise<void> | null = null;

export function assurerSchema(): Promise<void> {
  if (schemaPret) return schemaPret;

  schemaPret = (async () => {
    await requete(`
      CREATE TABLE IF NOT EXISTS leads (
        id           SERIAL PRIMARY KEY,
        cree_le      TIMESTAMPTZ NOT NULL DEFAULT now(),
        prenom       TEXT,
        email        TEXT,
        telephone    TEXT,
        nationalite  TEXT,
        statut_pro   TEXT,
        foyer        TEXT,
        personnes    INTEGER NOT NULL DEFAULT 1,
        soft_power   BOOLEAN NOT NULL DEFAULT FALSE,
        formule      TEXT,
        traite       BOOLEAN NOT NULL DEFAULT FALSE,
        donnees      JSONB NOT NULL DEFAULT '{}'::jsonb
      )
    `);
    await requete(`CREATE INDEX IF NOT EXISTS leads_cree_le_idx ON leads (cree_le DESC)`);

    await requete(`
      CREATE TABLE IF NOT EXISTS devis (
        id         SERIAL PRIMARY KEY,
        numero     TEXT UNIQUE NOT NULL,
        jeton      TEXT UNIQUE NOT NULL,
        cree_le    TIMESTAMPTZ NOT NULL DEFAULT now(),
        maj_le     TIMESTAMPTZ NOT NULL DEFAULT now(),
        envoye_le  TIMESTAMPTZ,
        statut     TEXT NOT NULL DEFAULT 'brouillon',
        lead_id    INTEGER REFERENCES leads(id) ON DELETE SET NULL,
        client     JSONB NOT NULL DEFAULT '{}'::jsonb,
        dossier    JSONB NOT NULL DEFAULT '{}'::jsonb,
        honoraires INTEGER NOT NULL DEFAULT 0,
        debours    JSONB NOT NULL DEFAULT '[]'::jsonb
      )
    `);
    await requete(`CREATE INDEX IF NOT EXISTS devis_cree_le_idx ON devis (cree_le DESC)`);

    // Compteur de numérotation : la loi veut une séquence continue et sans
    // trou. Une colonne SERIAL ne suffirait pas — elle saute un numéro dès
    // qu'une transaction échoue.
    await requete(`
      CREATE TABLE IF NOT EXISTS compteurs (
        annee   INTEGER PRIMARY KEY,
        dernier INTEGER NOT NULL DEFAULT 0
      )
    `);
  })();

  return schemaPret;
}
