'use strict';

const express = require('express');
const getData = require('../../controllers/client/saveOngoingMaintenanceController');
const router = express.Router();

const {saveOngoingMaintenance} = getData;

router.post('/saveOngoingMaintenance',saveOngoingMaintenance);

module.exports = {
    routes: router
}