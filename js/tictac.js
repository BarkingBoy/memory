let currentPlayer = "X";
const boardState = Array(9).fill(null);

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
