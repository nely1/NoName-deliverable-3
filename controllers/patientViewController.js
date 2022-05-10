const glucoseData = require('../models/glucoseModel')
const patient = require('../models/patientModel')

const display = async(req, res, next) => { 
    const thisPatient = await patient.findById("62675c0d652ecfc70bd91d90").lean().populate()
    res.render('individual_patient', {data: thisPatient})
} 

module.exports = {
    display,
}




