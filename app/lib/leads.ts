import { requete, assurerSchema } from './db';

/**
 * Enregistrement des demandes issues du test d'éligibilité.
 *
 * Le formulaire continue d'envoyer chaque demande à Formspree, qui reste la
 * ligne de sécurité : si l'écriture ci-dessous échoue — base indisponible,
 * variable d'environnement absente — le lead arrive quand même par courriel.
 * L'admin est un confort de travail, jamais un point de défaillance.
 */

export type Lead = {
  id: number;
  creeLe: string;
  prenom: string;
  email: string;
  telephone: string;
  nationalite: string;
  statutPro: string;
  foyer: string;
  personnes: number;
  softPower: boolean;
  formule: string;
  traite: boolean;
  donnees: Record<string, string>;
};

type LigneLead = {
  id: number;
  cree_le: Date;
  prenom: string | null;
  email: string | null;
  telephone: string | null;
  nationalite: string | null;
  statut_pro: string | null;
  foyer: string | null;
  personnes: number;
  soft_power: boolean;
  formule: string | null;
  traite: boolean;
  donnees: Record<string, string>;
};

function versLead(l: LigneLead): Lead {
  return {
    id: l.id,
    creeLe: l.cree_le.toISOString(),
    prenom: l.prenom ?? '',
    email: l.email ?? '',
    telephone: l.telephone ?? '',
    nationalite: l.nationalite ?? '',
    statutPro: l.statut_pro ?? '',
    foyer: l.foyer ?? '',
    personnes: l.personnes,
    softPower: l.soft_power,
    formule: l.formule ?? '',
    traite: l.traite,
    donnees: l.donnees ?? {},
  };
}

/**
 * Durée de conservation.
 *
 * Un lead comporte un nom, un téléphone et une situation d'épargne. Annoncer
 * une durée et la tenir est ce que le RGPD attend ; la purge se déclenche à
 * chaque écriture, ce qui évite d'avoir à programmer une tâche séparée.
 */
export const CONSERVATION_MOIS = 24;

export async function enregistrerLead(champs: {
  prenom?: string;
  email?: string;
  telephone?: string;
  nationalite?: string;
  statutPro?: string;
  foyer?: string;
  personnes?: number;
  softPower?: boolean;
  formule?: string;
  donnees?: Record<string, string>;
}): Promise<number | null> {
  await assurerSchema();

  const [ligne] = await requete<{ id: number }>(
    `INSERT INTO leads
       (prenom, email, telephone, nationalite, statut_pro, foyer, personnes, soft_power, formule, donnees)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING id`,
    [
      champs.prenom ?? null,
      champs.email ?? null,
      champs.telephone ?? null,
      champs.nationalite ?? null,
      champs.statutPro ?? null,
      champs.foyer ?? null,
      Math.max(1, champs.personnes ?? 1),
      champs.softPower ?? false,
      champs.formule ?? null,
      JSON.stringify(champs.donnees ?? {}),
    ],
  );

  await requete(
    `DELETE FROM leads WHERE cree_le < now() - ($1 || ' months')::interval`,
    [String(CONSERVATION_MOIS)],
  );

  return ligne?.id ?? null;
}

export async function listerLeads(limite = 200): Promise<Lead[]> {
  await assurerSchema();
  const lignes = await requete<LigneLead>(
    `SELECT * FROM leads ORDER BY cree_le DESC LIMIT $1`,
    [limite],
  );
  return lignes.map(versLead);
}

export async function lireLead(id: number): Promise<Lead | null> {
  await assurerSchema();
  const [ligne] = await requete<LigneLead>(`SELECT * FROM leads WHERE id = $1`, [id]);
  return ligne ? versLead(ligne) : null;
}

export async function marquerTraite(id: number, traite: boolean): Promise<void> {
  await assurerSchema();
  await requete(`UPDATE leads SET traite = $2 WHERE id = $1`, [id, traite]);
}
