'use strict';

const express = require('express');
const controller = require('../../controllers/client/getDashboardSlnSpecialistController');
const router = express.Router();

const {getDashboardSlnSpecialist} = controller;

router.get('/getDashboardSlnSpecialist/:country',getDashboardSlnSpecialist);

module.exports = {
    routes: router
}