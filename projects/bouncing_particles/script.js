const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 20;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 20 + 6;
        this.dx = 1;
        this.dy = 1;
        this.vel = Math.random() * 0.1 + 3;
        this.hue = Math.random() * 75;
        this.color = `hsl(${this.hue},100%,50%`;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 40, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.x += this.vel * this.dx;
        this.y += this.vel * this.dy;
        this.hue += 1;
        this.color = `hsl(${this.hue},100%,50%`;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    checkBorderCollision() {
        if (this.x <= 0 || this.x >= canvas.width) this.dx *= -1;

        if (this.y <= 0 || this.y >= canvas.height) this.dy *= -1;
    }

    checkMouseCollision() {
        const distX = this.x - mouse.x;
        const distY = this.y - mouse.y;
        const dist = Math.sqrt(distX * distX + distY * distY);

        if (dist <= mouse.radius) {
            this.dx *= -1;
            this.dy *= -1;
        }
    }

    checkParticleCollision(other) {
        const distX = this.x - other.x;
        const distY = this.y - other.y;
        const dist = Math.sqrt(distX * distX + distY * distY);

        if (dist < 200) {
            const gradient = ctx.createLinearGradient(
                this.x,
                this.y,
                other.x,
                other.y
            );
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(1, other.color);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 400 / dist;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
        }
    }
}

const mouse = {
    radius: 20,
    x: 0,
    y: 0,
};

window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    console.log(e);
});

function init() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
        particles[i].draw();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
    for (let i = 0; i < particleCount; i++) {
        particles[i].update();
        particles[i].checkBorderCollision();
        particles[i].checkMouseCollision();
        for (let j = i; j < particleCount; j++)
            particles[i].checkParticleCollision(particles[j]);
    }
}

init();
animate();
