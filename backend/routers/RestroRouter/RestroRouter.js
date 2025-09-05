const express = require('express')
const { Login } = require('../../controllers/Restro Controller/RestroController')

const RestroRouter = express.Router()

RestroRouter.post("/restrologin", Login)


module.exports = RestroRouter