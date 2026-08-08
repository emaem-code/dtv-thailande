import React from 'react';
import Link from 'next/link';
import { getSortedBlogPosts } from '../blog/posts';
import MontantFonds from './MontantFonds';
import { MARGE_CONSEILLEE } from '../lib/taux';

// ─── FAQ : source unique, sert à l'affichage ET au balisage JSON-LD ───
export const homeFaqs = [
  {
    category: 'Finances & Épargne',
    q: 'Faut-il bloquer 15 000 € sur mon compte pendant les 5 ans du visa ?',
    a: "Non. L'administration exige de prouver la liquidité de 500 000 THB uniquement lors de la demande initiale, et lors d'éventuelles extensions locales. L'argent n'est pas bloqué, mais votre historique des 3 à 6 derniers mois sera scruté à la loupe avant le dépôt pour éviter tout refus lié à des fluctuations. Prévoyez 15 000 à 16 000 € plutôt que le strict minimum : le taux de change fluctue, et un solde confortable est mieux perçu.",
  },
  {
    category: 'Finances & Épargne',
    q: 'Mes investissements (crypto, PEA, actions) comptent-ils comme garantie ?',
    a: "Non. L'ambassade thaïlandaise est très conservatrice et rejette les actifs volatils. La somme doit être disponible sur un compte courant ou d'épargne classique. Nous vous accompagnons sur la présentation de vos relevés, y compris de néobanques comme Revolut ou Boursorama, pour qu'ils respectent les standards consulaires.",
  },
  {
    category: 'Statut freelance & télétravail',
    q: "Je suis auto-entrepreneur et je n'ai pas d'employeur. Est-ce un problème ?",
    a: "C'est le profil le plus courant, mais aussi celui qui subit le plus de refus quand le dossier est mal monté. L'ambassade s'attend à des fiches de paie classiques. Notre travail consiste à traduire la réalité de votre micro-entreprise — Kbis, URSSAF, SIRENE, portfolio — en un dossier administratif irréfutable aux yeux des officiers consulaires.",
  },
  {
    category: 'Soft Power (écoles & immersion)',
    q: "Comment être certain que l'école choisie ne fera pas annuler mon visa ?",
    a: "Le risque d'utiliser une école fantôme ou non agréée est une interdiction de territoire. Nous ne travaillons qu'avec un réseau fermé d'établissements de Muay Thaï et de cuisine thaïlandaise disposant d'une double homologation officielle : licence DBD et accréditation du ministère. Votre lettre d'acceptation est garantie conforme.",
  },
  {
    category: 'Famille & PACS',
    q: 'Mon partenaire et moi sommes pacsés. Le visa s’étend-il à mon conjoint ?',
    a: "Attention, c'est un piège majeur : le droit thaïlandais ne reconnaît pas le PACS, uniquement le mariage civil. Sans mariage, une demande de visa « accompagnant » est automatiquement rejetée. Il existe cependant des stratégies légales permettant aux couples pacsés de sécuriser leur départ ensemble, via des dossiers individuels synchronisés.",
  },
  {
    category: 'Fiscalité & impôts',
    q: 'Vais-je payer des impôts en Thaïlande avec le Visa DTV ?',
    a: "Le DTV ne fait pas automatiquement de vous un résident fiscal. Vous ne devenez imposable en Thaïlande que si vous y séjournez plus de 180 jours dans l'année civile et que vous y rapatriez des revenus. Nous vous fournissons les repères de base pour comprendre la convention fiscale franco-thaïlandaise et organiser votre calendrier de voyage.",
  },
];

const etapes = [
  {
    num: '01',
    titre: "L'engagement et le dossier",
    desc: "Une fois votre devis validé, nous analysons et certifions vos pièces sous 3 à 5 jours ouvrés pour vous livrer un dossier formaté selon les exigences consulaires.",
  },
  {
    num: '02',
    titre: 'Géolocalisation et arrivée sur place',
    desc: "Vous voyagez vers le pays de dépôt. Le tampon d'entrée de cette immigration est indispensable pour prouver votre géolocalisation au moment de la demande.",
  },
  {
    num: '03',
    titre: 'Soumission et règlement consulaire',
    desc: "Vous vous connectez au portail officiel e-Visa et déposez le dossier. Selon l'ambassade, le règlement se fait en ligne ou sur place en bahts. Nous restons joignables pendant toute l'opération.",
  },
  {
    num: '04',
    titre: 'Approbation',
    desc: "Sous 3 à 5 jours, l'e-mail « Visa Approved » arrive. En formule Premium ou VIP, nous déclenchons alors la réservation de votre vol et de votre chauffeur.",
  },
  {
    num: '05',
    titre: 'Préparation au départ',
    desc: "Impression de l'e-Visa, enregistrement en ligne et carte d'arrivée numérique TDAC préparée sur votre mobile. Ces documents sont exigés à l'embarquement.",
  },
  {
    num: '06',
    titre: 'Arrivée en Thaïlande',
    desc: "Passeport, e-Visa imprimé et TDAC à l'officier d'immigration, qui appose votre tampon de 180 jours. Ensuite, une sortie du territoire ou une extension sur place relance le compteur, pendant cinq ans.",
  },
];

const voies = [
  {
    titre: 'Télétravail et freelance',
    accent: 'text-purple-400',
    bord: 'border-purple-500/25',
    desc: "Vous travaillez à distance pour un employeur étranger, ou à votre compte. C'est la voie la plus fréquente — et celle qui concentre le plus de refus, car un statut d'indépendant français ne ressemble à rien de connu pour un officier consulaire.",
    lien: '/blog/visa-dtv-freelance-auto-entrepreneur',
    ancre: 'Monter son dossier en tant qu’indépendant',
  },
  {
    titre: 'Soft Power',
    accent: 'text-orange-400',
    bord: 'border-orange-500/25',
    desc: "Vous suivez un cursus certifié de cuisine thaïlandaise ou de Muay Thaï. Aucune condition de revenus n'est exigée par cette voie, ce qui la rend accessible à des profils que les autres excluent — à condition que l'école soit réellement homologuée.",
    lien: '/blog/visa-dtv-soft-power-ecoles',
    ancre: 'Écoles certifiées, tarifs et pièges',
  },
  {
    titre: 'Famille et conjoint accompagnant',
    accent: 'text-fuchsia-400',
    bord: 'border-fuchsia-500/25',
    desc: "Vous partez à deux, ou avec vos enfants. La règle est stricte et mal connue : seul le mariage civil ouvre le statut d'accompagnant. Le PACS et le concubinage imposent une autre stratégie, parfaitement légale mais qui se prépare en amont.",
    lien: '/blog/visa-dtv-couple-famille-pacs',
    ancre: 'Conjoint et enfants accompagnants',
  },
];

const formules = [
  {
    nom: 'Essentielle',
    desc: "L'administratif complet : frais consulaires, traductions, école si applicable, et suivi du dossier.",
    standard: '850 €',
    softPower: '1 750 €',
    vedette: false,
  },
  {
    nom: 'Premium',
    desc: 'Essentielle, plus le vol régional, l’hôtel et les transferts aéroport.',
    standard: '1 300 €',
    softPower: '2 450 €',
    vedette: false,
  },
  {
    nom: 'VIP',
    desc: 'Tout inclus : vol depuis l’Europe, hôtels haut de gamme et chauffeurs privés.',
    standard: '2 400 €',
    softPower: '4 060 €',
    vedette: true,
  },
];

export default function HomeContent() {
  const guides = getSortedBlogPosts()
    .filter((p) => new Date(p.publishedAt) <= new Date())
    .slice(0, 6);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 mt-24 space-y-24 text-gray-400 leading-relaxed">
      {/* ── LE DTV EN BREF ── */}
      <section>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6 tracking-tight">
          Le Visa DTV en bref
        </h2>
        <p className="mb-4">
          Le <strong className="text-white">Destination Thailand Visa</strong>, ou DTV, est le visa
          long séjour créé par la Thaïlande en 2024 pour les travailleurs à distance, les
          indépendants et les personnes venant suivre une activité culturelle ou sportive. Il a
          remplacé, dans les faits, la vie en enchaînant les exemptions touristiques.
        </p>
        <p className="mb-8">
          Sa mécanique tient en trois nombres, qu&apos;il ne faut pas confondre :{' '}
          <strong className="text-white">cinq ans de validité</strong>, à entrées multiples ;{' '}
          <strong className="text-white">180 jours de séjour</strong> à chaque entrée, extensibles
          une fois sur place ; et une{' '}
          <strong className="text-white">déclaration d&apos;adresse tous les 90 jours</strong> si
          vous restez sans sortir. Un DTV valable cinq ans ne vous autorise donc pas à rester cinq
          ans d&apos;affilée.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { chiffre: '5 ans', label: 'de validité, entrées multiples' },
            { chiffre: '180 jours', label: 'de séjour par entrée, extensibles' },
            { chiffre: '500 000 THB', label: 'd’épargne à justifier', euros: true },
          ].map((item) => (
            <div
              key={item.chiffre}
              className="bg-[#111111] border border-white/10 rounded-2xl p-5 text-center"
            >
              <p className="text-2xl font-black text-amber-500 mb-1">{item.chiffre}</p>
              <p className="text-xs text-gray-500 leading-snug">
                {item.label}
                {item.euros && (
                  <>
                    {' '}
                    (<MontantFonds />)
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ÉLIGIBILITÉ ── */}
      <section>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6 tracking-tight">
          Êtes-vous éligible au Visa DTV ?
        </h2>
        <p className="mb-8">
          Il existe trois voies d&apos;accès, et la difficulté n&apos;est presque jamais de remplir
          le formulaire : elle est de déterminer laquelle vous concerne réellement. Beaucoup de
          candidats se croient inéligibles parce qu&apos;ils ont regardé la mauvaise porte.
        </p>

        <div className="space-y-4">
          {voies.map((v) => (
            <div
              key={v.titre}
              className={`bg-[#111111] border ${v.bord} rounded-2xl p-6 transition-colors hover:bg-[#161616]`}
            >
              <h3 className={`text-lg font-bold ${v.accent} mb-2`}>{v.titre}</h3>
              <p className="text-sm mb-4">{v.desc}</p>
              <Link
                href={v.lien}
                className="text-sm font-semibold text-white hover:text-amber-500 transition-colors"
              >
                {v.ancre} <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-[#111111] border border-white/10 rounded-2xl p-5">
          <p className="text-sm mb-3">
            Dans les trois cas, vous devrez justifier{' '}
            <Link
              href="/blog/fonds-bancaires-visa-dtv"
              className="text-amber-500 hover:underline font-medium"
            >
              500 000 THB d&apos;épargne disponible
            </Link>{' '}
            — soit <MontantFonds prefixe="environ " /> au cours du jour. Une somme qui n&apos;est
            jamais bloquée, mais dont l&apos;historique est examiné.
          </p>
          <p className="text-xs text-gray-500 leading-relaxed">
            <strong className="text-gray-300">Notre conseil :</strong> prévoyez plutôt{' '}
            <strong className="text-white">{MARGE_CONSEILLEE}</strong>. Le seuil qui fait foi est
            celui en bahts, et le taux de change bouge en permanence — présenter un solde
            nettement au-dessus du minimum est aussi bien mieux perçu par l&apos;officier
            consulaire qu&apos;un montant calculé au plus juste.
          </p>
        </div>
      </section>

      {/* ── MÉTHODE ── */}
      <section>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6 tracking-tight">
          Notre méthode, en six étapes
        </h2>
        <p className="mb-8">
          De la validation de votre devis au tampon de 180 jours dans votre passeport, voici
          exactement ce qui se passe et dans quel ordre.
        </p>

        <ol className="space-y-4">
          {etapes.map((e) => (
            <li
              key={e.num}
              className="bg-[#111111] border border-white/10 rounded-2xl p-5 flex gap-5"
            >
              <span className="text-amber-500 font-black text-lg flex-none tabular-nums">
                {e.num}
              </span>
              <div>
                <h3 className="text-white font-bold mb-1">{e.titre}</h3>
                <p className="text-sm">{e.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── TARIFS ── */}
      <section id="tarifs" className="scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6 tracking-tight">
          Nos formules et nos tarifs
        </h2>
        <p className="mb-8">
          Nos prix sont publics et dépendent uniquement de la{' '}
          <strong className="text-white">voie d&apos;éligibilité</strong> par laquelle vous obtenez
          le visa. La colonne Soft Power inclut les frais d&apos;inscription à l&apos;école
          certifiée, ce qui explique l&apos;écart.
        </p>

        {/* ── MOBILE : une carte par formule, les deux prix côte à côte ── */}
        <div className="md:hidden space-y-3">
          {formules.map((f) => (
            <div
              key={f.nom}
              className={`rounded-2xl border p-5 ${
                f.vedette ? 'border-amber-500/30 bg-amber-500/5' : 'border-white/10 bg-[#111111]'
              }`}
            >
              <p className={`font-bold text-base ${f.vedette ? 'text-amber-500' : 'text-white'}`}>
                {f.nom}
              </p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{f.desc}</p>

              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/10">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">
                    Télétravail
                  </p>
                  <p className="text-lg font-black text-white">{f.standard}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-amber-500/70 font-bold mb-1">
                    Soft Power
                  </p>
                  <p className="text-lg font-black text-amber-500">{f.softPower}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── ORDINATEUR : tableau comparatif ── */}
        <div className="hidden md:block rounded-2xl border border-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#111111] border-b border-white/10">
                <th className="text-left px-5 py-4 text-gray-400 font-semibold">Formule</th>
                <th className="text-left px-5 py-4 text-gray-400 font-semibold">
                  Voie télétravail ou freelance
                </th>
                <th className="text-left px-5 py-4 text-amber-500 font-semibold">Voie Soft Power</th>
              </tr>
            </thead>
            <tbody>
              {formules.map((f, i) => (
                <tr
                  key={f.nom}
                  className={`border-b border-white/5 last:border-0 ${
                    f.vedette ? 'bg-amber-500/5' : i % 2 === 0 ? 'bg-[#0d0d0d]' : ''
                  }`}
                >
                  <td className="px-5 py-4">
                    <span className="text-white font-bold">{f.nom}</span>
                    <span className="block text-xs text-gray-500 mt-1 max-w-xs">{f.desc}</span>
                  </td>
                  <td className="px-5 py-4 text-white font-bold whitespace-nowrap">{f.standard}</td>
                  <td className="px-5 py-4 text-amber-500 font-bold whitespace-nowrap">
                    {f.softPower}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 bg-[#111111] border border-white/10 rounded-2xl p-5">
          <p className="text-white font-semibold text-sm mb-2">Et si vous partez en famille ?</p>
          <p className="text-sm leading-relaxed">
            Le fait de partir seul, en couple ou avec des enfants{' '}
            <strong className="text-white">ne change pas le tarif</strong>. Chaque personne dépose
            son propre dossier et relève de sa propre voie d&apos;éligibilité : un conjoint qui suit
            un cursus Soft Power sera au tarif Soft Power, un conjoint télétravailleur au tarif
            correspondant. Nous établissons un devis global quand plusieurs dossiers sont montés
            ensemble.
          </p>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          Tarifs à partir de, hors frais de visa d&apos;entrée du pays de dépôt le cas échéant.
        </p>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6 tracking-tight">
          Questions fréquentes sur le Visa DTV
        </h2>
        <p className="mb-8">
          L&apos;immigration thaïlandaise est stricte et les rumeurs circulent vite. Voici des
          réponses claires aux questions qui reviennent à chaque accompagnement.
        </p>

        <div className="space-y-4">
          {homeFaqs.map((faq) => (
            <details
              key={faq.q}
              className="group border border-white/10 rounded-2xl overflow-hidden bg-[#111111]"
            >
              <summary className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer list-none hover:bg-[#161616] transition-colors">
                <span>
                  <span className="block text-[10px] uppercase tracking-widest text-amber-500 font-bold mb-1">
                    {faq.category}
                  </span>
                  <span className="text-white font-semibold text-sm md:text-base">{faq.q}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="text-gray-500 text-lg flex-none mt-4 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="px-5 py-4 bg-[#0d0d0d] border-t border-white/5">
                <p className="text-sm leading-relaxed">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center justify-center border border-white/20 text-white font-bold text-sm py-3 px-7 rounded-full hover:bg-white/5 transition-all"
          >
            Toutes les questions
          </Link>
        </div>
      </section>

      {/* ── GUIDES ── */}
      <section>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6 tracking-tight">
          Nos guides de terrain
        </h2>
        <p className="mb-8">
          Nous documentons publiquement ce que nous rencontrons sur le terrain : montants réels,
          textes officiels et pièges constatés. Aucun de ces guides n&apos;est réservé aux clients.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {guides.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`group bg-[#111111] border border-white/10 rounded-2xl p-5 transition-all ${post.hoverBorder} hover:bg-[#161616]`}
            >
              <span
                className={`inline-block text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full border mb-3 ${post.tagColor}`}
              >
                {post.category}
              </span>
              <h3 className="text-white font-bold text-sm leading-snug group-hover:text-amber-500 transition-colors">
                {post.shortTitle}
              </h3>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center border border-white/20 text-white font-bold text-sm py-3 px-7 rounded-full hover:bg-white/5 transition-all"
          >
            Voir tous les guides
          </Link>
        </div>
      </section>
    </div>
  );
}
