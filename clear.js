'use strict';

require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const Book = require('./model/book');

async function clear() {
  try {
    await Book.deleteMany({});

  } catch (error){

    console.error(error);

  } finally {

    mongoose.disconnect();
  }
}

clear();