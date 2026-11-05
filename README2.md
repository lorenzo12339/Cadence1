# Cadence — ton habit tracker personnel

Cadence est une application web installable : une fois ajoutée à l’écran d’accueil de ton iPad ou de ton iPhone, elle s’ouvre en plein écran comme une vraie app, fonctionne hors connexion et enregistre tes données sur ton appareil.

**Version 1.2.0** — voir « Ce qui est nouveau » en bas de ce guide.

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | L’application complète (interface, calculs, stockage) |
| `sw.js` | Fonctionnement hors ligne et détection des mises à jour |
| `manifest.webmanifest` | Nom, couleurs et icônes de l’app |
| `precedente.html` | La version précédente (1.1.0), à ouvrir en secours si une mise à jour pose problème |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` | Icônes |
| `README.md` | Ce guide |

Neuf fichiers, tous à la racine : pas de sous-dossier à gérer.

---

## Passer de la 1.1.0 à la 1.2.0

Tu as déjà Cadence installée : c’est le seul chapitre à suivre.

1. **Par précaution**, dans Cadence 1.1.0 : **Réglages → Données → Exporter**, et range le fichier dans l’app Fichiers.
2. Décompresse `cadence-1.2.0.zip` (app **Fichiers** → **Téléchargements** → touche le zip).
3. Sur GitHub, ouvre ton dépôt **cadence** → **Add file** → **Upload files** → **choose your files**.
4. Dans le dossier décompressé, touche **Sélectionner** et choisis **les 9 fichiers**. Touche **Ouvrir**, attends que la liste s’affiche, puis **Commit changes**. Les anciens fichiers sont remplacés, `precedente.html` s’ajoute.
5. Attends quelques minutes (jusqu’à 10), puis ouvre Cadence **depuis son icône**. La bannière **Nouvelle version prête** apparaît : touche **Installer**. Sinon : **Réglages → Mises à jour → Vérifier maintenant**.

Au premier lancement, Cadence convertit tes données au format de la 1.2.0, avec trois sécurités :

- la conversion est d’abord faite sur une **copie**, puis comparée à l’original : habitudes, validations, mini-versions, tâches, journal, rétrospectives, catégories et calendrier de chaque habitude ;
- une **sauvegarde interne** est créée puis relue avant d’adopter la conversion ;
- une fenêtre **Données converties et vérifiées** affiche le résultat.

Tes statistiques passées ne changent pas. Une seule règle évolue : une habitude pas encore cochée **aujourd’hui** n’est plus comptée comme manquée tant que la journée n’est pas finie.

**Si quelque chose ne va pas**

- Si la vérification échoue, Cadence n’applique rien et affiche un écran de secours : **Exporter mes données**, **Ouvrir la version précédente** ou **Réessayer**. Tes données d’origine restent intactes.
- La version précédente s’ouvre aussi depuis **Réglages → Mises à jour → Version précédente de secours**, ou à l’adresse `https://ton-pseudo.github.io/cadence/precedente.html`. Elle lit les mêmes données, mais ne connaît pas les nouveautés (pauses, fréquences souples, tâches récurrentes) : ses chiffres peuvent différer. C’est une roue de secours, pas une version à garder.

---

## Première installation (nouvel appareil)

### 1. Décompresser le zip

- **Sur iPad ou iPhone :** ouvre l’app **Fichiers**, va dans **Téléchargements**, touche le zip. Un dossier apparaît à côté.
- **Sur Mac :** double-clique sur le zip dans le Finder.

### 2. Créer le dépôt GitHub (une seule fois, gratuit)

L’iPad installe une web app depuis une adresse `https://`. GitHub Pages en fournit une gratuitement.

1. Va sur **github.com** et crée un compte gratuit, ou connecte-toi.
2. En haut à droite, touche **+**, puis **New repository**.
3. Dans **Repository name**, tape `cadence`.
4. Choisis **Public**. C’est obligatoire : GitHub Pages est payant sur un dépôt privé. Seul le *code* de l’app est public, jamais tes données.
5. Touche **Create repository**.

### 3. Envoyer les fichiers

1. Sur la page du dépôt, touche **uploading an existing file** (ou **Add file**, puis **Upload files**).
2. Touche **choose your files**.
3. L’app Fichiers s’ouvre : va dans le dossier décompressé et sélectionne **les 9 fichiers**. Sur iPad, touche **Sélectionner** en haut à droite pour en choisir plusieurs d’un coup.
4. Touche **Ouvrir**, puis attends que la liste des fichiers s’affiche sur la page.
5. Tout en bas de la page, touche le bouton vert **Commit changes**.

### 4. Activer le site

1. Dans ton dépôt, touche **Settings**, puis **Pages** dans le menu de gauche.
2. Sous *Build and deployment*, choisis **Deploy from a branch**.
3. **Branch** : `main`. Dossier : `/(root)`. Touche **Save**.
4. Attends une à deux minutes, puis recharge la page. Ton adresse s’affiche en haut, du type `https://ton-pseudo.github.io/cadence/`.

### 5. Installer l’app

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

- Enregistrées automatiquement sur l’appareil à chaque modification (base IndexedDB), avec une sauvegarde interne chaque jour et avant chaque mise à jour, import, restauration ou réparation.
- Rien n’est envoyé sur Internet. Le dépôt GitHub ne contient que le code de l’app.
- **Centre de données** (menu **Données** sur iPad, ou **Réglages → Centre de données**) :
  - **Vérifier mes données** : contrôle de la base et des sauvegardes, sans rien modifier ; réparation proposée, avec une sauvegarde avant ;
  - **Sauvegardes internes** : regarder le contenu d’une sauvegarde avant de la restaurer ;
  - **Exporter** une sauvegarde complète, **chiffrée** ou non, des fichiers tableur séparés (validations, habitudes, tâches, journal et notes, réglages) et des **rapports** du mois, de l’année ou d’une période.
- Détail complet dans l’app : **Réglages → Aide et informations → Confidentialité**.

⚠️ Supprimer l’icône de Cadence de l’écran d’accueil **efface aussi ses données**, sans confirmation. Exporte avant.

### Sauvegardes chiffrées

- Le fichier est verrouillé par un mot de passe (8 caractères minimum) que Cadence **n’enregistre nulle part**. Seul l’indice que tu choisis reste lisible.
- **Mot de passe oublié = fichier perdu.** Personne ne peut le rouvrir, pas même Claude. Note-le dans un endroit sûr, par exemple ton gestionnaire de mots de passe.
- Après l’export, Cadence rouvre le fichier avec le mot de passe pour vérifier qu’il est lisible.
- Les sauvegardes internes, sur l’appareil, ne sont pas chiffrées : elles restent dans l’app.

## Passer d’un appareil à l’autre

Il n’y a pas de synchronisation : chaque appareil garde ses propres données.

1. Sur l’appareil de départ : **Réglages → Transférer vers un autre appareil**. Tu peux protéger le fichier par un mot de passe.
2. Dans la feuille de partage, choisis **AirDrop**, puis l’autre appareil.
3. Sur l’autre appareil : **Réglages → Importer**, et choisis le fichier reçu. Cadence te montre son contenu avant de remplacer quoi que ce soit.

Si AirDrop n’apparaît pas, enregistre le fichier dans iCloud Drive et récupère-le depuis l’app Fichiers.

## Ce que Cadence ne fait pas sur iPhone et iPad

- **Notifications et rappels** : une web app ne peut pas en envoyer quand elle est fermée, sans serveur. Cadence n’en envoie aucun.
- **Widgets, Face ID, intégration à Santé** : réservés aux apps de l’App Store.
- **Raccourcis iOS** : Safari et l’app installée n’ont pas les mêmes données ; un raccourci qui ouvre une adresse agirait sur la mauvaise copie.

## Créer une mise à jour

1. Dans l’app : **Réglages → Préparer une mise à jour**. Note tes idées, une par ligne.
2. Touche **Copier la demande** et colle-la dans une conversation avec Claude, en joignant `index.html`, `sw.js` et `manifest.webmanifest`.
3. Claude te renvoie les fichiers modifiés (version 1.3.0, puis 1.4.0…).
4. Sur GitHub, dans ton dépôt : **Add file → Upload files**, sélectionne tous les nouveaux fichiers (ils remplacent les anciens), puis **Commit changes**.
5. Quelques minutes plus tard (jusqu’à 10), ouvre Cadence : la bannière **Nouvelle version prête** apparaît. Touche **Installer**.

Tes habitudes et tes validations ne sont pas touchées : elles vivent dans la base de l’appareil, pas dans les fichiers de l’app.

**Règles pour toute nouvelle version** (pour toi ou pour Claude) :
- Même numéro dans `APP.version` (en haut du script de `index.html`), dans la balise `<meta name="app-version">` et dans `SW_VERSION` (`sw.js`), plus une entrée en tête de `CHANGELOG`.
- Ne jamais renommer la base `cadence`. Si le format des données change : incrémenter `APP.schema` et ajouter une fonction dans `MIGRATIONS`. La conversion est testée sur une copie (`Migration.dryRun`) avant d’être appliquée : les comptes et les statistiques des jours passés doivent rester identiques.
- Tous les calculs passent par `dayState` et l’historique daté des réglages (`h.history`) : ne pas réécrire le passé.
- L’`index.html` de la version actuelle devient le `precedente.html` de la suivante.
- Tout reste local : aucun serveur, aucune requête vers un service extérieur.

## Dépannage

- **La nouvelle version n’apparaît pas** : GitHub peut mettre jusqu’à 10 minutes à la publier. Patiente, ferme complètement l’app (balaye-la vers le haut dans le sélecteur d’apps) et rouvre-la, ou utilise *Vérifier maintenant*.
- **Erreur 404 sur l’adresse** : vérifie que `index.html` est bien à la racine du dépôt et que Pages est réglé sur `main` / `(root)`.
- **GitHub demande de payer** : ton dépôt est privé. Settings → tout en bas, *Danger Zone* → **Change repository visibility** → **Change to public**.
- **Écran de secours au démarrage** : touche d’abord **Exporter mes données**, puis le bouton proposé : **Réessayer**, **Restaurer la dernière sauvegarde** ou la version précédente.
- **Données perdues** : Centre de données → Sauvegardes internes → **Aperçu**, puis **Restaurer** ; ou importe ton dernier fichier exporté.

## Ce qui est nouveau en 1.2.0

- **Historique des réglages** : changer les jours, la fréquence, l’heure ou la mini-version d’une habitude ne réécrit plus le passé. Tu choisis à partir de quand le changement s’applique, avec une raison et une note, puis Cadence compare avant et après.
- **Pauses** : vacances, maladie, déplacement ou pause volontaire, pour toutes les habitudes ou certaines, avec ou sans date de fin. Un jour en pause n’est jamais un manque et ne casse pas les séries.
- **Fréquences souples** (« 3 fois par semaine »), **paliers progressifs**, **cycles** d’essai, de reprise et de consolidation, **reprise guidée** après une interruption.
- **Indicateurs sur 7, 30, 90 et 365 jours** : attendus, complets, mini-versions, manqués, repos et pauses, comparés à la période précédente.
- **Assistant local** : des constats expliqués par tes propres données (jours favorables, horaires réels, objectif trop ambitieux, tâches souvent reportées), avec leurs preuves. Tu peux les noter ou les masquer. Rien ne sort de l’appareil.
- **Matrice** : vues mois, trimestre et année, filtres enregistrables, légende complète, repères de changement et fiche détaillée de chaque journée.
- **Tâches** : durée estimée, charge du jour, tâches récurrentes, report au lendemain avec historique.
- **Bilans** : bilan du mois, bilan annuel par trimestre avec la chronologie des changements, notes liées à une habitude ou une période, modèles de rétrospective.
- **Recherche** dans tout le contenu, accès direct à une date, favoris et éléments récents.
- **Centre de données** : vérification d’intégrité, aperçu d’une sauvegarde avant restauration, sauvegardes chiffrées, exports séparés, rapports avec la définition des indicateurs.
- **Confort** : vue compacte de l’accueil, ordre des sections, habitudes favorites, contraste renforcé, thèmes clairs plus lisibles, jalons discrets (désactivables).
- **Fiabilité** : conversion testée sur une copie, protection contre les doubles appuis, heure d’été et début de journée corrigés, version précédente de secours.

## Pourquoi pas l’App Store ?

Une app native exige un Mac avec Xcode, et un compte Apple Developer payant pour qu’elle reste installée plus de 7 jours. Pour un usage personnel, une web app installée offre la même expérience gratuitement, et tu peux la mettre à jour toi-même en quelques minutes.
