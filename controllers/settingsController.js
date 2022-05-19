
const display = async(req, res, next) => { 
    res.render('settings', {profile: req.user.toJSON(), settings: "active"})
}

const changeDetails = async(req, res, next) => {
    newDetails = req.body

    newPassword = newDetails.newPassword

    user = req.user

    user.password = newPassword

}

module.exports = {
    display,
    changeDetails
}

