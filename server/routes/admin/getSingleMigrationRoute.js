'use strict';

const express = require('express');
const getData = require('../../controllers/admin/getSingleMigrationsController');
const router = express.Router();

const {getSingleMigrations} = getData;

router.get('/getSingleMigrations/:migration_id',getSingleMigrations);

module.exports = {
    routes: router
}