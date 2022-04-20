const patientProfile = require('../models/patientModel')

const display = (req, res) => {

    const patient = patientProfile.find(data => data.email == "patp@bmail.com")
    res.render('dashboard', {data : patient})
}

module.exports = {
    display,
}