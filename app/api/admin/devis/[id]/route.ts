import { NextResponse } from 'next/server';
import { lireDevis, majDevis, supprimerDevis, type Devis } from '../../../../lib/devis';

export const runtime = 'nodejs';

type Contexte = { params: Promise<{ id: string }> };

export async function GET(_requete: Request, { params }: Contexte) {
  const { id } = await params;
  const devis = await lireDevis(Number(id));
  if (!devis) return NextResponse.json({ erreur: 'Devis introuvable.' }, { status: 404 });
  return NextResponse.json({ devis });
}

export async function PATCH(requete: Request, { params }: Contexte) {
  try {
    const { id } = await params;
    const corps = (await requete.json()) as Partial<
      Pick<Devis, 'client' | 'dossier' | 'honoraires' | 'debours' | 'statut'>
    >;

    // Les lignes de débours viennent d'un formulaire : on les remet au propre
    // avant de les stocker, plutôt que de faire confiance à ce qui arrive.
    const debours = corps.debours?.map((l) => ({
      libelle: String(l.libelle ?? '').slice(0, 200),
      quantite: Math.max(0, Number(l.quantite) || 0),
      unitaire: Math.max(0, Number(l.unitaire) || 0),
      detail: l.detail ? String(l.detail).slice(0, 300) : undefined,
    }));

    const devis = await majDevis(Number(id), {
      ...corps,
      honoraires: corps.honoraires === undefined ? undefined : Math.max(0, Number(corps.honoraires) || 0),
      debours,
    });

    if (!devis) return NextResponse.json({ erreur: 'Devis introuvable.' }, { status: 404 });
    return NextResponse.json({ devis });
  } catch (erreur) {
    return NextResponse.json({ erreur: (erreur as Error).message }, { status: 500 });
  }
}

export async function DELETE(_requete: Request, { params }: Contexte) {
  const { id } = await params;
  // `supprimerDevis` ne touche qu'aux brouillons : un devis déjà envoyé au
  // client fait partie de la suite comptable et ne s'efface pas.
  await supprimerDevis(Number(id));
  return NextResponse.json({ ok: true });
}
