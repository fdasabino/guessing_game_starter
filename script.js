"use strict";

let secretNumber = generateSecretNumber();
let score = 20;
let high_score = 0;

// Function to generate a random secret number
function generateSecretNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

// Function to display a message
const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

// Function to update the score
const updateScore = function (newScore) {
  document.querySelector(".score").textContent = newScore;
};

// Function to handle winning
const handleWin = function () {
  displayMessage("🎉 Correct Number!");
  document.querySelector(".number").textContent = secretNumber;
  document.querySelector("body").style.backgroundColor = "#60b347";
  document.querySelector(".number").style.width = "30rem";
  document.querySelector(".check").classList.add("hide");

  if (score > high_score) {
    high_score = score;
    document.querySelector(".high_score").textContent = high_score;
  }
};

// Function to handle incorrect guesses
const handleIncorrectGuess = function (guess) {
  if (score > 1) {
    displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
    score--;
    updateScore(score);
    document.querySelector("body").style.backgroundColor = "#ff6a00";
  } else {
    displayMessage("💥 You lost the game!");
    document.querySelector("body").style.backgroundColor = "#e4002b";
    updateScore(0);
  }
};

// Reset game function
const resetGame = function () {
  score = 20;
  secretNumber = generateSecretNumber();
  displayMessage("Start guessing...");
  updateScore(score);
  document.querySelector(".number").textContent = "?";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".check").classList.remove("hide");
};

// Event Listener for the "Check" button
document.querySelector(".check").addEventListener("click", function (e) {
  e.preventDefault();
  const guess = Number(document.querySelector(".guess").value);

  // No input case
  if (!guess) {
    displayMessage("👈 Enter a number between 1 and 20");

    // When the player wins
  } else if (guess === secretNumber) {
    handleWin();

    // When the guess is wrong
  } else {
    handleIncorrectGuess(guess);
  }
});

// Event Listener for the "Again" button (to reset the game)
document.querySelector(".again").addEventListener("click", resetGame);
