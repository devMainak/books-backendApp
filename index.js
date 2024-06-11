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

// GET method on "/books/:bookTitle" to read book data bt title
app.get("/books/:bookTitle", async (req, res) => {
  try {
    const bookByTitle = await readBookByTitle(req.params.bookTitle)
    if (bookByTitle) {
      res.status(201)
      .json(bookByTitle)
    } else {
      res.status(404)
      .json({error: "No Book Found"})
    }
  } catch(error) {
    res.status(500)
    .json({error: "Internal server error"})
    console.error(error)
  }
})

// function to read all book from db
const readBooksByAuthor = async (bookAuthor) => {
  try {
    const books = await Books.find({author: bookAuthor})
    return books
  } catch(error) {
    throw error
  }
}

// GET method on "/books" to read all books
app.get("/books/author/:bookAuthor", async (req, res) => {
  try {
   const books = await readBooksByAuthor(req.params.bookAuthor)
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

// function to get book from Business genre
const readBooksByGenre = async (bookGenre) => {
  try {
    const booksByGenre = await Books.find({genre: bookGenre})
    return booksByGenre
  } catch(error) {
    throw error
  }
}

// GET method "/books/genres/business" to read all business books
app.get("/books/genres/:bookGenre", async (req, res) => {
  try {
    const booksByGenre = await readBooksByGenre(req.params.bookGenre)
    if (booksByGenre.length != 0) {
      res.status(201)
      .json(booksByGenre)
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

// function to get book released in 2012
const readBooksByYear = async (bookYear) => {
  try {
    const booksByYear = await Books.find({publishedYear: bookYear})
    return booksByYear
  } catch(error) {
    throw error
  }
}

// GET method "/books/year/2012" to read all business published in 2012
app.get("/books/year/:bookYear", async (req, res) => {
  try {
    const booksByYear = await readBooksByYear(req.params.bookYear)
    if (booksByYear.length != 0) {
      res.status(201)
      .json(booksByYear)
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

// function to update book data by Id
const updateBookById = async (bookId, dataToUpdate) => {
  try {
    const updatedBook = await Books.findByIdAndUpdate(bookId, dataToUpdate, {new: true})
    return updatedBook
  } catch(error) {
    throw error
  }
} 

// POST method on "/books/:bookId" to update book data by bookId
app.post("/books/:bookId", async (req, res) => {
  try {
    const updatedBook = await updateBookById(req.params.bookId, req.body)
    if (updatedBook) {
      res.status(201)
      .json({message: "Book updated successfully", updatedBook: updatedBook})
    } else {
      res.status(404)
      .json({error: "No Book Found"})
    }
  } catch(error) {
    res.status(500)
    .json({error: "Internal server error"})
    console.error(error)
  }
})

// function to update book data by book title
const updateBookByTitle = async (bookTitle, dataToUpdate) => {
  try {
    const updatedBook = await Books.findOneAndUpdate(bookTitle, dataToUpdate, {new: true})
    return updatedBook
  } catch(error) {
    throw error
  }
}

// POST method on "/books/title/:bookTitle" to update book data by bookId
app.post("/books/title/:bookTitle", async (req, res) => {
  try {
    const updatedBook = await updateBookByTitle({title: req.params.bookTitle}, req.body)
    if (updatedBook) {
      res.status(201)
      .json({message: "Book updated successfully", updatedBook: updatedBook})
    } else {
      res.status(404)
      .json({error: "No Book Found"})
    }
  } catch(error) {
    res.status(500)
    .json({error: "Internal server error"})
    console.error(error)
  }
})

// function to update book data by book title
const deleteBookById = async (bookId) => {
  try {
    const updatedBook = await Books.findOneAndUpdate(bookTitle, dataToUpdate, {new: true})
    return updatedBook
  } catch(error) {
    throw error
  }
}

// Listenting to http port for http requests
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})