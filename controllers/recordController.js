const glucoseData = require('../models/glucoseModel');
const patient = require('../models/patientModel')

const display = async(req, res, next) => { 

    // Convert 12am Melbourne time into UTC time using UTC+10, a patient can record new data every 2pm UTC time.
    today = new Date()
    if (today.getUTCHours() < 14) {
        today.setUTCDate(today.getUTCDate()-1);
    }
    today.setUTCHours(14,0,0,0);

    // Check if patient has recorded data for today in UTC time
    const today_glucose = await glucoseData.findOne({datetime: {$gte : today}}).lean()
    res.render('record_data', {data: today_glucose})
}

const insert = async(req, res) => {
    const new_data = new glucoseData({
        datetime: new Date(),
        glucose_data: req.body.glucose_data,
        comments: req.body.comments,

        // Pat's ID is hardcoded until login feature is implemented, links data recorded to Pat
        patientID: await patient.findById("62675c0d652ecfc70bd91d90")
    })
    await new_data.save( (err, result) => { 
        if (err) {
            res.send(err)
            return res.send(result)
        }
    })     
    
    const thisPatient = await patient.findById("62675c0d652ecfc70bd91d90")
    await patient.updateOne({"patientID":10271},{$set:{"glucose_data": new_data._id}})
    return res.redirect('/patient/record')
}

module.exports = {
    display,
    insert,
}
