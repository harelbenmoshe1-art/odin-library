const myLibrary = []

function Book(title, author, numPages, wasRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.wasRead = wasRead;
  this.id = crypto.randomUUID();

  this.info = function () {
    return `"${this.title}" by ${this.author}, ${this.numPages} pages, ${this.wasRead ? 'read' : 'not read'}.`;
  };
}

function addBookToLibrary(title, author, numPages, wasRead) {
  myLibrary.push(new Book(title, author, numPages, wasRead));
}

function displayBooks() {
  // using global variable libraryContainer
  libraryContainer.innerHTML = '';  // clear out the screen so we dont see duplicates when calling the function again

  myLibrary.forEach(book => {
    const bookCard = document.createElement('div');
    bookCard.classList.add("book-card")
    bookCard.innerHTML = `${book.info()} <button class="toggle-btn" data-id="${book.id}">Change read status</button> <button class="delete-btn" data-id="${book.id}">Delete</button>`;
    libraryContainer.appendChild(bookCard);
  });
}

Book.prototype.toggleReadStatus = function () {
  this.wasRead = !this.wasRead;
};


/*
  'add new book' form functionality
*/
const dialog = document.getElementById("book-dialog");
const newBookBtn = document.getElementById("new-book-btn");
const cancelBtn = document.getElementById("cancel-btn");
const bookForm = document.getElementById("book-form");

newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

cancelBtn.addEventListener("click", () => {
  dialog.close();
});

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const numPages = document.getElementById("numPages").value;
  const wasRead = document.getElementById("wasRead").checked;

  addBookToLibrary(title, author, numPages, wasRead);
  displayBooks();

  bookForm.reset();
  dialog.close();
});


/*
  'delete' and 'mark as read' buttons functionality
*/
const libraryContainer = document.getElementById("library-container");
libraryContainer.addEventListener("click", (event) => {
  const bookId = event.target.dataset.id;
  if (event.target.classList.contains("delete-btn")) {
    const bookIndex = myLibrary.findIndex((book) => book.id === bookId);
    if (bookIndex !== -1) {
      myLibrary.splice(bookIndex, 1);
    }
  }

  else if (event.target.classList.contains("toggle-btn")) {
    const book = myLibrary.find((bookObj) => bookObj.id === bookId);
    book.toggleReadStatus();
  }
  displayBooks();
});