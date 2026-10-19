const myLibrary = []

class Book {
  constructor(title, author, numPages, wasRead) {
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
  toggleReadStatus() {
    this.wasRead = !this.wasRead;
  }
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

/*
  constraint validation API for custom error messages
*/
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const numPagesInput = document.getElementById("numPages");

// title validation
titleInput.addEventListener("invalid", () => {
  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity("Please enter a title for the book.");
  }
});
titleInput.addEventListener("input", () => {
  titleInput.setCustomValidity("");
});

// author validation
authorInput.addEventListener("invalid", () => {
  if (authorInput.validity.valueMissing) {
    authorInput.setCustomValidity("Please enter the author's name.");
  }
});
authorInput.addEventListener("input", () => {
  authorInput.setCustomValidity("");
});

// pages validation
numPagesInput.addEventListener("invalid", () => {
  if (numPagesInput.validity.valueMissing) {
    numPagesInput.setCustomValidity("Please enter the number of pages.");
  }
});
numPagesInput.addEventListener("input", () => {
  numPagesInput.setCustomValidity("");
});

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

  const wasRead = document.getElementById("wasRead").checked;

  addBookToLibrary(titleInput.value, authorInput.value, numPagesInput.value, wasRead);
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