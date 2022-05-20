const patient = require('../models/patientModel')
const clinicianNote = require('../models/clinicianNoteModel')
const summary = require('../models/summaryModel')

const display = async(req, res, next) => {
    const thisPatient = req.query.patientID
    patientNotes = await clinicianNote.find({patientID: thisPatient}).lean().populate('datetime note')

    res.render('patient_notes', {layout: 'clinician_main', notes: patientNotes.reverse(), patientID: thisPatient})
}

const insertNote = async(req, res) => {

    // create new note according to input from request
    const new_note = new clinicianNote({
        patientID: req.body.patientID,
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
    data = await summary.find({patientID: thisPatient}).lean().populate('glucoseID insulinID weightID exerciseID')

    await res.render('patient_view', {layout: 'clinician_main', profile: thisPatient, allData: data.reverse()})
}

module.exports = {
    display,
    insertNote,
}