const express = require('express')
const authRouter = express.Router()
const passport = require('passport')

authRouter.get('/clinician', (req, res) => {
    res.render('login', { flash: req.flash('error'), title: 'Login', userType: "Clinician"})
})

authRouter.get('/patient', (req, res) => {
    res.render('login', { flash: req.flash('error'), title: 'Login' , userType: "Patient"})
})


// Handle clinician login
authRouter.post('/clinician',
    passport.authenticate('clinician', {
        successRedirect: '/clinician', failureRedirect: '/login_select/clinician', failureFlash: true
    })
)


// Handle patient login
authRouter.post('/patient',
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


/*For simplicity, we will put all of the routes and functions from this tutorial inside this file.
You may want to move the authentication middleware and remove the dummy authenticated page route GET
/ from this file for your actual project.*/