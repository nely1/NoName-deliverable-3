const passport = require('passport')
const express = require('express')
const router = express.Router()

const glucoseData = require('../models/glucoseModel')

// Authentication middleware
const isAuthenticated = (req, res, next) => {

    // If user is not authenticated via passport, redirect to login page
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    // Otherwise, proceed to next middleware function
    return next()
}

// Main page which requires login to access
// Note use of authentication middleware here
router.get('/', isAuthenticated, async (req, res) => {

    // Convert 12am Melbourne time into UTC time using UTC+10, a patient can record new data every 2pm UTC time.
    today = new Date()
    if (today.getUTCHours() < 14) {
        today.setUTCDate(today.getUTCDate()-1);
    }
    today.setUTCHours(14,0,0,0);

    // Check if patient has recorded data for today in UTC time
    const today_glucose = await glucoseData.findOne({datetime: {$gte : today}}).lean() 


    res.render('home', { title: 'Express', profile: req.user.toJSON(), data: today_glucose })
})

// Login page (with failure message displayed upon login failure)
router.get('/login', (req, res) => {
    res.render('login', { flash: req.flash('error'), title: 'Login' })
})

// Handle login
router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/', failureRedirect: '/login', failureFlash: true
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