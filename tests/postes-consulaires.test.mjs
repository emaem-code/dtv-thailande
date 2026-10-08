import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

const racine = resolve(import.meta.dirname, '..');
const date = new Date().toISOString().slice(0, 10);
const sourceCours = 'https://api.frankfurter.dev/v2/rates?base=EUR&quotes=THB,CHF,CAD,MAD';
const cours = { date, source: sourceCours, parEuro: { EUR: 1, THB: 37.783, CHF: 0.93399, CAD: 1.5985, MAD: 11.2121 } };
const reponseCours = () => Response.json(Object.entries(cours.parEuro).filter(([d]) => d !== 'EUR').map(([quote, rate]) => ({ date, base: 'EUR', quote, rate })));

// Les routes sont exécutées avec base et courrier isolés : aucun vrai envoi.
function environnement(remplacements = {}, fetch = async () => { throw new Error('Réseau interdit dans ce test'); }) {
  const cache = {};
  function charger(chemin) {
    const cle = chemin.replace(racine + '/', '');
    if (remplacements[cle]) return remplacements[cle];
    if (cache[chemin]) return cache[chemin];
    const exports = {};
    cache[chemin] = exports;
    const code = ts.transpileModule(readFileSync(chemin, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    vm.runInNewContext(code, {
      exports, Date, URL, AbortSignal, AbortController, setTimeout, clearTimeout, fetch,
      process: { env: {} },
      require(nom) {
        if (nom === 'next/server') return { NextResponse: { json: Response.json.bind(Response) } };
        assert.ok(nom.startsWith('.'), `Module non isolé : ${nom}`);
        return charger(resolve(dirname(chemin), nom + '.ts'));
      },
    }, { filename: chemin });
    return exports;
  }
  return (chemin) => charger(resolve(racine, chemin));
}
const dossier = (paysResidence) => ({ paysResidence, cours, personnes: 2, adultes: 2, enfants: 0, softPower: false, formule: 'essentielle', destination: '', remarques: '' });

test('résidence seule : cinq postes, outre-mer et pays non documentés sans repli Paris', () => {
  const charger = environnement();
  const { postePourResidence } = charger('app/lib/residence-consulaire.ts');
  for (const [pays, poste] of Object.entries({ France: 'paris', Monaco: 'paris', Algérie: 'paris', Belgique: 'bruxelles', Luxembourg: 'bruxelles', Suisse: 'berne', Liechtenstein: 'berne', Maroc: 'rabat', Tunisie: 'rabat', Mauritanie: 'rabat', Canada: 'ottawa' })) {
    assert.equal(postePourResidence(pays)?.id, poste);
  }
  for (const pays of ['', 'Europe', 'Thaïlande', 'La Réunion', 'Martinique', 'Polynésie française', 'Nouvelle-Calédonie', 'autre']) assert.equal(postePourResidence(pays), null);
});

test('Paris, Bruxelles, Berne et Rabat chiffrables ; Ottawa et résidence absente bloqués', () => {
  const charger = environnement();
  const { controleDevis } = charger('app/lib/controle-devis.ts');
  const { deboursParDefaut, construireOptions } = charger('app/lib/devis-modele.ts');
  for (const pays of ['France', 'Belgique', 'Luxembourg', 'Suisse', 'Maroc']) {
    assert.equal(controleDevis(dossier(pays)).autorise, true, pays);
    assert.equal(deboursParDefaut(dossier(pays))[0].quantite, 2);
    assert.equal(construireOptions(dossier(pays), ['essentielle', 'premium']).length, 2);
  }
  for (const pays of ['Canada', 'autre', '']) {
    assert.equal(controleDevis(dossier(pays)).autorise, false);
    assert.throws(() => deboursParDefaut(dossier(pays)), /Devis bloqué/);
  }
  assert.match(controleDevis(dossier('Canada')).message, /Ottawa.*résidence/);
  assert.equal(deboursParDefaut(dossier('France'))[0].unitaire, 350);
  assert.equal(deboursParDefaut(dossier('Belgique'))[0].unitaire, 350);
  assert.equal(deboursParDefaut(dossier('Suisse'))[0].unitaire, Math.ceil(350 / cours.parEuro.CHF));
  assert.equal(deboursParDefaut(dossier('Maroc'))[0].unitaire, Math.ceil(4100 / cours.parEuro.MAD));
});

test('montants publiés prioritaires, conversion seulement CHF/CAD et aucun null rempli', () => {
  const charger = environnement();
  const { fondsPourPoste } = charger('app/lib/taux.ts');
  const { lirePoste, historiquePourPoste } = charger('app/lib/residence-consulaire.ts');
  const { regleNationaleDtv } = charger('app/lib/postes-consulaires.ts');
  for (const [id, montant] of [['paris', '15 000 €'], ['bruxelles', '15 000 €'], ['rabat', '170 000 MAD']]) {
    const r = fondsPourPoste(id, 1, cours);
    assert.equal(r.texte, montant);
    assert.equal(r.conversion, null);
    assert.equal(r.information, lirePoste(id).fonds.minimumEnDeviseLocale);
  }
  for (const [id, devise] of [['berne', 'CHF'], ['ottawa', 'CAD']]) {
    const r = fondsPourPoste(id, 1, cours);
    assert.match(r.texte, new RegExp(`^500 000 THB, soit environ .* ${devise} au cours du \\d{2}/\\d{2}/\\d{4}$`));
    const brut = 500000 / cours.parEuro.THB * cours.parEuro[devise];
    assert.ok(r.conversion.montant.montant >= brut);
    assert.ok(r.conversion.montant.montant < brut + 100);
    assert.ok(r.marge);
    assert.equal(lirePoste(id).fonds.minimumEnDeviseLocale.valeur, null);
    assert.equal(fondsPourPoste(id).texte, '500 000 THB');
  }
  for (const id of ['bruxelles', 'rabat']) {
    assert.equal(historiquePourPoste(lirePoste(id)).information, regleNationaleDtv.moisDeReleves);
    assert.equal(lirePoste(id).fonds.moisDeReleves.valeur, null);
    assert.match(historiquePourPoste(lirePoste(id)).origine, /national/);
  }
});

test('cinq champs indispensables seulement, aucun repli pour un minimum manquant', () => {
  const charger = environnement();
  const { lirePoste } = charger('app/lib/residence-consulaire.ts');
  const { controleDevis, resumeFonds } = charger('app/lib/controle-devis.ts');
  const paris = lirePoste('paris');
  assert.equal(paris.traductionsEtLegalisations.traductionGenerale.valeur, null);
  assert.equal(controleDevis(dossier('France')).autorise, true);
  assert.ok(controleDevis(dossier('France')).reserves.some((r) => r.champ.includes('traductionGenerale')));
  assert.match(resumeFonds(dossier('Belgique')), /3 mois — source : portail national/);
  for (const info of [paris.depotNationaliteOuResidence.conditionLocale, paris.fonds.minimumPublie, paris.fraisConsulaires]) {
    const avant = info.valeur;
    info.valeur = null;
    assert.equal(controleDevis(dossier('France')).autorise, false);
    info.valeur = avant;
  }
  const national = charger('app/lib/postes-consulaires.ts').regleNationaleDtv;
  national.moisDeReleves.valeur = null;
  assert.equal(controleDevis(dossier('Belgique')).autorise, false);
  assert.equal(controleDevis(dossier('France')).autorise, true);
});

test('cours : réponse au format API, panne, réponse corrompue ou périmée sans repli', async () => {
  const succes = environnement({}, reponseCours);
  assert.equal((await succes('app/lib/taux.ts').getCoursDevis()).date, date);
  for (const fetch of [async () => { throw new Error('timeout'); }, async () => new Response('', { status: 503 }), async () => Response.json([]), async () => Response.json([{ date: '2020-01-01', quote: 'CHF', rate: 1 }])]) {
    assert.equal(await environnement({}, fetch)('app/lib/taux.ts').getCoursDevis(), null);
  }
  const charger = environnement();
  const { controleDevis } = charger('app/lib/controle-devis.ts');
  assert.equal(controleDevis({ ...dossier('Suisse'), cours: null }).autorise, false);
  assert.equal(controleDevis({ ...dossier('France'), cours: null }).autorise, true);
});

test('API création : Canada sans écriture ni lead marqué traité ; Belgique depuis résidence du lead', async () => {
  let ecritures = 0, traites = 0;
  let paysLead = 'Canada';
  const purs = environnement();
  const modele = purs('app/lib/devis-modele.ts');
  const charger = environnement({
    'app/lib/devis.ts': { ...modele, creerDevis: async (base) => { ecritures++; return { id: 1, ...base }; } },
    'app/lib/leads.ts': {
      lireLead: async () => ({ id: 1, prenom: 'Test', email: 'test@example.invalid', nationalite: 'France', personnes: 1, softPower: false, donnees: { 'Code pays de résidence': paysLead } }),
      marquerTraite: async () => { traites++; },
    },
  }, reponseCours);
  const { POST } = charger('app/api/admin/devis/route.ts');
  const requete = () => new Request('https://example.invalid/api/admin/devis', { method: 'POST', body: JSON.stringify({ leadId: 1 }) });
  const refus = await POST(requete());
  assert.equal(refus.status, 422);
  assert.match((await refus.json()).erreur, /Ottawa/);
  assert.equal(ecritures, 0);
  assert.equal(traites, 0);
  paysLead = 'Belgique';
  const succes = await POST(requete());
  assert.equal(succes.status, 201);
  const devis = (await succes.json()).devis;
  assert.equal(devis.dossier.paysResidence, 'Belgique');
  assert.match(devis.debours[0].libelle, /Bruxelles/);
  assert.equal(ecritures, 1);
  assert.equal(traites, 1);
});

test('API envoi : un devis Canada existant ne déclenche aucun courriel', async () => {
  let envoyes = 0;
  const charger = environnement({
    'app/lib/devis.ts': { lireDevis: async () => ({ dossier: dossier('Canada'), client: { email: 'test@example.invalid' } }) },
    'app/lib/alerte.ts': {},
    'app/lib/courriel.ts': { envoyerCourriel: () => { envoyes++; throw new Error('Envoi interdit'); } },
    'app/lib/agence.ts': { agenceIncomplete: () => false },
  });
  const { POST } = charger('app/api/admin/devis/[id]/envoyer/route.ts');
  const r = await POST(new Request('https://example.invalid/api/admin/devis/1/envoyer', { method: 'POST', body: '{}' }), { params: Promise.resolve({ id: '1' }) });
  assert.equal(r.status, 422);
  assert.match((await r.json()).erreur, /Ottawa.*Aucun e-mail envoyé/);
  assert.equal(envoyes, 0);
});

test('API modification : ancien devis recalculé, cours imposé par le serveur et changement de pays refusé', async () => {
  let enregistre = null;
  let paysActuel;
  const modele = environnement()('app/lib/devis-modele.ts');
  const charger = environnement({
    'app/lib/devis.ts': {
      ...modele,
      lireDevis: async () => ({ dossier: { ...dossier(paysActuel), cours: null } }),
      majDevis: async (_id, champs) => { enregistre = champs; return champs; },
    },
  }, reponseCours);
  const { PATCH } = charger('app/api/admin/devis/[id]/route.ts');
  const requete = (pays) => new Request('https://example.invalid/api/admin/devis/1', {
    method: 'PATCH', body: JSON.stringify({
      dossier: { ...dossier(pays), cours: { ...cours, parEuro: { ...cours.parEuro, CHF: 999 } } },
      debours: [{ libelle: 'Ancien tarif Paris', unitaire: 350, quantite: 2 }],
      options: [{ formule: 'premium', honoraires: 1, debours: [] }],
    }),
  });
  const contexte = { params: Promise.resolve({ id: '1' }) };
  const r = await PATCH(requete('Suisse'), contexte);
  assert.equal(r.status, 200);
  assert.equal(enregistre.dossier.cours.parEuro.CHF, cours.parEuro.CHF);
  assert.match(enregistre.debours[0].libelle, /Berne/);
  assert.equal(enregistre.debours[0].unitaire, Math.ceil(350 / cours.parEuro.CHF));
  assert.equal(enregistre.options.length, 0);
  enregistre = null;
  paysActuel = 'Belgique';
  assert.equal((await PATCH(requete('Suisse'), contexte)).status, 422);
  assert.equal(enregistre, null);
});

test('traductions estimables sans cours : Paris et Bruxelles restent chiffrables, aucun taux de secours', () => {
  const charger = environnement();
  const { deboursParDefaut } = charger('app/lib/devis-modele.ts');
  const { budgetDossier, prixPageTraduction } = charger('app/lib/tarifs.ts');
  for (const [pays, posteId] of [['France', 'paris'], ['Belgique', 'bruxelles']]) {
    const lignes = deboursParDefaut({ ...dossier(pays), cours: null });
    assert.equal(lignes[0].unitaire, 350);
    assert.equal(lignes.find((l) => l.libelle === 'Traductions certifiées').unitaire, 23.44);
    assert.equal(budgetDossier(2, false, 'essentielle', { posteId, cours: null }).traductions, 352);
  }
  assert.equal(prixPageTraduction(cours), Math.round(900 / cours.parEuro.THB * 100) / 100);
});
