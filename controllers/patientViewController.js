const patient = require('../models/patientModel')

const display = async(req, res, next) => { 
    const thisPatient = await patient.findById(req.body.patientID).lean().populate()
    res.render('patient_view', {profile: thisPatient})
} 

module.exports = {
    display,
}




