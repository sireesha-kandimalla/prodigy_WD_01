let timerInterval;
let elapsedTime = 0;
let isPlaying = false;
const laps = [];

const playButton = document.getElementsByClassName("play")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const lapList = document.querySelector(".laps");
const minutesDisplay = document.querySelector(".minute");
const secondsDisplay = document.querySelector(".sec");
const millisecondsDisplay = document.querySelector(".msec");
const clearAllButton = document.querySelector(".lap-clear");

const formatTime = (time) => {
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return {
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
        milliseconds: String(milliseconds).padStart(2, '0')
    };
};

const updateDisplay = () => {
    const { minutes, seconds, milliseconds } = formatTime(elapsedTime);
    minutesDisplay.innerText = minutes;
    secondsDisplay.innerText = seconds;
    millisecondsDisplay.innerText = milliseconds;
};

const startTimer = () => {
    if (!isPlaying) {
        isPlaying = true;
        playButton.innerText = "Pause";
        lapButton.classList.remove("hidden");
        resetButton.classList.remove("hidden");
        timerInterval = setInterval(() => {
            elapsedTime += 10;
            updateDisplay();
        }, 10);
    } else {
        isPlaying = false;
        playButton.innerText = "Play";
        clearInterval(timerInterval);
    }
};

const resetTimer = () => {
    isPlaying = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");
    lapList.innerHTML = '';
    playButton.innerText = "Play";
};

const addLap = () => {
    if (isPlaying) {
        const { minutes, seconds, milliseconds } = formatTime(elapsedTime);
        laps.push(`${minutes}:${seconds}:${milliseconds}`);
        const lapItem = document.createElement("li");
        lapItem.className = "lap-item";
        lapItem.innerHTML = `<span>${laps.length}</span> <span>${minutes}:${seconds}:${milliseconds}</span>`;
        lapList.appendChild(lapItem);
    }
};

playButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);
lapButton.addEventListener("click", addLap);
clearAllButton.addEventListener("click", resetTimer);
