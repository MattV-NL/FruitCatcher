const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//setting drop position for the fruit
let randomDropPosition = Math.floor(Math.random() * 720);
let nextRandomDropPosition = 0;

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
    x: randomDropPosition,
    y: 0,
    width: 50,
    height: 55,
    dy: 1.8,
    image: appleImg,
    fruitScore: 50,
    isBomb: false
}

const orange = {
    x: randomDropPosition,
    y: 0,
    width: 50,
    height: 55,
    dy: 1.8,
    image: orangeImg,
    fruitScore: 75,
    isBomb: false
}

const watermelon = {
    x: randomDropPosition,
    y: 0,
    width: 80,
    height: 60,
    dy: 1.8,
    image: watermelonImg,
    fruitScore: 100,
    isBomb: false
}

const pineapple = {
    x: randomDropPosition,
    y: 0,
    width: 70,
    height: 80,
    dy: 1.8,
    image: pineappleImg,
    fruitScore: 80,
    isBomb: false
}

const bomb = {
    x: randomDropPosition,
    y: 0,
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
    speed: 3.5,
    dx: 0,
    image: basketImg
}

//creating an array of fruits
let fruit = [orange, apple, watermelon, pineapple, bomb];

//picking random fruit from array
let randomFruit = Math.floor(Math.random() * fruit.length);
let nextRandomFruit = 0;

//drawing the fruit using information from the objects
function drawFruit() {
    ctx.drawImage(fruit[randomFruit].image, fruit[randomFruit].x, fruit[randomFruit].y, fruit[randomFruit].width, fruit[randomFruit].height);
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

//pick a new fruit from the array
function newFruit() {
    //new fruit start at top of the canvas
    fruit[randomFruit].y = 0;
    //new fruit drop at new place along x axis
    nextRandomDropPosition = Math.floor(Math.random() * (canvas.width - fruit[randomFruit].width));
    randomDropPosition = nextRandomDropPosition;
    fruit[randomFruit].x = nextRandomDropPosition;
    //pick another fruit from array
    nextRandomFruit = Math.floor(Math.random() * fruit.length);
    randomFruit = nextRandomFruit;
}

//make fruit drop
function drop() {
    fruit[randomFruit].y += fruit[randomFruit].dy;
}

//making fruit register when it hits the basket and adding score and removing from lives
function addScore() {
    if(fruit[randomFruit].x + fruit[randomFruit].width >= player.x && fruit[randomFruit].x < player.x + player.width && fruit[randomFruit].y + fruit[randomFruit].height > player.y) {
        score += fruit[randomFruit].fruitScore;
        scoreDisplay.innerHTML = score;
        if (fruit[randomFruit].isBomb === true) {
            lives -= 1;
            livesDisplay.innerHTML = lives;
            explosionSound.play();
        } else {
            scorePointSound.play();
        }
        newFruit();
    } else if (fruit[randomFruit].y > canvas.height) {
        if (fruit[randomFruit].isBomb === false) {
            lives -= 1;
            livesDisplay.innerHTML = lives;
            newFruit();
            if (lives > 0) {
                missFruitSound.play();
            }
        } else {
            newFruit();
        }
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFruit();
    drawPlayer();
    movePlayer();
    drop();
    addScore();
    gameOver();
    requestAnimationFrame(update);
    startButton.removeEventListener('click', update);
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
    if (e.key === 'ArrowRight' ||
        e.key === 'Right' ||
        e.key === 'ArrowLeft' ||
        e.key === 'Left') {
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
    newFruit();
    player.x = canvas.width / 2 - 60;
    player.y = canvas.height - 80;
    drawPlayer();
    startButton.addEventListener('click', update);
}

resetButton.addEventListener('click', resetGame);