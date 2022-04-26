const mongoose = require('mongoose') 
const patient = require('./patientModel')

const schema = new mongoose.Schema({ 
    glucose_data: {type: Number, required: true, min: 0},
    comments: String,
    date: String,
    patientID: {type: mongoose.Schema.Types.ObjectId, ref: 'patientModel'}
}) 

const glucoseModel = mongoose.model('glucoseModel', schema) 

module.exports = glucoseModel 