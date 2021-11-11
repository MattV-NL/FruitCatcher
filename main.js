const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//setting drop position for the fruit
let randomDropPosition = Math.floor(Math.random() * canvas.width);
let nextRandomDropPosition = 0;

//bring in images of fruits from DOM
const appleImg = document.getElementById('apple');
const orangeImg = document.getElementById('orange');
const watermelonImg = document.getElementById('watermelon');
const pineappleImg = document.getElementById('pineapple');
const bombImg = document.getElementById('bomb');

//Add basket image
const basketImg = document.getElementById('basket');

//setting up score for the game
let score = 0;
const scoreDisplay = document.getElementById('score-display');

//setting up lives for the game
let lives = 3;
const livesDisplay = document.getElementById('lives-display');

//create fruits as basic squares and then will add styling later
const apple = {
    x: randomDropPosition,
    y: 0,
    width: 50,
    height: 55,
    dy: 1.5,
    image: appleImg,
    fruitScore: 50
}

const orange = {
    x: randomDropPosition,
    y: 0,
    width: 50,
    height: 55,
    color: 'orange',
    dy: 1.5,
    image: orangeImg,
    fruitScore: 75
}

const watermelon = {
    x: randomDropPosition,
    y: 0,
    width: 80,
    height: 60,
    color: 'green',
    dy: 1.2,
    image: watermelonImg,
    fruitScore: 100
}

const pineapple = {
    x: randomDropPosition,
    y: 0,
    width: 70,
    height: 80,
    color: 'yellow',
    dy: 1.6,
    image: pineappleImg,
    fruitScore: 80
}

const bomb = {
    x: randomDropPosition,
    y: 0,
    width: 80,
    height: 80,
    color: 'black',
    dy: 1.5,
    image: bombImg,
    fruitScore: -100
}

const player = {
    x: canvas.width / 2 - 60,
    y: canvas.height - 80,
    width: 120,
    height: 80,
    speed: 3,
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

//apend the position to the movement speed
function newPosition() {
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
    nextRandomDropPosition = Math.floor(Math.random() * canvas.width);
    randomDropPosition = nextRandomDropPosition;
    fruit[randomFruit].x = nextRandomDropPosition;
    //pick another fruit from array
    nextRandomFruit = Math.floor(Math.random() * fruit.length);
    randomFruit = nextRandomFruit;
}

//make fruit drop
function drop() {
    fruit[randomFruit].y += fruit[randomFruit].dy;

    //when the fruit hits the floor then restart it at the top
    if (fruit[randomFruit].y - fruit[randomFruit].height > canvas.height) {
        newFruit();
    }
}

//making fruit register when it hits the basket
//for some reason this stops the fruit from falling

function addScore() {
    if(fruit[randomFruit].x + fruit[randomFruit].width >= player.x && fruit[randomFruit].x < player.x + player.width && fruit[randomFruit].y + fruit[randomFruit].height > player.y) {
        console.log("hello");
        score += fruit[randomFruit].fruitScore;
        scoreDisplay.innerHTML = score;
        
        newFruit();
    } else if (fruit[randomFruit].y > canvas.height) {
        newFruit();
        lives -= 1;
        livesDisplay.innerHTML = lives;
    }
}

//set up game over

let isRunning = true
function gameOver() {
    if (lives < 1) {
        ctx.font = '64px Arial';
        ctx.fillText('GAME OVER', 200, 400);
        isRunning = false;
    }
}

//updating the canvas to allow for smooth animation
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFruit();
    drawPlayer();
    newPosition();
    addScore();
    drop();
    gameOver();
    if (isRunning) requestAnimationFrame(update);
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

update();