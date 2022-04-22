const mongoose = require('mongoose') 
const schema = new mongoose.Schema({ 
    glucose_data: {type: double, required: true},
    comments: string,
    date: Date
}) 
const glucoseModel = mongoose.model('glucoseModel', schema) 
module.exports = glucoseModel 