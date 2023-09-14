const form = document.getElementById('add-book-form')
const modal = document.getElementById('add-book-modal')
const table = document.getElementById('books-table')

const getRandomId = () => { return (Math.random() + 1).toString(36).substring(7) }

let library = []

form.addEventListener('submit', (event) => {
    event.preventDefault()

    let book = build(event.target.elements)

    library.push(book)

    add(book)

    localStorage.clear()
    localStorage.setItem("library", JSON.stringify(library))

    bootstrap.Modal.getInstance(modal).hide()

    form.reset()
})

const init = () => {
    let currentBooks = JSON.parse(localStorage.getItem("library"))

    if (currentBooks) {
        library = currentBooks
        library.map((book) => { add(book) })
    }
}

const build = (elements) => {
    return new Book(
        getRandomId(),
        elements.title.value,
        elements.author.value,
        elements.pages.value,
        elements.is_read.checked
    )
}

const createRemoveButtonElement = (book, row) => {
    var removeButton = document.createElement('input')
    removeButton.type = "button"
    removeButton.className = "btn btn-danger"
    removeButton.value = "remove"
    removeButton.addEventListener("click", () => {
        library = library.filter(x => x.id !== book.id)
        localStorage.setItem("library", JSON.stringify(library))
        row.remove()
    })
    return removeButton
}

const add = (book) => {
    var row = table.insertRow()
    row.id = book.id

    var title = row.insertCell(0)
    var author = row.insertCell(1)
    var pages = row.insertCell(2)
    var isRead = row.insertCell(3)
    var removeButtonCell = row.insertCell(4)

    title.innerHTML = book.title
    author.innerHTML = book.author
    pages.innerHTML = book.pages
    isRead.innerHTML = book.isRead

    removeButtonCell.appendChild(createRemoveButtonElement(book, row))
}

class Book {
    constructor(id, title, author, pages, isRead = false) {
        this.id = id
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead
    }
}

init()