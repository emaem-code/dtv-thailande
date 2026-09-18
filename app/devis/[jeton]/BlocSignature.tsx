'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RETRACTATION_JOURS, ACOMPTE_POURCENT } from '../../lib/agence';

/**
 * L'acceptation du devis, en deux temps.
 *
 * D'abord l'identité — nom, prénom, adresse postale —, ensuite un code reçu
 * par courriel. Cette seconde étape est ce qui change la nature de la preuve :
 * sans elle, on établit qu'un visiteur a cliqué ; avec elle, que le titulaire
 * d'une boîte précise a accepté, à une heure précise.
 *
 * Les deux cases ne sont pas décoratives. « Bon pour accord » porte le montant
 * en toutes lettres, pour qu'on ne puisse pas soutenir avoir signé sans le
 * voir. La seconde met en œuvre l'article L221-25 du code de la consommation :
 * sans demande expresse du client, le travail ne peut pas commencer avant la
 * fin du délai de rétractation.
 */

const CHAMP = 'champ';
const ETIQUETTE = 'block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-2';

function euros(m: number): string {
  return `${m.toLocaleString('fr-FR').replace(/ | /g, ' ')} €`;
}

export type ChoixFormule = {
  formule: string;
  nom: string;
  honoraires: number;
  total: number;
  acompte: number;
};

export default function BlocSignature({
  jeton,
  honoraires,
  total,
  acompte,
  nomPreRempli,
  adressePreRemplie,
  choix = [],
}: {
  jeton: string;
  honoraires: number;
  total: number;
  acompte: number;
  nomPreRempli: string;
  adressePreRemplie: string;
  /** Formules au choix. Vide sur un devis à formule unique. */
  choix?: ChoixFormule[];
}) {
  const router = useRouter();

  /**
   * Le nom enregistré au devis est découpé en prénom et nom.
   *
   * Le premier mot va toujours au prénom, jamais au nom. Le formulaire
   * d'éligibilité ne demande que le prénom : un seul mot est donc presque
   * toujours celui-là, et le placer dans le nom obligeait le client à corriger
   * deux champs au lieu d'en remplir un. Matthieu ne connaît pas toujours le
   * patronyme — c'est précisément ce que la signature vient chercher.
   */
  const morceaux = nomPreRempli.trim().split(/\s+/).filter(Boolean);
  const [prenom, setPrenom] = useState(morceaux[0] ?? '');
  const [nom, setNom] = useState(morceaux.slice(1).join(' '));
  const [adresse, setAdresse] = useState(adressePreRemplie);
  const [accord, setAccord] = useState(false);
  const [renonciation, setRenonciation] = useState(false);
  const [code, setCode] = useState('');

  /**
   * Aucune formule n'est présélectionnée.
   *
   * Cocher d'avance la plus chère serait vendeur et malhonnête ; cocher la
   * moins chère déciderait à la place du client. Tant qu'il n'a pas tranché,
   * le bouton reste inerte et le récapitulatif reste vide.
   */
  const [formuleChoisie, setFormuleChoisie] = useState<string>('');
  const retenue = choix.find((c) => c.formule === formuleChoisie);
  const montants = retenue ?? { honoraires, total, acompte, nom: '', formule: '' };
  const enAttenteDeChoix = choix.length > 0 && !retenue;

  const [etape, setEtape] = useState<'identite' | 'code'>('identite');
  const [destinataire, setDestinataire] = useState('');
  const [occupe, setOccupe] = useState(false);
  const [erreur, setErreur] = useState('');
  const [avis, setAvis] = useState('');

  const demanderCode = async () => {
    setErreur('');
    setAvis('');
    if (choix.length > 0 && !retenue) {
      setErreur('Choisissez la formule que vous retenez.');
      return;
    }
    if (prenom.trim().length < 2 || nom.trim().length < 2) {
      setErreur('Indiquez votre prénom et votre nom.');
      return;
    }
    if (adresse.trim().length < 10) {
      setErreur('Indiquez votre adresse postale complète : numéro, rue, code postal et ville.');
      return;
    }
    if (!accord) {
      setErreur('Cochez la mention « Bon pour accord ».');
      return;
    }

    setOccupe(true);
    try {
      const reponse = await fetch(`/api/devis/${jeton}/code`, { method: 'POST' });
      const corps = (await reponse.json()) as { erreur?: string; email?: string };
      if (reponse.ok) {
        setDestinataire(corps.email ?? '');
        setEtape('code');
        setAvis(`Code envoyé à ${corps.email ?? 'votre adresse'}.`);
      } else {
        setErreur(corps.erreur ?? 'Envoi impossible.');
      }
    } catch {
      setErreur('Le serveur n’a pas répondu. Réessayez dans un instant.');
    } finally {
      setOccupe(false);
    }
  };

  const signer = async () => {
    setErreur('');
    setAvis('');
    if (!/^\d{6}$/.test(code.trim())) {
      setErreur('Le code comporte six chiffres.');
      return;
    }

    setOccupe(true);
    try {
      const reponse = await fetch(`/api/devis/${jeton}/signer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom,
          prenom,
          adresse,
          code,
          bonPourAccord: accord,
          renonciationRetractation: renonciation,
          option: formuleChoisie || undefined,
        }),
      });
      const corps = (await reponse.json()) as { erreur?: string };
      if (reponse.ok) {
        // La page est rendue au serveur : elle revient signée.
        router.refresh();
        return;
      }
      setErreur(corps.erreur ?? 'Signature impossible.');
    } catch {
      setErreur('Le serveur n’a pas répondu. Réessayez dans un instant.');
    } finally {
      setOccupe(false);
    }
  };

  return (
    <section
      id="signature"
      className="mt-8 border border-amber-500/30 bg-amber-500/[0.04] rounded-2xl p-6 sm:p-8 print:hidden"
    >
      <h2 className="text-lg font-bold text-white">Accepter et signer ce devis</h2>
      <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">
        La signature se fait ici, sans impression ni scanner. Un code à usage unique vous sera
        envoyé par courriel pour confirmer que c&apos;est bien vous.
      </p>

      {etape === 'identite' ? (
        <div className="mt-6 space-y-4">
          {choix.length > 0 && (
            <div>
              <p className={ETIQUETTE}>La formule que vous retenez</p>
              <div className="space-y-2">
                {choix.map((c) => (
                  <label
                    key={c.formule}
                    className={`flex gap-3 items-start cursor-pointer border rounded-xl p-4 transition-colors ${
                      formuleChoisie === c.formule
                        ? 'border-amber-500/60 bg-amber-500/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="formule"
                      checked={formuleChoisie === c.formule}
                      onChange={() => {
                        setFormuleChoisie(c.formule);
                        // Changer de formule change le montant approuvé :
                        // l'accord doit être redonné en connaissance de cause.
                        setAccord(false);
                      }}
                      className="bouton-radio mt-0.5"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex justify-between gap-3 items-baseline">
                        <span className="text-white font-semibold">Formule {c.nom}</span>
                        <span className="text-white font-bold whitespace-nowrap">
                          {euros(c.total)}
                        </span>
                      </span>
                      <span className="block text-xs text-gray-500 mt-1 leading-relaxed">
                        {euros(c.honoraires)} d&apos;honoraires, dont {euros(c.acompte)} à la
                        signature · {euros(c.total - c.honoraires)} de frais externes réglés par vos
                        soins
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={ETIQUETTE} htmlFor="sig-prenom">
                Prénom
              </label>
              <input
                id="sig-prenom"
                className={CHAMP}
                value={prenom}
                autoComplete="given-name"
                onChange={(e) => setPrenom(e.target.value)}
              />
            </div>
            <div>
              <label className={ETIQUETTE} htmlFor="sig-nom">
                Nom de famille
              </label>
              <input
                id="sig-nom"
                className={CHAMP}
                value={nom}
                autoComplete="family-name"
                onChange={(e) => setNom(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={ETIQUETTE} htmlFor="sig-adresse">
              Adresse postale complète
            </label>
            <textarea
              id="sig-adresse"
              rows={3}
              className={CHAMP}
              value={adresse}
              autoComplete="street-address"
              placeholder={'12 rue des Lilas\n75011 Paris\nFrance'}
              onChange={(e) => setAdresse(e.target.value)}
            />
            <p className="text-[11px] text-gray-500 mt-1.5 leading-relaxed">
              Obligatoire : c&apos;est elle qui identifie le signataire, et elle figure sur la
              facture.
            </p>
          </div>

          {/* Tant qu'aucune formule n'est retenue, la case ne peut pas porter
              de montant : afficher celui d'une formule que le client n'a pas
              choisie lui ferait approuver un chiffre au hasard. */}
          <label
            className={`flex gap-3 items-start border rounded-xl p-4 transition-colors ${
              enAttenteDeChoix
                ? 'border-white/5 opacity-50 cursor-not-allowed'
                : 'border-white/10 hover:border-white/20 cursor-pointer'
            }`}
          >
            <input
              type="checkbox"
              checked={accord}
              disabled={enAttenteDeChoix}
              onChange={(e) => setAccord(e.target.checked)}
              className="case-a-cocher mt-0.5"
            />
            <span className="text-sm text-gray-300 leading-relaxed">
              <strong className="text-white">Bon pour accord.</strong>{' '}
              {enAttenteDeChoix ? (
                'Choisissez d’abord la formule que vous retenez, ci-dessus.'
              ) : (
                <>
                  J&apos;accepte ce devis et m&apos;engage à régler{' '}
                  {euros(montants.honoraires)} d&apos;honoraires
                  {retenue ? ` au titre de la formule ${retenue.nom}` : ''}, dont{' '}
                  {euros(montants.acompte)} ({ACOMPTE_POURCENT} %) à la signature. Je comprends que
                  les frais externes, estimés à {euros(montants.total - montants.honoraires)}, sont
                  réglés séparément par mes soins aux organismes concernés.
                </>
              )}
            </span>
          </label>

          <label className="flex gap-3 items-start cursor-pointer border border-white/10 rounded-xl p-4 hover:border-white/20 transition-colors">
            <input
              type="checkbox"
              checked={renonciation}
              onChange={(e) => setRenonciation(e.target.checked)}
              className="case-a-cocher mt-0.5"
            />
            <span className="text-sm text-gray-300 leading-relaxed">
              <strong className="text-white">Je demande à ce que le travail commence tout de
              suite</strong>, sans attendre la fin du délai de rétractation de{' '}
              {RETRACTATION_JOURS} jours. Je conserve ce droit : si je me rétracte pendant le
              délai, je ne règle que la part déjà exécutée.
              <span className="block text-[11px] text-gray-500 mt-1.5">
                Facultatif. Sans cette demande, je démarre le dossier au {RETRACTATION_JOURS}
                <sup>e</sup> jour.
              </span>
            </span>
          </label>

          <button
            onClick={demanderCode}
            disabled={occupe}
            className="bouton-principal text-sm"
          >
            {occupe ? 'Envoi du code…' : 'Recevoir mon code par courriel'}
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <div>
            <label className={ETIQUETTE} htmlFor="sig-code">
              Code reçu par courriel
            </label>
            <input
              id="sig-code"
              className="champ text-center text-3xl tracking-[0.35em] font-mono py-4"

              value={code}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="······"
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            />
            <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
              Envoyé à {destinataire || 'votre adresse'}. Pensez à regarder dans les indésirables.
            </p>
          </div>

          <div className="border border-white/10 rounded-xl p-4 text-xs text-gray-400 leading-relaxed">
            Vous vous apprêtez à signer en tant que{' '}
            <strong className="text-white">
              {prenom} {nom}
            </strong>
            {retenue ? `, formule ${retenue.nom}` : ''}, pour {euros(montants.honoraires)}{' '}
            d&apos;honoraires.
            {renonciation && ' Démarrage immédiat demandé.'}{' '}
            <button
              onClick={() => {
                setEtape('identite');
                setErreur('');
                setAvis('');
              }}
              className="text-amber-500 hover:underline"
            >
              Corriger
            </button>
          </div>

          <button
            onClick={signer}
            disabled={occupe || code.length !== 6}
            className="bouton-principal text-sm"
          >
            {occupe ? 'Signature en cours…' : 'Signer le devis'}
          </button>

          <button
            onClick={demanderCode}
            disabled={occupe}
            className="w-full text-xs text-gray-500 hover:text-gray-300 py-2.5 transition-colors disabled:opacity-50"
          >
            Je n&apos;ai rien reçu — renvoyer un code
          </button>
        </div>
      )}

      {erreur && <p className="text-sm text-red-400 mt-4 leading-relaxed">{erreur}</p>}
      {avis && !erreur && <p className="text-sm text-emerald-400 mt-4 leading-relaxed">{avis}</p>}

      <p className="text-[11px] text-gray-600 mt-6 leading-relaxed">
        En signant, vous acceptez que soient conservés votre identité déclarée, la date et
        l&apos;heure, votre adresse IP et une empreinte numérique du document. Ces éléments ne
        servent qu&apos;à prouver la teneur et la date de notre accord, et ne sont transmis à
        personne.
      </p>
    </section>
  );
}
