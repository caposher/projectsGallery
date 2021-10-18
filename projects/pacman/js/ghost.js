'use strict';
const GHOST = '&#9781;';
const YAMI = 'yami';
const GHOST_STEP_T = 1000;
const GHOST_YAMI_TMO = 5000;

var gGhosts = [];
var gIntervalGhosts;
var gIsGhostYami = false;

function createGhost(board) {
  var ghost = {
    location: {
      i: 3,
      j: 3,
    },
    currCellContent: EMPTY,
    id: getRandomIntInt(0, GHOST_NUM),
  };
  gGhosts.push(ghost);
  board[ghost.location.i][ghost.location.j] = GHOST;
}

function createGhosts(board) {
  gGhosts = [];
  createGhost(board);
  createGhost(board);
  createGhost(board);
  gIntervalGhosts = setInterval(moveGhosts, GHOST_STEP_T);
}

function moveGhosts() {
  for (var i = 0; i < gGhosts.length; i++) {
    var ghost = gGhosts[i];
    moveGhost(ghost);
  }
}
function moveGhost(ghost) {
  var moveDiff = getMoveDiff();
  var nextLocation = {
    i: ghost.location.i + moveDiff.i,
    j: ghost.location.j + moveDiff.j,
  };
  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  if (nextCell === WALL) return;
  if (nextCell === GHOST) return;
  if (nextCell === PACMAN) {
    if (getGhostYamiState()) {
      removeGhost(ghost.location);
    } else {
      gameOver(false);
    }
    return;
  }

  // model
  gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
  // dom
  renderCell(ghost.location, ghost.currCellContent);

  // model
  ghost.location = nextLocation;
  ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j];
  gBoard[ghost.location.i][ghost.location.j] = GHOST;
  // dom

  renderCell(ghost.location, getGhostYamiState() ? YAMI : GHOST);
}

function getMoveDiff() {
  var randNum = getRandomIntInt(0, 100);
  if (randNum < 25) {
    return { i: 0, j: 1 };
  } else if (randNum < 50) {
    return { i: -1, j: 0 };
  } else if (randNum < 75) {
    return { i: 0, j: -1 };
  } else {
    return { i: 1, j: 0 };
  }
}

// function getGhostHTML(ghostColor) {
//   return `<span style="color: ${ghostColor}">${GHOST}</span>`;
// }

function ghostsAreYami(isYami) {
  gIsGhostYami = isYami;
  if (isYami) {
    //the ghosts are eatable
    for (var i = 0; i < gGhosts.length; ++i) {
      renderCell(gGhosts[i].location, YAMI);
    }
    setTimeout(ghostsAreYami, GHOST_YAMI_TMO, false);
  } else {
    //the ghosts are not eatable, restore all eaten ghost back
    while (GHOST_NUM - gGhosts.length > 0) {
      createGhost(gBoard);
      console.log(gGhosts.length);
    }
    for (var i = 0; i < gGhosts.length; ++i) {
      renderCell(gGhosts[i].location, GHOST);
    }
  }
}

function removeGhost(gstLoc) {
  for (var k = 0; k < gGhosts.length; k++) {
    if (gGhosts[k].location.i === gstLoc.i && gGhosts[k].location.j === gstLoc.j) {
      if (gGhosts[k].currCellContent === FOOD || gGhosts[k].currCellContent === SUPER_FOOD) {
        updateScore(gGhosts[k].currCellContent);
        gGame.foodCollect++;
      }
      gGhosts.splice(k, 1);
      break;
    }
  }
  console.log(gGhosts);
  gBoard[gstLoc.i][gstLoc.j] = EMPTY;
  renderCell(gstLoc, EMPTY);
}

function getGhostYamiState() {
  return gIsGhostYami;
}

function setGhostYamiState(isYami) {
  gIsGhostYami = isYami;
}

function getGhost(location) {
  var ghost = null;
  for (var k = 0; k < gGhosts.length; k++) {
    if (gGhosts[k].location.i === location.i && gGhosts[k].location.j === location.j) {
      ghost = gGhosts[k];
      break;
    }
  }
  return ghost;
}
