'use strict';
const STORAGE_KEY = 'projects';
var gProjects = [];
_createProjects();

function getProjects() {
  return gProjects;
}

function getProjInfo(idx) {
  return gProjects[idx];
}

//private functions -------------------------------------------------------------
function _createProjects() {
  gProjects = [
    _createProject(
      'touchNums',
      'Touch The Numbers',
      `Touch the numbers as fast as you can, and become a world record holder!."Touch the Numbers" is a simple game for training your reflexes and peripheral vision.Peripheral vision is an essential skill for playing baseball, football, basketball, and various sports.`,
      'https://caposher.github.io/TouchNums/',
      ['Mouse', 'Coding Academy', 'On Develop'],
      'Game'
    ),
    _createProject(
      'InPicture',
      'Guess the picture',
      `In Picture can be used for any topic and provide opportunities for prediction and discussion. Try to guess the name of the animal while learning about them`,
      'https://caposher.github.io/InPicture/',
      ['Mouse', 'Coding Academy', 'On Develop'],
      'Game'
    ),
    _createProject(
      'pacman',
      'PAC-MAN',
      `Master the maze, beat the cats, get your initials by the high score! Stay alert, move quick, and be smart. 
      Gulp down power pellets and suck the cats for extra points in this collaborative and competitive game.`,
      'https://caposher.github.io/Pacman/',
      ['Keyboard', 'Coding Academy', 'On Develop'],
      'Game'
    ),
    _createProject(
      'mineSweeper',
      'Mine Blowing!',
      `Minesweeper rules are very simple. The board is divided into cells, with mines randomly distributed. To win, you need to open all the cells. The number on a cell shows the number of mines adjacent to it. Using this information, you can determine cells that are safe, and cells that contain mines. Cells suspected of being mines can be marked with a flag using the right mouse button.`,
      'https://caposher.github.io/Minesweeper/',
      ['Mouse', 'Coding Academy', 'Sprint'],
      'Game'
    ),
    _createProject(
      'bookShop',
      'Manage your Shop',
      `Manage your bookstore by adding books, prices, photos and more.`,
      'https://caposher.github.io/bookshop/',
      ['Mouse', 'Coding Academy'],
      'Business tool'
    ),
    _createProject(),
  ];
}

function _createProject(
  name = 'unknown',
  title = 'Unknown',
  desc = '',
  url = '#',
  labels = [],
  category = 'no category'
) {
  return {
    id: makeId(5),
    name,
    title,
    desc,
    url,
    publishedAt: Date.now(),
    labels,
    category,
  };
}
