import React from 'react';
import { notFound } from 'next/navigation';
import { lireDevis } from '../../../lib/devis';
import EditeurDevis from './EditeurDevis';

export const dynamic = 'force-dynamic';

export default async function PageEditionDevis({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const devis = await lireDevis(Number(id));
  if (!devis) notFound();

  return <EditeurDevis initial={devis} />;
}
