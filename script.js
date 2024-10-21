const players = ["X", "O"];
let currentPlayer = players[0];
let GameBoardStatus = ["", "", "", "", "", "", "", "", ""];

const cells = document.querySelectorAll(".game-cells");
const resetButton = document.getElementById("reset-game");

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playGameCells(event) {
  const gameCells = event.target;
  const gameCellsIndex = gameCells.getAttribute("data-index");
  if (GameBoardStatus[gameCellsIndex] !== "") return;

  GameBoardStatus[gameCellsIndex] = currentPlayer;
  gameCells.textContent = currentPlayer;

  if (checkWinner()) {
    alert(`Player ${currentPlayer} wins!`);
    return;
  }

  if (GameBoardStatus.every((gameCells) => gameCells)) {
    alert("It's a draw!");
    return;
  }

  currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  console.log(`Current Player : ${currentPlayer}`);
}

function checkWinner() {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];

    if (
      GameBoardStatus[a] &&
      GameBoardStatus[a] === GameBoardStatus[b] &&
      GameBoardStatus[a] === GameBoardStatus[c]
    ) {
      console.log(
        GameBoardStatus[a] + " " + GameBoardStatus[b] + " " + GameBoardStatus[c]
      );
      return true;
    }
  }
  return false;
}

function resetGame() {
  GameBoardStatus = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = players[0];
  cells.forEach((cell) => (cell.textContent = ""));
}

cells.forEach((cell) => cell.addEventListener("click", playGameCells));
resetButton.addEventListener("click", resetGame);
