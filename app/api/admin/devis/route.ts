import { NextResponse } from 'next/server';
import {
  creerDevis,
  listerDevis,
  deboursParDefaut,
  honorairesParDefaut,
  type Client,
  type Dossier,
  type Debours,
} from '../../../lib/devis';
import { lireLead, marquerTraite } from '../../../lib/leads';

export const runtime = 'nodejs';

const CLIENT_VIDE: Client = { nom: '', email: '', telephone: '', adresse: '' };

const DOSSIER_VIDE: Dossier = {
  personnes: 1,
  adultes: 1,
  enfants: 0,
  softPower: false,
  formule: 'essentielle',
  destination: '',
  remarques: '',
};

function nombre(valeur: unknown, defaut: number): number {
  const n = typeof valeur === 'number' ? valeur : parseInt(String(valeur ?? ''), 10);
  return Number.isFinite(n) ? n : defaut;
}

export async function GET() {
  try {
    return NextResponse.json({ devis: await listerDevis() });
  } catch (erreur) {
    return NextResponse.json({ erreur: (erreur as Error).message }, { status: 500 });
  }
}

/**
 * Crée un devis.
 *
 * Deux entrées possibles : vierge, ou pré-rempli depuis une demande du
 * formulaire d'éligibilité (`leadId`). Le second cas est celui qui fait gagner
 * du temps — nom, adresse, composition du foyer et voie sont déjà connus.
 */
export async function POST(requete: Request) {
  try {
    const corps = (await requete.json().catch(() => ({}))) as {
      leadId?: number;
      client?: Partial<Client>;
      dossier?: Partial<Dossier>;
    };

    let client: Client = { ...CLIENT_VIDE, ...(corps.client ?? {}) };
    let dossier: Dossier = { ...DOSSIER_VIDE, ...(corps.dossier ?? {}) };
    let leadId: number | null = null;

    if (corps.leadId) {
      const lead = await lireLead(corps.leadId);
      if (lead) {
        leadId = lead.id;
        client = {
          nom: client.nom || lead.prenom,
          email: client.email || lead.email,
          telephone: client.telephone || lead.telephone,
          adresse: client.adresse,
        };
        const enfants = nombre(lead.donnees["Nombre d'enfants"], 0);
        const adultes = Math.max(1, lead.personnes - enfants);
        dossier = {
          ...dossier,
          personnes: Math.max(1, lead.personnes),
          adultes,
          enfants,
          softPower: lead.softPower,
          destination: lead.donnees['Destination en Thaïlande'] || dossier.destination,
        };
      }
    }

    dossier.personnes = Math.max(1, dossier.personnes);

    const honoraires = honorairesParDefaut(dossier.personnes);
    const debours: Debours[] = deboursParDefaut(dossier.personnes, dossier.softPower);

    const devis = await creerDevis({ client, dossier, honoraires, debours, leadId });

    // Une demande transformée en devis n'a plus à figurer parmi les demandes à
    // traiter : le suivi se poursuit sur le devis.
    if (leadId) await marquerTraite(leadId, true).catch(() => {});

    return NextResponse.json({ devis }, { status: 201 });
  } catch (erreur) {
    return NextResponse.json({ erreur: (erreur as Error).message }, { status: 500 });
  }
}
