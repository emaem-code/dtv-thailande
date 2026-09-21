/**
 * Pastille « bac à sable ».
 *
 * Elle existe pour empêcher une seule erreur, mais qui coûte cher : croire
 * qu'on est sur la copie de travail alors qu'on est sur le site public, ou
 * l'inverse. Les deux se ressemblent trait pour trait — c'est tout l'intérêt
 * d'une copie — et l'URL de preview Vercel ne se lit pas d'un coup d'œil.
 *
 * Le test porte sur VERCEL_ENV et non sur le nom de la branche : en
 * production, cette variable vaut exactement « production », et rien d'autre
 * ne peut la faire mentir. La pastille ne peut donc pas apparaître sur
 * dtv-thailande.fr, quelle que soit la branche déployée.
 *
 * `pointer-events-none` est délibéré : la pastille se regarde, elle
 * n'intercepte aucun clic et ne peut masquer aucun bouton.
 */
export default function BandeauBacASable() {
  if (process.env.VERCEL_ENV === 'production') return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-3 left-3 z-[9999] rounded-full
                 border border-amber-400/60 bg-amber-950/90 px-3 py-1.5
                 text-xs font-medium text-amber-200 shadow-lg backdrop-blur-sm"
    >
      Bac à sable — base de test, aucun envoi
    </div>
  );
}
