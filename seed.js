'use strict' 

require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const Book = require('./models/book.js');

async function seed() {
console.log('Seeding books');
  await Book.create({
    title: 'Critique of Pure Reason',
    description: 'Philosophy',
    status: true
  })

  await Book.create({
    title: 'Lord of the Rings',
    description: 'Fantasy',
    status: true
  })

  await Book.create({
    title: 'Godel Escher Bach',
    description: 'Computer Science',
    status: false
  })

  mongoose.disconnect();
}

seed();

