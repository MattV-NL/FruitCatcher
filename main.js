const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//setting a drop position for each fruit so that they act indipendantly
let randomDropPositionApple = Math.floor(Math.random() * canvas.width * 0.9);
let nextRandomDropPositionApple = 0;
let randomDropPositionOrange = Math.floor(Math.random() * canvas.width * 0.9);
let nextRandomDropPositionOrange = 0;
let randomDropPositionWatermelon = Math.floor(Math.random() * canvas.width * 0.9);
let nextRandomDropPositionWatermelon = 0;
let randomDropPositionPineapple = Math.floor(Math.random() * canvas.width * 0.9);
let nextRandomDropPositionPineapple = 0;
let randomDropPositionBomb = Math.floor(Math.random() * canvas.width * 0.9);
let nextRandomDropPositionBomb = 0;

//setting drop position for power ups so that they can all use the same parameter
let randomDropPositionPowerUp = Math.floor(Math.random() * canvas.width * 0.9);
let nextRandomDropPositionPowerUp = 0;

//adding images for game
const appleImg = document.getElementById('apple');
const orangeImg = document.getElementById('orange');
const watermelonImg = document.getElementById('watermelon');
const pineappleImg = document.getElementById('pineapple');
const bombImg = document.getElementById('bomb');
const basketImg = document.getElementById('basket');
const pauseImg = document.getElementById('pause-icon');
const oneUpImg = document.getElementById('oneUp');
const slowFruitImg = document.getElementById('slowFruit');
const dashPlayerImg = document.getElementById('dashPlayer');

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
    y: -canvas.height * 0.1,
    width: canvas.width * 0.06,
    height: canvas.height * 0.07,
    dy: canvas.height * 0.0037,
    image: appleImg,
    fruitScore: 50,
    isBomb: false
}

const orange = {
    x: randomDropPositionOrange,
    y: -canvas.height * 0.1,
    width: canvas.width * 0.06,
    height: canvas.height * 0.07,
    dy: canvas.height * 0.0037,
    image: orangeImg,
    fruitScore: 75,
    isBomb: false
}

const watermelon = {
    x: randomDropPositionWatermelon,
    y: -canvas.height * 0.1,
    width: canvas.width * 0.1,
    height: canvas.height * 0.075,
    dy: canvas.height * 0.0037,
    image: watermelonImg,
    fruitScore: 100,
    isBomb: false
}

const pineapple = {
    x: randomDropPositionPineapple,
    y: -canvas.height * 0.1,
    width: canvas.width * 0.088,
    height: canvas.height * 0.1,
    dy: canvas.height * 0.0037,
    image: pineappleImg,
    fruitScore: 80,
    isBomb: false
}

const bomb = {
    x: randomDropPositionBomb,
    y: -canvas.height * 0.1,
    width: canvas.width * 0.1,
    height: canvas.height * 0.1,
    dy: canvas.height * 0.004,
    image: bombImg,
    fruitScore: 0,
    isBomb: true
}

const player = {
    x: canvas.width / 2 - 45,
    y: canvas.height - 60,
    width: canvas.width * 0.15,
    height: canvas.height * 0.1,
    speed: canvas.width * 0.01,
    dx: 0,
    image: basketImg
}

//Adding power ups to the game

const oneUp = {
    x: randomDropPositionPowerUp,
    y: -canvas.height * 0.1,
    width: canvas.width * 0.06,
    height: canvas.height * 0.07,
    dy: canvas.height * 0.0037,
    image: oneUpImg,
    color: 'green',
    isBomb: false
}

const dashPlayer = {
    x: randomDropPositionPowerUp,
    y: -canvas.height * 0.1,
    width: canvas.width * 0.06,
    height: canvas.height * 0.07,
    dy: canvas.height * 0.0037,
    image: dashPlayerImg,
    isBomb: false
}

const slowFruitDrop = {
    x: randomDropPositionPowerUp,
    y: -canvas.height * 0.1,
    width: canvas.width * 0.06,
    height: canvas.height * 0.07,
    dy: canvas.height * 0.0037,
    image: slowFruitImg,
    isBomb: false
}

const powerUp = [oneUp, dashPlayer, slowFruitDrop];

let randomPowerUp = Math.floor(Math.random() * powerUp.length);
let nextRandomPowerUp = 0;

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

//draw power up
function drawPowerUp() {
    ctx.drawImage(powerUp[randomPowerUp].image, powerUp[randomPowerUp].x, powerUp[randomPowerUp].y, powerUp[randomPowerUp].width, powerUp[randomPowerUp].height);
}

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
    apple.y = -canvas.height * 0.1;
    setTimeout(() => {
        apple.y = 0
    }, 2000);
    nextRandomDropPositionApple = Math.floor(Math.random() * canvas.width * 0.9);
    randomDropPositionApple = nextRandomDropPositionApple;
    apple.x = randomDropPositionApple;
}

function newOrange() {
    orange.y = -canvas.height * 0.1;
    setTimeout(() => {
        orange.y = 0;
    }, 2000);
    nextRandomDropPositionOrange = Math.floor(Math.random() * canvas.width * 0.9);
    randomDropPositionOrange = nextRandomDropPositionOrange;
    orange.x = randomDropPositionOrange;
}

function newWatermelon() {
    watermelon.y = -canvas.height * 0.1;
    setTimeout(() => {
        watermelon.y = 0;
    }, 2000);
    nextRandomDropPositionWatermelon = Math.floor(Math.random() * canvas.width * 0.9);
    randomDropPositionWatermelon = nextRandomDropPositionWatermelon;
    watermelon.x = randomDropPositionWatermelon;
}

function newPineapple() {
    pineapple.y = -canvas.height * 0.1;
    setTimeout(() => {
        pineapple.y = 0
    }, 2000);
    nextRandomDropPositionPineapple = Math.floor(Math.random() * canvas.width * 0.9);
    randomDropPositionPineapple = nextRandomDropPositionPineapple;
    pineapple.x = randomDropPositionPineapple;
}

function newBomb() {
    bomb.y = -canvas.height * 0.1;
    setTimeout(() => {
        bomb.y = 0;
    }, 1500);
    nextRandomDropPositionBomb = Math.floor(Math.random() * canvas.width * 0.9);
    randomDropPositionBomb = nextRandomDropPositionBomb;
    bomb.x = randomDropPositionBomb;
}

//Reset power up y position and set a delay so that the player will not receive to much of an advantage
function newPowerUp() {
    powerUp[randomPowerUp].y = -canvas.height * 0.1;
    setTimeout(() => {
        powerUp[randomPowerUp].y = 0;
    }, 12000);
    nextRandomDropPositionPowerUp = Math.floor(Math.random() * canvas.width * 0.9);
    randomDropPositionPowerUp = nextRandomDropPositionPowerUp;
    powerUp[randomPowerUp].x = randomDropPositionPowerUp;
    nextRandomPowerUp = Math.floor(Math.random() * powerUp.length);
    randomPowerUp = nextRandomPowerUp;
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

//setting up drop for power up
function dropPowerUp() {
    if (powerUp[randomPowerUp].y >= 0) {
        powerUp[randomPowerUp].y += powerUp[randomPowerUp].dy;
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

//setting initial drop for the power up
function initialPowerUpDrop() {
    powerUp[randomPowerUp].y = 0;
}

function increasePlayerSpeed() {
    player.speed = player.speed * 2;
    setTimeout(reducePlayerSpeed, 8000);
}

function reducePlayerSpeed() {
    player.speed = canvas.width * 0.01;
}

function reduceFruitSpeed() {
    apple.dy = apple.dy * 0.75;
    orange.dy = orange.dy * 0.75;
    watermelon.dy = watermelon.dy * 0.75;
    pineapple.dy = pineapple.dy * 0.75;
    bomb.dy = bomb.dy * 0.75;
    setTimeout(increaseFruitSpeed, 8000);
}

function increaseFruitSpeed() {
    apple.dy = canvas.height * 0.0037;
    orange.dy = canvas.height * 0.0037;
    watermelon.dy = canvas.height * 0.0037;
    pineapple.dy = canvas.height * 0.0037
    bomb.dy = canvas.height * 0.004
}
//set the timeout to drop the fruits staggered instead of all at once
function firstDrop() {
    appleTimeout = setTimeout(initialAppleDrop, 100);
    orangeTimeout = setTimeout(initialOrangeDrop, 3000);
    pineappleTimeout = setTimeout(initialPineappleDrop, 6000);
    bombTimeout = setTimeout(initialBombDrop, 15000);
    watermelonTimeout = setTimeout(initialWatermelonDrop, 20000);
    powerUpTimeout = setTimeout(initialPowerUpDrop, 12000);
}

//add score to the scoreboard base on what is caught in the basket
function addScore() {
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

//create funciton to activate when the power up is caught
function addPowerUp() {
    if (powerUp[randomPowerUp].x + powerUp[randomPowerUp].width >= player.x && powerUp[randomPowerUp].x < player.x + player.width && powerUp[randomPowerUp].y + powerUp[randomPowerUp].height > player.y && randomPowerUp === 0) {
        lives += 1;
        livesDisplay.innerHTML = lives;
        scorePointSound.play();
        newPowerUp();
    } else if (powerUp[randomPowerUp].x + powerUp[randomPowerUp].width >= player.x && powerUp[randomPowerUp].x < player.x + player.width && powerUp[randomPowerUp].y + powerUp[randomPowerUp].height > player.y && randomPowerUp === 1) {
        increasePlayerSpeed();
        scorePointSound.play();
        newPowerUp();
    } else if (powerUp[randomPowerUp].x + powerUp[randomPowerUp].width >= player.x && powerUp[randomPowerUp].x < player.x + player.width && powerUp[randomPowerUp].y + powerUp[randomPowerUp].height > player.y && randomPowerUp === 2) {
        reduceFruitSpeed();
        scorePointSound.play();
        newPowerUp();
    }
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
    } else if (bomb.y > canvas.height - bomb.height * 0.8) {
        newBomb();
    }
}

//set up game over
let isRunning = true;

function gameOver() {
    if (lives < 1) {
        ctx.font = '48px Arial';
        ctx.fillText('GAME OVER', 150, 300);
        ctx.font = "28px Arial";
        ctx.fillText('Your Score was', 150, 338);
        ctx.fillText(score, 400, 338);
        stopTimer();
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
    drawPowerUp();
    movePlayer();
    dropApple();
    dropOrange();
    dropWatermelon();
    dropPineapple();
    dropBomb();
    dropPowerUp();
    addScore();
    addPowerUp();
    missedFruit();
    gameOver();
    requestAnimationFrame(update);
    startButton.removeEventListener('click', update);
    startButton.removeEventListener('click', firstDrop);
    startButton.removeEventListener('click', startTimer);
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

function touchArrow(e) {
    if (e.target === leftArrow || e.target === leftArrowImg) {
        moveLeft();
    } else if (e.target === rightArrow || e.target === rightArrowImg) {
        moveRight();
    }
}

function stopTouchArrow(e) {
    if (e.target === leftArrow || e.target === rightArrow || e.target === leftArrowImg || e.target === rightArrowImg) {
        player.dx = 0;
    }
}
//Add event listeners to document to check for key presses on the arrow keys
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
const leftArrow = document.getElementById('left-arrow-button');
const leftArrowImg = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow-button');
const rightArrowImg = document.getElementById('right-arrow');

leftArrow.addEventListener('touchstart', touchArrow);
leftArrow.addEventListener('touchend', stopTouchArrow);
leftArrow.addEventListener('mousedown', touchArrow);
leftArrow.addEventListener('mouseup', stopTouchArrow);
rightArrow.addEventListener('touchend', stopTouchArrow);
rightArrow.addEventListener('touchstart', touchArrow);
rightArrow.addEventListener('mousedown', touchArrow);
rightArrow.addEventListener('mouseup', stopTouchArrow);

//set up start, pause, and reset buttons
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');

startButton.addEventListener('click', startTimer);
startButton.addEventListener('click', firstDrop);
startButton.addEventListener('click', update);

function pauseGame() {
    if (isRunning) {
        ctx.drawImage(pauseImg, canvas.width * 0.3125, canvas.height * 0.3125, canvas.width * 0.375, canvas.height * 0.375);
        pauseButton.innerHTML = 'RESUME';
        isRunning = false;
        stopTimer();
    } else {
        isRunning = true;
        pauseButton.innerHTML = 'PAUSE';
        startTimer();
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
    player.x = canvas.width / 2 - player.width / 2;
    player.y = canvas.height - player.height;
    apple.y = -55;
    orange.y = -55;
    watermelon.y = -60;
    pineapple.y = -80;
    bomb.y = -80;
    powerUp[randomPowerUp].y = -55;
    drawPlayer();
    resetTimer();
    startButton.addEventListener('click', startTimer);
    startButton.addEventListener('click', firstDrop);
    startButton.addEventListener('click', update);
    pauseButton.removeEventListener('click', pauseGame);
    pauseButton.removeEventListener('click', stopTimer);
}

resetButton.addEventListener('click', resetGame);

const closeButton = document.getElementById('close-button');
const infoButton = document.getElementById('info-button');
const infoWindow = document.getElementById('controls');

closeButton.addEventListener('click', closeInfo);
infoButton.addEventListener('click', openInfo);

function closeInfo() {
    infoWindow.style.display = 'none';
}

function openInfo() {
    infoWindow.style.display = 'flex';
}