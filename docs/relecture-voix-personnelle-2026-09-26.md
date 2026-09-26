# Relecture de la voix du site — 26 septembre 2026

Branche : `bac-a-sable`. Les actions d’accompagnement sont rédigées au « je » ; les possessifs institutionnels sont remplacés par des formulations neutres. Aucun « ma méthode », « mon expertise » ou « mes clients » n’a été introduit.

## Décompte par zone

Recherche des mots entiers `nous`, `notre` et `nos`, sans distinction de casse, dans les sources de `app/`. Chaque mot compte, même si une ligne en contient plusieurs. Ce périmètre inclut les métadonnées, les commentaires, les courriels et les composants en sommeil : **210 occurrences avant, 17 après la première passe, puis 5 après les corrections complémentaires du 26 septembre 2026**. Le blog représentait bien **107 occurrences**, accueil compris.

| Zone | Avant | Après |
| --- | ---: | ---: |
| Accueil, en-tête principal et anciennes cartes vidéo | 23 | 0 |
| Navigation secondaire, fenêtres et méthode partagée | 18 | 0 |
| Film explicatif | 9 | 0 |
| Accueil du blog | 5 | 0 |
| 19 articles du blog | 102 | 1 |
| Éligibilité et commentaire d’attribution | 24 | 0 |
| Contact | 6 | 0 |
| FAQ et ses métadonnées | 5 | 0 |
| Accusé de réception de la demande | 9 | 0 |
| Alertes et désinscription | 4 | 0 |
| Devis, clause de voyage et confirmation de signature | 4 | 3 |
| Administration | 1 | 1 |
| **Total** | **210** | **5** |

Les mentions légales, les CGV et les signatures de courriel sont inchangées. Elles ne contiennent pas d’autre occurrence de ces trois mots.

## Corrections complémentaires du 26 septembre 2026

Le remplacement complet de la voix et des textes du film a supprimé ses neuf occurrences : le film est désormais à zéro. Les trois dernières formulations institutionnelles ont ensuite été corrigées sur demande du propriétaire : « Aucune somme ne transite par moi » dans la clause de voyage, « je conseille de prévoir » dans les données de la FAQ, et « Je gère ces traductions dans le cadre de l'accompagnement. » dans la FAQ structurée de l’article freelance.

Les apostrophes de `app/lib/film-accueil.ts` sont maintenant toutes droites. Cette dernière passe ne modifie ni le mixage ni les repères de chapitres, de sous-titres ou d’arguments.

## Les 5 occurrences conservées

### Preuve de l’accord entre Matthieu et le client : 3 occurrences

- `app/devis/[jeton]/BlocSignature.tsx:397` : « la teneur et la date de notre accord » — preuve de l’accord entre les parties.
- `app/api/devis/[jeton]/signer/route.ts:266` : « le contenu exact de notre accord » — confirmation de signature en texte brut.
- `app/api/devis/[jeton]/signer/route.ts:301` : même formulation dans la version HTML du courriel.

### Citation d’une école : 1 occurrence

- `app/blog/visa-dtv-soft-power-ecoles/page.tsx:500` : « nous ne proposons actuellement que le programme de 9 mois ». Ce sont les propos cités de l’école, pas ceux de DTV Thaïlande.

### Échange entre Matthieu et le client : 1 occurrence

- `app/admin/devis/[id]/EditeurDevis.tsx:669` : « Voici le devis dont nous avons parlé… ». Exemple dans l’éditeur : ce pluriel désigne Matthieu et son interlocuteur, pas une équipe.

## Vérifications de la première passe

- Compilation de production et contrôle TypeScript réussis ; analyse statique des fichiers modifiés réussie.
- Comparaison avec la version de départ : 12 fichiers protégés strictement identiques, 38 objets JSON-LD identiques et réponses sources de la FAQ inchangées.
- Signatures des courriels, liens, images, attributs `sizes`, styles et structure du formulaire inchangés.
- Vérification du texte généré sur 24 pages : accueil, blog, contact, éligibilité, FAQ et 19 articles. Hors film, la seule occurrence destinée au lecteur est la citation de l’école.
- Les cartes vidéo en sommeil et les anciennes fenêtres ont également été relues ; elles ne sont pas remises en service.

## Vérifications des corrections complémentaires

- Nouvelle recherche des mots entiers `nous`, `notre` et `nos` dans tout `app/` : **5 occurrences**, toutes listées ci-dessus.
- Les trois mentions de « notre accord », la citation de l’école et « le devis dont nous avons parlé » sont conservés à l’identique.
- Le fichier audio et les repères du film restent strictement identiques à la version validée.

## Formulations de fond signalées, sans correction dans ce chantier

Deux anciennes formulations restent à relire séparément : « organisation logistique de votre Visa Run » à la fin de l’article sur les fonds bancaires, et « à l’ambassade de votre choix » à la fin de l’article freelance. Le présent chantier porte sur la voix rédactionnelle ; ces formulations de procédure n’ont pas été réécrites ni validées ici.
