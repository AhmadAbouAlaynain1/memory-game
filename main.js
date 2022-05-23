// Definitions of Audio
const blueAudio = new Audio("./sounds/blue.mp3");
const greenAudio = new Audio("./sounds/green.mp3");
const redAudio = new Audio("./sounds/red.mp3");
const yellowAudio = new Audio("./sounds/yellow.mp3");
const wrongAudio = new Audio("./sounds/wrong.mp3");

// Definitions of the HTML Elements

const stage = document.getElementById("stage");
const blue = document.getElementById("blue");
const red = document.getElementById("red");
const yellow = document.getElementById("yellow");
const green = document.getElementById("green");
const mainContainer = document.getElementById("main-container");

// Defining Flags and Arrays
let gameStarted = false;
let currentLevel = 1;
let playerTurn = false;
const buttons = [green, red, yellow, blue];
const audio = [greenAudio, redAudio, yellowAudio, blueAudio];
let pattern = [];
let playerClicks = [];

//Setting Event Listener for all buttons
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function (e) {
    if (playerTurn) {
      console.log(e.currentTarget);
      let buttonClickedIndex = buttons.indexOf(e.currentTarget);
      playerClicks.push(buttonClickedIndex);
      audio[buttonClickedIndex].play();
      // If player has the wrong pattern stop game and reset
      if (!patternCorrect(playerClicks, pattern)) {
        stage.innerText = "Game Over, You Lost! Press Any Key to Retry";
        gameStarted = false;
        playerTurn = false;
        pattern = [];
        playerClicks = [];
        mainContainer.classList.toggle("main-container-lost");
        wrongAudio.play();
        setTimeout(function () {
          mainContainer.classList.toggle("main-container-lost");
        }, 200);
      }
      //If player completed pattern correctly, move to the next level
      else if (playerClicks.length === pattern.length) {
        playerClicks = [];
        pattern.push(Math.floor(Math.random() * 4));
        stage.innerText = "Level " + pattern.length;
        computerClickPattern();
      }
    }
  });
}

// Check if 2 arrays are equal
function patternCorrect(playerPattern, correctPattern) {
  for (let i = 0; i < playerPattern.length; i++) {
    if (playerPattern[i] !== correctPattern[i]) {
      return false;
    }
  }
  return true;
}

// Set animations for the last pattern button pressed
function computerClickPattern() {
  setTimeout(function () {
    buttons[pattern[pattern.length - 1]].classList.toggle(
      "memory-button-virtual"
    );
    audio[pattern[pattern.length - 1]].play();
  }, 200);

  setTimeout(function () {
    buttons[pattern[pattern.length - 1]].classList.toggle(
      "memory-button-virtual"
    );
    playerTurn = true;
  }, 700);
}

// Start Game / Restart Game
document.addEventListener("keypress", function () {
  if (!gameStarted) {
    pattern.push(Math.floor(Math.random() * 4));
    stage.innerText = "Level " + pattern.length;
    computerClickPattern();
    gameStarted = true;
  }
});
