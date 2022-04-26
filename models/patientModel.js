module.exports = [
    {
        first_name : "Pat",
        last_name : "Picasso",
        username : "Lil' PP",
        DOB: "15/01/2001",
        gender: "Male",
        email: "patp@bmail.com",
        password: "hunter2",
        textbio: "Father of 3. Loves long walks on the beach.",
        patientID: 1,
        safety_thresholds: 
        {
            glucose : { 
                min: 10.0,
                max: 20.0
            },
            weight : { 
                min: -1,
                max: -1
            },
            exercise : { 
                min: -1,
                max: -1
            },
            insulin : { 
                min: -1,
                max: -1
            }
        },

        req_glucose: true,
        req_exercise: true,
        req_insulin: true,
        req_weight: true,

        support_message: "Ayyy lmao",
    },
]

const mongoose = require('mongoose') 

const schema = new mongoose.Schema({ 
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    username: {type: String, required: true},
    DOB: {type: String, required: true},
    gender: String,
    email: {type: String, required: true},
    password: {type: String, required: true},
    textbio: String,
    glucose_min: Number,
    glucose_max: Number,
    req_glucose: Boolean,
    req_exercise: Boolean,
    req_insulin: Boolean,
    req_weight: Boolean,
    support_message: String

}) 

const patientModel = mongoose.model('patientModel', schema) 

module.exports = patientModel 