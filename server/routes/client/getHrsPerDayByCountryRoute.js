'use strict';

const express = require('express');
const controller = require('../../controllers/client/getHrsPerDayByCountryController');
const router = express.Router();

const {getHrsPerDayByCountry} = controller;

router.get('/getHrsPerDayByCountry/:countryName',getHrsPerDayByCountry);

module.exports = {
    routes: router
}