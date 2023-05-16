module.exports = class customer {
  constructor(bookId, author_name, book_title, year_published, genre, availability) {
    this.bookId = bookId;
    this.author_name = author_name;
    this.book_title = book_title;
    this.year_published = year_published;
    this.genre = genre;
    this.availability = availability;
  }
}
