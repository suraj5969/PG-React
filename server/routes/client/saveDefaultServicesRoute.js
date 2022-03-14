'use strict';

const express = require('express');
const getData = require('../../controllers/client/saveDefaultServicesController');
const router = express.Router();

const {saveDefaultServices} = getData;

router.post('/saveDefaultServices',saveDefaultServices);

module.exports = {
    routes: router
}