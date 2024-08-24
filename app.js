//DOM 

let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newGame = document.querySelector(".new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");

// Set Player 1 Move True

let player1 = true;

// Tracking Win Patterns

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

// Reset Game Function

const resetGame = () => {
  player1 = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Making Each Box Clickable

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (player1) {
      box.innerText = "O";
      player1 = false;
    } else {
      box.innerText = "X";
      player1 = true;
    }
    box.disabled = true;
    
    checkWinner();
  });
});

// Function for Draw Game

const drawGame = () => {
  msg.innerText = "Game Draw";
  msgContainer.classList.remove("hide");
};

//Funtion to disble buttons when clicked 1 time

const disableBtns = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

//Funtion to enable boxes when reset or enable new game

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

//Function to show Winner

const showWinner = (winner) => {
  msg.innerText = `Winner: ${winner}`;
  msgContainer.classList.remove("hide");
};

// Fuction to Check Winner

const checkWinner = () => {
  let filledBoxes = 0;
  let winnerFound = false;

  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        disableBtns();
        showWinner(pos1Val);
        winnerFound = true;
        break;
      }
    }
  }

  // Check For all Boxes are filed or not
  boxes.forEach((box) => {
    if (box.innerText !== "") {
      filledBoxes++;
    }
  });

  if (filledBoxes === 9 && !winnerFound) {
    disableBtns();
    drawGame();
  }
};

newGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
