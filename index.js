const http = require('http');
const { getAllBooks, addBook } = require('./controllers/books');
const { passwordAuthentication } = require('./controllers/authentication');



const PORT = process.env.PORT || '5000';
const HOST = 'localhost';


//Request Handler
function requestHandler(req, res) {
    if (req.url === '/books/getall' && req.method === 'GET') { //Get all books
        passwordAuthentication(req, res).
        then(success => {
            getAllBooks(req, res);
            console.log(success);
        }).
        catch(error => {
            console.log(error);
        });
        
    } else if (req.url === '/books/addbook' && req.method === 'POST') { //Add a book
        addBook(req, res);
    }
}


//Create server
const server = http.createServer(requestHandler);


//Start server
server.listen(PORT, HOST, () => {console.log(`Server is running and listening to requests at: http://${HOST}:${PORT}`)});