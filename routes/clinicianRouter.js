const express = require('express')
const clinicianRouter = express.Router()
clinicianRouter.use(express.static('public'));
const { body, validationResult, check } = require('express-validator')

// Middleware to allow saving profile pictures
const multer = require("multer")
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename:  function (req, file, cb) {
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

// Change the header layout specificly for clinicians
clinicianRouter.all('/*', isAuthenticated, hasRole("clinician"), (req, res, next) => {
    req.app.locals.layout = 'clinician_main'; 
    next(); 
});

// Clinician dashboard
const clinicianController = require('../controllers/clinicianController')
clinicianRouter.get('/', clinicianController.display)

// Page for clinicians to register new patients
const registryController = require('../controllers/registryController')
clinicianRouter.get('/register', registryController.display)
clinicianRouter.post('/register',
    body("password").escape(),
    body("bio").escape(),
    body("username").escape(),
    upload.single('myImage'),
    registryController.insert)

// Page for clinicians manage a patient
const patientViewController = require('../controllers/patientViewController')
clinicianRouter.post('/patient_view', 
    body("support_message").escape(),
    patientViewController.display)

// Page for clinicians to view historical notes of a patient
const patientNotesController = require('../controllers/patientNotesController')
clinicianRouter.get('/patient_view/notes', patientNotesController.display)
clinicianRouter.post('/patient_view/notes',
    body("clinician_note").escape(),
    patientNotesController.insertNote)

// Page for clinicians to view their profile
const settingsController = require('../controllers/settingsController')
clinicianRouter.get('/settings',
    body("password").escape(),
    settingsController.display)

// About Diabetes@Home page
const aboutUsController = require('../controllers/aboutUsController')
clinicianRouter.get('/about_us', aboutUsController.display)

// About diabetes page
const aboutDiabetesController = require('../controllers/aboutDiabetesController')
clinicianRouter.get('/about_diabetes', aboutDiabetesController.display)

module.exports = clinicianRouter