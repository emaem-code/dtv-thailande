import { FONDS_EUR_PARIS, eurosFoyerParis, fondsFoyerThb, formateEuros, formateThb } from '../lib/taux';

/**
 * Le montant d'épargne à justifier, tel que l'ambassade de Paris l'exige.
 *
 * Ce composant interrogeait autrefois une API de change pour convertir les
 * 500 000 THB de la règle nationale en euros. C'était une erreur de fond, pas
 * un détail d'affichage : Paris n'applique pas la conversion du jour, le poste
 * publie son propre montant EN EUROS — 15 000 € par personne et par mois sur
 * les trois derniers mois. Au cours de 2026, la conversion affichait environ
 * 13 100 €, soit près de deux mille euros SOUS l'exigence réelle. Un lecteur
 * qui calibrait son relevé sur ce chiffre se présentait en dessous du seuil.
 *
 * Le montant ne dépendant plus d'aucun cours, le composant n'a plus besoin
 * d'état ni d'effet : il rend la même valeur côté serveur et côté navigateur,
 * ce qui le rend aussi indexable et supprime le décalage de mise en page.
 *
 * Le seuil s'applique à chaque personne du foyer : `personnes` permet
 * d'afficher le montant réellement exigé d'une famille.
 */
export default function MontantFonds({
  prefixe = '',
  ajout = 0,
  personnes = 1,
}: {
  prefixe?: string;
  /** Nombre de personnes du foyer, accompagnants compris. */
  personnes?: number;
  /**
   * Somme ajoutée au montant affiché, en euros.
   * Sert aux exemples pédagogiques du type « un relevé à 50 € au-dessus du
   * seuil », pour que les deux montants restent calés l'un sur l'autre.
   */
  ajout?: number;
}) {
  return (
    <span
      title={`${formateEuros(FONDS_EUR_PARIS)} par personne, exigés par l'ambassade de Paris — règle nationale : ${formateThb(fondsFoyerThb(personnes))}`}
    >
      {prefixe}
      {formateEuros(eurosFoyerParis(personnes) + ajout)}
    </span>
  );
}
