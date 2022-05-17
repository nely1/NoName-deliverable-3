const patient = require('../models/patientModel')
const clinician = require('../models/clinicianModel')

const display = async(req, res, next) => { 

    const thisClinician = await clinician.findById("6282fa0e54139c4ed1b70231").lean().populate()

    console.log(thisClinician)

    const thisPatient = await patient.findById("62675c0d652ecfc70bd91d90").lean().populate()
    res.render('dashboard', {data: thisPatient, dashboard: "active"})
} 

module.exports = {
    display,
}




