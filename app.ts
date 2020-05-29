var elPlayer = this.document.getElementById("player");
var elBall = this.document.getElementById("ball");
var elField = this.document.getElementById("field");
class Game {
    fail = false;
    speed = 50;
}

class Field {
    width = 100;
    height = 100;
    posX = 100;
    constructor(width, height) {
        this.width = width;
        this.height = height;
        elField.style.left = this.posX + "px";
        elField.style.width = this.width + "px";
        elField.style.height = this.height + "px";
    }
}

class Player {
    posX = 500;
    posY = 1000
    width = 100;
    step = 10;
    constructor(posX: number, posY: number) {
        this.posX = posX;
        this.posY = posY;
        elPlayer.style.left = this.posX + "px";
        elPlayer.style.top = this.posY + "px";
        elPlayer.style.width = this.width + "px";
    }
    goLeft() {
        this.posX -= this.step;
        elPlayer.style.left = this.posX + "px";
    }
    goRight() {
        this.posX += this.step;
        elPlayer.style.left = this.posX + "px";
    }
}

class Ball {
    posX = 500;
    posY = 1000
    stepX = 5;
    stepY = 5;
    directionX = true; // true - право, false - лево
    directionY = true; // true - вниз, false - вверх
    playerTouchX;
    constructor(posX: number, posY: number) {
        this.posX = posX;
        this.posY = posY;
        elBall.style.left = this.posX + "px";
        elBall.style.top = this.posY + "px";
    }
    goLeft() {
        this.posX -= this.stepX;
        elBall.style.left = this.posX + "px";
    }
    goRight() {
        this.posX += this.stepX;
        elBall.style.left = this.posX + "px";
    }
    goDown() {
        this.posY += this.stepY;
        elBall.style.top = this.posY + "px";
    }
    goUp() {
        this.posY -= this.stepY;
        elBall.style.top = this.posY + "px";
    }
    move() {
        if (game.fail) {
            game.fail = false;
            ball.posX = 100;
            ball.posY = 100;
            this.directionX = true;
            this.directionY = true;
        }
        // определение направления
        // проверка удара об игрока
        if (this.posY + this.stepY >= player.posY && (this.posX > player.posX - 5 && this.posX < player.posX + player.width)) {
            this.playerTouchX = (ball.posX - player.posX - 55) / 10;
            this.directionY = false;
            if (this.playerTouchX >= 0) {
                this.directionX = true;
            } else {
                this.directionX = false;
            }
            // изменение шага
            if (this.playerTouchX < 0) {
                this.playerTouchX *= -1;
            }
            this.stepX = (this.playerTouchX + 1) * 1.75;
        }
        // проверка удара об потолок
        if (this.posY + this.stepY <= 10) {
            this.directionY = true;
        }
        // проверка удара об правую стену
        if (this.posX + this.stepX >= field.width - 10) {
            this.directionX = false;
        }
        // проверка удара об левую стену
        if (this.posX - this.stepX <= 10) {
            this.directionX = true;
        }
        // проверка на вылет шара вниз
        if (this.posY > field.height - 10) {
            console.log("fail");
            game.fail = true;
        }

        // движение
        if (this.directionX) {
            this.goRight();
        } else {
            this.goLeft();
        }
        if (this.directionY) {
            this.goDown();
        } else {
            this.goUp();
        }
    }
}
let game = new Game();
let field = new Field(800, 310);
let player = new Player(300, 290);
let ball = new Ball(200, 100)
setInterval(() => ball.move(), game.speed);

function moveRect(e) {
    switch (e.keyCode) {
        case 37:  // если нажата клавиша влево
            if (player.posX - player.step > 0) {
                player.goLeft();
            }
            break;
        case 39:   // если нажата клавиша вправо
            if (player.posX + player.step < field.width - player.width) {
                player.goRight();
            }
            break;
    }
}
addEventListener("keydown", moveRect);

