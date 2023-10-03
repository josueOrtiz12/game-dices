'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');


let scorePlayer,  currentScore, activePlayer, gamming;


let inicio = function(){
  scorePlayer = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gamming = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0; 
  current1El.textContent = 0;

  diceEl.classList.add('hiden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

}
inicio();

const game = 'game';
console.log(game);


const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1El.classList.toggle('player--active');
  player0El.classList.toggle('player--active');
};

//Add rollin dice functionality
btnRoll.addEventListener('click', function () {
  //no se condiciona porque es trur por defecto
  if (gamming) {
    //1. generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hiden');
    diceEl.src = `dice-${dice}.png`;
    // console.log(dice);

    //3. check for rolled 1: if tru
    if (dice !== 1) {
      // add dice to current score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      // document.getElementById(`current--${activePlayer}`).texPtContent = 0;
      // currentScore = 0;
      //  activePlayer = activePlayer === 0 ? 1 : 0;
      //  player1El.classList.toggle('player--active');
      //  player0El.classList.toggle('player--active');
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (gamming) {
    //1. add current score to active player score
    // scorePlayer[activePlayer] = scorePlayer[activePlayer] + currentScore;
    scorePlayer[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scorePlayer[activePlayer];
    // console.log(
    //   `this is the score player ${activePlayer} , score ${scorePlayer[activePlayer]}`
    // );
    //2 check  if player score is >= 100.
    if (scorePlayer[activePlayer] >= 100) {
      gamming = false;
      // console.log(`the player ${activePlayer} is the winner`);

      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      diceEl.classList.add('hiden');
    } else {
      switchPlayer();
    }
    //switch to next player
  }
});


btnNew.addEventListener('click' , inicio); 
