import { totaliser, type Devis } from './devis-modele';
import {
  AGENCE,
  mentionSiret,
  ACOMPTE_POURCENT,
  VALIDITE_JOURS,
  CLAUSE_PAIEMENT,
  CLAUSE_REFUS,
  CLAUSE_RETRACTATION,
  CLAUSE_DEBOURS,
} from './agence';

/**
 * Signature électronique du devis.
 *
 * Le droit français ne demande pas un prestataire agréé pour un engagement de
 * cet ordre. L'article 1367 du code civil reconnaît la signature électronique
 * dès lors qu'elle identifie son auteur et garantit le lien avec l'acte. Ce
 * qui compte devant un juge, c'est un faisceau de preuves : quel document
 * exactement a été accepté, par qui, quand, depuis où.
 *
 * D'où les trois pièces réunies ici :
 *
 * — `texteContrat` fige le devis sous une forme textuelle déterministe. Le
 *   rendu HTML change avec le code du site ; ce texte-là, non. C'est lui qui
 *   fait foi.
 * — `empreinte` en calcule le condensat SHA-256. Modifier un chiffre après
 *   coup change l'empreinte : l'intégrité se démontre, elle ne se promet pas.
 * — le code à usage unique envoyé par courriel fait passer la preuve de
 *   « quelqu'un a cliqué depuis cette adresse IP » à « le titulaire de cette
 *   boîte mail a accepté, à cette heure ».
 *
 * Le module n'utilise que l'API Web Crypto, présente aussi bien dans Node que
 * dans l'exécution en périphérie : aucune dépendance au serveur.
 */

/** Durée de vie d'un code à usage unique. */
export const CODE_VALIDITE_MINUTES = 15;

/** Au-delà, le code est brûlé et il faut en demander un autre. */
export const CODE_TENTATIVES_MAX = 5;

/** Délai minimal entre deux envois, pour ne pas servir de robinet à courriels. */
export const CODE_DELAI_RENVOI_SECONDES = 60;

// ─── DOCUMENT FIGÉ ────────────────────────────────────────────────────────────

function euros(montant: number): string {
  return `${montant.toFixed(2)} EUR`;
}

/**
 * Le devis sous sa forme canonique : celle qui est signée, et celle dont on
 * calcule l'empreinte.
 *
 * Volontairement pauvre en mise en forme et indépendante de la locale. Une
 * date affichée « 17 septembre 2026 » dépend de la version de Node et de la
 * base de données de locales ; l'horodatage ISO, lui, ne bouge jamais. Deux
 * exécutions à deux ans d'écart doivent produire, au caractère près, le même
 * texte à partir du même devis — sans quoi l'empreinte ne prouve rien.
 */
export function texteContrat(devis: Devis): string {
  const t = totaliser(devis);
  const d = devis.dossier;
  const l: string[] = [];

  l.push('DEVIS — ACCOMPAGNEMENT ADMINISTRATIF VISA DTV');
  l.push(`Numéro : ${devis.numero}`);
  l.push(`Établi le : ${devis.creeLe}`);
  l.push(`Validité : ${VALIDITE_JOURS} jours à compter de l'établissement`);
  l.push('');

  l.push('PRESTATAIRE');
  l.push(`${AGENCE.nom} — ${AGENCE.enseigne}`);
  l.push(`${AGENCE.adresse}, ${AGENCE.codePostal} ${AGENCE.ville}, ${AGENCE.pays}`);
  l.push(mentionSiret());
  l.push(AGENCE.email);
  l.push(AGENCE.mentionTva);
  l.push('');

  l.push('CLIENT');
  l.push(devis.client.nom || '(non renseigné)');
  l.push(devis.client.adresse || '(adresse non renseignée)');
  l.push(devis.client.email || '(courriel non renseigné)');
  if (devis.client.telephone) l.push(devis.client.telephone);
  l.push('');

  l.push('DOSSIER');
  l.push(`Personnes : ${d.personnes} (${d.adultes} adulte(s), ${d.enfants} enfant(s))`);
  l.push(`Voie : ${d.softPower ? 'Soft Power (école certifiée)' : 'Activité à distance'}`);
  l.push(`Formule : ${d.formule}`);
  l.push('Lieu de dépôt : ambassade de Thaïlande à Paris');
  l.push(`Destination : ${d.destination || '(non précisée)'}`);
  l.push(`Épargne à justifier : ${t.fondsThb} pour le foyer`);
  l.push('');

  l.push('1. HONORAIRES D’ACCOMPAGNEMENT');
  l.push(`Accompagnement complet du dossier : ${euros(t.honoraires)}`);
  l.push(`Acompte à la signature (${ACOMPTE_POURCENT} %) : ${euros(t.acompte)}`);
  l.push(`Solde au dépôt du dossier : ${euros(t.solde)}`);
  l.push('');

  l.push('2. FRAIS EXTERNES (réglés par le client aux tiers)');
  for (const ligne of devis.debours) {
    const montant = Math.round(ligne.quantite * ligne.unitaire);
    l.push(`- ${ligne.libelle} : ${ligne.quantite} × ${euros(ligne.unitaire)} = ${euros(montant)}`);
    if (ligne.detail) l.push(`  (${ligne.detail})`);
  }
  l.push(`Sous-total des frais externes : ${euros(t.debours)}`);
  l.push('');

  l.push('SYNTHÈSE');
  l.push(`Budget total de l'opération : ${euros(t.total)}`);
  l.push(`Dont montant dû au prestataire : ${euros(t.honoraires)}`);
  l.push('');

  l.push('CONDITIONS');
  l.push(`Paiement. ${CLAUSE_PAIEMENT}`);
  l.push(`Frais externes. ${CLAUSE_DEBOURS}`);
  l.push(`Refus consulaire. ${CLAUSE_REFUS}`);
  l.push(`Droit de rétractation. ${CLAUSE_RETRACTATION}`);
  l.push(
    "Portée. Un accompagnement administratif n'est pas une garantie de délivrance : " +
      'la décision appartient au seul poste consulaire. Le présent document ne ' +
      'constitue pas un contrat de voyage.',
  );

  return l.join('\n');
}

// ─── EMPREINTE ────────────────────────────────────────────────────────────────

function hexa(tampon: ArrayBuffer): string {
  return Array.from(new Uint8Array(tampon))
    .map((octet) => octet.toString(16).padStart(2, '0'))
    .join('');
}

/** Condensat SHA-256 d'un texte, en hexadécimal minuscule. */
export async function empreinte(texte: string): Promise<string> {
  const condensat = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(texte));
  return hexa(condensat);
}

/** La même empreinte, coupée en groupes de huit pour être recopiable à la main. */
export function empreinteLisible(valeur: string): string {
  return (valeur.match(/.{1,8}/g) ?? []).join(' ');
}

// ─── CODE À USAGE UNIQUE ──────────────────────────────────────────────────────

/**
 * Six chiffres tirés du générateur cryptographique.
 *
 * Le tirage est rejeté au-delà du dernier multiple entier d'un million : un
 * simple modulo rendrait les premières valeurs très légèrement plus probables,
 * et il ne coûte rien de ne pas introduire ce biais.
 */
export function genererCode(): string {
  const plafond = Math.floor(0xffffffff / 1_000_000) * 1_000_000;
  const tampon = new Uint32Array(1);
  do {
    crypto.getRandomValues(tampon);
  } while (tampon[0] >= plafond);
  return String(tampon[0] % 1_000_000).padStart(6, '0');
}

/**
 * Ce qui est stocké en base, à la place du code.
 *
 * Le jeton du devis entre dans le calcul : un code intercepté ne vaut que pour
 * le devis auquel il était destiné. Aucun secret d'application n'est nécessaire
 * — le jeton fait déjà 128 bits d'aléa, et faire dépendre la signature d'une
 * variable d'environnement, c'est se donner un moyen de plus de tout casser.
 */
export async function empreinteCode(jeton: string, code: string): Promise<string> {
  return empreinte(`${jeton}:${code.trim()}`);
}

// ─── VALIDITÉ ─────────────────────────────────────────────────────────────────

/** Date limite d'acceptation : au-delà, l'offre est caduque. */
export function dateLimite(devis: Devis): Date {
  const d = new Date(devis.creeLe);
  d.setDate(d.getDate() + VALIDITE_JOURS);
  return d;
}

/**
 * Vrai lorsque le délai de validité est passé.
 *
 * Laisser signer un devis périmé paraîtrait accommodant, mais engagerait sur
 * des montants calculés à un cours du baht et à des frais consulaires
 * dépassés. Mieux vaut refuser et en réémettre un.
 */
export function devisExpire(devis: Devis): boolean {
  return Date.now() > dateLimite(devis).getTime();
}

/** Fin du délai de rétractation, à compter de l'acceptation. */
export function finRetractation(signeLe: string, jours: number): Date {
  const d = new Date(signeLe);
  d.setDate(d.getDate() + jours);
  return d;
}
