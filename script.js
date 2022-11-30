document.querySelector('#show-books').addEventListener('click', () => {
    updateDisplay();
})

function Book(title, author, totalPages, isRead) {
    this.title = title,
    this.author = author,
    this.pages = totalPages,
    this.isRead = isRead
                    ? 'already read'
                    : 'not read yet'
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead}`
    }
}

function addBook(title, author, totalPages, isRead) {
    myLibrary.push(new Book(title, author, totalPages, isRead));
}

// I have to make this inherit from a different object later
Book.prototype = Object.create(FormData);

Book.prototype.getIndex = function() {
    // Get the index of the book
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title === this.title) {
            return i;
        }
    }
}

Book.prototype.removeBook = function() {
    myLibrary.splice(this.getIndex(), 1);
}

Book.prototype.updateIsRead = function() {
    this.isRead = this.isRead === 'already read'
                    ? 'not read yet'
                    : 'already read'
}

const myLibrary = [];

populateLibrary();

function populateLibrary() {
    addBook('The Hobbit', 'J.R.R. Tolkien', 295, false);
    addBook('ALTERKNIT STITCH DICTIONARY', 'Andrea Rangel', 168, true);
}

function initialiseForm() {
    const form = document.querySelector('form');

    document.querySelector('#new-book').addEventListener('click', () => {
        // toggle hidden class on next sibling (in bootstrap?)
        form.classList.toggle('d-none');
    })

    form.addEventListener('submit', (e) => {
        // how to detect if there is form input or not
        // so we don't allow empty books
        e.preventDefault();
        const formData = new FormData(form);
        addBook(
            formData.get("title"),
            formData.get("author"),
            formData.get("pages"),
            formData.get("isRead")
        );
        updateDisplay();
    })
}

function updateDisplay() {
    const display = document.querySelector('#display>div');
    // Clear display
    while (display.lastElementChild) {
        display.removeChild(display.lastElementChild);
    }
    myLibrary.forEach(element => {
        display.appendChild(createCard(element));
    })
}

function createCard(object) {
    let div = document.createElement('div');
    div.textContent = object.info();

    const addElement = (type, text, ...classes) => {
        const element = document.createElement(type);
        element.textContent = text;
        classes.forEach( classX => {
            element.classList.add(classX)
        });
        div.appendChild(element);
        return element;
    }
    
    addElement('button', 'remove', 'btn', 'btn-secondary').addEventListener(
        'click',
        () => {
            object.removeBook();
            updateDisplay();
        }
    )

    addElement('button', 'toggle read', 'btn', 'btn-secondary').addEventListener(
        'click',
        () => {
            object.updateIsRead();
            updateDisplay();
        }
    )
    return div;
}

initialiseForm();