window.onload = init;

function init() {
  let currentPlayer = "X";
  let boardState = Array(9).fill(null);
  const playButton = document.querySelector(".play");
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      // Vérifie si la case est vide
      if (!boardState[index]) {
        // Marque la case pour le joueur actuel
        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;

        // Change de joueur
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    });
  });

  function reset() {
    currentPlayer = "X";
    boardState = Array(9).fill(null);

    cells.forEach((cell) => {
      cell.textContent = "";
    });
  }

  playButton.addEventListener("click", () => {
    console.log("button clicked");
    reset();
  });
}
