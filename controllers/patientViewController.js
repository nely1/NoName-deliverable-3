const patient = require('../models/patientModel')
const summary = require('../models/summaryModel')

const display = async(req, res, next) => { 

    if(req.body.update){
        const thisPatient = await patient.findById(req.body.patientID)
        thisPatient.req_glucose = false
        thisPatient.req_weight = false
        thisPatient.req_insulin = false
        thisPatient.req_exercise = false
        thisPatient.password = "12345"
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


    res.render('patient_view', {profile: thisPatient})
} 


module.exports = {
    display,
}




