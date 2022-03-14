'use strict';

const express = require('express');
const getData = require('../../controllers/admin/resetPasswordTokenController');
const router = express.Router();

const { resetPasswordToken } = getData;

router.post('/reset-password-token', resetPasswordToken)

module.exports = {
    routes: router
}