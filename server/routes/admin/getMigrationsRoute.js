'use strict';

const express = require('express');
const getData = require('../../controllers/admin/getMigrationsController');
const router = express.Router();

const {getMigrations} = getData;

router.get('/getMigrations',getMigrations);

module.exports = {
    routes: router
}