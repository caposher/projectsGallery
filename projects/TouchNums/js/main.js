'use strict';

var gBoard = [];
var gBoardSize = 5;
var gExpectedNum = 1;
var gIntervalUid = null;
var gTimerStart = 0;

var clickSound = new Audio('audio/beep.wav');
var winSound = new Audio('audio/win.wav');

function init() {
  createBoard();
}

function createBoard() {
  var nums = generateNums(gBoardSize ** 2);
  var cellStr = '';

  for (var i = 0; i < gBoardSize; i++) {
    gBoard[i] = [];
    cellStr += `<tr>`;
    for (var j = 0; j < gBoardSize; j++) {
      var num = chooseNumber(nums);
      gBoard[i][j] = num;
      //   cellStr += `<td data-num="${num}">${num}</td>`;
      cellStr += `<td onclick="cellClicked(${num},this)">${num}</td>`;
    }
    cellStr += `</tr>`;
  }

  var elTable = document.querySelector('.board');
  elTable.innerHTML = cellStr;
}

function cellClicked(selectedNum, elCell) {
  if (selectedNum === 1) {
    gTimerStart = Date.now();
    gIntervalUid = setInterval(displayTimer, 100);
  }
  if (selectedNum === gExpectedNum) {
    clickSound.play();
    elCell.classList.add('num-off');
    gExpectedNum++;
  }

  if (checkEndGame()) {
    clearInterval(gIntervalUid);
    winSound.play();
  }
}

function displayTimer() {
  var time = Date.now();
  var secStr = Math.floor((time - gTimerStart) / 1000) + '';
  var milliSecStr = ((time - gTimerStart) % 1000) + '';

  var elTimer = document.querySelector('.timer');
  elTimer.innerText = `${secStr.padStart(2, '0')}:${milliSecStr.padStart(3, '0')}`;
}

function checkEndGame() {
  return gExpectedNum === gBoardSize ** 2 + 1;
}

function restartGame(elInput) {
  if (elInput) gBoardSize = elInput.value;
  if (gIntervalUid) {
    clearInterval(gIntervalUid);
    gIntervalUid = null;
    gTimerStart = 0;
    document.querySelector('.timer').innerHTML = '00:000';
    gExpectedNum = 1;
  }
  init();
}
