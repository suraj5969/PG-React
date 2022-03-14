'use strict';

const express = require('express');
const getData = require('../../controllers/admin/toggleActiveController');
const router = express.Router();

const {toggleActive} = getData;

router.post('/toggleActive/:id',toggleActive);

module.exports = {
    routes: router
}