const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let intervalID = null;

startBtn.addEventListener('click', handleClickOnStart);
stopBtn.addEventListener('click', handleClickOnStop);

function handleClickOnStart() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  intervalID = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function handleClickOnStop() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(intervalID);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
