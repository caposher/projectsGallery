'use strict';
const STORAGE_KEY = 'books';
const PAGE_SIZE = 3;
var gBooks = [];
var gSortBy = '';
var gSortByToggler = -1;
var gCurrBook = null;
var gCurrPage = 0;
var gPagesAmount = 0;
_createBooks();

function getBooksForDisplay() {
  if (!gBooks.length) {
    gBooks.push(_createBook('Demo Book', 10000, ''));
  }
  return gBooks.slice(gCurrPage * PAGE_SIZE, gCurrPage * PAGE_SIZE + PAGE_SIZE);
}

function getBook(bookId) {
  var book = gBooks.find((book) => book.id === bookId);
  gCurrBook = book;
  return book;
}

function getBookRate() {
  return gCurrBook ? gCurrBook.rate : 0;
}

function getPageAmount() {
  return gPagesAmount;
}

function removeBook(bookId) {
  var bookIdx = gBooks.findIndex((book) => book.id === bookId);
  gBooks.splice(bookIdx, 1);
  _saveBooksOnStorage();
}

function addBook(bookName, price) {
  gBooks.unshift(_createBook(bookName, price, `../../img/${bookName}.png`));
  _saveBooksOnStorage();
}

function updateBook(bookId, price) {
  var book = gBooks.find((book) => book.id === bookId);
  book.price = price;
  _saveBooksOnStorage();
}

function updateBookRate(newRate) {
  if (gCurrBook) {
    gCurrBook.rate += newRate;
    if (gCurrBook.rate < 0) gCurrBook.rate = 0;
    if (10 < gCurrBook.rate) gCurrBook.rate = 10;

    _saveBooksOnStorage();
  }
}

function SortBy(key) {
  gSortBy = key;
  _sortBooks(gBooks);
  _saveBooksOnStorage();
}

function calcPages() {
  var prevPages = gPagesAmount;
  gPagesAmount = Math.ceil(gBooks.length / PAGE_SIZE);
  return prevPages === gPagesAmount;
}

function setPage(diff, isPage) {
  console.log(gCurrPage, diff, isPage);
  if (isPage) {
    gCurrPage = diff;
  } else {
    if ((gCurrPage === gPagesAmount - 1 && diff === 1) || (!gCurrPage && diff === -1)) return;
    gCurrPage += diff;
  }
}

//private functions--------------------------------------------------
function _createBooks() {
  var books = loadFromStorage(STORAGE_KEY);
  if (!books) {
    var books = [
      _createBook('Why We Swim', getRandomPrice(), 'img/whyWeSwim.png'),
      _createBook('Dune', getRandomPrice(), 'img/dune.png'),
      _createBook('Parks', getRandomPrice(), 'img/parks.png'),
    ];
  }
  gBooks = books;
  _saveBooksOnStorage();
}

function _createBook(bookName, price, imgUrl) {
  return {
    id: makeId(5),
    bookName,
    price,
    imgUrl,
    rate: 0,
  };
}

function _sortBooks(books) {
  gSortByToggler *= -1;
  switch (gSortBy) {
    case 'TITLE':
      books.sort((book1, book2) => {
        return book1.bookName.toLowerCase() > book2.bookName.toLowerCase() ? gSortByToggler : -gSortByToggler;
      });
      // debugger;
      break;
    case 'PRICE':
      books.sort((book1, book2) => {
        return (book1.price - book2.price) * gSortByToggler;
      });
      break;
  }
}

function _saveBooksOnStorage() {
  saveToStorage(STORAGE_KEY, gBooks);
}
