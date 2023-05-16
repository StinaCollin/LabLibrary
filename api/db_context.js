const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:pgadmin2023@localhost:5432/mylibrary')

async function selectAllCustomers() {

 let customers = await db.many(`SELECT * FROM customer`);
 console.log(customers)
     return customers
    }

// SEARCH FOR AUTHOR OR TITLE
async function selectCustomerByKeyword(keyword) {

  let data = await db.any(`SELECT * FROM customer WHERE book_title LIKE '${keyword}%' OR author_name LIKE '${keyword}%'`);

  return data;
}

async function insertCustomer(author_name, book_title, year_published, genre, availability) {

  db.none(`INSERT INTO customer ( author_name, book_title, year_published, genre, availability)
           VALUES ( '${author_name}', '${book_title}', '${year_published}', '${genre}', '${availability}' )`);
}

async function updateCustomer(bookId, author_name, book_title, year_published, genre, availability) {

  await db.none(`UPDATE customer SET author_name = '${author_name}', book_title = '${book_title}', year_published = '${year_published}', genre = '${genre}', availability = '${availability}' WHERE book_id = ${bookId}`);
}

async function deleteCustomer(bookId) {

  await db.none(`DELETE FROM customer WHERE book_id = ${bookId}`);
}

module.exports = {
    selectAllCustomers,
    selectCustomerByKeyword,
    insertCustomer,
    updateCustomer,
    deleteCustomer
}
