# Cadence — ton habit tracker personnel

Cadence est une application web installable : une fois ajoutée à l’écran d’accueil de ton iPad ou de ton iPhone, elle s’ouvre en plein écran comme une vraie app, fonctionne hors connexion et enregistre tes données sur ton appareil.

**Version 1.1.0** — voir « Ce qui est nouveau » en bas de ce guide.

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

## 1. Décompresser le zip

- **Sur iPad ou iPhone :** ouvre l’app **Fichiers**, va dans **Téléchargements**, touche `cadence.zip`. Un dossier **cadence** apparaît à côté.
- **Sur Mac :** double-clique sur `cadence.zip` dans le Finder.

## 2. Créer le dépôt GitHub (une seule fois, gratuit)

L’iPad installe une web app depuis une adresse `https://`. GitHub Pages en fournit une gratuitement.

1. Va sur **github.com** et crée un compte gratuit, ou connecte-toi.
2. En haut à droite, touche **+**, puis **New repository**.
3. Dans **Repository name**, tape `cadence`.
4. Choisis **Public**. C’est obligatoire : GitHub Pages est payant sur un dépôt privé. Seul le *code* de l’app est public, jamais tes données.
5. Touche **Create repository**.

## 3. Envoyer les fichiers

1. Sur la page du dépôt, touche **uploading an existing file** (ou **Add file**, puis **Upload files**).
2. Touche **choose your files**.
3. L’app Fichiers s’ouvre : va dans le dossier **cadence** et sélectionne **tous** les fichiers. Sur iPad, touche **Sélectionner** en haut à droite pour en choisir plusieurs d’un coup.
4. Touche **Ouvrir**, puis attends que la liste des fichiers s’affiche sur la page.
5. Tout en bas de la page, touche le bouton vert **Commit changes**.

## 4. Activer le site

1. Dans ton dépôt, touche **Settings**, puis **Pages** dans le menu de gauche.
2. Sous *Build and deployment*, choisis **Deploy from a branch**.
3. **Branch** : `main`. Dossier : `/(root)`. Touche **Save**.
4. Attends une à deux minutes, puis recharge la page. Ton adresse s’affiche en haut, du type `https://ton-pseudo.github.io/cadence/`.

## 5. Installer l’app

**Sur iPad ou iPhone**

1. Ouvre cette adresse dans **Safari**.
2. Touche l’icône **Partager** : un carré avec une flèche vers le haut, en haut à droite sur iPad, en bas au centre sur iPhone. Sur iPhone, si tu ne la vois pas, touche d’abord **•••** à droite de la barre d’adresse.
3. Fais défiler la liste et touche **Sur l’écran d’accueil**.
4. Laisse **Ouvrir en tant qu’app web** activé, puis touche **Ajouter**.
5. Ouvre Cadence depuis son icône sur l’écran d’accueil.

**Important :** l’app installée garde ses données à part de Safari. Installe-la avant de commencer à saisir quoi que ce soit, puis passe toujours par l’icône.

**Sur Mac** (macOS Sonoma ou plus récent) : Safari → menu **Fichier** → **Ajouter au Dock…**

---

## Tes données

- Enregistrées automatiquement sur l’appareil à chaque modification (base IndexedDB), avec une sauvegarde interne chaque jour et avant chaque mise à jour.
- Rien n’est envoyé sur Internet. Le dépôt GitHub ne contient que le code de l’app.
- **Réglages → Données** : exporter une sauvegarde, importer, restaurer une sauvegarde automatique, exporter en tableur (CSV) ou imprimer un rapport.
- Détail complet dans l’app : **Réglages → Aide et informations → Confidentialité**.

⚠️ Supprimer l’icône de Cadence de l’écran d’accueil **efface aussi ses données**, sans confirmation. Exporte avant.

## Passer d’un appareil à l’autre

Il n’y a pas de synchronisation : chaque appareil garde ses propres données.

1. Sur l’appareil de départ : **Réglages → Transférer vers un autre appareil → Préparer le fichier**.
2. Dans la feuille de partage, choisis **AirDrop**, puis l’autre appareil.
3. Sur l’autre appareil : **Réglages → Importer une sauvegarde**, et choisis le fichier reçu.

Si AirDrop n’apparaît pas, enregistre le fichier dans iCloud Drive et récupère-le depuis l’app Fichiers.

## Créer une mise à jour

1. Dans l’app : **Réglages → Préparer une mise à jour**. Note tes idées, une par ligne.
2. Touche **Copier la demande** et colle-la dans une conversation avec Claude, en joignant `index.html`, `sw.js` et `manifest.webmanifest`.
3. Claude te renvoie les fichiers modifiés (version 1.2.0, puis 1.3.0…).
4. Sur GitHub, dans ton dépôt : **Add file → Upload files**, glisse les nouveaux fichiers (ils remplacent les anciens), puis **Commit changes**.
5. Quelques minutes plus tard (jusqu’à 10), ouvre Cadence : la bannière **Nouvelle version prête** apparaît. Touche **Installer**. Tu peux aussi aller dans **Réglages → Mises à jour → Vérifier maintenant**.

Tes habitudes et tes validations ne sont pas touchées : elles vivent dans la base de l’appareil, pas dans les fichiers de l’app. Une sauvegarde est créée juste avant l’installation.

**Règles pour toute nouvelle version** (pour toi ou pour Claude) :
- Même numéro dans `APP.version` (en haut du script de `index.html`), dans la balise `<meta name="app-version">` et dans `SW_VERSION` (`sw.js`), plus une entrée en tête de `CHANGELOG`.
- Ne jamais renommer la base `cadence`. Si le format des données change : incrémenter `APP.schema` et ajouter une fonction dans `MIGRATIONS`.

## Dépannage

- **La nouvelle version n’apparaît pas** : GitHub peut mettre jusqu’à 10 minutes à la publier. Patiente, ferme complètement l’app (balaye-la vers le haut dans le sélecteur d’apps) et rouvre-la, ou utilise *Vérifier maintenant*.
- **Erreur 404 sur l’adresse** : vérifie que `index.html` est bien à la racine du dépôt et que Pages est réglé sur `main` / `(root)`.
- **GitHub demande de payer** : ton dépôt est privé. Settings → tout en bas, *Danger Zone* → **Change repository visibility** → **Change to public**.
- **Données perdues** : Réglages → Données → Sauvegardes automatiques → Restaurer, ou importe ton dernier fichier exporté.

## Ce qui est nouveau en 1.1.0

- **Mini-version** : définis une version minimale de chaque habitude (« 5 minutes »). Les jours difficiles, un bouton la valide : la journée est marquée à part, ta série continue, et elle compte pour une demi-validation dans les pourcentages.
- **Alerte décrochage** : quand une habitude passe sous 62 % et a nettement baissé sur deux semaines, Cadence le signale avant que la série casse et propose de réduire les jours, d’ajouter une mini-version ou d’archiver.
- **Journal** : une ligne par jour, relisible depuis la matrice, la rétrospective et le bilan de l’année.
- **Rétrospective hebdomadaire** : ce qui a tenu, ce qui a lâché, et un seul changement à décider.
- **Bilan de l’année** : totaux, mois par mois, records, habitudes commencées et abandonnées, journal.
- **Annuler la dernière action**, depuis la notification ou depuis Réglages.
- **Thème clair**, suivi de l’apparence du système, et réglage de la taille du texte.
- **Recherche**, **raccourcis clavier**, pages **Aide**, **Confidentialité** et **Notes de version** dans l’app.
- **Export en tableur (CSV)** et **rapport imprimable**, en plus de la sauvegarde complète.

## Pourquoi pas l’App Store ?

Une app native exige un Mac avec Xcode, et un compte Apple Developer payant pour qu’elle reste installée plus de 7 jours. Pour un usage personnel, une web app installée offre la même expérience gratuitement, et tu peux la mettre à jour toi-même en quelques minutes.
