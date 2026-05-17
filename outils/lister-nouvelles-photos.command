#!/bin/bash
# Affiche les photos du dossier images/ qui ne sont pas encore dans photos.js.
# Double-cliquez sur ce fichier pour le lancer.

cd "$(dirname "$0")/.." || exit 1

echo "=============================================="
echo "  Photos non encore listées dans photos.js"
echo "=============================================="
echo

trouve=0
for img in images/*.jpg images/*.jpeg images/*.png; do
  [ -e "$img" ] || continue
  nom=$(basename "$img")
  [ "$nom" = "34_photo_profil_auteur.jpg" ] && continue
  if ! grep -q "$nom" assets/photos.js; then
    echo "  { fichier: \"$nom\", titre: \"À COMPLÉTER\", categorie: \"patrimoine\" },"
    trouve=1
  fi
done

if [ "$trouve" = "0" ]; then
  echo "  Aucune nouvelle photo : tout est déjà listé."
else
  echo
  echo "→ Copiez les lignes ci-dessus dans assets/photos.js"
  echo "  puis remplacez le titre et la catégorie (patrimoine ou urbain)."
fi

echo
read -n 1 -s -r -p "Appuyez sur une touche pour fermer..."
