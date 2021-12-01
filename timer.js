let x;
let startstop = 0;

function startTimer() {
    x = setInterval(timer, 10);
}

function stopTimer() {
    clearInterval(x);
}

let milisec = 0;
let sec = 0;
let min = 0;

let milisecOut = 0;
let secOut = 0;
let minOut = 0;

let timerMilisec = document.getElementById('timer-display-milisec');
let timerSec = document.getElementById('timer-display-sec');
let timerMin = document.getElementById('timer-display-min');

function timer() {
    milisecOut = checkTime(milisec);
    secOut = checkTime(sec);
    minOut = checkTime(min);

    milisec = ++ milisec;

    if (milisec === 100) {
        milisec = 0;
        sec = ++sec;
    }

    if (sec == 60) {
        min = ++min;
        sec = 0;
    }

    timerMilisec.innerHTML = milisecOut;
    timerSec.innerHTML = secOut;
    timerMin.innerHTML = minOut;
}
function checkTime(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}

function resetTimer() {
    stopTimer();
    milisec = 00;
    sec = 00;
    min = 0;

    timerMilisec.innerHTML = '00';
    timerSec.innerHTML = '00';
    timerMin.innerHTML = '00';
}