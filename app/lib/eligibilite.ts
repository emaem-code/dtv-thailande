/**
 * Classement d'un lead — ce qui mérite qu'on lâche ce qu'on fait.
 *
 * Une alerte qui sonne pour tout ne sonne bientôt plus pour rien. Un prospect
 * dont l'épargne est constituée, le passeport valide et le dossier vierge vaut
 * qu'on s'arrête ; quelqu'un qui n'a ni fonds ni passeport mérite une réponse,
 * mais pas dans la minute.
 *
 * Le classement se fait sur les valeurs BRUTES du formulaire, pas sur les
 * libellés affichés. Lire « Oui, sur un compte accessible » pour en déduire
 * l'éligibilité marcherait aujourd'hui et casserait à la première reformulation
 * — et casserait en silence, ce qui est pire.
 */

export type Criteres = {
  /** yes | soon | no */
  funds?: string;
  /** yes | soon | no */
  passport?: string;
  /** premiere | en-cours | refus */
  dejaDepose?: string;
  /** oui | non */
  enfantsMoins20?: string;
  /** marie | pacs | union-libre | mariage-en-cours */
  situationConjugale?: string;
};

export type Niveau = 'eligible' | 'a-travailler' | 'bloque';

export type Classement = {
  niveau: Niveau;
  /** Symbole en tête d'alerte : le tri doit se faire à l'œil, sans lire. */
  icone: string;
  libelle: string;
  /**
   * Ce qui coince, en clair.
   *
   * Non pas pour décorer l'alerte, mais parce que c'est exactement ce qu'il
   * faudra traiter dans la réponse : les avoir sous les yeux dès la
   * notification évite de rouvrir le dossier pour les retrouver.
   */
  reserves: string[];
};

/**
 * Deux critères, et deux seulement, rendent un dossier infaisable aujourd'hui :
 * pas de fonds, ou pas de passeport. Tout le reste se travaille — une épargne
 * en cours de constitution se complète, un refus antérieur se documente, un
 * PACS se transforme en deux dossiers.
 */
export function classerLead(c: Criteres): Classement {
  const reserves: string[] = [];
  let bloque = false;

  if (c.funds === 'no') {
    reserves.push('Épargne hors de portée — le seuil de 15 000 € par personne n’est pas atteignable');
    bloque = true;
  } else if (c.funds === 'soon') {
    reserves.push('Épargne en cours de constitution — compter trois mois d’antériorité après');
  }

  if (c.passport === 'no') {
    reserves.push('Pas de passeport — rien ne peut démarrer avant');
    bloque = true;
  } else if (c.passport === 'soon') {
    reserves.push('Passeport à refaire — à lancer tout de suite, c’est le plus long');
  }

  if (c.dejaDepose === 'refus') {
    reserves.push('Demande déjà refusée — il faudra comprendre le motif avant de redéposer');
  } else if (c.dejaDepose === 'en-cours') {
    reserves.push('Une demande est déjà en cours');
  }

  if (c.enfantsMoins20 === 'non') {
    reserves.push('Un enfant a 20 ans ou plus — il ne peut pas être rattaché, dossier séparé');
  }

  if (c.situationConjugale === 'pacs' || c.situationConjugale === 'union-libre') {
    reserves.push('Pas de mariage civil — aucun rattachement possible, deux dossiers principaux');
  }

  if (bloque) {
    return { niveau: 'bloque', icone: '⛔', libelle: 'Non éligible en l’état', reserves };
  }
  if (reserves.length > 0) {
    return { niveau: 'a-travailler', icone: '🟡', libelle: 'Éligible sous réserve', reserves };
  }
  return { niveau: 'eligible', icone: '🟢', libelle: 'Éligible', reserves };
}
