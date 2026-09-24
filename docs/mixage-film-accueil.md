# Mixage de la présentation de l’accueil — 24 septembre 2026

## Sources et résultat

- Voix fournie : `ElevenLabs_2026-09-24T07_49_32_Victoria - Warm and calm_pvc_sp100_s50_sb75_v3.mp3`, 87,876 secondes.
- Musique fournie : `Steady Ground.mp3`, 162,312 secondes.
- Piste livrée : `public/audio/film-dtv-voix-musique-9a369745a5.mp3`, 1 806 150 octets, MP3 stéréo 44,1 kHz / 160 kbit/s.
- Montage : 90,25 secondes, dont 350 ms avant la voix et environ deux secondes de sortie musicale. Le conteneur MP3 indique environ 90,28 secondes avec le remplissage de l’encodeur.

La voix conserve son débit, ses pauses et son texte. La musique est limitée à la durée du film. Aucune synthèse vocale du navigateur ne subsiste. Les originaux ne sont pas publiés avec le site.

## Réglages et mesures

Montage local avec FFmpeg 7.1, sans dépendance ajoutée au site :

- Voix convertie en stéréo, gain de −0,14 dB, décalage de 350 ms.
- Musique : gain de −12 dB, fondu d’entrée de 1,2 s, fondu de sortie de 3,25 s à partir de 87 s.
- Baisse automatique de la musique commandée par la voix : seuil linéaire 0,06, ratio 3:1, attaque 15 ms, relâchement 600 ms, aucun gain de compensation.
- Addition sans normalisation automatique, limiteur à −1,5 dB, compensation de latence activée et gain automatique désactivé.
- Encodage final libmp3lame à 160 kbit/s ; métadonnées sources et pochette non reprises.

Mesures du MP3 décodé, avec le filtre `loudnorm` utilisé en analyse : **−16,42 LUFS intégrés**, **−4,26 dBTP** au maximum, plage de sonie **2,10 LU**. Il reste donc une marge avant saturation.

Comparaison des deux pistes séparées sur les fenêtres de 200 ms où la voix dépasse −35 dBFS RMS : la musique se situe **17,53 dB sous la voix en moyenne énergétique**, avec un écart médian de **18,58 dB**. Ce sont des mesures de niveau, pas une garantie d’intelligibilité sur tous les haut-parleurs.

## Découpage

Les repères suivent l’enregistrement fourni, analysé localement pour repérer les débuts des phrases. Les sous-titres conservent le texte validé du site, sans reprendre les approximations de transcription automatique.

| Chapitre | Début dans le mixage |
| --- | ---: |
| Votre projet | 0,00 s |
| Le visa DTV | 12,27 s |
| Votre éligibilité | 22,81 s |
| Les justificatifs | 36,83 s |
| L’accompagnement | 49,45 s |
| Votre budget | 62,11 s |
| La suite | 75,01 s |

`app/lib/film-accueil-audio.ts` contient les repères des sept chapitres et des 25 sous-titres. Le lecteur se cale sur `audio.currentTime`, y compris après une pause, une attente réseau ou un saut de chapitre. Le fichier n’a pas de source assignée avant une action de lecture ; `preload="none"` est également conservé. Le bouton Son coupe l’ensemble voix + musique.

En cas de remplacement de la voix ou de modification du texte lu, refaire le mixage, changer le nom du fichier et recaler les repères. Les montants affichés restent issus des modules tarifaires existants : aucun prix n’est figé dans la voix off.

## Vérification

- Compilation Next.js et contrôle ESLint des fichiers modifiés réussis.
- Contrôle des sept frontières de chapitre, des 25 débuts de sous-titre et de la correspondance avec les phrases ; positions vérifiées sur toute la durée du film.
- Navigateur : aucune source audio au repos, lecture au clic, pause stable puis reprise avec Espace, saut au chapitre Budget, coupure du son, fin à 90,25 s / 100 %, bouton Revoir et pause automatique lorsque le lecteur sort du champ.
- Affichage mobile contrôlé à 390 px : scène carrée, sous-titres et commandes visibles. Aucune erreur du lecteur relevée dans la console pendant ce parcours.
