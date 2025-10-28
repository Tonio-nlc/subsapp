# Changelog

Tous les changements notables de ce projet seront documentés dans ce fichier.

## [1.0.0] - 2024-01-XX

### Ajouté - Phase 1: Core

- **Gestion des abonnements** : Ajouter, modifier, supprimer des abonnements mensuels et annuels
- **Stockage local** : Zustand avec persistence dans localStorage (clé `subs-v1`)
- **Types strictement typés** : TypeScript avec interfaces pour Subscription et Settings
- **Formattage monétaire** : Support multi-devises avec Intl.NumberFormat
- **Pause/resume** : Possibilité de mettre en pause des abonnements (exclus des totaux)
- **Totaux calculés** : Affichage des totaux mensuels et annuels
- **Barre de progression** : Visualisation des jours restants jusqu'à la prochaine facturation
- **Catégories et notes** : Organisation par catégorie et ajout de notes
- **Couleurs personnalisées** : Personnalisation de chaque abonnement

### Ajouté - Phase 2: Exports & Analytics

- **Export CSV** : Export des données en format CSV compatible avec Excel/Sheets
- **Export XLSX** : Export natif Excel via xlsx
- **Export/Import JSON** : Sauvegarde et restauration complète
- **Analytics** : Page de visualisation avec Recharts
  - Pie Chart des dépenses par catégorie
  - Bar Chart de comparaison mensuel vs annuel
- **Landing page** : Page marketing en /
- **Route /app** : Application principale dédiée
- **Route /analytics** : Visualisations des données

### Infrastructure

- **Next.js 16** : Framework React avec App Router
- **Tailwind CSS v4** : Styling avec @tailwindcss/postcss
- **TypeScript strict** : noUncheckedIndexedAccess activé
- **ESLint + Prettier** : Qualité de code
- **Smoke tests** : Script de vérification des modules et fichiers
- **Zustand 5** : State management avec persist
- **date-fns** : Formatage des dates
- **Recharts** : Visualisations graphiques

### Préparation - Phase 3: Cloud (Non implémenté)

- Convex configuré (prepare script)
- Clerk @clerk/nextjs installé
- Structure .env.example préparée

### Documentation

- README complet avec version lock
- CHANGELOG
- Instructions de migration Tailwind v3
- Guide de déploiement Vercel

## Notes

### Roadmap

- [ ] Authentification Clerk (Phase 3)
- [ ] Base de données Convex (Phase 3)
- [ ] Synchronisation cloud/offline
- [ ] Notifications de rappel
- [ ] Filtres avancés
- [ ] Mode sombre
- [ ] PWA (offline support)
- [ ] Rapports par période

### Breaking Changes

Aucun pour l'instant (version initiale).

### Migration

Pour migrer de Tailwind v4 à v3, voir README.md section "Migration vers Tailwind v3".
