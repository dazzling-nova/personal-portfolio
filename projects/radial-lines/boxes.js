const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const canvasSize = 800;
canvas.width = canvasSize;
canvas.height = canvasSize;

const margin = 20;

const cellRowNum = 10;
const cellSize = (canvasSize - margin * cellRowNum) / cellRowNum;

function drawSquares() {
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 5;
  for (let r = 0; r <= canvasSize; r += cellSize + margin) {
    for (let c = 0; c <= canvasSize; c += cellSize + margin) {
      ctx.beginPath();
      ctx.rect(r, c, cellSize, cellSize);
      ctx.stroke();
    }
  }
}

drawSquares();
