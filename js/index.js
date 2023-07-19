let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () => {
    return `${title} by ${author}, ${pages} pages, ${read ? "read" : "not read yet"}`;
  }
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

const addBtn = document.querySelector("#add-book");
const clearBtn = document.querySelector("#clear-book");
const dialog = document.querySelector(".new-book");
const formElmt = document.querySelector("#create-book");
const cancelAddBtn = document.querySelector
const bookWrapper = document.querySelector(".book-wrapper");

function displayBooks() {
  // Clear HTML
  bookWrapper.innerHTML = "";

  for (let i = 0; i < myLibrary.length; ++i) {
    const currentBook = myLibrary[i];

    const bookCard = document.createElement("div")
    bookCard.classList.add("book-card");

    const bookTitle = document.createElement("div")
    bookTitle.innerHTML = currentBook.title;
    bookTitle.classList.add("book-title");
    const bookAuthor = document.createElement("div")
    bookAuthor.innerHTML = currentBook.author;
    bookAuthor.classList.add("book-author");
    const bookPages = document.createElement("div")
    bookPages.innerHTML = `${currentBook.pages} pages`;
    bookPages.classList.add("book-pages");

    if (currentBook.read === "on") {
      bookCard.classList.add("book-read");
    } else {
      bookCard.classList.add("book-read");
    }

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);

    bookWrapper.appendChild(bookCard);
  }
}

function displayForm() {
  dialog.showModal();
}

function createNewBook(event) {
  if (event.submitter.value === "cancel") {
    dialog.close();
    event.preventDefault();
  } else {
    let elements = event.target.elements;
    myLibrary.push(new Book(elements.title.value, elements.author.value, elements.pages.value, elements.read.value));
    displayBooks();
  }
  event.target.reset();
}

function clearBooks() {
  bookWrapper.innerHTML = "";
  myLibrary = [];
}

addBtn.addEventListener("click", displayForm);
clearBtn.addEventListener("click", clearBooks);
formElmt.addEventListener("submit", createNewBook);
