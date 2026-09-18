import { totaliser, type Devis } from './devis-modele';
import { VALIDITE_JOURS, ACOMPTE_POURCENT } from './agence';
import { gabarit, echapper, signatureHtml, signatureTexte } from './courriel';

/**
 * Le courriel de relance, sept jours après l'envoi du devis.
 *
 * Trois règles ont guidé sa rédaction, et elles valent mieux que n'importe
 * quelle astuce de conversion :
 *
 * — il rappelle une échéance réelle, la date de validité, plutôt que
 *   d'inventer une urgence ;
 * — il offre une sortie explicite. « Si ce n'est plus d'actualité, dites-le
 *   moi » coûte un client qui ne serait pas venu de toute façon, et épargne à
 *   l'autre le sentiment d'être poursuivi ;
 * — il ne répète pas le devis. Le client l'a déjà reçu ; le lui resservir en
 *   entier donnerait l'impression qu'on ne se souvient pas de lui avoir écrit.
 */

function euros(montant: number): string {
  return `${montant.toLocaleString('fr-FR').replace(/ | /g, ' ')} €`;
}

function dateFr(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Dernier jour de validité, à partir de la date d'établissement. */
export function finValidite(creeLe: string): string {
  const d = new Date(creeLe);
  d.setDate(d.getDate() + VALIDITE_JOURS);
  return d.toISOString();
}

export function courrielRelance(devis: Devis, lien: string) {
  const t = totaliser(devis);
  const prenom = devis.client.nom.split(' ')[0] || '';
  const limite = dateFr(finValidite(devis.creeLe));
  const aOptions = devis.options.length > 0;

  const rappelMontant = aOptions
    ? 'Les formules et les montants n’ont pas bougé, et ils ne bougeront pas d’ici là.'
    : `Mes honoraires restent à ${euros(t.honoraires)}, dont ${euros(t.acompte)} ` +
      `(${ACOMPTE_POURCENT} %) à la signature, et ils ne bougeront pas d’ici là.`;

  const texte = `${prenom ? `Bonjour ${prenom},` : 'Bonjour,'}

Je reviens vers vous au sujet du devis ${devis.numero}, que je vous ai adressé
il y a une semaine. Sans nouvelles, je préfère m'assurer qu'il vous est bien
parvenu — un courriel se perd vite.

Vous pouvez le relire et le signer ici :
${lien}

Il reste valable jusqu'au ${limite}. ${rappelMontant}

Si un point vous retient, dites-le moi simplement en répondant à ce message :
il vaut mieux ajuster un devis que le laisser expirer. Et si votre projet a
changé ou n'est plus d'actualité, dites-le moi aussi — je n'y reviendrai pas.

${signatureTexte()}
`;

  const html = gabarit(`
<p style="margin:0 0 16px 0;">${prenom ? `Bonjour ${echapper(prenom)},` : 'Bonjour,'}</p>
<p style="margin:0 0 20px 0;">Je reviens vers vous au sujet du devis <strong>${echapper(devis.numero)}</strong>, que je vous ai adressé il y a une semaine. Sans nouvelles, je préfère m’assurer qu’il vous est bien parvenu — un courriel se perd vite.</p>
<p style="margin:0 0 20px 0;text-align:center;">
  <a href="${lien}" style="display:inline-block;background:#b45309;color:#ffffff;text-decoration:none;font-weight:bold;padding:14px 28px;border-radius:999px;">Relire et signer le devis</a>
</p>
<p style="margin:0 0 24px 0;padding:14px 16px;background:#fef3c7;border-radius:8px;font-size:14px;line-height:1.6;">
  Il reste valable jusqu’au <strong>${limite}</strong>. ${rappelMontant}
</p>
<p style="margin:0 0 28px 0;font-size:15px;">Si un point vous retient, dites-le moi simplement en répondant à ce message : il vaut mieux ajuster un devis que le laisser expirer. Et si votre projet a changé ou n’est plus d’actualité, dites-le moi aussi — je n’y reviendrai pas.</p>
${signatureHtml()}`);

  return {
    sujet: `Votre devis ${devis.numero} — toujours d’actualité ?`,
    texte,
    html,
  };
}
