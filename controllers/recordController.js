const glucoseData = require('../models/glucoseModel');
const patient = require('../models/patientModel')

const display = async(req, res, next) => { 
    date = new Date();
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    today = day + '/' + month + '/' + year;
    const today_glucose = await glucoseData.findOne({date:today}).lean() //.populate('patientID') to get information about patient
    console.log(today_glucose)
    res.render('record_data', {data: today_glucose})
}

const insert = async(req, res) => {
    const new_data = new glucoseData({
        date: req.body.date,
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
