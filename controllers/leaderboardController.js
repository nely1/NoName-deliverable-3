const patient = require('../models/patientModel')

const display = async(req, res, next) => {
    console.log(req.user.registry_date)

    res.render('leaderboard', {leaderboard: "active"})
} 

module.exports = {
    display,
}