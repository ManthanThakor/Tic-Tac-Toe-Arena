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

  console.log(`Cell clicked: ${gameCellsIndex}`);
  console.log(`Current player: ${currentPlayer}`);

  if (GameBoardStatus[gameCellsIndex] !== "") {
    // console.log("Cell already occupied");
    return;
  }

  GameBoardStatus[gameCellsIndex] = currentPlayer;
  gameCells.textContent = currentPlayer;

  if (checkWinner()) {
    // console.log(`Player ${currentPlayer} wins!`);
    alert(`Player ${currentPlayer} wins!`);
    return;
  }

  if (GameBoardStatus.every((gameCells) => gameCells)) {
    console.log("It's a draw!");
    alert("It's a draw!");
    return;
  }

  currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  // console.log(`Next Player: ${currentPlayer}`);
}

function checkWinner() {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];

    console.log(`Checking condition: ${a}, ${b}, ${c}`);

    if (
      GameBoardStatus[a] &&
      GameBoardStatus[a] === GameBoardStatus[b] &&
      GameBoardStatus[a] === GameBoardStatus[c]
    ) {
      console.log(
        `Winning combination: ${GameBoardStatus[a]}, ${GameBoardStatus[b]}, ${GameBoardStatus[c]}`
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
  // console.log("Game reset. Current Player: " + currentPlayer);
}

cells.forEach((cell) => {
  // console.log(`Adding event listener to cell: ${cell.getAttribute("data-index")}`);
  cell.addEventListener("click", playGameCells);
});

resetButton.addEventListener("click", resetGame);
