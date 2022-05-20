const glucoseData = require('../models/glucoseModel');
const summaryData = require('../models/summaryModel')
const insulinData = require('../models/insulinModel')
const exerciseData = require('../models/exerciseModel')
const weightData = require('../models/weightModel')


const display = async(req, res, next) => { 

    // Convert 12am Melbourne time into UTC time using UTC+10, a patient can record new data every 2pm UTC time.
    today = new Date()
    if (today.getUTCHours() < 14) {
        today.setUTCDate(today.getUTCDate()-1);
    }
    today.setUTCHours(14,0,0,0);

    const thisPatient = req.user

    // check if patient has already entered data for today
    // if not create a summary object for data to be entered in
    let today_data = await summaryData.findOne({datetime: {$gte : today}, patientID: thisPatient._id}).lean().populate('glucoseID insulinID weightID exerciseID')

    if (!today_data) {
        today_data = new summaryData({
            datetime: today,
            insulinID: new insulinData(),
            glucoseID: new glucoseData(),
            weightID: new weightData(),
            exerciseID: new exerciseData(),
            patientID: thisPatient._id
        })
        
        await today_data.save( (err, result) => { 
            if (err) {
                res.send(err)
                return res.send(result)
            }
        })   
    }
  
    res.render('record_data', {profile: thisPatient.toJSON(), data: today_data, record: "active"})
}

const insert = async(req, res) => {
    // initialise the day in melbourne time
    today = new Date()
    if (today.getUTCHours() < 14) {
        today.setUTCDate(today.getUTCDate()-1);
    }
    today.setUTCHours(14,0,0,0);

    let new_data 
    const thisPatient = req.user
    let today_data = await summaryData.findOne({datetime: {$gte : today}, patientID: thisPatient._id}).lean()
    
    if (req.body.data_type == 'Glucose') {
            new_data = new glucoseData({
            datetime: today,
            glucose_data: req.body.data,
            comments: req.body.comments,
            patientID: thisPatient
        })
    }

    else if (req.body.data_type == 'Insulin') {
            new_data = new insulinData({
            datetime: today,
            insulin_data: req.body.data,
            comments: req.body.comments,
            patientID: thisPatient
        })
    }

    else if (req.body.data_type == 'Weight') {
            new_data = new weightData({
            datetime: today,
            weight_data: req.body.data,
            comments: req.body.comments,
            patientID: thisPatient
        })
    }
    else {
            new_data = new exerciseData({
            datetime: today,
            exercise_data: req.body.data,
            comments: req.body.comments,
            patientID: thisPatient
        })
    }

    await new_data.save( (err, result) => { 
        if (err) {
            res.send(err)
            return res.send(result)
        }
    })     

    let string_id = req.body.data_type.toLowerCase() + "ID"

    await summaryData.updateOne({_id: today_data._id},{$set:{[string_id]: new_data._id}})
    return res.redirect('/patient/record')
}

module.exports = {
    display,
    insert,
}
