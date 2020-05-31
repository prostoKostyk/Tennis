document.getElementById("version").innerHTML = "version 0.00000004";
var elPlayer1 = document.getElementById("player1");
var elPlayer2 = document.getElementById("player2");
var elBall = document.getElementById("ball");
var elField = document.getElementById("field");
let elBlock = document.getElementById("block");
let elBlow = document.getElementById("blow");
let elcountPlayer = document.getElementById("countPlayer");
elcountPlayer.style.color = window.getComputedStyle(elPlayer1).backgroundColor;
let elcountBot = document.getElementById("countBot");
elcountBot.style.color = window.getComputedStyle(elPlayer2).backgroundColor;

class Game {
    fail = false;
    speed = 40;
    pause = false;
    playerCount = 0;
    botCount = 0;
    level = 3.5;
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
    step = 20;
    player;
    constructor(posX: number, posY: number, width: number, player) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.player = player;
        this.player.style.left = this.posX + "px";
        this.player.style.top = this.posY + "px";
        this.player.style.width = this.width + "px";
    }
    goLeft() {
        this.posX -= this.step;
        this.player.style.left = this.posX + "px";
    }
    goRight() {
        this.posX += this.step;
        this.player.style.left = this.posX + "px";
    }
}

class Ball {
    posX = 500;
    posY = 1000
    stepX = 3;
    stepY = 3;
    directionX = true; // true - право, false - лево
    directionY = true; // true - вниз, false - вверх
    player1TouchX;
    player2TouchX;
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
}

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
        } else {
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
        } else {
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
    } else {
        ball.goLeft();
    }
    if (ball.directionY) {
        ball.goDown();
    } else {
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
            case 37:  // если нажата клавиша влево
                if (player1.posX - player1.step > 0) {
                    player1.goLeft();
                }
                break;
            case 39:   // если нажата клавиша вправо
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
    } else {
        ballMove = setInterval(() => move(), game.speed);
        player2Move = setInterval(() => botMove(), game.speed * game.level);
        game.pause = false;
    }
}

function levelChange() {
    let level = this.document.getElementById("level");
    game.level = +level.value;
    clearInterval(player2Move);
    player2Move = setInterval(() => botMove(), game.speed * game.level);
    game.fail = true;
    game.botCount = 0;
    game.playerCount = 0;
    elcountPlayer.innerHTML = " " + game.playerCount;
    elcountBot.innerHTML = " : " + game.botCount;
}
let game = new Game();
let field = new Field(800, 310);
let player1 = new Player(295, 290, 100, elPlayer1);
let player2 = new Player(300, 20, 100, elPlayer2);
let ball = new Ball(200, 100)
let ballMove = setInterval(() => move(), game.speed);
let player2Move = setInterval(() => botMove(), game.speed * game.level);
addEventListener("keydown", moveRect);

