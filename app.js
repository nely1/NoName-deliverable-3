const exphbs = require('express-handlebars')
const express = require('express')
const app = express()

app.engine(
    'hbs',
    exphbs.engine({
        defaultlayout: 'patient_main',
        extname: 'hbs',
    })
)
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Router for patients
const patientRouter = require('./routes/patientRouter')
app.use('/patient', patientRouter)
app.get('/patient', (req, res) => {
    res.render('home.hbs')
})

//Router for clinicians
const clinicianRouter = require('./routes/clinicianRouter')
app.use('/clinician', clinicianRouter)
app.get('/clinician', (req, res) => {
    res.render('dashboard.hbs')
})

app.listen(3000, () => {
    console.log('Diabetes@Home is listening on port 3000!')
})