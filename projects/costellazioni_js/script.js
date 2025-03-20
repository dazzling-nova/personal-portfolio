// GLOBAL VARIABLES

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
const starCount = 200;
const starRadius = 5;

function scale(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

function createGradient(c1, c2) {
  const gradient = ctx.createLinearGradient(0, 100, 100, 0);
  gradient.addColorStop(0, c1);
  gradient.addColorStop(1, c2);

  return gradient;
}

function createStars(count) {
  for (let i = 0; i < count; i++) {
    stars.push(
      new Star(
        canvas.width * Math.random(),
        canvas.height * Math.random(),
        starRadius,
        `hsl(${Math.random() * 360}, 100%, 70%)`,
        Math.random() * 2 - 0.5,
        Math.random() * 2 - 0.5,
        i
      )
    );
  }
}

function drawStars() {
  for (let i = 0; i < starCount; i++) {
    stars[i].drawStar();
  }
}

function updateStars() {
  for (let i = 0; i < stars.length; i++) {
    stars[i].updateStar();
    stars[i].drawConnections();
  }
}
// PROGRAM BODY

class Star {
  constructor(x, y, r, color, vx, vy, index) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.vx = vx;
    this.vy = vy;
    this.index = index;
  }

  drawStar() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  }

  updateStar() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;

    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }

  drawConnections() {
    for (let i = 0; i < starCount; i++) {
      if (i == this.index) continue;

      let d = Math.hypot(stars[i].x - this.x, stars[i].y - this.y);

      if (d < 80) {
        ctx.lineWidth = scale(d, 0, 80, 5, 0);
        // ctx.strokeStyle = createGradient(this.color, stars[i].color);
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(stars[i].x, stars[i].y);
        ctx.stroke();
      }
    }
  }
}

// ANIMATION FUNCTION
createStars(starCount);
drawStars();

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateStars();
  drawStars();

  requestAnimationFrame(update);
}

update();

// ctx.beginPath();
// ctx.strokeStyle = createGradient("red", "blue");
// ctx.strokeWidth = 20;
// ctx.moveTo(50, 50);
// ctx.lineTo(200, 200);
// ctx.stroke();
