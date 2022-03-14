'use strict';

const express = require('express');
const controller = require('../../controllers/client/getDashboardDataController');
const router = express.Router();

const {getDashboardData} = controller;

router.get('/getDashboardData/:country',getDashboardData);

module.exports = {
    routes: router
}