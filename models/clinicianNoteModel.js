const mongoose = require('mongoose') 

const schema = new mongoose.Schema({ 
    patientID: {type: mongoose.Schema.Types.ObjectId, ref: 'patientModel'},
    note: String,
    datetime: Date,
}) 

const clinicianNotesModel = mongoose.model('clinicianNotesModel', schema) 
module.exports = clinicianNotesModel 