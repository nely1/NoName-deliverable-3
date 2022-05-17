const mongoose = require('mongoose') 
const bcrypt = require('bcryptjs')

const schema = new mongoose.Schema({ 
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    username: {type: String, required: true},
    DOB: {type: String, required: true},
    gender: String,
    email: {type: String, required: true},
    password: {type: String, required: true},
    textbio: String,
    profile_picture: String,
    role: {type:String, required:true},
    patientID: Number,
    glucose_min: Number,
    glucose_max: Number,
    weight_min: Number,
    weight_max: Number,
    insulin_min: Number,
    insulin_max: Number, 
    exercise_min: Number,
    exercise_max: Number,
    req_glucose: Boolean,
    req_exercise: Boolean,
    req_insulin: Boolean,
    req_weight: Boolean,
    support_message: String
}) 

// Password comparison function
// Compares the provided password with the stored password
// Allows us to call user.verifyPassword on any returned objects
schema.methods.verifyPassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, valid) => {
        callback(err, valid)
    })
}

// Password salt factor
const SALT_FACTOR = 10
// Hash password before saving
schema.pre('save', function save(next) {
    const user = this
    // Go to next if password field has not been modified
    if (!user.isModified('password')) {
        return next()
    }
    // Automatically generate salt, and calculate hash
    bcrypt.hash(user.password, SALT_FACTOR, (err, hash) => {
        if (err) {
            return next(err)
        }
        // Replace password with hash
        user.password = hash
        next()
    })
})

const patientModel = mongoose.model('patientModel', schema) 
module.exports = patientModel 