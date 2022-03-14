'use strict';

const express = require('express');
const controller = require('../../controllers/client/getGSTPercentagesController');
const router = express.Router();

const {getGSTPercentages} = controller;

router.get('/getGSTPercentages',getGSTPercentages);

module.exports = {
    routes: router
}