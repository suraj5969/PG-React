'use strict';

const express = require('express');
const controller = require('../../controllers/client/getAllCountriesController');
const router = express.Router();

const {getAllCountries} = controller;

router.get('/getAllCountries',getAllCountries);

module.exports = {
    routes: router
}