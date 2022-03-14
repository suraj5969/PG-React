'use strict';

const express = require('express');
const getData = require('../../controllers/admin/getOracleWordingsController');
const router = express.Router();

const {getOracleWordings} = getData;

router.get('/getOracleWordings',getOracleWordings);

module.exports = {
    routes: router
}