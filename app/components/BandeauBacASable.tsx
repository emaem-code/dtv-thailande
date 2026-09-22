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
      /* Couleurs en style direct, et non en classes utilitaires : les feuilles
         de la refonte repeignent toute classe de couleur pour harmoniser les
         anciens articles, et la pastille y perdait son contraste — texte et
         fond finissaient a la meme teinte. */
      style={{
        position: 'fixed', bottom: 12, left: 12, zIndex: 9999,
        background: '#2a1a05', color: '#fcd9a0', border: '1px solid #b4802f',
        borderRadius: 9999, padding: '6px 12px', fontSize: 12, fontWeight: 500,
        pointerEvents: 'none', boxShadow: '0 4px 14px rgb(0 0 0 / 0.35)',
      }}
    >
      Bac à sable — base de test, aucun envoi
    </div>
  );
}
