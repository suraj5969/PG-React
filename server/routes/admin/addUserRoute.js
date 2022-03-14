'use strict';

const express = require('express');
const getData = require('../../controllers/admin/addUserController');
const router = express.Router();

const {addUser} = getData;

router.post('/add-user',addUser);

module.exports = {
    routes: router
}