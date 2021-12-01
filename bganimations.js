const butterfly = document.getElementById('butterfly');
const butterfly2 = document.getElementById('butterfly2');
const butterfly3 = document.getElementById('butterfly3');
const butterfly4 = document.getElementById('butterfly4');
const butterfly5 = document.getElementById('butterfly5');
const bird = document.getElementById('bird');
const squirrel = document.getElementById('squirrel');

animationTimer = null;
removeAnimation = null;

function drawButterfly() {
    animationTimer = setInterval(() => {
        butterfly.style.display = 'flex';
    }, 8000);
    animationTimer = setInterval(() => {
        butterfly2.style.display = 'flex';
    }, 5000);
    animationTimer = setInterval(() => {
        butterfly3.style.display = 'flex';
    }, 12000);
    animationTimer = setInterval(() => {
        butterfly4.style.display = 'flex';
    }, 15000);
    animationTimer = setInterval(() => {
        butterfly5.style.display = 'flex';
    }, 18000);
}

function removeButterfly() {
    removeAnimation = setInterval(() => {
        butterfly.style.display = 'none';
    }, 11000);
    removeAnimation = setInterval(() => {
        butterfly2.style.display = 'none';
    }, 8000);
    removeAnimation = setInterval(() => {
        butterfly3.style.display = 'none';
    }, 15000);
    removeAnimation = setInterval(() => {
        butterfly4.style.display = 'none';
    }, 18000);
    removeAnimation = setInterval(() => {
        butterfly5.style.display = 'none';
    }, 21000);

}

function drawBird() {
    animationTimer = setInterval(() => {
        bird.style.display = 'flex';
    }, 15000);
}

function removeBird() {
    removeAnimation = setInterval(() => {
        bird.style.display = 'none';
    }, 17500);
}

function drawSquirrel() {
    animationTimer = setInterval(() => {
        squirrel.style.display = 'flex';
    }, 17000);
}

function removeSquirrel() {
    removeAnimation = setInterval(() => {
        squirrel.style.display = 'none';
    }, 24000);
}

drawButterfly();
drawBird();
drawSquirrel();
removeButterfly();
removeBird();
removeSquirrel();