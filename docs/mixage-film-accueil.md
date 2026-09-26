# Mixage de la présentation de l’accueil

## Version en service — 26 septembre 2026

- Voix fournie : `ElevenLabs_2026-09-26T02_40_30_Matthieu_ivc_sp100_s50_sb75_v3.mp3`, **85,891 s** dans le conteneur source.
- Musique inchangée : `Steady Ground.mp3`.
- Piste livrée : `public/audio/film-dtv-voix-musique-358b5067a0.mp3`, **1 766 444 octets**, MP3 stéréo **44,1 kHz / 160 kbit/s**.
- Montage : **88,25 s** de son décodé, comprenant les **350 ms** ajoutées avant la voix et environ deux secondes de sortie musicale. Le conteneur MP3 indique **88,294 s**, remplissage de l’encodeur compris.
- Ancien MP3 `film-dtv-voix-musique-9a369745a5.mp3` retiré de `public/audio`. Le nouveau nom comporte l’empreinte du contenu et évite de réutiliser l’ancien cache.

### Réglages reconduits

FFmpeg **7.1**, traitement local, aucune dépendance ajoutée au site. Gain voix **−0,14 dB**, conversion stéréo, délai **350 ms** ; musique **−12 dB** avec fondu d’entrée **1,2 s** et fondu de sortie **3,25 s**. Seul le début du fondu de sortie est recalé sur la nouvelle durée : **85,00 s** au lieu de 87,00 s.

Abaissement sous la voix inchangé : seuil linéaire **0,06**, ratio **3:1**, attaque **15 ms**, relâchement **600 ms**, sans compensation. Somme sans normalisation, limiteur **−1,5 dB**, compensation de latence activée et gain automatique désactivé. Encodage **libmp3lame 160 kbit/s**, sans métadonnées ni pochette sources. Le débit et les pauses de la voix sont conservés.

Mesures du MP3 décodé (`loudnorm` en analyse uniquement) : **−24,12 LUFS intégrés**, **−7,52 dBTP**, plage de sonie **2,40 LU**. La nouvelle voix source mesure **−24,16 LUFS**, contre **−15,86 LUFS** pour l’ancienne : conserver les mêmes gains produit donc un niveau plus faible, ce n’est pas une normalisation vers la sonie de l’ancienne version.

Comparaison des pistes séparées, fenêtres de 200 ms où la voix dépasse −35 dBFS RMS : musique **5,65 dB sous la voix en moyenne énergétique**, écart médian **5,05 dB**. Ces mesures de niveau ne garantissent pas à elles seules l’intelligibilité sur chaque haut-parleur.

### Repères recalculés sur la nouvelle voix

Les repères incluent le décalage de **350 ms**. Relevé des mots par analyse locale, puis vérification des débuts de phrase sur les pauses de la piste voix après montage ; environ 20 ms de marge avant l’attaque évitent de couper la première consonne lors d’un saut de chapitre. Le chapitre 1 commence à 0,00 s pour conserver l’amorce musicale ; la première attaque de voix intervient vers 0,46 s.

Les textes validés restent la référence, indépendamment des erreurs de reconnaissance automatique. Le découpage du lecteur aux points, points d’interrogation et points-virgules produit bien **3, 3, 4, 4, 3, 5, 3 sous-titres**, soit **25**. Les **21 repères des arguments animés** sont eux aussi recalculés, pas décalés forfaitairement.

| Chapitre | Début | Débuts des sous-titres (s) | Débuts des arguments (s) |
| --- | ---: | --- | --- |
| Votre projet | 0,00 s | 0,44 · 2,72 · 5,30 | 6,43 · 8,28 · 9,82 |
| Le visa DTV | 13,12 s | 13,12 · 16,41 · 20,89 | 13,12 · 16,41 · 20,89 |
| Votre éligibilité | 24,53 s | 24,53 · 30,08 · 31,45 · 33,64 | 24,53 · 27,07 · 31,45 |
| Les justificatifs | 37,75 s | 37,75 · 43,48 · 46,40 · 48,40 | 37,75 · 43,48 · 46,40 |
| L’accompagnement | 49,93 s | 49,93 · 53,73 · 60,04 | 49,93 · 53,73 · 56,00 |
| Votre budget | 62,15 s | 62,15 · 63,64 · 67,28 · 70,47 · 72,61 | 62,15 · 63,64 · 67,28 |
| La suite | 74,95 s | 74,95 · 78,90 · 81,36 | 74,95 · 78,90 · 83,28 |

La transcription dépliable reprend directement les sept nouvelles narrations de `FILM_ACCUEIL`. Le composant du lecteur, son style, ses commandes, son adaptation mobile et l’utilisation de `audio.currentTime` restent inchangés. Aucune source audio n’est assignée au repos ; `preload="none"` est conservé. Les montants affichés restent calculés depuis les modules tarifaires et ne sont pas prononcés.

### Vérifications de cette version

- Narrations comparées au texte fourni ; chapitres 2 et 3 conservés à l’identique (apostrophes typographiques comprises).
- Contrôle des 7 frontières, des 25 débuts de sous-titre, des 21 débuts d’argument et de la position de fin dans `getFilmPosition`.
- Compilation Next.js et ESLint réussis.
- Navigateur : aucune source audio au repos, nouveau MP3 au clic, sept sauts de chapitre avec le bon premier sous-titre, lecture, pause, boutons Son et sous-titres, fin à 100 % et bouton Revoir.
- Transcription dépliable vérifiée : les sept nouvelles narrations sont présentes.
- Rendu mobile à 390 × 844 vérifié ; aucun changement du composant du lecteur ou de sa feuille de style.

### Reproduction du mixage

Voix en entrée 0, musique en entrée 1 :

```text
[0:a]aresample=44100,aformat=sample_fmts=fltp:channel_layouts=stereo,
volume=-0.14dB,adelay=350|350,apad,atrim=duration=88.25,
asplit=2[vduck][vsum];
[1:a]aresample=44100,aformat=sample_fmts=fltp:channel_layouts=stereo,
atrim=duration=88.25,asetpts=PTS-STARTPTS,volume=-12dB,
afade=t=in:st=0:d=1.2,afade=t=out:st=85:d=3.25[music];
[music][vduck]sidechaincompress=threshold=0.06:ratio=3:attack=15:release=600:makeup=1[ducked];
[vsum][ducked]amix=inputs=2:duration=longest:normalize=0,
alimiter=limit=0.8413951416451951:level=0:latency=1,
atrim=duration=88.25[mix]
```

Sortie : `-map [mix] -map_metadata -1 -c:a libmp3lame -b:a 160k -ar 44100 -ac 2`.

---

## Historique — version du 24 septembre 2026

Les réglages et repères ci-dessous décrivent l’ancienne voix et ne doivent plus servir de repères au lecteur actuel.

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

## Animation des arguments — 25 septembre 2026

Les `points` de `FILM_AUDIO_CHAPTERS` donnent les débuts des idées prononcées,
calés sur le mixage existant. L’introduction distingue notamment « comprendre »
(6,31 s), « vérifier votre profil » (8,27 s) et « préparer votre dossier » (9,75 s).
Ces repères viennent du relevé local des mots de la voix fournie, avec les 350 ms
ajoutées au montage. Ils complètent les sous-titres sans en modifier les repères.

L’argument courant suit `audio.currentTime`, via les événements du lecteur,
avec la granularité de `timeupdate` du navigateur. Lui seul reçoit le glissement
horizontal de 8 px et le fond sauge. La durée (640 ms) et la courbe sont celles
déjà définies par le site. Les autres arguments restent lisibles et immobiles ;
aucun texte ne part d’une opacité nulle. Pause, attente réseau et navigation par
chapitre conservent l’audio comme unique horloge. Aucun chargement supplémentaire
au repos et aucune dépendance ajoutée au site.

Le deuxième argument du chapitre Accompagnement reprend désormais la voix :
« L’ambassade reste seule décisionnaire. », à 53,47 s. Les trois arguments de ce
chapitre suivent donc la narration, sur ordinateur comme sur téléphone ; le
complément « À retenir » n’est plus nécessaire. Les boutons de commande nomment
l’action disponible : activer ou désactiver le son / les sous-titres.

En mouvement réduit, le glissement et la transition de fond sont désactivés ;
la mise en évidence statique suit toujours la voix. Contrastes : texte courant
#526357 sur #eef0e6 = 5,56:1 ; argument actif #243f35 sur #dfe7d8 = 9,01:1 ;
numéro actif #f7f7f2 sur #243f35 = 10,64:1.
