const mongoose = require('mongoose') 

const schema = new mongoose.Schema({ 
    glucose_data: {type: Number, required: true, min: 0},
    comments: String,
    date: String
}) 

const glucoseModel = mongoose.model('glucoseModel', schema) 

module.exports = glucoseModel 