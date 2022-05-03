const exphbs = require('express-handlebars')
const express = require('express')
const app = express()

app.engine(
    'hbs',
    exphbs.engine({
        defaultlayout: 'patient_main',
        extname: 'hbs',
        helpers: {

            // Helper that determines if the recorded health data is within safety thresholds
            checkThreshold: function (data_val, min_threshold, max_threshold){
                if (data_val < min_threshold || data_val > max_threshold){
                    return "data-warning";
                }
                else {
                    return "data-normal";
                }
            },
            
            // Helper that checks if data recorded is from today or not
            checkToday: function (datetime) {
                let today = new Date()
                if (today.getUTCHours() < 14) {
                    today.setUTCDate(today.getUTCDate()-1);
                }
                today.setUTCHours(14,0,0,0);

                if (today <= datetime) {
                    return true
                }
                return false
            }
        }
    }
    )
)
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


/*---------------------------------------------- New code start -----------------------------------------------------*/

const flash = require('express-flash')
const session = require('express-session')

// Flash messages for failed logins, and (possibly) other success/error messages
app.use(flash())
// Track authenticated users through login sessions
app.use(
    session({
        // The secret used to sign session cookies (ADD ENV VAR)
        secret: process.env.SESSION_SECRET || 'keyboard cat',
        name: 'demo', // The cookie name (CHANGE THIS)
        saveUninitialized: false,
        resave: false,
        cookie: {
        sameSite: 'strict',
        httpOnly: true,
        secure: app.get('env') === 'production'
        },
    })
)

if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // Trust first proxy
}

// Initialise Passport.js
const passport = require('./passport')
app.use(passport.authenticate('session'))
// Load authentication router
const authRouter = require('./routes/auth')
app.use(authRouter)


/*------------------------------------------------- New code end --------------------------------------------------*/


//Router for patients
const patientRouter = require('./routes/patientRouter')
app.use('/patient', patientRouter)

//Router for clinicians
const clinicianRouter = require('./routes/clinicianRouter')
app.use('/clinician', clinicianRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log('Diabetes@Home is listening')
})

require('./models')