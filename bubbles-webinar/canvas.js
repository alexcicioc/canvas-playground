const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.getElementById('playground').append(canvas);
const context = canvas.getContext('2d');

class Circle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = 1;
        this.dy = 1;
    }

    draw() {
        context.beginPath();
        context.arc(
            this.x,
            this.y,
            this.radius,
            0,
            2 * Math.PI
        );
        context.stroke();
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    move(stepX, stepY) {
        this.changeDirectionIfExceededBounds();
        this.x += stepX * this.dx; // this.x = this.x + stepX;
        this.y += stepY * this.dy;
        this.draw();
    }

    changeDirectionIfExceededBounds() {
        if (this.x >= canvas.width - this.radius) {
            this.dx = -1;
        }
        if (this.y >= canvas.height - this.radius) {
            this.dy = -1;
        }
        if (this.x <= this.radius) {
            this.dx = 1;
        }
        if (this.y <= this.radius) {
            this.dy = 1;
        }
    }
}

const circles = [];
const colors = [
    'blue',
    'red',
    'orange',
    'yellow',
    'green',
    'black',
    'white'
]

function getRandom(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}

for (let i = 0; i < 25; i++) {
    circles.push(
        new Circle(
            getRandom(0, canvas.width),
            getRandom(0, canvas.height),
            getRandom(10, 100),
            colors[getRandom(0, colors.length)]
        )
    );
}

function animateCircle() {
    console.log('se apeleaza');
    context.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach((circle) => {
        circle.move(10, 10);
    })
}

setInterval(animateCircle, 50)