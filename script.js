let poundCount = 3;

const handMap = ['rock', 'paper', 'scissor'];

let aiScore = 0;
let playerScore = 0;
let winStreak = 0;
let choice = '';
const audios = [
  new Audio('assets/sounds/punch1.mp3'),
  new Audio('assets/sounds/punch2.mp3'),
  new Audio('assets/sounds/punch3.mp3'),
];

let buttons = [];

// Timing
const timeBetweenPounds = 200;
const resetTime = 10;
const attackDelay = 100;
const attackSpeed = 500;
const delayEndScreen = 400;
const poundSpeed = 200;

function restart() {
  buttons = [...document.getElementsByClassName('button')];
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

  document.body.style.animation = 'screenShake' + poundSpeed + 'ms linear normal forwards';

  let audio = audios[Math.floor(Math.random() * 3)];
  fistArray.forEach((element) => {
    element.style.animation = 'pound ' + poundSpeed + 'ms linear normal forwards';
  });

  renderFxToImg('playerDust', 200, 'assets/vfx/pound', 11, 'frame_0', poundSpeed - 50);
  renderFxToImg('AiDust', 200, 'assets/vfx/pound', 11, 'frame_0', poundSpeed - 50);

  setTimeout(() => {
    audio.currentTime = 0;
    audio.play();
  }, poundSpeed - 120);

  setTimeout(function () {
    fistArray.forEach((element) => {
      element.style.animation = '';
    });
    document.body.style.animation = '';
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
      playAnimation('player-images', 'roundWin forwards', attackSpeed);
    }
    // ai's round
    else if (wrapNumber(aiNumber - 1) == playerNumber) {
      aiScore++;
      playAnimation('ai-images', 'roundWinAi forwards', attackSpeed);
    }
    // draw
    else {
      playAnimation('player-images', 'draw forwards', attackSpeed);
      playAnimation('ai-images', 'drawAi forwards', attackSpeed);
    }
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
        } else {
          document.getElementById('lose').style.visibility = 'visible';
          winStreak = 0;
          document.getElementById('winStreak').innerHTML = 'Win Streak: ' + winStreak;
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
