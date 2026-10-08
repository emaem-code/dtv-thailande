# Routage consulaire — première livraison, 8 octobre 2026

Périmètre : chantiers 1 à 4 du brief, sur `bac-a-sable`. La page comparative et le maillage éditorial attendent la validation du propriétaire. Le fichier `app/lib/postes-consulaires.ts` est la copie inchangée de la recherche, commitée avant le code qui l'importe.

## Règles de chiffrage

Le pays exact de résidence est obligatoire dès la première étape. La nationalité ne sélectionne aucun poste. Une résidence non documentée, notamment un territoire ultramarin, passe en examen manuel. Changer de pays efface la réponse à l'ancienne question d'épargne.

Cinq informations sont indispensables : juridiction applicable aux visas, condition locale de résidence, montant publié (dans n'importe quelle devise), mois de relevés et frais consulaires. Seule la durée d'historique peut provenir du portail national lorsque le poste ne la publie pas ; sa provenance nationale est écrite dans le devis. Aucun montant absent n'est remplacé par une déduction.

Les autres valeurs nulles restent nulles dans la recherche. Elles apparaissent sous le devis dans l'administration avec le nom du champ et « non publié par ce poste ». Un rappel du casier judiciaire national est systématique. Les conditions locales de recevabilité sont aussi présentées pour vérification avec le client, notamment la présence actuelle demandée par Rabat.

| Résidence déclarée | Poste | Résultat attendu |
| --- | --- | --- |
| France métropolitaine, Monaco, Algérie | Paris | Devis possible |
| Belgique, Luxembourg | Bruxelles | Devis possible ; historique national signalé |
| Suisse, Liechtenstein | Berne | Devis possible avec un cours daté pour les frais |
| Maroc, Tunisie, Mauritanie | Rabat | Devis possible avec un cours daté pour les frais ; historique national signalé |
| Canada ou autres pays de la liste diplomatique d'Ottawa | Ottawa | Bloqué ; recevabilité locale non établie, périmètre visas non confirmé |
| Autre résidence | À déterminer | Bloqué, traitement manuel |

## Montants et conversions

Les minimums locaux de Paris, Bruxelles et Rabat prévalent sans conversion depuis les bahts. Pour Berne et Ottawa seulement, le minimum THB peut être accompagné d'un repère CHF/CAD daté, arrondi à la centaine supérieure et d'une marge conseillée. Ce repère ne renseigne jamais `minimumEnDeviseLocale` et n'est pas présenté comme un seuil consulaire. Ottawa reste exclu du parcours de chiffrage public.

Les frais CHF/MAD, publiés dans leur devise d'origine, sont estimés en euros pour le devis ; la ligne conserve leur montant original et la date du cours. Le cours provient de Frankfurter v2, avec un délai maximal de 2,5 secondes, sans cours de secours inventé. Sans cours valide, un nouveau devis en devise étrangère est bloqué. Les cours enregistrés avec un devis sont conservés pour éviter de modifier son prix après émission.

L'ancienne estimation des traductions est conservée : coût réel sur justificatif. Les honoraires, les formules et la grille de remise ne changent pas. Les raccourcis Paris des pages éditoriales subsistent provisoirement pour le second chantier.

## Anciens devis

Aucun pays n'est déduit de la nationalité, d'une ancienne réponse « Europe », ni d'un ancien champ libre. Un devis sans résidence doit être confirmé avant enregistrement/envoi : ses débours sont recalculés et ses anciennes options retirées, avec avertissement dans l'éditeur. Une résidence déjà enregistrée demande un nouveau devis si elle change. Les preuves de contrats déjà signés stockées en base ne sont pas réécrites.

Le refus est appliqué côté serveur avant création, sauvegarde et envoi. Un échec n'est pas présenté comme une sauvegarde ou un changement de statut réussi.

## Contrôles effectués

- Tests locaux des routes avec base et courriel remplacés : Canada refusé sans insertion, sans lead marqué traité et sans courriel ; Belgique routée depuis la résidence du lead malgré sa nationalité française ; ancien devis recalculé ; cours fourni par le navigateur ignoré.
- Tests des quatre postes autorisés, minimums publiés prioritaires, arrondis, absence de conversion non datée, repli national limité à l'historique et conservation des nulls.
- Navigateur local : pays obligatoire, changement de pays effaçant l'épargne, Belgique, Suisse, Maroc, Canada, autre pays ; rendu à 390 × 844 sans débordement horizontal. Conversion suisse obtenue depuis l'API réelle. Aucun test n'a créé de vrai dossier ni envoyé de vrai courriel.
- TypeScript, lint des fichiers concernés, tests et compilation de production.

Commandes reproductibles : `node --test tests/*.test.mjs`, `npx tsc --noEmit --incremental false`, `npm run build`.

## Relecture sur la préversion

1. Formulaire : choisir Belgique, répondre à l'épargne, revenir choisir Suisse ; l'ancienne réponse doit disparaître et le montant CHF porter une date. Canada et « autre pays » doivent proposer une vérification manuelle sans prix automatique.
2. Administration : créer un brouillon depuis un lead belge, contrôler Bruxelles et les frais publiés ; sous le devis, vérifier les inconnues, l'origine nationale de l'historique et le rappel du casier.
3. Administration : tenter une création Canada. Un message doit citer Ottawa et les informations manquantes ; aucun devis ne doit être créé. Ces essais peuvent rester au stade brouillon : aucun envoi au client n'est nécessaire.

La vérification connectée à la base de la préversion reste à faire par le propriétaire. Aucun accès à une base réelle ni à une messagerie réelle n'a été nécessaire aux tests locaux.
