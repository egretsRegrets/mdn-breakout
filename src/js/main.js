const CANVAS = document.getElementById('myCanvas');
const ctx = CANVAS.getContext('2d');

var x = CANVAS.width / 2;
var y = CANVAS.height - 30;
var dx = 1.5; // x offset at each new frame
var dy = -1.5; // y offset at each new frame
var rightPressed = false;
var leftPressed = false;
var isPaused = false;

var ball = {
    radius: 5,
    color: '#177E89',
    draw: function () {
        ctx.beginPath();
        ctx.arc(x, y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();
    }
}

var paddle = {
    height: 10,
    width: 75,
    color: '#EF7030'
};
paddle.xPos = (CANVAS.width - paddle.width) / 2;
paddle.draw = function(){
    ctx.beginPath;
    ctx.rect(paddle.xPos, CANVAS.height - paddle.height, paddle.width, paddle.height);
    ctx.fillStyle = paddle.color;
    ctx.fill();
    ctx.closePath();
}

function newColor(){
    const palate = ['#177E89', '#DB3A34', '#084C61', '#FFC857'];
    return (palate.indexOf(ball.color) === palate.length - 1) ? palate[0] : palate[palate.indexOf(ball.color) + 1];
}

function draw() {
    if (isPaused === false){
        ctx.clearRect(0, 0, CANVAS.width, CANVAS.height); // clear the entire canvas before drawing
        paddle.draw();
        ball.draw();
        
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

        if(rightPressed && paddle.xPos < CANVAS.width - paddle.width){
            paddle.xPos += 7;
        }else if(leftPressed && paddle.xPos > 0){
            paddle.xPos -= 7;
        }

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