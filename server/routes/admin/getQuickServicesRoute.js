'use strict';

const express = require('express');
const getData = require('../../controllers/admin/getQuickServicesController');
const router = express.Router();

const {getQuickServices} = getData;

router.get('/getQuickServices',getQuickServices);

module.exports = {
    routes: router
}