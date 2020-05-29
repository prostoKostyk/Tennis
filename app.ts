document.getElementById("version").innerHTML = "version 0.0000003";
var elPlayer = document.getElementById("player");
var elBall = document.getElementById("ball");
var elField = document.getElementById("field");
let elBlock = document.getElementById("block");
let elBlow = document.getElementById("blow");
let elCount = document.getElementById("count");
class Game {
    fail = false;
    speed = 25;
    pause = false;
    count = -1;
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

class Block {
    posX = 500;
    posY = 1000
    color = "black"
    colors = ["red", "blue", "green", "black", "yellow", "pink"]
    constructor(posX: number, posY: number) {
        this.posX = posX;
        this.posY = posY;
        elBlock.style.left = this.posX + "px";
        elBlock.style.top = this.posY + "px";
    }
    getRandomCoord() {
        this.posX = (Math.floor(Math.random() * (730- 5) + 5));
        this.posY = (Math.floor(Math.random() * (150 - 5) + 5));
    }

    replace () {
        game.count++;
        elCount.innerHTML = "Счёт: " + game.count;
        elBlock.style.left = this.posX + "px";
        elBlock.style.top = this.posY + "px";
        elBlock.style.backgroundColor = this.colors[(Math.floor(Math.random() * (this.colors.length - 0) + 0))];
        elBlow.style.display = "none"
    }
}

class Ball {
    posX = 500;
    posY = 1000
    stepX = 5;
    stepY = 3;
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
        } else {
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
    } else {
        ball.goLeft();
    }
    if (ball.directionY) {
        ball.goDown();
    } else {
        ball.goUp();
    }
    if (ball.posX > block.posX && ball.posX < block.posX + 100 && ball.posY > block.posY && ball.posY < block.posY + 12 ) {
        elBlow.style.display = "block";
        block.getRandomCoord();
        let timerId = setTimeout(() => block.replace(), 500);
    }
}

function moveRect(e) {
    if (!game.pause) {
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
}

function pause() {
    if (!game.pause) {
        clearInterval(ballMove);
        game.pause = true;
    } else {
        ballMove = setInterval(() => move(), game.speed);
        game.pause = false;
    }
}

let game = new Game();
let field = new Field(800, 310);
let player = new Player(300, 290);
let ball = new Ball(200, 100)
let ballMove = setInterval(() => move(), game.speed);
let block = new Block(200, 100);
block.getRandomCoord();
block.replace();
addEventListener("keydown", moveRect);

