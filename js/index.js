let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () => {
    return `${title} by ${author}, ${pages} pages, ${read ? "read" : "not read yet"}`;
  }
  this.toggleRead = () => {
    this.read = !this.read;
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

function updateDataset(idx) {
  const bookCards = document.querySelectorAll(".book-card");
  for (let i = idx; i < bookCards.length; ++i) {
    bookCards[i].dataset.index--;
  }
}

function removeBook(event) {
  const currBookCard = event.target.parentElement;
  const currBookIndex = currBookCard.dataset.index;
  myLibrary.splice(currBookIndex, 1);
  updateDataset(currBookIndex + 1);
  currBookCard.remove();

}

function toggleRead(event) {
  const currBookCard = event.target.parentElement;
  const currBookIndex = currBookCard.dataset.index;
  const currBook = myLibrary[currBookIndex];
  currBook.toggleRead();

  if (currBook.read) {
    currBookCard.classList.add("book-read");
  } else {
    currBookCard.classList.remove("book-read");
  }
}

function displayBooks() {
  // Clear HTML
  bookWrapper.innerHTML = "";

  for (let i = 0; i < myLibrary.length; ++i) {
    const currentBook = myLibrary[i];

    const bookCard = document.createElement("div")
    bookCard.classList.add("book-card");
    bookCard.dataset.index = i;

    const bookTitle = document.createElement("div")
    bookTitle.innerHTML = currentBook.title;
    bookTitle.classList.add("book-title");

    const bookAuthor = document.createElement("div")
    bookAuthor.innerHTML = currentBook.author;
    bookAuthor.classList.add("book-author");

    const bookPages = document.createElement("div")
    bookPages.innerHTML = `${currentBook.pages} pages`;
    bookPages.classList.add("book-pages");

    const bookRemoveBtn = document.createElement("button");
    bookRemoveBtn.innerHTML = "Remove";
    bookRemoveBtn.classList.add("book-remove");
    bookRemoveBtn.addEventListener("click", removeBook);

    const toggleReadBtn = document.createElement("button");
    toggleReadBtn.innerHTML = "Toggle Read";
    toggleReadBtn.addEventListener("click", toggleRead);

    if (currentBook.read) {
      bookCard.classList.add("book-read");
    }

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(bookRemoveBtn);
    bookCard.appendChild(toggleReadBtn);

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
    const elements = event.target.elements;
    const read = elements.read.value === "on";
    myLibrary.push(new Book(elements.title.value, elements.author.value, elements.pages.value, read));
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
