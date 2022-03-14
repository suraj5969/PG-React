'use strict';

const express = require('express');
const getData = require('../../controllers/client/editProposalDetailsController');
const router = express.Router();

const {editProposalDetails} = getData;

router.post('/editProposalDetails/:proposal_no',editProposalDetails);

module.exports = {
    routes: router
}