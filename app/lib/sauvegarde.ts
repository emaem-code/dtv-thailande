import { listerDevis } from './devis';
import { listerLeads } from './leads';
import { AGENCE } from './agence';

/**
 * Export complet de ce qui ne se reconstitue pas.
 *
 * Le site se redéploie depuis git en trois minutes ; la base, non. Elle
 * contient les contrats acceptés, leur texte exact et leur empreinte — c'est-
 * à-dire la seule preuve de ce qui a été convenu avec chaque client. Une offre
 * gratuite qui ferme, une suppression de projet, une erreur de manipulation,
 * et il ne reste rien d'opposable.
 *
 * Le format est du JSON lisible plutôt qu'un dump Postgres : il se relit dans
 * n'importe quel éditeur, se recharge sans serveur du même type, et reste
 * compréhensible dans cinq ans. Une sauvegarde qu'on ne sait pas relire n'est
 * pas une sauvegarde.
 */

export type Sauvegarde = {
  /** Version du format, pour qu'un futur lecteur sache à quoi il a affaire. */
  format: 1;
  genereLe: string;
  agence: { nom: string; enseigne: string; siret: string };
  compte: { devis: number; signes: number; leads: number };
  devis: unknown[];
  leads: unknown[];
};

/**
 * Rassemble tout, sans limite de nombre.
 *
 * Les fonctions de listing ont un plafond par défaut, pensé pour l'affichage
 * d'une page d'administration. Une sauvegarde partielle serait pire qu'aucune,
 * puisqu'elle inspire la même confiance : on demande donc explicitement un
 * plafond hors d'atteinte.
 */
export async function construireSauvegarde(): Promise<Sauvegarde> {
  const [devis, leads] = await Promise.all([listerDevis(100000), listerLeads(100000)]);

  return {
    format: 1,
    genereLe: new Date().toISOString(),
    agence: { nom: AGENCE.nom, enseigne: AGENCE.enseigne, siret: AGENCE.siret },
    compte: {
      devis: devis.length,
      signes: devis.filter((d) => d.signature).length,
      leads: leads.length,
    },
    devis,
    leads,
  };
}

/** Nom de fichier daté, pour que plusieurs sauvegardes se rangent d'elles-mêmes. */
export function nomFichierSauvegarde(genereLe: string): string {
  return `dtv-sauvegarde-${genereLe.slice(0, 10)}.json`;
}

export function sauvegardeEnJson(s: Sauvegarde): string {
  return JSON.stringify(s, null, 2);
}
