const glucoseData = require('../models/glucoseModel')

const display = async(req, res, next) => { 
    today = new Date().setHours(0,0,0,0);
    const today_glucose = await glucoseData.findOne({datetime: {$gte : today}}).lean().populate("patientID")
    res.render('dashboard', {data: today_glucose})

} 

module.exports = {
    display,
}




