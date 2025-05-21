const canvas = document.getElementById('rouletteCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 600;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 250;

let ballAngle = Math.random() * 2 * Math.PI;
let ballSpeed = 0.05;

function drawRoulette() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw roulette wheel
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#222';
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.stroke();

    // Draw ball
    const ballX = centerX + radius * 0.9 * Math.cos(ballAngle);
    const ballY = centerY + radius * 0.9 * Math.sin(ballAngle);

    ctx.beginPath();
    ctx.arc(ballX, ballY, 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();

    // Update ball position
    ballAngle += ballSpeed;

    requestAnimationFrame(drawRoulette);
}

drawRoulette();