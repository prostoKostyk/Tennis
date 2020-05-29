document.getElementById("version").innerHTML = "version 0.0000003";
var elPlayer = document.getElementById("player");
var elBall = document.getElementById("ball");
var elField = document.getElementById("field");
var elBlock = document.getElementById("block");
var elBlow = document.getElementById("blow");
var elCount = document.getElementById("count");
var Game = /** @class */ (function () {
    function Game() {
        this.fail = false;
        this.speed = 25;
        this.pause = false;
        this.count = -1;
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
        this.step = 20;
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
var Block = /** @class */ (function () {
    function Block(posX, posY) {
        this.posX = 500;
        this.posY = 1000;
        this.color = "black";
        this.colors = ["red", "blue", "green", "black", "yellow", "pink"];
        this.posX = posX;
        this.posY = posY;
        elBlock.style.left = this.posX + "px";
        elBlock.style.top = this.posY + "px";
    }
    Block.prototype.getRandomCoord = function () {
        this.posX = (Math.floor(Math.random() * (730 - 5) + 5));
        this.posY = (Math.floor(Math.random() * (150 - 5) + 5));
    };
    Block.prototype.replace = function () {
        game.count++;
        elCount.innerHTML = "Счёт: " + game.count;
        elBlock.style.left = this.posX + "px";
        elBlock.style.top = this.posY + "px";
        elBlock.style.backgroundColor = this.colors[(Math.floor(Math.random() * (this.colors.length - 0) + 0))];
        elBlow.style.display = "none";
    };
    return Block;
}());
var Ball = /** @class */ (function () {
    function Ball(posX, posY) {
        this.posX = 500;
        this.posY = 1000;
        this.stepX = 5;
        this.stepY = 3;
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
    return Ball;
}());
function move() {
    if (game.fail) {
        game.fail = false;
        ball.posX = 100;
        ball.posY = 100;
        ball.directionX = true;
        ball.directionY = true;
        ball.stepX = 5;
        ball.stepY = 3;
        game.count = 0;
        elCount.innerHTML = "Счёт: " + game.count;
    }
    // определение направления
    // проверка удара об игрока
    if (ball.posY + ball.stepY >= player.posY && (ball.posX > player.posX - 5 && ball.posX < player.posX + player.width)) {
        ball.playerTouchX = (ball.posX - player.posX - 55) / 10;
        ball.directionY = false;
        if (ball.playerTouchX >= 0) {
            ball.directionX = true;
        }
        else {
            ball.directionX = false;
        }
        // изменение шага
        if (ball.playerTouchX < 0) {
            ball.playerTouchX *= -1;
        }
        ball.stepX = (ball.playerTouchX + 1) * 2.20;
    }
    // проверка удара об потолок
    if (ball.posY + ball.stepY <= 10) {
        ball.directionY = true;
    }
    // проверка удара об правую стену
    if (ball.posX + ball.stepX >= field.width - 10) {
        ball.directionX = false;
    }
    // проверка удара об левую стену
    if (ball.posX - ball.stepX <= 10) {
        ball.directionX = true;
    }
    // проверка на вылет шара вниз
    if (ball.posY > field.height - 10) {
        console.log("fail");
        game.fail = true;
    }
    // движение
    if (ball.directionX) {
        ball.goRight();
    }
    else {
        ball.goLeft();
    }
    if (ball.directionY) {
        ball.goDown();
    }
    else {
        ball.goUp();
    }
    if (ball.posX > block.posX && ball.posX < block.posX + 100 && ball.posY > block.posY && ball.posY < block.posY + 12) {
        elBlow.style.display = "block";
        block.getRandomCoord();
        var timerId = setTimeout(function () { return block.replace(); }, 500);
    }
}
function moveRect(e) {
    if (!game.pause) {
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
}
function pause() {
    if (!game.pause) {
        clearInterval(ballMove);
        game.pause = true;
    }
    else {
        ballMove = setInterval(function () { return move(); }, game.speed);
        game.pause = false;
    }
}
var game = new Game();
var field = new Field(800, 310);
var player = new Player(300, 290);
var ball = new Ball(200, 100);
var ballMove = setInterval(function () { return move(); }, game.speed);
var block = new Block(200, 100);
block.getRandomCoord();
block.replace();
addEventListener("keydown", moveRect);
//# sourceMappingURL=app.js.map