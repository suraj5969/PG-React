'use strict';

const express = require('express');
const getData = require('../../controllers/client/editProposalDataController');
const router = express.Router();

const {editProposalData} = getData;

router.post('/editProposalData/:proposal_no',editProposalData);

module.exports = {
    routes: router
}