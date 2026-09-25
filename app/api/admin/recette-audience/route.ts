import { NextResponse } from 'next/server';
import { lireAudience } from '../../../lib/audience';

// Recette temporaire, derrière la session /api/admin vérifiée par proxy.ts.
// Lecture seule et preview uniquement : aucun accès à Telegram ni à la base.
export const dynamic = 'force-dynamic';
export const maxDuration = 10;

export async function GET() {
  if (process.env.VERCEL_ENV !== 'preview') {
    return new NextResponse(null, { status: 404 });
  }
  const debut = Date.now();
  const fin = new Date(debut);
  const audience = await lireAudience(fin);
  return NextResponse.json({
    configure: Boolean(process.env.VERCEL_ANALYTICS_TOKEN),
    fin: fin.toISOString(),
    dureeMs: Date.now() - debut,
    audience,
  }, { headers: { 'Cache-Control': 'private, no-store' } });
}
