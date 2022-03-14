'use strict';

const express = require('express');
const controller = require('../../controllers/client/getYearUpliftPercentController');
const router = express.Router();

const {getYearUpliftPercent} = controller;

router.get('/getYearUpliftPercent',getYearUpliftPercent);

module.exports = {
    routes: router
}