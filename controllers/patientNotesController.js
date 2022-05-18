const patient = require('../models/patientModel')
const clinicianNote = require('../models/clinicianNoteModel')

const display = async(req, res, next) => {
    console.log("test")
    res.render('patient_notes')
}

const insertNote = async(req, res) => {

    const new_note = new clinicianNote({
        note: req.body.clinician_note,
        datetime: new Date(),
    })

    await new_note.save( (err, result) => { 
        if (err) {
            res.send(err)
            return res.send(result)
        }
    }) 

    const patientObject = await patient.findById(req.body.patientID)
    await patientObject.notes.push(new_note._id)
    await patientObject.save()

    const thisPatient = await patient.findById(req.body.patientID).lean().populate()
    await res.render('patient_view', {profile: thisPatient})
}

module.exports = {
    display,
    insertNote,
}