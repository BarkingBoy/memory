window.onload = init;

function init() {
  let boardState = Array(9).fill(null); // Tableau pour enregistrer l'état du jeu
  const playButton = document.querySelector(".play");
  const cells = document.querySelectorAll(".cell");

  // Le joueur actuel commence avec le cercle
  let currentPlayer = "circle";
  let gameActive = true; // Indicateur pour savoir si le jeu est actif

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      // Vérifie si la case est vide et que le jeu est actif
      if (!boardState[index] && gameActive) {
        // Marque la case pour le joueur actuel
        boardState[index] = currentPlayer;

        // Crée une nouvelle instance de l'image pour rejouer l'animation
        let img = new Image();
        img.src = currentPlayer === "circle" ? "js/Circle.gif" : "js/cross.gif";
        img.className = currentPlayer;

        cell.appendChild(img); // Ajoute l'image dans la cellule

        // Vérifie s'il y a un gagnant ou une égalité
        checkWin();

        // Change de joueur
        currentPlayer = currentPlayer === "circle" ? "cross" : "circle";
      }
    });
  });

  function reset() {
    currentPlayer = "circle"; // Réinitialise au cercle
    boardState = Array(9).fill(null);
    gameActive = true; // Réactive le jeu

    cells.forEach((cell) => {
      cell.innerHTML = ""; // Supprime tout contenu dans les cellules (y compris les images)
    });
  }

  function checkWin() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    // Vérifie les combinaisons gagnantes
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
        gameActive = false; // Désactive le jeu
        setTimeout(() => {
          alert("Victoire ! Appuyez sur OK pour rejouer");
          reset();
        }, 150);
        return; // Sort de la fonction après avoir trouvé un gagnant
      }
    }

    // Vérifie s'il y a égalité
    if (boardState.every((cell) => cell !== null)) {
      gameActive = false; // Désactive le jeu
      setTimeout(() => {
        alert("Égalité ! Appuyez sur OK pour rejouer");
        reset();
      }, 150);
    }
  }

  playButton.addEventListener("click", () => {
    console.log("button clicked");
    reset();
  });
  
}
