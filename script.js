const urlParams = new URLSearchParams(window.location.search);

const lengths = {
  pomodoro: (Number.parseInt(urlParams.get('pomodoro')) || 25) * 60,
  shortBreak: (Number.parseInt(urlParams.get('shortBreak')) || 5) * 60,
  longBreak: (Number.parseInt(urlParams.get('longBreak')) || 10) * 60,
}

const breakSound = new Audio('sounds/break.mp3');
const workSound = new Audio('sounds/work.mp3');

let mode;
let remainingTime;
let interval;

document.querySelector('.btn-group').addEventListener('click', function (event) {
  const { mode: newMode } = event.target.dataset;
  if (!newMode) return;

  mode = newMode;
  remainingTime = lengths[mode];

  document.querySelectorAll('button[data-mode]').forEach(e => e.classList.remove('active'));
  document.querySelector(`[data-mode="${mode}"]`).classList.add('active');

  startTimer();
});

function updateClock() {
  const remainingSeconds = Math.round(remainingTime);
  const minutes = `${Math.floor(remainingSeconds / 60)}`.padStart(2, '0');
  const seconds = `${remainingSeconds % 60}`.padStart(2, '0');
  const time = `${minutes}:${seconds}`;

  document.getElementById('clock').textContent = time;

  const text = mode === 'pomodoro' ? 'WORK TIME' : 'BREAK TIME';
  document.title = `${time} - ${text}`;
  document.getElementById('text').textContent = text;

  document.getElementById('progress-value').style.width =
    ((lengths[mode] - remainingTime) / lengths[mode]) * 100 + "vw";
}

function startTimer() {
  const endTime = Date.now() + remainingTime * 1000;

  updateClock();
  clearInterval(interval);
  interval = setInterval(function () {
    remainingTime = (endTime - Date.now()) / 1000;
    if (remainingTime <= 0) {
      remainingTime = 0;
      clearInterval(interval);
      (mode === 'pomodoro' ? breakSound : workSound).play();
    }
    updateClock();
  }, 100);
}
