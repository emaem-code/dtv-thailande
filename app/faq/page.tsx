import React from 'react';
import BoutonEligibilite from '../components/BoutonEligibilite';
import Link from 'next/link';
import { estPublie } from '../blog/posts';
import { getTauxThb, eurosArrondis, formateEuros, MARGE_CONSEILLEE } from '../lib/taux';

type Faq = {
  q: string;
  a: string;
  lien?: { href: string; label: string };
};

type Groupe = {
  id: string;
  titre: string;
  onglet: string;
  /** Couleur du thème, alignée sur les catégories du blog */
  texte: string;
  bord: string;
  fond: string;
  bordGauche: string;
  survol: string;
  icone: React.ReactNode;
  questions: Faq[];
};

// Icônes de thème (traits simples, dans la couleur du groupe)
const I = {
  globe: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18 15 15 0 010-18z" />,
  euro: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 9.5a4.5 4.5 0 100 5M4 11h7M4 13.5h7M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  valise: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 6V5a2 2 0 012-2h2a2 2 0 012 2v1m-9 0h14a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" />,
  flamme: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3s5 4.5 5 9a5 5 0 01-10 0c0-1.7.9-3.2 1.8-4.3.4 1 1.2 1.8 2.2 1.8-.5-2.5 1-5.5 1-6.5z" />,
  famille: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.4-1.8M17 20H7m10 0v-2c0-.7-.1-1.3-.4-1.8M7 20H2v-2a3 3 0 015.4-1.8M7 20v-2c0-.7.1-1.3.4-1.8m0 0a5 5 0 019.2 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
  envoi: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />,
  maison: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V10" />,
  coeur: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.3 8.6a4.5 4.5 0 017.7-3.2l.5.5.5-.5a4.5 4.5 0 016.4 6.3L12 20.5l-7.4-7.5a4.5 4.5 0 01-.3-4.4z" />,
};

// ─── SOURCE UNIQUE : alimente l'affichage ET le balisage JSON-LD ───
const groupes: Groupe[] = [
  {
    id: 'general',
    texte: 'text-amber-400',
    bord: 'border-amber-500/25',
    fond: 'bg-amber-500/10',
    bordGauche: 'border-l-amber-500/60',
    survol: 'hover:border-amber-500/50',
    icone: I.globe,
    titre: 'Le Visa DTV en général',
    onglet: 'Général',
    questions: [
      {
        q: "Qu'est-ce que le Visa DTV exactement ?",
        a: "Le Destination Thailand Visa est un visa long séjour créé par la Thaïlande en 2024. Il s'adresse aux travailleurs à distance, aux indépendants, et aux personnes venant suivre une activité culturelle ou sportive reconnue. Il est valable cinq ans, à entrées multiples, et remplace dans les faits la pratique consistant à enchaîner les exemptions touristiques.",
      },
      {
        q: 'Combien de temps peut-on rester en Thaïlande avec un DTV ?',
        a: "180 jours par entrée, extensibles une fois de 180 jours supplémentaires sur place, soit 360 jours maximum par entrée. Attention à la confusion la plus fréquente : un visa valable cinq ans ne vous autorise pas à rester cinq ans d'affilée. Chaque sortie du territoire suivie d'une rentrée vous redonne 180 jours neufs.",
        lien: { href: '/blog/extension-180-jours-visa-dtv-thailande', label: "Tout sur l'extension de 180 jours" },
      },
      {
        q: 'Le Visa DTV autorise-t-il à travailler en Thaïlande ?',
        a: "Il autorise le travail à distance pour des clients ou un employeur situés hors de Thaïlande. Il ne donne aucun droit à exercer une activité sur le marché thaïlandais, ni à être employé par une société thaïlandaise : cela relève du visa Non-B assorti d'un permis de travail.",
        lien: { href: '/blog/comparatif-visas-thailande', label: 'Comparer le DTV aux autres visas long séjour' },
      },
      {
        q: 'Quel est le délai pour obtenir le Visa DTV ?',
        a: "Comptez 3 à 4 semaines de traitement à l'ambassade de Paris, qui est le poste de dépôt des résidents français depuis le 31 août 2026. Les délais courts que l'on lit encore — 3 à 4 jours ouvrables à Vientiane ou à Kuala Lumpur — ne sont plus accessibles qu'aux personnes résidant effectivement dans ces pays. Ce délai consulaire ne comprend pas la préparation du dossier, qui reste l'étape la plus longue et la plus déterminante.",
        lien: { href: '/blog/guide-depot-dossier-evisa-dtv', label: 'Le guide du dépôt sur le portail e-Visa' },
      },
      {
        q: 'Combien coûtent les frais consulaires ?',
        a: "Environ 350 € à l'ambassade de Paris, le poste qui concerne l'immense majorité des demandeurs francophones depuis le 31 août 2026. Les tarifs plus bas pratiqués à Vientiane (10 000 THB) ou à Kuala Lumpur sont désormais réservés aux résidents de ces pays. Ces frais sont indépendants des honoraires d'une agence et se règlent directement auprès du poste consulaire. À Paris, il faut leur ajouter le coût des traductions assermentées, devenu le deuxième poste de dépense d'un dossier.",
      },
      {
        q: "L'exemption touristique de 60 jours existe-t-elle toujours ?",
        a: "Non, plus pour les entrées effectuées à partir du 15 septembre 2026. Le texte publié au Journal Royal le 31 août 2026 ramène l'exemption à 30 jours et réduit la liste des pays concernés de 93 à 60 — la France, la Belgique et la Suisse y figurent toujours. La mesure n'est pas rétroactive : une entrée jusqu'au 14 septembre inclus conserve les 60 jours portés sur le tampon, jusqu'à leur terme. L'extension de 30 jours sur place reste possible contre 1 900 THB, mais extensions et entrées terrestres sont plafonnées à deux par année civile.",
        lien: { href: '/blog/fin-exemption-visa-60-jours', label: 'Le détail du nouveau barème' },
      },
    ],
  },
  {
    id: 'finances',
    texte: 'text-teal-400',
    bord: 'border-teal-500/25',
    fond: 'bg-teal-500/10',
    bordGauche: 'border-l-teal-500/60',
    survol: 'hover:border-teal-500/50',
    icone: I.euro,
    titre: 'Fonds bancaires et épargne',
    onglet: 'Finances',
    questions: [
      {
        q: 'Faut-il bloquer 15 000 € sur mon compte pendant les 5 ans du visa ?',
        a: "Non. L'administration exige de prouver la liquidité de 500 000 THB par demandeur, soit environ {EUROS} au cours du jour, uniquement au moment de la demande et lors d'une éventuelle extension sur place. L'argent n'est jamais bloqué ni consigné. En revanche, l'historique du compte est examiné avec attention. Nous conseillons de prévoir plutôt {MARGE} par personne : le seuil qui fait foi est celui en bahts, et le taux de change bouge en permanence.",
        lien: { href: '/blog/fonds-bancaires-visa-dtv', label: 'Le décryptage complet des fonds bancaires' },
      },
      {
        q: "Faut-il 3 ou 6 mois d'historique bancaire ?",
        a: "L'exigence officielle est de 3 mois, y compris à l'ambassade de Paris qui le publie explicitement. La rumeur des 6 mois provient de dossiers où l'officier a réclamé des relevés complémentaires face à des mouvements inhabituels. Ce qui varie réellement d'une ambassade à l'autre, ce n'est pas la durée mais l'exigence de traduction assermentée.",
        lien: { href: '/blog/fonds-bancaires-visa-dtv', label: "D'où vient la rumeur des six mois" },
      },
      {
        q: 'Mes investissements en crypto, PEA ou actions comptent-ils ?',
        a: "Non. L'ambassade thaïlandaise rejette les actifs volatils. La somme doit être disponible sur un compte courant ou un compte d'épargne classique. Les néobanques comme Revolut ou Boursorama sont acceptées, à condition que les relevés soient présentés dans un format conforme aux attentes consulaires.",
        lien: { href: '/blog/fonds-bancaires-visa-dtv', label: 'Le tableau des comptes acceptés et refusés' },
      },
      {
        q: 'Un compte joint ou un compte professionnel est-il accepté ?',
        a: "La règle générale veut que les fonds soient présentés sur un compte personnel au nom du demandeur. Un compte joint peut poser difficulté car la propriété des fonds devient ambiguë, et un compte de société est régulièrement refusé au motif que l'argent appartient à la personne morale, non au demandeur.",
      },
    ],
  },
  {
    id: 'statut',
    texte: 'text-purple-400',
    bord: 'border-purple-500/25',
    fond: 'bg-purple-500/10',
    bordGauche: 'border-l-purple-500/60',
    survol: 'hover:border-purple-500/50',
    icone: I.valise,
    titre: 'Statut professionnel et télétravail',
    onglet: 'Freelance',
    questions: [
      {
        q: "Je suis auto-entrepreneur et je n'ai pas d'employeur. Est-ce un problème ?",
        a: "C'est le profil le plus courant, et aussi celui qui subit le plus de refus quand le dossier est mal construit. L'ambassade s'attend à des fiches de paie classiques. Tout l'enjeu consiste à traduire la réalité d'une micro-entreprise française — Kbis, avis SIRENE, attestations URSSAF, contrats et portfolio — en un dossier lisible pour un officier consulaire.",
        lien: { href: '/blog/visa-dtv-freelance-auto-entrepreneur', label: 'Les six documents qui remplacent la fiche de paie' },
      },
      {
        q: 'Mes revenus sont irréguliers. Est-ce rédhibitoire ?',
        a: "Non, l'irrégularité des revenus d'un indépendant est connue des consulats. Ce qui compte est la cohérence globale du dossier et la stabilité du solde bancaire sur la période examinée. Un mois creux isolé ne bloque pas un dossier ; un solde qui descend sous le seuil exigé, oui.",
      },
      {
        q: 'Faut-il faire traduire mes documents en anglais ?',
        a: "Oui, et c'est devenu un poste de dépense à part entière. L'ambassade de Paris, où déposent désormais les résidents français, exige des traductions assermentées : ce n'est plus un critère d'arbitrage entre ambassades, puisque le choix n'existe plus. Le seul levier restant est de réduire le volume à traduire. Demander à votre banque une attestation de solde rédigée en anglais, ou télécharger vos relevés directement en anglais chez Revolut, N26 ou Wise, évite de faire traduire trois mois de relevés ligne à ligne.",
      },
    ],
  },
  {
    id: 'softpower',
    texte: 'text-orange-400',
    bord: 'border-orange-500/25',
    fond: 'bg-orange-500/10',
    bordGauche: 'border-l-orange-500/60',
    survol: 'hover:border-orange-500/50',
    icone: I.flamme,
    titre: 'Voie Soft Power : écoles et cursus',
    onglet: 'Soft Power',
    questions: [
      {
        q: "Comment être certain que l'école choisie ne fera pas annuler mon visa ?",
        a: "Il existe un critère binaire : l'établissement doit pouvoir vous produire deux documents, sa licence commerciale DBD et son accréditation ministérielle. Une école qui hésite, tarde ou refuse de les fournir doit être écartée immédiatement. Le risque d'un établissement fantôme n'est pas un simple refus de visa mais une interdiction de territoire.",
        lien: { href: '/blog/visa-dtv-soft-power-ecoles', label: 'Reconnaître une école certifiée' },
      },
      {
        q: 'Cuisine thaïlandaise ou Muay Thaï : que choisir ?',
        a: "Les deux voies sont également valables aux yeux de l'immigration. Le choix dépend de votre condition physique, de la durée du cursus et du budget. Les tarifs constatés diffèrent sensiblement, et les formats proposés évoluent : certains programmes courts ont été retirés de l'offre en 2026.",
        lien: { href: '/blog/visa-dtv-soft-power-ecoles', label: 'La grille tarifaire publique des deux cursus' },
      },
      {
        q: 'Suis-je obligé de suivre réellement les cours ?',
        a: "Oui, et ce point est devenu sensible. L'immigration thaïlandaise a annulé des centaines de visas Éducation frauduleux en 2026, précisément pour des cursus jamais suivis. Par ailleurs, une extension de séjour sur la voie Soft Power exige une attestation récente de l'école confirmant que vous suivez toujours le programme.",
        lien: { href: '/blog/extension-180-jours-visa-dtv-thailande', label: "Pourquoi un cursus terminé bloque l'extension" },
      },
    ],
  },
  {
    id: 'famille',
    texte: 'text-fuchsia-400',
    bord: 'border-fuchsia-500/25',
    fond: 'bg-fuchsia-500/10',
    bordGauche: 'border-l-fuchsia-500/60',
    survol: 'hover:border-fuchsia-500/50',
    icone: I.famille,
    titre: 'Famille, couple et enfants',
    onglet: 'Famille',
    questions: [
      {
        q: "Mon partenaire et moi sommes pacsés. Le visa s'étend-il à mon conjoint ?",
        a: "Non, et c'est le piège le plus coûteux de cette voie. Le droit thaïlandais ne reconnaît que le mariage civil : une demande de statut accompagnant fondée sur un PACS ou un concubinage est rejetée. Il existe cependant une stratégie parfaitement légale consistant à monter des dossiers individuels synchronisés.",
        lien: { href: '/blog/visa-dtv-couple-famille-pacs', label: 'Les unions reconnues et la double légalisation' },
      },
      {
        q: "Jusqu'à quel âge mes enfants peuvent-ils être rattachés ?",
        a: "Les enfants légitimes de moins de 20 ans peuvent obtenir un DTV en tant que personnes à charge du demandeur principal. Au-delà de cet âge, l'enfant doit constituer son propre dossier et remplir lui-même les conditions d'éligibilité.",
        lien: { href: '/blog/visa-dtv-couple-famille-pacs', label: 'Le dossier des enfants, pièce par pièce' },
      },
      {
        q: 'Faut-il justifier 500 000 THB par personne ?',
        a: "Oui, et c'est la confusion la plus répandue comme la plus coûteuse. Le seuil de 500 000 THB s'apprécie par personne rattachée à la demande : un couple marié avec deux enfants doit justifier de 2 000 000 THB, pas de 500 000. L'ambassade de Paris applique cette règle strictement. Les fonds peuvent être réunis sur le compte du demandeur principal, mais leur montant doit couvrir tout le foyer. Ce que le mariage change n'est donc pas la somme, mais la nature du dossier : le conjoint et les enfants de moins de 20 ans déposent comme personnes à charge et n'ont pas à justifier de leur propre activité éligible. Un couple pacsé ou en concubinage n'a pas accès à ce rattachement, et chaque adulte doit monter un dossier complet, activité comprise.",
        lien: { href: '/blog/visa-dtv-couple-famille-pacs', label: 'Le calcul des fonds, foyer par foyer' },
      },
    ],
  },
  {
    id: 'depot',
    texte: 'text-sky-400',
    bord: 'border-sky-500/25',
    fond: 'bg-sky-500/10',
    bordGauche: 'border-l-sky-500/60',
    survol: 'hover:border-sky-500/50',
    icone: I.envoi,
    titre: 'Le dépôt du dossier',
    onglet: 'Dépôt',
    questions: [
      {
        q: 'Peut-on demander le Visa DTV depuis la Thaïlande ?',
        a: "Non. Le DTV se dépose exclusivement auprès d'une ambassade ou d'un consulat de Thaïlande à l'étranger, via le système e-Visa — et, depuis le 31 août 2026, auprès du poste de votre pays de nationalité ou de résidence légale. Il n'existe aucune conversion sur place depuis un autre statut. Une personne installée en Thaïlande sous exemption doit donc rentrer en France pour déposer : un aller-retour dans un pays voisin ne suffit plus.",
        lien: { href: '/blog/guide-depot-dossier-evisa-dtv', label: 'Le fonctionnement du portail e-Visa' },
      },
      {
        q: 'Quelle ambassade choisir pour déposer ma demande ?',
        a: "La question ne se pose pratiquement plus. Depuis le 31 août 2026, la demande doit être déposée dans votre pays de nationalité ou de résidence légale : l'ambassade de Paris pour un Français résidant en France, Berne pour un Suisse, Bruxelles pour un Belge. Les postes de Vientiane, Kuala Lumpur ou Phnom Penh restent ouverts, mais uniquement aux personnes qui résident effectivement dans ces pays et peuvent le prouver. L'arbitrage entre délai, frais consulaires et exigences de traduction appartient au passé.",
        lien: { href: '/blog/fonds-bancaires-visa-dtv', label: 'Qui peut déposer où, poste par poste' },
      },
      {
        q: 'Un refus antérieur ou un dépassement de séjour bloque-t-il ma demande ?',
        a: "Un dépassement court, réglé volontairement au moment du départ, n'entraîne aucune interdiction et ne constitue pas un obstacle en soi. En revanche il reste inscrit dans la base de données de l'immigration et s'ajoute à votre historique. Une interdiction d'entrée formelle relève d'une tout autre situation, qui nécessite l'avis d'un avocat.",
        lien: { href: '/blog/overstay-thailande-amende-blacklist-visa-dtv', label: 'Le barème officiel des dépassements' },
      },
    ],
  },
  {
    id: 'surplace',
    texte: 'text-indigo-400',
    bord: 'border-indigo-500/25',
    fond: 'bg-indigo-500/10',
    bordGauche: 'border-l-indigo-500/60',
    survol: 'hover:border-indigo-500/50',
    icone: I.maison,
    titre: 'Une fois sur place',
    onglet: 'Sur place',
    questions: [
      {
        q: "Qu'est-ce que le rapport des 90 jours (TM47) ?",
        a: "C'est une déclaration d'adresse obligatoire pour tout étranger séjournant plus de 90 jours consécutifs en Thaïlande. Elle n'a aucun effet sur la durée de votre séjour autorisé : ce n'est ni une extension ni un renouvellement. Son oubli entraîne une amende et laisse une trace dans votre dossier. Le compteur se remet à zéro à chaque sortie du territoire.",
        lien: { href: '/blog/tm47-rapport-90-jours-thailande', label: 'Le guide complet du TM47' },
      },
      {
        q: "Qu'est-ce que le TM30 et qui doit le remplir ?",
        a: "Le TM30 est la déclaration d'hébergement que votre logeur — propriétaire, hôtel ou agence — doit transmettre à l'immigration dans les 24 heures suivant votre arrivée. Ce n'est pas à vous de la faire, mais c'est vous qui en subissez les conséquences : sans reçu TM30, vous serez bloqué pour votre rapport des 90 jours comme pour votre extension.",
        lien: { href: '/blog/arrivee-thailande-aeroport-immigration-taxi-visa-dtv', label: "Les formalités des premières heures" },
      },
      {
        q: 'Comment prolonger mon séjour de 180 jours supplémentaires ?',
        a: "En déposant un formulaire TM7 au bureau d'immigration dont dépend votre adresse déclarée, avec 1 900 THB en espèces, une photo, un justificatif de domicile et les pièces à jour correspondant à votre catégorie d'éligibilité. À noter : si vous sortez du pays au moins une fois par an, cette démarche ne vous concernera probablement jamais.",
        lien: { href: '/blog/extension-180-jours-visa-dtv-thailande', label: 'Extension ou sortie du pays : le vrai arbitrage' },
      },
      {
        q: 'Que risque-t-on en cas de dépassement de séjour ?',
        a: "L'amende est de 500 THB par jour, plafonnée à 20 000 THB. Le point décisif n'est pas la durée mais la manière dont le dépassement se termine : en vous présentant vous-même au départ, un dépassement de 90 jours ou moins n'entraîne aucune interdiction. Découvert lors d'un contrôle, le même dépassement expose à cinq ans d'interdiction du territoire.",
        lien: { href: '/blog/overstay-thailande-amende-blacklist-visa-dtv', label: "Les deux tableaux de l'ordonnance 1/2558" },
      },
      {
        q: "Faut-il avoir 20 000 THB en espèces à l'entrée ?",
        a: "C'est une obligation légale réellement appliquée, et l'un des trois motifs de refoulement invoqués par le Bureau de l'Immigration. Les contrôles restent aléatoires, mais ils se sont multipliés : 29 490 étrangers ont été refoulés entre janvier et mai 2026.",
        lien: { href: '/blog/20000-thb-immigration-thailande-regle-especes', label: 'La règle des 20 000 THB expliquée' },
      },
      {
        q: 'Peut-on ouvrir un compte bancaire thaïlandais avec un DTV ?',
        a: "C'est difficile et très variable selon les agences. La plupart des banques refusent les détenteurs de DTV sans certificat de résidence. Il est heureusement possible de vivre au quotidien sans compte local, à condition de connaître les bons outils de paiement et leurs limites réelles.",
        lien: { href: '/blog/paiement-thailande-sans-compte-bancaire-visa-dtv', label: 'Payer en Thaïlande sans compte local' },
      },
    ],
  },
  {
    id: 'fiscalite',
    texte: 'text-emerald-400',
    bord: 'border-emerald-500/25',
    fond: 'bg-emerald-500/10',
    bordGauche: 'border-l-emerald-500/60',
    survol: 'hover:border-emerald-500/50',
    icone: I.coeur,
    titre: 'Fiscalité et santé',
    onglet: 'Fiscalité & santé',
    questions: [
      {
        q: 'Vais-je payer des impôts en Thaïlande avec le Visa DTV ?',
        a: "Le DTV ne fait pas de vous un résident fiscal. Vous ne le devenez qu'en séjournant plus de 180 jours en Thaïlande sur une année civile, et l'imposition ne porte que sur les revenus que vous y rapatriez. La convention franco-thaïlandaise protège par ailleurs certaines catégories de revenus, notamment les pensions publiques françaises.",
        lien: { href: '/blog/fiscalite-thailande-expatries-residence-fiscale', label: 'Retraités, freelances, propriétaires : le guide' },
      },
      {
        q: 'Une assurance santé est-elle obligatoire pour le DTV ?',
        a: "Non, et c'est précisément ce qui en fait un piège. Contrairement au visa retraite O-A, le DTV n'exige aucune couverture. L'absence d'obligation administrative est souvent lue comme une absence de nécessité, alors qu'une hospitalisation dans le privé thaïlandais se chiffre en milliers d'euros.",
        lien: { href: '/blog/assurance-sante-visa-dtv-thailande', label: "Coûts réels et exclusions à vérifier" },
      },
      {
        q: 'Suis-je couvert en cas d’accident de scooter ?',
        a: "Pas automatiquement, et c'est l'exclusion que presque personne ne vérifie. De nombreux contrats limitent la couverture aux deux-roues de faible cylindrée et exigent un permis moto valide ainsi que le port du casque. Ces clauses doivent être confirmées par écrit avant de prendre la route.",
        lien: { href: '/blog/assurance-sante-visa-dtv-thailande', label: 'Le piège du deux-roues' },
      },
    ],
  },
];

const toutes = groupes.flatMap((g) => g.questions);

/**
 * Les montants en euros sont recalculés au cours du jour, à la fois dans le
 * texte affiché et dans le balisage structuré — les deux restent donc toujours
 * identiques, condition pour que Google accepte le balisage FAQ.
 */
function avecMontants(texte: string, euros: string): string {
  return texte.replace('{EUROS}', euros).replace('{MARGE}', MARGE_CONSEILLEE);
}

export default async function FaqPage() {
  const taux = await getTauxThb();
  const euros = formateEuros(eurosArrondis(taux));

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: toutes.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: avecMontants(f.a, euros) },
    })),
  };

  return <FaqContenu faqSchema={faqSchema} euros={euros} />;
}

function FaqContenu({
  faqSchema,
  euros,
}: {
  faqSchema: Record<string, unknown>;
  euros: string;
}) {
  return (
    <main className="min-h-screen bg-[#0a0a0a] py-20 px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 mt-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Visa DTV : <span className="text-amber-500">toutes vos questions</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            L&apos;immigration thaïlandaise est stricte et les rumeurs circulent vite.{' '}
            {toutes.length} réponses documentées, tirées de nos dossiers et des textes officiels.
          </p>
        </div>

        {/* ── NAVIGATION PAR THÈME ── */}
        <nav className="flex flex-wrap justify-center gap-2.5 mb-14" aria-label="Thèmes">
          {groupes.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className={`group flex items-center gap-2 pl-2.5 pr-4 py-2 rounded-full border ${g.bord} ${g.fond} ${g.survol} text-sm font-medium text-gray-200 transition-all hover:-translate-y-0.5`}
            >
              <svg className={`w-4 h-4 ${g.texte}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {g.icone}
              </svg>
              {g.onglet}
              <span className="text-[10px] font-bold text-gray-500 tabular-nums">
                {g.questions.length}
              </span>
            </a>
          ))}
        </nav>

        {/* ── GROUPES DE QUESTIONS ── */}
        <div className="space-y-14">
          {groupes.map((g) => (
            <section key={g.id} id={g.id} className="scroll-mt-24">
              <div className="flex items-center gap-3.5 mb-5">
                <span
                  className={`flex items-center justify-center w-11 h-11 rounded-2xl border ${g.bord} ${g.fond} flex-none`}
                >
                  <svg className={`w-5 h-5 ${g.texte}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    {g.icone}
                  </svg>
                </span>
                <div>
                  <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight leading-tight">
                    {g.titre}
                  </h2>
                  <p className={`text-[11px] font-bold uppercase tracking-[0.14em] mt-0.5 ${g.texte}`}>
                    {g.questions.length} questions
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {g.questions.map((f, i) => (
                  <details
                    key={f.q}
                    className={`group border border-white/10 border-l-2 ${g.bordGauche} rounded-2xl overflow-hidden bg-[#0d0d0d] transition-colors ${g.survol}`}
                  >
                    <summary className="flex items-start gap-4 px-5 py-4 cursor-pointer list-none hover:bg-[#141414] transition-colors">
                      <span
                        aria-hidden="true"
                        className={`text-xs font-black tabular-nums mt-0.5 flex-none ${g.texte} opacity-60`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-white font-semibold text-sm md:text-base flex-1">{f.q}</h3>
                      <span
                        aria-hidden="true"
                        className="text-xl flex-none leading-none transition-transform duration-300 text-gray-600 group-hover:text-gray-400 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <div className={`px-5 py-4 border-t border-white/5 bg-[#0a0a0a] ${g.fond}`}>
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                        {avecMontants(f.a, euros)}
                      </p>
                      {/* Le lien n'apparaît qu'une fois l'article réellement en ligne :
                          un article programmé renvoie un 404 avant sa date. */}
                      {f.lien && estPublie(f.lien.href.replace('/blog/', '')) && (
                        <Link
                          href={f.lien.href}
                          className={`inline-block mt-3.5 text-sm font-semibold ${g.texte} hover:underline transition-colors`}
                        >
                          {f.lien.label} <span aria-hidden="true">→</span>
                        </Link>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* ── RESSOURCES ── */}
        <div className="mt-14 pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm mb-4">Sources officielles :</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="http://www.thaiembassy.fr/fr/visa-rdv/les-types-de-visa-et-les-documents-necessaires/dtv/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500 hover:underline text-sm font-medium"
            >
              Ambassade Royale de Thaïlande en France
            </a>
            <a
              href="https://www.immigration.go.th"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500 hover:underline text-sm font-medium"
            >
              Bureau de l&apos;Immigration de Thaïlande
            </a>
          </div>
        </div>

        {/* ── CTA FINAL ── */}
        <div className="mt-14 p-8 bg-[#111111] border border-gray-800 rounded-3xl text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500 opacity-10 rounded-full blur-3xl" />
          <h2 className="text-2xl text-white font-bold mb-4 relative z-10">
            Une question non abordée ici ?
          </h2>
          <p className="text-gray-400 mb-8 relative z-10 max-w-xl mx-auto">
            Chaque situation est particulière, et c&apos;est souvent le détail qui décide.
            Faites analyser votre profil avant de déposer.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
            <BoutonEligibilite className="inline-flex items-center justify-center bg-white text-black font-bold text-sm py-4 px-8 rounded-full hover:bg-gray-200 transition-all active:scale-95">
              Faire mon test d&apos;éligibilité
            </BoutonEligibilite>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-white/20 text-white font-bold text-sm py-4 px-8 rounded-full hover:bg-white/5 transition-all"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
