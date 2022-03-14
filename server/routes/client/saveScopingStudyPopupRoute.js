'use strict';

const express = require('express');
const getData = require('../../controllers/client/saveScopingStudyPopupController');
const router = express.Router();

const {saveScopingStudyPopup} = getData;

router.post('/saveScopingStudyPopup',saveScopingStudyPopup);

module.exports = {
    routes: router
}