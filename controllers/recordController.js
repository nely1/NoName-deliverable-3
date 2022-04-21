const glucoseData = require('../models/glucoseModel')

const display = (req, res) => {

    date = new Date();
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    today = day + '/' + month + '/' + year;

    const today_glucose = glucoseData.find(data => data.date == today)
    res.render('record_data', {data: today_glucose})
}

const insert = (req, res) => {
    const { date, glucose_data, comments } = req.body
    glucoseData.push({ date, glucose_data, comments })
    return res.redirect('/patient/record')
}

module.exports = {
    display,
    insert,
}