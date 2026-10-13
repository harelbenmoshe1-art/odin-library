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
  this.info = function() {
    return `${title} by ${author}, ${numPages} pages, ${wasRead ? 'not read' : 'read'}`;
  };
}

function addBookToLibrary(title, author, numPages, wasRead) {
  myLibrary.push(new Book(title, author, numPages, wasRead));
}