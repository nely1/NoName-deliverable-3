const dataInfo = require('../models/datatypeModel')


/* Mental note: code in a failure condition */
const display = (req, res) => {
    const data = dataInfo.find(data => data.path_from == req.params.data_type)
    res.render('submission', {templateInfo: data} )
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