const http = require('http');
const { getAllBooks, addBook } = require('./controllers/books');



const PORT = process.env.PORT || '5000';
const HOST = 'localhost';


//Request Handler
function requestHandler(req, res) {
    //Get all books
    if (req.url === '/books/getall' && req.method === 'GET') {
        getAllBooks(req, res);
    } else if (req.url === '/books/addbook' && req.method === 'POST') {
        addBook(req, res);
    }
}


//Create server
const server = http.createServer(requestHandler);


//Start server
server.listen(PORT, HOST, () => {console.log(`Server is running and listening to requests at: http://${HOST}:${PORT}`)});