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
clinicianRouter.get('/register', clinicianController.register)
clinicianRouter.post('/register', clinicianController.insert)


module.exports = clinicianRouter