import type { Metadata } from 'next';
import Link from 'next/link';
import FormulaireEligibilite from '../components/FormulaireEligibilite';
import MontantFonds from '../components/MontantFonds';

export const metadata: Metadata = {
  title: 'Test d’éligibilité au Visa DTV Thaïlande',
  description:
    'Vérifiez en deux minutes si votre profil remplit les conditions du Visa DTV : épargne, activité professionnelle, passeport. Réponse immédiate et devis personnalisé.',
  alternates: {
    canonical: 'https://dtv-thailande.fr/eligibilite',
  },
  openGraph: {
    title: 'Test d’éligibilité au Visa DTV Thaïlande',
    description:
      'Épargne, activité, passeport : vérifiez en deux minutes si vous remplissez les conditions du Visa DTV.',
    url: 'https://dtv-thailande.fr/eligibilite',
    siteName: 'DTV Thaïlande',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Test d’éligibilité au Visa DTV Thaïlande',
    description:
      'Épargne, activité, passeport : vérifiez en deux minutes si vous remplissez les conditions du Visa DTV.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://dtv-thailande.fr/eligibilite',
  name: 'Test d’éligibilité au Visa DTV Thaïlande',
  description:
    'Questionnaire permettant de vérifier si un profil remplit les conditions du Visa DTV (Destination Thailand Visa) avant de déposer une demande.',
  inLanguage: 'fr-FR',
  isPartOf: {
    '@type': 'WebSite',
    name: 'DTV Thaïlande',
    url: 'https://dtv-thailande.fr',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://dtv-thailande.fr' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Test d’éligibilité',
      item: 'https://dtv-thailande.fr/eligibilite',
    },
  ],
};

export default function PageEligibilite() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([pageSchema, breadcrumbSchema]) }}
      />

      <div className="max-w-3xl mx-auto px-5 md:px-6 py-14 md:py-20">
        {/* ── EN-TÊTE ÉDITORIAL ── */}
        <header className="mb-10">
          <span className="inline-block bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
            Test gratuit · 2 minutes
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-5 tracking-tight leading-tight">
            Suis-je éligible au <span className="text-amber-500">Visa DTV</span> ?
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Le Visa DTV repose sur des critères précis, et la plupart des refus viennent d&apos;un
            dossier déposé sans avoir vérifié ces critères au préalable. Les frais consulaires,
            eux, ne sont pas remboursés. Ce test vous dit en deux minutes où vous en êtes.
          </p>
        </header>

        {/* ── CE QUE LE TEST VÉRIFIE ── */}
        <section className="mb-12 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-5">Ce que le test vérifie</h2>
          <ul className="space-y-4 text-gray-400 text-sm md:text-base leading-relaxed">
            <li className="flex gap-3">
              <span className="text-amber-500 flex-none font-bold">01</span>
              <span>
                <strong className="text-white">L&apos;épargne disponible.</strong> L&apos;ambassade
                demande de prouver l&apos;équivalent de 500 000 THB, soit{' '}
                <MontantFonds prefixe="environ " /> au cours du jour. C&apos;est le seul critère
                réellement bloquant, et aucune agence ne peut passer outre.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-amber-500 flex-none font-bold">02</span>
              <span>
                <strong className="text-white">La voie d&apos;accès.</strong> Activité
                professionnelle exercée à distance, ou inscription à un cursus culturel certifié.
                Les deux mènent au même visa, mais pas avec le même dossier.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-amber-500 flex-none font-bold">03</span>
              <span>
                <strong className="text-white">La nationalité et le lieu de résidence.</strong> Ils
                déterminent ensemble les postes consulaires auxquels vous pouvez déposer — et les
                délais varient du simple au décuple selon le poste.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-amber-500 flex-none font-bold">04</span>
              <span>
                <strong className="text-white">La composition du foyer.</strong> Conjoint et enfants
                accompagnants relèvent d&apos;une catégorie distincte, avec ses propres règles
                financières.
              </span>
            </li>
          </ul>
          <p className="text-xs text-gray-500 mt-6 leading-relaxed">
            Le test est gratuit et sans engagement. Si votre profil ne remplit pas les conditions,
            nous vous le disons franchement plutôt que de vous laisser payer des frais non
            remboursables.
          </p>
        </section>

        {/* ── FORMULAIRE ── */}
        <div className="rounded-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden mb-12">
          <FormulaireEligibilite variante="page" />
        </div>

        {/* ── POUR ALLER PLUS LOIN ── */}
        <section className="border-t border-white/10 pt-10">
          <h2 className="text-xl font-bold text-white mb-5">Avant de vous lancer</h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
            Si vous préférez comprendre les règles avant de remplir quoi que ce soit, ces trois
            guides couvrent les questions qui reviennent le plus souvent.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/blog/fonds-bancaires-visa-dtv"
              className="block p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/40 transition-colors"
            >
              <p className="text-white font-bold text-sm mb-1">La preuve bancaire</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Trois mois d&apos;historique, comptes acceptés, et l&apos;erreur qui fait refuser
                les dossiers.
              </p>
            </Link>
            <Link
              href="/blog/comparatif-visas-thailande"
              className="block p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/40 transition-colors"
            >
              <p className="text-white font-bold text-sm mb-1">DTV ou autre visa ?</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Le comparatif honnête des visas longue durée, y compris quand le DTV n&apos;est pas
                le bon choix.
              </p>
            </Link>
            <Link
              href="/blog/visa-dtv-couple-famille-pacs"
              className="block p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/40 transition-colors"
            >
              <p className="text-white font-bold text-sm mb-1">Partir en famille</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Conjoint et enfants accompagnants : ce qu&apos;il faut vraiment justifier.
              </p>
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-8">
            Une question qui ne rentre pas dans le formulaire ?{' '}
            <Link href="/contact" className="text-amber-500 hover:underline">
              Écrivez-nous directement
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
