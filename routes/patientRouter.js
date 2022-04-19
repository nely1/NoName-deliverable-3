const express = require('express')
const patientRouter = express.Router()

patientRouter.use(express.static('public'));
patientRouter.all('/*', function (req, res, next) {
    req.app.locals.layout = 'patient_main';
    next();
});

const recordController = require('../controllers/recordController')
const submitController = require('../controllers/submitController')
const confirmSubmissionController = require('../controllers/confirmSubmissionController')

patientRouter.get('/record', recordController.display)
patientRouter.post('/record', recordController.insert)

patientRouter.get('/submission/:data_type', submitController.display)

patientRouter.post('/confirm_submission', confirmSubmissionController.display)

module.exports = patientRouter