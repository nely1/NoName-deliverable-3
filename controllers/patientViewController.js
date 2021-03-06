const patient = require('../models/patientModel')
const summary = require('../models/summaryModel')

const display = async(req, res, next) => { 

    // Check if clinician made changes to patient health requirements
    if(req.body.update){
        const thisPatient = await patient.findById(req.body.patientID)

        // Check boxes can only detect if on
        // Reset everything to off, then on them back
        thisPatient.req_glucose = false
        thisPatient.req_weight = false
        thisPatient.req_insulin = false
        thisPatient.req_exercise = false
        for (var changes in req.body){
            if(changes == "update"||changes == "patientID"){
                continue
            }
            if (req.body[changes] == "on"){
                thisPatient[changes] = true       
            }
            else if (req.body[changes]){
                thisPatient[changes] = req.body[changes]    
            }
        }
        await thisPatient.save()
    }
    const thisPatient = await patient.findById(req.body.patientID).lean().populate()
    data = await summary.find({patientID: thisPatient}).lean().populate('glucoseID insulinID weightID exerciseID')

    res.render('patient_view', {layout: 'clinician_main', profile: thisPatient, allData: data.reverse()})
} 

module.exports = {
    display,
}




