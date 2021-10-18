function printBoard(mat, selector) {
  var strHTML = '<table cellspacing="0" border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      strHTML += `<td class="${className} ${getGameObjectClass(cell)}"></td>`;
      // strHTML += '<td class="' + className + '"> ' + cell + ' </td>';
    }
    strHTML += '</tr>';
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;

  //add cat images
  // var elGhosts = document.querySelectorAll('.ghost');
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  const gameObjIndex = 2;
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  //remove all object classes
  elCell.classList.remove(elCell.classList[gameObjIndex]);
  //add new object class
  var classStr = getGameObjectClass(value);
  if (value === GHOST) {
    var ghostObj = getGhost(location);
    classStr += ghostObj.id;
  }

  elCell.classList.add(classStr);
}

function getGameObjectClass(objSymbol) {
  var cbjClass = null;
  switch (objSymbol) {
    case WALL:
      cbjClass = 'wall';
      break;
    case FOOD:
      cbjClass = 'food';
      break;
    case SUPER_FOOD:
      cbjClass = 'superFood';
      break;
    case CHERRY:
      cbjClass = 'charrySpot';
      break;
    case PACMAN:
      cbjClass = 'player';
      break;
    case GHOST:
      cbjClass = 'ghost';
      break;
    case YAMI:
      cbjClass = 'yamiGhost';
      break;
    case EMPTY:
      break;
    default:
      debugger;
      console.log('cant find img');
  }
  return cbjClass;
}

function getRandomIntInt(min, max) {
  var num = Math.floor(Math.random() * (max - min)) + min;
  console.log('num:', num);
  return num;
}

function getRandomColor() {
  var values = '0123456789abcdef';
  var colorStr = '#';
  for (var i = 0; i < 6; i++) {
    colorStr += values[getRandomIntInt(0, 16)];
  }
  return colorStr;
}

function getRandLocation(matSize) {
  return { i: getRandomIntInt(1, matSize - 1), j: getRandomIntInt(1, matSize - 1) };
}
