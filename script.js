function book(title, author, totalPages, isRead) {
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

const theHobbit = new book('The Hobbit', 'J.R.R. Tolkien', 295, false);
// Should return "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"