'use strict';

const express = require('express');
const controller = require('../../controllers/client/getAllEmpowerModulesController');
const router = express.Router();

const {getAllEmpowerModules} = controller;

router.get('/getAllEmpowerModules',getAllEmpowerModules);

module.exports = {
    routes: router
}
