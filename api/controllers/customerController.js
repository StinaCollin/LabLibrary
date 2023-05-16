const { getAllCustomers, addCustomer, getCustomerByKeyword, editCustomer, deleteCustomer } = require("../repositories/customerRepository" );

async function get(req, res) {

    let data = await getAllCustomers();

    return res.json(data);
}

async function search(req, res) {

    let data = await getCustomerByKeyword(req.query.keyword);
    console.log(data);

    return res.json(data);
}

async function add(req, res) {

    console.log(req.body)

    await addCustomer(req.body.author_name, req.body.book_title, req.body.year_published, req.body.genre, req.body.availability);
}

async function edit(req, res) {

    console.log(req.body);

    await editCustomer(req.body.bookId, req.body.author_name, req.body.book_title, req.body.year_published, req.body.genre, req.body.availability);
}

async function remove(req, res) {

    await deleteCustomer(req.body.bookId);
}

module.exports = {

    get,
    search,
    add,
    edit,
    remove
}
