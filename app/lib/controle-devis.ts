import { informationsInconnues, postePourResidence, historiquePourPoste } from './residence-consulaire';
import { coursValide, fondsPourPoste, type CoursDevis } from './taux';
import type { Information } from './postes-consulaires';

export type ResidenceDevis = { paysResidence?: string; cours?: CoursDevis | null };

/** Le serveur et l'administration appliquent le même refus, sans repli vers Paris. */
export function controleDevis(dossier: ResidenceDevis) {
  const poste = postePourResidence(dossier.paysResidence);
  const manques: string[] = [];
  if (!poste) {
    manques.push(dossier.paysResidence
      ? 'Poste compétent non établi pour ce pays ou territoire : examen manuel nécessaire.'
      : 'Pays exact de résidence manquant. Confirmez-le avec le client.');
  } else {
    const requis: [string, Information<unknown>][] = [
      ['Juridiction du poste', poste.juridiction],
      ['Conditions locales de résidence et pièces DTV actualisées', poste.depotNationaliteOuResidence.conditionLocale],
      ['Montant des fonds publié', poste.fonds.minimumPublie],
      ['Durée de l’historique bancaire (poste ou portail national)', historiquePourPoste(poste).information],
      ['Frais consulaires', poste.fraisConsulaires],
    ];
    for (const [nom, information] of requis) {
      if (information.valeur === null) manques.push(`${nom} : ${information.note ?? 'information non établie'}`);
    }
    if (poste.juridiction.valeur?.perimetre !== 'visas') {
      manques.push('Juridiction e-Visa/DTV actuelle non confirmée ; un annuaire diplomatique ne suffit pas.');
    }
    if (poste.fraisConsulaires.valeur?.devise !== 'EUR' && !coursValide(dossier.cours)) {
      manques.push('Cours de change daté indisponible pour estimer les frais consulaires en euros.');
    }
  }
  return {
    poste, manques,
    reserves: poste ? informationsInconnues(poste) : [],
    autorise: manques.length === 0,
    message: manques.length ? `Devis bloqué — ${poste?.nom ?? dossier.paysResidence ?? 'résidence à préciser'}. ${manques.join(' ')}` : '',
  };
}

export class DevisConsulaireError extends Error {
  constructor(message: string) { super(message); this.name = 'DevisConsulaireError'; }
}

export function verifierDevisConsulaire(dossier: ResidenceDevis) {
  const controle = controleDevis(dossier);
  if (!controle.autorise) throw new DevisConsulaireError(controle.message);
  return controle.poste!;
}

export function resumeFonds(dossier: ResidenceDevis & { personnes: number }) {
  const poste = postePourResidence(dossier.paysResidence);
  if (!poste) return 'Poste et montant à confirmer après vérification du pays de résidence.';
  const fonds = fondsPourPoste(poste.id, dossier.personnes, dossier.cours);
  const individuel = fondsPourPoste(poste.id, 1, dossier.cours);
  return [
    `Poste de ${poste.nom}. Montant publié par demandeur : ${individuel.texte}.`,
    `Pour ${dossier.personnes} demandeur(s) : ${fonds.texte}.`,
    poste.fonds.conditions.valeur ?? 'Conditions des justificatifs financiers à confirmer auprès du poste.',
    `Historique demandé : ${historiquePourPoste(poste).information.valeur ?? 'à confirmer'} mois — source : ${historiquePourPoste(poste).origine}.`,
    individuel.marge ? `Marge conseillée par demandeur : ${individuel.marge} (conseil de budget, pas une exigence consulaire).` : '',
    individuel.conversion ? `La conversion est indicative ; le poste ne publie pas de seuil en ${individuel.conversion.montant.devise}.` : '',
  ].filter(Boolean).join(' ');
}
