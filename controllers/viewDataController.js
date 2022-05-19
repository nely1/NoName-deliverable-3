const { min } = require('moment');
const glucoseData = require('../models/glucoseModel');
const patient = require('../models/patientModel')
const summary = require('../models/summaryModel')

const display = async(req, res, next) => {
    //display data for the current week as default
    today = new Date()
    if (today.getUTCHours() < 14) {
        today.setUTCDate(today.getUTCDate()-1);
    }
    today.setUTCHours(14,0,0,0)
    dow = today.getUTCDay(today)
    start = today.setUTCDate(today.getUTCDate() - dow)
    
    finish = new Date(start)
    finish.setDate(finish.getDate() + 7)
    data = await summary.find({patientID: req.user._id,  datetime: { $gte: start, $lt: finish }}).lean().populate('glucoseID insulinID weightID exerciseID')

    res.render('view_data', {view_data: "active", allData: data})
} 

const filter = async(req, res, next) => {
    thisPatient = req.user
    
    // find the time for the start of the week and the end of the week
    yearWeek = req.body.week
    data = {}
    if (yearWeek) {
        year = parseInt(yearWeek.slice(0,4))
        week = parseInt(yearWeek.slice(6,9))
        day = (1 + (week - 1) * 7)
        
        simple = new Date(year, 0, 1 + (week - 1) * 7);
        dow = simple.getDay();
        start = simple;
        if (dow <= 4)
            start.setDate(simple.getDate() - simple.getDay() + 1);
        else
            start.setDate(simple.getDate() + 8 - simple.getDay())

        finish = new Date(start)
        finish.setDate(finish.getDate() + 7)

        
        // use start and finish to filter out data that has been entered between those times
        data = await summary.find({patientID: req.user._id,  datetime: { $gte: start, $lt: finish }}).lean().populate('glucoseID insulinID weightID exerciseID')
    }

    // if no week has been specified display the data for the current week
    else {
        today = new Date()
        if (today.getUTCHours() < 14) {
            today.setUTCDate(today.getUTCDate()-1);
        }
        today.setUTCHours(14,0,0,0)

        dow = today.getUTCDay(today)
        start = today.setUTCDate(today.getUTCDate() - dow)
        
        finish = new Date(start)
        finish.setDate(finish.getDate() + 7)

        data = await summary.find({patientID: req.user._id,  datetime: { $gte: start, $lt: finish }}).lean().populate('glucoseID insulinID weightID exerciseID')
    }
    res.render('view_data', {view_data: "active", allData: data, prevEntered: yearWeek})
}

module.exports = {
    display,
    filter,
}