'use strict';

const express = require('express');
const getData = require('../../controllers/admin/editSoftwareController');
const router = express.Router();

const {editSoftware} = getData;

router.post('/edit-software/:id',editSoftware);

module.exports = {
    routes: router
}