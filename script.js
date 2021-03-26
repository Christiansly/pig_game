"use strict";
const player_1_score = document.querySelector("#score--0");
const player_2_score = document.querySelector("#score--1");
const player_1_current_score = document.querySelector("#current--0");
const player_2_current_score = document.querySelector("#current--1");
const player_1 = document.querySelector(".player--0");
const player_2 = document.querySelector(".player--1");
const dice = document.querySelector(".dice");

let current_score, score;
let current_player = 0;
function init() {
  player_1_score.textContent = 0;
  player_2_score.textContent = 0;
  player_1_current_score.textContent = 0;
  player_2_current_score.textContent = 0;
  dice.classList.add("hidden");
  player_1.classList.add("player--active");
  player_2.classList.remove("player--active");
  player_1.classList.remove("player--winner");
  player_2.classList.remove("player--winner");
  document.querySelector(".btn--roll").disabled = false;
  document.querySelector(".btn--hold").disabled = false;
  score = [0, 0];
  current_score = [0, 0];
  current_player = 0;
}

function switchPlayer() {
  if (checkWinner()) return;
  current_player = current_player === 0 ? 1 : 0;
  player_1.classList.toggle("player--active");
  player_2.classList.toggle("player--active");
  score[current_player] = 0;
}

function hold() {
  current_score[current_player] += score[current_player];
  document.querySelectorAll(".current-score")[current_player].textContent =
    current_score[current_player];
  document.querySelectorAll(".score")[current_player].textContent = 0;
  switchPlayer();
}

function rollDice() {
  const my_random_number = Math.trunc(Math.random() * 6) + 1;
  dice.classList.remove("hidden");
  dice.src = `dice-${my_random_number}.png`;
  if (my_random_number !== 1) {
    score[current_player] += my_random_number;
    document.querySelectorAll(".score")[current_player].textContent =
      score[current_player];
  } else {
    current_score[current_player] += score[current_player];
    document.querySelectorAll(".current-score")[current_player].textContent =
      current_score[current_player];
    document.querySelectorAll(".score")[current_player].textContent = 0;
    switchPlayer();
  }
}

function checkWinner() {
  if (current_score[current_player] > 50) {
    document
      .querySelectorAll(".player")
      [current_player].classList.add("player--winner");
    document.querySelectorAll(".score")[current_player].textContent =
      "WINNER!! 🙂";
    document.querySelector(".btn--roll").disabled = true;
    document.querySelector(".btn--hold").disabled = true;
    dice.classList.add("hidden");
    return true;
  }
}
init();
document.querySelector(".btn--roll").addEventListener("click", rollDice);
document.querySelector(".btn--new").addEventListener("click", init);
document.querySelector(".btn--hold").addEventListener("click", hold);
