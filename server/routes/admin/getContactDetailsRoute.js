'use strict';

const express = require('express');
const getData = require('../../controllers/admin/getContactDetailsController');
const router = express.Router();

const {getContactDetails} = getData;

router.get('/getContactDetails',getContactDetails);

module.exports = {
    routes: router
}