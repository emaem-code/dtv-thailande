import { postesConsulaires, regleNationaleDtv, type Information, type PosteConsulaire } from './postes-consulaires';

export type PosteId = PosteConsulaire['id'];
export const lirePoste = (id: PosteId) => postesConsulaires.find((poste) => poste.id === id)!;

/** Les pays viennent des sources ; un annuaire MFA n'est pas un routage e-Visa. */
export const PAYS_RESIDENCE = postesConsulaires.flatMap((poste) =>
  (poste.juridiction.valeur?.pays ?? []).map((pays) => ({
    valeur: pays,
    libelle: pays === 'France' ? 'France métropolitaine' : pays,
  })),
).sort((a, b) => a.libelle.localeCompare(b.libelle, 'fr'));

export function postePourResidence(pays?: string): PosteConsulaire | null {
  if (!pays || pays === 'autre') return null;
  return postesConsulaires.find((poste) => poste.juridiction.valeur?.pays.includes(pays)) ?? null;
}

export function residenceAConfirmer(pays?: string): boolean {
  const poste = postePourResidence(pays);
  return !poste || poste.juridiction.valeur?.perimetre !== 'visas' ||
    poste.depotNationaliteOuResidence.conditionLocale.valeur === null;
}

export type PointConsulaire = { champ: string; information: Information<unknown> };

/** Les inconnues restent consultables, y compris lorsqu'elles ne servent pas au calcul. */
export function informationsInconnues(poste: PosteConsulaire): PointConsulaire[] {
  const resultat: PointConsulaire[] = [];
  function parcourir(objet: object, chemin = '') {
    for (const [cle, valeur] of Object.entries(objet)) {
      if (!valeur || typeof valeur !== 'object') continue;
      const champ = chemin ? `${chemin}.${cle}` : cle;
      if ('valeur' in valeur) {
        if (valeur.valeur === null) resultat.push({ champ, information: valeur });
      } else if (!Array.isArray(valeur)) parcourir(valeur, champ);
    }
  }
  parcourir(poste);
  return resultat;
}

/** Seul repli autorisé : l'historique national, jamais un montant manquant. */
export function historiquePourPoste(poste: PosteConsulaire) {
  const local = poste.fonds.moisDeReleves.valeur !== null;
  return {
    information: local ? poste.fonds.moisDeReleves : regleNationaleDtv.moisDeReleves,
    origine: local ? `poste de ${poste.nom}` : 'portail national e-Visa (non publié par ce poste)',
  };
}
