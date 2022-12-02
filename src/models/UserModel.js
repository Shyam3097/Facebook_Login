const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  fname: { type: String, required: true, trim: true },
  lname: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, Min: 8, Max: 15, trim: true },
}, { timestamps: true });


module.exports = mongoose.model('User', userschema);