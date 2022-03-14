'use strict';

const express = require('express');
const getData = require('../../controllers/admin/passwordResetController');
const router = express.Router();

const {passwordReset} = getData;

router.post('/passwordReset',passwordReset)

module.exports = {
    routes: router
}