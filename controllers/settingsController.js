
const display = async(req, res, next) => { 
    res.render('settings', {profile: req.user.toJSON(), settings: "active"})
}

module.exports = {
    display,
}

