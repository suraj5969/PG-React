'use strict';

const express = require('express');
const getData = require('../../controllers/admin/editDayConversionsController');
const router = express.Router();

const {editDayConversions} = getData;

router.post('/editDayConversions/:id',editDayConversions);

module.exports = {
    routes: router
}