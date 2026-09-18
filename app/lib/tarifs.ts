/**
 * Source unique des tarifs d'accompagnement.
 *
 * Ces montants étaient auparavant recopiés dans six fichiers — page d'accueil,
 * formulaire d'éligibilité, fenêtre guide, carrousel mobile, article Soft Power.
 * Une révision en oubliait forcément un. Ils sont désormais définis ici et
 * importés partout ailleurs.
 *
 * ── Révision du 2 septembre 2026 ──────────────────────────────────────────
 * La grille précédente (850 € / 1 750 €) avait été calibrée sur un dépôt en
 * Asie : frais consulaires à 10 000 THB, soit environ 260 €, et documents en
 * français le plus souvent acceptés à Vientiane ou Kuala Lumpur.
 *
 * Depuis le 31 août 2026, un demandeur français relève obligatoirement de
 * l'ambassade de Paris. Deux coûts apparaissent :
 *   — les frais consulaires y sont d'environ 350 €, soit 90 € de plus ;
 *   — la traduction assermentée y est exigée, alors qu'elle était rarement
 *     demandée en Asie.
 *
 * L'écart n'est pas le même sur les deux voies, et c'est ce qui justifie deux
 * hausses différentes plutôt qu'une augmentation uniforme : le bloc coûteux à
 * traduire est celui des revenus (SIRENE, URSSAF, avis d'imposition, lettre
 * d'activité), soit environ 280 €. Un dossier Soft Power ne le contient pas —
 * il n'exige aucune preuve de revenus, et la lettre d'école arrive déjà en
 * anglais. Il ne lui reste que le casier judiciaire et un acte d'état civil.
 *
 *   Digital Nomad : +90 € consulaire +280 € traductions = +370 €
 *   Soft Power    : +90 € consulaire  +90 € traductions = +180 €
 */

export type Formule = {
  /** Identifiant stable, utilisé comme valeur dans le formulaire. */
  id: 'essentielle' | 'premium' | 'vip';
  nom: string;
  description: string;
  /** Voie télétravail, freelance ou salarié à distance. */
  standard: number;
  /** Voie Soft Power : le budget intègre la scolarité de l'école certifiée. */
  softPower: number;
  vedette: boolean;
  /** Formule retirée de la vente, conservée pour les devis déjà établis. */
  retiree?: true;
};

/**
 * Budget complet affiché au public, pour UNE personne.
 *
 * Ce ne sont pas des honoraires : c'est le coût total de l'opération, débours
 * compris. Le choix est délibéré. Un prospect ne compare pas des honoraires,
 * il compare des budgets — afficher 600 € d'honoraires puis envoyer un devis
 * à 1 250 € le ferait passer pour une mauvaise surprise, alors que c'est le
 * même prix. Le devis, lui, détaille toujours ce qui revient à l'agence et ce
 * qui part chez des tiers (voir `budgetDossier`).
 *
 * ── Contenu des formules, révision du 2 septembre 2026 ────────────────────
 * Premium et VIP vendaient le voyage régional nécessaire à un dépôt à
 * Vientiane. Ce dépôt est fermé aux non-résidents du Laos depuis le
 * 31 août 2026 : il n'y a plus de voyage à coordonner, le dépôt parisien
 * étant entièrement dématérialisé. Le service haut de gamme se déplace donc
 * vers le seul voyage qui subsiste — celui du client qui s'installe.
 */
export const FORMULES: Formule[] = [
  {
    id: 'essentielle',
    nom: 'Essentielle',
    description:
      "L'administratif complet : montage du dossier, traductions, dépôt et suivi jusqu'à la délivrance.",
    standard: 1250,
    softPower: 1950,
    vedette: false,
  },
  {
    id: 'premium',
    nom: 'Premium',
    description:
      "Essentielle, plus le pilotage des traductions, l'attestation bancaire en anglais et la préparation de l'arrivée (TDAC, TM30, 90 jours).",
    standard: 1700,
    // Mise en avant depuis le retrait du VIP : c'est désormais le haut de gamme.
    // Recalé le 18 septembre 2026 : 2 650 € supposait un supplément Premium de
    // 700 € en Soft Power contre 450 € en télétravail, pour le même service.
    // Le supplément est désormais unique (voir SUPPLEMENT_FORMULE).
    softPower: 2400,
    vedette: true,
  },
  {
    id: 'vip',
    nom: 'VIP',
    description:
      "Premium, plus l'installation sur place : accueil à l'arrivée, recherche de logement, banque, école et assurance santé.",
    standard: 2800,
    softPower: 3500,
    vedette: false,
    retiree: true,
  },
];

/**
 * Les formules réellement proposées.
 *
 * ── Retrait du VIP, 18 septembre 2026 ─────────────────────────────────────
 * Le VIP promettait l'ouverture d'un compte bancaire thaïlandais, la
 * recherche de logement, l'école et l'assurance santé. Deux problèmes, et le
 * premier est rédhibitoire : avec un DTV, les banques classent le titulaire
 * en touriste et refusent dans quatre cas sur cinq — Bangkok Bank réussit
 * dans environ 20 % des cas, Kasikorn 15 %, les autres presque jamais.
 * Promettre cela dans un devis signé, c'était s'engager sur ce qui ne dépend
 * pas de soi. Le reste — logement, école, assurance — n'est pas un métier que
 * Matthieu veut exercer.
 *
 * Une formule qu'on ne peut pas tenir vaut moins que pas de formule du tout.
 * L'entrée reste dans FORMULES pour que les devis déjà établis continuent de
 * s'afficher avec leur libellé et leurs prestations d'origine ; elle n'est
 * simplement plus proposée nulle part.
 */
export const FORMULES_VENDUES: Formule[] = FORMULES.filter((f) => !f.retiree);

// ─── HONORAIRES ───────────────────────────────────────────────────────────────

/**
 * Honoraires d'accompagnement, par nombre de personnes au dossier.
 *
 * Dégressifs, et c'est justifié : le dossier d'un rattaché ne comporte ni
 * preuve d'activité ni lettre de mission. Il reste l'état civil, les
 * traductions et la preuve de fonds — du vrai travail, mais moins.
 *
 * Ces montants sont la SEULE part qui entre dans le chiffre d'affaires. Tout
 * le reste transite vers l'ambassade, l'école ou le traducteur.
 */
export const HONORAIRES: Record<number, number> = {
  1: 600,
  2: 1050,
  3: 1400,
  4: 1650,
};

/** Au-delà, le dossier sort du cadre standard et se chiffre au cas par cas. */
export const PALIER_MAX = 4;

/**
 * Supplément d'honoraires par formule, en euros.
 *
 * Forfaitaire et par dossier, jamais par personne : l'accueil à l'arrivée, la
 * recherche de logement ou l'ouverture de compte se font une fois pour le
 * foyer. Les multiplier par quatre reviendrait à facturer quatre fois une
 * prestation rendue une seule.
 *
 * Identique sur les deux voies. La grille précédente demandait 450 € de plus
 * en télétravail et 700 € en Soft Power pour exactement le même supplément de
 * service — un écart qu'on ne pouvait plus tenir dès lors que le devis
 * détaille chaque ligne et qu'un client peut comparer les deux voies.
 */
export const SUPPLEMENT_FORMULE: Record<Formule['id'], number> = {
  essentielle: 0,
  premium: 450,
  vip: 1550,
};

/**
 * Ce que chaque formule ajoute, tel que le devis doit l'énoncer.
 *
 * Les listes sont cumulatives : Premium contient Essentielle, VIP contient
 * Premium. Un document qui encaisse 1 550 € de plus sans dire ce qu'ils
 * achètent n'est pas un devis — et c'est exactement ce que le devis faisait
 * avant, en décrivant l'Essentielle quelle que soit la formule retenue.
 */
export const PRESTATIONS: Record<Formule['id'], string[]> = {
  essentielle: [
    'Montage du dossier et vérification de chaque justificatif',
    'Contrôle de vos justificatifs financiers et de leur antériorité de trois mois',
    // Le portail e-Visa fait certifier ses déclarations par le demandeur
    // lui-même. Déposer à sa place reviendrait à signer une attestation sur
    // l'honneur en son nom : le dossier est préparé de bout en bout, mais
    // c'est lui qui valide, accompagné écran par écran.
    'Préparation complète de la demande e-Visa et accompagnement au dépôt, écran par écran',
    'Relectures et suivi du dossier jusqu’à la délivrance',
    'Reprise du dossier et nouvelle demande sans honoraires en cas de refus consulaire',
  ],
  premium: [
    'Traductions pilotées de bout en bout avec le traducteur assermenté',
    // Seule la banque du client délivre cette attestation, et à lui seul. Ce
    // qui se vend, c'est la formulation exacte attendue par l'ambassade et la
    // relecture du document reçu — c'est là que la plupart des dossiers
    // trébuchent.
    'Modèle de demande à adresser à votre banque pour l’attestation de solde en anglais, et vérification du document reçu',
    // TDAC : le voyageur déclare. TM30 : c'est le bailleur ou l'hôtel qui
    // déclare, pas le locataire. TM47 : obligation personnelle de l'étranger.
    // Dans les trois cas, on prépare et on vérifie ; on ne déclare pas.
    'Préparation de vos formalités d’arrivée : carte TDAC, vérification de la déclaration TM30 par votre bailleur, rapport des 90 jours',
    'Sélection de votre vol et de vos premières nuits d’hôtel, transfert depuis l’aéroport organisé',
  ] as string[],
  vip: [
    'Vol direct ou à escale courte, choisi pour la durée du trajet et le confort de l’attente',
    'Hébergement haut de gamme pour vos premières nuits',
    'Chauffeur privé qui vous accueille à la sortie de l’aéroport',
    'Recherche de logement et ouverture de compte bancaire',
    'École des enfants, assurance santé et démarches locales',
  ],
};

/**
 * La ligne de voyage Premium, que la VIP remplace au lieu de la répéter.
 *
 * Les listes étant cumulatives, un devis VIP affichait coup sur coup
 * « sélection de votre vol » puis « vol haut de gamme sélectionné ». Deux
 * lignes pour une même prestation donnent l'impression d'un document gonflé
 * à la ligne, exactement l'inverse de ce qu'on veut inspirer.
 */
const PRESTATION_VOYAGE_PREMIUM =
  'Sélection de votre vol et de vos premières nuits d’hôtel, transfert depuis l’aéroport organisé';

/**
 * Ce que le prestataire ne fait pas, et qui doit être écrit noir sur blanc.
 *
 * Organiser un voyage et le vendre sont deux métiers que le droit distingue
 * nettement. Dès qu'on combine un transport et un hébergement pour un même
 * séjour, on vend un forfait touristique au sens de l'article L211-2 du code
 * du tourisme, ce qui impose une immatriculation à Atout France, une garantie
 * financière et une assurance dédiée. Et en micro-entreprise, l'argent qui
 * transiterait par le compte deviendrait du chiffre d'affaires imposable —
 * plusieurs milliers d'euros par dossier familial, pour des sommes qui ne
 * sont pas les siennes.
 *
 * La règle tient en trois lignes, et cette clause l'énonce au client :
 * la réservation est à son nom, il règle directement le prestataire, et
 * aucune commission n'est prise au passage.
 */
/**
 * L'ordre de grandeur du voyage, donné en note et jamais additionné.
 *
 * Le client a besoin d'un repère pour calibrer son budget d'installation, pas
 * d'une ligne de devis : le nombre de nuits, le standard de l'hôtel et la date
 * du vol lui appartiennent, et un forfait ferait croire à un engagement de
 * prix que personne ne peut tenir six semaines à l'avance.
 */
export function mentionVoyage(formule: Formule['id']): string {
  if (formule === 'essentielle') return '';
  const v = VOYAGE[formule];
  const g = GAMME_VOYAGE[formule];
  return (
    `À titre de repère, comptez de l'ordre de ${v.vol} € le vol par personne ` +
    `(${g.vol}), ${v.transfert} € le transfert depuis l'aéroport, et ${v.nuit} € ` +
    `la nuit d'hôtel ${g.hotel} le temps de trouver votre logement. Ces montants ` +
    'varient fortement selon la saison et l\'anticipation ; ils ne sont pas ' +
    'compris dans le budget ci-dessus.'
  );
}

export const CLAUSE_VOYAGE =
  'Le vol, l’hébergement et les transferts sont sélectionnés et organisés pour ' +
  'vous, mais réservés à votre nom et réglés directement par vos soins auprès ' +
  'de la compagnie, de l’hôtel et du chauffeur. Aucune somme ne transite par ' +
  'nous et aucune commission n’est prise. Les montants indiqués sont des ' +
  'estimations, données à titre de repère budgétaire.';

/** La mise en relation avec l'école n'existe que sur la voie Soft Power. */
const PRESTATION_ECOLE = 'Choix de l’école certifiée et mise en relation';

/**
 * Les prestations cumulées d'une formule, dans l'ordre de lecture.
 *
 * L'ordre n'est pas neutre : le client lit d'abord ce qu'il aurait eu en
 * Essentielle, puis ce que son supplément lui apporte en plus.
 */
export function prestationsFormule(formule: Formule['id'], estSoftPower: boolean): string[] {
  const base = [...PRESTATIONS.essentielle];
  if (estSoftPower) base.splice(1, 0, PRESTATION_ECOLE);
  if (formule === 'premium') return [...base, ...PRESTATIONS.premium];
  if (formule === 'vip') {
    const premium = PRESTATIONS.premium.filter((l) => l !== PRESTATION_VOYAGE_PREMIUM);
    return [...base, ...premium, ...PRESTATIONS.vip];
  }
  return base;
}

// ─── DÉBOURS ──────────────────────────────────────────────────────────────────

/**
 * Frais consulaires de l'ambassade de Paris, PAR PERSONNE.
 * Les enfants rattachés paient le même montant que le demandeur principal.
 */
export const FRAIS_CONSULAIRES = 350;

/** Inscription à l'école certifiée — voie Soft Power, demandeur principal seul. */
export const ECOLE_SOFT_POWER = 910;

/**
 * Traduction, en bahts par page (Alliance française de Phuket).
 *
 * Stocké en THB et converti au cours du jour, comme le seuil bancaire : c'est
 * un prix thaïlandais, sa contre-valeur en euros n'est qu'indicative. Environ
 * trois fois moins qu'un traducteur assermenté français, qui facture 40 à
 * 60 € la page.
 */
export const TRADUCTION_THB_PAR_PAGE = 900;

/**
 * Volume de traduction retenu dans l'estimation, en pages.
 *
 * Un dossier Soft Power est court : la lettre de l'école arrive en anglais, il
 * ne reste que le casier judiciaire et un acte d'état civil. Un dossier
 * télétravail doit traduire tout le bloc revenus — SIRENE, URSSAF, avis
 * d'imposition, lettre d'activité — d'où l'écart.
 */
export const PAGES = { standard: 12, softPower: 4, rattache: 3 };

/**
 * Coûts indicatifs du voyage d'installation, en euros.
 *
 * Ce ne sont pas des tarifs mais des repères budgétaires : un vol varie du
 * simple au double selon la saison et l'anticipation. Ils sont pré-remplis
 * dans le devis pour éviter la page blanche, et chaque ligne reste modifiable
 * avant l'envoi — c'est Matthieu, qui vit à Phuket, qui sait ce que coûte
 * réellement une nuit d'hôtel ou une course depuis l'aéroport.
 *
 * Le vol se compte par personne, le transfert une fois par foyer — une
 * voiture suffit — et l'hôtel par chambre, à raison de deux personnes par
 * chambre.
 *
 * Ces sommes ne transitent jamais par l'entreprise : voir CLAUSE_VOYAGE.
 */
export const VOYAGE = {
  premium: { vol: 1000, transfert: 25, nuit: 30, nuits: 4 },
  vip: { vol: 1500, transfert: 45, nuit: 125, nuits: 4 },
} as const;

/**
 * Ce qui distingue les deux voyages, en clair.
 *
 * L'écart VIP ne porte pas sur une classe de cabine mais sur le trajet : un
 * vol direct ou à escale courte, choisi pour la durée et le confort de
 * l'attente. Dire « haut de gamme » pour un vol laisserait entendre une
 * business class qu'on ne vend pas — l'hôtel, lui, l'est réellement.
 */
export const GAMME_VOYAGE = {
  premium: { vol: 'entrée de gamme', hotel: 'entrée de gamme' },
  vip: { vol: 'direct ou escale courte', hotel: 'haut de gamme' },
} as const;

/**
 * Volume de référence servant à formuler la mention publique.
 *
 * Les traductions sont un débours : elles transitent vers le traducteur et
 * sont refacturées à l'euro près. Le budget annoncé en retient une estimation
 * — il ne les forfaitise pas. La nuance compte : trois mois de relevés d'un
 * compte actif peuvent représenter quinze à vingt pages, et un forfait
 * « traductions comprises » deviendrait un chèque en blanc dès que le seuil
 * bancaire se multiplie par le nombre de personnes rattachées.
 */
export const PAGES_TRADUCTION_INCLUSES = 10;

/** Mention affichée sous les tarifs, partout où ils apparaissent. */
export const MENTION_TRADUCTIONS =
  'Le budget intègre une estimation des traductions ; elles sont refacturées ' +
  'au coût réel sur justificatif du traducteur.';

// ─── CALCUL DU BUDGET ─────────────────────────────────────────────────────────

export type Budget = {
  /** Nombre de personnes retenues. */
  personnes: number;
  /** Part agence — la seule qui entre dans le chiffre d'affaires. */
  honoraires: number;
  /** Frais consulaires cumulés. */
  consulaires: number;
  /** Scolarité, nulle hors voie Soft Power. */
  ecole: number;
  /** Traductions, converties au cours fourni. */
  traductions: number;
  /** Pages retenues avant plafonnement. */
  pages: number;
  /** Somme des trois postes ci-dessus : ce qui part chez des tiers. */
  debours: number;
  /** Coût total de l'opération pour le client. */
  total: number;
  /** Coût moyen par personne, utile pour montrer la dégressivité. */
  parPersonne: number;
  /** Vrai au-delà du dernier palier : le devis se fait au cas par cas. */
  surDevis: boolean;
};

/**
 * Décompose le coût complet d'un dossier.
 *
 * Le cours est passé en paramètre plutôt que lu ici : ce module reste pur et
 * synchrone, et l'appelant décide s'il utilise le cours du jour ou celui de
 * repli.
 */
export function budgetDossier(
  personnes: number,
  estSoftPower: boolean,
  tauxThbParEuro: number,
  formule: Formule['id'] = 'essentielle',
): Budget {
  const n = Math.max(1, Math.floor(personnes) || 1);
  const surDevis = n > PALIER_MAX;
  const honoraires = HONORAIRES[Math.min(n, PALIER_MAX)] + SUPPLEMENT_FORMULE[formule];

  // Volume réel estimé, sans plafond : le budget annoncé doit refléter ce que
  // le client va effectivement payer, pas une borne qui l'arrangerait.
  const pages = (estSoftPower ? PAGES.softPower : PAGES.standard) + (n - 1) * PAGES.rattache;

  const consulaires = FRAIS_CONSULAIRES * n;
  const ecole = estSoftPower ? ECOLE_SOFT_POWER : 0;
  const traductions = Math.round((pages * TRADUCTION_THB_PAR_PAGE) / tauxThbParEuro);
  const debours = consulaires + ecole + traductions;
  const total = honoraires + debours;

  return {
    personnes: n,
    honoraires,
    consulaires,
    ecole,
    traductions,
    pages,
    debours,
    total,
    parPersonne: Math.round(total / n),
    surDevis,
  };
}

/**
 * Économie réalisée par rapport à autant de dossiers individuels.
 * Rend le pourcentage entier, pour l'encart « tarif dégressif ».
 */
export function remiseFoyer(
  personnes: number,
  estSoftPower: boolean,
  tauxThbParEuro: number,
): number {
  const n = Math.max(1, Math.floor(personnes) || 1);
  if (n < 2) return 0;
  const groupe = budgetDossier(n, estSoftPower, tauxThbParEuro).total;
  const isole = budgetDossier(1, estSoftPower, tauxThbParEuro).total * n;
  return Math.round((1 - groupe / isole) * 100);
}

/** Formatage français : 1 250 €, avec espace insécable avant le symbole. */
export function prix(montant: number): string {
  return `${montant.toLocaleString('fr-FR').replace(/ | | /g, ' ')} €`;
}

/** Tarif d'une formule selon la voie empruntée. */
export function tarif(id: Formule['id'], estSoftPower: boolean): number {
  const f = FORMULES.find((item) => item.id === id);
  if (!f) throw new Error(`Formule inconnue : ${id}`);
  return estSoftPower ? f.softPower : f.standard;
}

/** Le tarif d'appel affiché sur l'accueil et dans les CTA. */
export const PRIX_APPEL = FORMULES[0].standard;
