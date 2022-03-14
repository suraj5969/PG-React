'use strict';

const express = require('express');
const controller = require('../../controllers/client/getProductInfoByIdController');
const router = express.Router();

const {getProductInfoById} = controller;

router.get('/getProductInfoById/:productId',getProductInfoById);

module.exports = {
    routes: router
}