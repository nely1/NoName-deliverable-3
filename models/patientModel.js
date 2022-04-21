module.exports = [
    {
        first_name : "Pat",
        last_name : "Picasso",
        ssername : "Lil' PP",
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