const express = require('express')
const authRouter = express.Router()
const passport = require('passport')

// MENTAL NOTE ABOUT LOGOUT, MIGHT NEED TO BE A FORM BUTTON, SCAFFOLDING IS THERE

// Login page (with failure message displayed upon login failure)
authRouter.get('/', (req, res) => {
    res.render('login', { flash: req.flash('error'), title: 'Login' })
})

// Handle login
authRouter.post('/',
    passport.authenticate('local', {
        successRedirect: '/patient', failureRedirect: '/login', failureFlash: true
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