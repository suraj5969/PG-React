'use strict';

const express = require('express');
const getData = require('../../controllers/admin/editMigrationsController');
const router = express.Router();

const {editMigrations} = getData;

router.post('/edit-migrations/:id',editMigrations);

module.exports = {
    routes: router
}