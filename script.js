let poundCount = 3;

const handMap = ['rock', 'paper', 'scissor'];

let aiScore = 0;
let playerScore = 0;

function startRound(choice) {
  let buttons = [...document.getElementsByClassName('button')];
  console.log(buttons);

  buttons.forEach((button) => {
    button.disabled = true;

    setTimeout(() => {
      button.disabled = false;
    }, 1500);
  });

  poundCount = 3;
  hideHand('ai', 'fists');

  showHand('ai', 'fist');
  hideHand('ai', 'paper');
  hideHand('ai', 'scissor');

  hideHand('player', 'fists');

  showHand('player', 'fist');
  hideHand('player', 'paper');
  hideHand('player', 'scissor');

  playAnimation(choice);
}

function playAnimation(choice) {
  let playerChoice = choice;
  let fistArray = [...document.getElementsByClassName('fists')];

  document.body.style.animation = 'screenShake 2000ms linear normal forwards';

  fistArray.forEach((element) => {
    element.style.animation = 'pound 2000ms linear normal forwards';
  });
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
  if (wrapNumber(playerNumber) == aiNumber) {
    playerScore++;

    document.getElementById('player-images').style.animation =
      'roundWin 1500ms 200ms ease forwards';
    setTimeout(function () {
      document.getElementById('player-images').style.animation = '';
      document.getElementById('player-score').innerHTML = playerScore;
    }, 1800);
  } else if (wrapNumber(aiNumber) == playerNumber) {
    aiScore++;

    document.getElementById('ai-images').style.animation = 'roundWinAi 1500ms 200ms ease forwards';
    setTimeout(function () {
      document.getElementById('ai-images').style.animation = '';
      document.getElementById('ai-score').innerHTML = aiScore;
    }, 1800);
  }

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
  }, 1810);
}

function wrapNumber(input) {
  if (input == 0) {
    return 2;
  } else {
    return input - 1;
  }
}
