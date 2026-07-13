/*==================================================
    ГРАНЬ
    Испытание №1
    Проверка памяти
==================================================*/

const tiles = document.querySelectorAll(".memoryTile");

const startButton = document.getElementById("startButton");

const roundText = document.getElementById("roundText");

const successModal = document.getElementById("successModal");
const failModal = document.getElementById("failModal");
successModal.style.display = "none";
failModal.style.display = "none";
const continueButton = document.getElementById("continueButton");
const restartButton = document.getElementById("restartButton");

const beep = document.getElementById("beepSound");
const success = document.getElementById("successSound");
const error = document.getElementById("errorSound");

let sequence = [];
let playerSequence = [];

let currentRound = 1;

let canClick = false;

/*=========================================
            СТАРТ
=========================================*/

startButton.addEventListener("click", () => {
  startButton.style.display = "none";

  currentRound = 1;

  startRound();
});

/*=========================================
        НАЧАТЬ РАУНД
=========================================*/

function startRound() {
  roundText.innerText = `Раунд ${currentRound} из 3`;

  playerSequence = [];
  sequence = [];

  canClick = false;

  let length = currentRound + 2; // 3,4,5

  for (let i = 0; i < length; i++) {
    sequence.push(randomTile());
  }

  setTimeout(showSequence, 700);
}

/*=========================================
        ПОКАЗ ПОСЛЕДОВАТЕЛЬНОСТИ
=========================================*/

function showSequence() {
  let i = 0;

  const interval = setInterval(() => {
    flash(sequence[i]);

    i++;

    if (i >= sequence.length) {
      clearInterval(interval);

      setTimeout(() => {
        canClick = true;
      }, 500);
    }
  }, 700);
}

/*=========================================
        ПОДСВЕТИТЬ
=========================================*/

function flash(index) {
  beep.currentTime = 0;
  beep.play();

  tiles[index].classList.add("active");

  setTimeout(() => {
    tiles[index].classList.remove("active");
  }, 350);
}

/*=========================================
        НАЖАТИЯ ИГРОКА
=========================================*/

tiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    if (!canClick) return;

    let id = Number(tile.dataset.id);

    flash(id);

    playerSequence.push(id);

    let currentIndex = playerSequence.length - 1;

    if (playerSequence[currentIndex] != sequence[currentIndex]) {
      lose();
      return;
    }

    if (playerSequence.length == sequence.length) {
      winRound();
    }
  });
});

/*=========================================
        ПОБЕДА В РАУНДЕ
=========================================*/

function winRound() {
  canClick = false;

  currentRound++;

  if (currentRound > 3) {
    success.play();

    successModal.style.display = "flex";

    return;
  }

  setTimeout(() => {
    startRound();
  }, 1200);
}

/*=========================================
        ПРОИГРЫШ
=========================================*/

function lose() {
  canClick = false;

  error.play();

  failModal.style.display = "flex";
}

/*=========================================
        РЕСТАРТ
=========================================*/

restartButton.addEventListener("click", () => {
  failModal.style.display = "none";

  currentRound = 1;

  startRound();
});

/*=========================================
        ПЕРЕХОД
=========================================*/

continueButton.addEventListener("click", () => {
  document.body.style.opacity = "0";

  setTimeout(() => {
    window.location.href = "electrical.html";
  }, 1200);
});

/*=========================================
        СЛУЧАЙНАЯ КЛЕТКА
=========================================*/

function randomTile() {
  return Math.floor(Math.random() * 9);
}
