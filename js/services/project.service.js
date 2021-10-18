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
  gProjects = loadFromStorage(STORAGE_KEY);
  if (!gProjects) {
    gProjects = [
      _createProject(),
      _createProject(),
      _createProject(),
      _createProject(),
      _createProject(),
      _createProject(),
    ];
    saveToStorage(STORAGE_KEY, gProjects);
  }
}

function _createProject(
  name = 'Unknown',
  title = 'Unknown',
  desc = '',
  url = '#',
  labels = ['kaka', 'pipi', 'laflaf', 'lamlam'],
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
