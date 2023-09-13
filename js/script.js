const form = document.getElementById('add-book-form');
const addBookModal = document.getElementById('add-book-modal');

let library = []


form.addEventListener('submit', (event) => {
    event.preventDefault();

    let formElements = event.target.elements

    let book = new Book(
        formElements.title.value,
        formElements.author.value,
        formElements.pages.value,
        formElements.read.checked
    )

    library.push(book)

    form.reset()

    bootstrap.Modal.getInstance(addBookModal).hide();
});


class Book {
    constructor(title, author, pages, read = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}