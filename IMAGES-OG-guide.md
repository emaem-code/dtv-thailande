# Images Open Graph — mode d'emploi

Objectif : donner à chacun des 13 articles sa propre vignette de partage, et réparer les 6 références d'images cassées.

---

## 1. Specs techniques

| Paramètre | Valeur |
|---|---|
| Dimensions | **1200 × 630 px** (ratio 1.91:1) |
| Format | JPG (ou WebP) |
| Poids | **< 300 Ko** — viser 150–200 Ko |
| Texte dans l'image | **Aucun.** L'IA écrit mal, et le titre s'affiche déjà à côté de la vignette |
| Emplacement | `public/images/blog/` |
| Nom du fichier | le slug de l'article + `.jpg` |

Le dossier `public/images/blog/` n'existe pas encore — il faut le créer.

---

## 2. Style commun à toutes les images

À coller **en préfixe de chaque prompt**, pour que les 13 vignettes forment une série cohérente :

> Cinematic editorial photograph, 1200x630 landscape, shallow depth of field, warm golden and amber tones with deep dark background, natural window light, muted teal accents, realistic documentary style, no text, no watermark, no people's faces visible —

Ce style reprend les couleurs de ton site (fond `#0a0a0a`, accents ambre et sky) pour que la vignette et la page se répondent.

---

## 3. Les 13 prompts

### Formalités

**`tm47-rapport-90-jours-thailande.jpg`**
> …a Thai immigration office desk, a printed TM47 form, a passport, a paper queue ticket, an old wall clock in the blurred background, bureaucratic atmosphere

**`20000-thb-immigration-thailande-regle-especes.jpg`**
> …a fan of Thai baht banknotes resting on an open passport, on a metal immigration counter, dramatic side lighting, tense atmosphere

**`arrivee-thailande-aeroport-immigration-taxi-visa-dtv.jpg`**
> …the arrivals hall of a tropical Asian airport at dawn, rolling suitcase, glass facade, palm trees visible outside, soft haze

**`tdac-thailande-carte-arrivee.jpg`**
> …a smartphone held up displaying a QR code, airport boarding gate blurred behind, cool screen glow against warm terminal light

**`guide-depot-dossier-evisa-dtv.jpg`**
> …an open laptop showing an online form, a passport and a stack of printed documents on a wooden desk, cup of coffee, focused evening light

### Finances

**`fonds-bancaires-visa-dtv.jpg`**
> …a printed bank statement, a pen, reading glasses and Thai baht banknotes on a dark desk, overhead shot, serious tone

**`paiement-thailande-sans-compte-bancaire-visa-dtv.jpg`**
> …a hand holding a phone scanning a QR code at a Thai street food stall at night, neon reflections, steam, vibrant street atmosphere

### Stratégie et vie pratique

**`comparatif-visas-thailande.jpg`**
> …several passports from different countries laid out in a row on a dark surface, visa stamps visible, top-down comparison composition

**`ou-vivre-thailande-2026-phuket-pattaya-bangkok-huahin.jpg`**
> …aerial drone view of a Thai coastal town at golden hour, condo towers meeting the sea, long shadows, hills in the distance

### Profils

**`visa-dtv-freelance-auto-entrepreneur.jpg`**
> …a laptop open on a balcony table overlooking tropical palms and a pool, notebook and iced coffee, late afternoon light, remote work atmosphere

**`visa-dtv-soft-power-ecoles.jpg`**
> …an authentic Muay Thai gym in Thailand, worn leather punching bags, boxing ring ropes, dusty light beams through open shutters, no people

**`visa-dtv-couple-famille-pacs.jpg`**
> …a couple and a child walking away from camera on a quiet Thai beach at sunset, seen from behind, silhouettes, warm horizon

### Actualité

**`fin-exemption-visa-60-jours.jpg`**
> …a land border checkpoint between Thailand and Laos, lowered barrier, road markings, official signage blurred, overcast tense mood

---

## 4. Les modifications de code

### 4.1 Créer le dossier

```bash
mkdir -p public/images/blog
```

Y déposer les 13 fichiers nommés d'après leur slug.

### 4.2 Mettre à jour `posts.ts`

Chaque entrée a aujourd'hui `image: '/logo.png'`. Remplacer par le chemin réel :

```ts
image: '/images/blog/visa-dtv-soft-power-ecoles.jpg',
```

C'est ce champ qui alimente les balises Open Graph et Twitter.

### 4.3 Réparer les 6 schémas JSON-LD cassés

Six articles écrivent leur image en dur dans leur `articleSchema`, et pointent vers des fichiers inexistants :

| Article | Valeur actuelle (404) |
|---|---|
| `20000-thb-…` | `/images/blog/20000-thb-immigration.jpg` |
| `paiement-thailande-…` | `/images/blog/paiement-wise-dtv.jpg` |
| `visa-dtv-freelance-…` | `/poster-freelance-dtv.jpg` |
| `arrivee-thailande-…` | `/poster-immigration-thailande.jpg` |
| `visa-dtv-soft-power-…` | `/poster-softpower.jpg` |
| `tdac-thailande-…` | `/poster-tdac.jpg` |

**La bonne correction** n'est pas de retaper les chemins à la main, mais de faire lire `post.image` au schéma — comme le fait déjà `createArticleSchema(post)`. Une seule source de vérité : `posts.ts`.

Concrètement, dans chacun de ces 6 fichiers, remplacer le bloc `articleSchema` écrit en dur par :

```tsx
const post = getBlogPost('le-slug-de-larticle');
const articleSchema = createArticleSchema(post);
```

L'article `arrivee-thailande-…` utilise déjà ce pattern — prends-le comme modèle.

### 4.4 Alléger `logo.png`

Il pèse **1,2 Mo**. Pour un logo affiché en petit, c'est 10 à 20 fois trop lourd, et il est chargé sur chaque page. Le passer en WebP ou le recompresser fera gagner du temps de chargement sur tout le site.

---

## 5. Ordre conseillé

1. Créer `public/images/blog/` et générer les 4 images des articles les plus visibles : Soft Power, 20 000 THB, Où vivre, Freelance
2. Mettre à jour leur `image:` dans `posts.ts`
3. Réparer les 6 schémas JSON-LD (indépendant des images, à faire même sans elles)
4. Générer les 9 restantes au fil de l'eau
5. Recompresser `logo.png`

---

## 6. Vérifier le résultat

Une fois en ligne, colle l'URL d'un article dans :

- **Facebook** — [developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug/) (bouton « Scrape Again » pour vider leur cache)
- **LinkedIn** — [linkedin.com/post-inspector](https://www.linkedin.com/post-inspector/)
- **Google** — Test des résultats enrichis, pour confirmer que l'image du `BlogPosting` se charge

Attention : Facebook garde les aperçus en cache très longtemps. Si tu as déjà partagé un lien avec l'ancienne vignette, il faut forcer le rafraîchissement depuis le debugger.
