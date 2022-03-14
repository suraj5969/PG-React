'use strict';

const express = require('express');
const getData = require('../../controllers/admin/addSoftwareController');
const router = express.Router();

const {addSoftware} = getData;

router.post('/add-software',addSoftware);

module.exports = {
    routes: router
}