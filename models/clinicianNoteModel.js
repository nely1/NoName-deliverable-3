const mongoose = require('mongoose') 

const schema = new mongoose.Schema({ 
    note: String,
    datetime: Date,
}) 

const clinicianNotesModel = mongoose.model('clinicianNotesModel', schema) 
module.exports = clinicianNotesModel 