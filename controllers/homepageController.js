const patientProfile = require('../models/patientModel')
const glucoseData = require('../models/glucoseModel')

const display = async(req, res, next) => { 

        date = new Date();
        year = date.getFullYear();
        month = date.getMonth() + 1;
        day = date.getDate();
        today = day + '/' + month + '/' + year;
        const today_glucose = await glucoseData.findOne({date:today}).lean() 
        // found person 
        const patient = await patientProfile.findById("62675c0d652ecfc70bd91d90").lean()
        console.log(patient)
        res.render('home', {profile : patient, data: today_glucose})
 
}

module.exports = {
    display,
}

