const bodyEl = document.querySelector('body');
const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEl = document.querySelector('button[data-stop]');
let bodyHexColor = null;

startBtnEl.addEventListener('click', onStartBtnClick);
stopBtnEl.addEventListener('click', onStopBtnClick);

function onStartBtnClick(e) {
  startBtnEl.setAttribute('disabled', true);
  stopBtnEl.removeAttribute('disabled');
  bodyHexColor = setInterval(() => {
    bodyEl.style.background = getRandomHexColor();
  }, 1000);
}

function onStopBtnClick(e) {
  stopBtnEl.setAttribute('disabled', true);
  startBtnEl.removeAttribute('disabled');
  clearInterval(bodyHexColor);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
