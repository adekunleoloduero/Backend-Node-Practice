const express = require('express');

const PORT = process.env.PORT || '5000';

const app = express();


//In-memory books database
const books = [
    {
        "title": "The Design of Everyday Things",
        "author": "Don Norman",
        "year": 2007,
        "id": 1
    },
    {
        "title": "Eloquent JavaScript, 3rd Edition: A Modern Introduction to Programming",
        "author": "Marijn Haverbeke",
        "year": 2014,
        "id": 2
    },
    {
        "title": "Algorithms to Live By",
        "author": "Brian Christian and Thomas L. Griffiths",
        "year": 2016,
        "id": 3
    },
    {
        "title": "What the fuck is an API?",
        "author": "Don Norman",
        "year": 2035,
        "id": 4
    }
];


const users = [
    {
        "username": "adekunle100",
        "password": "adekunlepass",
        "email": "ade@node.com",
        "role": "admin"
    },
    {
        "username": "james100",
        "password": "jamespass",
        "email": "james@node.com",
        "role": "reader"
    }
]


//Middlewears
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.url);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello Express');
});




//Query parameters
app.get('/books', (req, res) => {
    let booksFiltered = [];
    for (const book of books) {
        // if (book.author === req.query.author && book.year < req.query.year) {
        if (book.author === req.query.author) {
            booksFiltered.push(book);
        }
    }
    
    if (booksFiltered.length < 1) {
        res.statusCode = 400;
        res.json({"error": "Found no book by the specified author"});
    } else {
        res.statusCode = 200;
        res.json(booksFiltered);
    }
 });


app.get('/books', (req, res) => {
    res.statusCode = 200;
    res.json(books);
});



//Path parameter
app.get('/books/:id', (req, res) => {
    const bookFound = books.find(book => (book.id).toString() === req.params.id);
    if (!bookFound) {
        res.statusCode = 400;
        res.json({"error": "Can't find the book sepecified."});
    } else {
        res.statusCode = 200;
        res.json(bookFound);
    }   
});


//Query parameters
app.get('/books', (req, res) => {
    let booksFiltered = [];
    for (const book of books) {
        if (book.author === req.query.author && book.year < req.query.year) {
            booksFiltered.push(book);
        }
    }
    
    if (!booksFiltered) {
        res.statusCode = 400;
        res.json({"error": "Found no book by the specified author"});
    } else {
        res.statusCode = 200;
        res.json(booksFiltered);
    }
 });


app.post('/books', (req, res) => {

});



//Catch all route
app.get('*', (req, res) => {
    res.statusCode = 400;
    res.send('Page not found');
});


//Start the server
app.listen(PORT, () => console.log(`Server is running and listening to requests at: http://localhost:${PORT}`));