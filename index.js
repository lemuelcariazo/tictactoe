
window.addEventListener("DOMContentLoaded", () => {
  const tiles = Array.from(document.querySelectorAll(".tile"));
  const tilesWrapper = document.querySelector("tiles-wrapper");
  const playerDisplay = document.querySelector("#player-display");
  const announcer = document.querySelector(".announcer");
  const resetButton = document.getElementById("reset-button");

  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let isGameActive = true;

  const PLAYERX_WON = "PLAYERX_WON";
  const PLAYERO_WON = "PLAYERO_WON";
  const TIE = "TIE";

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

  function userAction(tile, index) {
    if (isValidAction(tile) && isGameActive) {
      tile.innerText = currentPlayer;
      updateBoard(index);
      handleResultValidation();
      changePlayer();
    }
  }
  console.log(winningConditions.length);

  function handleResultValidation() {
    let roundWon = false;

    for (let i = 0; i <= 7; i++) {
      const winningCondition = winningConditions[i];
      const a = board[winningCondition[0]];
      const b = board[winningCondition[1]];
      const c = board[winningCondition[2]];
      if (a === "" && b === "" && c === "") {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
      isGameActive = false;
      return;
    }

    if (!board.includes("")) {
      announce(TIE);
    }

    function announce(type) {
      switch (type) {
        case PLAYERX_WON:
          announcer.innerHTML = `Player <span class="PLAYER_X">X</span> Won`;
          break;
        case PLAYERO_WON:
          announcer.innerHTML = `Player <span class="PLAYER_O">O</span> Won`;
          break;
        case TIE:
          announcer.innerHTML = "TIE";
      }
      announcer.classList.remove("hide");
    }
  }
  function changePlayer() {
    playerDisplay.classList.remove(`PLAYER_${currentPlayer}`);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`PLAYER_${currentPlayer}`);
  }

  function updateBoard(index) {
    board[index] = currentPlayer;
  }
  function isValidAction(tile) {
    if (tile.innerText === "X" || tile.innerText === "O") {
      return false;
    } else {
      return true;
    }
  }

  tiles.forEach((tile, index) => {
    tile.addEventListener("click", () => {
      userAction(tile, index);
      console.log(tile, index);
    });
  });

  resetButton.addEventListener("click", resetBtn);

  function resetBtn() {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    announcer.classList.add("hide");
    // if (currentPlayer === "O") {
    //   changePlayer();
    // }

    tiles.forEach((tile) => {
      tile.innerText = "";
      tile.classList.remove("PLAYER_X");
      tile.classList.remove("PLAYER_O");
    });
  }
});
