const mongoose = require('mongoose') 

const schema = new mongoose.Schema({ 
    notes: [String],
    clinicianID: {type: mongoose.Schema.Types.ObjectId, ref: 'clinicianModel'}, 
    patientID: {type: mongoose.Schema.Types.ObjectId, ref: 'patientModel'}
}) 

const exerciseModel = mongoose.model('exerciseModel', schema) 
module.exports = exerciseModel 