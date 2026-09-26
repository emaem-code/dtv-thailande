/**
 * Repères en secondes dans le mixage voix off + musique du 26 septembre 2026.
 * Chaque tableau de sous-titres suit les phrases de FILM_ACCUEIL.narration.
 * Le mixage ajoute 350 ms avant la voix ; les repères incluent ce décalage.
 * Recaler ces repères si l’enregistrement change (docs/mixage-film-accueil.md).
 */
export const FILM_AUDIO_SRC = "/audio/film-dtv-voix-musique-358b5067a0.mp3";
export const FILM_AUDIO_DURATION = 88.25;

export const FILM_AUDIO_CHAPTERS = [
  // Les points suivent les idées prononcées, pas trois fractions du chapitre.
  { id: "projet", start: 0, captions: [0.44, 2.72, 5.30], points: [6.43, 8.28, 9.82] },
  { id: "reperes", start: 13.12, captions: [13.12, 16.41, 20.89], points: [13.12, 16.41, 20.89] },
  { id: "profils", start: 24.53, captions: [24.53, 30.08, 31.45, 33.64], points: [24.53, 27.07, 31.45] },
  { id: "dossier", start: 37.75, captions: [37.75, 43.48, 46.40, 48.40], points: [37.75, 43.48, 46.40] },
  { id: "methode", start: 49.93, captions: [49.93, 53.73, 60.04], points: [49.93, 53.73, 56.00] },
  { id: "budget", start: 62.15, captions: [62.15, 63.64, 67.28, 70.47, 72.61], points: [62.15, 63.64, 67.28] },
  { id: "premier-pas", start: 74.95, captions: [74.95, 78.90, 81.36], points: [74.95, 78.90, 83.28] },
] as const;

/** L’audio est l’unique horloge, y compris après une pause ou un saut de chapitre. */
export function getFilmPosition(currentTime: number) {
  const time = Number.isFinite(currentTime)
    ? Math.max(0, Math.min(currentTime, FILM_AUDIO_DURATION))
    : 0;
  let scene = 0;
  for (let index = 1; index < FILM_AUDIO_CHAPTERS.length; index += 1) {
    if (time < FILM_AUDIO_CHAPTERS[index].start) break;
    scene = index;
  }
  const chapter = FILM_AUDIO_CHAPTERS[scene];
  const end = FILM_AUDIO_CHAPTERS[scene + 1]?.start ?? FILM_AUDIO_DURATION;
  let captionIndex = 0;
  for (let index = 1; index < chapter.captions.length; index += 1) {
    if (time < chapter.captions[index]) break;
    captionIndex = index;
  }
  let pointIndex = -1;
  chapter.points.forEach((start, index) => {
    if (time >= start) pointIndex = index;
  });
  return {
    scene,
    captionIndex,
    pointIndex,
    progress: (time - chapter.start) / (end - chapter.start),
  };
}
