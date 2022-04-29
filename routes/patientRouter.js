const express = require('express')
const patientRouter = express.Router()

// Change the header layout specificly for patients
patientRouter.use(express.static('public'));
patientRouter.all('/*', function (req, res, next) {
    req.app.locals.layout = 'patient_main';
    next();
});

const homepageController = require('../controllers/homepageController')
patientRouter.get('/', homepageController.display)

const recordController = require('../controllers/recordController')
patientRouter.get('/record', recordController.display)
patientRouter.post('/record', recordController.insert)

const submitController = require('../controllers/submitController')
patientRouter.get('/submission/:data_type', submitController.display)

module.exports = patientRouter