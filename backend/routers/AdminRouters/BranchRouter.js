const express = require('express');
const fileUpload = require('express-fileupload');
const { read, create, register, branchLogin } = require('../../controllers/AdminController/BranchController');

const BranchRouter = express.Router();
BranchRouter.get('/:id', read);
BranchRouter.get('/', read);
BranchRouter.post('/create', fileUpload({ createParentPath: true }), create);
BranchRouter.post('/register', register)
BranchRouter.post('/branchlogin', branchLogin)

module.exports = BranchRouter;
