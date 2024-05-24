const { initializeDatabase } = require('./db/db.connected')
const fs = require('fs')
const Books = require('./models/books.model') 

// Establishing connection to DB
initializeDatabase();

// Reading the raw json data
const jsonData = fs.readFileSync('books.json')
// Parsing the raw json data
const booksData = JSON.parse(jsonData)

// function to seed intial data to the schema
const seedData = () => {
  try {
    for (const book of booksData)
      {
        const newBook = new Books({
          title: book.title,
          author: book.author,
          publishedYear: book.publishedYear,
          genre: book.genre,
          language: book.language,
          country: book.country,
          rating: book.rating,
          summary: book.summary,
          coverImageUrl: book.coverImageUrl
        })

        newBook.save()
        console.log("New Book: ", newBook.title)
      }
  } catch(error) {
    console.error("Error occured while seeding data to DB")
  }
}

seedData()