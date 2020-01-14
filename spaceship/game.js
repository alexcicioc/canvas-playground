const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');
window.addEventListener('resize', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});

const mouse = {x: 0, y: 0};

document.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

const objects = [
    new Ship(mouse),
    // new Invader(50, 100),
    // new Invader(50, 200),
    // new Invader(200, 100),
    // new Invader(200, 200),
    // new Invader(300, 60),
    // new Invader(50, 300),
];

for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 4; j++) {
        objects.push(new Invader(i * 100, j * 100));
    }
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    objects.forEach((object, index) => {
        if (object instanceof Shot && object.y <= 0) {
            delete objects[index];
            return;
        }
        object.move();
    })
}

animate();

document.addEventListener('click', (event) => {
    objects.push(new Shot(mouse.x, mouse.y));
});
