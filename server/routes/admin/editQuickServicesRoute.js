'use strict';

const express = require('express');
const getData = require('../../controllers/admin/editQuickServicesController');
const router = express.Router();

const {editQuickServices} = getData;

router.post('/edit-quickservices/:id',editQuickServices);

module.exports = {
    routes: router
}