const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// canvas.width = 800;
// canvas.height = canvas.width;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawLineSet(angle) {
  let x = canvas.width / 2;
  let y = canvas.height / 2;

  for (let n = 0; n < 20; n++) {
    const length = Math.floor(Math.random() * 30) + 5;
    const spacing = Math.floor(Math.random() * 15) + 5;

    ctx.strokeStyle = `hsl(${(n * 360) / 20}, 50%, 50%)`;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + length * Math.cos(angle), y + length * Math.sin(angle));
    ctx.stroke();

    x += length * Math.cos(angle) + spacing * Math.cos(angle);
    y += length * Math.sin(angle) + spacing * Math.sin(angle);
  }
}

function drawRadial() {
  for (let angle = 0; angle < 2 * Math.PI; angle += Math.PI / 30) {
    drawLineSet(angle);
  }

  //   ctx.fillStyle = "#000";
  //   ctx.beginPath();
  //   ctx.arc(canvas.width / 2, canvas.height / 2, 30, 0, 2 * Math.PI);
  //   ctx.fill();
}

drawRadial();
