const mongoose = require('mongoose');

const activeUserSchema = new mongoose.Schema({
  rollno: { type: String, required: true, unique: true },
  role: { type: String, enum: ['student', 'counselor'], required: true },
  name: { type: String, required: true } 
});

module.exports = mongoose.model('ActiveUser', activeUserSchema);

