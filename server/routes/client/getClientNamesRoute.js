'use strict';

const express = require('express');
const controller = require('../../controllers/client/getClientNamesBySearchController');
const router = express.Router();

const {getClientNamesBySearch} = controller;

router.get('/getClientNamesBySearch/:searchText',getClientNamesBySearch);

module.exports = {
    routes: router
}