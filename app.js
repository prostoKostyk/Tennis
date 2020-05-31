document.getElementById("version").innerHTML = "version 0.00000004";
var elPlayer1 = document.getElementById("player1");
var elPlayer2 = document.getElementById("player2");
var elBall = document.getElementById("ball");
var elField = document.getElementById("field");
var elBlock = document.getElementById("block");
var elBlow = document.getElementById("blow");
var elcountPlayer = document.getElementById("countPlayer");
elcountPlayer.style.color = window.getComputedStyle(elPlayer1).backgroundColor;
var elcountBot = document.getElementById("countBot");
elcountBot.style.color = window.getComputedStyle(elPlayer2).backgroundColor;
var Game = /** @class */ (function () {
    function Game() {
        this.fail = false;
        this.speed = 40;
        this.pause = false;
        this.playerCount = 0;
        this.botCount = 0;
        this.level = 3.5;
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
    function Player(posX, posY, width, player) {
        this.posX = 500;
        this.posY = 1000;
        this.width = 100;
        this.step = 20;
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.player = player;
        this.player.style.left = this.posX + "px";
        this.player.style.top = this.posY + "px";
        this.player.style.width = this.width + "px";
    }
    Player.prototype.goLeft = function () {
        this.posX -= this.step;
        this.player.style.left = this.posX + "px";
    };
    Player.prototype.goRight = function () {
        this.posX += this.step;
        this.player.style.left = this.posX + "px";
    };
    return Player;
}());
var Ball = /** @class */ (function () {
    function Ball(posX, posY) {
        this.posX = 500;
        this.posY = 1000;
        this.stepX = 3;
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
        elcountPlayer.innerHTML = " " + game.playerCount;
        elcountBot.innerHTML = " : " + game.botCount;
    }
    // определение направления
    // проверка удара об 1 игрока
    if (ball.posY + ball.stepY >= player1.posY - 5 && (ball.posX > player1.posX - 5 && ball.posX < player1.posX + player1.width)) {
        ball.player1TouchX = (ball.posX - player1.posX - 55) / 10;
        ball.directionY = false;
        if (ball.player1TouchX >= 0) {
            ball.directionX = true;
        }
        else {
            ball.player1TouchX *= -1;
            ball.directionX = false;
        }
        // изменение шага
        ball.stepX = (ball.player1TouchX + 1) * 2.20;
    }
    // проверка удара об 2 игрока
    if (ball.posY + ball.stepY <= player2.posY + 15 && ball.posY + ball.stepY >= player2.posY && (ball.posX > player2.posX - 1 && ball.posX < player2.posX + player2.width)) {
        ball.player2TouchX = (ball.posX - player2.posX - 55) / 10;
        ball.directionY = true;
        if (ball.player2TouchX >= 0) {
            ball.directionX = true;
        }
        else {
            ball.player2TouchX *= -1;
            ball.directionX = false;
        }
        // изменение шага
        ball.stepX = (ball.player2TouchX + 1) * 2.20;
    }
    // проверка вылета за потолок об потолок
    if (ball.posY + ball.stepY <= 10) {
        game.playerCount++;
        game.fail = true;
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
        game.botCount++;
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
}
function botMove() {
    console.log(player2.posX);
    if (ball.posX > player2.posX + player2.width - 10 && player2.posX + player2.step < field.width - 100) {
        player2.goRight();
    }
    if (ball.posX < player2.posX + 10 && player2.posX - player2.step > 0) {
        player2.goLeft();
    }
}
function moveRect(e) {
    if (!game.pause) {
        switch (e.keyCode) {
            case 37: // если нажата клавиша влево
                if (player1.posX - player1.step > 0) {
                    player1.goLeft();
                }
                break;
            case 39: // если нажата клавиша вправо
                if (player1.posX + player1.step < field.width - player1.width) {
                    player1.goRight();
                }
                break;
        }
    }
}
function pause() {
    if (!game.pause) {
        clearInterval(player2Move);
        clearInterval(ballMove);
        game.pause = true;
    }
    else {
        ballMove = setInterval(function () { return move(); }, game.speed);
        player2Move = setInterval(function () { return botMove(); }, game.speed * game.level);
        game.pause = false;
    }
}
function levelChange() {
    var level = this.document.getElementById("level");
    game.level = +level.value;
    clearInterval(player2Move);
    player2Move = setInterval(function () { return botMove(); }, game.speed * game.level);
    game.fail = true;
    game.botCount = 0;
    game.playerCount = 0;
    elcountPlayer.innerHTML = " " + game.playerCount;
    elcountBot.innerHTML = " : " + game.botCount;
}
var game = new Game();
var field = new Field(800, 310);
var player1 = new Player(295, 290, 100, elPlayer1);
var player2 = new Player(300, 20, 100, elPlayer2);
var ball = new Ball(200, 100);
var ballMove = setInterval(function () { return move(); }, game.speed);
var player2Move = setInterval(function () { return botMove(); }, game.speed * game.level);
addEventListener("keydown", moveRect);
//# sourceMappingURL=app.js.map