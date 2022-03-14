'use strict';

const express = require('express');
const getData = require('../../controllers/admin/getSoftwaresController');
const router = express.Router();

const {getSoftwares} = getData;

router.get('/getSoftwares',getSoftwares);

module.exports = {
    routes: router
}