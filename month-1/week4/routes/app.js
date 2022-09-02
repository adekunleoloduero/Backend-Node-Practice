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
    next();
});

app.get('/', (req, res) => {
    res.send('Hello Express');
});


app.get('/about', (req, res) => {
    res.send('About page');
});

app.get('/contact', (req, res) => {
    res.send('Contact page');
});

//Catch all route
app.get('*', (req, res) => {
    res.statusCode = 400;
    res.send('Page not found');
});


//Start the server
app.listen(PORT, () => console.log(`Server is running and listening to requests at: http://localhost:${PORT}`));