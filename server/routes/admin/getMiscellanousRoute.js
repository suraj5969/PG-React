'use strict';

const express = require('express');
const getData = require('../../controllers/admin/getMiscellanousController');
const router = express.Router();

const {getMiscellanous} = getData;

router.get('/getMiscellanous',getMiscellanous);

module.exports = {
    routes: router
}