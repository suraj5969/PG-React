'use strict';

const express = require('express');
const controller = require('../../controllers/client/getClientNameByNumberController');
const router = express.Router();

const { getClientNameByNumber } = controller;

router.get('/getClientNameByNumber/:number', getClientNameByNumber);

module.exports = {
    routes: router
}