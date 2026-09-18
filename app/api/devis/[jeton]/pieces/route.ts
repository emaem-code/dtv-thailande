import { NextResponse } from 'next/server';
import { basculerPiece } from '../../../../lib/devis';

export const runtime = 'nodejs';

/**
 * Cases à cocher de la liste des pièces, dans l'espace client.
 *
 * Volontairement persistée plutôt que tenue dans le navigateur : une case qui
 * se décoche au prochain passage ne sert à rien, et Matthieu voit du même coup
 * où en est le client sans avoir à le lui demander.
 *
 * Réservée aux devis signés. Avant la signature, il n'y a pas de dossier à
 * suivre — seulement une offre à accepter ou non.
 */

type Contexte = { params: Promise<{ jeton: string }> };

export async function POST(requete: Request, { params }: Contexte) {
  const { jeton } = await params;

  let corps: { piece?: unknown; coche?: unknown } = {};
  try {
    corps = (await requete.json()) as typeof corps;
  } catch {
    return NextResponse.json({ erreur: 'Requête illisible.' }, { status: 400 });
  }

  const piece = typeof corps.piece === 'string' ? corps.piece.trim().slice(0, 60) : '';
  if (!/^[a-z0-9-]+$/.test(piece)) {
    return NextResponse.json({ erreur: 'Pièce inconnue.' }, { status: 400 });
  }

  const devis = await basculerPiece(jeton, piece, corps.coche === true);
  if (!devis) {
    return NextResponse.json(
      { erreur: 'Devis introuvable, ou pas encore signé.' },
      { status: 404 },
    );
  }

  return NextResponse.json({ ok: true, pieces: devis.suivi.pieces });
}
