const CANVAS = document.getElementById('myCanvas');
const ctx = CANVAS.getContext('2d');

var x = CANVAS.width / 2;
var y = CANVAS.height - 30;
var dx = 1.5; // x offset at each new frame
var dy = -1.5; // y offset at each new frame
var rightPressed = false;
var leftPressed = false;
var isPaused = false;
var score = 0;
var lives = 3;

var brick = {
    rowCount: 4,
    columnCount: 7,
    padding: CANVAS.width * 0.01
}
brick.paddingUnitNumber = brick.columnCount + 1;
brick.width = (CANVAS.width - (brick.paddingUnitNumber * brick.padding)) / brick.columnCount;
brick.height = CANVAS.height * 0.03;

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
                        score += 1;
                        if (score === brick.columnCount * brick.rowCount){
                            isPaused = true;
                            alert("win!");
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }
}


var ball = {
    radius: 4,
    color: '#7ACFD6'
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
    if ( x + dx - ball.radius > paddle.xPos && x + dx + ball.radius < paddle.xPos + paddle.width ) { 
        if (y + dy + ball.radius >= CANVAS.height - paddle.height && y + dy < CANVAS.height) {
            dy = -dy;
            if (dy > -2.5){ // speed up ball up to 3px diff per frame
                dy -= .15;
                if(dx > 0){
                    dx += .15;
                }else if (dx < 0){
                    dx -= .15;
                }
            }
        }
    }
    // hits canvas floor
    if (y + dy > CANVAS.height){
        if (lives > 0){
            lives -= 1;
            x = paddle.xPos + paddle.width / 2;
            y = CANVAS.height - paddle.height - ball.radius;
            dx = 1.5;
            dy = -1.5;
        }else{
            isPaused = true;
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

function draw() {
    if (isPaused === false){
        ctx.clearRect(0, 0, CANVAS.width, CANVAS.height); // clear the entire canvas before drawing
        drawBricks();        
        paddle.draw();
        ball.draw();
        brickCollision();
        drawScore();
        drawLives();

        x += dx;
        y += dy;

        if (isPaused === false){
            requestAnimationFrame(draw);
        }
    }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.getElementsByClassName('mouse-toggle')[0].addEventListener('click', enableMouseControl, false);

function drawScore(){
    ctx.font = '12px Arial';
    ctx.fillStyle = '#F45B69';
    ctx.fillText(`Score: ${score}`, 8, CANVAS.height - 40);
}
function drawLives(){
    ctx.font = '12px Arial';
    ctx.fillStyle = '#F45B69';
    ctx.fillText(`Lives: ${lives}`, 8, CANVAS.height - 25);
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
            draw();
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

function mouseMoveHandler (event) {
    let relativeX = event.clientX - CANVAS.offsetLeft;
    if (relativeX - paddle.width / 2 > 0 && relativeX + paddle.width / 2 < CANVAS.width){
        paddle.xPos = relativeX - paddle.width / 2;
    }
}

function enableMouseControl (){
    let btn = document.getElementsByClassName('mouse-toggle')[0];
    let btnClasses = btn.classList;
    if(!btnClasses.contains('on')){
        btnClasses.add('on');
        document.addEventListener('mousemove', mouseMoveHandler, false);
    }else{
        btnClasses.remove('on');
        document.removeEventListener('mousemove', mouseMoveHandler, false);
    }
}

draw();

 // draw every 10miliseconds