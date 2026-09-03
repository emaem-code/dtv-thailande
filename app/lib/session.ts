/**
 * Session de l'espace d'administration.
 *
 * Un cookie signé, pas de base de sessions : il n'y a qu'un seul utilisateur.
 * La signature utilise l'API Web Crypto plutôt que le module `crypto` de Node,
 * afin que le même code serve dans le middleware — qui s'exécute sur le
 * moteur allégé de Vercel, où `crypto` n'existe pas.
 */

export const NOM_COOKIE = 'dtv_admin';

/** Durée de vie de la session, en secondes. Douze heures : une journée de travail. */
export const DUREE_SESSION = 12 * 60 * 60;

function encodeur(): TextEncoder {
  return new TextEncoder();
}

async function cle(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    encodeur().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

function versBase64Url(octets: ArrayBuffer): string {
  let binaire = '';
  const vue = new Uint8Array(octets);
  for (let i = 0; i < vue.length; i += 1) binaire += String.fromCharCode(vue[i]);
  return btoa(binaire).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** Fabrique la valeur du cookie : date d'expiration, puis sa signature. */
export async function signerSession(secret: string, maintenant = Date.now()): Promise<string> {
  const expiration = Math.floor(maintenant / 1000) + DUREE_SESSION;
  const charge = String(expiration);
  const signature = await crypto.subtle.sign('HMAC', await cle(secret), encodeur().encode(charge));
  return `${charge}.${versBase64Url(signature)}`;
}

/**
 * Vérifie un cookie de session.
 *
 * La comparaison passe par `crypto.subtle.verify`, dont le temps d'exécution
 * ne dépend pas de l'endroit où deux signatures diffèrent — une comparaison de
 * chaînes ordinaire laisserait fuir l'information caractère par caractère.
 */
export async function verifierSession(secret: string, valeur: string | undefined): Promise<boolean> {
  if (!valeur) return false;

  const separateur = valeur.lastIndexOf('.');
  if (separateur <= 0) return false;

  const charge = valeur.slice(0, separateur);
  const signature = valeur.slice(separateur + 1);

  const expiration = Number(charge);
  if (!Number.isFinite(expiration) || expiration * 1000 < Date.now()) return false;

  let octets: Uint8Array;
  try {
    const binaire = atob(signature.replace(/-/g, '+').replace(/_/g, '/'));
    octets = Uint8Array.from(binaire, (c) => c.charCodeAt(0));
  } catch {
    return false;
  }

  return crypto.subtle.verify(
    'HMAC',
    await cle(secret),
    octets as unknown as ArrayBuffer,
    encodeur().encode(charge),
  );
}

/**
 * Compare deux chaînes en temps constant.
 * Utilisée pour le mot de passe, qui ne passe pas par HMAC.
 */
export function egalConstant(a: string, b: string): boolean {
  const octetsA = encodeur().encode(a);
  const octetsB = encodeur().encode(b);
  // La longueur reste observable ; le contenu, non. C'est le compromis usuel.
  if (octetsA.length !== octetsB.length) return false;
  let ecart = 0;
  for (let i = 0; i < octetsA.length; i += 1) ecart |= octetsA[i] ^ octetsB[i];
  return ecart === 0;
}
