const express = require('express')
const { createmenu, menuRead } = require('../controllers/MenuController')
const fileUpload = require('express-fileupload')

const MenuRouter = express.Router()


MenuRouter.post('/create-menu', fileUpload({ createParentPath: true }), createmenu)
MenuRouter.get('/menu-read/:id', menuRead)
MenuRouter.get('/menu-read', menuRead)

module.exports = MenuRouter
