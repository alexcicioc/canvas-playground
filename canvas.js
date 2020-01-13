const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext('2d');
const VELOCITY = 3;
const mouse = {x: null, y: null};

class Circle {
    constructor(context, x, y, radius, startDirection) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.context = context;
        this.dx = VELOCITY * startDirection;
        this.dy = VELOCITY * startDirection;
        this.grown = false;
        this.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    }

    draw() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        // this.context.strokeStyle = 'blue';
        // this.context.stroke();
        this.context.fillStyle = this.color;
        this.context.fill();
    }

    move() {
        if (!this.grown && this.isNearbyMouse()) {
            this.radius += 50;
            this.grown = true;
        } else if (this.grown && !this.isNearbyMouse()) {
            this.radius -= 50;
            this.grown = false;
        }

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

    isNearbyMouse() {
        const xDistance = Math.abs(this.x - mouse.x);
        const yDistance = Math.abs(this.y - mouse.y);

        return xDistance < 150 && yDistance < 150;
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
for (let i = 0; i < 20; i++) {
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
    const radius = Math.random() * 100;
    const startDirection = Math.random() * 2 >= 1 ? -1 : 1;
    const circle = new Circle(context, event.clientX, event.clientY, radius, startDirection);
    shapes.push(circle);
});

document.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});
