const passport = require('passport')
const express = require('express')
const router = express.Router()

// MENTAL NOTE ABOUT LOGOUT, MIGHT NEED TO BE A FORM BUTTON INSTEAD OF WHAT WE HAVE NOW


// Authentication middleware
const isAuthenticated = (req, res, next) => {

    // If user is not authenticated via passport, redirect to login page
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    // Otherwise, proceed to next middleware function
    return next()
}

// Login page (with failure message displayed upon login failure)
router.get('/', (req, res) => {
    res.render('login', { flash: req.flash('error'), title: 'Login' })
})

// Handle login
router.post('/',
    passport.authenticate('local', {
        successRedirect: '/patient', failureRedirect: '/login', failureFlash: true
    })
)

// Handle logout
router.post('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router


/*For simplicity, we will put all of the routes and functions from this tutorial inside this file.
You may want to move the authentication middleware and remove the dummy authenticated page route GET
/ from this file for your actual project.*/