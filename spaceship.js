const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');
window.addEventListener('resize', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});

const mouse = {x: 0, y: 0};
const ship = {height: 50, width: 50};

document.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

class Shot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dy = 10;
    }

    draw() {
        context.beginPath();
        context.fillStyle = '#7a0002';
        context.fillRect(this.x, this.y, 10, 10);
        context.fill();
    }

    move() {
        this.y -= this.dy;
        this.draw();
    }
}

const shots = [];

function drawShip() {
    context.fillStyle = '#999999';
    context.fillRect(mouse.x - (ship.width / 2), mouse.y - (ship.height / 2), ship.width, ship.height);
    context.fillRect(mouse.x - ship.width, mouse.y - ship.height, ship.width / 2, ship.height / 2);
    context.fillRect(mouse.x + ship.width / 2, mouse.y - ship.height, ship.width / 2, ship.height / 2);
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawShip();
    shots.forEach((shot, index) => {
        if (shot.y <= 0) {
            delete shots[index];
            return;
        }
        shot.move();
    })
}

animate();

document.addEventListener('click', (event) => {
    const shot = new Shot(mouse.x, mouse.y);
    shots.push(shot);
});