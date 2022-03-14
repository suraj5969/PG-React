
'use strict';

const express = require('express');
const controller = require('../../controllers/client/getAllSoftwaresController');
const router = express.Router();

const {getAllSoftwares} = controller;

router.get('/getAllSoftwares',getAllSoftwares);

module.exports = {
    routes: router
}
