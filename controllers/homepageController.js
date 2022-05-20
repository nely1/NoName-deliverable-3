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

    // Check if patient has recorded data for today in UTC time
    //const today_glucose = await glucoseData.findOne({datetime: {$gte : today}}).lean() 
    let thisPatient = req.user
    let today_data = await summaryData.findOne({datetime: {$gte : today}, patientID: thisPatient._id}).lean().populate('glucoseID insulinID weightID exerciseID')
    

    // get date
    let engagement_list = [];

    // today - registré for the denominator
    let denominator_diff = ((Math.abs(today - thisPatient.registry_date))/86400000) + 1;
    patient_array = await patient.find({})
    let engagement_rate = 0;
    let counter = 0;
    let thisPatientEngagementRate = 0
    let thisPatientRank = 0 
    
    for(let i = 0; i < patient_array.length;i++){
        thisPatient = await summaryData.find({patientID : patient_array[i]._id});
        counter = 0;
        for(let j = 0; j < thisPatient.length;j++){
            // console.log(thisPatient[i]);
            if(await glucoseData.findById(thisPatient[j].glucoseID) != null){
                counter++;
                continue;
            }
            if(await weightData.findById(thisPatient[j].weightID) != null){
                counter++;
                continue;
            }
            if(await exerciseData.findById(thisPatient[j].exerciseID) != null){
                counter++;
                continue;
            }
            if(await insulinData.findById(thisPatient[j].insulinID) != null){
                counter++;
                continue;
            }   
        }
        engagement_rate = Math.round(100*(counter/denominator_diff));

        // check if engagement rate is logged in user's, if so store
        if (req.user._id.equals(patient_array[i]._id)){
            thisPatientEngagementRate = engagement_rate
            thisPatientRank = i + 1
        }

        engagement_list[engagement_list.length] = [engagement_rate, patient_array[i].username]
    }

    engagement_list.sort(sortFunction)
    res.render('home', {profile: req.user.toJSON(), data: today_data, home: "active", 
        one_rate: engagement_list[0][0], one_name: engagement_list[0][1], 
        user_rate: thisPatientEngagementRate, user_rank: thisPatientRank})
}

function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] > b[0]) ? -1 : 1;
    }
}

module.exports = {
    display,
}
