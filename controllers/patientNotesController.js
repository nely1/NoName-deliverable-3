const patient = require('../models/patientModel')

const display = async(req, res, next) => {
    res.render('patient_notes')
}

module.exports = {
    display,
}