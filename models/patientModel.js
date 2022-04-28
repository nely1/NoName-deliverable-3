
const mongoose = require('mongoose') 

const schema = new mongoose.Schema({ 
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    username: {type: String, required: true},
    DOB: {type: String, required: true},
    gender: String,
    email: {type: String, required: true},
    password: {type: String, required: true},
    textbio: String,
    profile_picture: String,
    patientID: Number,
    glucose_min: Number,
    glucose_max: Number,
    req_glucose: Boolean,
    req_exercise: Boolean,
    req_insulin: Boolean,
    req_weight: Boolean,
    support_message: String

}) 

const patientModel = mongoose.model('patientModel', schema) 

module.exports = patientModel 