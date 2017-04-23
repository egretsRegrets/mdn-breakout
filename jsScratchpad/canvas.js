const CANVAS = document.getElementById('myCanvas');
const CTX = CANVAS.getContext('2d');

CTX.beginPath();
CTX.rect(20, 40, 50, 50); // from left, from top, wide, tall
CTX.fillStyle = '#FF0000'; // stores color to be used by fill method
CTX.fill();
CTX.closePath();

CTX.beginPath();
CTX.arc(240, 160, 20, 0, Math.PI * 2, false);
CTX.fillStyle = 'green';
CTX.fill();
CTX.closePath();

CTX.beginPath();
CTX.rect(160, 10, 100, 40);
CTX.strokeStyle = "rgba(0, 0, 255, 0.5)";
CTX.stroke();
CTX.closePath();