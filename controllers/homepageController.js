const patientProfile = require('../models/patientModel')
const glucoseData = require('../models/glucoseModel')

const display = async(req, res, next) => { 
    today = new Date()
    if (today.getUTCHours() < 14) {
        today.setUTCDate(today.getUTCDate()-1);
    }
    today.setUTCHours(14,0,0,0);
    const today_glucose = await glucoseData.findOne({datetime: {$gte : today}}).lean() 
    const patient = await patientProfile.findById("62675c0d652ecfc70bd91d90").lean()
    res.render('home', {profile : patient, data: today_glucose})
 
}

module.exports = {
    display,
}

