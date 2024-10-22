const players = ["X", "O"];
let currentPlayer = players[0];
console.log(`Default Player: ${currentPlayer}`);

let GameBoardStatus = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

const cells = document.querySelectorAll(".game-cells");
const resetButton = document.getElementById("reset-game");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const closeModalButton = document.getElementById("close-modal");
const modalResetButton = document.getElementById("modal-reset-button");

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
  if (gameOver) return;

  const gameCells = event.target;
  const gameCellsIndex = gameCells.getAttribute("data-index");

  if (GameBoardStatus[gameCellsIndex] !== "") {
    return;
  }
  GameBoardStatus[gameCellsIndex] = currentPlayer;
  console.log(GameBoardStatus);

  gameCells.textContent = currentPlayer;
  gameCells.classList.add(currentPlayer === players[0] ? "x" : "o");

  const winningCombination = checkWinner();
  if (winningCombination) {
    gameOver = true;
    showModal(`Player ${currentPlayer} wins!`);
    return;
  }

  if (GameBoardStatus.every((cell) => cell)) {
    gameOver = true;
    showModal("It's a draw!");
    return;
  }

  currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  console.log(`Current Player: ${currentPlayer}`);
}

function checkWinner() {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    console.log(`CheckWinner: ${[a, b, c]}`);

    if (
      GameBoardStatus[a] &&
      GameBoardStatus[a] === GameBoardStatus[b] &&
      GameBoardStatus[a] === GameBoardStatus[c]
    ) {
      console.log(
        `Winner ${
          GameBoardStatus[a] +
          " " +
          GameBoardStatus[b] +
          " " +
          GameBoardStatus[c]
        }`
      );
      return true;
    }
  }
  return false;
}

function showModal(message) {
  modalMessage.textContent = message;
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

function resetGame() {
  GameBoardStatus = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = players[0];
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });
  gameOver = false;
  closeModal();
}

cells.forEach((cell) => {
  cell.addEventListener("click", playGameCells);
});

resetButton.addEventListener("click", resetGame);
closeModalButton.addEventListener("click", closeModal);
modalResetButton.addEventListener("click", resetGame);

const playButton = document.getElementById("play-g");

playButton.addEventListener("click", () => {
  const gameSection = document.getElementById("play-game");
  gameSection.scrollIntoView({ behavior: "smooth" });
});
