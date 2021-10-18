'use strict';

function onInit() {
  renderTable();
  calcPages();
  renderPageBtns();
}

function renderTable() {
  var books = getBooksForDisplay();
  var strHTML = books
    .map(function (book) {
      return `
      <tr>
        <td>${book.id}</td>
        <td>${book.bookName}</td>
        <td>$${book.price}</td>
        <td><button class="read-btn" onclick="onReadBook('${book.id}')">Read</button></td>
        <td><button class="update-btn" onclick="onUpdateBook('${book.id}')">Update</button></td>
        <td><button class="delete-btn" onclick="onRemoveBook('${book.id}')">Delete</button></td>
      </tr>`;
    })
    .join('');

  strHTML += ``;

  document.querySelector('.book-list').innerHTML = strHTML;
}

function renderPageBtns() {
  var pageAmount = getPageAmount();
  var strHTML = ` <li><button onclick="onChangePage(-1,false)"><</button></li>`;
  for (var i = 0; i < pageAmount; i++) {
    strHTML += ` <li><button onclick="onChangePage(${i},true)">${i + 1}</button></li>`;
  }
  strHTML += `<li><button onclick="onChangePage(1,false)">></button></li>`;
  document.querySelector('.pages').innerHTML = strHTML;
}

function renderBookDetails(book) {
  var elDetails = document.querySelector('.book-details');
  var elText = document.querySelector('.book-details p');
  var elImg = document.querySelector('.img-details');
  var elRate = document.querySelector('.rate-value');

  elImg.src = book.imgUrl;
  elText.innerText = makeLorem();
  elDetails.classList.remove('hidden');
  elRate.innerText = book.rate;
}

function onRemoveBook(bookId) {
  removeBook(bookId);
  renderTable();
  if (!calcPages()) renderPageBtns();
}

function onAddBook() {
  var inputs = document.querySelectorAll('.new-book input');
  if (inputs[0].value && inputs[1].value) {
    addBook(inputs[0].value, +inputs[1].value);
    inputs[0].value = '';
    inputs[1].value = '';
    renderTable();
    if (!calcPages()) renderPageBtns();
  }
}

function onUpdateBook(bookId) {
  var price = prompt('Please enter price (DONT ADD $):');
  if (price) {
    updateBook(bookId, price);
    renderTable();
  }
}

function onReadBook(bookId) {
  var book = getBook(bookId);
  renderBookDetails(book);
}

function onExitRead() {
  document.querySelector('.book-details').classList.add('hidden');
}

function onUpdateRate(newRate) {
  updateBookRate(newRate);
  var bookRate = getBookRate();
  document.querySelector('.rate-value').innerText = bookRate;
}

function onSortByKey(key) {
  SortBy(key);
  renderTable();
}

function onChangePage(diff, isPage) {
  setPage(diff, isPage);
  renderTable();
}

function imageNotExist(elImg) {
  elImg.src = '../img/noImage.png';
}
