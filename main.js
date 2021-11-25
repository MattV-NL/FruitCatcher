const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//setting a drop position for each fruit so that they act indipendantly
let randomDropPositionApple = Math.floor(Math.random() * 750);
let nextRandomDropPositionApple = 0;
let randomDropPositionOrange = Math.floor(Math.random() * 750);
let nextRandomDropPositionOrange = 0;
let randomDropPositionWatermelon = Math.floor(Math.random() * 750);
let nextRandomDropPositionWatermelon = 0;
let randomDropPositionPineapple = Math.floor(Math.random() * 750);
let nextRandomDropPositionPineapple = 0;
let randomDropPositionBomb = Math.floor(Math.random() * 750);
let nextRandomDropPositionBomb = 0;

//adding images for game
const appleImg = document.getElementById('apple');
const orangeImg = document.getElementById('orange');
const watermelonImg = document.getElementById('watermelon');
const pineappleImg = document.getElementById('pineapple');
const bombImg = document.getElementById('bomb');
const basketImg = document.getElementById('basket');
const pauseImg = document.getElementById('pause-icon');

//adding sounds to game
const explosionSound = document.getElementById('explosion-sound');
const gameoverSound = document.getElementById('gameover-sound');
const scorePointSound = document.getElementById('score-points-sound');
const missFruitSound = document.getElementById('miss-sound');

//setting up score for the game
let score = 0;
const scoreDisplay = document.getElementById('score-display');

//setting up lives for the game
let lives = 3;
const livesDisplay = document.getElementById('lives-display');

//create fruit objects
const apple = {
    x: randomDropPositionApple,
    y: -55,
    width: 50,
    height: 55,
    dy: 1.8,
    image: appleImg,
    fruitScore: 50,
    isBomb: false
}

const orange = {
    x: randomDropPositionOrange,
    y: -55,
    width: 50,
    height: 55,
    dy: 1.8,
    image: orangeImg,
    fruitScore: 75,
    isBomb: false
}

const watermelon = {
    x: randomDropPositionWatermelon,
    y: -60,
    width: 80,
    height: 60,
    dy: 1.8,
    image: watermelonImg,
    fruitScore: 100,
    isBomb: false
}

const pineapple = {
    x: randomDropPositionPineapple,
    y: -80,
    width: 70,
    height: 80,
    dy: 1.8,
    image: pineappleImg,
    fruitScore: 80,
    isBomb: false
}

const bomb = {
    x: randomDropPositionBomb,
    y: -80,
    width: 80,
    height: 80,
    dy: 2,
    image: bombImg,
    fruitScore: 0,
    isBomb: true
}

const player = {
    x: canvas.width / 2 - 60,
    y: canvas.height - 80,
    width: 120,
    height: 80,
    speed: 6,
    dx: 0,
    image: basketImg
}

//functions to draw the fruits and the bomb
function drawApple() {
    ctx.drawImage(apple.image, apple.x, apple.y, apple.width, apple.height);
}

function drawOrange() {
    ctx.drawImage(orange.image, orange.x, orange.y, orange.width, orange.height);
}

function drawWatermelon() {
    ctx.drawImage(watermelon.image, watermelon.x, watermelon.y, watermelon.width, watermelon.height);
}

function drawPineapple() {
    ctx.drawImage(pineapple.image, pineapple.x, pineapple.y, pineapple.width, pineapple.height);
}

function drawBomb() {
    ctx.drawImage(bomb.image, bomb.x, bomb.y, bomb.width, bomb.height);
}

//draw player
function drawPlayer() {
    ctx.drawImage(player.image, player.x, player.y, player.width, player.height);
}

drawPlayer();

//apend the position to the movement speed
function movePlayer() {
    player.x += player.dx;
    detectWalls();
}

//detect walls so player wont go beyond boundary
function detectWalls() {
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }
}

//bring the fruit back to the top of the screen and applies a delay so that the game is not to hectic as well as set a new drop position
function newApple() {
    apple.y = -55;
    setTimeout(() => {
        apple.y = 0
    }, 3000);
    nextRandomDropPositionApple = Math.floor(Math.random() * 750);
    randomDropPositionApple = nextRandomDropPositionApple;
    apple.x = randomDropPositionApple;
}

function newOrange() {
    orange.y = -55;
    setTimeout(() => {
        orange.y = 0;
    }, 3000);
    nextRandomDropPositionOrange = Math.floor(Math.random() * 750);
    randomDropPositionOrange = nextRandomDropPositionOrange;
    orange.x = randomDropPositionOrange;
}

function newWatermelon() {
    watermelon.y = -60;
    setTimeout(() => {
        watermelon.y = 0;
    }, 3000);
    nextRandomDropPositionWatermelon = Math.floor(Math.random() * 750);
    randomDropPositionWatermelon = nextRandomDropPositionWatermelon;
    watermelon.x = randomDropPositionWatermelon;
}

function newPineapple() {
    pineapple.y = -80;
    setTimeout(() => {
        pineapple.y = 0
    }, 3000);
    nextRandomDropPositionPineapple = Math.floor(Math.random() * 750);
    randomDropPositionPineapple = nextRandomDropPositionPineapple;
    pineapple.x = randomDropPositionPineapple;
}

function newBomb() {
    bomb.y = -80;
    setTimeout(() => {
        bomb.y = 0;
    }, 4000);
    nextRandomDropPositionBomb = Math.floor(Math.random() * 750);
    randomDropPositionBomb = nextRandomDropPositionBomb;
    bomb.x = randomDropPositionBomb;
}

//create a condition so that the fruit does not drop out of order and waits for its turn to fall
function dropApple() {
    if (apple.y >= 0) {
        apple.y += apple.dy;
    }
}

function dropOrange() {
    if (orange.y >= 0) {
        orange.y += orange.dy;
    }
}

function dropWatermelon() {
    if (watermelon.y >= 0) {
        watermelon.y += watermelon.dy;
    }
}

function dropPineapple() {
    if (pineapple.y >= 0) {
        pineapple.y += pineapple.dy;
    }
}

function dropBomb() {
    if (bomb.y >= 0) {
        bomb.y += bomb.dy;
    }
}

function initialAppleDrop() {
    apple.y = 0;
}

function initialOrangeDrop() {
    orange.y = 0;
}

function initialWatermelonDrop() {
    watermelon.y = 0;
}

function initialPineappleDrop() {
    pineapple.y = 0;
}

function initialBombDrop() {
    bomb.y = 0;
}

//set the timeout to drop the fruits staggered instead of all at once
function firstDrop() {
    appleTimeout = setTimeout(initialAppleDrop, 100);
    orangeTimeout = setTimeout(initialOrangeDrop, 3000);
    pineappleTimeout = setTimeout(initialPineappleDrop, 6000);
    bombTimeout = setTimeout(initialBombDrop, 15000);
    watermelonTimeout = setTimeout(initialWatermelonDrop, 20000);
}

//add score to the scoreboard base on what is caught in the basket
function newAddScore() {
    if (apple.x + apple.width >= player.x && apple.x < player.x + player.width && apple.y + apple.height > player.y) {
        score += apple.fruitScore;
        scorePointSound.play();
        newApple();
    } else if (orange.x + orange.width >= player.x && orange.x < player.x + player.width && orange.y + orange.height > player.y) {
        score += orange.fruitScore;
        scorePointSound.play();
        newOrange();
    } else if (watermelon.x + watermelon.width >= player.x && watermelon.x < player.x + player.width && watermelon.y + watermelon.height > player.y){
        score += watermelon.fruitScore;
        scorePointSound.play();
        newWatermelon();
    } else if (pineapple.x + pineapple.width >= player.x && pineapple.x < player.x + player.width && pineapple.y + pineapple.height > player.y) {
        score += pineapple.fruitScore;
        scorePointSound.play();
        newPineapple();
    } else if (bomb.x + bomb.width >= player.x && bomb.x < player.x + player.width && bomb.y + bomb.height > player.y) {
        lives -= 1;
        livesDisplay.innerHTML = lives;
        explosionSound.play();
        newBomb();
    }
    scoreDisplay.innerHTML = score;
}

//when a fruit or bomb misses the basket
function missedFruit() {
    if (apple.y > canvas.height) {
        lives -= 1;
        livesDisplay.innerHTML = lives;
        missFruitSound.play();
        newApple();
    } else if (orange.y > canvas.height) {
        lives -= 1;
        livesDisplay.innerHTML = lives;
        missFruitSound.play();
        newOrange();
    } else if (watermelon.y > canvas.height) {
        lives -= 1;
        livesDisplay.innerHTML = lives;
        missFruitSound.play();
        newWatermelon();
    } else if (pineapple.y > canvas.height) {
        lives -= 1;
        livesDisplay.innerHTML = lives;
        missFruitSound.play();
        newPineapple();
    } else if (bomb.y > canvas.height) {
        newBomb();
    }
}

//set up game over
let isRunning = true;

function gameOver() {
    if (lives < 1) {
        ctx.font = '64px Arial';
        ctx.fillText('GAME OVER', 200, 400);
        isRunning = false;
        gameoverSound.play();
    }
}

//updating the canvas to allow for smooth animation
function update() {
    if (isRunning) {
    //clearing the canvas so that the original image is erased
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawApple();
    drawOrange();
    drawWatermelon();
    drawPineapple();
    drawBomb();
    drawPlayer();
    movePlayer();
    dropApple();
    dropOrange();
    dropWatermelon();
    dropPineapple();
    dropBomb();
    newAddScore();
    missedFruit();
    gameOver();
    requestAnimationFrame(update);
    startButton.removeEventListener('click', update);
    startButton.removeEventListener('click', firstDrop);
    pauseButton.addEventListener('click', pauseGame);
    }
}

//create functions for arrow key movement
function moveLeft() {
    player.dx = -player.speed;
}

function moveRight() {
    player.dx = player.speed;
}

function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        moveRight();
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        moveLeft();
    }
}

function keyUp(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right' || e.key === 'ArrowLeft' || e.key === 'Left') {
            player.dx = 0;
        }
}

//Add event listeners to document to check for key presses on the arrow keys
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

//set up start, pause, and reset buttons
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');

startButton.addEventListener('click', firstDrop);
startButton.addEventListener('click', update);

function pauseGame() {
    if (isRunning) {
        ctx.drawImage(pauseImg, 250, 250, 300, 300);
        pauseButton.innerHTML = 'RESUME';
        isRunning = false;
    } else {
        isRunning = true;
        pauseButton.innerHTML = 'PAUSE';
        update();
    }
}

function resetGame() {
    score = 0;
    scoreDisplay.innerHTML = score;
    lives = 3;
    livesDisplay.innerHTML = lives;
    isRunning = true;
    pauseButton.innerHTML = 'PAUSE';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.x = canvas.width / 2 - 60;
    player.y = canvas.height - 80;
    apple.y = -55;
    orange.y = -55;
    watermelon.y = -60;
    pineapple.y = -80;
    bomb.y = -80;
    drawPlayer();
    clearTimeout(appleTimeout);
    clearTimeout(orangeTimeout);
    clearTimeout(pineappleTimeout);
    clearTimeout(watermelonTimeout);
    clearTimeout(bombTimeout);
    startButton.addEventListener('click', firstDrop);
    startButton.addEventListener('click', update);
    pauseButton.removeEventListener('click', pauseGame);
}

resetButton.addEventListener('click', resetGame);