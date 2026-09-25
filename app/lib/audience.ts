/**
 * Audience facultative du brief, lue uniquement côté serveur.
 * API et schéma vérifiés le 25/09/2026 :
 * https://vercel.com/docs/analytics/web-analytics-api
 * https://vercel.com/docs/rest-api/web-analytics/aggregates-page-views
 */
const API = 'https://api.vercel.com/v1/query/web-analytics/visits/aggregate';
const JOUR_MS = 24 * 60 * 60 * 1000;
const DELAI_MS = 3000;

type Groupe = 'environment' | 'requestPath' | 'referrerHostname';
type Mesure = { visiteurs: number; pagesVues: number; valeur: string | null };
type Audience = { total: string; page: string; provenance: string };

function lireMesures(reponse: unknown, groupe: Groupe): Mesure[] {
  const data = (reponse as { data?: unknown } | null)?.data;
  if (!Array.isArray(data)) throw new Error('Audience illisible');
  return data.map((ligne) => {
    if (
      !ligne || !Number.isSafeInteger(ligne.visitors) || ligne.visitors < 0 ||
      !Number.isSafeInteger(ligne.pageviews) || ligne.pageviews < 0 ||
      !(typeof ligne[groupe] === 'string' || (groupe === 'referrerHostname' && ligne[groupe] === null))
    ) throw new Error('Audience illisible');
    return { visiteurs: ligne.visitors, pagesVues: ligne.pageviews, valeur: ligne[groupe] };
  });
}

function provenance(hote: string | null): string {
  if (!hote) return 'Direct';
  const domaine = hote.toLowerCase().replace(/^www\./, '');
  if (/^(google\.[a-z.]+|bing\.com|duckduckgo\.com|search\.yahoo\.com|ecosia\.org|qwant\.com|yandex\.[a-z.]+)$/.test(domaine)) {
    return `${domaine} (moteur de recherche)`;
  }
  if (/(^|\.)(facebook\.com|instagram\.com|linkedin\.com|tiktok\.com|pinterest\.[a-z.]+|youtube\.com|t\.co|x\.com|twitter\.com)$/.test(domaine)) {
    return `${domaine} (réseau social)`;
  }
  return `${domaine} (site référent)`;
}

/** Une valeur de l'API ne doit ni allonger le brief ni y ajouter des lignes. */
function uneLigne(texte: string): string {
  return texte.replace(/\s+/g, ' ').slice(0, 180);
}

/** Aucune erreur d'audience, même pendant la lecture du corps, ne bloque le brief. */
export async function lireAudience(fin: Date): Promise<Audience | null> {
  const jeton = process.env.VERCEL_ANALYTICS_TOKEN;
  if (!jeton) return null;

  const controleur = new AbortController();
  let minuteur: ReturnType<typeof setTimeout> | undefined;
  try {
    const lire = async (jours: number, groupe: Groupe): Promise<Mesure[]> => {
      const parametres = new URLSearchParams({
        projectId: 'dtv-thailande',
        slug: 'emaem-codes-projects',
        since: new Date(fin.getTime() - jours * JOUR_MS).toISOString(),
        until: fin.toISOString(),
        // Aucun regroupement horaire : il arrondirait les bornes demandées.
        by: groupe,
        filter: "environment eq 'production'",
        limit: '10',
      });
      const reponse = await fetch(`${API}?${parametres}`, {
        headers: { Authorization: `Bearer ${jeton}` },
        cache: 'no-store',
        signal: controleur.signal,
      });
      if (!reponse.ok) throw new Error('Audience indisponible');
      return lireMesures(await reponse.json(), groupe);
    };

    const [jour, semaine, pages, provenances] = await Promise.race([
      Promise.all([
        lire(1, 'environment'), lire(7, 'environment'),
        lire(1, 'requestPath'), lire(1, 'referrerHostname'),
      ]),
      new Promise<never>((_, rejeter) => {
        minuteur = setTimeout(() => {
          controleur.abort();
          rejeter(new Error('Audience trop lente'));
        }, DELAI_MS);
      }),
    ]);

    // Une seule ligne pour la production : additionner les visiteurs des pages
    // compterait plusieurs fois une personne ayant parcouru plusieurs articles.
    const total = (lignes: Mesure[]): Mesure => {
      if (lignes.length === 0) return { visiteurs: 0, pagesVues: 0, valeur: 'production' };
      if (lignes.length !== 1 || lignes[0].valeur !== 'production') throw new Error('Total ambigu');
      return lignes[0];
    };
    const j = total(jour);
    const s = total(semaine);
    const premierePage = [...pages].sort((a, b) => b.pagesVues - a.pagesVues)[0];
    const premiereProvenance = [...provenances].sort((a, b) => b.visiteurs - a.visiteurs)[0];
    if (j.pagesVues > 0 && (!premierePage || !premiereProvenance)) return null;
    // « Others » est un regroupement technique, pas une page ou une provenance.
    if ([premierePage?.valeur, premiereProvenance?.valeur].includes('Others')) return null;

    const compter = (n: number, singulier: string, pluriel: string) => `${n} ${n > 1 ? pluriel : singulier}`;
    const chiffres = (m: Mesure) => `${compter(m.visiteurs, 'visiteur', 'visiteurs')} · ${compter(m.pagesVues, 'page vue', 'pages vues')}`;
    return {
      total: `Audience 24 h : ${chiffres(j)} (7 jours : ${chiffres(s)})`,
      page: `Page la plus consultée (24 h) : ${j.pagesVues ? uneLigne(premierePage.valeur || '/') : 'aucune visite'}`,
      provenance: `Provenance principale (24 h) : ${j.pagesVues ? uneLigne(provenance(premiereProvenance.valeur)) : 'aucune visite'}`,
    };
  } catch {
    // Ne jamais journaliser le jeton, les en-têtes ni la réponse de l'API.
    return null;
  } finally {
    clearTimeout(minuteur);
    controleur.abort();
  }
}
