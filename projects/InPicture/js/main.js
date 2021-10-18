'use strict';
var gQuests;
var gCurrQuestIdx = 0;
var wrongSound = new Audio('audio/wrong.wav');
var victorySound = new Audio('audio/success.mp3');

function initGame() {
  gCurrQuestIdx = 0;
  gQuests = createQuestions();
  renderQuest();
}

function createQuestions() {
  return [
    {
      id: 1,
      opts: ['Bee-eater', 'Roller', 'Kingfisher'],
      correctAnsIndex: 0,
      style: { bright1: '#F2CCB6', bright2: '#BF9D7E ', color1: '#F29F05', color2: '#F2B705', darkColor: '#022601' },
    },
    {
      id: 2,
      opts: ['Pied Kingfisher', 'syrian Woodpecker', 'Great Tit'],
      correctAnsIndex: 1,
      style: { bright1: '#BFA58E', bright2: '#A68F65', color1: '#848C49', color2: '#6C8C27', darkColor: '#262526' },
    },
    {
      id: 3,
      opts: ['Robin', 'Wagtail', 'Wheatear'],
      correctAnsIndex: 2,
      style: { bright1: '#F2F2F2', bright2: '#D9BCA3', color1: '#BFAB93', color2: '#A69856', darkColor: '#0D0D0D' },
    },
  ];
}

function renderQuest() {
  var question = gQuests[gCurrQuestIdx];
  var questionStruct = `<h1 class="title">Guess the bird</h1>
                        <img src="img/${question.id}.jpg" /><br />`;

  for (var i = 0; i < question.opts.length; i++) {
    questionStruct += `<button onmouseout="setBrighter(${gCurrQuestIdx},this)" onmouseover="setDarker(${gCurrQuestIdx},this)" onclick="checkAnswer(${i})">${question.opts[i]}</button>`;
  }
  document.querySelector('.card').innerHTML = questionStruct;
  renderStyle(gQuests[gCurrQuestIdx].style);
}

function renderStyle(style) {
  document.querySelector('body').style.backgroundColor = style.bright1;
  document.querySelector('.card').style.backgroundColor = style.bright2;
  document.querySelector('.card').style.boxShadow = `2px 2px 4px ${style.darkColor}`;
  document.querySelector('img').style.borderColor = style.color1;
  document.querySelector('.title').style.color = style.color2;

  var buttons = document.querySelectorAll('button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.color = style.darkColor;
    buttons[i].style.backgroundColor = style.color2;
  }
}

function setDarker(styleIdx, elBtn) {
  elBtn.style.color = gQuests[styleIdx].style.color2;
  elBtn.style.backgroundColor = gQuests[styleIdx].style.darkColor;
}
function setBrighter(styleIdx, elBtn) {
  elBtn.style.color = gQuests[styleIdx].style.darkColor;
  elBtn.style.backgroundColor = gQuests[styleIdx].style.color2;
}

function checkAnswer(ansIndex) {
  if (ansIndex === gQuests[gCurrQuestIdx].correctAnsIndex) {
    gCurrQuestIdx++;

    if (gCurrQuestIdx === gQuests.length) {
      showVictory();
    } else {
      renderQuest();
    }
  } else {
    wrongSound.play();
  }
}

function showVictory() {
  var victoryText = `<h1 class="title">Master of Birds!!!</h1>
  <img src="img/victory.jpg" style="width:300px " /><br />
  <button onclick="initGame()">Restart</button>`;
  victorySound.play();
  document.querySelector('.card').innerHTML = victoryText;
  renderStyle({ bright1: '#6D7E8C', bright2: '#394D59', color1: '#D9BF71', color2: '#F2C4C4', darkColor: '#0D0D0D' });
}
