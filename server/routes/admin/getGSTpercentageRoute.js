'use strict';

const express = require('express');
const getData = require('../../controllers/admin/getGSTpercentageController');
const router = express.Router();

const {getGSTpercentage} = getData;

router.get('/getGSTpercentage',getGSTpercentage);

module.exports = {
    routes: router
}