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
const dialog = document.querySelector(".new-book");

function displayForm() {
  dialog.showModal();
}

addBtn.addEventListener("click", displayForm);

