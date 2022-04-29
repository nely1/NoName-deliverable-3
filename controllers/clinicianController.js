const glucoseData = require('../models/glucoseModel')
const patient = require('../models/patientModel')

const display = async(req, res, next) => { 

    // Convert 12am Melbourne time into UTC time using UTC+10, a patient can record new data every 2pm UTC time.
    today = new Date()
    if (today.getUTCHours() < 14) {
        today.setUTCDate(today.getUTCDate()-1);
    }
    today.setUTCHours(14,0,0,0);

    // Check if patient has recorded data for today in UTC time
    
    const thisPatient = await patient.findById("62675c0d652ecfc70bd91d90").lean().populate()
    const today_glucose = await glucoseData.findById(thisPatient.glucose_data[thisPatient.glucose_data.length - 1]).lean()
    console.log(today_glucose)
    
    res.render('dashboard', {data: thisPatient, glucose: today_glucose})

} 

module.exports = {
    display,
}




