'use strict';

const express = require('express');
const getData = require('../../controllers/client/saveAffinityMobilePopupController');
const router = express.Router();

const {saveAffinityMobilePopup} = getData;

router.post('/saveAffinityMobilePopup',saveAffinityMobilePopup);

module.exports = {
    routes: router
}