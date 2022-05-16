const mongoose = require('mongoose') 

const schema = new mongoose.Schema({ 
    weight_data: {type: Number, required: true, min: 0},
    comments: String,
    datetime: Date,
    patientID: {type: mongoose.Schema.Types.ObjectId, ref: 'patientModel'}
}) 

const weightModel = mongoose.model('weightModel', schema) 
module.exports = weightModel 