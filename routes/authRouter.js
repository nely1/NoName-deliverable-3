const express = require('express')
const authRouter = express.Router()
const passport = require('passport')
const { body, validationResult, check } = require('express-validator')

// Login page for clinicians
authRouter.get('/clinician', (req, res) => {
    res.render('login', { flash: req.flash('error'), title: 'Login', userType: "Clinician"})
})

// Login page for patients
authRouter.get('/patient', (req, res) => {
    res.render('login', { flash: req.flash('error'), title: 'Login' , userType: "Patient"})
})

// Handle clinician login
authRouter.post('/clinician',
    body("username").escape(),
    body("password").escape(),
    passport.authenticate('clinician', {
        successRedirect: '/clinician', failureRedirect: '/login_select/clinician', failureFlash: true
    })
)

// Handle patient login
authRouter.post('/patient',
    body("username").escape(),
    body("password").escape(),
    passport.authenticate('patient', {
        successRedirect: '/patient', failureRedirect: '/login_select/patient', failureFlash: true
    })
)

// Handle logout
authRouter.post('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = authRouter