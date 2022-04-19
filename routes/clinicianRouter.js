const express = require('express')

// create our Router object
const clinicianRouter = express.Router()

clinicianRouter.use(express.static('public'));

// require our controller
const clinicianController = require('../controllers/clinicianController')

clinicianRouter.all('/*', function (req, res, next) {
    req.app.locals.layout = 'main_clinician'; // set your layout here
    next(); // pass control to the next handler
    });

clinicianRouter.get('/dashboard', clinicianController.display)

// export the router
module.exports = clinicianRouter