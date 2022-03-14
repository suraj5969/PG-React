'use strict';

const express = require('express');
const getData = require('../../controllers/client/saveClientProfileController');
const router = express.Router();

const {saveClientProfile} = getData;

router.post('/saveClientProfile',saveClientProfile);

module.exports = {
    routes: router
}