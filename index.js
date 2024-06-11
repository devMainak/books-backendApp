const express = require('express')
const app = express()
const { initializeDatabase } = require('./db/db.connected')
const Books = require('./models/books.model') 

app.use(express.json())

// Establishing connection to DB
initializeDatabase();

// function to seed intial book to the schema
const seedBook = async (bookData) => {
  try {
    const book = new Books(bookData)
    const savedBook = await book.save()
    return savedBook
  } catch(error) {
    throw error
  }
}

// POST route on "/books" path to save books in DB
app.post("/books", async (req, res) => {
  try {
    const savedBook = await seedBook(req.body)
    if (savedBook) {
      res.status(201)
      .json({message: "Book added successfully", savedBook: savedBook})
    } else {
      res.status(400)
      .json({error: "Failed to add book"})
    }
  } catch(error) {
    res.status(500)
    .json({error: "Internal server error"})
    console.error(error)
  }
})

// function to read all book from db
const readAllBooks = async () => {
  try {
    const books = await Books.find()
    return books
  } catch(error) {
    throw error
  }
}

// GET method on "/books" to read all books
app.get("/books", async (req, res) => {
  try {
   const books = await readAllBooks()
    if (books.length != 0) {
      res.status(201)
      .json(books)
    } else {
      res.status(404)
      .json({error: "No books found"})
    }
  } catch(error) {
    res.status(500)
    .json({error: "Internal server error"})
    console.error(error)
  }
})

// function to read book data by title
const readBookByTitle = async (bookTitle) => {
  try {
    const book = await Books.findOne({title: bookTitle})
    return book
  } catch(error) {
    throw error
  }
}

// GET method 

// Listenting to http port for http requests
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})