'use strict';

const express = require('express');
const getData = require('../../controllers/client/saveProposalDataController');
const router = express.Router();

const {saveProposalData} = getData;

router.post('/saveProposalData',saveProposalData);

module.exports = {
    routes: router
}