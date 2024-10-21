import { imageChien } from "./images.js";
window.onload = init;
function init() {
  // Permet de choisir le nombre de cartes qui sera affiché
  // et d'affecter cette valeur à la variable nombreDeCartes
  let choixNombreDeCartes = document.querySelector(".nombreDeCartes");
  const playButton = document.querySelector("#play-button");
  const container = document.querySelector(".conteneur-cartes");

  playButton.addEventListener("click", function () {
    const nombreDeCartes = parseInt(choixNombreDeCartes.value);

    genererCartes(nombreDeCartes);

    // Ajout d'une image de chien aléatoire

    container.appendChild(img);
  });

  // Fonction pour afficher le nombre de cartes choisi
  function genererCartes(nombreDeCartes) {
    container.innerHTML = "";

    for (let index = 0; index < nombreDeCartes; index++) {
      const cartes = document.createElement("div");
      cartes.className = "cartes";

      let img = imageChien();
      container.appendChild(img);
      const contenuCartes = img;
      cartes.innerHTML = contenuCartes;
    }
  }
}
