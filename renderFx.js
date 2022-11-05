function renderFxToImg(imgId, duration, fxFolder, frameCount, frameName, delay) {
  let currentFrame = 0;
  setTimeout(() => {
    setInterval(() => {
      updateFrame(imgId, fxFolder, frameName, frameCount, currentFrame);
      currentFrame++;
    }, duration / frameCount);
  }, delay);
}

function updateFrame(imgId, fxFolder, frameName, frameCount, _currentFrame) {
  let nextFrame = _currentFrame + 1;
  let img = document.getElementById(imgId);
  if (nextFrame < frameCount) {
    img.src = fxFolder + '/' + frameName + nextFrame + '.png';
  }
}
