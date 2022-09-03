"use strict";

///// Selecting elements, IDs & Classes /////

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");

const diceEl = document.querySelector(".dice");

const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

///// Starting Conditions /////

let score, currentScore, activePlayer, playing;

/// initializing the game ///

const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  /// Reset Code ///

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  document.querySelector(`.player--0`).classList.add("player--active");

  score0El.textContent = 0;
  score1El.textContent = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;
};
init();

/// Hidding the dice ///

diceEl.classList.add("hidden");

/// Switching players ///

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player1El.classList.toggle("player--active");
  player0El.classList.toggle("player--active");
};

///// Starting condition /////

score0El.textContent = 0;
score1El.textContent = 0;

/////Roll Dice Button /////

btnRoll.addEventListener("click", function () {
  if (playing) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    console.log(diceNumber);

    /// Show the dice ///

    diceEl.classList.remove("hidden");

    /// Show changing dice image ///

    diceEl.src = `dice-${diceNumber}.png`;

    /// Setting Currentscore ///

    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

///// HOLD Button ///

btnHold.addEventListener("click", function () {
  /// Setting Score ///

  if (playing) {
    score[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

///// NEW GAME button /////
btnNew.addEventListener("click", function () {
  init();
});
