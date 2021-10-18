'use strict';
const STORAGE_KEY = 'projects';
var gProjects = [];
_createProjects();

function getProjects() {
  return gProjects;
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
