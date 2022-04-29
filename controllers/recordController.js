const glucoseData = require('../models/glucoseModel');
const patient = require('../models/patientModel')

const display = async(req, res, next) => { 
    today = new Date()
    if (today.getUTCHours() < 14) {
        today.setUTCDate(today.getUTCDate()-1);
    }
    today.setUTCHours(14,0,0,0);
    const today_glucose = await glucoseData.findOne({datetime: {$gte : today}}).lean()
    res.render('record_data', {data: today_glucose})
}

const insert = async(req, res) => {
    const new_data = new glucoseData({
        datetime: new Date(),
        glucose_data: req.body.glucose_data,
        comments: req.body.comments,
        patientID: await patient.findById("62675c0d652ecfc70bd91d90")
    })
    await new_data.save( (err, result) => { 
        if (err) {
            res.send(err)
            return res.send(result)
        }
    })       
    return res.redirect('/patient/record')
}

module.exports = {
    display,
    insert,
}
