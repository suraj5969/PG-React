'use strict';

const express = require('express');
const getData = require('../../controllers/client/saveOptionalServicesController');
const router = express.Router();

const {saveOptionalServices} = getData;

router.post('/saveOptionalServices',saveOptionalServices);

module.exports = {
    routes: router
}