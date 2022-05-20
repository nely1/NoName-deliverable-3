const express = require('express')
const patientRouter = express.Router()
const { body, validationResult, check } = require('express-validator')

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    // If user is not authenticated via passport, redirect to login page
    if (!req.isAuthenticated()) {
        return res.redirect('/login_select/patient')
    }
    // Otherwise, proceed to next middleware function
    return next()
}

// set up role-based authentication
const hasRole = (thisRole) => {
    return (req, res, next) => {
        if (req.user.role == thisRole) 
            return next()
        else {
            res.redirect('/login_select')
        }
    }    
}

// Change the header layout specificly for patients
patientRouter.use(express.static('public'));
patientRouter.all('/*', isAuthenticated, hasRole("patient"), function (req, res, next) {
    req.app.locals.layout = 'patient_main';
    next();
});

// Patient homepage
const homepageController = require('../controllers/homepageController')
patientRouter.get('/', isAuthenticated, homepageController.display)

// Page for patients to select data to record
const recordController = require('../controllers/recordController')
patientRouter.get('/record', recordController.display)
patientRouter.post('/record', 
    body("comments").escape(),
    recordController.insert)

// Page for patients to input health data
const submitController = require('../controllers/submitController')
patientRouter.get('/submission/:data_type', submitController.display)

// Page for patients to view their input data history
const viewDataController = require('../controllers/viewDataController')
patientRouter.get('/view_data', viewDataController.display)
patientRouter.post('/view_data', viewDataController.filter)

// Patient leaderboard
const leaderboardController = require('../controllers/leaderboardController')
patientRouter.get('/leaderboard', leaderboardController.display)

// Page for patients to view their profile
const settingsController = require('../controllers/settingsController')
patientRouter.get('/settings', settingsController.display)
patientRouter.post('/settings',
    body("password").escape(),
    settingsController.changeDetails)

// About Diabetes@Home page
const aboutUsController = require('../controllers/aboutUsController')
patientRouter.get('/about_us', aboutUsController.display)

// About diabetes page
const aboutDiabetesController = require('../controllers/aboutDiabetesController')
patientRouter.get('/about_diabetes', aboutDiabetesController.display)

module.exports = patientRouter