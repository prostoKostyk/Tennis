var elPlayer = this.document.getElementById("player");
var elBall = this.document.getElementById("ball");
var elField = this.document.getElementById("field");
var Game = /** @class */ (function () {
    function Game() {
        this.fail = false;
        this.speed = 50;
    }
    return Game;
}());
var Field = /** @class */ (function () {
    function Field(width, height) {
        this.width = 100;
        this.height = 100;
        this.posX = 100;
        this.width = width;
        this.height = height;
        elField.style.left = this.posX + "px";
        elField.style.width = this.width + "px";
        elField.style.height = this.height + "px";
    }
    return Field;
}());
var Player = /** @class */ (function () {
    function Player(posX, posY) {
        this.posX = 500;
        this.posY = 1000;
        this.width = 100;
        this.step = 10;
        this.posX = posX;
        this.posY = posY;
        elPlayer.style.left = this.posX + "px";
        elPlayer.style.top = this.posY + "px";
        elPlayer.style.width = this.width + "px";
    }
    Player.prototype.goLeft = function () {
        this.posX -= this.step;
        elPlayer.style.left = this.posX + "px";
    };
    Player.prototype.goRight = function () {
        this.posX += this.step;
        elPlayer.style.left = this.posX + "px";
    };
    return Player;
}());
var Ball = /** @class */ (function () {
    function Ball(posX, posY) {
        this.posX = 500;
        this.posY = 1000;
        this.stepX = 5;
        this.stepY = 5;
        this.directionX = true; // true - право, false - лево
        this.directionY = true; // true - вниз, false - вверх
        this.posX = posX;
        this.posY = posY;
        elBall.style.left = this.posX + "px";
        elBall.style.top = this.posY + "px";
    }
    Ball.prototype.goLeft = function () {
        this.posX -= this.stepX;
        elBall.style.left = this.posX + "px";
    };
    Ball.prototype.goRight = function () {
        this.posX += this.stepX;
        elBall.style.left = this.posX + "px";
    };
    Ball.prototype.goDown = function () {
        this.posY += this.stepY;
        elBall.style.top = this.posY + "px";
    };
    Ball.prototype.goUp = function () {
        this.posY -= this.stepY;
        elBall.style.top = this.posY + "px";
    };
    Ball.prototype.move = function () {
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
            // this.directionX = this.directionX;
            this.directionY = false;
        }
        // проверка удара об потолок
        if (this.posY + this.stepY <= 10) {
            // this.directionX = !this.directionX;
            this.directionY = true;
        }
        // проверка удара об правую стену
        if (this.posX + this.stepX >= field.width - 10) {
            this.directionX = false;
            // this.directionY = !this.directionY;
        }
        // проверка удара об левую стену
        if (this.posX - this.stepX <= 10) {
            this.directionX = true;
            // this.directionY = !this.directionY;
        }
        // проверка на вылет шара вниз
        if (this.posY > field.height - 10) {
            console.log("fail");
            game.fail = true;
        }
        // движение
        if (this.directionX) {
            this.goRight();
        }
        else {
            this.goLeft();
        }
        if (this.directionY) {
            this.goDown();
        }
        else {
            this.goUp();
        }
    };
    return Ball;
}());
var game = new Game();
var field = new Field(800, 310);
var player = new Player(300, 290);
var ball = new Ball(200, 100);
setInterval(function () { return ball.move(); }, game.speed);
function moveRect(e) {
    switch (e.keyCode) {
        case 37: // если нажата клавиша влево
            if (player.posX - player.step > 0) {
                player.goLeft();
            }
            break;
        case 39: // если нажата клавиша вправо
            if (player.posX + player.step < field.width - player.width) {
                player.goRight();
            }
            break;
    }
}
addEventListener("keydown", moveRect);
//# sourceMappingURL=app.js.map