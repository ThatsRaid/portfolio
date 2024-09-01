function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

const canvas = document.getElementById('dots-background');
const ctx = canvas.getContext('2d');
let dots = [];

const gridSize = 40;
const dotSize = 1;
const speed = 0.5;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initDots();
}

function initDots() {
    dots = [];
    for (let x = 0; x <= canvas.width + gridSize; x += gridSize) {
        for (let y = 0; y <= canvas.height + gridSize; y += gridSize) {
            dots.push({ x, y });
        }
    }
}

function updateDotsColor() {
    ctx.fillStyle = document.body.classList.contains('dark-mode') ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';
}

function drawDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateDotsColor();
    
    dots.forEach(dot => {
        dot.x -= speed;
        dot.y += speed;

        if (dot.x < -gridSize) dot.x = canvas.width + gridSize;
        if (dot.y > canvas.height + gridSize) dot.y = -gridSize;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(drawDots);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawDots();
