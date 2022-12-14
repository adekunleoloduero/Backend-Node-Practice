const fs = require('fs');
const path = require('path');
const { getRequestData, returnAllRecord, getDbPath, writeUpdatedRecord } = require('../utilities');


const booksDbPath = getDbPath('books.json');

//--Books APIs--

//For /books/getall
function getAllBooks(req, res, msg) {
    returnAllRecord(booksDbPath).
    then(books => {
        const booksArray = JSON.parse(books);
        booksArray.unshift(msg);
        res.writeHead(200, {"Content-Type": 'application/json'});
        res.end(JSON.stringify(booksArray));
    });
}

//For /books/addbook
function addBook(req, res) {
    const requestDataStream = [];
    getRequestData(req, requestDataStream);
    req.on("end", async () => {
        const wholeRequestData = Buffer.concat(requestDataStream).toString();
        await returnAllRecord(booksDbPath).
        then(books => {
            const booksArray = JSON.parse(books);
            const newId = booksArray[booksArray.length - 1].id + 1;
            let newBookDetails = JSON.parse(wholeRequestData);
            newBookDetails.id = newId;
            const updatedBooksRecord = [...booksArray, newBookDetails];
            writeUpdatedRecord(booksDbPath, updatedBooksRecord);
            res.writeHead(201);
            res.end(JSON.stringify({msg: "One (1) book was added successfully."}));
        }).
        catch(err => {
            res.writeHead(err.statusCode);
            res.end(JSON.stringify({message: err.msg}));
        });
    });
}


function updateBook(req, res) {
    const requestDataStream = [];
    getRequestData(req, requestDataStream);
    req.on("end", async () => {
        let wholeRequestData = Buffer.concat(requestDataStream).toString();
        let books = await returnAllRecord(booksDbPath);
        books = JSON.parse(books);
        wholeRequestData = JSON.parse(wholeRequestData);
        const index = books.findIndex(book => book.id === wholeRequestData.id);
        const book = books[index];
        const updatedBook = {...book, ...wholeRequestData};
        books[index] = updatedBook;
        writeUpdatedRecord(booksDbPath, books);
        res.writeHead(200);
        res.end(JSON.stringify({"message": "One (1) book  updated."}));
    });
}


function deleteBook(req, res) {

}

//--End of books APIs--
    



//--Functionalities Exposed--
module.exports = {
    getAllBooks,
    addBook,
    updateBook,
    deleteBook,
}
