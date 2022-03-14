'use strict';

const express = require('express');
const controller = require('../../controllers/client/getCountryAddressController');
const router = express.Router();

const {getCountryAddress} = controller;

router.get('/getCountryAddress/:clientNumber',getCountryAddress);

module.exports = {
    routes: router
}