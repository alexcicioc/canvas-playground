const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext('2d');


class Circle {
    constructor(context, x, y, radius, startDirection) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.context = context;
        this.dx = 5 * startDirection;
        this.dy = 5 * startDirection;
    }

    draw() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        // this.context.strokeStyle = 'blue';
        // this.context.stroke();
        this.context.fill();
    }

    move() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
            this.x += this.dx;
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
            this.y += this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}


function getRandomX(radius) {
    const x = Math.random() * canvas.width - radius;
    if (x < radius) {
        return radius
    }
    return x;
}

function getRandomY(radius) {
    const y = Math.random() * canvas.height - radius;
    if (y < radius) {
        return radius
    }
    return y;
}

const shapes = [];
for (let i = 0; i < 10; i++) {
    const radius = Math.random() * 100;
    const startDirection = Math.random() * 2 >= 1 ? -1 : 1;
    const circle = new Circle(context, getRandomX(radius), getRandomY(radius), radius, startDirection);
    shapes.push(circle);
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach((circle) => {
        circle.move();
    });
}


animate();

document.addEventListener('click', (event) => {
    console.log(event);
    const radius = Math.random() * 100;
    const startDirection = Math.random() * 2 >= 1 ? -1 : 1;
    const circle = new Circle(context, event.clientX, event.clientY, radius, startDirection);
    shapes.push(circle);
});
