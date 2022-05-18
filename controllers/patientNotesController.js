const patient = require('../models/patientModel')

const display = async(req, res, next) => {
    res.render('patient_notes')
}

const insertNote = async(req, res) => {
    console.log(req.body);
    const thisPatient = await patient.findById(req.body.patientID).lean().populate()
    res.render('patient_view', {profile: thisPatient})
}

module.exports = {
    display,
    insertNote,
}