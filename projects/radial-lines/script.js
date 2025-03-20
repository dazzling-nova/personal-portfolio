const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = canvas.width;

// let length = 100;

function drawLineSet(angle, t2) {
  let x = canvas.width / 2;
  let y = canvas.height / 2;

  ctx.lineWidth = 2;

  for (let n = 0; n < 10; n++) {
    ctx.strokeStyle = `hsl(${(n * 360) / 8}, 50%, 50%)`;
    const length = t2;
    // const spacing = Math.floor(Math.random() * 15) + 5;
    const spacing = t2;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + length * Math.cos(angle), y + length * Math.sin(angle));
    ctx.stroke();

    x += (length + spacing) * Math.cos(angle);
    y += (length + spacing) * Math.sin(angle);

    // console.log(spacing);
  }
}

function drawRadial(t1, t2) {
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 1;

  for (let angle = t1; angle < 360 + t1; angle += Math.PI / 15) {
    drawLineSet(angle, t2);
  }
}

drawRadial();
let a = 0;
let b = 0;
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRadial(a, b);
  a += 0.005;
  //   if (a < 0.1) {
  //     b += 1;
  //   } else {
  //     b -= 1;
  //   }
  if (Math.sin(a * 10) > 0) b += 1;
  else if (Math.sin(a * 10) < 0) b -= 1;
  requestAnimationFrame(update);
}
update();
