const http = require('http');
const { getAllBooks, addBook, updateBook } = require('./controllers/books');
const { passwordAuthentication, tokenAuthentication, aclAuth } = require('./controllers/authentication');



const PORT = process.env.PORT || '5000';
const HOST = 'localhost';


//Request Handler
function requestHandler(req, res) {
    if (req.url === '/books' && req.method === 'GET') { //Get all books
        //1. Password Authentication
        // passwordAuthentication(req, res).
        // then(() => {
        //     getAllBooks(req, res);
        // }).
        // catch(error => {
        //     res.writeHead(401);
        //     res.end(JSON.stringify(error));
        // });

        //2. Token/API_KEY authentication
        // tokenAuthentication(req, res).
        // then(() => {
        //     getAllBooks(req, res);
        // }).
        // catch(error => {
        //     res.writeHead(401);
        //     res.end(JSON.stringify(error));
        // });

        //3. Access Control Level
        // aclAuth(req, res, ['admin', 'reader']).
        // then((msg) => {
        //     getAllBooks(req, res, msg);
        // }).
        // catch(error => {
        //     res.writeHead(401);
        //     res.end(JSON.stringify(error));
        // });

        getAllBooks(req, res);
    } 

    if (req.url === '/books' && req.method === 'POST') { //Add a book
        tokenAuthentication(req, res).
        then(() => {
            addBook(req, res);
        }).
        catch(error => {
            res.writeHead(401);
            res.end(JSON.stringify(error));
        });
    }

    if (req.url === '/books' && req.method === 'PUT') {
        updateBook(req, res);
    }
}


//Create server
const server = http.createServer(requestHandler);


//Start server
server.listen(PORT, HOST, () => {console.log(`Server is running and listening to requests at: http://${HOST}:${PORT}`)});



module.exports = server;