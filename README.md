# Mes Abonnements

Une web-app complète pour gérer vos abonnements mensuels et annuels, avec analytics intégrés, exports multiples et stockage local dans le navigateur.

## 📌 Version Lock

Ce projet utilise des versions exactes (sans ^ ou ~) pour garantir la reproductibilité :

**Dependencies:**

- next: 16.0.0
- react: 19.2.0
- react-dom: 19.2.0
- zustand: 5.0.8
- date-fns: 4.1.0
- clsx: 2.1.1
- uuid: 13.0.0
- recharts: 3.3.0
- xlsx: 0.18.5
- file-saver: 2.0.5
- convex: 1.28.0
- @clerk/nextjs: 6.34.0

**DevDependencies:**

- typescript: 5.9.3
- @types/node: 22.10.2
- @types/react: 19.1.0
- @types/react-dom: 19.1.0
- tailwindcss: 4.1.16
- @tailwindcss/postcss: 4.1.16
- postcss: 8.5.6
- autoprefixer: 10.4.20
- eslint: 9.18.0
- eslint-config-next: 16.0.0
- prettier: 3.4.2

## 🚀 Stack

**Profil A — Next.js 16 + Tailwind v4** (implémenté par défaut)

- Framework: Next.js 16 avec App Router et TypeScript strict
- Styling: Tailwind CSS v4 (`@tailwindcss/postcss`)
- State: Zustand 5 avec persistence localStorage
- Charts: Recharts pour analytics
- Exports: xlsx + file-saver pour CSV/XLSX/JSON
- Utils: date-fns, clsx, uuid
- Cloud-ready: Convex + Clerk installés (Phase 3)

## 📋 Prérequis

- Node.js >= 18.x (recommandé: 20.x)
- npm ou yarn
- Git

## 📦 Installation

```bash
npm install
```

## 🏃 Démarrage

```bash
npm run dev
```

L'app sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🔨 Build & Déploiement

### Build

```bash
npm run build
```

### Démarrage en production

```bash
npm start
```

### Déploiement Vercel

```bash
npx vercel
```

Ou connectez votre repo GitHub à Vercel pour un déploiement automatique.

**Note:** Aucune variable d'environnement nécessaire.

## ✨ Fonctionnalités

### Phase 1: Core

- ✅ Ajouter, modifier, supprimer des abonnements
- ✅ Cycle mensuel ou annuel
- ✅ Calcul automatique des équivalents mensuels/annuels
- ✅ Total mensuel et annuel (hors abonnements en pause)
- ✅ Barre de progression vers prochaine échéance
- ✅ Indicateur J-X (jours restants)
- ✅ Catégorie, notes, couleur personnalisable
- ✅ Mise en pause d'abonnements
- ✅ Données de démonstration
- ✅ Paramètres de devise et locale modifiables
- ✅ Stockage local persistant (Zustand + localStorage)

### Phase 2: Exports & Analytics

- ✅ Export CSV (compatible Excel/Sheets)
- ✅ Export XLSX (format Excel natif)
- ✅ Export/Import JSON
- ✅ Analytics avec visualisations:
  - Pie Chart des dépenses par catégorie
  - Bar Chart comparaison mensuel vs annuel
- ✅ Landing page marketing
- ✅ Navigation entre pages

### Phase 3: Cloud & Auth (Préparé, non implémenté)

- ⏳ Authentification Clerk
- ⏳ Base de données Convex
- ⏳ Synchronisation cloud/offline

## 🗂 Structure du projet

```
/
├── app/
│   ├── (marketing)/
│   │   └── page.tsx           # Landing page
│   ├── app/
│   │   └── page.tsx           # Application principale
│   ├── analytics/
│   │   └── page.tsx           # Page analytics
│   ├── layout.tsx             # Layout racine
│   └── globals.css            # Styles Tailwind v4
├── components/
│   ├── SubscriptionForm.tsx   # Formulaire add/edit
│   ├── SubscriptionCard.tsx   # Carte affichage
│   └── ExportMenu.tsx         # Menu exports
├── lib/
│   ├── store.ts               # Store Zustand + persist
│   ├── types.ts               # Types TypeScript
│   ├── formatting.ts          # Utilitaires formatage
│   ├── export.ts              # Export CSV/XLSX/JSON
│   ├── analytics.ts           # Calculs analytics
│   └── demo.ts                # Données démo
├── convex/                    # (Phase 3 - non configuré)
│   ├── schema.ts
│   └── subscriptions.ts
├── scripts/
│   └── smoke.cjs              # Script de vérification
├── public/
├── next.config.mjs
├── postcss.config.mjs
├── tsconfig.json
├── package.json
├── README.md
├── CHANGELOG.md
└── .env.example
```

## 📜 Scripts npm

| Script               | Description                         |
| -------------------- | ----------------------------------- |
| `npm run dev`        | Démarre le serveur de développement |
| `npm run build`      | Build de production                 |
| `npm run start`      | Démarre le serveur de production    |
| `npm run lint`       | Vérifie le code avec ESLint         |
| `npm run typecheck`  | Vérifie les types TypeScript        |
| `npm run prepare`    | Hook pre-install (essaye Convex)    |
| `npm run test:smoke` | Tests smoke (modules + fichiers)    |

## 🔄 Migration vers Tailwind v3 (Profil B)

Si vous préférez utiliser Tailwind v3, voici les changements à appliquer :

### 1. Installer les bonnes versions

```bash
npm uninstall tailwindcss @tailwindcss/postcss
npm install -D tailwindcss@3 postcss@8 autoprefixer@10
```

### 2. Créer `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [],
};
export default config;
```

### 3. Modifier `postcss.config.mjs`

```javascript
export default {
	plugins: {
		tailwindcss: {},
		autoprefixer: {},
	},
};
```

### 4. Modifier `app/globals.css`

Remplacer :

```css
@import "tailwindcss";
```

Par :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ... reste du code ... */
```

## 🧪 Tests manuels

Vérifiez ces cas d'usage :

- [ ] Ajouter un abonnement met à jour les totaux
- [ ] Modifier un abonnement persiste correctement
- [ ] Supprimer retire l'item et met à jour les totaux
- [ ] Mettre en pause exclut des totaux et grise la carte
- [ ] Export télécharge un JSON valide
- [ ] Import restaure l'état après refresh
- [ ] Demo injecte 3 exemples cohérents
- [ ] Changer devise/locale affecte le formatage
- [ ] Date en passé: J-négatif ne casse pas l'UI
- [ ] Validation formulaire bloque submit si données invalides

## ☁️ Configuration Cloud (Phase 3)

### Convex (Base de données)

1. Initialiser Convex :
   ```bash
   npx convex dev
   ```
2. Convex va créer un dossier `convex/` avec le schéma
3. Créer les fonctions dans `convex/subscriptions.ts`
4. Récupérer le `CONVEX_DEPLOYMENT` et l'ajouter à `.env.local`

### Clerk (Authentification)

1. Créer une application sur [clerk.com](https://clerk.com)
2. Configurer Next.js middleware (voir [docs Clerk](https://clerk.com/docs/quickstarts/nextjs))
3. Ajouter les variables d'environnement à `.env.local`
4. Ajouter le middleware dans `app/middleware.ts`

### Vercel (Déploiement)

1. Ajouter toutes les variables de `.env.example` dans Project Settings > Environment Variables
2. Build Command: `npm run build` (par défaut)
3. Node.js version: 18.x ou supérieur

## 🔧 Dépannage

### Erreur PostCSS Tailwind v4

Si vous voyez une erreur liée à `@tailwindcss/postcss`, vérifiez que :

- La dépendance `@tailwindcss/postcss` est installée
- `postcss.config.mjs` utilise `@tailwindcss/postcss` et non `tailwindcss`

### Smoke tests échouent

```bash
npm run test:smoke
```

Vérifie que tous les modules sont installés et les fichiers présents.

### Build TypeScript échoue

```bash
npm run typecheck
```

Vérifie les erreurs TypeScript et corrigez avec `strict: true` activé.

## 🎯 Évolutions suggérées

- 🔔 Notifications de rappel (email/push)
- 📅 Vues calendrier mensuelles
- 🔍 Filtres avancés (catégorie, cycle, paused, période)
- 🏷️ Auto-complétion catégories
- 📱 PWA (offline support)
- 🌙 Mode sombre
- 📈 Rapports par période personnalisés
- 🔗 Partages entre utilisateurs

## 📝 Licence

MIT

## 🤝 Contribution

Les contributions sont les bienvenues ! Ouvrez une issue ou une PR.
