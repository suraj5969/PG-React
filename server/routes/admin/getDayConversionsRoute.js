'use strict';

const express = require('express');
const getData = require('../../controllers/admin/getDayConversionsController');
const router = express.Router();

const {getDayConversions} = getData;

router.get('/getDayConversions',getDayConversions);

module.exports = {
    routes: router
}