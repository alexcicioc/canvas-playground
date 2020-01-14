class Object {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    move() {
        console.log('move not implemented');
    }
}

class Ship extends Object {
    constructor(mouseEvent) {
        super(mouseEvent.x, mouseEvent.y);
        this.width = 50;
        this.height = 50;
        this.mouseEvent = mouseEvent;
    }

    draw() {
        context.beginPath();
        context.fillStyle = '#999999';
        context.fillRect(this.x - (this.width / 2), this.y - (this.height / 2), this.width, this.height);
        context.fillRect(this.x - this.width, this.y - this.height, this.width / 2, this.height / 2);
        context.fillRect(this.x + this.width / 2, this.y - this.height, this.width / 2, this.height / 2);
        context.closePath();
    }

    move() {
        this.x = this.mouseEvent.x;
        this.y = this.mouseEvent.y;
        this.draw();
    }
}

class Invader extends Object {
    constructor(x, y) {
        super(x, y);
        this.width = 20;
        this.height = 20;
        this.dx = 50;
        this.dy = -50;
        this.moveSteps = 0;
    }

    draw() {
        context.beginPath();
        context.fillStyle = '#999999';
        context.fillRect(this.x, this.y, this.width, this.height);
        context.fillRect(this.x - this.width, this.y + this.height, this.width, this.height);
        context.fillRect(this.x + this.width, this.y + this.height, this.width, this.height);
        context.closePath();
    }

    move() {
        if (this.moveSteps === 30) {
            if (this.x > canvas.width || this.x < 0) {
                this.dx = -this.dx;
                this.x += this.dx;
            }

            if (this.y > canvas.height || this.y < 0) {
                this.dy = -this.dy;
                this.y += this.dy;
            }
            //
            this.x += this.dx;
            this.y += this.dy;
            this.moveSteps = 0;
        }


        this.moveSteps++;
        this.draw();

    }
}


class Shot extends Object {
    constructor(x, y) {
        super(x, y);
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
