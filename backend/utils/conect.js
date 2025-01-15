const mongoose = require('mongoose');
const connection = { isConnected: null };

const connectToDB = async () => {
  try {
    // Check if the database is already connected
    if (connection.isConnected) {
      return;
    }
    // Establish a new database connection
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log(`connected to mongodb: ${db.connection.host}`)
    connection.isConnected = db.connection.readyState; // Use db.connection directly
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error, 'Could not connect with the database');
    console.log('full error' ,error.message)
  }
};

module.exports = connectToDB;
