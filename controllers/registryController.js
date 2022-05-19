const patient = require('../models/patientModel')

const display = (req, res) => {
    res.render('register', {register: "active"})
}

const insert = async(req, res) => {
    // 
    today = new Date()
    if (today.getUTCHours() < 14) {
        today.setUTCDate(today.getUTCDate()-1);
    }
    today.setUTCHours(14,0,0,0)

    // create new patient object
    const new_patient = new patient({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        DOB: req.body.date_of_birth,
        gender: req.body.gender,
        email: req.body.email,
        password: req.body.password,
        textbio: req.body.bio,
        role: req.body.role,
        patientID: 1001 + await patient.countDocuments({}),
        profile_picture: "\\images\\" + req.file.filename,
        registry_date: today,
        notes:[],

        req_glucose: true,
        req_insulin: true,
        req_weight: true,
        req_exercise: true,

    })
    
    await new_patient.save( (err, result) => { 
        if (err) {
            res.send(err)
            return res.send(result)
        }
    }) 

    const thisClinician = req.user
    await thisClinician.patients.push(new_patient._id)
    await thisClinician.save()
    res.render('patient_view', {profile: new_patient.toJSON()})
}

module.exports = {
    display,
    insert,
}