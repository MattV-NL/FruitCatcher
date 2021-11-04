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

const badFruit = {
    x: randomDropPosition,
    y: 0,
    size: 60,
    color: 'black',
    dy: 1.5
}

//creating an array of fruits
let fruit = [orange, apple, watermelon, pineapple, badFruit];

//picking random fruit from array
let randomFruit = Math.floor(Math.random() * fruit.length);
let nextRandomFruit = 0;

//drawing the fruit using information from the objects
function drawFruit() {
    ctx.fillStyle = fruit[randomFruit].color;
    ctx.fillRect(fruit[randomFruit].x, fruit[randomFruit].y, fruit[randomFruit].size, fruit[randomFruit].size);
}

//updating the canvas to allow for smooth animation
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFruit();
    
    //make the fruit drop
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

    requestAnimationFrame(update);
}

update();