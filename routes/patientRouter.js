const express = require('express')
const patientRouter = express.Router()

/*---------------------------------------------- New code start -----------------------------------------------------*/
// Authentication middleware
const isAuthenticated = (req, res, next) => {

    // If user is not authenticated via passport, redirect to login page
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    // Otherwise, proceed to next middleware function
    return next()
}

// Change the header layout specificly for patients
patientRouter.use(express.static('public'));
patientRouter.all('/*', function (req, res, next) {
    req.app.locals.layout = 'patient_main';
    next();
});

const homepageController = require('../controllers/homepageController')
patientRouter.get('/', isAuthenticated, homepageController.display)

/*---------------------------------------------- New code end -----------------------------------------------------*/

const recordController = require('../controllers/recordController')
patientRouter.get('/record', isAuthenticated, recordController.display)
patientRouter.post('/record', recordController.insert)

const submitController = require('../controllers/submitController')
patientRouter.get('/submission/:data_type', submitController.display)

const viewDataController = require('../controllers/viewDataController')
patientRouter.get('/view_data', viewDataController.display)

const aboutUsController = require('../controllers/aboutUsController')
patientRouter.get('/about_us', aboutUsController.display)

const aboutDiabetesController = require('../controllers/aboutDiabetesController')
patientRouter.get('/about_diabetes', aboutDiabetesController.display)

module.exports = patientRouter