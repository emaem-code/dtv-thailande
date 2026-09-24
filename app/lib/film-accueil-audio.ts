/**
 * Repères en secondes dans le mixage voix off + musique du 24 septembre 2026.
 * Chaque tableau de sous-titres suit les phrases de FILM_ACCUEIL.narration.
 * Le mixage ajoute 350 ms avant la voix ; les repères incluent ce décalage.
 * Recaler ces repères si l’enregistrement change (docs/mixage-film-accueil.md).
 */
export const FILM_AUDIO_SRC = "/audio/film-dtv-voix-musique-9a369745a5.mp3";
export const FILM_AUDIO_DURATION = 90.25;

export const FILM_AUDIO_CHAPTERS = [
  { id: "projet", start: 0, captions: [0, 2.48, 5.02] },
  { id: "reperes", start: 12.27, captions: [12.27, 15.56, 19.86] },
  { id: "profils", start: 22.81, captions: [22.81, 28.98, 29.90, 32.82] },
  { id: "dossier", start: 36.83, captions: [36.83, 43.16, 46.06, 48.18] },
  { id: "methode", start: 49.45, captions: [49.45, 53.42, 59.72] },
  { id: "budget", start: 62.11, captions: [62.11, 63.64, 67.56, 70.96, 73.02] },
  { id: "premier-pas", start: 75.01, captions: [75.01, 79.14, 82.06] },
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
  return {
    scene,
    captionIndex,
    progress: (time - chapter.start) / (end - chapter.start),
  };
}
