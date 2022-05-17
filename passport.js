const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const patientUser = require('./models/patientModel')
const clinicianUser = require('./models/clinicianModel')

// Serialize information to be stored in session/cookie
passport.serializeUser((user, done) => {
    var key = {
        id: user._id,
        role: user.role
    }
    done(null, key);
})


// When a request comes in, deserialize/expand the serialized information
// back to what it was (expand from id to full user)
passport.deserializeUser((key, done) => {
    if(key.role == "patient"){
        patientUser.findById(key.id, { password: 0 }, (err, user) => {
            if (err) {
                return done(err, undefined)
            }
            return done(undefined, user)
        })
    }
    else{
        clinicianUser.findById(key.id, { password: 0 }, (err, user) => {
            if (err) {
                return done(err, undefined)
            }
            return done(undefined, user)
        })
    }
})


passport.use('patient',
    new LocalStrategy((email, password, done) => {
        patientUser.findOne({ email }, {}, {}, (err, user) => {
            if (err) {
                return done(undefined, false, {
                    message: 'Unknown error has occurred'
                })
            }

            if (!user) {
                return done(undefined, false, {
                    message: 'Incorrect email or password',
                })
            }

            user.verifyPassword(password, (err, valid) => {
                if (err) {
                    return done(undefined, false, {
                        message: 'Unknown error has occurred'
                    })
                }
                if (!valid) {
                    return done(undefined, false, {
                        message: 'Incorrect email or password',
                    })
                }
                // If user exists and password matches the hash in the database
                return done(undefined, user)
            })
        })
    })
)

passport.use('clinician',
    new LocalStrategy((email, password, done) => {
        clinicianUser.findOne({ email }, {}, {}, (err, user) => {
            if (err) {
                return done(undefined, false, {
                    message: 'Unknown error has occurred'
                })
            }

            if (!user) {
                return done(undefined, false, {
                    message: 'Incorrect email or password',
                })
            }

            user.verifyPassword(password, (err, valid) => {
                if (err) {
                    return done(undefined, false, {
                        message: 'Unknown error has occurred'
                    })
                }
                if (!valid) {
                    return done(undefined, false, {
                        message: 'Incorrect email or password',
                    })
                }
                // If user exists and password matches the hash in the database
                return done(undefined, user)
            })
        })
    })
)

module.exports = passport