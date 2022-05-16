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
    res.render('record_data', {profile: req.user.toJSON(), data: today_glucose, record: "active"})
}

const insert = async(req, res) => {
    // Pat's ID is hardcoded until login feature is implemented, links data recorded to Pat
    const thisPatient = req.user
    
    const new_data = new glucoseData({
        datetime: new Date(),
        glucose_data: req.body.glucose_data,
        comments: req.body.comments,
        patientID: thisPatient
    })
    await new_data.save( (err, result) => { 
        if (err) {
            res.send(err)
            return res.send(result)
        }
    })     

    // Store each glucose data id in patient, useful for view data which will be implemented in deliverable 3
    await patient.updateOne({"patientID":10271},{$set:{"glucose_data": new_data}})
    return res.redirect('/patient/record')
}

module.exports = {
    display,
    insert,
}
