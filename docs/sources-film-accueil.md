# Sources du film explicatif de l’accueil

Consultation des pages officielles : **24 septembre 2026**.

Périmètre : les sept scènes de `app/lib/film-accueil.ts`, leurs textes affichés et leur narration. Ce relevé ne constitue pas une nouvelle vérification des autres pages, des anciens films ou de toutes les réponses de FAQ.

Les liens exportés par `FILM_ACCUEIL_SOURCES` doivent apparaître à proximité du lecteur. Les règles consulaires sont distinctes des prestations de l’agence. Les montants affichés proviennent des sources de données communes ; aucune somme n’est enregistrée dans la narration.

## 1. Projet et premier pas

Scènes `projet` et `premier-pas`.

Il s’agit d’une présentation des services et des parcours déjà présents sur l’accueil : comprendre le DTV, vérifier son profil, préparer le dossier, consulter les guides et la FAQ. Aucune obtention, aucun délai de réponse et aucun résultat consulaire ne sont promis.

## 2. Validité, durée des séjours et profils

Scènes `reperes` et `profils`.

**Poste :** Ambassade royale de Thaïlande à Paris, France.

**Page :** « Visa Destination Thailand (DTV) Multiple ».

**URL :** https://www.thaiembassy.fr/fr/visa-rdv/les-types-de-visa-et-les-documents-necessaires/dtv/

**Consultée le :** 24 septembre 2026.

**Passages pertinents :** le début de la page distingue la validité de cinq ans et chaque séjour limité à 180 jours, avec une prolongation possible sur place. La page porte sur le visa à entrées multiples. La présentation et la liste « Purposes of visit » décrivent le travail à distance, les activités Soft Power et les proches accompagnants répondant aux conditions.

**Application au film :** cinq ans de validité ne sont pas présentés comme cinq ans de séjour continu. La voie familiale reste qualifiée par « sous conditions » ; le film ne prétend pas que toute relation ou tout enfant y donne automatiquement droit.

## 3. Justificatifs et épargne

Scène `dossier`.

**Poste, page, URL et date :** même page DTV de l’ambassade de Paris, consultée le 24 septembre 2026.

**Passages pertinents :** la liste des pièces demande une preuve de résidence permanente ; son point 4 décrit le relevé bancaire officiel, le solde minimum de 15 000 euros et les trois derniers mois, avec un solde non bloqué. Le point 6 détaille les preuves liées au motif de séjour.

**Application au film :** le seuil est explicitement rattaché à Paris, non généralisé à tous les postes. Son affichage est calculé avec `FONDS_EUR_PARIS` et `formateEuros` de `app/lib/taux.ts`. La narration parle de l’historique et du caractère disponible des fonds, sans enregistrer le montant. Le contrôle des documents décrit le service de préparation déjà prévu dans les prestations de l’agence ; il n’est pas présenté comme une validation consulaire.

## 4. Dépôt en ligne, pays compétent et instruction

Scène `methode`.

### Procédure et délai de Paris

**Poste :** Ambassade royale de Thaïlande à Paris, France.

**Page :** « Informations générales ».

**URL :** https://www.thaiembassy.fr/fr/visa-rdv/infos-generales/

**Consultée le :** 24 septembre 2026.

**Passages pertinents :** la section 3 décrit le dépôt numérique sur le portail officiel e-Visa et réserve la possibilité d’un entretien en personne. La section 4 donne un délai d’environ quatre semaines, susceptible d’augmenter notamment selon l’affluence et les pièces complémentaires. Les sections 1 et 3 précisent la résidence et les conditions territoriales propres à Paris. La décision et la possibilité d’un refus relèvent de l’ambassade, comme l’indiquent les sections 2 et 7.

**Application au film :** environ quatre semaines est un repère parisien, jamais une garantie. Un entretien reste possible. Le dépôt numérique ne signifie pas une possibilité de déposer de n’importe où. La narration distingue le dossier préparé par l’agence et la décision de l’ambassade.

### Compétence territoriale depuis le 31 août 2026

**Poste :** Ambassade royale de Thaïlande à Vientiane, Laos.

**Page :** « Applying for a Visa », dernière mise à jour affichée : 28 août 2026.

**URL :** https://vientiane.thaiembassy.org/en/page/applying-for-a-visa?menu=652f7ce9508bee63cd37a593

**Consultée le :** 24 septembre 2026.

**Passage pertinent :** l’annonce DTV en fin de page annonce de nouvelles exigences mondiales à compter du 31 août 2026, réservant la demande aux ressortissants ou résidents permanents du pays de dépôt. Elle applique ensuite cette règle aux ressortissants et résidents permanents du Laos.

**Application au film :** la formulation courte « pays de nationalité ou de résidence répondant aux exigences du poste » conserve la condition consulaire. Elle n’assimile pas une visite touristique à une résidence suffisante et ne réintroduit aucun voyage en pays tiers pour déposer.

### Rôle de l’agence

**Complément du 25 septembre 2026 :** le deuxième argument affiché reprend, à la
demande du propriétaire, la phrase déjà narrée « L’ambassade reste seule
décisionnaire. ». La page « Informations générales » de l’ambassade de Paris,
France, https://www.thaiembassy.fr/fr/visa-rdv/infos-generales/, a été relue ce jour :
la section 2.3 attribue à l’ambassade le droit de refuser une demande et de modifier
le visa accordé, et la section 7 décrit ses motifs de refus. Le lien déjà présent
dans les sources du lecteur est conservé. L’ancien argument territorial est retiré
de cette scène ; le relevé précédent ci-dessus reste l’historique de sa vérification.

Le libellé « Nous préparons le dossier. Vous le déposez sur e-Visa » reprend les prestations de `app/lib/tarifs.ts` : préparation de la demande et accompagnement au dépôt, écran par écran. Il ne prétend pas que l’agence dispose d’une autorisation pour se substituer au demandeur sur le portail.

## 5. Budget et formules

Scène `budget`.

**Sources commerciales internes :** `app/lib/tarifs.ts`, notamment `PRIX_APPEL`, `prix`, `FORMULES_VENDUES`, `PRESTATIONS` et `MENTION_TRADUCTIONS`, ainsi que le bloc des tarifs de l’accueil.

Le prix d’appel est importé, jamais recopié. L’estimation des traductions est distinguée d’une prise en charge sans limite ; la mention détaillée de l’accueil précise leur refacturation au coût réel sur justificatif. Essentielle concerne la préparation du visa ; Premium ajoute la préparation de l’arrivée. Les prix restent à partir de, selon le dossier et le devis. Les formules retirées de la vente ne sont pas mentionnées.

Le film n’attribue aucune promesse commerciale à une ambassade et ne garantit pas l’approbation du visa.
