import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

// ─── MÉTADONNÉES SEO ──────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Fin de l'exemption Visa 60 jours en Thaïlande : Retour aux 30 jours (2026)",
  description:
    "Urgent : La Thaïlande réduit l'exemption de visa touristique de 60 à 30 jours. Découvrez les nouvelles règles d'immigration 2026, les extensions possibles et la fin des Visa Runs.",
  openGraph: {
    title: "Fin de l'exemption Visa 60 jours en Thaïlande : Retour aux 30 jours",
    description:
      "La Thaïlande réduit l'exemption de visa touristique à 30 jours. Découvrez les nouvelles règles d'immigration et l'alternative du Visa DTV.",
    url: "https://dtv-thailande.fr/blog/fin-exemption-visa-60-jours",
    siteName: "DTV Thaïlande",
    locale: "fr_FR",
    type: "article",
  },
};

// ─── SCHEMA ARTICLE JSON-LD ───────────────────────────────────────────────────
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://dtv-thailande.fr/blog/fin-exemption-visa-60-jours",
  },
  "headline": "Fin de l'exemption Visa 60 jours en Thaïlande : Retour aux 30 jours (Juin 2026)",
  "description":
    "La Thaïlande réduit l'exemption de visa touristique de 60 à 30 jours. Découvrez les nouvelles règles d'immigration 2026.",
  "image": "https://dtv-thailande.fr/poster-immigration-thailande.jpg",
  "author": {
    "@type": "Person",
    "name": "Matthieu Moretti",
    "url": "https://dtv-thailande.fr/contact",
  },
  "publisher": {
    "@type": "Organization",
    "name": "DTV Thaïlande",
    "logo": {
      "@type": "ImageObject",
      "url": "https://dtv-thailande.fr/logo.png",
    },
  },
  "datePublished": "2026-06-11",
  "dateModified": "2026-06-11",
};

// ─── SCHEMA FAQ JSON-LD ───────────────────────────────────────────────────────
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "L'exemption de visa pour la Thaïlande est-elle de 30 ou 60 jours en 2026 ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Depuis début juin 2026, l'exemption de visa est revenue à 30 jours pour les ressortissants français, belges, suisses et canadiens. La mesure temporaire de 60 jours a été annulée par le gouvernement thaïlandais."
      }
    },
    {
      "@type": "Question",
      "name": "Puis-je étendre mon exemption de 30 jours sur place ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. Vous pouvez vous rendre dans un bureau d'immigration local en Thaïlande pour demander une extension de 30 jours supplémentaires via le formulaire TM.7, moyennant des frais de 1 900 THB."
      }
    },
    {
      "@type": "Question",
      "name": "Les Visa Runs terrestres sont-ils toujours autorisés ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Techniquement oui (limités à 2 par année civile par voie terrestre), mais l'immigration traque désormais les abus. Enchaîner les exemptions de 30 jours via des Visa Runs réguliers expose à un risque élevé de refus d'entrée."
      }
    }
  ]
};

export default function ArticleFinExemption() {
  return (
    <article className="max-w-3xl mx-auto px-5 md:px-6 py-14 md:py-20 font-sans text-gray-300 leading-relaxed bg-[#0a0a0a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── EN-TÊTE ── */}
      <header className="mb-12 border-b border-gray-800 pb-10">
        <span className="inline-block bg-red-500/10 border border-red-500/25 text-red-400 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
          Urgent · Actualité Immigration
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
          Fin de l’exemption Visa 60 jours : La Thaïlande repasse à <span className="text-red-400">30 jours</span>
        </h1>
        <p className="text-base text-gray-500 mt-6">
          Lecture : 12 min · Publié le 11 juin 2026 · Par{" "}
          <strong className="text-gray-400">Matthieu Moretti</strong>
        </p>
      </header>

      {/* ── INTRODUCTION (MOTS-CLÉS OPTIMISÉS DANS LES 100 PREMIERS MOTS) ── */}
      <div className="text-lg text-gray-400 mb-12 space-y-5">
        <p>
          Bénéficier d’une <strong>exemption de visa en Thaïlande de 30 jours</strong> est à nouveau la règle stricte pour les voyageurs francophones. Si vous avez prévu de voyager ou de vous installer prochainement, attention à ne pas baser votre calendrier d’expatriation sur des publications obsolètes. Les modalités d’accès au territoire viennent de subir un durcissement majeur à application immédiate.
        </p>
        <p>
          La mesure incitative temporaire qui permettait aux touristes d’entrer sans formalités préalables pour une durée de 60 jours a été <strong>officiellement révoquée par le Cabinet thaïlandais</strong>. Le retour sans concession aux contrôles standards est désormais effectif à tous les postes frontières, aériens comme terrestres.
        </p>
      </div>

      {/* ── SOMMAIRE EN DUR (ACCESSIBLE AUX CRAWLERS) ── */}
      <nav className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 mb-12 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Au programme de ce point légal :</h2>
        <ul className="space-y-3">
          <li><a href="#retour-trente-jours" className="text-red-400 hover:text-red-300 hover:underline transition-colors text-sm md:text-base">1. Ce qui change aux frontières : Le retour aux 30 jours</a></li>
          <li><a href="#raisons-durcissement" className="text-red-400 hover:text-red-300 hover:underline transition-colors text-sm md:text-base">2. Pourquoi un tel durcissement de la part de Bangkok ?</a></li>
          <li><a href="#prolongation-sur-place" className="text-red-400 hover:text-red-300 hover:underline transition-colors text-sm md:text-base">3. Est-il possible d’étendre ces 30 jours sur place ?</a></li>
          <li><a href="#fin-visa-runs" className="text-red-400 hover:text-red-300 hover:underline transition-colors text-sm md:text-base">4. L’ère des Visa Runs faciles est définitivement révolue</a></li>
          <li><a href="#justificatifs-douane" className="text-red-400 hover:text-red-300 hover:underline transition-colors text-sm md:text-base">5. Les contrôles renforcés à la douane : Ce qu’on va vous demander</a></li>
          <li><a href="#alternative-legale-dtv" className="text-red-400 hover:text-red-300 hover:underline transition-colors text-sm md:text-base">6. La solution long terme pour rester sereinement : Le Visa DTV</a></li>
          <li><a href="#comparatif-solutions" className="text-red-400 hover:text-red-300 hover:underline transition-colors text-sm md:text-base">7. Comparatif des options légales selon votre profil</a></li>
        </ul>
      </nav>

      {/* ── SECTION 1 ── */}
      <section className="mb-12" id="retour-trente-jours">
        <h2 className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          1. Ce qui change aux frontières : Le retour aux 30 jours
        </h2>
        <p className="mb-4">
          La politique d’ouverture touristique massive initiée l’année dernière vient de connaître un coup d’arrêt brutal. L’exemption discrétionnaire de 60 jours, qui avait été introduite pour stimuler la reprise économique, n’est plus appliquée.
        </p>
        <p className="mb-4">
          Aujourd’hui, les ressortissants de 54 pays cibles, parmi lesquels figurent la <strong>France, la Suisse, la Belgique et le Canada</strong>, reçoivent à nouveau un tampon standard restreint à <strong className="text-white">30 jours maximum</strong> lors du franchissement de la douane.
        </p>
        <div className="mt-6 p-5 bg-white/5 border border-white/10 rounded-2xl">
          <p className="text-white font-semibold text-sm mb-2">Vérifier les textes officiels mis à jour :</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="http://www.thaiembassy.fr/fr/visa-rdv/les-types-de-visa-et-les-documents-necessaires/exemption-de-visa/" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline inline-flex items-center gap-1">
                → Directives de l’Ambassade Royale de Thaïlande à Paris
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </li>
            <li>
              <a href="https://www.immigration.go.th/" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline inline-flex items-center gap-1">
                → Mises à jour du Bureau National de l’Immigration Thaïlandaise
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* ── SECTION 2 ── */}
      <section className="mb-12" id="raisons-durcissement">
        <h2 className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          2. Pourquoi un tel durcissement de la part de Bangkok ?
        </h2>
        <p className="mb-4">
          Ce revirement soudain n’est pas une anomalie administrative, mais une décision mûrement réfléchie par les instances de sécurité du Royaume. Le déploiement prolongé des séjours de 60 jours sans visa a engendré des dérives systémiques que le ministère de l’Intérieur souhaite désormais éradiquer.
        </p>
        <ul className="space-y-4 mb-6">
          <li className="flex gap-3">
            <span className="text-red-400 flex-shrink-0">❌</span>
            <span><strong className="text-white">Régulation des profils de travailleurs :</strong> L’exemption prolongée permettait à des milliers de profils indépendants et de consultants de s’établir de fait sur le territoire sans s’acquitter d’aucune taxe locale ni formaliser leur situation professionnelle via des visas dédiés comme le DTV.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-red-400 flex-shrink-0">❌</span>
            <span><strong className="text-white">Contrôle des flux aux frontières :</strong> Les autorités ont constaté une explosion des pratiques de contournement logistique, engorgeant les postes frontaliers périphériques.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-red-400 flex-shrink-0">❌</span>
            <span><strong className="text-white">Sécurité du territoire :</strong> Réduire la fenêtre d’accès gratuite oblige les résidents permanents déguisés à s'enregistrer dans les bases de données consulaires globales, offrant une meilleure traçabilité des flux financiers et des profils.</span>
          </li>
        </ul>
      </section>

      {/* ── SECTION 3 ── */}
      <section className="mb-12" id="prolongation-sur-place">
        <h2 className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          3. Est-il possible d’étendre ces 30 jours sur place ?
        </h2>
        <p className="mb-4">
          La possibilité de proroger son séjour à l'intérieur des frontières demeure active, mais elle requiert désormais un passage obligatoire par les services locaux de l’immigration avant le terme des 30 premiers jours accordés.
        </p>
        <p className="mb-4">
          Cette extension unique vous permet d'obtenir un délai supplémentaire non renouvelable, portant la validité totale de votre présence à 60 jours. 
        </p>
        <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 mt-4">
          <h3 className="text-white font-bold text-sm mb-3">Protocole officiel de demande (Formulaire TM.7) :</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-400">
            <li>Présentation physique dans un bureau d’immigration (Chaengwattana à Bangkok, Patong/Phuket Town à Phuket, etc.).</li>
            <li>Remplissage du formulaire de requêtes réglementaires <strong className="text-white">TM.7</strong>.</li>
            <li>Fourniture d’une photographie d’identité conforme aux normes consulaires et des copies certifiées de votre passeport (page d'identité et tampon d'entrée).</li>
            <li>Paiement de la taxe administrative fixe de <strong className="text-white">1 900 THB</strong>.</li>
            <li>Validation du droit de séjour pour <strong className="text-amber-400">30 jours additionnels</strong>.</li>
          </ul>
        </div>
      </section>

      {/* ── SECTION 4 ── */}
      <section className="mb-12" id="fin-visa-runs">
        <h2 className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          4. L’era des Visa Runs faciles est définitivement révolue
        </h2>
        <p className="mb-4">
          Pendant de nombreuses années, la stratégie classique des voyageurs au long cours consistait à orchestrer des rotations rapides vers les pays limitrophes (Laos, Malaisie, Cambodge) pour réinitialiser leur compteur d'exemption le jour même.
        </p>
        <p className="mb-4 text-red-400 font-semibold">
          Mise en garde critique : Les systèmes informatiques des douanes intègrent désormais des alertes automatiques basées sur la récurrence.
        </p>
        <p className="mb-4">
          Désormais, l’accumulation de tampons d’exemption successifs déclenche un signalement lors du contrôle. Les directives transmises aux agents aux frontières imposent un examen minutieux des profils suspects. 
        </p>
        <p>
          Si un officier estime que vos séjours répétés s’apparentent à une résidence permanente sans visa approprié, il est en droit de vous refuser l’accès au territoire, entraînant un refoulement immédiat à vos frais exclusifs.
        </p>
      </section>

      {/* ── SECTION 5 (NOUVELLE SECTION ÉTOFFÉE) ── */}
      <section className="mb-12" id="justificatifs-douane">
        <h2 className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          5. Les contrôles renforcés à la douane : Ce qu’on va vous demander
        </h2>
        <p className="mb-4">
          En parallèle du retour aux 30 jours, les contrôles de l’immigration sont devenus beaucoup plus stricts lors de l’arrivée aux aéroports internationaux de Bangkok Suvarnabhumi, Don Mueang ou Phuket. Pour éviter tout blocage, vous devez impérativement détenir les justificatifs suivants :
        </p>
        <ul className="space-y-3 mb-6 list-disc pl-5 text-sm text-gray-400">
          <li><strong className="text-white">Preuve de sortie du territoire :</strong> Un billet d’avion de retour ou de continuation validé, dont la date de départ s’inscrit strictement dans la limite des 30 jours accordés par l’exemption. Les billets modifiables ou d'attente sont fréquemment rejetés.</li>
          <li><strong className="text-white">Justificatif d’hébergement :</strong> Une réservation d'hôtel ferme, un contrat de location ou une lettre d'invitation certifiée avec l'adresse exacte de votre résidence pour les premières nuitées.</li>
          <li><strong className="text-white">Fonds financiers de subsistance :</strong> Bien que rarement demandé aux touristes classiques, la loi thaïlandaise stipule que chaque voyageur entrant sous le régime de l'exemption doit être capable de présenter l'équivalent de <strong className="text-white">20 000 THB en espèces</strong> (ou devises équivalentes comme l'Euro) par personne pour prouver son autonomie financière.</li>
        </ul>
      </section>

      {/* ── SECTION 6 (CTA DTV) ── */}
      <section className="mb-14" id="alternative-legale-dtv">
        <h2 className="text-2xl font-bold text-white mb-4 scroll-mt-24">
          6. La solution long terme pour rester sereinement : Le Visa DTV
        </h2>
        <p className="mb-4">
          Pour les professionnels indépendants, les créateurs de contenu et les profils éligibles au volet culturel, la fin de l’exemption de 60 jours marque le moment idéal pour régulariser leur situation. La solution légale et pérenne développée par les autorités est le <Link href="/faq" className="text-amber-500 hover:underline font-bold">Destination Thailand Visa (DTV)</Link>.
        </p>
        <p className="mb-6">
          Ce dispositif met un terme définitif à la précarité des statuts touristiques en offrant un cadre d'expatriation d'une stabilité inédite pour le Royaume.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="border border-white/10 rounded-2xl p-5 bg-[#111111]">
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Régime d’Exemption</p>
            <p className="text-white font-bold text-lg mb-2">30 Jours</p>
            <p className="text-gray-400 text-sm">Insécurité juridique constante, risques de refoulement, frais d’extensions répétitifs et interdiction d’exercer une activité professionnelle.</p>
          </div>
          <div className="border border-amber-500/30 rounded-2xl p-5 bg-amber-500/5">
            <p className="text-amber-500 text-xs font-semibold uppercase tracking-wider mb-2">Option Cadre DTV</p>
            <p className="text-amber-400 font-bold text-lg mb-2">5 Ans</p>
            <p className="text-gray-300 text-sm">Entrées multiples illimitées, séjours continus de 180 jours extensibles, conformité fiscale totale et sérénité absolue face aux contrôles.</p>
          </div>
        </div>
      </section>

      {/* ── SECTION 7 (NOUVELLE SECTION COMPARATIVE) ── */}
      <section className="mb-14" id="comparatif-solutions">
        <h2 className="text-2xl font-bold text-white mb-5 scroll-mt-24">
          7. Comparatif des options légales selon votre profil
        </h2>
        <p className="mb-4">
          Afin de choisir la meilleure stratégie d'expatriation ou de séjour prolongé suite aux modifications légales de juin 2026, voici un récapitulatif des options de visas officiels :
        </p>
        <div className="space-y-4">
          <div className="border rounded-2xl p-6 bg-[#111111] border-white/5">
            <p className="text-white font-semibold mb-1">Profil : Touriste de courte durée (&lt; 60 jours)</p>
            <p className="text-sm text-gray-400 mb-2">Option conseillée : Exemption de 30 jours + Extension de 30 jours auprès de l'immigration sur place (Coût : 1 900 THB).</p>
          </div>
          <div className="border rounded-2xl p-6 bg-[#111111] border-purple-500/20">
            <p className="text-white font-semibold mb-1">Profil : Freelance, Digital Nomad, Auto-entrepreneur</p>
            <p className="text-sm text-gray-400 mb-2">Option conseillée : <Link href="/blog/visa-dtv-freelance-auto-entrepreneur" className="text-purple-400 hover:underline font-medium">Le Visa DTV (Voie Workcation)</Link>. Permet de travailler légalement pour des structures hors de Thaïlande avec un historique bancaire de 500 000 THB.</p>
          </div>
          <div className="border rounded-2xl p-6 bg-[#111111] border-emerald-500/20">
            <p className="text-white font-semibold mb-1">Profil : Passionnés de Culture, Muay Thaï ou Cuisine</p>
            <p className="text-sm text-gray-400 mb-2">Option conseillée : <Link href="/blog/visa-dtv-soft-power-ecoles" className="text-emerald-400 hover:underline font-medium">Le Visa DTV (Voie Soft Power)</Link>. Idéal pour les indépendants ne disposant pas de fiches de paie classiques mais inscrits dans un programme académique ou sportif certifié.</p>
          </div>
        </div>
      </section>

      {/* ── MAILLAGE INTERNE CONSOLIDÉ ── */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 mb-12">
        <p className="text-white font-bold text-sm mb-4">📚 Ressources complémentaires de notre agence :</p>
        <ul className="space-y-3">
          <li>
            <Link href="/blog/visa-dtv-freelance-auto-entrepreneur" className="text-sky-400 hover:text-sky-300 hover:underline text-sm transition-colors">
              → Guide DTV pour les Indépendants : Valider son dossier sans fiches de paie
            </Link>
          </li>
          <li>
            <Link href="/blog/fonds-bancaires-visa-dtv" className="text-sky-400 hover:text-sky-300 hover:underline text-sm transition-colors">
              → Preuve financière : Comment sécuriser la validation des 500 000 THB ?
            </Link>
          </li>
          <li>
            <Link href="/blog/tdac-thailande-carte-arrivee" className="text-sky-400 hover:text-sky-300 hover:underline text-sm transition-colors">
              → Tutoriel d'arrivée : Remplir sans erreur le nouveau formulaire TDAC obligatoire
            </Link>
          </li>
        </ul>
      </div>

      {/* ── FAQ INTERNE ── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white mb-6">FAQ : Évolution de la réglementation de l’exemption</h2>
        <div className="space-y-4">
          {faqSchema.mainEntity.map((item) => (
            <details key={item.name} className="group border border-gray-800 rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none bg-[#111111] hover:bg-[#161616] transition-colors">
                <span className="text-white font-semibold text-sm">{item.name}</span>
                <span className="text-gray-500 text-lg flex-none transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="px-5 py-4 bg-[#0d0d0d] border-t border-gray-800">
                <p className="text-gray-400 text-sm leading-relaxed">{item.acceptedAnswer.text}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ── ZONE DE CONVERSION PRINCIPALE ── */}
      <div className="mt-4 bg-[#111111] border border-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500 opacity-5 rounded-full blur-3xl" />
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 relative z-10">
          Mettez fin aux contraintes de séjour temporaire
        </h3>
        <p className="text-gray-400 mb-8 text-sm md:text-base relative z-10">
          La fin de la tolérance des 60 jours impose une transition vers des solutions stables. Notre cabinet prend en charge l'intégralité du processus d'obtention de votre Visa DTV : audit de solvabilité, traduction juridique des pièces et liaison avec les services consulaires.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 relative z-10">
          <Link href="/" className="inline-flex items-center justify-center bg-white text-black font-bold text-sm py-4 px-7 rounded-full hover:bg-gray-100 transition-all duration-300">
            Tester mon éligibilité au Visa DTV
          </Link>
          <Link href="/contact" className="inline-flex items-center justify-center border border-white/20 text-white font-bold text-sm py-4 px-7 rounded-full hover:bg-white/5 transition-all duration-300">
            Prendre rendez-vous avec un conseiller
          </Link>
        </div>
      </div>
    </article>
  );
}