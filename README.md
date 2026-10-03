# Réserves de chantier

Application web pour relever les réserves sur un chantier depuis un téléphone : photo, constat dicté, local, entreprise, puis cahier de retouches en PDF A4.

## Utilisation

Ouvrir l'adresse de l'application dans Chrome, puis menu ⋮ > « Ajouter à l'écran d'accueil ». L'application fonctionne ensuite hors ligne.

## Données

Aucune donnée n'est envoyée sur un serveur. Les visites, photos et réserves restent dans le navigateur du téléphone. Elles sont perdues si les données du navigateur sont effacées : utiliser la sauvegarde .json (rubrique « Visite »).

## Contenu du dépôt

- `index.html` : l'application
- `sw.js`, `manifest.webmanifest`, `icons/` : installation et fonctionnement hors ligne
- `vendor/jspdf.umd.min.js` : génération des PDF (jsPDF 2.5.1, licence MIT)
- `fonts/` : polices Barlow (interface) sous licence SIL OFL 1.1 ; la police Carlito (PDF), également sous SIL OFL 1.1, est intégrée dans `index.html`

## Mise à jour

Après avoir remplacé `index.html` ou un autre fichier, augmenter le numéro `VERSION` dans `sw.js` (par exemple `reserves-v2`), sinon les téléphones garderont l'ancienne version en cache.
