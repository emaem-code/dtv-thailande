/**
 * Alertes Telegram — le canal où tout ce qui arrive mérite qu'on s'arrête.
 *
 * Ce fichier existe à cause d'un client perdu. Un rendez-vous réservé est
 * arrivé au milieu d'une rafale de notifications identiques, il est passé
 * inaperçu, et le prospect est resté seul en ligne. Le problème n'était pas
 * l'absence de notification : c'était qu'un événement important et un
 * événement sans intérêt arrivaient par le même canal, avec la même tête.
 *
 * D'où les deux principes qui gouvernent ce module :
 *
 *   1. UN SEUL POINT DE SORTIE. Tout le code qui veut prévenir Matthieu passe
 *      par `alerter()`. Le canal — Telegram aujourd'hui, WhatsApp ou Pushover
 *      demain — est choisi ici et nulle part ailleurs. Changer d'avis coûtera
 *      la modification d'une seule fonction.
 *
 *   2. DEUX NIVEAUX, JAMAIS UN SEUL. Ce qui rapporte de l'argent fait vibrer
 *      le téléphone. Le reste arrive en silence et attend d'être lu. Une
 *      alerte qui se déclenche pour tout finit par n'être plus regardée, et
 *      l'on se retrouve exactement là où l'on était avant de l'installer.
 *
 * Pourquoi Telegram plutôt que WhatsApp : l'API WhatsApp Business exige un
 * numéro de téléphone dédié, vierge de tout compte WhatsApp existant, un
 * compte Meta Business vérifié, des modèles de message approuvés par Meta pour
 * tout envoi hors fenêtre de 24 heures, et une facturation au message. Pour
 * s'envoyer « nouveau lead » à soi-même, c'est hors de proportion.
 */

/** Ce qui fait vibrer le téléphone, et ce qui arrive en silence. */
export type Urgence = 'critique' | 'normale';

export type Alerte = {
  /** Emoji ou symbole affiché en tête. Un coup d'œil doit suffire à trier. */
  icone: string;
  titre: string;
  /** Lignes de détail, affichées telles quelles sous le titre. */
  detail?: string[];
  /** Lien cliquable en bas du message. */
  lien?: { libelle: string; url: string };
  urgence: Urgence;
};

/**
 * Heures calmes, en heure de Phuket (UTC+7).
 *
 * Les clients sont en France, cinq heures derrière : un devis consulté à 22 h
 * à Paris tombe à 3 h du matin ici. Pendant ces heures, les alertes normales
 * partent quand même — mais en silence. Telegram les dépose sans son ni
 * vibration, et elles attendent le réveil.
 *
 * Aucune file d'attente n'est nécessaire, et c'est voulu : une file suppose un
 * travail périodique pour la vider, or le plan Vercel Hobby n'autorise qu'une
 * seule tâche planifiée par jour, déjà prise par les relances.
 */
const CALME_DEBUT = 23;
const CALME_FIN = 7;

function heureAPhuket(): number {
  return Number(
    new Intl.DateTimeFormat('fr-FR', {
      hour: 'numeric',
      hour12: false,
      timeZone: 'Asia/Bangkok',
    }).format(new Date()),
  );
}

function enHeuresCalmes(): boolean {
  const h = heureAPhuket();
  return h >= CALME_DEBUT || h < CALME_FIN;
}

/**
 * Échappe le HTML pour Telegram.
 *
 * Le contenu vient de saisies libres — un prénom, une ville, des remarques.
 * Telegram refuse le message entier si le balisage est invalide, donc un
 * chevron mal placé dans le nom d'un prospect ferait disparaître l'alerte
 * plutôt que de l'afficher de travers. C'est exactement le genre de panne
 * silencieuse que ce module est censé éviter.
 */
function echapper(texte: string): string {
  return texte.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function composer(a: Alerte): string {
  const lignes = [`${a.icone} <b>${echapper(a.titre)}</b>`];
  if (a.detail?.length) {
    lignes.push('');
    for (const d of a.detail) lignes.push(echapper(d));
  }
  if (a.lien) {
    lignes.push('');
    lignes.push(`<a href="${a.lien.url}">${echapper(a.lien.libelle)}</a>`);
  }
  return lignes.join('\n');
}

/**
 * Envoie l'alerte. Ne lève jamais.
 *
 * Une alerte est une commodité, pas une étape du parcours client. Si Telegram
 * est injoignable ou le jeton absent, le devis doit partir quand même : on
 * journalise et on continue. Tous les appelants peuvent donc l'invoquer sans
 * try/catch, et aucun n'a besoin de l'attendre.
 */
export async function alerter(a: Alerte): Promise<boolean> {
  const jeton = process.env.TELEGRAM_BOT_TOKEN;
  const destinataire = process.env.TELEGRAM_CHAT_ID;

  // Absence de configuration : ce n'est pas une erreur. En développement et
  // pendant la recette, on ne veut pas de notifications.
  if (!jeton || !destinataire) return false;

  // Le téléphone ne vibre que pour ce qui rapporte, et jamais la nuit pour le
  // reste. `disable_notification` livre le message sans son ni vibration : il
  // est là au réveil, il n'a réveillé personne.
  const silencieux = a.urgence !== 'critique' && enHeuresCalmes();

  const controleur = new AbortController();
  const minuteur = setTimeout(() => controleur.abort(), 5000);

  try {
    const reponse = await fetch(`https://api.telegram.org/bot${jeton}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: destinataire,
        text: composer(a),
        parse_mode: 'HTML',
        disable_notification: silencieux,
        link_preview_options: { is_disabled: true },
      }),
      signal: controleur.signal,
    });

    if (!reponse.ok) {
      console.error('[alerte] Telegram a refusé :', reponse.status, await reponse.text());
      return false;
    }
    return true;
  } catch (erreur) {
    console.error('[alerte] envoi impossible :', erreur);
    return false;
  } finally {
    clearTimeout(minuteur);
  }
}

/** Formate un montant : « 1 681 € ». */
export function euros(montant: number): string {
  return `${montant.toLocaleString('fr-FR').replace(/ | /g, ' ')} €`;
}

/**
 * L'heure locale de Matthieu, pour dater une alerte d'un coup d'œil.
 * Le serveur pense en UTC ; lui vit à Phuket.
 */
export function heureLocale(): string {
  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Bangkok',
  }).format(new Date());
}
