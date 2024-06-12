let timer;
let startTime;
let elapsedTime = 0;
let isRunning = false;
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10).toString().padStart(2, '0');
    const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
    const minutes = Math.floor((time / (1000 * 60)) % 60).toString().padStart(2, '0');
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 10);
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = '00:00:00:00';
    startStopBtn.textContent = 'Start';
    laps.innerHTML = '';
}

function lap() {
    if (isRunning) {
        const lapTime = formatTime(Date.now() - startTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        laps.appendChild(lapItem);
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
