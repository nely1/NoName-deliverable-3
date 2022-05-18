const patient = require('../models/patientModel')
const clinician = require('../models/clinicianModel')
const summary = require('../models/summaryModel')

const display = async(req, res, next) => { 

    today = new Date()
    if (today.getUTCHours() < 14) {
        today.setUTCDate(today.getUTCDate()-1);
    }
    today.setUTCHours(14,0,0,0);

    const thisClinician = await clinician.findById("6282fa0e54139c4ed1b70231").lean()

    let patientArray = thisClinician.patients
    
    let patientDetails = []
    let summaries = []
    for (var pat in patientArray) {
        // add every patients' details to patientDetails
        // add every summary that is done today and by a patient
        // if the summary doesnt exist for a patient today add null to summaries

        details = await patient.findById(patientArray[pat]).lean()
        patientDetails.push(details)

        summaryDetails = await summary.findOne({datetime: {$gte : today}, patientID: patientArray[pat]},{glucoseID: true, insulinID: true, weightID: true, exerciseID: true, _id: false})
        .lean()
        .populate('glucoseID insulinID weightID exerciseID') 
        
        if (!summaryDetails) {
            patientDetails[pat].summary = new summary()
            
        }
        else {
            patientDetails[pat].summary = summaryDetails
        }
    }
    // console.log(patientDetails[0].summary.weightID) 
    res.render('dashboard', {patientData: patientDetails, dashboard: "active",summaryData: summaries})
} 

module.exports = {
    display,
}




