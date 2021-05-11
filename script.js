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

document.querySelector('.btn-group').addEventListener('click', function (event) {
  const { mode: newMode } = event.target.dataset;
  if (!newMode) return;

  mode = newMode;

  document.querySelectorAll('button[data-mode]').forEach(e => e.classList.remove('active'));
  document.querySelector(`[data-mode="${mode}"]`).classList.add('active');

  startTimer();
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

  document.getElementById('progress-value').style.width =
    ((lengths[mode] - remainingTime) / lengths[mode]) * 100 + "vw";
}

function startTimer() {
  const endTime = Date.now() + lengths[mode] * 1000;

  updateClock(lengths[mode]);
  clearInterval(interval);
  interval = setInterval(function () {
    let remainingTime = (endTime - Date.now()) / 1000;
    if (remainingTime <= 0) {
      remainingTime = 0;
      clearInterval(interval);
      if (mode === 'pomodoro') {
        breakSound.play();
      } else {
        workSound.play();
      }
    }
    updateClock(remainingTime);
  }, 100);
}
