const express = require('express')
const patientRouter = express.Router()

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

const homepageController = require('../controllers/homepageController')
patientRouter.get('/', isAuthenticated, homepageController.display)

const recordController = require('../controllers/recordController')
patientRouter.get('/record', recordController.display)
patientRouter.post('/record', recordController.insert)

const submitController = require('../controllers/submitController')
patientRouter.get('/submission/:data_type', submitController.display)

const viewDataController = require('../controllers/viewDataController')
patientRouter.get('/view_data', viewDataController.display)
patientRouter.post('/view_data', viewDataController.filter)

const aboutUsController = require('../controllers/aboutUsController')
patientRouter.get('/about_us', aboutUsController.display)

const aboutDiabetesController = require('../controllers/aboutDiabetesController')
patientRouter.get('/about_diabetes', aboutDiabetesController.display)

const settingsController = require('../controllers/settingsController')
patientRouter.get('/settings', settingsController.display)

module.exports = patientRouter