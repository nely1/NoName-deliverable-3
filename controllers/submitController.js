const dataInfo = require('../models/datatypeModel')

const display = (req, res) => {
    const data = dataInfo.find(data => data.path_from == req.params.data_type)
    res.render('submission', {templateInfo: data} )
}

module.exports = {
    display,
}