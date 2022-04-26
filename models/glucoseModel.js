const mongoose = require('mongoose') 
const patient = require('./patientModel')

const schema = new mongoose.Schema({ 
    glucose_data: {type: Number, required: true, min: 0},
    comments: String,
    date: String,
    patientID: patient
}) 

const glucoseModel = mongoose.model('glucoseModel', schema) 

module.exports = glucoseModel 