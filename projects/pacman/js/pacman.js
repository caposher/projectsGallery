'use strict';
const PACMAN = '😷';

var gPacman;
function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5,
    },
    angle: 0,
    isSuper: false,
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}
function movePacman(ev) {
  if (!gGame.isOn) return;

  var nextLocation = getNextLocation(ev);
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  switch (nextCell) {
    case WALL:
      return;
    case GHOST:
      if (getGhostYamiState()) {
        removeGhost(nextLocation);
      } else {
        gameOver(false);
        renderCell(gPacman.location, EMPTY);
        return;
      }
      break;
    case FOOD:
      updateScore(nextCell);
      gGame.foodCollect++;
      console.log(gGame.foodCollect);
      break;
    case SUPER_FOOD:
      if (getGhostYamiState()) return;

      updateScore(nextCell);
      gGame.foodCollect++;
      console.log(gGame.foodCollect);
      ghostsAreYami(true);
      break;
    case CHERRY:
      updateScore(nextCell);
      break;
  }

  if (gGame.foodCollect === FOOD_AMOUNT) {
    gameOver(true);
  }

  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

  // update the dom
  renderCell(gPacman.location, EMPTY);

  gPacman.location = nextLocation;

  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // update the dom
  renderCell(gPacman.location, PACMAN);
}

function getNextLocation(eventKeyboard) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
    angle: 0,
  };
  switch (eventKeyboard.code) {
    case 'ArrowUp':
      gPacman.angle = 0;
      nextLocation.i--;
      break;
    case 'ArrowDown':
      gPacman.angle = 180;
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      gPacman.angle = 270;
      nextLocation.j--;
      break;
    case 'ArrowRight':
      gPacman.angle = 90;
      nextLocation.j++;
      break;
    default:
      return null;
  }
  return nextLocation;
}
