'use strict';

const express = require('express');
const getData = require('../../controllers/admin/editOracleWordingsController');
const router = express.Router();

const {editOracleWordings} = getData;

router.post('/editOracleWordings/:id',editOracleWordings);

module.exports = {
    routes: router
}