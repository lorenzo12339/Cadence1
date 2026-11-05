# Cadence — ton habit tracker personnel

Cadence est une application web installable : une fois ajoutée à l’écran d’accueil de ton iPhone, elle s’ouvre en plein écran comme une vraie app, fonctionne hors connexion et enregistre tes données sur ton appareil.

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | L’application complète (interface, calculs, stockage) |
| `sw.js` | Fonctionnement hors ligne et détection des mises à jour |
| `manifest.webmanifest` | Nom, couleurs et icônes de l’app |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` | Icônes |
| `README.md` | Ce guide |

Tous les fichiers sont à la racine : pas de sous-dossier à gérer.

---

## 1. Mettre Cadence en ligne (une seule fois)

L’iPhone installe une web app depuis une adresse `https://`. GitHub Pages en fournit une gratuitement.

1. Crée un compte gratuit sur **github.com** (ou connecte-toi).
2. En haut à droite, touche **+** puis **New repository**. Nom : `cadence`. Choisis **Public** (obligatoire pour GitHub Pages en version gratuite ; seul le code de l’app est public, jamais tes données). Clique **Create repository**.
3. Sur la page du dépôt, clique **uploading an existing file** (ou **Add file** → **Upload files**).
4. Décompresse le zip, puis glisse **tous les fichiers du dossier `cadence`** dans la page. Clique **Commit changes**.
5. Ouvre **Settings** → **Pages** (menu de gauche). Sous *Build and deployment* : *Source* = **Deploy from a branch**, *Branch* = **main** et **/(root)**. Clique **Save**.
6. Patiente une à deux minutes puis recharge la page *Pages* : ton adresse s’affiche, du type `https://ton-pseudo.github.io/cadence/`.

> Depuis un iPhone seulement : décompresse le zip dans l’app **Fichiers** (touche le zip), puis à l’étape 4 utilise **Add file → Upload files → Choose your files** et sélectionne les 8 fichiers.

## 2. Installer l’app sur ton iPhone

1. Ouvre **Safari** et va sur ton adresse `https://…github.io/cadence/`.
2. Touche **•••** à droite de la barre d’adresse, puis **Partager** (sur iOS 18 ou avant : l’icône Partager directement).
3. Fais défiler et touche **Sur l’écran d’accueil**.
4. Laisse **Ouvrir en tant qu’app web** activé, puis touche **Ajouter**.
5. Lance Cadence depuis son icône et choisis ton point de départ (habitudes suggérées, page blanche ou démo).

**Important :** sur iPhone et iPad, l’app installée garde ses données à part de Safari. Installe-la avant de commencer, puis utilise toujours l’icône.

- **iPad** : même chose, l’icône Partager est en haut à droite.
- **Mac** (macOS Sonoma ou plus récent) : Safari → menu **Fichier** → **Ajouter au Dock…**

## 3. Tes données

- Enregistrées automatiquement sur l’appareil à chaque modification (base de données IndexedDB), avec une sauvegarde interne chaque jour et avant chaque mise à jour.
- Rien n’est envoyé sur Internet. Le dépôt GitHub ne contient que le code.
- **Réglages → Données** : exporter un fichier de sauvegarde (à ranger dans Fichiers ou iCloud Drive), importer, restaurer une sauvegarde automatique.
- Nouvel iPhone : exporte sur l’ancien, installe Cadence sur le nouveau, puis importe le fichier.

## 4. Créer une mise à jour

1. Dans l’app : **Réglages → Préparer une mise à jour**. Note tes idées (une par ligne).
2. Touche **Copier la demande** et colle-la dans une conversation avec Claude, en joignant `index.html`, `sw.js` et `manifest.webmanifest`.
3. Claude te renvoie les fichiers modifiés (version 1.1.0, puis 1.2.0…).
4. Sur GitHub, dans ton dépôt : **Add file → Upload files**, glisse les nouveaux fichiers (ils remplacent les anciens) puis **Commit changes**.
5. Quelques minutes plus tard (jusqu’à 10), ouvre Cadence : la bannière **Nouvelle version prête** apparaît. Touche **Installer**. Tu peux aussi aller dans **Réglages → Mises à jour → Vérifier maintenant**.

Tes habitudes et tes validations ne sont pas touchées : elles vivent dans la base de l’appareil, pas dans les fichiers de l’app. Une sauvegarde est créée juste avant l’installation.

**Règles pour toute nouvelle version** (pour toi ou pour Claude) :
- Même numéro dans `APP.version` (en haut du script de `index.html`), dans la balise `<meta name="app-version">` et dans `SW_VERSION` (`sw.js`), plus une entrée en tête de `CHANGELOG`.
- Ne jamais renommer la base `cadence`. Si le format des données change : incrémenter `APP.schema` et ajouter une fonction dans `MIGRATIONS`.

## 5. Dépannage

- **La nouvelle version n’apparaît pas** : GitHub peut mettre jusqu’à 10 minutes à la publier. Patiente, ferme complètement l’app (balaye-la vers le haut dans le sélecteur d’apps) et rouvre-la, ou utilise *Vérifier maintenant*.
- **Erreur 404 sur l’adresse** : vérifie que `index.html` est bien à la racine du dépôt et que Pages est réglé sur `main` / `(root)`.
- **Données perdues** : Réglages → Données → Sauvegardes automatiques → Restaurer, ou importe ton dernier fichier exporté.

## Pourquoi pas l’App Store ?

Une app native exige un Mac avec Xcode, et un compte Apple Developer payant pour qu’elle reste installée plus de 7 jours. Pour un usage personnel, une web app installée offre la même expérience gratuitement, et tu peux la mettre à jour toi-même en quelques minutes.
