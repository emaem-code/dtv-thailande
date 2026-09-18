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

const CHAMP =
  'w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-amber-500/60 transition-colors placeholder:text-gray-600';
const ETIQUETTE = 'block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1.5';

function euros(m: number): string {
  return `${m.toLocaleString('fr-FR').replace(/ | /g, ' ')} €`;
}

export default function BlocSignature({
  jeton,
  honoraires,
  total,
  acompte,
  nomPreRempli,
  adressePreRemplie,
}: {
  jeton: string;
  honoraires: number;
  total: number;
  acompte: number;
  nomPreRempli: string;
  adressePreRemplie: string;
}) {
  const router = useRouter();

  // Le nom enregistré au devis est souvent « Prénom Nom » : on le découpe pour
  // éviter au client de retaper ce qu'il m'a déjà donné, tout en le laissant
  // corriger. C'est lui qui sait comment il s'appelle.
  const morceaux = nomPreRempli.trim().split(/\s+/);
  const [prenom, setPrenom] = useState(morceaux.length > 1 ? morceaux[0] : '');
  const [nom, setNom] = useState(
    morceaux.length > 1 ? morceaux.slice(1).join(' ') : nomPreRempli.trim(),
  );
  const [adresse, setAdresse] = useState(adressePreRemplie);
  const [accord, setAccord] = useState(false);
  const [renonciation, setRenonciation] = useState(false);
  const [code, setCode] = useState('');

  const [etape, setEtape] = useState<'identite' | 'code'>('identite');
  const [destinataire, setDestinataire] = useState('');
  const [occupe, setOccupe] = useState(false);
  const [erreur, setErreur] = useState('');
  const [avis, setAvis] = useState('');

  const demanderCode = async () => {
    setErreur('');
    setAvis('');
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
                Nom
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

          <label className="flex gap-3 items-start cursor-pointer border border-white/10 rounded-xl p-4 hover:border-white/20 transition-colors">
            <input
              type="checkbox"
              checked={accord}
              onChange={(e) => setAccord(e.target.checked)}
              className="mt-1 w-4 h-4 flex-none accent-amber-500"
            />
            <span className="text-sm text-gray-300 leading-relaxed">
              <strong className="text-white">Bon pour accord.</strong> J&apos;accepte ce devis et
              m&apos;engage à régler {euros(honoraires)} d&apos;honoraires, dont{' '}
              {euros(acompte)} ({ACOMPTE_POURCENT} %) à la signature. Je comprends que les frais
              externes, estimés à {euros(total - honoraires)}, sont réglés séparément par mes soins
              aux organismes concernés.
            </span>
          </label>

          <label className="flex gap-3 items-start cursor-pointer border border-white/10 rounded-xl p-4 hover:border-white/20 transition-colors">
            <input
              type="checkbox"
              checked={renonciation}
              onChange={(e) => setRenonciation(e.target.checked)}
              className="mt-1 w-4 h-4 flex-none accent-amber-500"
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
            className="w-full bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold py-3.5 rounded-xl transition-colors disabled:opacity-50"
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
              className={`${CHAMP} text-center text-2xl tracking-[0.4em] font-mono`}
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
            , pour {euros(honoraires)} d&apos;honoraires.
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
            className="w-full bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold py-3.5 rounded-xl transition-colors disabled:opacity-50"
          >
            {occupe ? 'Signature en cours…' : 'Signer le devis'}
          </button>

          <button
            onClick={demanderCode}
            disabled={occupe}
            className="w-full text-xs text-gray-400 hover:text-white py-2 transition-colors disabled:opacity-50"
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
