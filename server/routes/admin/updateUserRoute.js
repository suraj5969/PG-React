'use strict';

const express = require('express');
const getData = require('../../controllers/admin/updateUserController');
const router = express.Router();

const {updateUser} = getData;

router.post('/user/update/:id',updateUser);

module.exports = {
    routes: router
}