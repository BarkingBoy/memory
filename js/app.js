import { imageChien } from "./images.js";

window.onload = init;

function init() {
  const choixNombreDeCartes = document.querySelector(".nombreDeCartes");
  const playButton = document.querySelector("#play-button");
  const container = document.querySelector(".conteneur-cartes");
  const choosedImage = sessionStorage.getItem("choosedImage")

  let premiereCarte = null; // Stocke la première carte cliquée
  let deuxiemeCarte = null; // Stocke la deuxième carte cliquée
  let verrouillageJeu = false; // Évite les clics pendant la comparaison
  let score = 0; // Score de l'utilisateur
  let bonDuo = 0; // Compteur de paires trouvées
  let nombreDeCartes; // Nombre total de cartes

  // Événement pour commencer le jeu
  playButton.addEventListener("click", () => {
    nombreDeCartes = parseInt(choixNombreDeCartes.value);
    genererCartes(nombreDeCartes);
  });

  // Fonction pour générer des cartes
  function genererCartes(nBCartes) {
    container.innerHTML = ""; // Réinitialise le conteneur
    const arrayChien = []; // Tableau pour stocker les images de chiens

    // Générer des paires d'images de chiens
    while (arrayChien.length < nBCartes / 2) {
      const img = imageChien();
      const imgSrc = img.src;

      // Ajouter l'image au tableau si elle n'existe pas déjà
      if (!arrayChien.some((chien) => chien.src === imgSrc)) {
        arrayChien.push(img);
      }
    }

    // Créer des paires en dupliquant les images
    const allCartes = [...arrayChien, ...arrayChien];

    // Mélanger les cartes pour un affichage aléatoire
    allCartes.sort(() => Math.random() - 0.5);

    // Afficher les cartes
    allCartes.forEach((img) => {
      const cartes = document.createElement("div");
      cartes.className = "cartes";

      const couverture = document.createElement("div");
      couverture.className = "couverture";
      couverture.style.visibility = "visible"; // Couvrir les cartes initialement

      const imageCouverture = document.createElement("img");
      imageCouverture.src = "./ressources/question.svg";
      imageCouverture.className = "image-couverture";
      couverture.appendChild(imageCouverture);

      cartes.appendChild(img.cloneNode());
      cartes.appendChild(couverture);
      container.appendChild(cartes);

      // Événement pour gérer le clic sur la carte
      cartes.addEventListener("click", () => {
        handleCardClick(cartes, couverture);
      });
    });
  }

  // Fonction pour gérer le clic sur une carte
  function handleCardClick(cartes, couverture) {
    if (verrouillageJeu || couverture.style.visibility === "hidden") return; // Ignorer si le jeu est verrouillé ou si la carte est déjà révélée

    cartes.classList.add("flipped"); // Retourne la carte
    couverture.style.visibility = "hidden"; // Révèle la carte

    if (!premiereCarte) {
      // Si c'est la première carte cliquée
      premiereCarte = cartes;
    } else if (!deuxiemeCarte) {
      // Si c'est la deuxième carte cliquée
      deuxiemeCarte = cartes;
      verifierCorrespondance(); // Vérifie si les deux cartes correspondent
    }
  }

  // Fonction pour vérifier la correspondance entre les deux cartes
  function verifierCorrespondance() {
    const premiereImage = premiereCarte.querySelector("img").src;
    const deuxiemeImage = deuxiemeCarte.querySelector("img").src;

    if (premiereImage === deuxiemeImage) {
      // Si les images correspondent
      bonDuo++;
      console.log(`Paires trouvées: ${bonDuo}`);

      // Vérifie si toutes les paires ont été trouvées
      if (bonDuo === nombreDeCartes / 2) {
        alert("Victoire ! Toutes les paires ont été trouvées !");
        bonDuo = 0; // Réinitialise le compteur pour une nouvelle partie
      }

      // Réinitialise les cartes sélectionnées
      premiereCarte = null;
      deuxiemeCarte = null;

    } else {
      // Si elles ne correspondent pas
      score++;
      document.querySelector("#score").textContent = `Score : ${score}`;
      verrouillageJeu = true; // Verrouille le jeu

      // Cache les cartes après un délai
      setTimeout(() => {
        masquerCartes();
      }, 1000);
    }
  }

  // Fonction pour masquer les cartes
  function masquerCartes() {
    premiereCarte.classList.remove("flipped");
    deuxiemeCarte.classList.remove("flipped");

    premiereCarte.querySelector(".couverture").style.visibility = "visible";
    deuxiemeCarte.querySelector(".couverture").style.visibility = "visible";

    // Réinitialise les cartes sélectionnées
    premiereCarte = null;
    deuxiemeCarte = null;
    verrouillageJeu = false; // Déverrouille le jeu
  }

  // Événement pour réinitialiser le jeu avec la barre d'espace
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault(); // Empêche le défilement de page
      resetJeu();
    }
  });

  // Fonction pour réinitialiser le jeu
  function resetJeu() {
    const choixNombreDeCartes = document.querySelector(".nombreDeCartes").value;
    genererCartes(parseInt(choixNombreDeCartes)); // Recommencer une nouvelle partie
  }
}
