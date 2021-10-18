'use strict';

function generateNums(length) {
  var nums = [];
  for (var i = 1; i <= length; i++) {
    nums.push(i);
  }
  return nums;
}

function chooseNumber(nums) {
  var index = getRandomInt(0, nums.length);
  return nums.splice(index, 1)[0];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
