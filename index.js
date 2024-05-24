const { initializeDatabase } = require('./db/db.connected')
const fs = require('fs')

// Establishing connection to DB
initializeDatabase();

// Reading the raw json data
const jsonData = fs.readFileSync('books.json')
// Parsing the raw json data
const booksData = JSON.parse(jsonData)