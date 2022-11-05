let poundCount = 3;

const handMap = ['rock', 'paper', 'scissor'];

let aiScore = 0;
let playerScore = 0;

const audios = [
  new Audio('assets/sounds/punch1.mp3'),
  new Audio('assets/sounds/punch2.mp3'),
  new Audio('assets/sounds/punch3.mp3'),
];

function startRound(choice) {
  let buttons = [...document.getElementsByClassName('button')];
  console.log(buttons);

  buttons.forEach((button) => {
    button.disabled = true;

    setTimeout(() => {
      button.disabled = false;
      resetHands();
    }, 1500);
  });

  poundCount = 3;
  resetHands();

  playAnimation(choice);
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

function playAnimation(choice) {
  let playerChoice = choice;
  let fistArray = [...document.getElementsByClassName('fists')];

  document.body.style.animation = 'screenShake 2000ms linear normal forwards';
  let audio = audios[Math.floor(Math.random() * 3)];

  fistArray.forEach((element) => {
    element.style.animation = 'pound 2000ms linear normal forwards';
  });
  renderFxToImg('playerDust', 300, 'assets/vfx/pound', 11, 'frame_0', 200);
  renderFxToImg('AiDust', 300, 'assets/vfx/pound', 11, 'frame_0', 200);
  audio.play();
  audio.currentTime = 0;

  setTimeout(function () {
    fistArray.forEach((element) => {
      element.style.animation = '';
      document.body.style.animation = '';
    });
    poundCount -= 1;
    if (poundCount > 0) {
      playAnimation(choice);
    }
  }, 350);

  setTimeout(function () {
    if (poundCount == 1) {
      console.log(playerChoice);
      if (playerChoice != 'rock') {
        hideHand('player', 'fist');
      }
      showHand('player', playerChoice);

      let randChoice = parseInt(Math.random() * 3);
      if (randChoice != 0) {
        hideHand('ai', 'fist');
      }
      showHand('ai', handMap[randChoice]);

      determineWinner(randChoice, handMap.indexOf(playerChoice));
    }
  }, 180);
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

function determineWinner(aiNumber, playerNumber) {
  const resetTime = 900;
  const delayAnimation = 200;
  setTimeout(() => {
    if (wrapNumber(playerNumber) == aiNumber) {
      playerScore++;

      document.getElementById('player-images').style.animation =
        'roundWin 800ms 100ms ease forwards';
    } else if (wrapNumber(aiNumber) == playerNumber) {
      aiScore++;

      document.getElementById('ai-images').style.animation = 'roundWinAi 800ms 100ms ease forwards';
    } else {
      document.getElementById('player-images').style.animation = 'draw 500ms  forwards';
      document.getElementById('ai-images').style.animation = 'drawAi 500ms   forwards';
    }
  }, delayAnimation);
  setTimeout(function () {
    document.getElementById('player-images').style.animation = '';
    document.getElementById('player-score').innerHTML = playerScore;
    document.getElementById('ai-images').style.animation = '';
    document.getElementById('ai-score').innerHTML = aiScore;
  }, resetTime);

  setTimeout(function () {
    if (aiScore > 2 || playerScore > 2) {
      alert('We have a winner!');
      aiScore = 0;
      playerScore = 0;
      setTimeout(function () {
        document.getElementById('ai-score').innerHTML = aiScore;
        document.getElementById('player-score').innerHTML = playerScore;
      }, 0);
    }
  }, 1100);
}

function wrapNumber(input) {
  if (input == 0) {
    return 2;
  } else {
    return input - 1;
  }
}
