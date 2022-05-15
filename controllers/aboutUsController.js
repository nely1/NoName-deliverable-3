const display = async(req, res, next) => { 
    res.render('about_us', {about_us: "active", logged_in: req.user})
} 

module.exports = {
    display,
}




