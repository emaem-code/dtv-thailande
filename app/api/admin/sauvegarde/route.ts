import {
  construireSauvegarde,
  nomFichierSauvegarde,
  sauvegardeEnJson,
} from '../../../lib/sauvegarde';

/**
 * Téléchargement immédiat de la sauvegarde.
 *
 * L'envoi hebdomadaire par courriel suffit au quotidien ; celui-ci sert aux
 * moments où l'on veut une copie tout de suite — avant une migration, avant
 * de toucher à la base, ou simplement pour vérifier que le mécanisme marche
 * sans attendre lundi.
 *
 * La route vit sous /api/admin, donc le contrôle de session du proxy
 * s'applique sans qu'on ait à le redemander ici.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const sauvegarde = await construireSauvegarde();
  const corps = sauvegardeEnJson(sauvegarde);

  return new Response(corps, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': `attachment; filename="${nomFichierSauvegarde(sauvegarde.genereLe)}"`,
      // Une sauvegarde servie depuis un cache ne serait plus une sauvegarde.
      'Cache-Control': 'no-store',
    },
  });
}
