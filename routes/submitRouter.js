const express = require('express')

const submitRouter = express.Router()

const submitController = require('../controllers/submitController')

submitRouter.get('/', submitController.display)

/* Not in use */
submitRouter.post('/', submitController.insert)

module.exports = submitRouter