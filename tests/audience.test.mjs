import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

// Exécute le code serveur avec des services isolés : jamais de base ni de Telegram.
function charger(chemin, contexte = {}, modules = {}) {
  const code = ts.transpileModule(readFileSync(new URL(chemin, import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const exports = {};
  vm.runInNewContext(code, {
    exports, Date, URLSearchParams, AbortController, setTimeout, clearTimeout,
    process: { env: {} },
    require(nom) {
      assert.ok(nom in modules, `Import inattendu : ${nom}`);
      return modules[nom];
    },
    ...contexte,
  });
  return exports;
}

const fin = new Date('2026-09-25T02:00:17.123Z');
const compteurs = {
  leads: '2', leads_traites: '1', envoyes: '1', consultes: '3', signes: '1',
  relances: '1', en_attente: '4', jamais_ouverts: '1',
};
const ancienDetail = [
  '2 nouveaux leads · 1 traité', '1 devis envoyé', '3 devis ouverts', '1 devis signé',
  '1 relance partie', '', '4 devis en attente de signature',
  '5 abonnés aux alertes · 1 en attente de confirmation', '',
  '⚠️ 1 devis jamais ouvert depuis plus de 48 h — vérifier qu’il est bien arrivé',
];

function lecture(fetch, avecJeton = true, horloge = {}) {
  return charger('../app/lib/audience.ts', {
    process: { env: avecJeton ? { VERCEL_ANALYTICS_TOKEN: 'jeton-de-test' } : {} },
    fetch, ...horloge,
  }).lireAudience;
}

async function executerBrief(lireAudience, autorise = true) {
  const alertes = [];
  let requetes = 0;
  const { GET } = charger('../app/api/cron/resume/route.ts', {
    process: { env: { CRON_SECRET: 'secret-de-test' } },
  }, {
    'next/server': { NextResponse: { json: Response.json.bind(Response) } },
    '../../../lib/db': { requete: async (sql) => {
      requetes++;
      assert.match(sql, /SELECT now\(\) AS fin_periode/);
      return [{ ...compteurs, fin_periode: fin }];
    } },
    '../../../lib/abonnes': { compterAbonnes: async () => ({ confirmes: 5, enAttente: 1 }) },
    '../../../lib/alerte': { alerter: async (alerte) => { alertes.push(alerte); return true; } },
    '../../../lib/agence': { AGENCE: { site: 'dtv-thailande.fr' } },
    '../../../lib/audience': { lireAudience },
  });
  const reponse = await GET(new Request('https://example.test/api/cron/resume', {
    headers: autorise ? { authorization: 'Bearer secret-de-test' } : {},
  }));
  return { alertes, requetes, reponse, corps: await reponse.json() };
}

function reponseValide(url) {
  const p = new URL(url).searchParams;
  const groupe = p.get('by');
  const semaine = new Date(p.get('until')) - new Date(p.get('since')) > 86400000;
  const data = groupe === 'environment'
    ? [{ environment: 'production', visitors: semaine ? 20 : 4, pageviews: semaine ? 50 : 10 }]
    : groupe === 'requestPath'
      // La page la plus vue n'est pas nécessairement celle avec le plus de visiteurs.
      ? [{ requestPath: '/', visitors: 4, pageviews: 4 }, { requestPath: '/faq', visitors: 2, pageviews: 6 }]
      : [{ referrerHostname: '', visitors: 1, pageviews: 5 }, { referrerHostname: 'google.fr', visitors: 3, pageviews: 5 }];
  return { ok: true, json: async () => ({ data }) };
}

test('périodes glissantes identiques au décompte, production uniquement, totaux non additionnés', async () => {
  const appels = [];
  const lire = lecture(async (url, options) => { appels.push({ url, options }); return reponseValide(url); });
  const resultat = await executerBrief(lire);
  assert.equal(appels.length, 4);
  for (const { url, options } of appels) {
    const p = new URL(url).searchParams;
    assert.equal(p.get('until'), fin.toISOString());
    assert.equal(p.get('filter'), "environment eq 'production'");
    assert.equal(p.get('projectId'), 'dtv-thailande');
    assert.equal(p.get('slug'), 'emaem-codes-projects');
    assert.equal(p.get('limit'), '10');
    assert.equal(options.cache, 'no-store');
    assert.equal(options.headers.Authorization, 'Bearer jeton-de-test');
  }
  const durees = appels.map(({ url }) => fin - new Date(new URL(url).searchParams.get('since')));
  assert.deepEqual(durees, [86400000, 604800000, 86400000, 86400000]);
  const detail = Array.from(resultat.alertes[0].detail);
  assert.deepEqual(detail.slice(0, 3), [
    'Page la plus consultée (24 h) : /faq',
    'Provenance principale (24 h) : google.fr (moteur de recherche)',
    'Audience 24 h : 4 visiteurs · 10 pages vues (7 jours : 20 visiteurs · 50 pages vues)',
  ]);
  assert.deepEqual(detail.slice(3), ancienDetail);
  assert.deepEqual(resultat.corps, { ok: true, envoye: true, compte: compteurs });
});

test('sans jeton : aucun fetch, brief strictement inchangé et sans ligne vide ajoutée', async () => {
  const resultat = await executerBrief(lecture(() => assert.fail('Appel sans jeton'), false));
  assert.deepEqual(Array.from(resultat.alertes[0].detail), ancienDetail);
});

test('tout échec de l’API laisse partir le brief existant', async (t) => {
  const cas = {
    'jeton expiré': async () => ({ ok: false, status: 401 }),
    'accès refusé': async () => ({ ok: false, status: 403 }),
    'quota': async () => ({ ok: false, status: 429 }),
    'serveur indisponible': async () => ({ ok: false, status: 500 }),
    'réseau': async () => { throw new Error('Réseau indisponible'); },
    'corps invalide': async () => ({ ok: true, json: async () => { throw new Error('JSON invalide'); } }),
    'schéma invalide': async () => ({ ok: true, json: async () => ({ data: [{ visitors: '4' }] }) }),
    'seule la période de 7 jours échoue': async (url) => new URL(url).searchParams.get('since').startsWith('2026-09-18')
      ? { ok: false } : reponseValide(url),
  };
  for (const [nom, fetch] of Object.entries(cas)) {
    await t.test(nom, async () => {
      const resultat = await executerBrief(lecture(fetch));
      assert.equal(resultat.corps.envoye, true);
      assert.equal(resultat.alertes.length, 1);
      assert.deepEqual(Array.from(resultat.alertes[0].detail), ancienDetail);
    });
  }
});

test('délai global de 3 secondes, y compris un corps bloqué, avec annulation des lectures', async (t) => {
  for (const corpsBloque of [false, true]) {
    await t.test(corpsBloque ? 'lecture du corps' : 'connexion', async () => {
      const signaux = [];
      const fetch = async (_, options) => {
        signaux.push(options.signal);
        const sansFin = () => new Promise(() => {});
        return corpsBloque ? { ok: true, json: sansFin } : sansFin();
      };
      const resultat = await executerBrief(lecture(fetch, true, {
        setTimeout: (fn, ms) => { assert.equal(ms, 3000); return setTimeout(fn, 10); },
      }));
      assert.deepEqual(Array.from(resultat.alertes[0].detail), ancienDetail);
      assert.ok(signaux.every((signal) => signal.aborted));
    });
  }
});

test('trafic nul, direct et réseaux sociaux, sans inventer une page gagnante', async () => {
  const vide = await lecture(async () => ({ ok: true, json: async () => ({ data: [] }) }))(fin);
  assert.match(vide.total, /0 visiteur · 0 page vue/);
  assert.match(vide.page, /aucune visite$/);
  for (const [hote, attendu] of [[null, 'Direct'], ['', 'Direct'], ['l.facebook.com', 'l.facebook.com (réseau social)'], ['mail.google.com', 'mail.google.com (site référent)']]) {
    const resultat = await lecture(async (url) => new URL(url).searchParams.get('by') === 'referrerHostname'
      ? { ok: true, json: async () => ({ data: [{ referrerHostname: hote, visitors: 4, pageviews: 10 }] }) }
      : reponseValide(url))(fin);
    assert.ok(resultat.provenance.endsWith(attendu));
  }
});

test('l’authentification du cron reste obligatoire', async () => {
  const resultat = await executerBrief(() => assert.fail('Lecture non autorisée'), false);
  assert.equal(resultat.reponse.status, 401);
  assert.equal(resultat.alertes.length, 0);
  assert.equal(resultat.requetes, 0);
});
