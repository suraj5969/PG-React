'use strict';

const express = require('express');
const getData = require('../../controllers/admin/editMiscellanousController');
const router = express.Router();

const {editMiscellanous} = getData;

router.post('/editMiscellanous/:id',editMiscellanous);

module.exports = {
    routes: router
}