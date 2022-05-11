const glucoseData = require('../models/glucoseModel');
const patient = require('../models/patientModel')

const display = async(req, res, next) => { 
    res.render('view_data', {view_data: "active"})
} 

module.exports = {
    display,
}