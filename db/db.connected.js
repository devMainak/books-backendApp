const mongoose = require('mongoose')

// Access your MongoDB connection string from secrets
const mongoURI = process.env.MONGODB

// Use mongoose to connect
async function initializeDatabase(){
  try {
    const connection = await mongoose.connect(mongoURI);
    if (connection)
    {
      console.log('Connected Successfully');
    }
  }
  catch (error) {
    console.log('Connection Failed', error);
  }
}

module.exports = { initializeDatabase };