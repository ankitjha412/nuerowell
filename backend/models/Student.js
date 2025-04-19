// backend/models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  _id: {
    type: String,   // roll number
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: { 
    type: String,
    required: true,
    unique: true 
  },
  password: {
    type: String,
    required: true
  }
}, { _id: false }); // Disable default ObjectId

module.exports = mongoose.model('Student', studentSchema);
