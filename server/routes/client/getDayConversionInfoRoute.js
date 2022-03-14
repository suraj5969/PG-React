'use strict';

const express = require('express');
const controller = require('../../controllers/client/getDayConversionInfoController');
const router = express.Router();

const {getDayConversionInfo} = controller;

router.get('/getDayConversionInfo/:dayId',getDayConversionInfo);

module.exports = {
    routes: router
}