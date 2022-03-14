'use strict';

const express = require('express');
const getData = require('../../controllers/admin/getHoursPerDayController');
const router = express.Router();

const {getHoursPerDay} = getData;

router.get('/getHoursPerDay',getHoursPerDay);

module.exports = {
    routes: router
}