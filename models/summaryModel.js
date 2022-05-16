const mongoose = require('mongoose') 

const schema = new mongoose.Schema({ 
    datetime: Date,
    glucoseID: {type: mongoose.Schema.Types.ObjectId, ref: 'glucoseModel'},
    weightID: {type: mongoose.Schema.Types.ObjectId, ref: 'weightModel'},
    exerciseID: {type: mongoose.Schema.Types.ObjectId, ref: 'exerciseModel'},
    insulinID: {type: mongoose.Schema.Types.ObjectId, ref: 'insulinModel'},
    patientID: {type: mongoose.Schema.Types.ObjectId, ref: 'patientModel'}
}) 

const summaryModel = mongoose.model('summaryModel', schema) 
module.exports = summaryModel 