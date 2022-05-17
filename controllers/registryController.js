const patient = require('../models/patientModel')

const display = (req, res) => {
    res.render('register', {register: "active"})
}

const insert = async(req, res) => {

    let new_patient = new Patient({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        DOB: req.body.date_of_birth,
        gender: req.body.gender,
        email: req.body.email,
        password: req.body.password,
        textbio: req.body.bio,
        role: req.body.role,
        patientID: 1001 + patient.countDocuments(),
        profile_picture: req.file.field,

        req_glucose: true,
        req_insulin: true,
        req_weight: true,
        req_exercise: true,

    })
    
    const thisClinician = req.user


    await new_patient.save( (err, result) => { 
        if (err) {
            res.send(err)
            return res.send(result)
        }
    }) 

    res.render('patient_view', {profile: thisPatient})
}

module.exports = {
    display,
    insert,
}