'use strict';

const express = require('express');
const getData = require('../../controllers/client/saveUpfrontCostController');
const router = express.Router();

const {saveUpfrontCost} = getData;

router.post('/saveUpfrontCost',saveUpfrontCost);

module.exports = {
    routes: router
}