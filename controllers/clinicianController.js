const patientProfile = require('../models/patientModel')
const glucoseData = require('../models/glucoseModel')

const display = async(req, res, next) => { 
    try {
        date = new Date();
        year = date.getFullYear();
        month = date.getMonth() + 1;
        day = date.getDate();
        today = day + '/' + month + '/' + year;
        const today_glucose = await glucoseData.findById(today).lean() 
        // found person 
        const patient = patientProfile.find(data => data.email == "patp@bmail.com")
        res.render('dashboard', {profile : patient, data: today_glucose})
    } catch (err) { 
        return next(err) 
    } 
} 

module.exports = {
    display,
}




