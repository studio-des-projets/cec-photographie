# CÉC Photographie — guide du site

Site portfolio de Cécile. Statique (HTML/CSS/JS), hébergé sur GitHub Pages.

## Structure

```
cec-photographie/
├── index.html              La page du site
├── images/                 Les photos (originales)
├── assets/
│   ├── style.css           Le design
│   ├── script.js           Galerie, visionneuse, formulaire
│   ├── photos.js           ★ La liste des photos (à éditer)
│   └── logo.png
├── outils/
│   └── lister-nouvelles-photos.command   Aide à l'ajout de photos
└── LISEZ-MOI.md            Ce fichier
```

## Ajouter une photo

1. Déposer le fichier image dans le dossier `images/`.
2. Double-cliquer sur `outils/lister-nouvelles-photos.command` :
   il affiche les lignes prêtes à coller pour les photos pas encore listées.
3. Coller ces lignes dans `assets/photos.js`, puis ajuster le titre
   et la catégorie (`patrimoine` ou `urbain`).
4. Enregistrer et publier (push GitHub).

## Activer le formulaire de contact

Le formulaire utilise **Formspree** (gratuit, sans serveur).

1. Créer un compte sur https://formspree.io avec l'email de Cécile.
2. Créer un nouveau formulaire — Formspree donne une adresse du type
   `https://formspree.io/f/abcdwxyz`.
3. Dans `index.html`, remplacer `VOTRE_ID_FORMSPREE` par cet identifiant
   (chercher la ligne `action="https://formspree.io/f/VOTRE_ID_FORMSPREE"`).
4. Enregistrer et publier. Les messages arriveront par email.

## Nom de domaine personnalisé (optionnel)

Par défaut le site est à `studio-des-projets.github.io/cec-photographie`.

Pour un domaine du type `cecile-photographie.fr` :

1. Acheter le domaine (OVH, Gandi, Infomaniak…).
2. Chez le fournisseur du domaine, créer un enregistrement DNS pointant
   vers GitHub Pages (4 adresses A + un CNAME — détail fourni le moment venu).
3. Créer un fichier `CNAME` à la racine du dépôt contenant le domaine.
4. Dans GitHub : dépôt → Settings → Pages → Custom domain.

## Mettre le site en ligne / à jour

Après chaque modification : `git add`, `git commit`, `git push`.
GitHub Pages met le site à jour automatiquement en ~1 minute.
