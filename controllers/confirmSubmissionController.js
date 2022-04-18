

const display = (req, res) => {
    console.log(req.body)
    res.render('submission_confirm', {data: req.body})
}

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