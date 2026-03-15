import React from 'react';

export default function DtvGuideModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      {/* Conteneur principal */}
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#111827] rounded-3xl shadow-2xl shadow-amber-500/10 overflow-hidden border border-gray-800 flex flex-col text-left">
        
        {/* En-tête fixe */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-[#111827]/95 sticky top-0 z-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">
              GUIDE COMPLET DTV 2025-2026
            </h1>
            <p className="text-gray-400 text-sm mt-1">Le guide de référence pour Digital Nomads qui veulent s'installer légalement et librement</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-all">
            ✕
          </button>
        </div>

        {/* Contenu défilant */}
        <div className="p-6 md:p-10 overflow-y-auto text-gray-300 space-y-12">
          
          {/* Chiffres Clés */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
              <div className="text-3xl font-black text-amber-500">5 ANS</div>
              <div className="text-xs text-gray-400 uppercase">Durée du visa</div>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
              <div className="text-3xl font-black text-amber-500">180 J</div>
              <div className="text-xs text-gray-400 uppercase">Séjour / Entrée</div>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
              <div className="text-3xl font-black text-amber-500">~260 €</div>
              <div className="text-xs text-gray-400 uppercase">Coût du visa</div>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
              <div className="text-3xl font-black text-amber-500">-41 %</div>
              <div className="text-xs text-gray-400 uppercase">Coût de vie vs FR</div>
            </div>
          </div>

          {/* ================= CHAPITRE 1 ================= */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-gray-800 pb-3">
              <span className="bg-amber-500 text-black px-3 py-1 rounded-lg">01</span> Style de vie & Budget réel
            </h2>
            <p className="text-gray-400">La Thaïlande n'est pas juste une destination de vacances. C'est l'un des rares pays au monde qui combine infrastructure digitale de qualité, coût de vie raisonnable, climat exceptionnel et un visa multi-entrées 5 ans.</p>
            
            {/* Villes */}
            <h3 className="text-xl font-bold text-amber-500 mt-6">Portrait de trois villes</h3>
            <div className="overflow-x-auto rounded-xl border border-gray-700">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="p-4">VILLE</th>
                    <th className="p-4">PROFIL</th>
                    <th className="p-4">BUDGET MENSUEL</th>
                    <th className="p-4">POINT FORT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr className="bg-gray-800/30">
                    <td className="p-4 font-bold text-white">Bangkok</td>
                    <td className="p-4">Grande métropole, vie nocturne, affaires</td>
                    <td className="p-4 text-amber-500 font-bold">1000-1700 €</td>
                    <td className="p-4">Connexions, hôpitaux haut de gamme</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Chiang Mai</td>
                    <td className="p-4">Capitale nomade, nature, économique</td>
                    <td className="p-4 text-amber-500 font-bold">600-900 €</td>
                    <td className="p-4">Coworkings (50+), vie saine</td>
                  </tr>
                  <tr className="bg-gray-800/30">
                    <td className="p-4 font-bold text-white">Phuket / Îles</td>
                    <td className="p-4">Balnéaire premium, villas avec piscine</td>
                    <td className="p-4 text-amber-500 font-bold">1200-2500 €</td>
                    <td className="p-4">Mer, soleil, qualité de vie</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Budget détaillé */}
            <h3 className="text-xl font-bold text-amber-500 mt-6">Budget détaillé - Digital Nomad (Chiang Mai)</h3>
            <div className="overflow-x-auto rounded-xl border border-gray-700">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="p-4">POSTE DE DÉPENSE</th>
                    <th className="p-4">ÉCONOMIQUE</th>
                    <th className="p-4">CONFORTABLE</th>
                    <th className="p-4">PREMIUM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr className="bg-gray-800/30">
                    <td className="p-4">Logement (condo / piscine)</td>
                    <td className="p-4">200-280 €</td>
                    <td className="p-4">350-500 €</td>
                    <td className="p-4">600-900 €</td>
                  </tr>
                  <tr>
                    <td className="p-4">Transport (scooter / Grab)</td>
                    <td className="p-4">30-50 €</td>
                    <td className="p-4">60-100 €</td>
                    <td className="p-4">150-250 €</td>
                  </tr>
                  <tr className="bg-gray-800/30">
                    <td className="p-4">Assurance santé internationale</td>
                    <td className="p-4">80-100 €</td>
                    <td className="p-4">100-150 €</td>
                    <td className="p-4">150-250 €</td>
                  </tr>
                  <tr>
                    <td className="p-4">Internet mobile (forfait TH)</td>
                    <td className="p-4">8-10 €</td>
                    <td className="p-4">10-15 €</td>
                    <td className="p-4">15-20 €</td>
                  </tr>
                  <tr className="bg-amber-500/10 font-bold text-white">
                    <td className="p-4">TOTAL MENSUEL ESTIMÉ</td>
                    <td className="p-4">598-870 €</td>
                    <td className="p-4">1010-1535 €</td>
                    <td className="p-4">1815-2770 €</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-amber-500">
              <h4 className="font-bold text-white mb-2">Filtre réaliste : 4 conditions avant de sauter le pas</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Revenus récurrents stables d'au moins 1500 €/mois nets.</li>
                <li>Activité 100% en ligne pour des clients/employeurs hors Thaïlande.</li>
                <li>Épargne tampon de 6 mois minimum (~13 000 € requis pour le DTV).</li>
                <li>Prêt à gérer chaleur, barrière culturelle et démarches administratives.</li>
              </ul>
            </div>
          </section>

          {/* ================= CHAPITRE 2 ================= */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-gray-800 pb-3">
              <span className="bg-amber-500 text-black px-3 py-1 rounded-lg">02</span> Les vieux visas ne marchent plus
            </h2>
            
            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
              <h3 className="text-red-400 font-bold mb-1">🚨 La fin définitive des visa runs</h3>
              <p className="text-sm text-red-200/80">Depuis fin 2024, plus de 2 visa runs par an entraîne un refus d'entrée. Des expatriés se sont vu refouler à l'aéroport. Risque : interdiction d'entrée de 1 à 5 ans.</p>
            </div>

            {/* Comparatif Visas */}
            <h3 className="text-xl font-bold text-amber-500 mt-6">Comparatif complet des visas 2025-2026</h3>
            <div className="overflow-x-auto rounded-xl border border-gray-700">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="p-4">TYPE DE VISA</th>
                    <th className="p-4">DURÉE</th>
                    <th className="p-4">COÛT</th>
                    <th className="p-4">VERDICT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr className="bg-gray-800/30">
                    <td className="p-4">Visa Touriste (exemption + extension)</td>
                    <td className="p-4">30 + 30 jours</td>
                    <td className="p-4">Gratuit + 50 €</td>
                    <td className="p-4 text-red-400 font-bold">Insuffisant</td>
                  </tr>
                  <tr>
                    <td className="p-4">LTR Visa (Long Term)</td>
                    <td className="p-4">10 ans</td>
                    <td className="p-4">~1 300 €</td>
                    <td className="p-4 text-orange-400 font-bold">Critères stricts (80k$/an)</td>
                  </tr>
                  <tr className="bg-amber-500/10">
                    <td className="p-4 font-bold text-white">DTV - Destination Thailand Visa</td>
                    <td className="p-4 font-bold text-white">5 ans (180j/entrée)</td>
                    <td className="p-4 font-bold text-white">~260 €</td>
                    <td className="p-4 text-green-400 font-bold">LE meilleur choix</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Décryptage DTV */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h4 className="font-bold text-green-400 mb-4">✅ Ce que le DTV vous donne :</h4>
                <ul className="space-y-2 text-sm">
                  <li>- Valide 5 ans.</li>
                  <li>- 180 jours de séjour par entrée, renouvelable une fois (+180j).</li>
                  <li>- Potentiellement 360 jours consécutifs.</li>
                  <li>- Dépendants inclus (conjoint légal, enfants &lt; 20 ans).</li>
                  <li>- Travail à distance légal hors Thaïlande.</li>
                  <li>- Demande 100% en ligne (depuis votre pays de résidence).</li>
                </ul>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h4 className="font-bold text-red-400 mb-4">❌ Ce que le DTV ne donne PAS :</h4>
                <ul className="space-y-2 text-sm">
                  <li>- Travailler pour des entreprises ou clients thaïlandais.</li>
                  <li>- Une résidence permanente ou citoyenneté.</li>
                  <li>- Accès au système de santé public.</li>
                  <li>- Exonération fiscale automatique.</li>
                </ul>
              </div>
            </div>

            {/* Profils */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="border border-amber-500/30 p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900">
                <h4 className="font-bold text-amber-500 text-lg mb-4">PROFIL A : Digital Nomad</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Âge minimum : 20 ans</li>
                  <li>• Passeport valide 6+ mois</li>
                  <li>• Preuve d'emploi à distance (contrat, clients, société)</li>
                  <li>• Relevé bancaire : 500 000 THB (~13 000 €) maintenus 90 jours consécutifs</li>
                  <li>• Portfolio ou CV professionnel</li>
                </ul>
              </div>
              <div className="border border-amber-500/30 p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900">
                <h4 className="font-bold text-amber-500 text-lg mb-4">PROFIL B : Études & Culture</h4>
                <p className="text-sm mb-3">Accessible même sans emploi, via inscription confirmée dans un programme reconnu :</p>
                <ul className="space-y-2 text-sm">
                  <li>• Muay Thai (école certifiée)</li>
                  <li>• Cuisine thaïlandaise traditionnelle</li>
                  <li>• Formation médicale / Cours de langue</li>
                </ul>
                <p className="text-xs text-red-400 mt-3 mt-4">⚠️ L'école doit être reconnue par le Ministère. Reçu de paiement et lettre d'acceptation exigés.</p>
              </div>
            </div>

            {/* 7 Erreurs */}
            <h3 className="text-xl font-bold text-white mt-8">Les 7 erreurs fatales qui font refuser le dossier</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700 flex gap-3"><span className="text-amber-500 font-bold">01.</span><div><strong className="text-white">Relevé bancaire insuffisant :</strong> Les 500 000 THB doivent être maintenus 90 jours (refus immédiat sinon).</div></div>
              <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700 flex gap-3"><span className="text-amber-500 font-bold">02.</span><div><strong className="text-white">Mauvais historique :</strong> Nombreux visa runs passés = soupçon de travail illégal.</div></div>
              <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700 flex gap-3"><span className="text-amber-500 font-bold">03.</span><div><strong className="text-white">Demande locale :</strong> Le DTV ne peut PAS être demandé depuis la Thaïlande.</div></div>
              <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700 flex gap-3"><span className="text-amber-500 font-bold">04.</span><div><strong className="text-white">École non reconnue :</strong> L'école Soft Power doit être agréée par les ambassades.</div></div>
              <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700 flex gap-3"><span className="text-amber-500 font-bold">05.</span><div><strong className="text-white">Documents non traduits :</strong> Contrats et relevés doivent être traduits en anglais.</div></div>
              <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700 flex gap-3"><span className="text-amber-500 font-bold">06.</span><div><strong className="text-white">Oubli du TDAC :</strong> Thailand Digital Arrival Card obligatoire avant le vol.</div></div>
              <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700 flex gap-3 md:col-span-2"><span className="text-amber-500 font-bold">07.</span><div><strong className="text-white">Employeur non crédible :</strong> Société fantôme ou trop récente. Préparez impôts et contrats solides.</div></div>
            </div>
          </section>

          {/* ================= CHAPITRE 3 ================= */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-gray-800 pb-3">
              <span className="bg-amber-500 text-black px-3 py-1 rounded-lg">03</span> L'Action & La Checklist
            </h2>

            {/* Banques */}
            <h3 className="text-xl font-bold text-amber-500 mt-6">Finances & Banques</h3>
            <div className="overflow-x-auto rounded-xl border border-gray-700">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="p-4">BANQUE</th>
                    <th className="p-4">AVANTAGE</th>
                    <th className="p-4">À SAVOIR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr className="bg-gray-800/30">
                    <td className="p-4 font-bold">Boursorama</td>
                    <td className="p-4">Gratuit, carte Visa internationale sans frais</td>
                    <td className="p-4">Service client parfois lent</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">BNP / Hello Bank!</td>
                    <td className="p-4">Reconnue des ambassades, crédit plus facile</td>
                    <td className="p-4">Frais plus élevés hors UE</td>
                  </tr>
                  <tr className="bg-gray-800/30">
                    <td className="p-4 font-bold">Wise / Revolut</td>
                    <td className="p-4">Transferts au meilleur taux, multidevises</td>
                    <td className="p-4">Pas une banque complète</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Checklist Timeline */}
            <h3 className="text-xl font-bold text-amber-500 mt-8">Checklist administrative - Timeline</h3>
            <div className="space-y-4 text-sm bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div>
                <strong className="text-white text-base">6 MOIS AVANT</strong>
                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
                  <li>Vérifiez passeport (idéalement 18 mois validité).</li>
                  <li>Permis international (Cerfa).</li>
                  <li>Dossier numérisé (Passeport, diplômes, contrats).</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-gray-700">
                <strong className="text-white text-base">3 MOIS AVANT</strong>
                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
                  <li>Préavis de location.</li>
                  <li>Virement des 500 000 THB sur compte épargne (90 jours obligatoires).</li>
                  <li>Souscrire assurance santé internationale.</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-gray-700">
                <strong className="text-white text-base">1-2 MOIS AVANT</strong>
                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
                  <li>Résiliez abonnements, informez impôts et CPAM.</li>
                  <li>Registre des Français établis hors de France.</li>
                  <li>Bilan médical complet + vaccins.</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-gray-700">
                <strong className="text-white text-base">SEMAINE DU DÉPART</strong>
                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
                  <li>Remplir TDAC en ligne.</li>
                  <li>Imprimer DTV + documents.</li>
                  <li>Prévenir la banque française du voyage.</li>
                </ul>
              </div>
            </div>

            {/* Assurances & Hôpitaux */}
            <h3 className="text-xl font-bold text-amber-500 mt-8">Santé & Assurances</h3>
            <div className="overflow-x-auto rounded-xl border border-gray-700 mb-4">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="p-4">OPTION</th>
                    <th className="p-4">COUVERTURE</th>
                    <th className="p-4">COÛT MENSUEL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr className="bg-gray-800/30">
                    <td className="p-4 font-bold">CFE</td>
                    <td className="p-4">Remboursements bases françaises. À compléter.</td>
                    <td className="p-4">60-120 €</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">1er Euro</td>
                    <td className="p-4">Mondiale complète, sans carence, rapatriement.</td>
                    <td className="p-4">120-250 €</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-red-400 mb-4">⚠️ Les assurances carte bancaire ne couvrent PAS un séjour de plus de 90 jours.</p>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="font-bold text-white mb-2">Hôpitaux de référence francophones :</h4>
              <ul className="text-sm space-y-1">
                <li><strong className="text-amber-500">Bangkok :</strong> Bumrungrad, Samitivej Sukhumvit, Bangkok Hospital</li>
                <li><strong className="text-amber-500">Chiang Mai :</strong> Bangkok Hospital Chiang Mai, Chiang Mai Ram</li>
                <li><strong className="text-amber-500">Phuket :</strong> Bangkok Hospital Phuket, Mission Hospital</li>
              </ul>
            </div>

            {/* Fiscalité */}
            <h3 className="text-xl font-bold text-amber-500 mt-8">Fiscalité - La zone grise</h3>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-amber-500/20">
              <ul className="space-y-4 text-sm">
                <li><strong className="text-white">RÈGLE 1 (Résidence) :</strong> Si vous séjournez 180 jours ou plus par an, vous devenez résident fiscal thaïlandais.</li>
                <li><strong className="text-white">RÈGLE 2 (Réforme 2024) :</strong> Tout revenu étranger transféré en Thaïlande devient imposable.</li>
                <li><strong className="text-white">RÈGLE 3 (Convention) :</strong> Une convention France-Thaïlande évite la double imposition réelle.</li>
              </ul>
              
              <h4 className="font-bold text-white mt-6 mb-3">Barème impôt sur le revenu thaïlandais 2025 :</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-gray-800 p-2 rounded">0 - 150 000 THB : <strong className="text-amber-500">0%</strong></div>
                <div className="bg-gray-800 p-2 rounded">150 001 - 300 000 THB : <strong className="text-amber-500">5%</strong></div>
                <div className="bg-gray-800 p-2 rounded">300 001 - 500 000 THB : <strong className="text-amber-500">10%</strong></div>
                <div className="bg-gray-800 p-2 rounded">500 001 - 750 000 THB : <strong className="text-amber-500">15%</strong></div>
                <div className="bg-gray-800 p-2 rounded">750 001 - 1 000 000 THB : <strong className="text-amber-500">20%</strong></div>
                <div className="bg-gray-800 p-2 rounded">1 000 001 - 2 000 000 THB : <strong className="text-amber-500">25%</strong></div>
                <div className="bg-gray-800 p-2 rounded">2 000 001 - 5 000 000 THB : <strong className="text-amber-500">30%</strong></div>
                <div className="bg-gray-800 p-2 rounded">Au-delà de 5 000 000 THB : <strong className="text-amber-500">35%</strong></div>
              </div>

              <h4 className="font-bold text-white mt-6 mb-2">Stratégies recommandées :</h4>
              <ul className="space-y-2 text-sm">
                <li><strong className="text-amber-500">Option A :</strong> Séjourner moins de 180 jours (voyager dans la région) = non résident fiscal.</li>
                <li><strong className="text-amber-500">Option B :</strong> N'encaissez pas vos revenus sur un compte thaïlandais.</li>
              </ul>
            </div>
          </section>

          {/* ================= CONCLUSION ================= */}
          <section className="bg-amber-500/10 border border-amber-500 p-8 rounded-2xl text-center mt-10">
            <h2 className="text-2xl font-bold text-white mb-4">L'ambassade ne fait pas de cadeaux.</h2>
            <p className="text-gray-300 mb-6">Un document mal traduit, une école non certifiée, un relevé sur 60 jours au lieu de 90... et votre projet s'effondre. Ne prenez pas ce risque seul.</p>
            <p className="text-amber-500 font-bold mb-6">Notre agence s'occupe du dossier complet. Vous vous occupez de vos valises.</p>
            <button onClick={onClose} className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold py-4 px-8 rounded-xl transition-all shadow-lg shadow-amber-500/30 transform hover:scale-105">
              RÉSERVER MON AUDIT DTV GRATUIT
            </button>
            <p className="text-xs text-gray-500 mt-4">Ce guide est fourni à titre informatif (2025-2026). Consultez toujours un professionnel pour votre situation fiscale personnelle.</p>
          </section>

        </div>
      </div>
    </div>
  );
}