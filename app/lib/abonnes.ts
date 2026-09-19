import { randomBytes } from 'crypto';
import { requete, assurerSchema } from './db';

/**
 * Les abonnés aux alertes réglementaires.
 *
 * POURQUOI CETTE LISTE EXISTE.
 *
 * Les règles du DTV ont changé quatre fois entre mai et septembre 2026 :
 * fermeture du dépôt depuis l'Asie, casier judiciaire exigé, exemption de
 * visa ramenée de 60 à 30 jours, et un seuil financier que presque tout le
 * monde convertit de travers. Quelqu'un qui prépare un départ pour 2027 a un
 * intérêt réel à être prévenu — ce n'est pas une lettre d'information de plus,
 * c'est la seule façon de ne pas monter un dossier sur des règles périmées.
 *
 * POURQUOI UNE DOUBLE CONFIRMATION.
 *
 * Le consentement d'une case cochée suffirait en droit. La confirmation par
 * courriel sert à autre chose : elle écarte les adresses fautives. Sur un
 * domaine de quelques mois, chaque courriel qui rebondit dégrade la réputation
 * d'expéditeur — et cette réputation est exactement ce qui fait qu'un devis à
 * 1 681 € arrive en boîte de réception plutôt qu'en indésirables. Une liste
 * non confirmée mettrait en péril le circuit qui rapporte de l'argent, pour
 * gagner quelques adresses qui n'en valent pas le risque.
 *
 * Elle donne aussi une preuve de consentement horodatée, ce que le RGPD
 * demande de pouvoir produire.
 */

export type Abonne = {
  id: number;
  email: string;
  creeLe: string;
  confirmeLe: string | null;
  desinscritLe: string | null;
  source: string;
};

type LigneAbonne = {
  id: number;
  email: string;
  cree_le: Date;
  confirme_le: Date | null;
  desinscrit_le: Date | null;
  source: string | null;
};

function versAbonne(l: LigneAbonne): Abonne {
  return {
    id: l.id,
    email: l.email,
    creeLe: l.cree_le.toISOString(),
    confirmeLe: l.confirme_le ? l.confirme_le.toISOString() : null,
    desinscritLe: l.desinscrit_le ? l.desinscrit_le.toISOString() : null,
    source: l.source ?? '',
  };
}

/**
 * Le texte exact soumis à l'abonné, conservé avec son inscription.
 *
 * Le RGPD demande de pouvoir démontrer à quoi la personne a consenti, et pas
 * seulement qu'elle a consenti. Stocker la formulation plutôt qu'un simple
 * booléen rend cette preuve lisible — y compris le jour où la phrase change
 * sur le site, ce qui arrivera.
 */
export const CONSENTEMENT =
  'J’accepte de recevoir par courriel les changements de règles du visa DTV. ' +
  'Mon adresse ne sert qu’à cela, n’est jamais transmise à un tiers, et chaque ' +
  'message comporte un lien de désinscription.';

/** Deux ans sans ouvrir un message : une adresse qu'on garde pour rien. */
export const CONSERVATION_MOIS = 24;

function jetonUnique(): string {
  return randomBytes(16).toString('base64url');
}

/**
 * Inscrit une adresse, ou renvoie le jeton de celle qui existe déjà.
 *
 * Une réinscription ne crée pas de doublon et ne réinitialise pas la
 * confirmation : elle renvoie simplement de quoi renvoyer le courriel. Une
 * personne qui clique deux fois ne doit ni provoquer d'erreur, ni repartir de
 * zéro.
 *
 * Une adresse précédemment désinscrite qui revient d'elle-même est
 * réactivée — mais repasse par la confirmation, parce que son consentement
 * précédent a été retiré et qu'on ne le ressuscite pas d'office.
 */
export async function inscrire(
  email: string,
  source: string,
): Promise<{ jeton: string; dejaConfirme: boolean }> {
  await assurerSchema();

  const [ligne] = await requete<{ jeton: string; confirme_le: Date | null }>(
    `INSERT INTO abonnes (email, jeton, source, consentement)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (email) DO UPDATE
        SET desinscrit_le = NULL,
            confirme_le   = CASE WHEN abonnes.desinscrit_le IS NOT NULL
                                 THEN NULL ELSE abonnes.confirme_le END,
            source        = COALESCE(abonnes.source, EXCLUDED.source)
     RETURNING jeton, confirme_le`,
    [email.trim().toLowerCase(), jetonUnique(), source.slice(0, 120), CONSENTEMENT],
  );

  return { jeton: ligne.jeton, dejaConfirme: ligne.confirme_le !== null };
}

/** Valide le clic reçu par courriel. Retourne l'adresse, ou null si le jeton est inconnu. */
export async function confirmer(jeton: string): Promise<string | null> {
  await assurerSchema();
  const [ligne] = await requete<{ email: string }>(
    `UPDATE abonnes
        SET confirme_le = COALESCE(confirme_le, now()), desinscrit_le = NULL
      WHERE jeton = $1
      RETURNING email`,
    [jeton],
  );
  return ligne?.email ?? null;
}

/**
 * Désinscrit, sans rien demander.
 *
 * Un clic, et c'est fait : l'article L34-5 du code des postes impose un moyen
 * simple, et une page qui réclamerait une confirmation ou un mot de passe n'en
 * serait pas un. La ligne est conservée plutôt que supprimée, précisément pour
 * pouvoir prouver que la demande a été honorée.
 */
export async function desinscrire(jeton: string): Promise<string | null> {
  await assurerSchema();
  const [ligne] = await requete<{ email: string }>(
    `UPDATE abonnes SET desinscrit_le = now() WHERE jeton = $1 RETURNING email`,
    [jeton],
  );
  return ligne?.email ?? null;
}

/** Les destinataires d'un envoi : confirmés, non désinscrits, et eux seuls. */
export async function destinataires(): Promise<Abonne[]> {
  await assurerSchema();
  const lignes = await requete<LigneAbonne>(
    `SELECT * FROM abonnes
      WHERE confirme_le IS NOT NULL AND desinscrit_le IS NULL
      ORDER BY cree_le ASC`,
  );
  return lignes.map(versAbonne);
}

/** Tout, pour l'administration — y compris les inscriptions jamais confirmées. */
export async function listerAbonnes(limite = 500): Promise<Abonne[]> {
  await assurerSchema();
  const lignes = await requete<LigneAbonne>(
    `SELECT * FROM abonnes ORDER BY cree_le DESC LIMIT $1`,
    [limite],
  );
  return lignes.map(versAbonne);
}

/** Compte ce qui sert : confirmés d'un côté, en attente de l'autre. */
export async function compterAbonnes(): Promise<{ confirmes: number; enAttente: number }> {
  await assurerSchema();
  const [c] = await requete<{ confirmes: string; en_attente: string }>(
    `SELECT
       count(*) FILTER (WHERE confirme_le IS NOT NULL AND desinscrit_le IS NULL) AS confirmes,
       count(*) FILTER (WHERE confirme_le IS NULL AND desinscrit_le IS NULL)     AS en_attente
     FROM abonnes`,
  );
  return { confirmes: Number(c?.confirmes ?? 0), enAttente: Number(c?.en_attente ?? 0) };
}
