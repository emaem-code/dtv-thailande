import { SOURCES_PROCEDURE } from "./methode-dtv";
import { PRIX_APPEL, prix } from "./tarifs";
import { FONDS_EUR_PARIS, formateEuros } from "./taux";

export type SceneFilmAccueil = {
  id: string;
  chapitre: string;
  titre: string;
  accent: string;
  image: string;
  alt: string;
  points: string[];
  narration: string;
};

/**
 * Résumé de l’accueil, à lire ou à écouter après un lancement volontaire.
 * Les montants affichés suivent les sources communes ; la voix ne les fige pas.
 * Sources relues le 24 septembre 2026 : docs/sources-film-accueil.md.
 */
export const FILM_ACCUEIL: SceneFilmAccueil[] = [
  {
    id: "projet",
    chapitre: "Votre projet",
    titre: "Votre projet,",
    accent: "plus clair.",
    image: "/images/blog/ou-vivre-huahin-plage.jpg",
    alt: "La plage de Hua Hin en Thaïlande",
    points: [
      "Comprendre le visa DTV.",
      "Vérifier votre profil.",
      "Préparer votre dossier et votre départ.",
    ],
    narration:
      "Vous imaginez votre vie en Thaïlande ? Commençons par rendre votre projet plus clair. Voici les repères pour comprendre le visa DTV, vérifier votre profil et préparer votre dossier avec notre accompagnement.",
  },
  {
    id: "reperes",
    chapitre: "Le visa DTV",
    titre: "Un visa.",
    accent: "Deux repères.",
    image: "/images/blog/comparatif-visas-dtv.jpg",
    alt: "Illustration des visas pour séjourner en Thaïlande",
    points: [
      "5 ans de validité, à entrées multiples.",
      "180 jours maximum par entrée, prolongeables une fois.",
      "Pas cinq ans de séjour continu.",
    ],
    narration:
      "Le DTV est valable cinq ans, à entrées multiples. Chaque séjour dure jusqu’à cent quatre-vingts jours, prolongeable une fois sur place. Cette validité n’autorise pas cinq ans de séjour continu.",
  },
  {
    id: "profils",
    chapitre: "Votre éligibilité",
    titre: "À chaque projet,",
    accent: "sa voie.",
    image: "/images/blog/visa-dtv-famille-couple-plage.jpg",
    alt: "Un couple sur une plage en Thaïlande",
    points: [
      "Télétravail et freelance.",
      "Activités Soft Power, comme la cuisine ou le Muay Thaï.",
      "Famille accompagnante, sous conditions.",
    ],
    narration:
      "Vous travaillez à distance, vous êtes indépendant, ou vous souhaitez suivre une activité culturelle ou sportive ? Plusieurs voies existent. Certains proches peuvent aussi vous accompagner. Les conditions et les justificatifs dépendent de votre situation.",
  },
  {
    id: "dossier",
    chapitre: "Les justificatifs",
    titre: "Chaque pièce",
    accent: "compte.",
    image: "/images/blog/dtv-31-aout-preparation-dossier.jpg",
    alt: "Préparation des documents d’une demande de visa DTV",
    points: [
      "Activité et résidence : des justificatifs adaptés à votre profil.",
      `À Paris : ${formateEuros(FONDS_EUR_PARIS)} par personne sur chacun des 3 derniers relevés mensuels.`,
      "Une épargne disponible, non bloquée.",
    ],
    narration:
      "Avant le dépôt, nous examinons vos justificatifs d’activité, de résidence et vos documents financiers. À Paris, l’historique des trois derniers mois compte. Votre épargne doit être disponible ; elle n’est pas bloquée.",
  },
  {
    id: "methode",
    chapitre: "L’accompagnement",
    titre: "Nous préparons.",
    accent: "Vous déposez.",
    image: "/images/blog/guide-depot-dossier-evisa-dtv.jpg",
    alt: "Préparation d’une demande en ligne sur le portail e-Visa",
    points: [
      "Nous préparons le dossier. Vous le déposez sur e-Visa.",
      "Pays de nationalité ou de résidence répondant aux exigences du poste.",
      "Paris : environ 4 semaines, parfois plus. Entretien possible.",
    ],
    narration:
      "Nous préparons votre dossier et vous accompagnons pour le déposer en ligne. L’ambassade reste seule décisionnaire : à Paris, l’instruction prend environ quatre semaines, parfois davantage. Un entretien peut être demandé.",
  },
  {
    id: "budget",
    chapitre: "Votre budget",
    titre: "Votre budget,",
    accent: "dès le départ.",
    image: "/images/blog/visa-dtv-freelance-auto-entrepreneur.jpg",
    alt: "Un indépendant prépare son projet de télétravail en Thaïlande",
    points: [
      `Dès ${prix(PRIX_APPEL)} par personne, selon votre dossier.`,
      "Frais consulaires et estimation des traductions dans le budget.",
      "Essentielle pour le visa. Premium pour préparer aussi l’arrivée.",
    ],
    narration:
      "Nos tarifs sont publics. Le budget comprend les frais consulaires et une estimation des traductions. La formule Essentielle accompagne votre demande de visa ; Premium prépare aussi votre arrivée. Le devis précise votre budget.",
  },
  {
    id: "premier-pas",
    chapitre: "La suite",
    titre: "Votre premier pas,",
    accent: "c’est ici.",
    image: "/images/matthieu-moretti.jpg",
    alt: "Matthieu Moretti, DTV Thaïlande",
    points: [
      "Faisons le point sur votre situation.",
      "Commençons par vérifier votre éligibilité.",
      "Les guides et la FAQ restent à votre disposition.",
    ],
    narration:
      "Votre projet commence par votre situation, pas par un dossier standard. Faites le point avec notre test d’éligibilité. Et si vous souhaitez approfondir un sujet, nos guides et notre FAQ restent à votre disposition.",
  },
];

export const FILM_ACCUEIL_SOURCES = [
  SOURCES_PROCEDURE.parisDtv,
  SOURCES_PROCEDURE.parisProcedure,
  SOURCES_PROCEDURE.reglesAout2026,
];

export const DATE_VERIFICATION_FILM_ACCUEIL = "24 septembre 2026";
