'use strict';

const express = require('express');
const getData = require('../../controllers/client/getProposalDataController');
const router = express.Router();

const {getProposalData} = getData;

router.post('/getProposalData/:proposal_no',getProposalData);

module.exports = {
    routes: router
}