const customerModel = require("../models/customerModel");
const db_context = require("../db_context");
const customer = require("../models/customerModel");

async function getAllCustomers() {

    let customers = [];
    let data = await db_context.selectAllCustomers()

    data.forEach(customer => {
        customers.push(new customerModel(customer.author_name, customer.book_title, customer.year_published, customer.genre, customer.availability))
    });

    return customers;
};

async function getCustomerByKeyword(keyword) {
    let customers = [];
    let data = await db_context.selectCustomerByKeyword(keyword)

    data.forEach(customer => {
        customers.push(new customerModel(customer.book_id, customer.author_name, customer.book_title, customer.year_published, customer.genre, customer.availability))
    });

    return customers;
};

async function addCustomer(author_name, book_title, year_published, genre, availability) {

    db_context.insertCustomer(author_name, book_title, year_published, genre, availability);
};

async function editCustomer(bookId, author_name, book_title, year_published, genre, availability) {

    db_context.updateCustomer(bookId, author_name, book_title, year_published, genre, availability);
};

async function deleteCustomer(bookId) {

    db_context.deleteCustomer(bookId);
};

module.exports = {
    getAllCustomers,
    getCustomerByKeyword,
    addCustomer,
    editCustomer,
    deleteCustomer
}
