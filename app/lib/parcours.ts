import type { Dossier } from './devis-modele';

/**
 * Ce qui se passe après la signature : les étapes du dossier et les pièces à
 * réunir.
 *
 * Un client qui vient de s'engager sur plus de mille euros a une question et
 * une seule : « et maintenant ? ». Y répondre par un courriel au coup par coup
 * coûte plus cher, en temps comme en nerfs, qu'une page qui dit en permanence
 * où en est le dossier et ce qui manque encore.
 *
 * Les listes sont dérivées du dossier plutôt que saisies à la main : un
 * dossier Soft Power n'a aucune preuve de revenus à fournir, un dossier à deux
 * personnes en a deux fois plus. Recopier ces listes dans un courriel, c'est
 * se tromper une fois sur trois.
 */

export type Etape = {
  cle: string;
  titre: string;
  detail: string;
};

export const ETAPES: Etape[] = [
  {
    cle: 'signe',
    titre: 'Devis accepté',
    detail: 'Le contrat est signé. Je vous envoie le lien de règlement de l’acompte.',
  },
  {
    cle: 'acompte',
    titre: 'Acompte reçu',
    detail: 'Le travail démarre : je vous adresse la liste nominative des pièces.',
  },
  {
    cle: 'pieces',
    titre: 'Pièces réunies et vérifiées',
    detail: 'J’ai tout reçu et contrôlé. Rien ne manque au dossier.',
  },
  {
    cle: 'traductions',
    titre: 'Traductions certifiées obtenues',
    detail: 'Les documents exigés en anglais sont revenus du traducteur assermenté.',
  },
  {
    cle: 'depot',
    titre: 'Dossier déposé sur le portail e-Visa',
    detail: 'Le dossier est entre les mains de l’ambassade. Le solde est exigible.',
  },
  {
    cle: 'delivre',
    titre: 'Visa délivré',
    detail: 'Le e-Visa est émis. Je vous transmets les consignes d’arrivée.',
  },
];

export type Piece = {
  id: string;
  titre: string;
  detail: string;
  /** Pièce à fournir pour chaque personne du foyer, et non une seule fois. */
  parPersonne?: boolean;
};

export type GroupePieces = {
  titre: string;
  introduction: string;
  pieces: Piece[];
};

/**
 * Les pièces à réunir, pour ce dossier précisément.
 *
 * L'ordre n'est pas neutre : le casier judiciaire et les relevés bancaires
 * viennent en tête parce que ce sont les deux seuls éléments qu'on ne peut pas
 * obtenir en une journée. Le bulletin n° 3 met quelques jours à revenir, et
 * l'épargne doit être présente depuis trois mois au moment du dépôt — une
 * antériorité qui ne se rattrape jamais.
 */
export function piecesAReunir(dossier: Dossier): GroupePieces[] {
  const groupes: GroupePieces[] = [];
  const pluriel = dossier.personnes > 1;

  groupes.push({
    titre: 'À demander sans attendre',
    introduction:
      'Ces deux pièces ont un délai propre que rien ne rattrape. Tout le reste peut se préparer ensuite.',
    pieces: [
      {
        id: 'casier',
        titre: 'Bulletin n° 3 du casier judiciaire',
        detail:
          'Demande gratuite en ligne sur le site du ministère de la Justice, avec FranceConnect. La réponse arrive par courriel en quelques jours. Exigé depuis le 31 août 2026.',
        parPersonne: dossier.adultes > 1,
      },
      {
        id: 'banque',
        titre: 'Relevés bancaires des trois derniers mois',
        detail:
          'L’épargne doit apparaître présente et stable pendant trois mois pleins avant le dépôt. Les fonds ne sont jamais bloqués et peuvent être réunis sur le compte du demandeur principal.',
      },
    ],
  });

  groupes.push({
    titre: 'Identité',
    introduction: pluriel
      ? 'Pour chaque personne du foyer, vous compris.'
      : 'Les pièces de base du dossier.',
    pieces: [
      {
        id: 'passeport',
        titre: 'Passeport',
        detail:
          'Valable au moins six mois après la date d’entrée prévue, avec deux pages vierges. Scan couleur de la page d’identité.',
        parPersonne: pluriel,
      },
      {
        id: 'photo',
        titre: 'Photographie d’identité récente',
        detail: 'Fond blanc, de moins de six mois, tête nue et visage dégagé.',
        parPersonne: pluriel,
      },
      {
        id: 'domicile',
        titre: 'Justificatif de domicile en France',
        detail:
          'De moins de trois mois. C’est lui qui rattache le dossier à l’ambassade de Paris, seul poste compétent pour un résident français depuis le 31 août 2026.',
      },
    ],
  });

  if (dossier.softPower) {
    groupes.push({
      titre: 'Voie Soft Power',
      introduction:
        'L’inscription tient lieu de motif du séjour. Aucune preuve de revenus n’est demandée sur cette voie.',
      pieces: [
        {
          id: 'ecole-lettre',
          titre: 'Lettre d’acceptation de l’école certifiée',
          detail:
            'Émise par un établissement reconnu au titre du Soft Power. Je m’occupe du choix et de la mise en relation.',
        },
        {
          id: 'ecole-recu',
          titre: 'Reçu de paiement de la scolarité',
          detail: 'Réglée directement à l’école, jamais par mon intermédiaire.',
        },
      ],
    });
  } else {
    groupes.push({
      titre: 'Votre activité à distance',
      introduction:
        'C’est le bloc que l’ambassade examine le plus attentivement, et celui qui pèse le plus lourd en traductions.',
      pieces: [
        {
          id: 'activite-statut',
          titre: 'Preuve d’existence de l’activité',
          detail:
            'Avis de situation SIRENE et attestation de vigilance URSSAF pour un indépendant ; contrat de travail et extrait Kbis de l’employeur pour un salarié.',
        },
        {
          id: 'activite-lettre',
          titre: 'Lettre attestant du travail à distance',
          detail:
            'De l’employeur pour un salarié, sur l’honneur pour un indépendant : elle doit dire explicitement que l’activité s’exerce depuis l’étranger.',
        },
        {
          id: 'activite-revenus',
          titre: 'Justificatifs de revenus',
          detail:
            'Dernier avis d’imposition, et bulletins de salaire ou factures des trois derniers mois.',
        },
      ],
    });
  }

  if (dossier.personnes > 1) {
    groupes.push({
      titre: 'Rattachement des accompagnants',
      introduction:
        'Le lien familial doit être prouvé par un acte d’état civil, traduit et certifié.',
      pieces: [
        {
          id: 'lien-mariage',
          titre: 'Acte de mariage ou de PACS',
          detail: 'Si un conjoint figure au dossier. Extrait de moins de trois mois.',
        },
        {
          id: 'lien-naissance',
          titre: 'Actes de naissance des enfants',
          detail:
            dossier.enfants > 0
              ? `Un extrait par enfant rattaché, soit ${dossier.enfants} document${dossier.enfants > 1 ? 's' : ''}.`
              : 'Si des enfants sont rattachés au dossier.',
        },
      ],
    });
  }

  groupes.push({
    titre: 'Arrivée en Thaïlande',
    introduction: 'À préparer une fois le dossier déposé, pas avant.',
    pieces: [
      {
        id: 'vol',
        titre: 'Réservation du vol aller',
        detail:
          'À ne prendre qu’après délivrance du visa. Une réservation modifiable suffit si vous en voulez une plus tôt.',
      },
      {
        id: 'hebergement',
        titre: 'Adresse d’hébergement à l’arrivée',
        detail: 'Nécessaire pour le TM30 et la carte d’arrivée numérique (TDAC).',
      },
    ],
  });

  return groupes;
}

/** Nombre total de pièces, pour afficher une progression honnête. */
export function nombrePieces(groupes: GroupePieces[]): number {
  return groupes.reduce((somme, g) => somme + g.pieces.length, 0);
}
