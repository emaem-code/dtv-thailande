# Consignes de travail — DTV Thaïlande

## Périmètre autorisé

- Travailler uniquement sur la branche `bac-a-sable`, sauf instruction explicite contraire du propriétaire.
- Ne pas modifier ni fusionner dans `main` et ne pas déployer le site de production.

## Fiabilité du contenu (instruction du propriétaire, 22 septembre 2026)

- Toute affirmation nouvelle ou modifiée concernant une procédure doit être sourcée. Préférer le poste consulaire compétent, le ministère ou le portail gouvernemental concerné.
- Lire la source avant de l'utiliser ; consigner son URL, sa date de consultation, le pays/poste concerné et le passage qui justifie l'affirmation. Placer un lien près du texte destiné aux clients.
- Un texte déjà présent sur le site ne constitue pas une preuve. Une optimisation SEO ne justifie jamais le maintien d'une erreur.
- Si un point n'est pas vérifié, l'omettre ou expliciter l'incertitude. Signaler au propriétaire une divergence entre ses indications et une source consultée ; ne jamais prétendre que la source dit autre chose.
- Distinguer prestation de l'agence, règle consulaire, délai indicatif et décision d'un tiers. Ne garantir ni l'obtention du visa, ni son délai, ni la conformité des documents d'une école.
- Décrire le travail sur les écoles : vérifier leurs agréments et écarter les établissements non homologués.
- Ne pas réintroduire une étape de voyage dans un pays tiers, de tampon d'entrée ou de géolocalisation pour déposer un DTV. Depuis le 31 août 2026, le pays de nationalité ou de résidence officielle et la compétence du poste déterminent le dépôt ; une visite touristique dans un pays tiers ne suffit plus.
- Le dépôt se fait en ligne sur e-Visa. Un entretien peut être demandé au cas par cas. Ne pas transformer cela en déplacement consulaire systématique, ni affirmer que l'on peut déposer depuis n'importe où.
- Le délai consulaire de Paris n'est pas de 3 à 5 jours. Au 22 septembre 2026, ses pages officielles indiquent environ quatre semaines, parfois davantage. Le revérifier avant toute nouvelle modification.
- Les cinq étapes partagées sont dans `app/lib/methode-dtv.ts` : modifier cette source commune pour conserver la cohérence entre l'accueil et la fenêtre méthode.

Références et portée de la vérification : `docs/sources-procedure-dtv.md`.
