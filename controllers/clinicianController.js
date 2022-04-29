const glucoseData = require('../models/glucoseModel')

const display = async(req, res, next) => { 
    today = new Date()
    if (today.getHours() < 14) {
        today.setDays(today.getDays()-1);
    }
    today.setHours(14,0,0,0);

    const today_glucose = await glucoseData.findOne({datetime: {$gte : today}}).lean().populate("patientID")
    res.render('dashboard', {data: today_glucose})

} 

module.exports = {
    display,
}




