# Le film DTV dans l’accueil — 24 septembre 2026

## Remplacement de la collection

Le film explicatif est placé après les profils et leur appel à l’action, avant la méthode : c’est l’ancien emplacement de la collection. Son titre public est « Le DTV, en images. ».

`HomeVideos.tsx` et `HomeVideos.module.css` restent dans le dépôt, sans import ni rendu, en attente de véritables témoignages. Les styles du dialogue vidéo sont également conservés. Les commentaires indiquent que les médias devront être remplacés avant réactivation.

L’audit des références a confirmé que les cinq MP4 `video-{dtv,erreur,temoignage,accompagnement,budget}.mp4` et leurs cinq affiches `poster-{dtv,erreur,temoignage,accompagnement,budget}.jpg` n’étaient utilisés nulle part ailleurs. Ils sont retirés de `public/` : **26 276 595 octets** de médias publiés en moins. Il n’y avait pas de balisage vidéo les référençant.

`#accompagnement` et `#film-dtv` ciblent désormais le haut du même lecteur. Le lien « Découvrir l’accompagnement » est conservé ; la navigation « L’accompagnement » vers `#methode` reste indépendante.

## Hauteur et comportement

Le lecteur utilise une colonne flexible : commandes, sous-titres et chapitres conservent leur hauteur naturelle ; la scène utilise l’espace restant avec `min-height: 0`. Les images sont recadrées avec `object-fit: cover` et conservent `sizes`.

- Ordinateur : `min(720px, 100svh - 200px)`. La réserve couvre l’en-tête de 93 px, une marge de 16 px et le rappel fixe d’éligibilité en bas. Réserver seulement 140 px ferait chevaucher ce rappel et les chapitres.
- Mobile : `min(720px, 100svh - 140px)`, avec un positionnement à 87 px du haut (en-tête de 75 px + 12 px).
- Sur téléphone, la photo occupe la moitié de la scène. Sur les écrans de 740 px de haut ou moins, le texte garde sa hauteur naturelle et la photo absorbe la différence pour éviter de couper les mots.
- Les sept chapitres restent sur une seule ligne défilable. Le chapitre actif est ramené dans cette ligne, sans déplacer la page ni le focus.
- L’arrivée par ancre est recalée après hydratation et chargement initial. Le lecteur exclut ses éléments internes du mécanisme d’ancrage automatique du défilement, afin que les changements de sous-titre ne déplacent pas la page.

## Mesures et vérifications

Mesures en pixels CSS dans le navigateur, sur la version compilée, après arrivée par ancre :

| Fenêtre de test | Hauteur du lecteur | Haut / bas dans la fenêtre |
| --- | ---: | ---: |
| Ordinateur 1440 × 900 | 700 px | 109,2 / 809,2 px |
| Format iPhone 393 × 852 | 712 px | 87,1 / 799,1 px |
| Petit format iPhone 375 × 667 | 527 px | 87,2 / 614,2 px |

À 1440 × 900, le rappel fixe commence à 818,2 px : il ne recouvre plus les chapitres. À 393 × 852, au repos, la photo mesure 239,4 px et représente 50 % des 478,8 px de la scène.

Contrôles effectués :

- Deux ancres uniques, film rendu une seule fois à la place de la collection, aucune référence aux anciens médias dans le HTML produit.
- Arrivée directe via les deux ancres, clic du lien de l’accueil et navigation par chapitre : lecteur entièrement dans le champ sous l’en-tête.
- Ligne unique de chapitres sur mobile, dernier chapitre entièrement visible après sélection.
- Petit iPhone : texte financier le plus long du chapitre 4 affiché intégralement, sans débordement du panneau de texte ; cadrage conservé lors d’un clic direct sur Pause.
- Audio sans attribut `src` au repos, puis lecture au choix d’un chapitre. Aucun changement au mixage, aux repères audio, à Son/ST ou à la transcription.
- Animations et variables de mouvement conservées, ainsi que la condition `prefers-reduced-motion`.
- Compilation Next.js, ESLint des composants concernés et vérification du diff réussies.

Les dimensions iPhone ont été simulées dans le navigateur : il ne s’agit pas d’une vérification sur un appareil Safari physique.
