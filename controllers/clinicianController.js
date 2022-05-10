const glucoseData = require('../models/glucoseModel')
const patient = require('../models/patientModel')

const display = async(req, res, next) => { 
    const thisPatient = await patient.findById("62675c0d652ecfc70bd91d90").lean().populate()
    res.render('dashboard', {data: thisPatient})
} 

const register = (req, res) => {
    res.render('register')
}

const insert = async(req, res) => {
    res.send("You have inserted a patient")
}

module.exports = {
    display,
    register,
    insert,
}




