import { imageGeneration } from "./images.js";

window.onload = init;

function init() {
  const choixNombreDeCartes = document.querySelector(".nombreDeCartes");
  const playButton = document.querySelector("#play-button");
  const container = document.querySelector(".conteneur-cartes");
  const scoreListDiv = document.querySelector("#score-list");
  const scoreListChiens = document.querySelector("#score-list-chiens");

  let premiereCarte = null;
  let deuxiemeCarte = null;
  let verrouillageJeu = false;
  let score = 0;
  let bonDuo = 0;
  let nombreDeCartes;

  // Sauvegarde de la taille dans le sessionStorage
  choixNombreDeCartes.addEventListener("change", () => {
    const taille = parseInt(choixNombreDeCartes.value, 10);
    if (!isNaN(taille)) {
      localStorage.setItem("Taille memory", taille);
      console.log("Taille memory enregistrée :", taille);
    } else {
      console.error("Erreur : valeur non valide.");
    }
  });

  afficherMeilleursScores();

  playButton.addEventListener("click", () => {
    nombreDeCartes = parseInt(choixNombreDeCartes.value);
    genererCartes(nombreDeCartes);
  });

  function genererCartes(nBCartes) {
    container.innerHTML = "";
    const arrayChien = [];

    while (arrayChien.length < nBCartes / 2) {
      const img = imageGeneration();
      const imgSrc = img.src;

      if (!arrayChien.some((chien) => chien.src === imgSrc)) {
        arrayChien.push(img);
      }
    }

    const allCartes = [...arrayChien, ...arrayChien];

    allCartes.sort(() => Math.random() - 0.5);

    allCartes.forEach((img) => {
      const cartes = document.createElement("div");
      cartes.className = "cartes";

      const couverture = document.createElement("div");
      couverture.className = "couverture";
      couverture.style.visibility = "visible";

      const imageCouverture = document.createElement("img");
      imageCouverture.src = "./ressources/question.svg";
      imageCouverture.className = "image-couverture";
      couverture.appendChild(imageCouverture);

      cartes.appendChild(img.cloneNode());
      cartes.appendChild(couverture);
      container.appendChild(cartes);

      cartes.addEventListener("click", () => {
        handleCardClick(cartes, couverture);
      });
    });
  }

  function handleCardClick(cartes, couverture) {
    if (verrouillageJeu || couverture.style.visibility === "hidden") return;

    cartes.classList.add("flipped");
    couverture.style.visibility = "hidden";

    if (!premiereCarte) {
      premiereCarte = cartes;
    } else if (!deuxiemeCarte) {
      deuxiemeCarte = cartes;
      verifierCorrespondance();
    }
  }

  function verifierCorrespondance() {
    const premiereImage = premiereCarte.querySelector("img").src;
    const deuxiemeImage = deuxiemeCarte.querySelector("img").src;

    if (premiereImage === deuxiemeImage) {
      bonDuo++;
      console.log(`Paires trouvées: ${bonDuo}`);

      if (bonDuo === nombreDeCartes / 2) {
        alert("Victoire ! Toutes les paires ont été trouvées !");
        sauvegarderScore(score);
        afficherMeilleursScores();
        bonDuo = 0;
      }

      premiereCarte = null;
      deuxiemeCarte = null;
    } else {
      score++;
      document.querySelector("#score").textContent = `Score : ${score}`;
      verrouillageJeu = true;
      setTimeout(() => {
        masquerCartes();
      }, 1000);
    }
  }

  function sauvegarderScore(score) {
    const imageChoisie = sessionStorage.getItem("ChoixImages");

    let scores =
      JSON.parse(localStorage.getItem(`meilleursScores_${imageChoisie}`)) || [];

    scores.push(score);

    // Trie les scores du plus petit au plus grand
    scores.sort((a, b) => a - b);

    // Garde seulement les 5 meilleurs scores
    scores = scores.slice(0, 5);

    localStorage.setItem(
      `meilleursScores_${imageChoisie}`,
      JSON.stringify(scores)
    );
  }

  function afficherMeilleursScores() {
    const scoresChiens =
      JSON.parse(localStorage.getItem("meilleursScores_chiens")) || [];
    const scoresAnimaux =
      JSON.parse(localStorage.getItem("meilleursScores_animaux")) || [];

    scoreListDiv.innerHTML = "";
    scoreListChiens.innerHTML = "";

    if (scoresAnimaux.length === 0) {
      scoreListDiv.innerHTML =
        "<div>Aucun score enregistré pour les animaux.</div>";
    } else {
      scoreListDiv.innerHTML = "<h2>Meilleurs Scores pour Animaux :</h2><ul>";
      scoresAnimaux.forEach((score, index) => {
        scoreListDiv.innerHTML += `<li>${
          index + 1
        } place : ${score} points</li>`;
      });
      scoreListDiv.innerHTML += "</ul>";
    }

    if (scoresChiens.length === 0) {
      scoreListChiens.innerHTML =
        "<div>Aucun score enregistré pour les chiens.</div>";
    } else {
      scoreListChiens.innerHTML = "<h2>Meilleurs Scores pour Chiens :</h2><ul>";
      scoresChiens.forEach((score, index) => {
        scoreListChiens.innerHTML += `<li>${
          index + 1
        } place : ${score} points </li>`;
      });
      scoreListChiens.innerHTML += "</ul>";
    }
  }

  function masquerCartes() {
    premiereCarte.classList.remove("flipped");
    deuxiemeCarte.classList.remove("flipped");

    premiereCarte.querySelector(".couverture").style.visibility = "visible";
    deuxiemeCarte.querySelector(".couverture").style.visibility = "visible";

    premiereCarte = null;
    deuxiemeCarte = null;
    verrouillageJeu = false;
  }

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      resetJeu();
    }
  });

  function resetJeu() {
    const choixNombreDeCartes = document.querySelector(".nombreDeCartes").value;
    document.querySelector("#score").textContent = `Score : ${score}`;
    genererCartes(parseInt(choixNombreDeCartes));
    score = 0;
    bonDuo = 0;
  }
}
