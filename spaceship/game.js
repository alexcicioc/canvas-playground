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

const objects = {
    ship: new Ship(mouse),
    shots: [],
    invaders: []
};


for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 4; j++) {
        objects.invaders.push(new Invader(i * 100, j * 100));
    }
}

function isShotColliding(shot, invader) {
    return Math.abs(shot.x - invader.x) < 60 && Math.abs(shot.y - invader.y) < 60;
}

function isInvaderColliding(invader, ship) {
    return Math.abs(ship.x - invader.x) < 60 && Math.abs(ship.y - invader.y) < 60;
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    objects.invaders.forEach((invader, index) => {
        invader.move();
        if (isInvaderColliding(invader, objects.ship)) {
            alert("You're a loser");
        }
    });

    objects.shots.forEach((shot, shotIndex) => {
        if (shot.y <= 0) {
            delete objects.shots[shotIndex];
            return;
        }

        let shotDeleted = false;
        objects.invaders.forEach((invader, invaderIndex) => {
            if (isShotColliding(shot, invader)) {
                console.log('intra');
                delete objects.shots[shotIndex];
                delete objects.invaders[invaderIndex];
                shotDeleted = true;
            }
        });

        if (!shotDeleted) {
            shot.move();
        }
    });

    objects.ship.move();
}

animate();

document.addEventListener('click', (event) => {
    objects.shots.push(new Shot(mouse.x, mouse.y));
});
