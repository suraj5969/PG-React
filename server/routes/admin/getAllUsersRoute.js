'use strict';

const express = require('express');
const getData = require('../../controllers/admin/getAllUsersController');
const router = express.Router();

const {getAllUsers} = getData;

router.get('/getAllUsers',getAllUsers);

module.exports = {
    routes: router
}