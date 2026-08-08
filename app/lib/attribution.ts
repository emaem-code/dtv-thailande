/**
 * Attribution des leads — d'où vient réellement le visiteur.
 *
 * Le champ « Comment nous avez-vous connus ? » du formulaire est déclaratif :
 * il est optionnel, souvent vide, et rarement fiable (quelqu'un qui a découvert
 * le site dans un groupe d'expatriés puis l'a retrouvé via Google cochera
 * « Google »). On capte donc en parallèle l'information technique.
 *
 * Point crucial : la captation a lieu au PREMIER chargement de page, pas à
 * l'ouverture du formulaire. Un visiteur qui arrive par Google, lit deux
 * articles puis demande un devis aurait sinon un référent pointant vers
 * dtv-thailande.fr lui-même, ce qui ne dit rien.
 */

const CLE = 'dtv_attribution';

export type Attribution = {
  /** Canal déduit du référent : Google, réseau social, forum, direct… */
  canal: string;
  /** Première page vue de la session — l'article qui a fait entrer le visiteur. */
  pageEntree: string;
  /** Campagne UTM, si le lien en portait une. */
  campagne: string;
};

const VIDE: Attribution = { canal: 'Inconnu', pageEntree: '—', campagne: '—' };

/**
 * Traduit un nom de domaine référent en canal lisible.
 * Les moteurs masquent désormais la requête : on identifie la source, pas le
 * mot-clé — ce qui est précisément l'information recherchée ici.
 */
function canalDepuisReferent(referent: string): string {
  if (!referent) return 'Direct ou favori';

  let hote = '';
  try {
    hote = new URL(referent).hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return 'Inconnu';
  }

  if (hote.endsWith('dtv-thailande.fr')) return 'Navigation interne';

  const tables: Array<[string[], string]> = [
    [['google.'], 'Google (organique)'],
    [['bing.com', 'duckduckgo.com', 'ecosia.org', 'qwant.com', 'yahoo.'], 'Autre moteur de recherche'],
    [['facebook.com', 'fb.com', 'instagram.com', 'l.facebook.com'], 'Facebook / Instagram'],
    [['linkedin.com', 'lnkd.in'], 'LinkedIn'],
    [['youtube.com', 'youtu.be'], 'YouTube'],
    [['x.com', 'twitter.com', 't.co'], 'X (Twitter)'],
    [['tiktok.com'], 'TikTok'],
    [['reddit.com'], 'Reddit'],
    [['expat.com', 'lepetitjournal.com', 'thailande-fr.com', 'forum'], "Forum ou média d'expatriés"],
    [['chatgpt.com', 'openai.com', 'perplexity.ai', 'claude.ai', 'gemini.google.com'], 'Assistant IA'],
  ];

  for (const [motifs, libelle] of tables) {
    if (motifs.some((m) => hote.includes(m))) return libelle;
  }

  return `Site référent : ${hote}`;
}

/**
 * À appeler une fois par session, au montage de l'application.
 * N'écrase jamais une attribution déjà enregistrée : la première visite fait foi.
 */
export function capterAttribution(): void {
  if (typeof window === 'undefined') return;

  try {
    if (sessionStorage.getItem(CLE)) return;

    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source');
    const utmMedium = params.get('utm_medium');
    const utmCampaign = params.get('utm_campaign');

    // Un lien balisé en UTM prime sur le référent : c'est une intention explicite.
    const canal = utmSource
      ? `${utmSource}${utmMedium ? ` / ${utmMedium}` : ''} (UTM)`
      : canalDepuisReferent(document.referrer);

    const attribution: Attribution = {
      canal,
      pageEntree: window.location.pathname || '/',
      campagne: utmCampaign || '—',
    };

    sessionStorage.setItem(CLE, JSON.stringify(attribution));
  } catch {
    /* navigation privée ou stockage refusé : on continue sans attribution */
  }
}

/** Relit l'attribution au moment de l'envoi du formulaire. */
export function lireAttribution(): Attribution {
  if (typeof window === 'undefined') return VIDE;

  try {
    const brut = sessionStorage.getItem(CLE);
    if (!brut) return VIDE;
    return { ...VIDE, ...(JSON.parse(brut) as Partial<Attribution>) };
  } catch {
    return VIDE;
  }
}
