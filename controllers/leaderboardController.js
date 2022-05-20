const patient = require('../models/patientModel')
const summary = require('../models/summaryModel')
const glucose = require('../models/glucoseModel')
const exercise = require('../models/exerciseModel')
const insulin = require('../models/insulinModel')
const weight = require('../models/weightModel')

// query the summary model using patient model ID
const display = async(req, res) => {
    // 1. engager, give object -> with name and score
    
    // res.render('leaderboard', {leaderboard: "active"}, {leaderboard: “active”, top1: obj with name and score, top2: obj with name and score……,} )
    
    // get patient 
    let thisPatient = req.user;

    // get date
    let engagement_list = [];
    today = new Date()
    if (today.getUTCHours() < 14) {
        today.setUTCDate(today.getUTCDate()-1);
    }
    today.setUTCHours(14,0,0,0);

    // today - registré for the denominator
    let denominator_diff = ((Math.abs(today - thisPatient.registry_date))/86400000) + 1;

    // go through each day, check each field if non-empty, for each day, if there is >= 1 non empty ID, then sum number of days
    // that are non empty
    // const thisPaitentId = summary.find();


    patient_array = await patient.find({})
    let engagement_rate = 0;
    let counter = 0;
    let thisPatientEngagementRate = 0
    let thisPatientRank = 0 
    
    for(let i = 0; i < patient_array.length;i++){
        thisPatient = await summary.find({patientID : patient_array[i]._id});
        counter = 0;
        for(let j = 0; j < thisPatient.length;j++){
            // console.log(thisPatient[i]);
            if(await glucose.findById(thisPatient[j].glucoseID) != null){
                counter++;
                continue;
            }
            if(await weight.findById(thisPatient[j].weightID) != null){
                counter++;
                continue;
            }
            if(await exercise.findById(thisPatient[j].exerciseID) != null){
                counter++;
                continue;
            }
            if(await insulin.findById(thisPatient[j].insulinID) != null){
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
    
    res.render('leaderboard', {leaderboard: "active", one_rate: engagement_list[0][0] , one_name: engagement_list[0][1],
        two_rate: engagement_list[1][0], two_name: engagement_list[1][1], three_rate: engagement_list[2][0], three_name: engagement_list[2][1],
        four_rate: engagement_list[3][0], four_name: engagement_list[3][1], five_rate: engagement_list[4][0], five_name: engagement_list[4][1], 
        user_rate: thisPatientEngagementRate, user_rank: thisPatientRank, badge: thisPatientEngagementRate>80} )
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