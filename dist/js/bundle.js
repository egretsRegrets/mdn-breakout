(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const CANVAS = document.getElementById('myCanvas');
const ctx = CANVAS.getContext('2d');

var x = CANVAS.width / 2;
var y = CANVAS.height - 30;
var dx = 1.5; // x offset at each new frame
var dy = -1.5; // y offset at each new frame
var rightPressed = false;
var leftPressed = false;
var isPaused = false;

var brick = {
    rowCount: 3,
    columnCount: 5,
    padding: CANVAS.width * 0.01
}
brick.paddingUnitNumber = brick.columnCount + 1;
brick.width = (CANVAS.width - (brick.paddingUnitNumber * brick.padding)) / brick.columnCount;
brick.height = brick.width / 10;

var bricks = [];
for (c = 0; c < brick.columnCount; c++) {
    bricks[c] = [];
    for (r = 0; r < brick.rowCount; r++) {
        bricks[c][r] = {x: 0, y: 0};
    }
}

function drawBricks(){
    console.log(brick.padding);
    for (c = 0; c < brick.columnCount; c++) {
        for (r = 0; r < brick.rowCount; r++){
            let brickX = ((c + 1) * brick.padding) + (brick.width * (c));
            let brickY = ((r + 1) * brick.padding) + (brick.height * (r));
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brick.width, brick.height);
            ctx.fillStyle = '#2D7DBC';
            ctx.fill();
            ctx.closePath();
        }
    }
}


var ball = {
    radius: 5,
    color: '#2D7DBC',
}
ball.draw = function (){
    ctx.beginPath();
    ctx.arc(x, y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
    if ( x + dx < ball.radius || x + dx > CANVAS.width - ball.radius){
        dx = -dx;
        ball.color = newColor();
    }
    if ( y + dy < ball.radius){
        dy = -dy;
        ball.color = newColor();
    }
    if (y + dy > CANVAS.height - (paddle.height + ball.radius)){
        if ( x + ball.radius > paddle.xPos && x + ball.radius < paddle.xPos + paddle.width ){
            dy = -dy;
            ball.color = newColor();
        }
        if (y + dy > CANVAS.height - (ball.radius / 2)){
            alert("GAME OVER");
            document.location.reload();
        }
    }
}


var paddle = {
    height: 10,
    width: 75,
    color: '#2D7DBC'
};
paddle.xPos = (CANVAS.width - paddle.width) / 2;
paddle.draw = function(){
    ctx.beginPath;
    ctx.rect(paddle.xPos, CANVAS.height - paddle.height, paddle.width, paddle.height);
    ctx.fillStyle = paddle.color;
    ctx.fill();
    ctx.closePath();
    if(rightPressed && paddle.xPos < CANVAS.width - paddle.width){
        paddle.xPos += 7;
    }else if(leftPressed && paddle.xPos > 0){
        paddle.xPos -= 7;
    }
}

function newColor(){
    const palate = ['#177E89', '#DB3A34', '#084C61', '#FFC857'];
    return (palate.indexOf(ball.color) === palate.length - 1) ? palate[0] : palate[palate.indexOf(ball.color) + 1];
}

function draw() {
    if (isPaused === false){
        ctx.clearRect(0, 0, CANVAS.width, CANVAS.height); // clear the entire canvas before drawing
        drawBricks();
        ball.draw();
        paddle.draw();

        x += dx;
        y += dy;
    }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(event) {
    if (event.keyCode === 37 || event.keyCode === 65){
        leftPressed = true;
    }
    else if (event.keyCode === 39 || event.keyCode === 68){
        rightPressed = true;
    }
    else if (event.keyCode === 27){
        if (isPaused === false){
            isPaused = true;
        }else {
            isPaused = false;
        }
    }
}

function keyUpHandler(event) {
    if (event.keyCode === 37 || event.keyCode === 65){
        leftPressed = false;
    }
    else if (event.keyCode === 39 || event.keyCode === 68){
        rightPressed = false;
    }
}

setInterval(draw, 10);

 // draw every 10miliseconds
},{}]},{},[1])

//# sourceMappingURL=bundle.js.map
