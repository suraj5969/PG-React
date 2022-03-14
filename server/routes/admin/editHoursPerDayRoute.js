'use strict';

const express = require('express');
const getData = require('../../controllers/admin/editHoursPerDayController');
const router = express.Router();

const {editHoursPerDay} = getData;

router.post('/editHoursPerDay/:id',editHoursPerDay);

module.exports = {
    routes: router
}