'use strict';

const express = require('express');
const getData = require('../../controllers/admin/forgotPasswordController');
const router = express.Router();

const {forgotPassword} = getData;

//router.get('/verify/:usermail',forgotPassword);

router.post('/forgotPassword',forgotPassword)

module.exports = {
    routes: router
}