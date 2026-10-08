/**
 * Recherche documentaire DTV — consultation le 8 octobre 2026.
 * Fichier autonome : aucun import, aucune intégration à une application.
 *
 * QUESTION PRIORITAIRE : selon ses consignes publiées, Paris réserve le dépôt
 * aux résidents permanents de France, Monaco ou Algérie. Un Français résidant
 * uniquement en Belgique ne remplit donc pas cette condition par sa seule
 * nationalité. Cette conclusion documentaire n'est pas une décision individuelle
 * du poste. Bruxelles publie une voie pour les résidents étrangers de Belgique.
 *
 * DIVERGENCES ET LIMITES :
 * - L'annonce de Vientiane présente la réforme du 31 août 2026 comme ouvrant le
 *   dépôt aux nationaux OU résidents permanents. Le portail national exige pourtant
 *   une preuve de résidence permanente dans le pays de dépôt ; Paris, Bruxelles,
 *   Berne et Rabat conservent des conditions locales de résidence. Aucune source
 *   consultée ne dit que la nationalité dispense de ces conditions locales.
 *   « Résidence permanente » ne peut pas être remplacé par « tout séjour légal ».
 * - Bruxelles : délais divergents (FAQ : 10 jours ; fiche DTV : environ 4 semaines ;
 *   pages générales : 2–4 ou 4–5 semaines en haute saison). Aucun délai unique retenu.
 *   Paris : 3–4 semaines sur la page e-Visa, environ 4 sur la fiche DTV.
 * - Des listes locales ne mentionnent pas le casier désormais demandé au niveau
 *   national (Bruxelles, Ottawa, Rabat). Leur silence n'est pas une dispense.
 *   Le pays émetteur n'est pas précisé sur la fiche DTV de Paris.
 * - Paris conserve une infographie de 2024 moins précise que sa liste actuelle ;
 *   Ottawa conserve une infographie de 2024 avec l'ancien justificatif de localisation.
 * - Aucun seuil DTV local en CHF (Berne) ou CAD (Ottawa) retrouvé : seul le montant
 *   en THB effectivement publié est conservé. Aucune conversion calculée.
 * - Durée locale des relevés non trouvée pour Bruxelles, Ottawa et Rabat. À Bruxelles,
 *   l'âge maximal de 30 jours du relevé n'est pas une période de relevés d'un mois.
 *   Le portail national publie séparément trois mois pour les trois catégories DTV.
 * - Traduction/légalisation générale des pièces DTV non précisée dans les pages
 *   examinées ; seule la lettre bilingue de l'auto-entrepreneur est explicite à Paris.
 *   Les services de légalisation pour l'usage de documents en Thaïlande ne sont pas
 *   assimilés à des obligations DTV.
 * - Ottawa : conditions locales de résidence/nationalité et liste DTV détaillée
 *   non établies ; le lien « Types of Visas » consulté affiche « PAGE NOT FOUND ».
 *   La juridiction MFA et les pays de simple contact sont distingués du routage e-Visa.
 * - Réunion, Martinique, Polynésie française, Nouvelle-Calédonie : attribution DTV
 *   nominative non établie ; poste = null. La mention générique « France » ne suffit
 *   pas ici à certifier le routage de chaque territoire, ni à désigner un poste proche.
 * - L'annuaire MFA utilisé pour authentifier les sites est une liste de points de
 *   contact pour nominations : ses regroupements ne sont pas transformés en règles
 *   de compétence visa (notamment Vatican pour Berne et Wallis-et-Futuna pour Paris).
 *
 * null = non publié dans les sources consultées, ou non établi avec leur précision.
 * false est réservé à une exclusion publiée ou à une déduction explicitement signalée.
 * Les sources d'un champ null sont les pages examinées, pas une preuve d'exemption.
 * Les URL des justificatifs officiels et celles du MFA authentifiant chaque site
 * sont conservées avec leur date de consultation. Les sources sont toutes officielles.
 */

export type DateISO = `${number}-${number}-${number}`;
export type Statut = "publie" | "non_etabli" | "deduction" | "divergence";

export interface Source {
  readonly url: string;
  readonly dateConsultation: DateISO;
  readonly repere: string;
}

export interface Information<T> {
  readonly valeur: T | null;
  readonly statut: Statut;
  readonly sources: readonly Source[];
  readonly note: string | null;
}

export interface Montant {
  readonly montant: number;
  readonly devise: "EUR" | "CHF" | "CAD" | "MAD" | "THB";
}

export interface Delai {
  readonly minimum: number | null;
  readonly maximum: number | null;
  readonly unite: "jours" | "jours_ouvres" | "semaines" | "mois";
  readonly contexte: string;
}

export interface Juridiction {
  readonly pays: readonly string[];
  readonly perimetre: "visas" | "juridiction_MFA";
  readonly restrictionsTerritoriales: readonly string[];
  readonly paysSimplePointDeContact: readonly string[];
}

export interface Authentification {
  readonly siteOfficiel: Source;
  readonly designationParLeMinistere: Source;
}

export interface PosteConsulaire {
  readonly id: "paris" | "bruxelles" | "berne" | "ottawa" | "rabat";
  readonly nom: string;
  readonly authentification: Authentification;
  readonly depotNationaliteOuResidence: {
    readonly nationaliteSeuleSansResidenceLocale: Information<boolean>;
    readonly conditionLocale: Information<string>;
    readonly conclusion: Information<string>;
  };
  // Les huit champs demandés ; chaque donnée élémentaire est sourcée.
  readonly juridiction: Information<Juridiction>;
  readonly fonds: {
    readonly minimumPublie: Information<Montant>;
    readonly minimumEnDeviseLocale: Information<Montant>;
    readonly moisDeReleves: Information<number>;
    readonly conditions: Information<string>;
  };
  readonly fraisConsulaires: Information<Montant>;
  readonly traductionsEtLegalisations: {
    readonly traductionGenerale: Information<string>;
    readonly exigencesParticulieres: Information<readonly string[]>;
    readonly legalisation: Information<string>;
  };
  readonly casierJudiciaire: {
    readonly exigeParLaListeLocale: Information<boolean>;
    readonly paysEmetteursPubliesLocalement: Information<readonly string[]>;
    readonly ancienneteMaximaleMois: Information<number>;
    readonly regleNationaleDepuisLe31Aout2026: Information<{
      readonly exige: boolean;
      readonly paysEmetteursAlternatifs: readonly string[];
    }>;
  };
  readonly ressortissantsEtrangers: Information<{
    readonly acceptes: boolean;
    readonly conditions: string;
  }>;
  readonly presenceEtEntretien: {
    readonly presenceDansLaJuridiction: Information<string>;
    readonly depotPhysiqueOrdinaire: Information<boolean>;
    readonly entretienPossiblePublieLocalement: Information<boolean>;
    readonly reserveGeneraleEntretienEvisa: Information<boolean>;
  };
  readonly delaiInstruction: {
    readonly specifiqueDtv: Information<Delai>;
    readonly autresAnnonces: readonly Information<Delai>[];
    readonly coherence: Information<string>;
  };
}

const consulteLe: DateISO = "2026-10-08";
const source = (url: string, repere: string): Source => ({
  url, dateConsultation: consulteLe, repere,
});
const fait = <T>(
  valeur: T,
  sources: readonly Source[],
  note: string | null = null,
  statut: Statut = "publie",
): Information<T> => ({ valeur, statut, sources, note });
const inconnu = (sources: readonly Source[], note: string): Information<never> => ({
  valeur: null, statut: "non_etabli", sources, note,
});

const annuaireUrl = "https://image.mfa.go.th/mfa/0/GH2PYnujXi/%E0%B9%80%E0%B8%AD%E0%B8%81%E0%B8%AA%E0%B8%B2%E0%B8%A3/List_of_Royal_Thai_Embassy-contact_point_1.pdf";
const annuaire = (pages: string): Source => source(annuaireUrl,
  `Liste MFA de points de contact : ${pages}. Colonne Website ; utilisée pour authentifier le site.`);

const s = {
  national: source("https://www.thaievisa.go.th/visa/dtv-visa", "Les trois rubriques DTV, dépliées dans le navigateur : Required Documents."),
  portail: source("https://www.thaievisa.go.th/", "Important Notice et réserve générale sous les catégories de visas."),
  reforme: source("https://consular.mfa.go.th/th/content/28-8-69-00?cate=5ddbe42115e39c4768007e1d", "Annonce du Département des affaires consulaires, 28 août 2026, infographies jointes."),
  reformeImage: source("https://image.mfa.go.th/mfa/0/zE6021nSnu/%E0%B8%AA%E0%B8%A5%E0%B8%81__0301/Info-DTV-eng.jpg", "Infographie anglaise : effet au 31 août 2026, 00 h 00, heure thaïlandaise."),
  vientiane: source("https://vientiane.thaiembassy.org/en/publicservice/applying-for-a-visa", "Annonce DTV : nouvelles conditions mondiales au 31 août 2026 ; national OR permanent resident."),
  parisDtv: source("https://www.thaiembassy.fr/fr/visa-rdv/les-types-de-visa-et-les-documents-necessaires/dtv/", "Fiche DTV : frais, délai et liste actuelle des justificatifs."),
  parisGeneral: source("https://www.thaiembassy.fr/fr/visa-rdv/infos-generales/", "Sections 1, 3, 4 et 5.2 : résidence, présence, entretien, délais et compétence visa."),
  parisEvisa: source("https://www.thaiembassy.fr/fr/visa-rdv/e-visa/", "Conseils e-Visa : délai de 3–4 semaines ; formulaire en anglais."),
  parisAncien: source("https://www.thaiembassy.fr/wp-content/uploads/2024/08/DTV-1061x1500.jpg", "Infographie de 2024 encore intégrée à la fiche DTV."),
  bruxellesDtv: source("https://image.mfa.go.th/mfa/0/P5NCnBapvr/typeofvisa/Visa_Destination_Thailand_(DTV)_Multiple_EN_FR_Dutch.pdf", "Fiche DTV en anglais, français et néerlandais, pages 1–3 ; lien Type of visas du poste."),
  bruxellesGeneral: source("https://brussels.thaiembassy.org/en/page/visa-informations", "Visa information, mise à jour affichée le 9 juin 2025."),
  bruxellesProcedure: source("https://brussels.thaiembassy.org/en/page/how-to-apply-for-a-visa", "Procédure, mise à jour affichée le 25 septembre 2025."),
  bruxellesFaq: source("https://brussels.thaiembassy.org/en/page/faq-about-thai-visa?menu=6537ecccac7927668e3a198c", "FAQ, questions 9, 10 et 12, mise à jour affichée le 7 mai 2025."),
  berneDtv: source("https://www.thaiembassy.ch/Content/Embassy/217.html", "Page DTV : frais et liens vers les trois listes de pièces."),
  berneDtv1: source("https://thaiembassy.ch/files_upload/editor_upload/1788181352_required-documents---dtv1-digital-nomad.pdf", "DTV 1, document daté du 1er septembre 2026."),
  berneDtv2: source("https://thaiembassy.ch/files_upload/editor_upload/1788181449_required-documents---dtv2-thai-soft-power.pdf", "DTV 2, document daté du 1er septembre 2026."),
  berneDtv3: source("https://thaiembassy.ch/files_upload/editor_upload/1788181377_required-documents---dtv3-spouses.pdf", "DTV 3, document daté du 1er septembre 2026."),
  berneGeneral: source("https://www.thaiembassy.ch/Content/Embassy/55.html", "How to apply for Thai e-Visa : General Information."),
  berneFaq: source("https://www.thaiembassy.ch/Content/Embassy/219.html", "Frequently Asked Questions for e-Visa : procédure électronique."),
  ottawaGeneral: source("https://ottawa.thaiembassy.org/en/page/applying-for-e-visa?menu=5f2245c90ac0fc78ff7d63f2", "Applying for an e-Visa, mise à jour affichée le 5 janvier 2026 ; informations en images."),
  ottawaGeneralImage: source("https://image.mfa.go.th/mfa/0/pFxDf7ZYQ7/Visa-consular_information/General_visa_information_(June_2025)/1.png", "Infographie General Information, dépôt et délai en haute saison."),
  ottawaDtv: source("https://ottawa.thaiembassy.org/en/content/destination-thailand-vsa-dtv?cate=5f069ee272a783584326eaf5", "Annonce DTV du 16 juillet 2024 et infographie liée."),
  ottawaDtvImage: source("https://image.mfa.go.th/mfa/0/pFxDf7ZYQ7/Visa-consular_information/Visa_new_measures_2024/DTV_VISA.jpg", "Infographie nationale reproduite par Ottawa, révision du 16 juillet 2024."),
  ottawaTypes: source("https://ottawa.thaiembassy.org/en/page/types-of-visas-periods-of-stay-and-fees?menu=5f223691ebdbb920f334d002", "Lien Types of Visas du menu ; PAGE NOT FOUND lors de la consultation."),
  ottawaFrais: source("https://ottawa.thaiembassy.org/en/page/visa-fees?menu=651c2cee62e8195f8210aa63", "Page Visa Fees, mise à jour affichée le 5 janvier 2026 ; barème en image."),
  ottawaFraisImage: source("https://image.mfa.go.th/mfa/0/pFxDf7ZYQ7/Visa-consular_information/VISA_FEE_UPDATE.jpg", "Barème signé le 15 juillet 2024, applicable le 16 juillet 2024, ligne DTV."),
  ottawaMfa: source("https://aspa.mfa.go.th/th/page/%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%97%E0%B8%A8%E0%B9%81%E0%B8%84%E0%B8%99%E0%B8%B2%E0%B8%94%E0%B8%B2?menu=5d6abf1c15e39c0648001fd3", "Département Amériques et Pacifique Sud du MFA : Ottawa/Vancouver, mise à jour du 29 novembre 2022 ; compétence et lien Website."),
  rabatPage: source("https://rabat.thaiembassy.org/fr/publicservice/visa-requirements", "Page Visa Requirements et lien vers le PDF révisé."),
  rabatDtv: source("https://image.mfa.go.th/mfa/0/tDJBi9m15g/Visa_Requirements_(Revised).pdf", "Page 14 : DTV ; page 15 : Important Notes. PDF lu visuellement."),
  rabatEvisa: source("https://rabat.thaiembassy.org/fr/content/new-online-thailand-e-visa-platform", "Annonce de passage à e-Visa au 26 novembre 2024 : Maroc, Mauritanie et Tunisie."),
  rabatFrais: source("https://rabat.thaiembassy.org/fr/publicservice/consular-fees", "Page Consular Fees et barème révisé de 2024."),
  rabatFraisPdf: source("https://image.mfa.go.th/mfa/0/tDJBi9m15g/Revised_Consular_Fees_2024.pdf", "Page 2, DTV : 4 100 MAD, applicable le 31 juillet 2024."),
} as const;

const casierNational = fait({
  exige: true,
  paysEmetteursAlternatifs: ["Pays de nationalité", "Pays où la demande est déposée"],
}, [s.national, s.reforme, s.reformeImage], "Alternative entre les deux pays ; pas une obligation de produire les deux certificats.");
const entretienNational = fait(true, [s.portail], "Le portail réserve la possibilité d'un entretien ; cette réserve ne prouve pas une convocation systématique par le poste.");

export const regleNationaleDtv = {
  priseEffet: fait("2026-08-31T00:00:00+07:00", [s.reforme, s.reformeImage]),
  formulationNationaliteOuResidence: fait(
    "Nationalité du pays de dépôt OU résidence permanente dans ce pays.",
    [s.vientiane], "Formulation de Vientiane présentant la réforme comme mondiale, pas une dérogation explicite aux conditions des cinq postes.",
  ),
  authentificationSourceVientiane: {
    siteOfficiel: source("https://vientiane.thaiembassy.org/en", "Site désigné dans l'annuaire MFA."),
    designationParLeMinistere: annuaire("page 1, Lao PDR / Vientiane"),
  } satisfies Authentification,
  justificatifPortail: fait("Preuve de résidence permanente dans le pays où la demande est soumise.", [s.national]),
  simpleSejourLegalSuffisant: inconnu([s.national, s.vientiane], "Les textes emploient permanent residence ; ils n'établissent pas que tout statut de séjour légal suffit."),
  fonds: fait<Montant>({ montant: 500000, devise: "THB" }, [s.national], "Montant national ; ne remplit jamais un montant local manquant."),
  moisDeReleves: fait(3, [s.national], "Pour les trois catégories ; le portail mentionne aussi la lettre de prise en charge comme alternative."),
  casierJudiciaire: casierNational,
  divergence: fait(
    "La formulation nationalité OU résidence n'est pas reprise comme dispense de résidence par le portail ou les conditions locales examinées.",
    [s.vientiane, s.national, s.parisGeneral, s.bruxellesFaq, s.berneGeneral, s.rabatDtv],
    "Pas de texte trouvé arbitrant explicitement cette tension pour un national expatrié.", "divergence",
  ),
} as const;

const parisFonds = fait<Montant>({ montant: 15000, devise: "EUR" }, [s.parisDtv], "Par demandeur ; solde créditeur non bloqué, au moins ce montant chaque mois.");
const bruxellesFonds = fait<Montant>({ montant: 15000, devise: "EUR" }, [s.bruxellesDtv]);
const rabatFonds = fait<Montant>({ montant: 170000, devise: "MAD" }, [s.rabatDtv], "Montant MAD expressément publié par Rabat à côté de 500 000 THB ; aucune conversion effectuée ici.");
const bernePieces = [s.berneDtv1, s.berneDtv2, s.berneDtv3];

export const postesConsulaires: readonly PosteConsulaire[] = [
  {
    id: "paris", nom: "Paris",
    authentification: {
      siteOfficiel: source("https://www.thaiembassy.fr/fr/", "Site de Paris désigné par le MFA."),
      designationParLeMinistere: annuaire("pages 6 et 9, Paris"),
    },
    depotNationaliteOuResidence: {
      nationaliteSeuleSansResidenceLocale: fait(false, [s.parisGeneral, s.parisDtv], "Déduction de la restriction aux résidents permanents.", "deduction"),
      conditionLocale: fait("Résidence permanente en France, à Monaco ou en Algérie ; dernière déclaration d'impôt demandée pour le DTV.", [s.parisGeneral, s.parisDtv]),
      conclusion: fait("Un Français résidant uniquement en Belgique ne satisfait pas la condition publiée de Paris. Sa nationalité ne suffit pas. Bruxelles prévoit le dépôt des résidents étrangers de Belgique.", [s.parisGeneral, s.bruxellesDtv], "Conclusion documentaire, sans réponse individuelle du poste.", "deduction"),
    },
    juridiction: fait({ pays: ["France", "Monaco", "Algérie"], perimetre: "visas", restrictionsTerritoriales: [], paysSimplePointDeContact: [] }, [s.parisGeneral], "Paris se déclare seul poste délivrant les visas pour ces résidents ; périmètre ultramarin nominatif non précisé."),
    fonds: {
      minimumPublie: parisFonds, minimumEnDeviseLocale: parisFonds,
      moisDeReleves: fait(3, [s.parisDtv]),
      conditions: fait("Relevé bancaire officiel ; garant réservé aux mineurs ou accompagnants DTV.", [s.parisDtv]),
    },
    fraisConsulaires: fait({ montant: 350, devise: "EUR" }, [s.parisDtv]),
    traductionsEtLegalisations: {
      traductionGenerale: inconnu([s.parisDtv, s.parisGeneral, s.parisEvisa], "Aucune règle générale DTV de traduction retrouvée ; la langue du formulaire ne détermine pas celle de toutes les pièces."),
      exigencesParticulieres: fait(["Auto-entrepreneur : lettre explicative en français ET en anglais."], [s.parisDtv]),
      legalisation: inconnu([s.parisDtv, s.parisGeneral], "Aucune obligation générale de légalisation des pièces DTV publiée sur ces pages."),
    },
    casierJudiciaire: {
      exigeParLaListeLocale: fait(true, [s.parisDtv], "Casier vierge."),
      paysEmetteursPubliesLocalement: inconnu([s.parisDtv], "Pays de délivrance non précisé ; règle nationale conservée séparément."),
      ancienneteMaximaleMois: fait(3, [s.parisDtv], "Strictement moins de trois mois."),
      regleNationaleDepuisLe31Aout2026: casierNational,
    },
    ressortissantsEtrangers: fait({ acceptes: true, conditions: "Résidents permanents de la juridiction ; titre de séjour. Pour les citoyens UE habitant en France ou à Monaco, justificatif de domicile." }, [s.parisGeneral]),
    presenceEtEntretien: {
      presenceDansLaJuridiction: fait("Présence physique en France, Algérie ou Monaco lors de la délivrance.", [s.parisGeneral]),
      depotPhysiqueOrdinaire: fait(false, [s.parisGeneral], "Procédure électronique."),
      entretienPossiblePublieLocalement: fait(true, [s.parisGeneral], "Convocation possible, notamment si la preuve de résidence est insuffisante."),
      reserveGeneraleEntretienEvisa: entretienNational,
    },
    delaiInstruction: {
      specifiqueDtv: fait({ minimum: 4, maximum: 4, unite: "semaines", contexte: "Environ ; davantage si dossier incomplet." }, [s.parisDtv]),
      autresAnnonces: [fait({ minimum: 3, maximum: 4, unite: "semaines", contexte: "Page e-Visa générale." }, [s.parisEvisa])],
      coherence: fait("3–4 semaines contre environ 4 : variation de formulation, fourchettes compatibles.", [s.parisDtv, s.parisEvisa]),
    },
  },
  {
    id: "bruxelles", nom: "Bruxelles",
    authentification: {
      siteOfficiel: source("https://brussels.thaiembassy.org/", "Site de Bruxelles désigné par le MFA."),
      designationParLeMinistere: annuaire("page 8, Brussels"),
    },
    depotNationaliteOuResidence: {
      nationaliteSeuleSansResidenceLocale: fait(false, [s.bruxellesFaq, s.bruxellesDtv], "Déduction des conditions de résidence et du retour imposé aux nationaux absents.", "deduction"),
      conditionLocale: fait("Résider en Belgique ou au Luxembourg ; justificatif local exigé.", [s.bruxellesDtv, s.bruxellesFaq]),
      conclusion: fait("La nationalité belge ou luxembourgeoise ne permet pas de déposer depuis l'étranger : la FAQ exige le retour. Les résidents hors juridiction sont renvoyés vers leur poste compétent.", [s.bruxellesFaq]),
    },
    juridiction: fait({ pays: ["Belgique", "Luxembourg"], perimetre: "visas", restrictionsTerritoriales: [], paysSimplePointDeContact: [] }, [s.bruxellesFaq, s.bruxellesGeneral]),
    fonds: {
      minimumPublie: bruxellesFonds, minimumEnDeviseLocale: bruxellesFonds,
      moisDeReleves: inconnu([s.bruxellesDtv], "La fiche locale n'indique pas une durée d'historique bancaire. Les trois mois du portail national sont documentés séparément."),
      conditions: fait("Relevé bancaire émis depuis moins de 30 jours.", [s.bruxellesDtv], "Ancienneté du document, pas durée de l'historique."),
    },
    fraisConsulaires: fait({ montant: 350, devise: "EUR" }, [s.bruxellesDtv]),
    traductionsEtLegalisations: {
      traductionGenerale: inconnu([s.bruxellesDtv, s.bruxellesGeneral, s.bruxellesProcedure], "Langue/traducteur imposés pour l'ensemble des pièces DTV non publiés dans ces sources."),
      exigencesParticulieres: inconnu([s.bruxellesDtv], "Aucune traduction DTV particulière identifiée."),
      legalisation: inconnu([s.bruxellesDtv, s.bruxellesProcedure], "Vérification possible de documents étrangers mentionnée, mais pas de chaîne de légalisation DTV imposée et détaillée."),
    },
    casierJudiciaire: {
      exigeParLaListeLocale: inconnu([s.bruxellesDtv], "Omis dans la fiche locale consultée ; ne signifie pas non exigé depuis la réforme nationale."),
      paysEmetteursPubliesLocalement: inconnu([s.bruxellesDtv], "Non précisés localement."),
      ancienneteMaximaleMois: inconnu([s.bruxellesDtv], "Non précisée localement."),
      regleNationaleDepuisLe31Aout2026: casierNational,
    },
    ressortissantsEtrangers: fait({ acceptes: true, conditions: "Citoyens UE : preuve d'adresse Belgique/Luxembourg de moins de trois mois ; non-UE : permis de résidence." }, [s.bruxellesDtv], "La fiche prévoit explicitement les deux catégories."),
    presenceEtEntretien: {
      presenceDansLaJuridiction: fait("La FAQ impose aux nationaux belges/luxembourgeois à l'étranger de rentrer avant de déposer.", [s.bruxellesFaq], "La résidence locale est aussi exigée des autres demandeurs ; aucune dispense liée à la nationalité n'est publiée."),
      depotPhysiqueOrdinaire: fait(false, [s.bruxellesGeneral, s.bruxellesFaq], "Demandes électroniques ; aucun dépôt à l'ambassade ou par courrier."),
      entretienPossiblePublieLocalement: inconnu([s.bruxellesDtv, s.bruxellesGeneral, s.bruxellesProcedure], "Pas de règle d'entretien DTV trouvée dans ces documents."),
      reserveGeneraleEntretienEvisa: entretienNational,
    },
    delaiInstruction: {
      specifiqueDtv: fait({ minimum: 4, maximum: 4, unite: "semaines", contexte: "Environ, davantage si dossier incomplet." }, [s.bruxellesDtv]),
      autresAnnonces: [
        fait({ minimum: 4, maximum: 5, unite: "semaines", contexte: "Haute saison, Visa information." }, [s.bruxellesGeneral]),
        fait({ minimum: 2, maximum: 4, unite: "semaines", contexte: "Haute saison, How to apply." }, [s.bruxellesProcedure]),
        fait({ minimum: 10, maximum: 10, unite: "jours", contexte: "En général après dossier complet ; jours ouvrés non précisés." }, [s.bruxellesFaq]),
        fait({ minimum: null, maximum: 3, unite: "mois", contexte: "Certaines nationalités, selon la FAQ." }, [s.bruxellesFaq]),
      ],
      coherence: fait("Délais divergents entre quatre publications ; aucune synthèse chiffrée unique.", [s.bruxellesDtv, s.bruxellesGeneral, s.bruxellesProcedure, s.bruxellesFaq], null, "divergence"),
    },
  },
  {
    id: "berne", nom: "Berne",
    authentification: {
      siteOfficiel: source("https://www.thaiembassy.ch/", "Site de Berne désigné par le MFA."),
      designationParLeMinistere: annuaire("page 10, Bern"),
    },
    depotNationaliteOuResidence: {
      nationaliteSeuleSansResidenceLocale: fait(false, [s.berneGeneral], "Déduction du renvoi des résidents hors juridiction, quelle que soit leur nationalité.", "deduction"),
      conditionLocale: fait("Résidence en Suisse/Liechtenstein ; listes DTV du 1er septembre 2026 : preuve de résidence permanente, par exemple permis de séjour suisse valide.", [s.berneGeneral, ...bernePieces]),
      conclusion: fait("Le poste renvoie les personnes résidant ailleurs vers l'ambassade de leur pays ou région de résidence, indépendamment de leur nationalité.", [s.berneGeneral]),
    },
    juridiction: fait({ pays: ["Suisse", "Liechtenstein"], perimetre: "visas", restrictionsTerritoriales: [], paysSimplePointDeContact: [] }, [s.berneGeneral], "Vatican apparaît dans l'annuaire MFA des points de contact, mais pas dans cette règle visa ; il n'est pas ajouté."),
    fonds: {
      minimumPublie: fait({ montant: 500000, devise: "THB" }, bernePieces),
      minimumEnDeviseLocale: inconnu(bernePieces, "Aucun montant CHF publié dans les trois listes DTV consultées."),
      moisDeReleves: fait(3, bernePieces),
      conditions: fait("Preuve financière ; les listes mentionnent également la prise en charge financière.", bernePieces),
    },
    fraisConsulaires: fait({ montant: 350, devise: "CHF" }, [s.berneDtv]),
    traductionsEtLegalisations: {
      traductionGenerale: inconnu([...bernePieces, s.berneGeneral, s.berneFaq], "Langues et traduction certifiée non précisées pour les pièces DTV dans ces sources."),
      exigencesParticulieres: inconnu(bernePieces, "Aucune traduction DTV particulière identifiée."),
      legalisation: inconnu(bernePieces, "Aucune obligation de légalisation DTV précisée."),
    },
    casierJudiciaire: {
      exigeParLaListeLocale: fait(true, bernePieces),
      paysEmetteursPubliesLocalement: fait(["Pays de nationalité", "Pays où la demande est déposée"], bernePieces, "Alternatives, pas cumul."),
      ancienneteMaximaleMois: inconnu(bernePieces, "Ancienneté maximale non précisée."),
      regleNationaleDepuisLe31Aout2026: casierNational,
    },
    ressortissantsEtrangers: fait({ acceptes: true, conditions: "Résidents de Suisse/Liechtenstein avec preuve valide ; DTV : preuve de résidence permanente." }, [s.berneGeneral, ...bernePieces]),
    presenceEtEntretien: {
      presenceDansLaJuridiction: inconnu([s.berneGeneral], "Résidence actuelle exigée ; obligation distincte de présence physique continue jusqu'à délivrance non précisée."),
      depotPhysiqueOrdinaire: fait(false, [s.berneFaq], "Procédure e-Visa, pas de remise ordinaire du passeport en personne."),
      entretienPossiblePublieLocalement: fait(true, [s.berneGeneral], "L'agent peut demander un entretien en personne à l'ambassade."),
      reserveGeneraleEntretienEvisa: entretienNational,
    },
    delaiInstruction: {
      specifiqueDtv: inconnu(bernePieces, "Pas de délai DTV distinct dans les listes ; délai général ci-dessous."),
      autresAnnonces: [
        fait({ minimum: 10, maximum: 10, unite: "jours_ouvres", contexte: "Environ, délai général." }, [s.berneGeneral]),
        fait({ minimum: 8, maximum: 12, unite: "semaines", contexte: "Certaines nationalités." }, [s.berneGeneral]),
      ],
      coherence: fait("Délai usuel et cas particuliers distingués par le poste.", [s.berneGeneral]),
    },
  },
  {
    id: "ottawa", nom: "Ottawa",
    authentification: {
      siteOfficiel: source("https://ottawa.thaiembassy.org/", "Site d'Ottawa désigné par le MFA."),
      designationParLeMinistere: s.ottawaMfa,
    },
    depotNationaliteOuResidence: {
      nationaliteSeuleSansResidenceLocale: inconnu([s.ottawaGeneral, s.ottawaDtv, s.ottawaTypes], "Aucune règle locale explicite retrouvée permettant de trancher ce cas."),
      conditionLocale: inconnu([s.ottawaGeneral, s.ottawaDtv, s.ottawaTypes], "La fiche détaillée est inaccessible par le lien du menu ; l'infographie DTV date de 2024."),
      conclusion: inconnu([s.ottawaGeneral, s.ottawaDtv, s.national], "Ni une dérogation par nationalité ni une restriction locale supplémentaire ne peuvent être affirmées ; le portail demande une résidence permanente."),
    },
    juridiction: fait({
      pays: ["Canada", "Grenade", "Trinité-et-Tobago", "République dominicaine", "Jamaïque"],
      perimetre: "juridiction_MFA",
      restrictionsTerritoriales: ["Canada : hors Alberta, Colombie-Britannique et Yukon, attribués à Vancouver par cette page MFA."],
      paysSimplePointDeContact: ["Antigua-et-Barbuda", "Dominique", "Sainte-Lucie", "Saint-Vincent-et-les-Grenadines", "Bahamas", "Barbade", "Saint-Christophe-et-Niévès"],
    }, [s.ottawaMfa], "Page MFA actualisée en 2022. Elle distingue juridiction et simple contact. Routage e-Visa/DTV actuel de chacun des pays caribéens non confirmé par une liste locale retrouvée."),
    fonds: {
      minimumPublie: fait({ montant: 500000, devise: "THB" }, [s.ottawaDtv, s.ottawaDtvImage], "Infographie nationale de 2024 reproduite par le poste, pas un seuil CAD local."),
      minimumEnDeviseLocale: inconnu([s.ottawaDtv, s.ottawaDtvImage, s.ottawaTypes], "Aucun seuil DTV en CAD retrouvé."),
      moisDeReleves: inconnu([s.ottawaDtvImage, s.ottawaTypes], "Historique non précisé dans la publication locale accessible ; trois mois au portail national, séparément."),
      conditions: inconnu([s.ottawaDtvImage, s.ottawaTypes], "Conditions bancaires locales actualisées après août 2026 non établies."),
    },
    fraisConsulaires: fait({ montant: 650, devise: "CAD" }, [s.ottawaFrais, s.ottawaFraisImage], "Barème local DTV ; les 10 000 THB de l'infographie générale ne constituent pas le tarif CAD."),
    traductionsEtLegalisations: {
      traductionGenerale: inconnu([s.ottawaDtv, s.ottawaGeneral, s.ottawaTypes], "Langues/traduction des justificatifs DTV non établies."),
      exigencesParticulieres: inconnu([s.ottawaDtv, s.ottawaTypes], "Aucune traduction DTV particulière identifiée."),
      legalisation: inconnu([s.ottawaDtv, s.ottawaGeneral, s.ottawaTypes], "Aucune obligation DTV établie ; ne pas appliquer les règles d'autres visas ou de légalisation consulaire."),
    },
    casierJudiciaire: {
      exigeParLaListeLocale: inconnu([s.ottawaDtvImage, s.ottawaTypes], "L'infographie de 2024 omet le casier ; cela ne dispense pas de la règle nationale de 2026."),
      paysEmetteursPubliesLocalement: inconnu([s.ottawaDtvImage, s.ottawaTypes], "Non précisés pour le DTV dans les sources locales accessibles."),
      ancienneteMaximaleMois: inconnu([s.ottawaDtvImage, s.ottawaTypes], "Non précisée pour le DTV."),
      regleNationaleDepuisLe31Aout2026: casierNational,
    },
    ressortissantsEtrangers: inconnu([s.ottawaGeneral, s.ottawaDtv, s.ottawaTypes], "Acceptation locale explicite des non-Canadiens résidents pour le DTV non retrouvée ; ne pas l'inférer d'un autre visa."),
    presenceEtEntretien: {
      presenceDansLaJuridiction: inconnu([s.ottawaGeneral, s.ottawaDtv], "Condition locale distincte de présence physique non retrouvée."),
      depotPhysiqueOrdinaire: fait(false, [s.ottawaGeneral, s.ottawaGeneralImage], "Dépôt exclusivement en ligne."),
      entretienPossiblePublieLocalement: inconnu([s.ottawaGeneral, s.ottawaDtv], "Pas de règle locale d'entretien DTV retrouvée."),
      reserveGeneraleEntretienEvisa: entretienNational,
    },
    delaiInstruction: {
      specifiqueDtv: inconnu([s.ottawaDtv, s.ottawaTypes], "Aucun délai propre au DTV retrouvé."),
      autresAnnonces: [fait({ minimum: null, maximum: 25, unite: "jours_ouvres", contexte: "Jusqu'à 25 jours ouvrés en haute saison ; information générale e-Visa." }, [s.ottawaGeneral, s.ottawaGeneralImage])],
      coherence: inconnu([s.ottawaDtv, s.ottawaGeneral], "Une seule annonce générale de délai exploitable ; pas de comparaison DTV possible."),
    },
  },
  {
    id: "rabat", nom: "Rabat",
    authentification: {
      siteOfficiel: source("https://rabat.thaiembassy.org/fr/index", "Site de Rabat désigné par le MFA."),
      designationParLeMinistere: annuaire("page 6, Rabat"),
    },
    depotNationaliteOuResidence: {
      nationaliteSeuleSansResidenceLocale: fait(false, [s.rabatDtv], "Déduction : les notes excluent les personnes sans résidence ou ne vivant pas actuellement dans la juridiction.", "deduction"),
      conditionLocale: fait("Résidence ET présence actuelle au Maroc, en Tunisie ou en Mauritanie.", [s.rabatDtv]),
      conclusion: fait("La nationalité seule ne satisfait pas les deux conditions locales publiées.", [s.rabatDtv], "Déduction documentaire.", "deduction"),
    },
    juridiction: fait({ pays: ["Maroc", "Tunisie", "Mauritanie"], perimetre: "visas", restrictionsTerritoriales: [], paysSimplePointDeContact: [] }, [s.rabatDtv, s.rabatEvisa]),
    fonds: {
      minimumPublie: rabatFonds, minimumEnDeviseLocale: rabatFonds,
      moisDeReleves: inconnu([s.rabatDtv], "Nombre de mois non indiqué dans la ligne DTV."),
      conditions: inconnu([s.rabatDtv], "Durée de maintien et ancienneté maximale du justificatif non précisées."),
    },
    fraisConsulaires: fait({ montant: 4100, devise: "MAD" }, [s.rabatDtv, s.rabatFrais, s.rabatFraisPdf]),
    traductionsEtLegalisations: {
      traductionGenerale: inconnu([s.rabatDtv, s.rabatPage], "Aucune règle générale de traduction DTV trouvée dans la ligne DTV et les notes."),
      exigencesParticulieres: inconnu([s.rabatDtv], "Aucune traduction particulière DTV identifiée."),
      legalisation: inconnu([s.rabatDtv], "Aucune exigence de légalisation DTV précisée."),
    },
    casierJudiciaire: {
      exigeParLaListeLocale: inconnu([s.rabatDtv], "Casier absent de la liste locale consultée ; aucune dispense nationale établie."),
      paysEmetteursPubliesLocalement: inconnu([s.rabatDtv], "Pays non précisé pour le DTV."),
      ancienneteMaximaleMois: inconnu([s.rabatDtv], "Ancienneté non précisée pour le DTV."),
      regleNationaleDepuisLe31Aout2026: casierNational,
    },
    ressortissantsEtrangers: fait({ acceptes: true, conditions: "L'annonce e-Visa vise les étrangers résidant dans les trois pays ; la ligne DTV prévoit une carte de résidence marocaine pour les non-Marocains." }, [s.rabatEvisa, s.rabatDtv], "Justificatifs équivalents pour Tunisie/Mauritanie non détaillés dans la ligne DTV."),
    presenceEtEntretien: {
      presenceDansLaJuridiction: fait("Vivre actuellement dans un des trois pays de la juridiction.", [s.rabatDtv]),
      depotPhysiqueOrdinaire: fait(false, [s.rabatEvisa], "Passeport et pièces originaux n'ont pas à être déposés physiquement."),
      entretienPossiblePublieLocalement: inconnu([s.rabatDtv, s.rabatEvisa], "Documents complémentaires possibles ; entretien non précisé."),
      reserveGeneraleEntretienEvisa: entretienNational,
    },
    delaiInstruction: {
      specifiqueDtv: inconnu([s.rabatDtv], "Aucun délai DTV distinct ; les notes générales s'appliquent aux demandes."),
      autresAnnonces: [fait({ minimum: 10, maximum: 10, unite: "jours_ouvres", contexte: "Environ ; dépend du type de visa et de l'exactitude des pièces." }, [s.rabatDtv])],
      coherence: fait("Annonce générale, sans délai DTV distinct publié.", [s.rabatDtv]),
    },
  },
];

export interface TerritoireOutreMer {
  readonly territoire: string;
  readonly posteDtvExplicitementDesigne: Information<string>;
  readonly possibiliteDeChoisirUnPostePlusProche: Information<boolean>;
}

export const outreMerFrancais: readonly TerritoireOutreMer[] = [
  "La Réunion", "Martinique", "Polynésie française", "Nouvelle-Calédonie",
].map((territoire) => ({
  territoire,
  posteDtvExplicitementDesigne: inconnu(
    [s.parisGeneral, s.parisDtv, s.national, annuaire("pages 6 et 9, Paris")],
    "Aucune attribution DTV nominative trouvée pour ce territoire. Paris mentionne France sans liste des territoires ; l'annuaire de contact ne permet pas de trancher cette compétence visa.",
  ),
  possibiliteDeChoisirUnPostePlusProche: inconnu(
    [s.national, s.parisGeneral],
    "Aucune dérogation fondée sur la proximité géographique trouvée. Ne pas attribuer automatiquement un poste voisin.",
  ),
}));

export const divergencesDocumentaires: readonly Information<string>[] = [
  regleNationaleDtv.divergence,
  fait("Paris : l'infographie de 2024 conserve un justificatif d'adresse et une liste financière moins détaillée que le texte actuel ; elle omet le casier.", [s.parisAncien, s.parisDtv], "Décalage chronologique signalé ; l'image ancienne n'est pas une dispense.", "divergence"),
  fait("Ottawa : l'infographie de 2024 demande la localisation actuelle et omet le casier ; le portail actuel exige résidence permanente et casier.", [s.ottawaDtvImage, s.national], "Documents de dates différentes, conservés comme tels.", "divergence"),
  fait("Bruxelles et Rabat : listes DTV consultées sans casier ; le portail national le demande. Elles ne précisent pas non plus l'historique bancaire de trois mois du portail.", [s.bruxellesDtv, s.rabatDtv, s.national], "Omissions locales ; aucune exemption démontrée.", "divergence"),
  postesConsulaires[1]!.delaiInstruction.coherence,
];
