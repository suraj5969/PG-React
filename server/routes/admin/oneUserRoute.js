'use strict';

const express = require('express');
const getData = require('../../controllers/admin/oneUserController');
const router = express.Router();

const {OneUserDetails} = getData;

router.get('/user/:id',OneUserDetails);

module.exports = {
    routes: router
}