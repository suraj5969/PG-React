'use strict';

const express = require('express');
const getData = require('../../controllers/admin/getProductListController');
const router = express.Router();

const {getProductList} = getData;

router.get('/getProductList',getProductList);

module.exports = {
    routes: router
}