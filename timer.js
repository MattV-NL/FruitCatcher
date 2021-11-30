let x;
let startstop = 0;

function start() {
    x = setInterval(timer, 10);
}

function stop() {
    clearInterval(x);
}

let milisec = 0;
let sec = 0;
let min = 0;

let milisecOut = 0;
let secOut = 0;
let minOut = 0;

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

    document.getElementById('timer-display-milisec').innerHTML = milisecOut;
    document.getElementById('timer-display-sec').innerHTML = secOut;
    document.getElementById('timer-display-min').innerHTML = minOut;
}
function checkTime(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}

function reset() {
    stop();
    milisec = 00;
    sec = 00;
    min = 0;

    document.getElementById('timer-display-milisec').innerHTML = '00';
    document.getElementById('timer-display-sec').innerHTML = '00';
    document.getElementById('timer-display-min').innerHTML = '00';
}

startButton.addEventListener('click', start);
resetButton.addEventListener('click', reset);