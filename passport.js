const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/patientModel')

// Updated serialize/deserialize functions
passport.serializeUser((user, done) => {
    done(undefined, user._id)
})
passport.deserializeUser((userId, done) => {
    User.findById(userId, { password: 0 }, (err, user) => {
    if (err) {
        return done(err, undefined)
    }
    return done(undefined, user)
    })
})
// Updated LocalStrategy function
passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({ username }, {}, {}, (err, user) => {
            if (err) {
                return done(undefined, false, {
                    message: 'Unknown error has occurred'
                })
            }

            if (!user) {
                return done(undefined, false, {
                    message: 'Incorrect username or password',
                })
            }

            /* Method modified since I didnt want to do hashing cuz lazy */
            if (!user.verifyPassword(password)){
                return done(undefined, false, {
                    message: 'Incorrect username or password',
                })
            }
            else{
            // If user exists and password matches the hash in the database
                return done(undefined, user)
            }
        })
    })
)

module.exports = passport

/*

// Serialize information to be stored in session/cookie
passport.serializeUser((user, done) => {
    // Use id to serialize user
    done(undefined, user.id)
})


// When a request comes in, deserialize/expand the serialized information
// back to what it was (expand from id to full user)
passport.deserializeUser((userId, done) => {
// Run database query here to retrieve user information
// For now, just return the hardcoded user
    if (userId === USER.id) {
        done(undefined, USER)
    } else {
        done(new Error('Bad User'), undefined)
    }
})

// Define local authentication strategy for Passport
// http://www.passportjs.org/docs/downloads/html/#strategies
passport.use(
    new LocalStrategy((username, password, done) => {
    // Check if user exists and password matches the hash in the database
    // For now, just match the hardcoded user
    if (username !== USER.username || password !== USER.password) {
        console.log("Yo i was here")
        return done(undefined, false, {
            message: 'Incorrect username/password',
        })
    }
    // If credentials match, return user in callback
    return done(undefined, USER)
    })
)
*/