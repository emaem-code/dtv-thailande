/**
 * Texte partagé par l'accueil, la fenêtre méthode et le guide.
 * Les sources portent sur les règles consulaires, pas sur une garantie de résultat.
 * Relecture : 22 septembre 2026. Voir docs/sources-procedure-dtv.md avant toute mise à jour.
 */
export const DATE_VERIFICATION_PROCEDURE = "22 septembre 2026";

export const SOURCES_PROCEDURE = {
  parisDtv: {
    titre: "Ambassade de Paris — Visa DTV",
    url: "https://www.thaiembassy.fr/fr/visa-rdv/les-types-de-visa-et-les-documents-necessaires/dtv/",
  },
  parisProcedure: {
    titre: "Ambassade de Paris — procédure et délais",
    url: "https://www.thaiembassy.fr/fr/visa-rdv/infos-generales/",
  },
  reglesAout2026: {
    titre: "Ambassade de Vientiane — règles du 31 août 2026",
    url: "https://vientiane.thaiembassy.org/en/page/applying-for-a-visa?menu=652f7ce9508bee63cd37a593",
  },
} as const;

export const REGLE_DEPOT_DTV =
  "Depuis le 31 août 2026, la demande de DTV se dépose depuis le pays dont vous avez la nationalité ou dans lequel vous résidez officiellement, auprès du poste consulaire compétent. La résidence doit répondre aux exigences de ce poste et être justifiée. Un séjour touristique dans un pays tiers ne permet plus d’y déposer une demande.";

export const VERIFICATION_ECOLE = {
  question: "Comment vérifiez-vous l’école choisie ?",
  reponse:
    "Je vérifie les agréments de l’établissement et écarte les écoles non homologuées. J’examine les justificatifs fournis par l’école avant leur intégration au dossier. L’établissement reste responsable des documents qu’il émet ; la décision sur le visa appartient à l’autorité consulaire.",
};

export const ETAPES_DTV = [
  {
    id: "preparation",
    titre: "L’engagement et le dossier",
    desc: "Après validation de votre devis, j’examine vos pièces et prépare votre dossier selon les exigences du poste consulaire compétent. Cette préparation est distincte de l’instruction menée par l’ambassade.",
    sources: [SOURCES_PROCEDURE.parisDtv],
  },
  {
    id: "depot",
    titre: "Dépôt en ligne sur e-Visa",
    desc: "Vous déposez votre dossier sur le portail officiel thaievisa.go.th et suivez les instructions de paiement du poste compétent. Aucun voyage dans un pays tiers ni tampon d’entrée dans ce pays n’est à prévoir pour le dépôt. L’ambassade peut toutefois vous convoquer pour un entretien, au cas par cas.",
    sources: [
      SOURCES_PROCEDURE.parisProcedure,
      SOURCES_PROCEDURE.reglesAout2026,
    ],
  },
  {
    id: "instruction",
    titre: "Instruction et décision consulaire",
    desc: "L’ambassade de Paris indique un délai d’instruction d’environ 4 semaines, qui peut être plus long, notamment si le dossier est incomplet. Ce délai est indicatif : je ne garantis ni la date de réponse ni l’approbation. Je vous accompagne dans le suivi du dossier et les éventuelles demandes de pièces complémentaires.",
    sources: [SOURCES_PROCEDURE.parisDtv, SOURCES_PROCEDURE.parisProcedure],
  },
  {
    id: "depart",
    titre: "Préparation au départ, après accord",
    desc: "Une fois le visa accordé, téléchargez et imprimez votre e-Visa pour le voyage. Préparez également votre carte d’arrivée numérique TDAC dans les trois jours précédant l’arrivée. En formule Premium, je vous aide à préparer votre arrivée en Thaïlande.",
    sources: [SOURCES_PROCEDURE.parisProcedure],
  },
  {
    id: "arrivee",
    titre: "Arrivée en Thaïlande",
    desc: "À l’arrivée, présentez votre passeport, votre e-Visa et les documents requis à l’immigration. Le DTV permet un séjour de 180 jours maximum par entrée, prolongeable une fois sur place. Vérifiez la date de fin de séjour portée sur votre tampon ; cinq ans de validité ne signifient pas cinq ans de séjour continu.",
    sources: [SOURCES_PROCEDURE.parisDtv, SOURCES_PROCEDURE.parisProcedure],
  },
];
