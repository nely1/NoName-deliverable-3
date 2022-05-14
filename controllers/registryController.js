const display = (req, res) => {
    res.render('register', {register: "active"})
}

const insert = async(req, res) => {
    console.log(req.body)
    res.send("You have inserted a patient")
}

module.exports = {
    display,
    insert,
}