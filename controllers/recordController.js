const glucoseData = require('../models/glucoseModel');
const patient = require('../models/patientModel')
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
    let today_data = await summaryData.findOne({datetime: {$gte : today}, patientID: thisPatient._id}).lean()

    if (!today_data) {
        today_data = new summaryData({
            datetime: today,
            insulinID: null,
            glucoseID: null,
            weightID: null,
            exerciseID: null,
            patientID: thisPatient._id
        })
        
        await today_data.save( (err, result) => { 
            if (err) {
                res.send(err)
                return res.send(result)
            }
        })   
    }

    // Check if patient has recorded data for today in UTC time
    const today_glucose = await glucoseData.findOne({datetime: {$gte : today}}).lean()
    res.render('record_data', {profile: req.user.toJSON(), data: today_glucose, record: "active"})
}

const insert = async(req, res) => {
    // initialise the day in melbourne time
    today = new Date()
    if (today.getUTCHours() < 14) {
        today.setUTCDate(today.getUTCDate()-1);
    }
    today.setUTCHours(14,0,0,0);

    // Pat's ID is hardcoded until login feature is implemented, links data recorded to Pat
    
    
    
    let new_data 
    const thisPatient = req.user
    let today_data = await summaryData.findOne({datetime: {$gte : today}, patientID: thisPatient._id}).lean()

    if (req.body.data_type == 'Glucose') {
            new_data = new glucoseData({
            datetime: new Date(),
            glucose_data: req.body.data,
            comments: req.body.comments,
            patientID: thisPatient
        })
    }

    else if (req.body.data_type == 'Insulin') {
            new_data = new insulinData({
            datetime: new Date(),
            insulin_data: req.body.data,
            comments: req.body.comments,
            patientID: thisPatient
        })
    }

    else if (req.body.data_type == 'Weight') {
            new_data = new weightData({
            datetime: new Date(),
            weight_data: req.body.data,
            comments: req.body.comments,
            patientID: thisPatient
        })
    }
    else {
            new_data = new exerciseData({
            datetime: new Date(),
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
   

    // Store each glucose data id in patient, useful for view data which will be implemented in deliverable 3
    await patient.updateOne({"patientID":10271},{$set:{"glucose_data": new_data}})
    await summaryData.updateOne({_id: today_data._id},{$set:{[string_id]: new_data._id}})
    return res.redirect('/patient/record')
}

module.exports = {
    display,
    insert,
}
