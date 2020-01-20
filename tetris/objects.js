class Shape {
    constructor(shape, x, y) {
        this.x = x;
        this.y = y;
        this.dy = 10;
        this.shape = shape;
        this.speed = 10;
        this.moveSteps = 0;
    }

    draw() {
        context.beginPath();
        context.fillStyle = '#999999';
        this.shape.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                if (column === 1) {
                    context.fillRect(this.x + columnIndex * 10, this.y + rowIndex * 10, 10, 10);
                }
            });
        });
        context.closePath();
    }

    move() {
        if (this.moveSteps === this.speed) {
            this.y += this.dy;
            if (this.y > canvas.height - 40) {
                this.dy = 0;
            }
            this.moveSteps = 0;
        }

        this.moveSteps++;
        this.draw();

    }
}

class LShape extends Shape {
    constructor(x, y) {
        const lShape = [
            [1, 0, 0],
            [1, 0, 0],
            [1, 1, 0]
        ];
        super(lShape, x, y);
    }
}
