# DTV Thaïlande — contexte projet

Dernière mise à jour : 21 septembre 2026.

Matthieu Moretti, Kathu (Phuket). Site `dtv-thailande.fr` : accompagnement
administratif de francophones pour le visa DTV thaïlandais. Activité lancée en
mai 2026, **SIRET en cours d'attribution** (INSEE). Adresse professionnelle :
`matthieu@dtv-thailande.fr` ; adresse du site : `contact@dtv-thailande.fr`.

---

## 1. Règle d'or

**Ne jamais écrire dans un courriel client une information non vérifiée.**

Si un point n'est pas sourcé : soit il n'y figure pas, soit il est présenté comme
incertain **dans le courriel lui-même**, pas seulement en aparté à Matthieu. Il
signe et envoie ce qui est rédigé ici ; une déduction présentée comme une
certitude devient sa parole, pas celle de l'assistant.

Cette règle vient d'un incident réel : un client (Théo Do Campo) a interrogé
l'ambassade par écrit et a pris en défaut une affirmation non vérifiée sur la
procédure. Coût : la crédibilité, sur un dossier par ailleurs bien traité.

Corollaire : Matthieu connaît le terrain mieux que l'assistant. Quand il
contredit une affirmation, il a probablement raison — vérifier avant d'insister.

---

## 2. Règles métier vérifiées

- **Seuil financier, ambassade de Paris : 15 000 € PAR PERSONNE**, sur chacun
  des trois derniers relevés mensuels. Montant publié en euros par le poste,
  **ce n'est pas une conversion des 500 000 THB** de la règle nationale (qui
  vaudrait ≈ 13 100 €). Ne jamais convertir. Conseiller 16 000 € de marge.
  Pour un foyer : 15 000 € × nombre de personnes (4 personnes = 60 000 €).
- **Le seuil s'apprécie sur le solde arrêté en fin de mois** (confirmé par
  l'ambassade à un client). Utile pour placer une date de dépôt : un dépôt au
  1er décembre fait examiner septembre, octobre, novembre arrêtés au 30.
- **Ces fonds ne sont pas une dépense** : un solde à montrer, qui reste au
  client et redevient disponible après le dépôt. Argument central face à toute
  alternative présentée comme « moins chère ».
- **Dépôt : pays de nationalité OU de résidence**, depuis le 31 août 2026. Un
  Français vivant en Asie relève donc de Paris. Les visa runs vers Vientiane ou
  Kuala Lumpur sont fermés aux non-résidents. **Ne jamais dire qu'il faut
  résider en France** — c'est faux et ça écarte des dossiers recevables.
- **Le dépôt se fait en ligne** (portail e-Visa), mais le poste se réserve le
  droit de **convoquer le demandeur pour un entretien**, au cas par cas. Le
  déplacement n'est donc pas une commodité. Paris annonce 3 à 4 semaines
  d'instruction.
- **Casier judiciaire** : bulletin n° 3 de moins de six mois exigé pour le
  titulaire. Gratuit, en ligne. Les enfants en sont dispensés.
- **Exemption de visa ramenée de 60 à 30 jours** au 15 septembre 2026.
- **Relevés bancaires en français acceptés en original** à Paris (pas de
  traduction assermentée pour ces pièces).
- **Accompagnants** : le visa du conjoint et des enfants est une extension de
  celui du titulaire, sans droit de séjour autonome. Pas de droit au travail en
  Thaïlande, mais l'activité étrangère peut être pilotée à distance.
- **Visa ED (enfants scolarisés)** : **obligatoire**, pas optionnel. Tout enfant
  étranger scolarisé formellement en Thaïlande doit le détenir. Ce n'est pas une
  politique d'établissement.
  - Depuis la France : exige une inscription finalisée, les frais versés
    (souvent 50 %) et un dossier d'acceptation validé par les autorités thaïes.
  - Voie recommandée : entrer comme accompagnant du DTV, s'installer, visiter
    les écoles, puis laisser l'établissement gérer la conversion sur place.
  - Après : ED de 90 jours prolongé à l'année par l'école ; déclaration
    d'adresse TM47 tous les 90 jours ; **visa à entrée unique** — sortir du
    territoire sans permis de ré-entrée l'annule (1 000 THB par sortie,
    3 800 THB à l'année).
  - Parents sous DTV : sortie du territoire tous les 180 jours.
- **Scolarité, Bangkok, primaire international** : 400 000 à 800 000 THB par an
  et par enfant (≈ 10 500 à 21 000 €).
- Taux de secours utilisé dans le code : 38,4 THB/€.

---

## 3. Interdits

- **`visafrancethailande.fr` n'est pas son domaine** — c'est un concurrent. Ne
  jamais répondre au nom de cette entité. Un courriel arrivé par erreur se
  traite par un message neuf depuis `matthieu@dtv-thailande.fr`, jamais dans le
  fil d'origine.
- **Ne jamais demander, recevoir ni afficher de secret** : `TELEGRAM_BOT_TOKEN`,
  `TELEGRAM_CHAT_ID`, `CRON_SECRET`, `RESEND_API_KEY`, variables Vercel. Ne
  jamais déchiffrer une variable d'environnement. Si Matthieu propose de les
  envoyer : refuser.
- **Ne rien promettre à un client** que Matthieu n'a pas décidé de tenir
  (rappel, appel à l'ambassade, délai). Lui demander avant de l'écrire.

---

## 4. Rédaction des courriels clients

Matthieu colle le texte dans Gmail. Donc :

- **Texte brut, zéro astérisque, zéro markdown.** Les `**` apparaissent en clair
  dans Gmail. Pour un titre de section, majuscules — et seulement si le message
  est long. Une lettre n'a pas de titres.
- **Court.** Un courriel de 300 mots vaut mieux qu'un de 700. Couper la
  démonstration, garder la conclusion.
- **Humain.** Pas de ton de note de synthèse.
- **S'excuser une fois, brièvement, puis passer au fond.** Pas d'auto-flagellation :
  il a déjà refusé une formulation qui le faisait passer pour incompétent.
  Réparer, c'est répondre à la question, pas multiplier les excuses.
- **Ne pas présumer de ce que le client a compris ni de ses intentions.** Poser
  la question plutôt qu'affirmer.
- Toujours livrer le texte dans un fichier `.txt` via `SendUserFile`.
- Pour vérifier ou corriger un envoi programmé : `label:scheduled` dans Gmail.

---

## 5. Déploiement — le conteneur ne peut pas pousser

`git push` depuis le conteneur cloud échoue (`not in this session's authorized
repository set`). Circuit obligatoire :

1. Construire et vérifier dans le clone cloud (`tsc --noEmit`, `next build`).
2. Commiter dans le clone cloud.
3. `tar czf` des fichiers modifiés → `SendUserFile` → `device_commit_files`.
4. Sur le Mac, extraire avec `cat fichier > cible` (tar ne peut pas écraser, et
   le pont ne peut pas supprimer), puis comparer avec `cmp -s`.
5. Commiter sur le Mac via `device_bash`, avec
   `-c user.name="Matthieu Moretti" -c user.email="moretti.mam@gmail.com"`.
6. **Matthieu pousse lui-même.** Attendre sa confirmation, le push prend parfois
   plus d'une minute.

Avant toute écriture git sur le Mac, lever les verrous :

```
for f in .git/index.lock .git/HEAD.lock; do
  [ -e "$f" ] && mv "$f" "_to_delete/verrous-git/$(basename $f).$RANDOM"
done
```

**Le hook « N unpushed commits on branch main » est un faux positif** : il
inspecte le clone cloud, qui ne peut structurellement pas pousser. L'ignorer.

Le pont vers le Mac (`mcp__remote-devices__*`) se coupe quand l'app Claude est
fermée. Sans lui, aucun correctif ne peut être livré — le dire au lieu de
réessayer.

---

## 6. Technique

Next.js 16.1.6 (App Router), Tailwind v4, PostgreSQL via `pg`, Resend pour le
transactionnel, hébergement Vercel, Telegram pour les alertes.

- Migrations : `ALTER TABLE … ADD COLUMN IF NOT EXISTS` dans `assurerSchema()`.
- **Séparation client/serveur** : un composant client qui importe `lib/devis`
  embarque `pg` dans le bundle navigateur. D'où `devis-modele.ts` (pur) vs
  `devis.ts` (base).
- Crons Vercel, deux autorisés sur ce plan :
  `/api/cron/quotidien` à `0 8 * * *` (relances, matin français) et
  `/api/cron/resume` à `0 2 * * *` (résumé, 9 h à Phuket). Précision ±59 min.
- Alertes : `app/lib/alerte.ts`, point de sortie unique. Deux niveaux d'urgence,
  silencieux entre 23 h et 7 h heure de Phuket sauf `critique`. Ne lève jamais.
- Vercel Web Analytics : sans cookie, donc pas de bandeau de consentement requis
  au titre de l'article 82 ; le RGPD s'applique quand même au traitement.
- Playwright dans le conteneur :
  `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` (le chemin
  `/opt/pw-browsers/chromium` est un lien, pas un dossier).
- `tsc` qui échoue sur une route supprimée : `rm -rf .next/dev`.
- Vérifier le travail d'interface avec une route jetable + capture Playwright,
  puis supprimer la route avant de livrer.

Le langage du code est le français (noms de fonctions, commentaires). Les
commentaires expliquent **pourquoi**, pas quoi.

---

## 7. Dossiers clients

| Client | État | Prochain pas |
|---|---|---|
| **Sébastien Rigo** (La Réunion, famille de 4, `seb@manuptransformation.com`, WhatsApp +262693308190) | Le plus gros dossier. Échéance des 60 000 € au 23 septembre pour un départ au 31 janvier. RDV manqué le 5 sept. Silencieux depuis. | Réponse sur le visa ED envoyée. Devis famille à établir. |
| **Théo Do Campo** (`theodocampo@gmail.com`, vit en Asie, 1 personne) | Devis 2026000386 envoyé (600 € + 631 €). A pris en défaut une affirmation sur la procédure. Dépôt conseillé au 1er décembre. | Réponse envoyée. Revoir l'estimation de frais externes si elle comptait une traduction de relevés. |
| **Ben** (`ben49roc@gmail.com`) | En Thaïlande, rentre définitivement en France le 15 octobre. Voie Soft Power cuisine. | A répondre : savoir s'il abandonne ou s'il revient. Fonds à constituer avant le 31 octobre pour un dépôt en janvier. |
| **Mathéo** | Devis envoyé, correction des 15 000 € envoyée. | Attendre. |
| **Antoine, mbourka, Nicolas, deno81490, Sylvain** | Relances envoyées les 19-20 septembre. | Attendre. |
| **Bruno** (deidda6274), **Chris** (eklatink) | Non éligibles sur les fonds. | Point d'étape en novembre. |
| **Jorge** (`uazrt@hotmail.fr`) | Devis rejeté le 20 août, jamais délivré, pas de téléphone. | Injoignable. |

---

## 8. Chantiers ouverts

1. **Appeler le service des visas de l'ambassade** : modalités de convocation
   (stade, préavis, systématique ou non), et conditions financières d'un Non-ED
   pour un mineur. Concerne Théo et Sébastien.
2. **SIRET** : dès réception INSEE, renseigner `app/lib/agence.ts` et repasser
   `immatriculationEnCours` à `false`. Débloque le médiateur (CM2C, 48 € / 3 ans),
   Stripe, et TikTok Shop pour Universbags.
3. **Corriger le site** : la page d'accueil décrit encore le déplacement vers le
   pays de dépôt selon la logique d'avant le 31 août (visa run, tampon d'entrée).
4. **Supprimer les créneaux fictifs** du calendrier de rendez-vous.
5. **Supprimer `_to_delete/`** à la racine du dépôt (l'assistant ne peut pas
   supprimer sur le Mac).
6. Journal des courriels envoyés dans l'admin (aujourd'hui, seule trace : le
   tableau de bord Resend).
7. Outil d'envoi en nombre — différé jusqu'à ~100 abonnés. Sous-domaine d'envoi
   distinct (`news.`), jamais mélangé à `send.`.
8. Plan SEO : réécriture de la page TDAC (attend ses captures), Soft Power
   (attend de vrais tarifs d'écoles), liens depuis des écoles (attend ses
   relations).
