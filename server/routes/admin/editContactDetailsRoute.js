'use strict';

const express = require('express');
const getData = require('../../controllers/admin/editContactDetailsController');
const router = express.Router();

const {editContactDetails} = getData;

router.post('/editContactDetails/:id',editContactDetails);

module.exports = {
    routes: router
}