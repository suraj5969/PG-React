'use strict';

const express = require('express');
const getData = require('../../controllers/client/saveMiscellaneousController');
const router = express.Router();

const {saveMiscellaneous} = getData;

router.post('/saveMiscellaneous',saveMiscellaneous);

module.exports = {
    routes: router
}