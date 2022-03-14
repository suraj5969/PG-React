'use strict';

const express = require('express');
const getData = require('../../controllers/client/saveSettlementPopupController');
const router = express.Router();

const {saveSettlementPopup} = getData;

router.post('/saveSettlementPopup',saveSettlementPopup);

module.exports = {
    routes: router
}