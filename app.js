const exphbs = require('express-handlebars')
const express = require('express')
const app = express()

app.engine(
    'hbs',
    exphbs.engine({
        defaultlayout: 'patient_main',
        extname: 'hbs',
        helpers: {
            checkThreshold: function (data_val, min_threshold, max_threshold){
                if (data_val <= min_threshold || data_val >= max_threshold){
                    return "warning";
                }
                else {
                    return "normal";
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

app.all('*', (req, res) => {  
	res.status(404).render('error', {errorCode: '404', message: 'That route is invalid.'})
})

app.listen(3000, () => {
    console.log('Diabetes@Home is listening on port 3000!')
})