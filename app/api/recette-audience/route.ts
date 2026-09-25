import { NextResponse } from 'next/server';
import { lireAudience } from '../../lib/audience';

// Contrôle temporaire sur l'aperçu protégé par Vercel Authentication.
// N'expose aucun chiffre, secret ou contenu de réponse ; aucun envoi Telegram.
export const dynamic = 'force-dynamic';
export const maxDuration = 10;

export async function GET() {
  if (process.env.VERCEL_ENV !== 'preview' || Date.now() >= Date.parse('2026-09-25T12:00:00Z')) {
    return new NextResponse(null, { status: 404 });
  }
  const debut = Date.now();
  const fin = new Date(debut);
  const audience = await lireAudience(fin);
  let diagnostic: { http?: number; formatValide?: boolean; indisponible?: boolean } | undefined;
  if (!audience && process.env.VERCEL_ANALYTICS_TOKEN) {
    try {
      const parametres = new URLSearchParams({
        projectId: 'dtv-thailande', slug: 'emaem-codes-projects',
        since: new Date(debut - 86400000).toISOString(), until: fin.toISOString(),
        by: 'environment', filter: "environment eq 'production'", limit: '10',
      });
      const reponse = await fetch(`https://api.vercel.com/v1/query/web-analytics/visits/aggregate?${parametres}`, {
        headers: { Authorization: `Bearer ${process.env.VERCEL_ANALYTICS_TOKEN}` },
        cache: 'no-store', signal: AbortSignal.timeout(3000),
      });
      diagnostic = { http: reponse.status };
      if (reponse.ok) {
        const corps = await reponse.json();
        diagnostic.formatValide = Array.isArray(corps?.data) && corps.data.every((ligne: Record<string, unknown>) =>
          typeof ligne.environment === 'string' && Number.isSafeInteger(ligne.visitors) && Number.isSafeInteger(ligne.pageviews));
      }
    } catch {
      diagnostic = { ...diagnostic, indisponible: true };
    }
  }
  const resultat = {
    configure: Boolean(process.env.VERCEL_ANALYTICS_TOKEN),
    ok: audience !== null,
    dureeMs: Date.now() - debut,
    diagnostic,
  };
  return new NextResponse(`<!doctype html><html lang="fr"><title>Contrôle audience</title><body><h1>Contrôle audience</h1><pre>${JSON.stringify(resultat, null, 2)}</pre></body></html>`, {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'private, no-store' },
  });
}
