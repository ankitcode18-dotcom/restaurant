const express = require('express');
const { createTable, readTable } = require('../controllers/TableController');

const TableRouter = express.Router()

TableRouter.post("/create-table", createTable)
TableRouter.get("/:id", readTable)

module.exports = TableRouter