'use strict';

const express = require('express');
const getData = require('../../controllers/client/saveRepaymentCalcController');
const router = express.Router();

const {saveRepaymentCalc} = getData;

router.post('/saveRepaymentCalc',saveRepaymentCalc);

module.exports = {
    routes: router
}