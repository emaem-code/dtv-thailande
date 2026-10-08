import { NextResponse } from 'next/server';
import { getCoursDevis } from '../../lib/taux';

export async function GET() {
  return NextResponse.json({ cours: await getCoursDevis() });
}
