'use strict';

const express = require('express');
const controller = require('../../controllers/client/getAllDataMigrationOptionsController');
const router = express.Router();

const {getAllDataMigrationOptions} = controller;

router.get('/getAllDataMigrationOptions',getAllDataMigrationOptions);

module.exports = {
    routes: router
}