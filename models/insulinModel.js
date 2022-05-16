const mongoose = require('mongoose') 

const schema = new mongoose.Schema({ 
    insulin_data: {type: Number, required: true, min: 0},
    comments: String,
    datetime: Date,
    patientID: {type: mongoose.Schema.Types.ObjectId, ref: 'patientModel'}
}) 

const insulinModel = mongoose.model('insulinModel', schema) 
module.exports = insulinModel 