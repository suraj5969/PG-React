'use strict';

const express = require('express');
const getData = require('../../controllers/admin/resetPasswordController');
const router = express.Router();

const { resetPassword } = getData;

router.post('/reset-password', resetPassword)

module.exports = {
    routes: router
}