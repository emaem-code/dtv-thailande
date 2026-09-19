'use client';

import { useEffect, useRef } from 'react';

/**
 * Signale au serveur que la page a été ouverte par un être humain.
 *
 * Le composant ne rend rien et n'attend rien : il prévient, et le parcours du
 * client continue quoi qu'il arrive. Si l'appel échoue, on perd une statistique
 * — jamais une signature.
 *
 * Deux protections contre les fausses lectures :
 *
 *   — Il vit dans le navigateur. Les passerelles antivirus des messageries
 *     ouvrent tous les liens d'un courriel avant le destinataire, mais
 *     n'exécutent pas JavaScript : elles ne déclencheront donc rien.
 *
 *   — `useRef` garde le signal à une seule émission par chargement. En
 *     développement, React monte les composants deux fois pour débusquer les
 *     effets mal écrits ; sans ce garde-fou, chaque ouverture compterait double
 *     dans les statistiques de production le jour où le mode strict change.
 */
export default function SignalLecture({ jeton }: { jeton: string }) {
  const envoye = useRef(false);

  useEffect(() => {
    if (envoye.current) return;
    envoye.current = true;

    fetch(`/api/devis/${encodeURIComponent(jeton)}/vu`, {
      method: 'POST',
      // `keepalive` laisse la requête se terminer même si le visiteur ferme
      // l'onglet dans la seconde : c'est précisément le lecteur pressé qu'on
      // ne veut pas rater.
      keepalive: true,
    }).catch(() => {
      /* silencieux : une statistique n'a pas à déranger un client */
    });
  }, [jeton]);

  return null;
}
