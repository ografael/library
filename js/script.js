const form = document.getElementById('add-book-form');
const addBookModal = document.getElementById('add-book-modal');

let library = []


form.addEventListener('submit', (event) => {
    event.preventDefault();

    let elements = event.target.elements

    let book = new Book(
        elements.title.value,
        elements.author.value,
        elements.pages.value,
        elements.is_read.checked
    )

    library.push(book)

    form.reset()

    bootstrap.Modal.getInstance(addBookModal).hide();
});


class Book {
    constructor(title, author, pages, isRead = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}