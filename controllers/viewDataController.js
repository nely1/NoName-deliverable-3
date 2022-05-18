const glucoseData = require('../models/glucoseModel');
const patient = require('../models/patientModel')
const summary = require('../models/summaryModel')

const display = async(req, res, next) => {
    data = await summary.find({patientID: req.user._id}).lean().populate('glucoseID insulinID weightID exerciseID')

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