const fs = require('fs');
const path = require('path');


// const booksDb = path.join(__dirname, 'models', 'books.js');
const booksDbPath = getBooksDbPath();

//Books Routes

function getAllBooks(req, res) {
    fs.readFile(booksDbPath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(400);
            console.log(err);
        }
        if  (!data) {
            res.writeHead(404);
            res.end('No record found.');
        }
        res.writeHead(200);
        res.end(data);
    }); 
}

function addBook(req, res) {
    
}


    



//Books data base path
function getBooksDbPath() {
    const thisDirectory = path.dirname(__filename);
    const separator = path.sep;
    const requiredDirectory = thisDirectory.replace(`${separator}controllers`, `${separator}models`);
    const requiredPath = path.join(requiredDirectory, 'books.json');
    console.log(requiredPath);
    return requiredPath;
}



//Expose functionalities
module.exports = {
    getAllBooks
}
