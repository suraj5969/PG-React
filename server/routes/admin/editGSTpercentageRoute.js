'use strict';

const express = require('express');
const getData = require('../../controllers/admin/editGSTpercentageController');
const router = express.Router();

const {editGSTpercentage} = getData;

router.post('/editGSTpercentage/:id',editGSTpercentage);

module.exports = {
    routes: router
}