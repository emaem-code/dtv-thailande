import Link from 'next/link';
import type { Metadata } from 'next';
import { AGENCE, MEDIATEUR, mentionSiret, siretEnAttente, RETRACTATION_JOURS } from '../lib/agence';

/**
 * Mentions légales.
 *
 * L'identité de l'entreprise n'est pas recopiée ici : elle est lue dans
 * `app/lib/agence.ts`, la même source que les devis et les courriels. Une
 * adresse qui figure à trois endroits finit toujours par différer d'un
 * endroit à l'autre, et c'est précisément la mention qu'un client vérifie
 * quand quelque chose ne va pas.
 */

export const metadata: Metadata = {
  title: 'Mentions Légales | DTV Thaïlande',
  description:
    'Mentions légales, identité de l’éditeur, médiation de la consommation, protection des données et hébergement du site DTV Thaïlande.',
  alternates: { canonical: 'https://dtv-thailande.fr/mentions-legales' },
  openGraph: {
    title: 'Mentions Légales | DTV Thaïlande',
    description: 'Identité de l’éditeur, médiation de la consommation, données personnelles.',
    url: 'https://dtv-thailande.fr/mentions-legales',
    siteName: 'DTV Thaïlande',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mentions Légales | DTV Thaïlande',
    description: 'Identité de l’éditeur, médiation de la consommation, données personnelles.',
    images: ['/og-image.jpg'],
  },
};

function Section({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-2" data-reveal="">{titre}</h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 md:p-16 font-sans">
      <div className="max-w-3xl mx-auto space-y-10">
        <Link
          href="/"
          className="text-amber-500 hover:text-white transition-colors uppercase tracking-wide text-sm font-bold"
        >
          ← Retour à l&apos;accueil
        </Link>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Mentions légales</h1>

        <section className="space-y-8 text-gray-400 text-sm md:text-base leading-relaxed">
          <Section titre="1. Éditeur du site">
            <p>
              <strong className="text-white">{AGENCE.nom}</strong>, entrepreneur individuel exerçant
              sous l&apos;enseigne {AGENCE.enseigne}.
            </p>
            <p>Activité : {AGENCE.activite}.</p>
            <p>
              Siège social : {AGENCE.adresse}, {AGENCE.codePostal} {AGENCE.ville}, {AGENCE.pays}.
            </p>
            <p>
              {mentionSiret()}
              {siretEnAttente() && (
                <span className="block text-gray-500 text-sm mt-1">
                  La formalité de création a été déposée auprès du guichet unique des entreprises.
                  Le numéro sera publié ici dès sa réception.
                </span>
              )}
            </p>
            <p>{AGENCE.mentionTva}</p>
            <p>
              Courriel :{' '}
              <a href={`mailto:${AGENCE.email}`} className="text-amber-500 hover:text-white transition-colors">
                {AGENCE.email}
              </a>
            </p>
            <p>Directeur de la publication : {AGENCE.nom}.</p>
          </Section>

          <Section titre="2. Hébergement">
            <p>Le site est hébergé par Vercel Inc.</p>
            <p>340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.</p>
            <p>
              <a
                href="https://vercel.com"
                className="text-amber-500 hover:text-white transition-colors"
                rel="noopener noreferrer"
                target="_blank"
              >
                vercel.com
              </a>
            </p>
          </Section>

          <Section titre="3. Nature des prestations">
            <p>
              {AGENCE.enseigne} propose un accompagnement administratif à la constitution et au dépôt
              d&apos;un dossier de visa DTV. Il ne s&apos;agit ni d&apos;une prestation de conseil
              juridique, ni d&apos;un contrat de voyage, ni d&apos;une garantie de délivrance du
              visa : la décision appartient au seul poste consulaire.
            </p>
            <p>
              Les conditions financières applicables — honoraires, frais externes, acompte, délais —
              figurent sur le devis personnalisé remis avant tout engagement.
            </p>
          </Section>

          <Section titre="4. Droit de rétractation">
            <p>
              Les prestations étant conclues à distance, le client particulier dispose d&apos;un
              délai de {RETRACTATION_JOURS} jours à compter de l&apos;acceptation du devis pour se
              rétracter, sans avoir à se justifier ni à supporter de pénalité, conformément à
              l&apos;article L221-18 du code de la consommation.
            </p>
            <p>
              Si le client demande expressément que l&apos;exécution commence avant la fin de ce
              délai, il conserve son droit de rétractation mais règle, en cas d&apos;exercice de
              celui-ci, la part de prestation déjà effectuée au prorata.
            </p>
          </Section>

          <Section titre="5. Médiation de la consommation">
            {MEDIATEUR ? (
              <>
                <p>
                  Conformément à l&apos;article L612-1 du code de la consommation, tout client
                  particulier peut recourir gratuitement au médiateur de la consommation désigné
                  ci-après, en vue de la résolution amiable d&apos;un litige, après avoir tenté de
                  le résoudre directement par une réclamation écrite.
                </p>
                <p>
                  <strong className="text-white">{MEDIATEUR.nom}</strong>
                  <br />
                  {MEDIATEUR.adresse}
                  <br />
                  <a
                    href={MEDIATEUR.site}
                    className="text-amber-500 hover:text-white transition-colors"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {MEDIATEUR.site}
                  </a>
                </p>
              </>
            ) : (
              <>
                <p>
                  Conformément à l&apos;article L612-1 du code de la consommation, tout client
                  particulier peut recourir gratuitement à un médiateur de la consommation en vue de
                  la résolution amiable d&apos;un litige, après avoir tenté de le résoudre
                  directement par une réclamation écrite.
                </p>
                <p className="text-gray-500">
                  L&apos;adhésion à un dispositif de médiation référencé est en cours. Les
                  coordonnées du médiateur seront publiées ici dès la désignation effectuée, et
                  communiquées sans délai à tout client qui en ferait la demande à l&apos;adresse
                  ci-dessus.
                </p>
              </>
            )}
            <p className="text-gray-500 text-sm">
              La plateforme européenne de règlement en ligne des litiges a définitivement fermé le
              20 juillet 2025 ; elle ne constitue plus une voie de recours.
            </p>
          </Section>

          <Section titre="6. Données personnelles">
            <p>
              <strong className="text-white">Responsable du traitement :</strong> {AGENCE.nom},
              à l&apos;adresse du siège indiquée ci-dessus.
            </p>
            <p>
              <strong className="text-white">Ce qui est collecté et pourquoi.</strong> Les
              informations transmises par le formulaire d&apos;éligibilité — identité, adresse
              électronique, téléphone, nationalité, situation professionnelle, composition du foyer —
              servent exclusivement à évaluer l&apos;éligibilité au visa DTV, à établir un devis et
              à assurer le suivi du dossier. La base légale est l&apos;exécution de mesures
              précontractuelles puis du contrat.
            </p>
            <p>
              <strong className="text-white">Qui y a accès.</strong> Ces données ne sont ni cédées ni
              vendues. Elles transitent par les prestataires techniques nécessaires au
              fonctionnement du service : Vercel pour l&apos;hébergement, Neon pour la base de
              données, Resend pour l&apos;envoi des courriels, Formspree pour la réception des
              formulaires.
            </p>
            <p>
              <strong className="text-white">Combien de temps.</strong> Les demandes sans suite sont
              conservées trois ans à compter du dernier contact. Les dossiers ayant donné lieu à un
              devis signé sont conservés dix ans, durée de conservation des pièces comptables.
            </p>
            <p>
              <strong className="text-white">Vos droits.</strong> Vous disposez d&apos;un droit
              d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition et
              de portabilité. Écrivez à{' '}
              <a href={`mailto:${AGENCE.email}`} className="text-amber-500 hover:text-white transition-colors">
                {AGENCE.email}
              </a>
              , il y sera répondu sous un mois. En cas de désaccord persistant, vous pouvez saisir la
              CNIL.
            </p>
          </Section>

          <Section titre="7. Cookies">
            <p>
              Ce site ne dépose aucun cookie publicitaire ni traceur de mesure d&apos;audience. Seul
              un cookie technique de session est utilisé dans l&apos;espace d&apos;administration,
              accessible au seul éditeur, afin de maintenir sa connexion. Aucun consentement
              n&apos;est donc requis.
            </p>
          </Section>

          <Section titre="8. Propriété intellectuelle">
            <p>
              Les textes, articles, illustrations et éléments graphiques publiés sur ce site sont la
              propriété de {AGENCE.nom}, sauf mention contraire. Toute reproduction intégrale sans
              autorisation est interdite. La citation d&apos;un extrait est libre dès lors
              qu&apos;elle est accompagnée d&apos;un lien vers la page d&apos;origine.
            </p>
          </Section>

          <Section titre="9. Exactitude des informations publiées">
            <p>
              Les articles de ce site décrivent une réglementation thaïlandaise qui évolue
              fréquemment. Chaque page porte sa date de dernière mise à jour. Malgré le soin apporté
              à leur vérification, ces informations sont données à titre indicatif et ne sauraient
              engager la responsabilité de l&apos;éditeur : seules les autorités consulaires font
              foi.
            </p>
          </Section>
        </section>

        <p className="text-xs text-gray-700 pt-4">
          Dernière mise à jour : 18 septembre 2026.
        </p>
      </div>
    </div>
  );
}
