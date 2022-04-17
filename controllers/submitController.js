const display = (req, res) => {
    res.render('submission')
}

/* Not used, as moved to record hbs*/
const insert = (req, res) => {
    const { glucose_data, comments } = req.body
    glucoseData.push({ glucose_data, comments })
    console.log(req.body)
    return res.redirect('../record')
}


module.exports = {
    display,
    insert,
}