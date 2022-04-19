const express = require('express')

const clinicianRouter = express.Router()

clinicianRouter.use(express.static('public'));

const clinicianController = require('../controllers/clinicianController')

clinicianRouter.all('/*', (req, res, next) => {
    req.app.locals.layout = 'clinician_main'; 
    next(); 
});

clinicianRouter.get('/', clinicianController.display)

module.exports = clinicianRouter