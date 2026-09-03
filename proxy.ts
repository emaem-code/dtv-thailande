import { NextResponse, type NextRequest } from 'next/server';
import { NOM_COOKIE, verifierSession } from './app/lib/session';

/**
 * Protège l'espace d'administration.
 *
 * Le filtrage se fait ici plutôt que dans chaque page : une route ajoutée plus
 * tard sous /admin est protégée d'office, sans qu'on ait à y penser.
 *
 * Next 16 a renommé cette convention « middleware » en « proxy » ; le nom de
 * fichier et l'export par défaut suivent la nouvelle forme.
 *
 * Si ADMIN_SECRET est absente, l'accès est refusé au lieu d'être ouvert. Une
 * variable d'environnement oubliée doit fermer la porte, jamais l'inverse.
 */
export default async function proxy(requete: NextRequest) {
  const chemin = requete.nextUrl.pathname;

  // La page de connexion et son point d'entrée doivent rester accessibles,
  // sans quoi il n'y aurait aucun moyen d'obtenir un cookie.
  if (chemin === '/admin/connexion' || chemin === '/api/admin/connexion') {
    return NextResponse.next();
  }

  const secret = process.env.ADMIN_SECRET;
  const valide = secret
    ? await verifierSession(secret, requete.cookies.get(NOM_COOKIE)?.value)
    : false;

  if (valide) return NextResponse.next();

  // Une requête d'interface reçoit une redirection ; un appel de données reçoit
  // un code 401, qu'il puisse le traiter au lieu d'afficher du HTML.
  if (chemin.startsWith('/api/')) {
    return NextResponse.json({ erreur: 'Session expirée ou absente.' }, { status: 401 });
  }

  const destination = requete.nextUrl.clone();
  destination.pathname = '/admin/connexion';
  destination.search = chemin === '/admin' ? '' : `?suite=${encodeURIComponent(chemin)}`;
  return NextResponse.redirect(destination);
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
