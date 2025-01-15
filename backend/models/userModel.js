const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Must provide an email'],
      unique: [true, 'Email must be unique'],
    },
    password: {
      type: String,
      required: [true, 'Must provide a password'],
    },
    
  },
  { timestamps: true } // This adds `createdAt` and `updatedAt` fields automatically
);

const User = mongoose.model('User', userSchema);

module.exports = User;
