import { imageChien } from "./images.js";
window.onload = init;

function init() {

  let choixNombreDeCartes = document.querySelector(".nombreDeCartes");
  const playButton = document.querySelector("#play-button");
  const container = document.querySelector(".conteneur-cartes");

  let premiereCarte = null; // Stocker la première carte cliquée
  let deuxiemeCarte = null; // Stocker la deuxième carte cliquée
  let verrouillageJeu = false; // Empêcher les clics pendant la comparaison
  let score = 0; //Variable score

  let bonDuo = 0;
  let nombreDeCartes;

  playButton.addEventListener("click", function () {
    const nombreDeCartes = parseInt(choixNombreDeCartes.value);
    genererCartes(nombreDeCartes);
  });

  function genererCartes(nBCartes) {
    nombreDeCartes = nBCartes;
    container.innerHTML = "";
    let arrayChien = [];

    // Générer des paires de chiens
    while (arrayChien.length < nombreDeCartes / 2) {
      let img = imageChien();
      let imgSrc = img.src;

      // Vérifiez si l'URL de l'image existe déjà dans le tableau
      if (!arrayChien.some((chien) => chien.src === imgSrc)) {
        arrayChien.push(img);
      }
    }

    // Dupliquer les images pour créer des paires
    let allCartes = arrayChien.concat(arrayChien);

    // Mélanger les cartes pour qu'elles soient dans un ordre aléatoire
    allCartes.sort(() => Math.random() - 0.5);

    // Affichage des cartes
    allCartes.forEach((img) => {
      const cartes = document.createElement("div");
      cartes.className = "cartes";

      const couverture = document.createElement("div");
      couverture.className = "couverture";
      couverture.style.visibility = "visible"; // Couvrir les cartes au départ

      const imageCouverture = document.createElement("img");
      imageCouverture.src = "./ressources/question.svg";
      imageCouverture.className = "image-couverture";
      couverture.appendChild(imageCouverture);

      cartes.appendChild(img.cloneNode());
      cartes.appendChild(couverture);
      container.appendChild(cartes);

      // Gestion du clic sur la carte
      cartes.addEventListener("click", function () {
        if (verrouillageJeu || couverture.style.visibility === "hidden") return; // Ignorer si le jeu est verrouillé ou si la carte est déjà révélée
        cartes.classList.add("flipped");
        couverture.style.visibility = "hidden"; // Révèle la carte

        if (!premiereCarte) {
          // si la variable premiere carte est vide
          // Si c'est la première carte cliquée
          premiereCarte = cartes;
        } else if (!deuxiemeCarte) {
          // Si c'est la deuxième carte cliquée
          deuxiemeCarte = cartes;

          // Comparer les deux cartes
          verifierCorrespondance();
        }
      });
    });
  }

  function verifierCorrespondance() {
    const premiereImage = premiereCarte.querySelector("img").src;
    const deuxiemeImage = deuxiemeCarte.querySelector("img").src;

    if (premiereImage === deuxiemeImage) {
      // Si les images correspondent, elles restent révélées
      bonDuo++; // Incrémenter le nombre de paires trouvées
      premiereCarte = null;
      deuxiemeCarte = null;
      console.log(bonDuo);

      // Vérifier si toutes les paires ont été trouvées
      if (bonDuo === nombreDeCartes / 2) {
        alert("Victoire ! Toutes les paires ont été trouvées !");
        bonDuo = 0; // Reset le compteur en cas de nouvelle partie
      }
    } else {
      // Si elles ne correspondent pas, les cacher après un délai
      score++; // Incrémenter le score si les cartes ne correspondent pas
      document.querySelector("#score").textContent = `Score : ${score}`;
      verrouillageJeu = true;

      setTimeout(() => {
        premiereCarte.classList.remove("flipped"); // Enlève la classe de flip
        deuxiemeCarte.classList.remove("flipped");

        premiereCarte.querySelector(".couverture").style.visibility = "visible";
        deuxiemeCarte.querySelector(".couverture").style.visibility = "visible";

        premiereCarte = null;
        deuxiemeCarte = null;
        verrouillageJeu = false;
      }, 1000);
    }
  }

  document.addEventListener("keydown", function (event) {
    // Vérifiez si la touche pressée est la barre d'espace
    if (event.code === "Space") {
      event.preventDefault(); // Empêche le comportement par défaut de la barre d'espace (défilement de page)
      resetJeu(); // Appelle la fonction de réinitialisation
    }
    function resetJeu() {
      const choixNombreDeCartes =
        document.querySelector(".nombreDeCartes").value;
      genererCartes(parseInt(choixNombreDeCartes)); // Recommencer une nouvelle partie
    }
  });
}
