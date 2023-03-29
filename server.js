'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

//***REQUIRE IN OUR MONGOOSE LIBRARY */
const mongoose = require('mongoose');

//***Require Book Model
const Book = require('./models/book.js');

const app = express();

// Middleware
app.use(cors());

//Define Port
const PORT = process.env.PORT || 3002;

//LISTEN
app.listen(PORT, () => console.log(`listening on Port ${PORT}`));

//***CONNECT MONGODB USING MONGOOSE */
//**PER THE MONGOOSE DOCS -PLUG AND PLAY CODE */

mongoose.connect(process.env.DB_URL);

//Troubleshooting in Terminal for Mongoose
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('Mongoose is connected');
  // require('./seed.js');
});



//ENDPOINT TO GET

app.get('/', (request, response) => {

  response.status(200).send('Welcome!');
});

//ENDPOINT FOR BOOKS
app.get('/books', getBooks);

async function getBooks(request, response, next){
  try{

    let allBooks = await Book.find({});

    response.status(200).send(allBooks);

  } catch(error) {
    console.error(error);
    next(error);
  }
}

//***ENDPOINT TO DELETE */

app.delete('/books/:bookID', deleteBook);

async function deleteBook(request,response,next){
  try{
    let id = request.params.bookID;

    await Book.findByIdAndDelete(id);

    response.status(200).send('Book deleted successfully!');
  } catch(error) {
    next(error);
  }
};

//***ENDPOINT TO POST

app.post('/books', postBook);

async function postBook(request, response, next){
  try {
    let createdBook = await Book.create(request.body);

    console.log("request body", request.body);

    response.status(201).send(createdBook);

  } catch (error) {
    console.error(error);
    next(error);
  }
}


app.get('*', (request, response) => {
  response.status(404).send('Not Found!');
});

//ERRORS
app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});

