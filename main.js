const startButton = document.querySelector("#start");
const endButton = document.querySelector("#stop");
const closeButton = document.querySelector("#close");
const circles = document.querySelectorAll(".circle");
const flowers = document.querySelectorAll(".flower");

const overlay = document.querySelector("#overlay");

const scoreText = document.querySelector("#score");
const resultText = document.querySelector("#result");

const startMusic = document.querySelector("#startMusic");
const failMusic = document.querySelector("#failMusic");

let active = 0;
let score = 0;
let pace = 1000;
let rounds = 0;
let timer;
let gameRun = false;

const getRndInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
circles.forEach((circle, i) => {
  circle.addEventListener("click", () => clickedCircle(i));
});

const clickedCircle = (i) => {
  if (gameRun === false) {
    return;
  }
  if (i !== active) {
    endGame();
  } else {
    score++;
    rounds--;
    scoreText.textContent = score;
  }
};

const startGame = () => {
  gameRun = true;
  startButton.style.display = "none";
  endButton.style.display = "inline";
  startMusic.currentTime = 0;
  startMusic.play();

  for (let i = 0; i < flowers.length; i++) {
    flowers[i].style.pointEvents = "auto";
  }

  let nextActive = pickNew(active);

  flowers[nextActive].classList.toggle("active");
  flowers[active].classList.remove("active");

  active = nextActive;

  timer = setTimeout(startGame, pace);
  pace = pace - 10;
  if (rounds >= 3) {
    endGame();
  }
  rounds++;

  function pickNew(active) {
    let nextActive = getRndInt(0, 3);

    if (nextActive != active) {
      return nextActive;
    } else {
      return pickNew(active);
    }
  }
};

const endGame = () => {
  startMusic.pause();
  startMusic.currentTime = 0;
  failMusic.play();
  console.log("game ended");
  clearTimeout(timer);
  overlay.style.visibility = "visible";
  if (score === 0) {
    resultText.textContent = `Your score is ${score}. Oh come on, you can do better than this!`;
  } else if (score > 1 || score < 10) {
    resultText.textContent = `Your final score is ${score}, not bad, not bad at all`;
  } else if (score > 11) {
    resultText.textContent = `Your final score is ${score}, now we are talking`;
  }
};

const reloadGame = () => {
  window.location.reload();
};

startButton.addEventListener("click", startGame);
endButton.addEventListener("click", endGame);
closeButton.addEventListener("click", reloadGame);
