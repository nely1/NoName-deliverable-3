// link to model
const peopleNum = require('../models/peopleModel')

const display = (req, res) => {
    res.render('submission', {data: peopleNum})
}

const insert = (req, res) => {
    const {number} = req
    peopleNum.push(req)
    //return res.redirect('../')
    return res.redirect('back')
}


module.exports = {
    display,
    insert
}