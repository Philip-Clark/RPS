let poundCount = 3;

const handMap = ['rock', 'paper', 'scissor'];

let aiScore = 0;
let playerScore = 3;
let winStreak = 0;
let choice = '';

let buttons = [];

// Timing
const timeBetweenPounds = 200;
const resetTime = 100;
const attackDelay = 300;
const attackSpeed = 500;
const delayEndScreen = 400;
const poundSpeed = 300;

const punch1 = preloadSound('punch1.mp3');
const punch2 = preloadSound('punch2.mp3');
const punch3 = preloadSound('punch3.mp3');
const aiScoreAudio = preloadSound('aiScore.mp3');
const draw = preloadSound('draw.mp3');
const playerScoreAudio = preloadSound('playerScore.mp3');
const win = preloadSound('Win.mp3');
const lose = preloadSound('Lose.mp3');
const audios = [punch1, punch2, punch3];

function onload() {
  document.getElementById('rockBttn').addEventListener('click', () => startRound('rock'));
  document.getElementById('scissorBttn').addEventListener('click', () => startRound('scissor'));
  document.getElementById('paperBttn').addEventListener('click', () => startRound('paper'));
  buttons = [...document.getElementsByClassName('button')];

  restart();
}
function restart() {
  playAnimation(
    'endScreen',
    'hideEndScreen cubic-bezier(0.42, -0.02, 0.82, 0.85) forwards',
    100,
    false
  );

  buttons.forEach((button) => (button.disabled = false));

  aiScore = 0;
  playerScore = 0;
  updateScores();
  resetHands();

  setTimeout(() => {
    document.getElementById('lose').style.visibility = 'hidden';
    document.getElementById('win').style.visibility = 'hidden';
  }, 150);
}

function startRound(_choice) {
  choice = _choice;
  buttons.forEach((button) => {
    button.disabled = true;
  });

  poundCount = 3;
  resetHands();

  animateRound();
}

function animateRound() {
  let fistArray = [...document.getElementsByClassName('fists')];

  playAnimation('screenShake', 'screenShake ease', poundSpeed);

  fistArray.forEach((element) => {
    element.style.animation = 'pound ' + poundSpeed + 'ms linear normal forwards';
  });

  renderFxToImg('playerDust', 200, 'assets/vfx/pound', 11, 'frame_0', poundSpeed - 50);
  renderFxToImg('AiDust', 200, 'assets/vfx/pound', 11, 'frame_0', poundSpeed - 50);

  setTimeout(() => {
    let audio = audios[Math.floor(Math.random() * 3)];
    playSound(audio);
  }, poundSpeed - 140);
  // reset animations
  setTimeout(() => {
    fistArray.forEach((element) => {
      element.style.animation = '';
    });
  }, poundSpeed);
  setTimeout(function () {
    poundCount -= 1;

    if (poundCount > 0) {
      animateRound();
    }
    if (poundCount == 1) {
      setTimeout(showHands, poundSpeed);
    }
  }, poundSpeed + timeBetweenPounds);
}

function showHands() {
  if (choice != 'rock') {
    hideHand('player', 'fist');
  }
  showHand('player', choice);

  let randChoice = parseInt(Math.random() * 3);
  if (randChoice != 0) {
    hideHand('ai', 'fist');
  }
  showHand('ai', handMap[randChoice]);

  determineWinner(randChoice, handMap.indexOf(choice));
}

function determineWinner(aiNumber, playerNumber) {
  // play score animation
  setTimeout(() => {
    // player's round
    if (wrapNumber(playerNumber - 1) == aiNumber) {
      playerScore++;
      playSound(playerScoreAudio);
      playAnimation('player-score', 'score forwards', 200);
      playAnimation('player-images', 'roundWin forwards', attackSpeed);
    }
    // ai's round
    else if (wrapNumber(aiNumber - 1) == playerNumber) {
      aiScore++;
      playSound(aiScoreAudio);
      playAnimation('ai-score', 'score forwards', 200);
      playAnimation('ai-images', 'roundWin forwards', attackSpeed);
    }
    // draw
    else {
      playSound(draw, 0.2);

      playAnimation('player-images', 'draw forwards', attackSpeed);
      playAnimation('ai-images', 'draw forwards', attackSpeed);
    }
    updateScores();
  }, attackDelay);

  // reset play field
  setTimeout(function () {
    // Check for win
    if (aiScore > 2 || playerScore > 2) {
      setTimeout(() => {
        playAnimation('endScreen', 'endScreen cubic-bezier(0.42, -0.02, 0.82, 0.85) forwards', 100);
        if (playerScore > 2) {
          document.getElementById('win').style.visibility = 'visible';
          winStreak++;
          document.getElementById('winStreak').innerHTML = 'Win Streak: ' + winStreak;
          playSound(win);
        } else {
          document.getElementById('lose').style.visibility = 'visible';
          winStreak = 0;
          document.getElementById('winStreak').innerHTML = 'Win Streak: ' + winStreak;
          playSound(lose, 0.8);
        }
      }, delayEndScreen);
    } else {
      buttons.forEach((button) => (button.disabled = false));
      resetHands();
    }

    updateScores();
  }, resetTime + attackDelay + attackSpeed);
}

function hideHand(parent, _choice) {
  let parentNode = document.getElementById(parent);
  let typeArray = [...parentNode.getElementsByClassName(_choice)];

  typeArray[0].style.visibility = 'hidden';
}

function showHand(parent, _choice) {
  let parentNode = document.getElementById(parent);
  let typeArray = [...parentNode.getElementsByClassName(_choice)];
  typeArray[0].style.visibility = 'visible';
}

function updateScores() {
  document.getElementById('ai-score').innerHTML = aiScore;
  document.getElementById('player-score').innerHTML = playerScore;
}

function playAnimation(id, animation, duration, reset = true) {
  let style = document.getElementById(id).style;
  style.animation = animation;
  style.animationDuration = duration + 'ms';

  if (reset) {
    setTimeout(() => {
      style.animation = '';
    }, duration);
  }
}

function playSound(audio, volume = 1) {
  audio.volume = volume;
  audio.currentTime = 0;
  audio.play();
}

function preloadSound(file) {
  let audio = new Audio('assets/sounds/' + file);
  audio.preload = 'preload';
  return audio;
}

function resetHands() {
  hideHand('ai', 'fists');
  hideHand('ai', 'paper');
  hideHand('ai', 'scissor');
  hideHand('player', 'fists');
  hideHand('player', 'paper');
  hideHand('player', 'scissor');
  showHand('player', 'fist');
  showHand('ai', 'fist');
}

function wrapNumber(input) {
  if (input == -1) {
    return 2;
  } else {
    return input;
  }
}

// debug commands

function playerPoint() {
  determineWinner(0, 1);
}
function aiPoint() {
  determineWinner(1, 0);
}
function makeWin() {
  playerScore = 2;
  determineWinner(0, 1);
}

function makeLose() {
  aiScore = 2;
  determineWinner(1, 0);
}
