'use strict';

const express = require('express');
const getData = require('../../controllers/admin/deleteUserController');
const router = express.Router();

const {deleteUser} = getData;

router.delete('/delete-user/:id',deleteUser);

module.exports = {
    routes: router
}