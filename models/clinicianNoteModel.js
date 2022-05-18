const mongoose = require('mongoose') 

const schema = new mongoose.Schema({ 
    notes: [String],
    datetime: Date,
    clinicianID: {type: mongoose.Schema.Types.ObjectId, ref: 'clinicianModel'}, 
    patientID: {type: mongoose.Schema.Types.ObjectId, ref: 'patientModel'}
}) 

const clinicianNotesModel = mongoose.model('clinicianNotesModel', schema) 
module.exports = clinicianNotesModel 