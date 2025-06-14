let time = 25 * 60; // 25 minutes in seconds
let timerInterval = null;
let isRunning = false;

function updateDisplay() {
  const minutes = String(Math.floor(time / 60)).padStart(2, '0');
  const seconds = String(time % 60).padStart(2, '0');
  document.getElementById('timer').textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  if (isRunning) return;

  isRunning = true;
  timerInterval = setInterval(() => {
    if (time > 0) {
      time--;
      updateDisplay();
    } else {
      clearInterval(timerInterval);
      alert('Pomodoro complete! Take a short break.');
      isRunning = false;
    }
  }, 1000);
}
