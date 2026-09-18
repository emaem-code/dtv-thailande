import { NextResponse } from 'next/server';
import {
  lireDevis,
  majDevis,
  supprimerDevis,
  DevisSigneError,
  normaliserDossier,
  normaliserClient,
  type Devis,
} from '../../../../lib/devis';

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
      Pick<Devis, 'client' | 'dossier' | 'honoraires' | 'debours' | 'statut' | 'options' | 'message'>
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
      client: corps.client ? normaliserClient(corps.client) : undefined,
      // Même plafond que la route d'envoi : ce qui est enregistré est
      // exactement ce qui partira.
      message: corps.message === undefined ? undefined : String(corps.message).slice(0, 5000),
      dossier: corps.dossier ? normaliserDossier(corps.dossier) : undefined,
      honoraires: corps.honoraires === undefined ? undefined : Math.max(0, Number(corps.honoraires) || 0),
      debours,
    });

    if (!devis) return NextResponse.json({ erreur: 'Devis introuvable.' }, { status: 404 });
    return NextResponse.json({ devis });
  } catch (erreur) {
    // Un devis signé qui refuse d'être modifié n'est pas une panne : c'est la
    // règle qui s'applique. Le code doit le dire.
    if (erreur instanceof DevisSigneError) {
      return NextResponse.json({ erreur: erreur.message }, { status: 409 });
    }
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
