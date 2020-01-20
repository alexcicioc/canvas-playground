const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');
window.addEventListener('resize', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});

const lShape = new LShape(300, 300);

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    lShape.move();
    requestAnimationFrame(animate);
}

animate();

// document.addEventListener('click', (event) => {
//     objects.shots.push(new Shot(mouse.x, mouse.y));
// });
