const display = async(req, res, next) => { 
    res.render('about_diabetes', {about_diabetes: "active"})
} 

module.exports = {
    display,
}




