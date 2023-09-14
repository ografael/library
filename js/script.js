const form = document.getElementById('add-book-form')
const modal = document.getElementById('add-book-modal')
const table = document.getElementById('books-table')

const generateRandomId = () => { return (Math.random() + 1).toString(36).substring(7) }

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

const build = (elements) => {
    return new Book(
        generateRandomId(),
        elements.title.value,
        elements.author.value,
        elements.pages.value,
        elements.is_read.checked
    )
}

const createRemoveButtonElement = (book, row) => {
    let removeButton = document.createElement('input')

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
    let row = table.insertRow()
    row.id = book.id

    let titleCell = row.insertCell(0)
    let authorCell = row.insertCell(1)
    let pagesCell = row.insertCell(2)
    let isReadCell = row.insertCell(3)
    let removeButtonCell = row.insertCell(4)

    titleCell.innerHTML = book.title
    authorCell.innerHTML = book.author
    pagesCell.innerHTML = book.pages
    isReadCell.innerHTML = book.isRead
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

const init = () => {
    let currentBooks = JSON.parse(localStorage.getItem("library"))

    if (currentBooks) {
        library = currentBooks
        library.map((book) => { add(book) })
    }
}

init()