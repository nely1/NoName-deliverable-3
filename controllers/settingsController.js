const patient = require('../models/patientModel')

const display = async(req, res, next) => { 
    res.render('settings', {profile: req.user.toJSON(), settings: "active"})
}

const changeDetails = async(req, res, next) => {
    newPassword = req.body.password

    thisPatient = await patient.findById(req.user._id)

    thisPatient.password = newPassword

    await thisPatient.save()
    

    res.render('settings', {profile: req.user.toJSON(), settings: "active"})
}

module.exports = {
    display,
    changeDetails
}

