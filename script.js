const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

// Define as dimensões do canvas
canvas.width = 600;
canvas.height = 400;

// Criando as entidades do jogo

const paddleWidth = 10, paddleHeight = 100;
const ballRadius = 8;

let paddleSpeed = 10;

// Barra do jogador
const player = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "#FFFFFF",
    dy: 0 // Velocidade de movimento
};

// Barra do computador
const computer = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "#FFFFFF",
    dy: 0
};

// Bola
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: ballRadius,
    speed: 4,
    dx: 4,
    dy: 4,
    color: "#FFFFFF"
};

// Controle do jogador
document.addEventListener("keydown", movePlayer);
document.addEventListener("keyup", stopPlayer);

function movePlayer(event) {
    if (event.key === "ArrowUp") {
        player.dy = -paddleSpeed;
    } else if (event.key === "ArrowDown") {
        player.dy = paddleSpeed;
    }
}

function stopPlayer(event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        player.dy = 0;
    }
}

// Movimento da bola
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Colisão com as paredes superior e inferior
    if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvas.height) {
        ball.dy = -ball.dy;
    }

    // Colisão com a barra do jogador
    if (ball.x - ball.radius <= player.x + player.width && ball.y >= player.y && ball.y <= player.y + player.height) {
        ball.dx = -ball.dx;
    }

    // Colisão com a barra do computador
    if (ball.x + ball.radius >= computer.x && ball.y >= computer.y && ball.y <= computer.y + computer.height) {
        ball.dx = -ball.dx;
    }

    // Se a bola sair da tela
    if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= canvas.width) {
        resetBall();
    }
}

// Reseta a bola para o centro
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx;
    ball.dy = 4;
}

// Movimento da barra do computador
function moveComputer() {
    if (ball.y < computer.y + computer.height / 2) {
        computer.dy = -paddleSpeed;
    } else if (ball.y > computer.y + computer.height / 2) {
        computer.dy = paddleSpeed;
    } else {
        computer.dy = 0;
    }

    computer.y += computer.dy;
}

// Atualiza a tela
function update() {
    // Limpar o canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha a bola
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = ball.color;
    context.fill();
    context.closePath();

    // Desenha as barras
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.width, player.height);

    context.fillStyle = computer.color;
    context.fillRect(computer.x, computer.y, computer.width, computer.height);

    // Mover as entidades
    moveBall();
    moveComputer();

    // Atualizar a posição da barra do jogador
    player.y += player.dy;

    // Impedir que as barras saiam da tela
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;

    // Desenho contínuo
    requestAnimationFrame(update);
}

// Iniciar o jogo
update();
