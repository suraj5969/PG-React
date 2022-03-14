'use strict';

const express = require('express');
const getData = require('../../controllers/admin/deleteSoftwareController');
const router = express.Router();

const {deleteSoftware} = getData;

router.delete('/delete-software/:id',deleteSoftware);

module.exports = {
    routes: router
}