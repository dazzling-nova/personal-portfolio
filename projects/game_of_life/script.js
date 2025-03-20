const canvas = document.querySelector(".game-board");
const ctx = canvas.getContext("2d");

const nextGenBtn = document.querySelector(".next-gen-btn");
const randomizeBoardBtn = document.querySelector(".randomize-board-btn");

canvas.width = 1000;
canvas.height = canvas.width;

const tileSize = 15;
const tileNum = Math.floor(canvas.width / tileSize);
let board = [];

function generateBoard() {
  let newBoard = [];
  for (let y = 0; y < canvas.height; y += tileSize) {
    let row = [];
    for (let x = 0; x < canvas.width; x += tileSize) {
      row.push(new Tile(x, y));
    }
    newBoard.push(row);
  }
  return newBoard;
}

function drawBoard(board) {
  for (let row = 0; row < tileNum; row += 1)
    for (let col = 0; col < tileNum; col += 1) board[row][col].drawRect();
}

function computeNextGen(board) {
  let nextBoard = generateBoard();
  for (let row = 0; row < tileNum; row += 1) {
    for (let col = 0; col < tileNum; col += 1) {
      let aliveNbours = countAliveNbours(board, board[row][col]);

      if (
        (aliveNbours == 3 && board[row][col].state == 0) ||
        ((aliveNbours == 2 || aliveNbours == 3) && board[row][col].state == 1)
      )
        nextBoard[row][col].state = 1;
      else nextBoard[row][col].state = 0;
    }
  }
  return nextBoard;
}

function countAliveNbours(board, cell) {
  let currRow = cell.y / tileSize;
  let currCol = cell.x / tileSize;
  let prevRow =
    cell.y / tileSize - 1 >= 0
      ? cell.y / tileSize - 1
      : tileNum + (cell.y / tileSize - 1);
  let nextRow =
    cell.y / tileSize + 1 < tileNum
      ? cell.y / tileSize + 1
      : tileNum - (cell.y / tileSize + 1);
  let prevCol =
    cell.x / tileSize - 1 >= 0
      ? cell.x / tileSize - 1
      : tileNum + (cell.x / tileSize - 1);
  let nextCol =
    cell.x / tileSize + 1 < tileNum
      ? cell.x / tileSize + 1
      : tileNum - (cell.x / tileSize + 1);
  console.log(cell);
  console.log(prevRow, prevCol, nextRow, nextCol);
  return (
    board[prevRow][prevCol].state +
    board[prevRow][currCol].state +
    board[prevRow][nextCol].state +
    board[currRow][prevCol].state +
    board[currRow][nextCol].state +
    board[nextRow][prevCol].state +
    board[nextRow][currCol].state +
    board[nextRow][nextCol].state
  );
}

class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.state = 0;
  }

  drawRect() {
    ctx.strokeStyle = this.state == 1 ? "#0066dd" : "#000";
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.tileSize, this.tileSize);
    ctx.stroke();
  }
  drawRectFill() {
    ctx.fillStyle = this.state == 1 ? "#fff" : "#000";
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.tileSize, this.tileSize);
    ctx.fill();
    ctx.stroke();
  }
  drawCircle() {
    ctx.fillStyle = this.state == 1 ? "#33aa41" : "#000";
    ctx.lineWeight = 4;
    ctx.beginPath();
    ctx.arc(
      this.x + tileSize / 2,
      this.y + tileSize / 2,
      tileSize / 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }
}

randomizeBoardBtn.addEventListener("click", () => {
  board = generateBoard();
  for (let row = 0; row < tileNum; row += 1)
    for (let col = 0; col < tileNum; col += 1)
      board[row][col].state = Math.floor(Math.random() * 1.1);

  drawBoard(board);
});

nextGenBtn.addEventListener("click", () => {
  board = computeNextGen(board);
  drawBoard(board);
});

canvas.addEventListener("click", (e) => {
  let rect = e.target.getBoundingClientRect();
  let col = Math.floor((e.clientX - rect.left) / tileSize);
  let row = Math.floor((e.clientY - rect.top) / tileSize);
  console.log("Left? : " + col + " ; Top? : " + row + ".");
  board[row][col].state = !board[row][col].state;
  drawBoard(board);
});

board = generateBoard();
