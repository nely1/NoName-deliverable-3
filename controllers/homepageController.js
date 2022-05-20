const summaryData = require('../models/summaryModel')

const display = async(req, res, next) => { 

    // Convert 12am Melbourne time into UTC time using UTC+10, a patient can record new data every 2pm UTC time.
    today = new Date()
    if (today.getUTCHours() < 14) {
        today.setUTCDate(today.getUTCDate()-1);
    }
    today.setUTCHours(14,0,0,0);

    // Check if patient has recorded data for today in UTC time
    const thisPatient = req.user
    let today_data = await summaryData.findOne({datetime: {$gte : today}, patientID: thisPatient._id}).lean().populate('glucoseID insulinID weightID exerciseID')
    

    res.render('home', {profile: thisPatient.toJSON(), data: today_data, home: "active"})
}

module.exports = {
    display,
}

