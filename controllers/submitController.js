const dataInfo = require('../models/submissionModel')

const display = (req, res) => {
    console.log(res)
    const data = dataInfo.find(data => data.path_from == req.params.data_type)
    res.render('submission', {templateInfo: data, record: "active"} )
}

module.exports = {
    display,
}