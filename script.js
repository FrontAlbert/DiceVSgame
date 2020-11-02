'use strict';

let currentScore, activePlayer, totalScore, gamePlaying, winningScore;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
};

// ROLL DICE FUNCTION
const rollDice = function () {
  if (gamePlaying) {
    let dice;
    // Generate Dice Random  Number
    dice = Math.trunc(Math.random() * 6) + 1;
    document.querySelector('.dice').classList.remove('hidden');
    console.log(dice);
    // Make the Dice Image the right one
    document.querySelector('.dice').src = `dice-${dice}.png`;
    //Make the currentScore the right one / if it is one 1, next Player
    if (dice !== 1) {
      currentScore = currentScore + dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
};

// HOLD FUNCTION
const hold = function () {
  if (gamePlaying) {
    totalScore[activePlayer] = currentScore + totalScore[activePlayer];
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScore[activePlayer];

    if (totalScore[activePlayer] >= winningScore) {
      // Declare Winner
      document.querySelector('.dice').classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.getElementById(`name--${activePlayer}`).textContent = 'WINNER';
      gamePlaying = false;
    } else {
      switchPlayer();
    }
  }
};



// NEW GAME FUNCTION
const init = function () {
  currentScore = 0;
  activePlayer = 0;
  totalScore = [0, 0];
  gamePlaying = true;
  document.querySelector('.dice').classList.add('hidden');
  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  winningScore = prompt(`How Many Points We Playing To?`);
  console.log(`Winning Score is ${winningScore}`);
};
//  IF you add Number, game will  not work

// BUTTONS >>> ROLL > NEW GAME > HOLD
document.querySelector('.btn--roll').addEventListener('click', rollDice);
document.querySelector('.btn--new').addEventListener('click', init);
document.querySelector('.btn--hold').addEventListener('click', hold);

init();
