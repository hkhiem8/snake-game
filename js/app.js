/*-------------- Constants -------------*/

var canvas = document.getElementById("map");
var context = canvas.getContext("2d");

// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage

const grid = 20;
let count = 0;

/*---------- Variables (state) ---------*/

let snake = {
  x: 200,
  y: 200,

  // snake velocity: the snake moves one grid length (20) each frame in either x or y direction
  vx: grid,
  vy: 0,

  snakeCells: [], // keeps track of all the grids that the snake body occupies
  maxLength: 4,
};
let fruit = { x: 100, y: 100 };
let score = 0;
let highscore = 0;

// inspiration from https://gist.github.com/straker/ff00b4b49669ad3dec890306d348adc4#file-snake-html-L63-L66

/*----- Cached Element References  -----*/

const scoreEl = document.querySelector("#score");
const highScoreEl = document.querySelector("#highscore");

/*-------------- Functions -------------*/

function init() {
  snake = {
    x: 200,
    y: 200,
    vx: grid,
    vy: 0,
    snakeCells: [],
    maxLength: 4,
  };
  fruit = randomPosition();
  score = 0;
  updateHighScore();
  requestAnimationFrame(gameLoop);
}

function renderSnake() {
  context.fillStyle = "black";
  snake.snakeCells.forEach((snakeCell, index) => {
    context.fillRect(snakeCell.x, snakeCell.y, grid, grid); // rendering the snake one cell at a time
  });
}

// when the snake eats, it grows 1 cell, and the fruit position gets randomized
function snakeEat() {
  if (snake.snakeCells[0].x === fruit.x && snake.snakeCells[0].y === fruit.y) {
    snake.maxLength++;
    fruit = randomPosition();
  }
}

function renderFruit() {
  context.fillStyle = "red";
  context.fillRect(fruit.x, fruit.y, grid, grid);
}

// generates random coordinate for the fruit. +1 because it returns a number between 0 and 20
function randomPosition() {
  const x = Math.floor(Math.random() * 25) * grid;
  const y = Math.floor(Math.random() * 25) * grid;
  return { x, y };
}

// this game loop acts like the render function on loop
function gameLoop() {
  requestAnimationFrame(gameLoop);

  // FPS
  if (++count < 4) {
    return;
  }

  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height); // erases canvas, required at the start of each animation frame

  // the snake is moved by its velocity
  snake.x += snake.vx;
  snake.y += snake.vy;

  // adds cells as the snake moves into them
  snake.snakeCells.unshift({ x: snake.x, y: snake.y }); // simpler than declaring head,

  // remove cells as the snake moves away from them
  if (snake.snakeCells.length > snake.maxLength) {
    snake.snakeCells.pop();
  }

  renderFruit();
  renderSnake();
  snakeEat();
  updateScore();
  checkCollision();
}

function checkCollision() {
  const head = snake.snakeCells[0];
  if (
    head.x < 0 ||
    head.x > canvas.width ||
    head.y < 0 ||
    head.y > canvas.height
  ) {
    init();
  }
  for (let i = 1; i < snake.snakeCells.length; i++) {
    if (head.x === snake.snakeCells[i] && head.y === snake.snakeCells[i].y) {
      init();
    }
  }
}

const currentScore = snake.length - 4;

function updateScore() {
  scoreEl.textContent = currentScore;
}

function updateHighScore() {
  if (currentScore > highscore) {
    highscore = currentScore;
    highScoreEl.textContent = highscore;
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key

function handleKeyPress(event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
  switch (event.key) {
    case "ArrowDown":
      snake.vx = 0;
      snake.vy = grid;
      break;
    case "ArrowUp":
      snake.vx = 0;
      snake.vy = -grid;
      break;
    case "ArrowLeft":
      snake.vx = -grid;
      snake.vy = 0;
      break;
    case "ArrowRight":
      snake.vx = grid;
      snake.vy = 0;
      break;
  }
}

function start(event) {
  if (event.key === " ") {
    init();
  }
}

/*----------- Event Listeners ----------*/
document.addEventListener("keydown", handleKeyPress);
document.addEventListener("keydown", start);
