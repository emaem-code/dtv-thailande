import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import vm from 'node:vm';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

// Rendu réel de la FAQ et de son JSON-LD ; seuls les liens et le bouton client
// sont remplacés. Les données consulaires et le formatage restent ceux du site.
test('FAQ synchrone : 15 000 € publiés dans le texte et le JSON-LD, sans aucun fetch', () => {
  const racine = resolve(import.meta.dirname, '..');
  const cache = new Map();
  let appels = 0;
  function charger(fichier) {
    if (cache.has(fichier)) return cache.get(fichier);
    const exports = {};
    cache.set(fichier, exports);
    const code = ts.transpileModule(readFileSync(fichier, 'utf8'), {
      fileName: fichier,
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.React, esModuleInterop: true },
    }).outputText;
    vm.runInNewContext(code, {
      exports, Date,
      fetch() { appels++; throw new Error('La FAQ ne doit pas consulter de cours'); },
      require(nom) {
        if (nom === 'react') return React;
        if (nom === 'next/link') return function LienTest({ children, href, ...props }) { return React.createElement('a', { href, ...props }, children); };
        if (nom === '../components/BoutonEligibilite') return function BoutonTest({ children }) { return React.createElement('button', null, children); };
        if (nom === '../blog/posts') return { estPublie: () => true };
        assert.ok(nom.startsWith('.'), `Import inattendu : ${nom}`);
        const chemin = resolve(dirname(fichier), nom);
        return charger(chemin + (existsSync(chemin + '.ts') ? '.ts' : '.tsx'));
      },
    }, { filename: fichier });
    return exports;
  }
  const FaqPage = charger(resolve(racine, 'app/faq/page.tsx')).default;
  const element = FaqPage();
  assert.equal(typeof element.then, 'undefined');
  const html = renderToStaticMarkup(element);
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  const reponse = schema.mainEntity.find((q) => q.name.startsWith('Faut-il bloquer')).acceptedAnswer.text;
  const attendu = 'publie son seuil directement en euros, 15 000 € par demandeur';
  assert.ok(reponse.includes(attendu));
  const visible = html.replace(/<script\b[^>]*>.*?<\/script>/gs, '').replace(/<[^>]+>/g, '');
  assert.ok(visible.includes(attendu));
  assert.equal(html.includes('{EUROS}'), false);
  assert.equal(appels, 0);
});
