const form = document.getElementById('add-book-form')
const modal = document.getElementById('add-book-modal')
const table = document.getElementById('books-table')


let library = []


form.addEventListener('submit', (event) => {
    event.preventDefault()

    let book = build(event.target.elements)

    add(book)

    bootstrap.Modal.getInstance(modal).hide()

    form.reset()
})

const build = (elements) => {
    return new Book(
        elements.title.value,
        elements.author.value,
        elements.pages.value,
        elements.is_read.checked
    )
}

const add = (book) => {
    library.push(book)

    var row = table.insertRow()

    var title = row.insertCell(0)
    var author = row.insertCell(1)
    var pages = row.insertCell(2)
    var isRead = row.insertCell(3)

    title.innerHTML = book.title
    author.innerHTML = book.author
    pages.innerHTML = book.pages
    isRead.innerHTML = book.isRead
}

class Book {
    constructor(title, author, pages, isRead = false) {
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead
    }
}
