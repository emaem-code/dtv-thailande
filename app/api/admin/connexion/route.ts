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
  const secret = process.env.ADMIN_SECRET;
  const attendu = process.env.ADMIN_MOT_DE_PASSE;

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

  if (!egalConstant(motDePasse, attendu)) {
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
