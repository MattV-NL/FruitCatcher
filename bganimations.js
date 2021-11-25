const butterfly = document.getElementById('butterfly');
const bird = document.getElementById('bird');
const squirrel = document.getElementById('squirrel');

animationTimer = null;
removeAnimation = null;

function drawButterfly() {
    animationTimer = setInterval(() => {
        butterfly.style.display = 'flex';
    }, 10000);
}

function removeButterfly() {
    removeAnimation = setInterval(() => {
        butterfly.style.display = 'none';
    }, 14000);
}

function drawBird() {
    animationTimer = setInterval(() => {
        bird.style.display = 'flex';
    }, 15000);
}

function removeBird() {
    removeAnimation = setInterval(() => {
        bird.style.display = 'none';
    }, 18000);
}

function drawSquirrel() {
    animationTimer = setInterval(() => {
        squirrel.style.display = 'flex';
    }, 5000);
}

function removeSquirrel() {
    removeAnimation = setInterval(() => {
        squirrel.style.display = 'none';
    }, 9000);
}

drawButterfly();
drawBird();
drawSquirrel();
removeButterfly();
removeBird();
removeSquirrel();