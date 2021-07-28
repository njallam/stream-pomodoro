const urlParams = new URLSearchParams(window.location.search);

const lengths = {
  pomodoro: (Number(urlParams.get('pomodoro')) || 25) * 60,
  shortBreak: (Number(urlParams.get('shortBreak')) || 5) * 60,
  longBreak: (Number(urlParams.get('longBreak')) || 10) * 60,
}

const breakSound = new Audio('sounds/break.mp3');
const workSound = new Audio('sounds/work.mp3');

let mode;
let interval;

let length;
let endTime;

document.querySelector('#mode-buttons').addEventListener('click', function (event) {
  const { mode: newMode } = event.target.dataset;
  if (!newMode) return;

  mode = newMode;

  document.querySelectorAll('button[data-mode]').forEach(e => e.classList.remove('active'));
  document.querySelector(`[data-mode="${mode}"]`).classList.add('active');

  length = lengths[mode];
  startTimer();
});

document.querySelector('#adjust-buttons').addEventListener('click', function (event) {
  const { action } = event.target.dataset;

  switch (action) {
    case "plus":
      if (interval) {
        length += 60;
        endTime += 60000;
      } else {
        length = 60;
        startTimer();
      }
      break;
    case "minus":
      length -= 60;
      endTime -= 60000;
      if (endTime < 0) {
        endTime = 0;
      }
      break;
  }
});

function updateClock(remainingTime) {
  const remainingSeconds = Math.round(remainingTime);
  const minutes = `${Math.floor(remainingSeconds / 60)}`.padStart(2, '0');
  const seconds = `${remainingSeconds % 60}`.padStart(2, '0');
  const time = `${minutes}:${seconds}`;

  document.getElementById('clock').textContent = time;

  const text = mode === 'pomodoro' ? 'STUDY TIME' : 'BREAK TIME';
  document.title = `${time} - ${text}`;
  document.getElementById('text').textContent = text;

  const progress = length == 0 ? 1 : ((length - remainingTime) / length)

  document.getElementById('progress-value').style.width = progress * 100 + "vw";
}

function startTimer() {
  endTime = Date.now() + length * 1000;

  updateClock(length);
  clearInterval(interval);
  interval = setInterval(function () {
    let remainingTime = (endTime - Date.now()) / 1000;
    if (remainingTime <= 0) {
      remainingTime = 0;
      clearInterval(interval);
      interval = null;
      if (mode === 'pomodoro') {
        breakSound.play();
      } else {
        workSound.play();
      }
    }
    updateClock(remainingTime);
  }, 100);
}
