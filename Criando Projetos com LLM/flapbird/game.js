// Parâmetros do jogo
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Carregar imagem do Mario
const marioImg = new Image();
marioImg.src = 'mario.png'; // Adicione a imagem mario.png na mesma pasta

const GRAVITY = 0.25;
const JUMP = -5;
const PIPE_WIDTH = 60;
const PIPE_GAP = 150;

let mario = { x: 50, y: 250, w: 40, h: 40, velocity: 0 };
let pipes = [];
let score = 0;
let gameOver = false;

function resetGame() {
    mario.y = 250;
    mario.velocity = 0;
    pipes = [];
    score = 0;
    gameOver = false;
}

function drawMario() {
    ctx.drawImage(marioImg, mario.x, mario.y, mario.w, mario.h);
}

function drawPipes() {
    ctx.fillStyle = '#228B22';
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.top);
        ctx.fillRect(pipe.x, pipe.top + PIPE_GAP, PIPE_WIDTH, canvas.height - pipe.top - PIPE_GAP);
    });
}

function drawScore() {
    ctx.fillStyle = '#fff';
    ctx.font = '32px Arial';
    ctx.fillText(score, 20, 50);
}

function update() {
    if (gameOver) return;
    mario.velocity += GRAVITY;
    mario.y += mario.velocity;

    // Adicionar novos canos
    if (pipes.length === 0 || pipes[pipes.length - 1].x < 200) {
        const top = Math.random() * (canvas.height - PIPE_GAP - 100) + 50;
        pipes.push({ x: canvas.width, top });
    }

    // Atualizar posição dos canos
    pipes.forEach(pipe => pipe.x -= 2);

    // Remover canos fora da tela
    if (pipes.length && pipes[0].x + PIPE_WIDTH < 0) {
        pipes.shift();
        score++;
    }

    // Colisão
    pipes.forEach(pipe => {
        if (
            mario.x < pipe.x + PIPE_WIDTH &&
            mario.x + mario.w > pipe.x &&
            (mario.y < pipe.top || mario.y + mario.h > pipe.top + PIPE_GAP)
        ) {
            gameOver = true;
        }
    });

    // Colisão com o chão ou teto
    if (mario.y + mario.h > canvas.height || mario.y < 0) {
        gameOver = true;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPipes();
    drawMario();
    drawScore();
    if (gameOver) {
        ctx.fillStyle = '#000a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = '48px Arial';
        ctx.fillText('Game Over', 70, 300);
        ctx.font = '24px Arial';
        ctx.fillText('Pressione espaço para reiniciar', 40, 350);
    }
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

window.addEventListener('keydown', e => {
    if (e.code === 'Space') {
        if (gameOver) {
            resetGame();
        } else {
            mario.velocity = JUMP;
        }
    }
});

marioImg.onload = () => {
    loop();
};
