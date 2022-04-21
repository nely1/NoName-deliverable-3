const patientProfile = require('../models/patientModel')
const glucoseData = require('../models/glucoseModel')

const display = (req, res) => {
    date = new Date();
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    today = day + '/' + month + '/' + year;

    const today_glucose = glucoseData.find(data => data.date == today)

    const patient = patientProfile.find(data => data.email == "patp@bmail.com")
    res.render('home', {profile : patient, data: today_glucose})
}

module.exports = {
    display,
}