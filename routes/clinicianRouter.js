const express = require('express')
const clinicianRouter = express.Router()

const multer = require("multer")
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: async function (req, file, cb) {
        path = file.fieldname + '-' + Date.now() + ".jpg"
        cb(null, path)
    }
  })
  var upload = multer({ storage: storage })


// Authentication middleware
const isAuthenticated = (req, res, next) => {
    // If user is not authenticated via passport, redirect to login page
    if (!req.isAuthenticated()) {
        return res.redirect('/login_select/clinician')
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

clinicianRouter.use(express.static('public'));

const clinicianController = require('../controllers/clinicianController')

// Change the header layout specificly for clinicians
clinicianRouter.all('/*', isAuthenticated, hasRole("clinician"), (req, res, next) => {
    req.app.locals.layout = 'clinician_main'; 
    next(); 
});

clinicianRouter.get('/', clinicianController.display)

const registryController = require('../controllers/registryController')
clinicianRouter.get('/register', registryController.display)
clinicianRouter.post('/register', upload.single('myImage'), registryController.insert)

const patientViewController = require('../controllers/patientViewController')
clinicianRouter.post('/patient_view', patientViewController.display)

const patientNotesController = require('../controllers/patientNotesController')
clinicianRouter.get('/patient_view/notes', patientNotesController.display)

clinicianRouter.post('/patient_view/notes', patientNotesController.insertNote)

const aboutUsController = require('../controllers/aboutUsController')
clinicianRouter.get('/about_us', aboutUsController.display)

const aboutDiabetesController = require('../controllers/aboutDiabetesController')
clinicianRouter.get('/about_diabetes', aboutDiabetesController.display)


module.exports = clinicianRouter