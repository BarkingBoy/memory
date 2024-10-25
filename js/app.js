import { imageGeneration } from "./images.js";

window.onload = init;

function init() {
  const choixNombreDeCartes = document.querySelector(".nombreDeCartes");
  const playButton = document.querySelector("#play-button");
  const container = document.querySelector(".conteneur-cartes");
  const tableBody = document.querySelector("#table-body");
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

  afficherScoresTableau();

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
        sauvegarderScoreTableau(score);
        afficherScoresTableau();
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

  function sauvegarderScoreTableau(score) {
    const imageChoisie = sessionStorage.getItem("ChoixImages") || "animaux";
    const tailleMemory = localStorage.getItem("Taille memory") || "Inconnu";
    const pseudo = sessionStorage.getItem("pseudo") || prompt("Entrez votre pseudo");
    const dateActuelle = new Date().toLocaleString();

    const newScore = {
      pseudo,
      score,
      taille: tailleMemory,
      choixMemory: imageChoisie,
      date: dateActuelle,
    };

    let scoresTableau =
      JSON.parse(localStorage.getItem("tableScores")) || [];

    
    scoresTableau.push(newScore);

   
    localStorage.setItem("tableScores", JSON.stringify(scoresTableau));
  }

  function afficherScoresTableau() {
    const scoresTableau =
      JSON.parse(localStorage.getItem("tableScores")) || [];

    
    tableBody.innerHTML = "";

    scoresTableau.forEach((scoreData) => {
      const newRow = tableBody.insertRow();

      newRow.insertCell().textContent = scoreData.pseudo;
      newRow.insertCell().textContent = scoreData.score;
      newRow.insertCell().textContent = scoreData.taille;
      newRow.insertCell().textContent = scoreData.choixMemory;
      newRow.insertCell().textContent = scoreData.date;
    });
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
