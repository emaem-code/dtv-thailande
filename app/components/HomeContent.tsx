"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import HomeVideos from "./HomeVideos";
import { useModales } from "./ModalesProvider";
import s from "../home.module.css";
import {
  ETAPES_DTV,
  REGLE_DEPOT_DTV,
  VERIFICATION_ECOLE,
  SOURCES_PROCEDURE,
  DATE_VERIFICATION_PROCEDURE,
} from "../lib/methode-dtv";
import SourcesProcedure from "./SourcesProcedure";
// La grille publique ne montre que les formules encore vendues : la VIP reste
// dans FORMULES pour que les devis déjà signés continuent de s'afficher, mais
// l'annoncer au visiteur reviendrait à vendre ce qu'on ne fait plus.
import {
  FORMULES_VENDUES as formules,
  prix,
  MENTION_TRADUCTIONS,
} from "../lib/tarifs";
import { getSortedBlogPosts } from "../blog/posts";
import MontantFonds from "./MontantFonds";
import { MARGE_CONSEILLEE, FONDS_EUR_PARIS, formateEuros } from "../lib/taux";

// ─── FAQ : source unique, sert à l'affichage ET au balisage JSON-LD ───
export const homeFaqs = [
  {
    category: "Finances & Épargne",
    q: "Le seuil d’épargne vaut-il pour tout le foyer, ou par personne ?",
    a: `Par personne. Chaque demandeur doit justifier individuellement du seuil, accompagnants compris : un couple marié avec deux enfants doit donc présenter quatre fois le seuil, et non une. Seule simplification admise, un compte joint permet au titulaire et à son conjoint de produire le même justificatif — le montant reste cumulé, c'est la pièce qui est unique. L'ambassade de Paris fixe ce seuil à ${formateEuros(FONDS_EUR_PARIS)} par personne, exprimés en euros sur sa propre page de documents requis — ce n'est pas la contre-valeur du jour des 500 000 THB de la règle nationale, et c'est plus élevé. Comptez ${MARGE_CONSEILLEE} par personne pour n'être jamais au ras du seuil.`,
  },
  {
    category: "Finances & Épargne",
    q: "Faut-il bloquer cette somme sur mon compte pendant les 5 ans du visa ?",
    a: `Non. La preuve n'est exigée qu'au dépôt de la demande initiale, et lors d'éventuelles extensions locales. L'argent n'est jamais bloqué. En revanche l'ambassade de Paris demande un solde d'au moins ${formateEuros(FONDS_EUR_PARIS)} par personne sur CHACUN des trois derniers relevés mensuels : ce n'est pas un solde atteint une fois, c'est un solde tenu. Prévoyez ${MARGE_CONSEILLEE} par personne plutôt que le strict minimum — un compte qui frôle le seuil un mois sur trois se lit comme un dossier fragile.`,
  },
  {
    category: "Finances & Épargne",
    q: "Mes investissements (crypto, PEA, actions) comptent-ils comme garantie ?",
    a: "Non. L'ambassade thaïlandaise est très conservatrice et rejette les actifs volatils. La somme doit être disponible sur un compte courant ou d'épargne classique. Nous vous accompagnons sur la présentation de vos relevés, y compris de néobanques comme Revolut ou Boursorama, pour qu'ils respectent les standards consulaires.",
  },
  {
    category: "Statut freelance & télétravail",
    q: "Je suis auto-entrepreneur et je n'ai pas d'employeur. Est-ce un problème ?",
    a: "C'est le profil le plus courant, mais aussi celui qui subit le plus de refus quand le dossier est mal monté. L'ambassade s'attend à des fiches de paie classiques. Notre travail consiste à traduire la réalité de votre micro-entreprise — Kbis, URSSAF, SIRENE, portfolio — en un dossier administratif irréfutable aux yeux des officiers consulaires.",
  },
  {
    category: "Soft Power (écoles & immersion)",
    q: VERIFICATION_ECOLE.question,
    a: VERIFICATION_ECOLE.reponse,
    sources: [SOURCES_PROCEDURE.parisDtv],
  },
  {
    category: "Famille & PACS",
    q: "Mon partenaire et moi sommes pacsés. Le visa s’étend-il à mon conjoint ?",
    a: "Attention, c'est un piège majeur : le droit thaïlandais ne reconnaît pas le PACS, uniquement le mariage civil. Sans mariage, une demande de visa « accompagnant » est automatiquement rejetée. Il existe cependant des stratégies légales permettant aux couples pacsés de sécuriser leur départ ensemble, via des dossiers individuels synchronisés.",
  },
  {
    category: "Fiscalité & impôts",
    q: "Vais-je payer des impôts en Thaïlande avec le Visa DTV ?",
    a: "Le DTV ne fait pas automatiquement de vous un résident fiscal. Vous ne devenez imposable en Thaïlande que si vous y séjournez plus de 180 jours dans l'année civile et que vous y rapatriez des revenus. Nous vous fournissons les repères de base pour comprendre la convention fiscale franco-thaïlandaise et organiser votre calendrier de voyage.",
  },
];

const voies = [
  {
    titre: "Télétravail et freelance",
    accent: "text-purple-400",
    bord: "border-purple-500/25",
    desc: "Vous travaillez à distance pour un employeur étranger, ou à votre compte. C'est la voie la plus fréquente — et celle qui concentre le plus de refus, car un statut d'indépendant français ne ressemble à rien de connu pour un officier consulaire.",
    lien: "/blog/visa-dtv-freelance-auto-entrepreneur",
    ancre: "Monter son dossier en tant qu’indépendant",
  },
  {
    titre: "Soft Power",
    accent: "text-orange-400",
    bord: "border-orange-500/25",
    desc: "Vous suivez un cursus certifié de cuisine thaïlandaise ou de Muay Thaï. Aucune condition de revenus n'est exigée par cette voie, ce qui la rend accessible à des profils que les autres excluent — à condition que l'école soit réellement homologuée.",
    lien: "/blog/visa-dtv-soft-power-ecoles",
    ancre: "Écoles certifiées, tarifs et pièges",
  },
  {
    titre: "Famille et conjoint accompagnant",
    accent: "text-fuchsia-400",
    bord: "border-fuchsia-500/25",
    desc: "Vous partez à deux, ou avec vos enfants. La règle est stricte et mal connue : seul le mariage civil ouvre le statut d'accompagnant. Le PACS et le concubinage imposent une autre stratégie, parfaitement légale mais qui se prépare en amont.",
    lien: "/blog/visa-dtv-couple-famille-pacs",
    ancre: "Conjoint et enfants accompagnants",
  },
];

export default function HomeContent() {
  const { ouvrirEligibilite } = useModales();
  const guides = getSortedBlogPosts()
    .filter((p) => new Date(p.publishedAt) <= new Date())
    .slice(0, 6);

  return (
    <div className={s.homeContent}>
      {/* ── LE DTV EN BREF ── */}
      <section id="visa-dtv" className={s.briefSection}>
        <p className={s.eyebrow}>La liberté commence par la clarté.</p>
        <h2>Le Visa DTV en bref</h2>
        <p>
          Le <strong>Destination Thailand Visa</strong>, ou DTV, est le visa
          long séjour créé par la Thaïlande en 2024 pour les travailleurs à
          distance, les indépendants et les personnes venant suivre une activité
          culturelle ou sportive. Il a remplacé, dans les faits, la vie en
          enchaînant les exemptions touristiques.
        </p>
        <p>
          Sa mécanique tient en trois nombres, qu&apos;il ne faut pas confondre
          : <strong>cinq ans de validité</strong>, à entrées multiples ;{" "}
          <strong>180 jours de séjour</strong> à chaque entrée, extensibles une
          fois sur place ; et une{" "}
          <strong>déclaration d&apos;adresse tous les 90 jours</strong> si vous
          restez sans sortir. Un DTV valable cinq ans ne vous autorise donc pas
          à rester cinq ans d&apos;affilée.
        </p>

        <div className={s.keyFigures}>
          {[
            { chiffre: "5 ans", label: "de validité, entrées multiples" },
            {
              chiffre: "180 jours",
              label: "de séjour par entrée, extensibles",
            },
            {
              chiffre: formateEuros(FONDS_EUR_PARIS),
              label: "d’épargne à justifier, par personne",
            },
          ].map((item) => (
            <div key={item.chiffre}>
              <p>{item.chiffre}</p>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ÉLIGIBILITÉ ── */}
      <section id="profils" className={s.profilesSection}>
        <p className={s.eyebrow}>À chaque projet, sa voie.</p>
        <h2>Êtes-vous éligible au Visa DTV ?</h2>
        <p>
          Il existe trois voies d&apos;accès, et la difficulté n&apos;est
          presque jamais de remplir le formulaire : elle est de déterminer
          laquelle vous concerne réellement. Beaucoup de candidats se croient
          inéligibles parce qu&apos;ils ont regardé la mauvaise porte.
        </p>

        <div className={s.profileGrid}>
          {voies.map((v, i) => (
            <div key={v.titre}>
              <span className={s.profileNumber}>
                0{i + 1}
                <span aria-hidden="true">↗</span>
              </span>
              <h3>{v.titre}</h3>
              <p>{v.desc}</p>
              <Link href={v.lien}>
                {v.ancre} <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>

        <div className={s.fundsNote}>
          <p>
            Dans les trois cas, vous devrez justifier{" "}
            <Link href="/blog/fonds-bancaires-visa-dtv">
              <MontantFonds prefixe="" /> d&apos;épargne disponible par personne
            </Link>{" "}
            — sur chacun des trois derniers relevés mensuels. Une somme qui
            n&apos;est jamais bloquée, mais dont l&apos;historique est examiné.
          </p>
          <p>
            <strong>Notre conseil :</strong> prévoyez plutôt{" "}
            <strong>{MARGE_CONSEILLEE}</strong> par personne. Le montant exigé
            par Paris est un plancher, pas une cible : un solde calculé au plus
            juste ne résiste ni à un agio prélevé la veille, ni à un officier
            consulaire tatillon.
          </p>
        </div>
      </section>

      <div className={s.inlineCta}>
        <p>
          Vous vous reconnaissez dans l’un de ces profils ?
          <span>Faisons le point sur votre situation.</span>
        </p>
        <button onClick={ouvrirEligibilite} className={s.primary}>
          Vérifier mon éligibilité ↗
        </button>
      </div>

      <HomeVideos />

      {/* ── MÉTHODE ── */}
      <section id="methode" className={s.methodSection}>
        <p className={s.eyebrow}>Vous avancez. Nous vous accompagnons.</p>
        <h2>Notre méthode, en cinq étapes</h2>
        <p>
          De la préparation de votre dossier à votre arrivée après accord du
          visa, voici les étapes de notre accompagnement.
        </p>

        <p>{REGLE_DEPOT_DTV}</p>
        <SourcesProcedure
          sources={[SOURCES_PROCEDURE.reglesAout2026]}
          className={s.procedureSources}
        />
        <ol>
          {ETAPES_DTV.map((e, index) => (
            <li key={e.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{e.titre}</h3>
                <p>{e.desc}</p>
                <SourcesProcedure
                  sources={e.sources}
                  className={s.procedureSources}
                />
              </div>
            </li>
          ))}
        </ol>
        <p className={s.procedureSources}>
          Sources consultées le {DATE_VERIFICATION_PROCEDURE}. Les exigences du
          poste consulaire compétent font foi.
        </p>
      </section>

      {/* ── TARIFS ── */}
      <section id="tarifs" className={s.pricingSection}>
        <p className={s.eyebrow}>Un projet clair. Un budget transparent.</p>
        <h2>Nos formules et nos tarifs</h2>
        <p>
          Nos prix sont publics et dépendent uniquement de la{" "}
          <strong>voie d&apos;éligibilité</strong> par laquelle vous obtenez le
          visa. Le tarif Soft Power inclut les frais d&apos;inscription à
          l&apos;école certifiée, ce qui explique l&apos;écart.
        </p>
        <p>
          Grille révisée le 2 septembre 2026. Le poste consulaire compétent
          dépend de votre pays de nationalité ou de résidence officielle ; la
          nationalité française ne signifie pas, à elle seule, un dépôt
          obligatoire à Paris. {MENTION_TRADUCTIONS}
        </p>

        <SourcesProcedure
          sources={[
            SOURCES_PROCEDURE.reglesAout2026,
            SOURCES_PROCEDURE.parisProcedure,
          ]}
          className={s.procedureSources}
        />
        <div className={s.priceGrid}>
          {formules.map((f) => (
            <article
              key={f.id}
              className={s.priceCard}
              data-featured={f.vedette}
            >
              <div className={s.priceCardHeading}>
                <h3>{f.nom}</h3>
                <span>
                  {f.vedette
                    ? "Pour préparer aussi l’arrivée"
                    : "Pour préparer votre visa"}
                </span>
              </div>
              <p>{f.description}</p>
              <div className={s.priceAmounts}>
                <div>
                  <span>Télétravail / freelance</span>
                  <strong>{prix(f.standard)}</strong>
                  <small>à partir de / personne</small>
                </div>
                <div>
                  <span>Soft Power</span>
                  <strong>{prix(f.softPower)}</strong>
                  <small>à partir de / personne</small>
                </div>
              </div>
              <ul className={s.priceIncludes}>
                <li>Montage et suivi de votre dossier</li>
                <li>Budget avec frais consulaires</li>
                <li>Estimation des traductions incluse</li>
                {f.vedette && (
                  <li>Préparation de votre arrivée en Thaïlande</li>
                )}
              </ul>
              <button onClick={ouvrirEligibilite} className={s.primary}>
                Préparer mon projet <span aria-hidden="true">↗</span>
              </button>
              <small>Commençons par vérifier votre éligibilité.</small>
            </article>
          ))}
        </div>

        <div className={s.familyNote}>
          <p>
            <strong>Et si vous partez en famille ?</strong>
          </p>
          <p>
            Le fait de partir seul, en couple ou avec des enfants{" "}
            <strong>ne change pas le tarif unitaire</strong>. Chaque personne
            dépose son propre dossier et relève de sa propre voie
            d&apos;éligibilité : un conjoint qui suit un cursus Soft Power sera
            au tarif Soft Power, un conjoint télétravailleur au tarif
            correspondant. Nous établissons un devis global quand plusieurs
            dossiers sont montés ensemble.
          </p>
          <p>
            <strong>
              En revanche, l&apos;épargne à justifier, elle, se multiplie.
            </strong>{" "}
            Le seuil s&apos;applique à chaque demandeur, accompagnants compris.
            Une famille de quatre doit donc présenter{" "}
            <strong>
              <MontantFonds prefixe="" personnes={4} />
            </strong>{" "}
            — c&apos;est le point le plus souvent découvert trop tard.
          </p>
        </div>

        <p>
          Tarifs à partir de, selon les pièces et les prestations prévues au
          devis.
        </p>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className={s.faqSection}>
        <p className={s.eyebrow}>Les bonnes réponses, avant le départ.</p>
        <h2>Questions fréquentes sur le Visa DTV</h2>
        <p>
          L&apos;immigration thaïlandaise est stricte et les rumeurs circulent
          vite. Voici des réponses claires aux questions qui reviennent à chaque
          accompagnement.
        </p>

        <div className={s.faqList}>
          {homeFaqs.map((faq) => (
            <details key={faq.q}>
              <summary>
                <span>
                  <span>{faq.category}</span>
                  <span>{faq.q}</span>
                </span>
                <span aria-hidden="true">+</span>
              </summary>
              <div>
                <p>{faq.a}</p>
                {faq.sources && (
                  <SourcesProcedure
                    sources={faq.sources}
                    className={s.procedureSources}
                  />
                )}
              </div>
            </details>
          ))}
        </div>

        <div>
          <Link href="/faq">Toutes les questions</Link>
        </div>
      </section>

      {/* ── GUIDES ── */}
      <section id="guides" className={s.guidesSection}>
        <p className={s.eyebrow}>Le journal de votre future vie.</p>
        <h2>Nos guides de terrain</h2>
        <p>
          Nous documentons publiquement ce que nous rencontrons sur le terrain :
          montants réels, textes officiels et pièges constatés. Aucun de ces
          guides n&apos;est réservé aux clients.
        </p>

        <div className={s.guideGrid}>
          {guides.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div className={s.guideImage}>
                <Image
                  src={post.image}
                  alt={post.shortTitle}
                  fill
                  sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 30vw"
                />
              </div>
              <span>{post.category}</span>
              <h3>{post.shortTitle}</h3>
              <span className={s.articleLink}>
                Lire le guide <span aria-hidden="true">↗</span>
              </span>
            </Link>
          ))}
        </div>

        <div>
          <Link href="/blog">Voir tous les guides</Link>
        </div>
      </section>
    </div>
  );
}
