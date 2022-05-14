const express = require('express')
const clinicianRouter = express.Router()

clinicianRouter.use(express.static('public'));

const clinicianController = require('../controllers/clinicianController')

// Change the header layout specificly for clinicians
clinicianRouter.all('/*', (req, res, next) => {
    req.app.locals.layout = 'clinician_main'; 
    next(); 
});

clinicianRouter.get('/', clinicianController.display)

const registryController = require('../controllers/registryController')
clinicianRouter.get('/register', registryController.display)
clinicianRouter.post('/register', registryController.insert)

const patientViewController = require('../controllers/patientViewController')
clinicianRouter.post('/patient_view', patientViewController.display)

const patientNotesController = require('../controllers/patientNotesController')
clinicianRouter.post('/patient_view/notes', patientNotesController.display)

module.exports = clinicianRouter