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
    columnCount: 7,
    padding: CANVAS.width * 0.01
}
brick.paddingUnitNumber = brick.columnCount + 1;
brick.width = (CANVAS.width - (brick.paddingUnitNumber * brick.padding)) / brick.columnCount;
brick.height = brick.width / 8;

var bricks = [];
for (c = 0; c < brick.columnCount; c++) {
    bricks[c] = [];
    for (r = 0; r < brick.rowCount; r++) {
        bricks[c][r] = {x: 0, y: 0, status: 1};
    }
}

function drawBricks(){
    for (c = 0; c < brick.columnCount; c++) {
        for (r = 0; r < brick.rowCount; r++){
            if (bricks[c][r].status === 1) {
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
}

function brickCollision() {
    for (c = 0; c < brick.columnCount; c++){
        for (r = 0; r < brick.rowCount; r++){
            let thisBrick = bricks[c][r];
            if (thisBrick.status === 1){
                let ballPositionY = getBallPositionY();
                let ballPositionX = getBallPositionX();
                if ( ballPositionY < thisBrick.y + brick.height && ballPositionY > thisBrick.y ){
                    if( ballPositionX < thisBrick.x + brick.width && ballPositionX > thisBrick.x){
                        dy = -dy;
                        thisBrick.status = 0;
                    }
                }
            }
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
    if ( x + dx < ball.radius || x + dx > CANVAS.width - ball.radius){ // hits left limit of canvas, hit right limit of canvas
        dx = -dx;
    }
    if ( y + dy < ball.radius){ // hits canvas ceiling
        dy = -dy;
    }
    // hits paddle
    if (y + dy + ball.radius > CANVAS.height - paddle.height){ 
        if ( x - ball.radius > paddle.xPos && x + ball.radius < paddle.xPos + paddle.width ){
            dy = -dy;
        }
    }
    // hits canvas floor
    if (y + dy > CANVAS.height){
        isPaused = true;
        alert("GAME OVER");
        document.location.reload();
    }
}

function getBallPositionY() {
    let ballPositionY;
    if (dy < 0){
        ballPositionY = y + dy - ball.radius;
    } else if (dy > 0){
        ballPositionY = y + dy + ball.radius;
    }
    return ballPositionY;
}

function getBallPositionX() {
    let ballPositionX;
    if (dx < 0){
        ballPositionX = x + dx - ball.radius;
    } else if (dx > 0){
        ballPositionX = x + dx + ball.radius;
    }
    return ballPositionX;
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

function draw() {
    if (isPaused === false){
        ctx.clearRect(0, 0, CANVAS.width, CANVAS.height); // clear the entire canvas before drawing
        drawBricks();
        ball.draw();
        paddle.draw();
        brickCollision();

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