const patient = require('../models/patientModel')

const display = async(req, res, next) => {
    res.render('leaderboard', {leaderboard: "active"})
} 

module.exports = {
    display,
}