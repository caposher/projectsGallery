'use strict';
const WALL = '#';
const FOOD = '.';
const SUPER_FOOD = '0';
const CHERRY = '🍒';
const EMPTY = ' ';

const CHARRY_GEN_TIME = 15000;
const BOARD_SIZE = 10;
const GHOST_NUM = 3;
const FOOD_AMOUNT = (BOARD_SIZE - 2) ** 2 - GHOST_NUM - 1 - 1; /*extra -1, ghost respond spot not contain food*/

var gCharryGenInterval;
var gBoard;
var gGame = {
  score: 0,
  isOn: false,
  foodCollect: 0,
};
function init() {
  console.log('hello');
  gBoard = buildBoard(BOARD_SIZE);
  createPacman(gBoard);
  createGhosts(gBoard);
  printBoard(gBoard, '.board-container');
  gGame.isOn = true;
  gCharryGenInterval = setInterval(generateCherry, CHARRY_GEN_TIME);
}

function buildBoard(size) {
  var board = [];
  for (var i = 0; i < size; i++) {
    board.push([]);
    for (var j = 0; j < size; j++) {
      board[i][j] = FOOD;
      if (i === 0 || i === size - 1 || j === 0 || j === size - 1 || (j === 3 && i > 4 && i < size - 2)) {
        board[i][j] = WALL;
      }
    }
  }

  //add supper food at corners
  board[1][1] = SUPER_FOOD;
  board[1][BOARD_SIZE - 2] = SUPER_FOOD;
  board[BOARD_SIZE - 2][1] = SUPER_FOOD;
  board[BOARD_SIZE - 2][BOARD_SIZE - 2] = SUPER_FOOD;

  return board;
}

function updateScore(scoreType) {
  switch (scoreType) {
    case FOOD:
      gGame.score += 1;
      break;
    case CHERRY:
    case SUPER_FOOD:
      gGame.score += 10;
      break;
  }
  document.querySelector('h2 span').innerText = gGame.score;
}

function gameOver(isSuccess) {
  gGame.isOn = false;
  clearInterval(gCharryGenInterval);
  clearInterval(gIntervalGhosts);
  gCharryGenInterval = null;
  gIntervalGhosts = null;
  displayModal(true, isSuccess);
}

function restartGame() {
  gGame.score = 0;
  gGame.isOn = false;
  gGame.foodCollect = 0;
  gBoard = [];

  setGhostYamiState(false);
  displayModal(false);
  document.querySelector('h2 span').innerText = '0';

  init();
}

function displayModal(doShow, isSuccess = false) {
  var elModal = document.querySelector('.victory');
  var elTitle = elModal.querySelector('h2');

  elTitle.innerText = isSuccess ? 'VICTORY' : 'GAME OVER';
  if (doShow) elModal.classList.remove('hidden');
  else elModal.classList.add('hidden');
}

function generateCherry() {
  var randLocation = getRandLocation(BOARD_SIZE);
  if (gBoard[randLocation.i][randLocation.j] !== EMPTY) return;
  gBoard[randLocation.i][randLocation.j] = CHERRY;
  renderCell(randLocation, CHERRY);
}
