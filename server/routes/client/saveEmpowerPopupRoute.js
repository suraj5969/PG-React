'use strict';

const express = require('express');
const getData = require('../../controllers/client/saveEmpowerPopupController');
const router = express.Router();

const {saveEmpowerPopup} = getData;

router.post('/saveEmpowerPopup',saveEmpowerPopup);

module.exports = {
    routes: router
}