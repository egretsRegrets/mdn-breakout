const CANVAS = document.getElementById('myCanvas');
const ctx = CANVAS.getContext('2d');

var x = CANVAS.width / 2;
var y = CANVAS.height - 30;
var dx = 1.5; // x offset at each new frame
var dy = -1.5; // y offset at each new frame

var ball = {
    radius: 5,
    color: '#177E89'
}

function newColor(){
    const palate = ['#177E89', '#DB3A34', '#084C61', '#FFC857'];
    return (palate.indexOf(ball.color) === palate.length - 1) ? palate[0] : palate[palate.indexOf(ball.color) + 1];
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, CANVAS.width, CANVAS.height); // clear the entire canvas before drawing
    drawBall();
    x += dx;
    y += dy;
    if ( x + dx < ball.radius || x + dx > CANVAS.width - ball.radius){
        dx = -dx;
        ball.color = newColor();
    }
    if ( y + dy < ball.radius || y + dy > CANVAS.height - ball.radius){
        dy = -dy;
        ball.color = newColor();
    }
}
setInterval(draw, 10); // draw every 10miliseconds