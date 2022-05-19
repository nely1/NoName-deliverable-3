const patient = require('../models/patientModel')
const summary = require('../models/summaryModel')

const display = async(req, res, next) => { 

    // Convert 12am Melbourne time into UTC time using UTC+10, a patient can record new data every 2pm UTC time.
    today = new Date()
    if (today.getUTCHours() < 14) {
        today.setUTCDate(today.getUTCDate()-1);
    }
    today.setUTCHours(14,0,0,0);

    const thisClinician = req.user

    let patientArray = thisClinician.patients
    let patientDetails = []

    if (patientArray) {
        for (var pat in patientArray) {
            // add every patients' details to patientDetails
            // add every summary that is done today and by a patient
            // if the summary doesn't exist for a patient today add null to summaries
        
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
    }   
    res.render('dashboard', {patientData: patientDetails, dashboard: "active"})
} 

module.exports = {
    display,
}




