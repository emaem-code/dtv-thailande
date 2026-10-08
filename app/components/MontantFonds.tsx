import { fondsPourPoste, type CoursDevis } from '../lib/taux';
import { lirePoste, type PosteId } from '../lib/residence-consulaire';

export default function MontantFonds({
  prefixe = '', ajout = 0, personnes = 1, posteId = 'paris', cours, detail = false,
}: {
  prefixe?: string;
  personnes?: number;
  ajout?: number;
  /** Les articles existants décrivent Paris ; le formulaire fournit toujours son poste. */
  posteId?: PosteId | null;
  cours?: CoursDevis | null;
  detail?: boolean;
}) {
  if (!posteId) return <span>Montant à confirmer selon votre résidence</span>;
  const poste = lirePoste(posteId);
  const repere = fondsPourPoste(posteId, personnes, cours, ajout);
  return (
    <span title={`Montant publié par le poste de ${poste.nom}`}>
      {prefixe}{repere.texte}{detail && personnes === 1 && ' par demandeur.'}
      {detail && <>
        {repere.marge && <span className="block text-sm mt-2">
          Marge conseillée : {repere.marge}. Ce conseil ne modifie pas le montant exigé.
        </span>}
        {repere.conversion && <span className="block text-sm">
          Conversion indicative pour votre budget, pas un seuil consulaire en devise locale.{' '}
          <a href={repere.conversion.cours.source} target="_blank" rel="noreferrer" className="underline">Cours de change</a>.
        </span>}
        {!repere.conversion && poste.fonds.minimumEnDeviseLocale.valeur === null &&
          <span className="block text-sm">Conversion datée indisponible : seul le montant publié est affiché.</span>}
        {repere.information.sources.slice(0, 1).map((source) => <a key={source.url} href={source.url}
          target="_blank" rel="noreferrer" className="block text-sm underline mt-2">
          Source officielle — {poste.nom} (consultée le {source.dateConsultation.split('-').reverse().join('/')})
        </a>)}
      </>}
    </span>
  );
}
