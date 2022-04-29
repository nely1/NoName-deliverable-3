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
        }
    }
    )
)
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

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