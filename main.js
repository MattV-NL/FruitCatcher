const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
//setting drop position for the fruit
let randomDropPosition = Math.floor(Math.random() * canvas.width);
let nextRandomDropPosition = 0;

//create fruits as basic squares and then will add styling later
const apple = {
    x: randomDropPosition,
    y: 0,
    size: 30,
    color: 'red',
    dy: 1.5
}

const orange = {
    x: randomDropPosition,
    y: 0,
    size: 35,
    color: 'orange',
    dy: 1.5
}

const watermelon = {
    x: randomDropPosition,
    y: 0,
    size: 50,
    color: 'green',
    dy: 1.2
}

const pineapple = {
    x: randomDropPosition,
    y: 0,
    size: 50,
    color: 'yellow',
    dy: 1.6
}

const bomb = {
    x: randomDropPosition,
    y: 0,
    size: 60,
    color: 'black',
    dy: 1.5
}

const player = {
    x: canvas.width / 2 - 60,
    y: canvas.height - 80,
    width: 120,
    height: 80,
    speed: 3,
    dx: 0
}

//creating an array of fruits
let fruit = [orange, apple, watermelon, pineapple, bomb];

//picking random fruit from array
let randomFruit = Math.floor(Math.random() * fruit.length);
let nextRandomFruit = 0;

//drawing the fruit using information from the objects
function drawFruit() {
    ctx.fillStyle = fruit[randomFruit].color;
    ctx.fillRect(fruit[randomFruit].x, fruit[randomFruit].y, fruit[randomFruit].size, fruit[randomFruit].size);
}

//draw player
function drawPlayer() {
    ctx.fillStyle = 'brown';
    ctx.fillRect(player.x, player.y, player.width, player.height);
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

//make fruit drop
function drop() {
    fruit[randomFruit].y += fruit[randomFruit].dy;

    //when the fruit hits the floor then restart it at the top
    if (fruit[randomFruit].y + fruit[randomFruit].size > canvas.height) {
        fruit[randomFruit].y = 0;
        
        //make the fruit drop at a new place along the x axis
        nextRandomDropPosition = Math.floor(Math.random() * canvas.width);
        randomDropPosition = nextRandomDropPosition;
        fruit[randomFruit].x = nextRandomDropPosition;

        //pick another new fruit from the array
        nextRandomFruit = Math.floor(Math.random() * fruit.length);
        randomFruit = nextRandomFruit;
    }
}

//updating the canvas to allow for smooth animation
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFruit();
    drawPlayer();
    newPosition();
    drop();
    requestAnimationFrame(update);
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