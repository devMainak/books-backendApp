const mongoose = require('mongoose')

// Books Data Model
const booksSchema = new mongoose.Schema({
  title: String,
  author: String,
  publishedYear: Number,
  genre: [{
    type: String
  }],
  language: {
    type: String,
    default: "English"
  },
  country: {
    type: String,
    default: "United States"
  },
  rating: Number,
  summary: String,
  coverImageUrl: String
})

const Books = mongoose.model('Books', booksSchema)

module.exports = Books