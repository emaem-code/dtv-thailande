import { NextResponse } from 'next/server';
import { NOM_COOKIE, DUREE_SESSION, signerSession, egalConstant } from '../../../lib/session';

export const runtime = 'nodejs';

/**
 * Ouverture de session.
 *
 * Le délai imposé avant chaque réponse d'échec vaut freinage : sans base de
 * tentatives à tenir, c'est la mesure la plus simple qui rende une attaque par
 * dictionnaire impraticable sur un mot de passe unique.
 */
const DELAI_ECHEC_MS = 800;

export async function POST(requete: Request) {
  const secret = process.env.ADMIN_SECRET?.trim();

  /**
   * Les espaces en bordure sont retirés de part et d'autre.
   *
   * Un mot de passe collé dans l'interface d'un hébergeur y entraîne très
   * souvent une espace ou un retour à la ligne invisible. La comparaison étant
   * stricte au caractère près, aucune saisie ne correspondrait plus jamais, et
   * le symptôme — « le mot de passe est pourtant le bon » — est indéchiffrable
   * pour qui le subit. Un mot de passe dont les espaces de bordure sont
   * signifiants n'existe pas en pratique : le compromis est sans coût.
   */
  const attendu = process.env.ADMIN_MOT_DE_PASSE?.trim();

  if (!secret || !attendu) {
    return NextResponse.json(
      {
        erreur:
          "L'espace d'administration n'est pas configuré : ADMIN_SECRET et " +
          'ADMIN_MOT_DE_PASSE doivent être définies dans les variables ' +
          "d'environnement du projet.",
      },
      { status: 503 },
    );
  }

  let motDePasse = '';
  try {
    const corps = (await requete.json()) as { motDePasse?: unknown };
    if (typeof corps.motDePasse === 'string') motDePasse = corps.motDePasse;
  } catch {
    /* corps illisible : traité comme un échec */
  }

  if (!egalConstant(motDePasse.trim(), attendu)) {
    await new Promise((resoudre) => setTimeout(resoudre, DELAI_ECHEC_MS));
    return NextResponse.json({ erreur: 'Mot de passe incorrect.' }, { status: 401 });
  }

  const reponse = NextResponse.json({ ok: true });
  reponse.cookies.set({
    name: NOM_COOKIE,
    value: await signerSession(secret),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: DUREE_SESSION,
  });
  return reponse;
}

/** Fermeture de session : on efface le cookie. */
export async function DELETE() {
  const reponse = NextResponse.json({ ok: true });
  reponse.cookies.set({ name: NOM_COOKIE, value: '', path: '/', maxAge: 0 });
  return reponse;
}
