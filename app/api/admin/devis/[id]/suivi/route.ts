import { NextResponse } from 'next/server';
import { majSuivi } from '../../../../../lib/devis';
import { ETAPES } from '../../../../../lib/parcours';

export const runtime = 'nodejs';

/**
 * Avancement du dossier.
 *
 * Route distincte de la modification du devis, et c'est le point : un devis
 * signé se verrouille, son suivi continue de vivre. Confondre les deux
 * obligerait à choisir entre un dossier qu'on ne peut plus faire avancer et un
 * contrat qu'on peut encore réécrire.
 */

type Contexte = { params: Promise<{ id: string }> };

export async function PATCH(requete: Request, { params }: Contexte) {
  const { id } = await params;

  let corps: { etape?: unknown; note?: unknown } = {};
  try {
    corps = (await requete.json()) as typeof corps;
  } catch {
    return NextResponse.json({ erreur: 'Requête illisible.' }, { status: 400 });
  }

  const champs: { etape?: number; note?: string } = {};
  if (corps.etape !== undefined) {
    const etape = Number(corps.etape);
    if (!Number.isInteger(etape) || etape < -1 || etape >= ETAPES.length) {
      return NextResponse.json({ erreur: 'Étape inconnue.' }, { status: 400 });
    }
    champs.etape = etape;
  }
  if (corps.note !== undefined) champs.note = String(corps.note).slice(0, 1000);

  const devis = await majSuivi(Number(id), champs);
  if (!devis) return NextResponse.json({ erreur: 'Devis introuvable.' }, { status: 404 });
  return NextResponse.json({ devis });
}
