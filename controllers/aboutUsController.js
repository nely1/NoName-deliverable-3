const display = async(req, res, next) => { 
    res.render('about_us', {about_us: "active"})
} 

module.exports = {
    display,
}




