const glucoseData = require('../models/glucoseModel')

const display = async(req, res, next) => { 

        date = new Date();
        year = date.getFullYear();
        month = date.getMonth() + 1;
        day = date.getDate();
        today = day + '/' + month + '/' + year;
        const today_glucose = await glucoseData.findOne({date:today}).lean().populate()
        // found person 
        res.render('dashboard', {data: today_glucose})

} 

module.exports = {
    display,
}




