const mongoose = require('mongoose') 

const schema = new mongoose.Schema({ 
    exercise_data: {type: Number, required: true, min: 0},
    comments: String,
    datetime: Date,
    patientID: {type: mongoose.Schema.Types.ObjectId, ref: 'patientModel'}
}) 

const exerciseModel = mongoose.model('exerciseModel', schema) 
module.exports = exerciseModel 