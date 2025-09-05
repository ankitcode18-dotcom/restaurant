const express = require('express');
const { model } = require('mongoose');
const fileUpload = require('express-fileupload');
const { adminLogin, menuRead, createmenu, adminRegister } = require('../../controllers/AdminController/AdminController');

const AdminRouter = express.Router();

AdminRouter.post('/login', adminLogin)

AdminRouter.post('/register', adminRegister)

module.exports = AdminRouter;
