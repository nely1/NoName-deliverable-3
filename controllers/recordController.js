const glucoseData = require('../models/glucoseModel')


const display = (req, res) => {
    res.render('record_data', {data: glucoseData})
}

const insert = (req, res) => {
    const { glucose_data, comments } = req.body
    glucoseData.push({ glucose_data, comments })
    console.log(req.body)
    return res.redirect('/patient/record')
}

module.exports = {
    display,
    insert,
}