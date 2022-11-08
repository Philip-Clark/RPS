function renderFxToImg(imgId, duration, fxFolder, frameCount, frameName, delay) {
  let currentFrame = 0;
  setTimeout(() => {
    let interval = setInterval(() => {
      updateFrame(imgId, fxFolder, frameName, frameCount, currentFrame, () => {
        clearInterval(interval);
      });
      currentFrame++;
    }, duration / frameCount);
  }, delay);
}

function updateFrame(imgId, fxFolder, frameName, frameCount, _currentFrame, callBack) {
  let nextFrame = _currentFrame + 1;
  let img = document.getElementById(imgId);
  if (nextFrame < frameCount) {
    img.src = fxFolder + '/' + frameName + nextFrame + '.png';
  } else {
    callBack();
  }
}
