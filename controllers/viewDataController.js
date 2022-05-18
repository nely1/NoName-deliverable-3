const glucoseData = require('../models/glucoseModel');
const patient = require('../models/patientModel')
const summary = require('../models/summaryModel')

const display = async(req, res, next) => {
    //daysOfWeeks = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday', 'Sunday']

    data = await summary.find({patientID: req.user._id}).lean().populate('glucoseID insulinID weightID exerciseID')
    
    /*
    dates = []

    for (var date in data) {
        day = data[date].datetime.getDate()
        month = data[date].datetime.getMonth()
        year = data[date].datetime.getFullYear()
        dayNumber = parseInt(data[date].datetime.getDay())
        dayOfWeek = daysOfWeeks[dayNumber]
        dateString = day + '/' + month +'/' + year + ', ' + dayOfWeek
        dates.push(dateString)
    }
    */
    //console.log(data)

    res.render('view_data', {view_data: "active", allData: data.reverse()})
} 

const filter = async(req, res, next) => {
    thisPatient = req.user
    console.log(req.body)

    res.render('view_data', {view_data: "active"})
}

module.exports = {
    display,
    filter,
}