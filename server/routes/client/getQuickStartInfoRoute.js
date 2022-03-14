'use strict';

const express = require('express');
const controller = require('../../controllers/client/getQuickStartInfoController');
const router = express.Router();

const {getQuickStartInfo} = controller;

router.get('/getQuickStartInfo/',getQuickStartInfo);

module.exports = {
    routes: router
}