const express = require('express');
const fileUpload = require('express-fileupload');
const { createItem, readItems, createCategories, readCategories, createRestro, readRestro } = require('../../controllers/BranchAdminController/BranchAdminController');

const BranchAdminRouter = express.Router();
BranchAdminRouter.post('/create-categories', fileUpload({ createParentPath: true }), createCategories)
BranchAdminRouter.get('/categories/:id', readCategories)

BranchAdminRouter.post('/create-items', fileUpload({ createParentPath: true }), createItem)
BranchAdminRouter.get('/items/:id', readItems)
BranchAdminRouter.post('/create-restro', createRestro)
BranchAdminRouter.get('/restro/:id', readRestro)


module.exports = BranchAdminRouter;