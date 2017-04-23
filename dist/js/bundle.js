(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}]},{},[1])

//# sourceMappingURL=bundle.js.map
