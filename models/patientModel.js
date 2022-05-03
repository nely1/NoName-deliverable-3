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
    profile_picture: String,
    patientID: Number,
    glucose_min: Number,
    glucose_max: Number,
    req_glucose: Boolean,
    req_exercise: Boolean,
    req_insulin: Boolean,
    req_weight: Boolean,
    support_message: String,
    glucose_data: Object,
}) 

schema.methods.verifyPassword = function (password) {

    if(password == this.password){
        return true;
    }
    else {
        return false;
    }
}

const patientModel = mongoose.model('patientModel', schema) 
module.exports = patientModel 



// const mongoose = require('mongoose')
// const bcrypt = require('bcryptjs')
// const userSchema = new mongoose.Schema({
// username: { type: String, required: true, unique: true },
// password: { type: String, required: true },
// secret: { type: String, required: true },
// })
// // Password comparison function
// // Compares the provided password with the stored password
// // Allows us to call user.verifyPassword on any returned objects
// userSchema.methods.verifyPassword = function (password, callback) {
// bcrypt.compare(password, this.password, (err, valid) => {
// callback(err, valid)
// })
// }
// // Password salt factor
// const SALT_FACTOR = 10
// // Hash password before saving
// userSchema.pre('save', function save(next) {
// const user = this
// // Go to next if password field has not been modified
// if (!user.isModified('password')) {
// return next()
// }
// // Automatically generate salt, and calculate hash
// bcrypt.hash(user.password, SALT_FACTOR, (err, hash) => {
// if (err) {
// return next(err)
// }
// // Replace password with hash
// user.password = hash
// next()
// })
// })
// const User = mongoose.model('User', userSchema)
// module.exports = User