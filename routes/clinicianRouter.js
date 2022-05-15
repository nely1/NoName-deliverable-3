const express = require('express')
const clinicianRouter = express.Router()

/* Middleware for uploading images, stored on server */
// const patient = require('../models/patientModel')

// const multer = require("multer")
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'public/images')
//     },
//     filename: async function (req, file, cb) {
//         path = file.fieldname + '-' + Date.now() + ".jpg"
//         cb(null, path)
//         const thisPatient = await patient.findById("62675c0d652ecfc70bd91d90")

//         thisPatient.profile_picture = "images\\" + path;
//         //thisPatient.profile_picture = "images\patient_pat.jpg";
//         await thisPatient.save();
//     }
//   })
//   var upload = multer({ storage: storage })


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
// clinicianRouter.post('/register', upload.single('myImage'), registryController.insert)
clinicianRouter.post('/register', registryController.insert)

const patientViewController = require('../controllers/patientViewController')
clinicianRouter.post('/patient_view', patientViewController.display)

const patientNotesController = require('../controllers/patientNotesController')
clinicianRouter.post('/patient_view/notes', patientNotesController.display)

const aboutUsController = require('../controllers/aboutUsController')
clinicianRouter.get('/about_us', aboutUsController.display)

const aboutDiabetesController = require('../controllers/aboutDiabetesController')
clinicianRouter.get('/about_diabetes', aboutDiabetesController.display)


module.exports = clinicianRouter