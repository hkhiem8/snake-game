/*-------------- Constants -------------*/

var canvas = document.getElementById("map");
var context = canvas.getContext("2d");
const grid = 20;
let count = 0;

/*---------- Variables (state) ---------*/

let snake = {
  x: 200,
  y: 200,
  vx: grid, // Snake velocity: the snake moves one grid length (20) each frame in either x or y direction
  vy: 0,
  snakeCells: [], // Keeps track of all the grids that the snake body occupies
  maxLength: 4
};

let fruit = randomPosition();
let score = 0;
let highscore = 0;
let gameId = null;
let isRunning = false;
let winner = false;

/*----- Cached Element References  -----*/

const scoreEl = document.querySelector("#score");
const highScoreEl = document.querySelector("#highscore");
const challengeStatusEl = document.querySelector(".challenge-status");

/*-------------- Functions -------------*/

function init() {
  if (gameId) {
    cancelAnimationFrame(gameId); // Cancels any previous animation frame based on gameId
  }
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
  updateScore();
  updateHighScore();
  winner = false;
  isRunning = true;
  gameId = requestAnimationFrame(gameLoop); // Starts a new animation loop and stores the instance in gameId
}

function renderSnake() {
  context.fillStyle = "black";
  snake.snakeCells.forEach((snakeCell, index) => {
    context.fillRect(snakeCell.x, snakeCell.y, grid, grid); // Rendering the snake one cell at a time
  });
}

// When the snake eats, it grows 1 cell, and the fruit position gets randomized
function snakeEat() {
  if (snake.snakeCells[0].x === fruit.x && snake.snakeCells[0].y === fruit.y) {
    snake.maxLength++;
    score++;
    updateScore();
    updateHighScore();
    checkForWinner();
    fruit = randomPosition();
  }
}

function renderFruit() {
  context.fillStyle = "red";
  context.fillRect(fruit.x, fruit.y, grid, grid);
}

// Generates a random coordinate for the fruit
function randomPosition() {
  const x = Math.floor(Math.random() * 25) * grid;
  const y = Math.floor(Math.random() * 25) * grid;
  return { x, y };
}

// The game loop function that animates the snake and fruit
// This function acts like the render function on repeat
function gameLoop() {
  if (!isRunning) {
    return;
  }

  gameId = requestAnimationFrame(gameLoop);

  // Handles the FPS by limiting the game logic to only run every 4 frames
  // If the frame count is below 4, this exits out of the function
  // The default refresh rate on most browsers is 60, so divided by 4 is 15. This limits the FPS to 15
  if (++count < 4) {
    return;
  }

  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height); // erases canvas, required at the start of each animation frame

  // The snake is moved by its velocity
  snake.x += snake.vx;
  snake.y += snake.vy;

  // Adds cells as the snake moves into them
  snake.snakeCells.unshift({ x: snake.x, y: snake.y }); // simpler than declaring head,

  // Remove cells as the snake moves away from them
  if (snake.snakeCells.length > snake.maxLength) {
    snake.snakeCells.pop();
  }

  renderFruit();
  renderSnake();
  snakeEat();
  checkCollision();
}

function checkCollision() {
  const head = snake.snakeCells[0];
  // Checking for collision with the canvas edges
  if (
    head.x < 0 ||
    head.x > canvas.width ||
    head.y < 0 ||
    head.y > canvas.height
  ) {
    init();
  }
  // Checking for the snake's collision with itself
  for (let i = 1; i < snake.snakeCells.length; i++) {
    if (head.x === snake.snakeCells[i].x && head.y === snake.snakeCells[i].y) {
      init();
    }
  }
}

function updateScore() {
  scoreEl.textContent = score;
}

function updateHighScore() {
  if (score > highscore) {
    highscore = score;
    highScoreEl.textContent = highscore;
  }
}

// Handle key presses for snake direction
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

// Start game on spacebar press
function start(event) {
  if (event.key === " ") {
    init();
  }
}

// Pause and resume game on 'p' key press
function pauseResume(event) {
  if (event.key === "p") {
    if (isRunning) {
      isRunning = false;
      cancelAnimationFrame(gameId);
    } else {
      isRunning = true;
      gameId = requestAnimationFrame(gameLoop);
    }
  }
}

function checkForWinner() {
  if (score >= 5) {
    winner = true;
    challengeStatusEl.textContent = "Challenge Complete";
    challengeStatusEl.style.color = "green";
  }
}

/*----------- Event Listeners ----------*/
document.addEventListener("keydown", handleKeyPress);
document.addEventListener("keydown", start);
document.addEventListener("keydown", pauseResume);