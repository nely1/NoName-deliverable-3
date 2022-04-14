const express = require('express')

// create our Router object
const submitRouter = express.Router()

// require our controller
const submitController = require('../controllers/submitController')

submitRouter.get('/', submitController.display)

submitRouter.post('/', submitController.insert)

// export the router
module.exports = submitRouter