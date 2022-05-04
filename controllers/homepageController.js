const glucoseData = require('../models/glucoseModel')

const display = async(req, res, next) => { 

    // Convert 12am Melbourne time into UTC time using UTC+10, a patient can record new data every 2pm UTC time.
    today = new Date()
    if (today.getUTCHours() < 14) {
        today.setUTCDate(today.getUTCDate()-1);
    }
    today.setUTCHours(14,0,0,0);

    // Check if patient has recorded data for today in UTC time
    const today_glucose = await glucoseData.findOne({datetime: {$gte : today}}).lean() 
    res.render('home', {profile: req.user.toJSON(), data: today_glucose})
}

module.exports = {
    display,
}

