const fs = require('fs');
const path = require('path');



const booksDbPath = getBooksDbPath();

//--Books APIs--

//For /books/getall
function getAllBooks(req, res) {
    returnAllBooks().
    then(books => {
        res.writeHead(200);
        res.end(books);
    }).
    catch(err => {
        res.writeHead(400);
        res.end(JSON.stringify({message: err}));
    });
}

//For /books/addbook
function addBook(req, res) {
    const requestDataStream = [];
    getRequestData(req, requestDataStream);
    req.on("end", async () => {
        const wholeRequestData = Buffer.concat(requestDataStream).toString();
        await returnAllBooks().
        then(books => {
            const booksArray = JSON.parse(books);
            const newId = booksArray[booksArray.length - 1].id + 1;
            let newBookDetails = JSON.parse(wholeRequestData);
            newBookDetails.id = newId;
            const updatedBooksRecord = [...booksArray, newBookDetails];
            writeUpdatedRecord(updatedBooksRecord);
            res.writeHead(201);
            res.end(JSON.stringify({msg: "One (1) book was added successfully."}));
        }).
        catch(err => {
            res.writeHead(err.statusCode);
            res.end(JSON.stringify({message: err.msg}));
        });
    });
}

//--End of books APIs--
    

//--Utitlities--

//Request data
function getRequestData(req, requestDataStream) {
    req.on("data", (chunk) => {
        requestDataStream.push(chunk);
    });
}


function returnAllBooks() {
    return new Promise((resolve, reject) => {
        fs.readFile(booksDbPath, 'utf8', (err, data) => {
            if (err) {
                reject({"msg":'Bad request. Try again later.', "statusCode":400});
            }
            if (!data) {
                reject({"msg":'The book store is empty.', "statusCode":404});
            }
            resolve(data);
        }); 
    });   
}


//Write updated record into books database
function writeUpdatedRecord(updatedBooksRecord) {
    updatedBooksRecord = JSON.stringify(updatedBooksRecord);
    fs.writeFile(booksDbPath, updatedBooksRecord, (err) => {
        if (err) console.log(err);
    });
}


//Books data base path
function getBooksDbPath() {
    const thisDirectory = path.dirname(__filename);
    const separator = path.sep;
    const requiredDirectory = thisDirectory.replace(`${separator}controllers`, `${separator}models`);
    const requiredPath = path.join(requiredDirectory, 'books.json');
    return requiredPath;
}


//--End of Utilities--


//--Functionalities Exposed--
module.exports = {
    getAllBooks,
    addBook,
}
