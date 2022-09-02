const express = require('express');

const PORT = process.env.PORT || '5000';

const app = express();

app.get('/', (req, res) => {
    res.end('Hello World');
})

//Start the server
app.listen(PORT, () => console.log(`Server is running and listening to requests at: http://localhost:${PORT}`));