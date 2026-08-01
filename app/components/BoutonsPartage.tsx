'use client';

import { useEffect, useState } from 'react';

type Props = {
  url: string;
  titre: string;
  variant: 'entete' | 'fin';
};

/**
 * Boutons de partage d'un article.
 *
 * Aucun widget tiers : pas de script externe, pas de traceur, donc rien à
 * déclarer dans le bandeau cookies et aucun poids ajouté au chargement.
 *
 * Deux comportements selon l'appareil :
 *
 * — sur écran tactile, si le navigateur expose le partage système, on ouvre
 *   directement la feuille de partage native. Elle donne accès à WhatsApp,
 *   Line, Telegram, Messenger, SMS et AirDrop, ce qui correspond à la façon
 *   dont circulent réellement les liens entre expatriés ;
 * — sur ordinateur, où cette feuille n'existe pas ou rend mal, on affiche des
 *   liens directs vers les trois réseaux utiles à cette audience.
 *
 * Le bouton « copier le lien » est proposé dans les deux cas : c'est le mode
 * de partage le plus fréquent vers un forum ou un groupe Facebook.
 */
export default function BoutonsPartage({ url, titre, variant }: Props) {
  const [natif, setNatif] = useState(false);
  const [copie, setCopie] = useState(false);

  useEffect(() => {
    setNatif(
      typeof navigator.share === 'function' &&
        window.matchMedia('(pointer: coarse)').matches,
    );
  }, []);

  const partagerNatif = async () => {
    try {
      await navigator.share({ title: titre, text: titre, url });
    } catch {
      // L'utilisateur a fermé la feuille de partage : rien à signaler.
    }
  };

  const copierLien = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopie(true);
      setTimeout(() => setCopie(false), 2200);
    } catch {
      // Presse-papiers refusé (contexte non sécurisé) : on ne bloque rien.
    }
  };

  const e = encodeURIComponent;

  const reseaux = [
    {
      nom: 'WhatsApp',
      href: `https://wa.me/?text=${e(`${titre} ${url}`)}`,
      chemin:
        'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.4',
    },
    {
      nom: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${e(url)}`,
      chemin:
        'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    },
    {
      nom: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${e(url)}`,
      chemin:
        'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    },
  ];

  // Volontairement sobre : bordure fine, gris, pas de couleur pleine.
  // Ces boutons ne doivent jamais entrer en concurrence avec l'appel à
  // l'action commercial de la page.
  const styleBouton =
    'inline-flex items-center justify-center h-9 w-9 rounded-full border border-white/10 text-gray-500 transition-colors hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500/60';

  const boutons = (
    <div className="flex items-center gap-2">
      {natif ? (
        <button
          type="button"
          onClick={partagerNatif}
          aria-label="Partager cet article"
          className={styleBouton}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M8.684 13.342a3 3 0 100-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.368-2.684 3 3 0 00-5.368 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </button>
      ) : (
        reseaux.map((r) => (
          <a
            key={r.nom}
            href={r.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Partager sur ${r.nom}`}
            title={`Partager sur ${r.nom}`}
            className={styleBouton}
          >
            <svg
              className="h-[15px] w-[15px]"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d={r.chemin} />
            </svg>
          </a>
        ))
      )}

      <button
        type="button"
        onClick={copierLien}
        aria-label={copie ? 'Lien copié' : 'Copier le lien de l’article'}
        title={copie ? 'Lien copié' : 'Copier le lien'}
        className={`${styleBouton} ${copie ? 'border-emerald-500/40 text-emerald-400 hover:border-emerald-500/40 hover:text-emerald-400' : ''}`}
      >
        {copie ? (
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5m2.5-2.5a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5"
            />
          </svg>
        )}
      </button>

      <span aria-live="polite" className="sr-only">
        {copie ? 'Lien copié dans le presse-papiers' : ''}
      </span>
    </div>
  );

  // En-tête : une simple ligne d'icônes sous la signature, sans phrase.
  if (variant === 'entete') {
    return (
      <div className="mt-6 flex items-center gap-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-600">
          Partager
        </span>
        {boutons}
      </div>
    );
  }

  // Fin d'article : un filet, une phrase, les mêmes icônes. Placé après
  // l'appel à l'action pour ne pas s'intercaler entre la lecture et l'offre.
  return (
    <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-gray-500">
        Cet article peut éviter une mauvaise surprise à quelqu&apos;un que vous
        connaissez.
      </p>
      {boutons}
    </div>
  );
}
