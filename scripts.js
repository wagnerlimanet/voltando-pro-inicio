// Wagner Lima | www.wagnerlima.net | @wagnerlimaNET
// Professor de desenvolvimento web e design na escola iwtraining, especialista em mecanismos de 
// buscas (SEO) e graduando em Sistemas e Mídias Digitais na Universidade Federal do Ceará (UFC).

const cards = document.querySelectorAll('.cartao-de-memoria');
const restartButton = document.getElementById('restart-button');
const overlay = document.getElementById('game-over-overlay');
const gameMessage = document.getElementById('game-message');
let errors = 0;
let correctPairFound = false;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  if (isMatch) {
    disableCards();
    correctPairFound = true;
    setTimeout(showVictoryMessage, 500);
  } else {
    unflipCards();
    errors++;
    if (errors === 3) {
      setTimeout(showFailureMessage, 500);
    }
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function showVictoryMessage() {
  if (correctPairFound) {
    gameMessage.textContent = "PARABÉNS, VOCÊ CONSEGUIU!";
    overlay.classList.remove('hidden');
  }
}

function showFailureMessage() {
  if (!correctPairFound && errors >= 3) {
    gameMessage.textContent = "Ah, que pena; não foi dessa vez.";
    overlay.classList.remove('hidden');
  }
}

function restartGame() {
  errors = 0;
  correctPairFound = false;
  overlay.classList.add('hidden');
  cards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
}

restartButton.addEventListener('click', restartGame);

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
