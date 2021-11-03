const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const apple = {
    x: 200,
    y: 200,
    size: 30,
    color: 'red',
    dx: 5,
    dy: 4
}

function drawApple() {
    ctx.fillRect(apple.x, apple.y, apple.size, apple.size);
    ctx.fillStyle = apple.color;
}

drawApple();